import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { Period } from './shared/periods/period.entity';
import { AdminModule } from './admin/admin.module';

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
      entities: [Category, Period],
      synchronize: true,
    }),
    AdminModule,
  ],
})
export class AppModule {}
