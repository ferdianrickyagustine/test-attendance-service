import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/attendance.dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post('check-in')
    async checkIn(@Request() req, @Body() checkInDto: CheckInDto) {
        const userId = req.user.sub
        return this.attendanceService.checkIn(userId, checkInDto)
    }

    @Post('check-out')
    async checkOut(@Request() req, @Body('notes') notes?: string) {
        const userId = req.user.sub
        return this.attendanceService.checkOut(userId, notes)
    }

    @Get('today')
    async getTodayAttendance(@Request() req) {
        const userId = req.user.sub
        return this.attendanceService.getAttendance(userId, new Date().toISOString())
    }

    @Get('summary')
    async getSummary(
        @Request() req,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ) {
        const userId = req.user.sub
        return this.attendanceService.getSummary(userId, startDate, endDate);
    }

    @Get('history')
    async getHistory(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
        return this.attendanceService.getAllAttendance(startDate, endDate);
    }
}
