import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckInDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(private prisma: PrismaService) {}

    async checkIn(userId: string, checkInDto: CheckInDto) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const existingAttendance = await this.prisma.attendance.findUnique({
            where: {
                userId_date: {
                    userId,
                    date: today
                }
            }
        })

        if (existingAttendance?.checkIn) {
            throw new BadRequestException('Anda sudah melakukan check-in hari ini');
        }

        return await this.prisma.attendance.upsert({
            where: {
                userId_date: { userId, date: today }
            },
            update: {
                checkIn: new Date(),
                notes: checkInDto.notes,
                status: 'PRESENT'
            },
            create: {
                userId,
                date: today,
                checkIn: new Date(),
                notes: checkInDto.notes,
                status: 'PRESENT'
            }
        })
    }

    async checkOut(userId: string, notes?: string) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const attendance = await this.prisma.attendance.findUnique({
            where: {
                userId_date: { userId, date: today }
            }
        })

        if (!attendance || !attendance.checkIn) {
            throw new BadRequestException('Anda belum melakukan check-in hari ini')
        }

        if (attendance.checkOut) {
            throw new BadRequestException('Anda sudah melakukan check-out hari ini')
        }

        return await this.prisma.attendance.update({
            where: { id: attendance.id },
            data: {
                checkOut: new Date(),
                notes: notes || attendance.notes
            }
        })
    }

    async getAttendance(userId: string, date: string) {
        const attendanceDate = new Date(date)
        attendanceDate.setHours(0, 0, 0, 0)

        const attendance = await this.prisma.attendance.findUnique({
            where: {
                userId_date: { userId, date: attendanceDate }
            }
        })
        
        return attendance;
    }

    async getSummary(userId: string, startDate?: string, endDate?: string) {
        const now = new Date()
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastDay = now

        const start = startDate ? new Date(startDate) : firstDay
        const end  = endDate ? new Date(endDate) : lastDay

        return this.prisma.attendance.findMany({
            where: {
                userId,
                date: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: { date: 'asc' }
        })
    }
}
