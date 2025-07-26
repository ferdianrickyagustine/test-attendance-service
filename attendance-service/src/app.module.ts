import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AttendanceModule } from './attendance/attendance.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-fallback-secret-key',
      signOptions: { expiresIn: '1d' }
    }),
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
