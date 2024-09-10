import { type ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button, Collapse, Flex, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { type Order, OrderStatus } from '@/types';

import { completeOrder } from '../model/completeOrder';
import { OrderStatusParse } from '../model/orderStatusParse';

export const OrderCard = ({ order }: { order: Order }): ReactNode => {
  const [opened, { toggle }] = useDisclosure(false);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [isComplete, setIsComplete] = useState(order.status === OrderStatus.Archived);

  const toggleComplete = async (): Promise<void> => {
    await completeOrder(order)
      .then(() => {
        setIsComplete(true);
        setOrderStatus(OrderStatus.Archived);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Flex>
      <Flex direction={'column'}>
        <Flex>
          <Title fw={500} order={3}>
            Заказ № {order.id}
          </Title>
          <Badge color="pink" variant="light">
            {OrderStatusParse[orderStatus]}
          </Badge>

          <Button disabled={isComplete} onClick={() => void toggleComplete()}>
            {isComplete ? 'Заказ завершен' : 'Завершить заказ'}
          </Button>
        </Flex>

        <Text>Стоимость: {order.total} ₽</Text>
        <Text>Дата создания: {order.createdAt}</Text>

        <Text>Количество товаров: {order.items.length}</Text>

        <Button onClick={toggle}>Показать все</Button>
        <Collapse in={opened}>
          {order.items.map((order) => (
            <Link key={order.id} to={`/advertisements/${order.id}`}>
              {order.name}
            </Link>
          ))}
        </Collapse>
      </Flex>
    </Flex>
  );
};
