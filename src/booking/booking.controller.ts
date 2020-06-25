import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';

@Controller('booking')
export class BookingController {

    @Get('available')  //   /booking/available?start=2020-07-03&end=2020-07-03&persons=2
    searchAvailable(@Query('start') startDate: string,
                    @Query('end') endDate: string,
                    @Query('persons', ParseIntPipe) persons: number) {
        
    }


}
