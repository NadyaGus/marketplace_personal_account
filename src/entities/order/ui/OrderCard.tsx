import { type ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button, Collapse, Flex, GridCol, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { type Order, OrderStatus } from '@/types';

import { completeOrder } from '../model/completeOrder';
import { OrderStatusParse } from '../model/orderStatusParse';

import classes from './orderCard.module.css';

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
    <GridCol span={{ base: 12, md: 4, sm: 6 }}>
      <Paper className={classes.card} p={'lg'} shadow="md">
        <Flex direction={'column'} gap={'lg'}>
          <Flex direction={'column'}>
            <Title fw={500} mb={'sm'} order={3}>
              Заказ № {order.id}
            </Title>
            <Badge color="pink" variant="light">
              {OrderStatusParse[orderStatus]}
            </Badge>
          </Flex>

          <Flex>
            <Text fw={500} mr={'sm'}>
              Сумма заказа:
            </Text>
            {order.total} ₽
          </Flex>

          <Flex>
            <Text fw={500} mr={'sm'}>
              Дата создания:
            </Text>{' '}
            {new Date(order.createdAt).toLocaleString()}
          </Flex>

          <Flex>
            <Text fw={500} mr={'sm'}>
              Количество товаров:
            </Text>{' '}
            {order.items.length}
          </Flex>

          <Flex direction={'column'} gap={'xs'}>
            <Button onClick={toggle}>Показать список товаров</Button>

            <Collapse in={opened}>
              <Paper className={classes.paper} p={'sm'} withBorder>
                <Flex direction={'column'}>
                  {order.items.map((order) => (
                    <Link className={classes.link} key={order.id} to={`/advertisements/${order.id}`}>
                      {order.name}
                    </Link>
                  ))}
                </Flex>
              </Paper>
            </Collapse>

            <Button disabled={isComplete} onClick={() => void toggleComplete()}>
              {isComplete ? 'Заказ завершен' : 'Завершить заказ'}
            </Button>
          </Flex>
        </Flex>
      </Paper>
    </GridCol>
  );
};
