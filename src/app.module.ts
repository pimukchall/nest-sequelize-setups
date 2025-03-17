import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // หรือ 'mariadb', 'postgres', 'sqlite'
      host: 'localhost',
      port: 3306, // เปลี่ยนตาม DB
      username: 'root',
      password: '',
      database: 'emp_test',
      models: [User],
      autoLoadModels: true, // โหลด models อัตโนมัติ
      synchronize: true, // สร้าง table อัตโนมัติ (ปิดเมื่อใช้งาน production)
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
