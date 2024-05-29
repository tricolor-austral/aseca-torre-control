import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipementDto } from './dtos/CreateShipementDto';
import { ChangeStatusDto } from './dtos/ChangeStatusDto';
import { Shipements } from '@prisma/client';

@Injectable()
export class ShipementRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createShipment(data: CreateShipementDto): Promise<Shipements> {
    return this.prismaService.shipements.create({
      data: { orderId: data.orderID, status: 'NEW' },
    });
  }
  async changeStatus(data: ChangeStatusDto): Promise<Shipements> {
    return this.prismaService.shipements.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }
  async getAllShippements(): Promise<Shipements[]> {
    return this.prismaService.shipements.findMany();
  }
}
