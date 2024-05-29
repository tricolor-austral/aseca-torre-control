import { STATUS } from '@prisma/client';

export class ChangeStatusDto {
  status: STATUS;
  id: string;
}
