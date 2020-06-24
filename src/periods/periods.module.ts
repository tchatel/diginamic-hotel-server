import { Module } from '@nestjs/common';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './period.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Period])
  ],
  controllers: [PeriodsController],
  providers: [PeriodsService]
})
export class PeriodsModule {}
