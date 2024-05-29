import { Injectable } from '@nestjs/common';
import { CreateShipementDto } from './dtos/CreateShipementDto';
import { ChangeStatusDto } from './dtos/ChangeStatusDto';
import { ShipementRepository } from './shipement.repository';

@Injectable()
export class ShippingService {
  constructor(private readonly shipementRepository: ShipementRepository) {}
  async createShipement(data: CreateShipementDto) {
    try {
      await this.sendOrder(data);
    } catch (e) {
      console.log('invalid ngrok');
    }
    return this.shipementRepository.createShipment(data);
  }
  async sendOrder(shippingDto: CreateShipementDto) {
    console.log(JSON.stringify(shippingDto));
    fetch('https://37ea-200-85-126-66.ngrok-free.app/shipments', {
      method: 'POST',
      body: JSON.stringify(shippingDto),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  async changeStatus(data: ChangeStatusDto) {
    return this.shipementRepository.changeStatus(data);
  }
  async getAllShippements() {
    return this.shipementRepository.getAllShippements();
  }
}
