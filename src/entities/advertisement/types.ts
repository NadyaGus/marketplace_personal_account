export interface Advertisement {
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
