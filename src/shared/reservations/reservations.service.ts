import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { PeriodsService } from '../periods/periods.service';
import { Category } from '../categories/category.entity';
import { Period } from '../periods/period.entity';
import { DateUtil } from 'src/util/date.util';
import { AvailabilityResultDto } from './availability-result.dto';

@Injectable()
export class ReservationsService {

    constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
                private categoriesSrv: CategoriesService,
                private periodsSrv: PeriodsService) {
    }

    searchAll(options?: {startDate?: string, endDate?: string, categoryId?: number}): Promise<Reservation[]> {
        let query = this.reservationRepository.createQueryBuilder('reservation');
        if (options?.startDate) {
            query = query.andWhere('reservation.endDate >= :startDate', {startDate: options.startDate});
        }
        if (options?.endDate) {
            query = query.andWhere('reservation.startDate <= :endDate', {endDate: options.endDate});
        }
        if (options?.categoryId) {
            query = query.andWhere('reservation.categoryId = :catId', {catId: options.categoryId});
        }
        return query.getMany();
    }

    async searchAvailable(stay: Stay, persons: number): Promise<AvailabilityResultDto> {
        // Catégories de chambres
        const categories: Category[] = (await this.categoriesSrv.readAll())
            .filter(category => category.persons >= persons);
        // Périodes de prix qui chevauchent les dates du séjour
        const periods: Period[] = await this.periodsSrv.searchAll(stay);
        // Réservations qui chevauchent les dates du séjour
        const reservations: Reservation[] = await this.searchAll(stay);

        const list = categories.map(category => {
            const max = (category.data?.rooms || []).length;
            const categoryReservations: Reservation[] = 
                reservations.filter(resa => resa.categoryId === category.id);
            const available = this.checkAvailabilityEachDay(stay, categoryReservations, max);
            const price = this.computePrice(stay, periods);
            return {category, available, price};
        });
        return {nights: DateUtil.computeNights(stay), list};
    }

    private computePrice(stay: Stay, periods: Period[]) {
        let price = 0;
        for (let day = stay.startDate; day <= stay.endDate; day = DateUtil.nextDay(day)) {
            const period = DateUtil.findForDay(day, periods);
            if (!period) {
                return null;
            }
            price += period.data.prices[DateUtil.weekDay(day)];
        }
        return price;
    }

    private checkAvailabilityEachDay(stay: Stay, reservations: Reservation[], max: number) {
        let maxResa = 0;
        for (let day = stay.startDate; day <= stay.endDate; day = DateUtil.nextDay(day)) {
            const count = DateUtil.filterForDay(day, reservations).length;
            maxResa = Math.max(maxResa, count);
        }
        const available = maxResa < max;
        return available;
    }
}

export interface Stay {
    startDate: string;
    endDate: string;
}
