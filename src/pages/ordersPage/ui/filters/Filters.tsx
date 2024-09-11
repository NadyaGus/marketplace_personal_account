import { type ReactNode, useState } from 'react';

import { Checkbox, Flex } from '@mantine/core';

import { OrderStatusParse } from '@/entities/order/model/orderStatusParse';
import { OrderStatus } from '@/types';

import { useFilters } from '../../model/useFilters';

export const Filters = (): ReactNode => {
  const [checkArchived, setCheckedArchived] = useState(true);
  const [checkCreated, setCheckedCreated] = useState(true);
  const [checkDeliveredToThePoint, setCheckedDeliveredToThePoint] = useState(true);
  const [checkPaid, setCheckedPaid] = useState(true);
  const [checkReceived, setCheckedReceived] = useState(true);
  const [checkRefund, setCheckedRefund] = useState(true);
  const [checkTransport, setCheckedTransport] = useState(true);

  const { handleFilter } = useFilters();

  return (
    <Flex gap={'lg'} wrap={'wrap'}>
      <Checkbox
        checked={checkArchived}
        label={OrderStatusParse[OrderStatus.Archived]}
        onChange={() => {
          setCheckedArchived(!checkArchived);
          handleFilter(OrderStatus.Archived);
        }}
        w={120}
      />
      <Checkbox
        checked={checkCreated}
        label={OrderStatusParse[OrderStatus.Created]}
        onChange={() => {
          setCheckedCreated(!checkCreated);
          handleFilter(OrderStatus.Created);
        }}
        w={120}
      />
      <Checkbox
        checked={checkDeliveredToThePoint}
        label={OrderStatusParse[OrderStatus.DeliveredToThePoint]}
        onChange={() => {
          setCheckedDeliveredToThePoint(!checkDeliveredToThePoint);
          handleFilter(OrderStatus.DeliveredToThePoint);
        }}
        w={120}
      />
      <Checkbox
        checked={checkPaid}
        label={OrderStatusParse[OrderStatus.Paid]}
        onChange={() => {
          setCheckedPaid(!checkPaid);
          handleFilter(OrderStatus.Paid);
        }}
        w={120}
      />
      <Checkbox
        checked={checkReceived}
        label={OrderStatusParse[OrderStatus.Received]}
        onChange={() => {
          setCheckedReceived(!checkReceived);
          handleFilter(OrderStatus.Received);
        }}
        w={120}
      />
      <Checkbox
        checked={checkRefund}
        label={OrderStatusParse[OrderStatus.Refund]}
        onChange={() => {
          setCheckedRefund(!checkRefund);
          handleFilter(OrderStatus.Refund);
        }}
        w={120}
      />
      <Checkbox
        checked={checkTransport}
        label={OrderStatusParse[OrderStatus.Transport]}
        onChange={() => {
          setCheckedTransport(!checkTransport);
          handleFilter(OrderStatus.Transport);
        }}
        w={120}
      />
    </Flex>
  );
};
