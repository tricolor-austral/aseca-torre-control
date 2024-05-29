import { Injectable } from '@nestjs/common';
import { CreateShipementDto } from './dtos/CreateShipementDto';
import { ChangeStatusDto } from './dtos/ChangeStatusDto';
import { ShipementRepository } from './shipement.repository';
import { Shipements, STATUS } from '@prisma/client';

@Injectable()
export class ShipmentRepositoryMock extends ShipementRepository {
  private shipments: Shipements[] = [];
  private nextId = 1;

  async createShipment(data: CreateShipementDto): Promise<Shipements> {
    const newShipment: Shipements = {
      id: this.nextId.toString(),
      orderId: data.orderID,
      status: STATUS.NEW,
    };
    this.shipments.push(newShipment);
    this.nextId++;
    return newShipment;
  }

  async changeStatus(data: ChangeStatusDto): Promise<Shipements> {
    const shipment = this.shipments.find((shipment) => shipment.id === data.id);
    if (shipment) {
      shipment.status = data.status;
    }
    return shipment;
  }
  async getAllShippements(): Promise<Shipements[]> {
    return this.shipments;
  }
}
