import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PeriodsController } from './periods.controller';
import { CategoriesModule } from '../shared/categories/categories.module';
import { PeriodsModule } from '../shared/periods/periods.module';

@Module({
    imports: [
        CategoriesModule,
        PeriodsModule,
    ],
    controllers: [
        CategoriesController,
        PeriodsController,
    ]
})
export class AdminModule {}
