import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Flex, Image, Skeleton, Text, Title } from '@mantine/core';

import type { Advertisment } from '@/types';

import classes from './adverticementItem.module.css';

export const AdvertisementItem = ({ item }: { item: Advertisment }): ReactNode => {
  return (
    <Link className={classes.link} to={`/advertisements/${item.id}`}>
      <Flex className={classes.card}>
        <Flex direction={'column'}>
          {/*TODO: add placeholder */}
          {item.imageUrl === '' && <Skeleton h={200} visible={item.imageUrl === ''} w={300} />}
          {item.imageUrl !== '' && <Image alt={item.name} src={item.imageUrl} w={300} />}
          <Flex gap={'sm'}>
            <Badge color="pink" variant="light">
              Просмотры: {item.views ?? 0}
            </Badge>

            <Badge color="pink" variant="light">
              Нравится: {item.likes ?? 0}
            </Badge>
          </Flex>
        </Flex>

        <Flex direction={'column'} justify="start" mb="xs" mt="md">
          <Flex direction={'column'}>
            <Title fw={500} order={3}>
              {item.name}
            </Title>
            <Text>Цена: {item.price}</Text>
          </Flex>

          <Text c="dimmed" size="sm">
            {item.description}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};
