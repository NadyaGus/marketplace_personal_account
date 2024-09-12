import { type ReactNode, useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';

import placeholderImage from '@/../public/placeholder.png';
import { Badge, Button, Collapse, Flex, Image, Paper, Skeleton, Text, Title } from '@mantine/core';

import type { Advertisment } from '@/types';

import classes from './advertisementCard.module.css';

const MAX_LENGTH_DESCRIPTION = 200;

export const AdvertisementCard = ({ item }: { item: Advertisment }): ReactNode => {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  return (
    <Link className={classes.link} to={`/advertisements/${item.id}`}>
      <Paper p={'lg'} shadow="md">
        <Flex align={'start'} className={classes.card} direction={{ base: 'column', sm: 'row' }} gap={'lg'}>
          <Flex direction={'column'} maw={{ base: '100%', sm: 360 }} w={{ base: '100%', sm: '50%' }}>
            <Skeleton h={200} radius={'0.5rem'} visible={navigation.state === 'loading'} w={'100%'}>
              {
                <Image
                  alt={item.name}
                  h={200}
                  radius={'0.5rem'}
                  src={item.imageUrl ? item.imageUrl : placeholderImage}
                  w={'100%'}
                />
              }
            </Skeleton>

            <Flex direction={{ base: 'column', sm: 'row' }} gap={'sm'} pt={'lg'}>
              <Badge color="pink" variant="light">
                Просмотры: {item.views ?? 0}
              </Badge>

              <Badge color="pink" variant="light">
                Нравится: {item.likes ?? 0}
              </Badge>
            </Flex>
          </Flex>

          <Flex direction={'column'} justify="start" m={0} w={{ base: '100%', lg: '100%', sm: '50%' }}>
            <Flex direction={'column'}>
              <Title c={'blue.8'} className={classes.title} fw={500} mb={'sm'} order={3}>
                {item.name}
              </Title>
              <Text mb={'sm'}>Цена: {item.price}</Text>
            </Flex>

            <Text c={'dimmed'}>
              {!showMore
                ? item.description?.substring(0, MAX_LENGTH_DESCRIPTION) &&
                  item.description?.length > MAX_LENGTH_DESCRIPTION
                  ? item.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : item.description
                : null}
            </Text>

            <Collapse c="dimmed" in={showMore}>
              {showMore
                ? item.description
                : item.description && item.description?.length > MAX_LENGTH_DESCRIPTION
                  ? item.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : item.description}
            </Collapse>

            {item.description && item.description?.length > MAX_LENGTH_DESCRIPTION ? (
              <Button
                mt={'sm'}
                onClick={(e) => {
                  e.preventDefault();
                  setShowMore(!showMore);
                }}
                w={200}
              >
                {showMore ? 'Скрыть' : 'Показать больше'}
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Paper>
    </Link>
  );
};
