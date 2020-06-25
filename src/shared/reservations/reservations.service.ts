import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {

    constructor(@InjectRepository(Reservation) 
                private reservationRepository: Repository<Reservation>) {
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

    searchAvailable(stay: Stay, persons: number) {
        // 
    }
}

export interface Stay {
    startDate: string;
    endDate: string;
}
