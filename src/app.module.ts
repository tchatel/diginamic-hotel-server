import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';

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
      entities: [Category],
      synchronize: true,
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
