import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('prisma')
  async getPrisma() {
    return await this.prismaService.user.findMany()
  }
}
