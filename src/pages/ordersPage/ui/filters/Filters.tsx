import { type ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Checkbox, Flex } from '@mantine/core';

import { OrderStatusParse } from '@/entities/order/model/orderStatusParse';
import { OrderStatus } from '@/types';

import { useFilters } from '../../model/useFilters';

export const Filters = (): ReactNode => {
  const searchParams = useSearchParams()[0];
  const filtersValue = searchParams.get('status_ne')?.split(',');

  const [checkArchived, setCheckedArchived] = useState(!filtersValue?.includes(`${OrderStatus.Archived}`));
  const [checkCreated, setCheckedCreated] = useState(!filtersValue?.includes(`${OrderStatus.Created}`));
  const [checkDeliveredToThePoint, setCheckedDeliveredToThePoint] = useState(
    !filtersValue?.includes(`${OrderStatus.DeliveredToThePoint}`),
  );
  const [checkPaid, setCheckedPaid] = useState(!filtersValue?.includes(`${OrderStatus.Paid}`));
  const [checkReceived, setCheckedReceived] = useState(!filtersValue?.includes(`${OrderStatus.Received}`));
  const [checkRefund, setCheckedRefund] = useState(!filtersValue?.includes(`${OrderStatus.Refund}`));
  const [checkTransport, setCheckedTransport] = useState(!filtersValue?.includes(`${OrderStatus.Transport}`));

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
