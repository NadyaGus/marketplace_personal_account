export interface Advertisment {
  /* Дата и время создания. */
  createdAt: string;
  /* Описание. */
  description?: string;
  /* Уникальный идентификатор. */
  id: string;
  /* Ссылка на изображение. */
  imageUrl?: string;
  /* Количество лайков. */
  likes: number;
  /* Название. */
  name: string;
  /* Цена. */
  price: number;
  /* Количество просмотров. */
  views: number;
}

export interface AdvertismentResponse {
  /* Дата и время создания. */
  createdAt: string;
  /* Описание. */
  description?: string;
  /* Уникальный идентификатор. */
  id: string;
  /* Ссылка на изображение. */
  imageUrl?: string;
  /* Количество лайков. */
  likes: string;
  /* Название. */
  name: string;
  /* Цена. */
  price: string;
  /* Количество просмотров. */
  views: string;
}

export const OrderStatus = {
  Archived: 5,
  Created: 0,
  DeliveredToThePoint: 3,
  Paid: 1,
  Received: 4,
  Refund: 6,
  Transport: 2,
} as const;

type OrderItem = { count: number } & Advertisment;

export interface Order {
  /* Дата и время создания. */
  createdAt: string;
  /* Способ доставки(Почта, СДЭК...) */
  deliveryWay: string;
  /* Дата и время завершения. */
  finishedAt?: string;
  /* Уникальный идентификатор. */
  id: string;
  /* Товары в заказе. */
  items: OrderItem[];
  /* Статус. */
  status: (typeof OrderStatus)[keyof typeof OrderStatus];
  /* Сумма заказа */
  total: number;
}

export interface Image {
  /* Уникальный идентификатор. */
  id: number;
  /* Название. */
  name: string;
  /* Ссылка. */
  url: string;
}
