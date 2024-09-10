import { OrderStatus } from '@/types';

export const OrderStatusParse = {
  [OrderStatus.Archived]: 'Архив',
  [OrderStatus.Created]: 'Создан',
  [OrderStatus.DeliveredToThePoint]: 'Доставлен',
  [OrderStatus.Paid]: 'Оплачен',
  [OrderStatus.Received]: 'Получен',
  [OrderStatus.Refund]: 'Возврат',
  [OrderStatus.Transport]: 'В пути',
};
