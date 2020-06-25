import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { Period } from './shared/periods/period.entity';
import { AdminModule } from './admin/admin.module';
import { Reservation } from './shared/reservations/reservation.entity';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: 'hotel',
      database: 'hoteldb',
      schema: 'hotel', //Choose a specfic schema (default: user name, then public)
      entities: [Category, Period, Reservation],
      synchronize: true,
    }),
    AdminModule,
    BookingModule,
  ],
})
export class AppModule {}
