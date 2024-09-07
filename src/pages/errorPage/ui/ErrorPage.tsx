import type { ReactNode } from 'react';

export const ErrorPage = (): ReactNode => {
  return (
    <div>
      <h1>Ошибка</h1>
      <p>Страница не найдена</p>
      <a href="/">Вернуться на главную</a>
    </div>
  );
};
