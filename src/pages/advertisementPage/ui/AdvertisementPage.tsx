import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import placeholderImage from '@/../public/placeholder.png';
import { Badge, Button, Collapse, Container, Flex, Image, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { Advertisment } from '@/types';

import { EditAdvertisementModal } from './modal/EditAdvertisementModal';

const MAX_LENGTH_DESCRIPTION = 200;

export const AdvertisementPage = (): ReactNode => {
  const data = useLoaderData() as Advertisment;
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [opened, { close, open }] = useDisclosure(false);

  window.scrollTo(0, 0);

  if (!data.id) {
    return (
      <Flex align={'center'} direction={'column'} justify={'center'} p={'20vh'}>
        <Title order={1} ta={'center'}>
          Объявление не найдено
        </Title>
        <Button mt={'lg'} onClick={() => navigate('/')} w={320}>
          На главную
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <Container maw={1280} px={'lg'}>
        <Flex
          align={{ base: 'normal', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap={'lg'}
          justify={'space-between'}
          py={'lg'}
        >
          <Title order={1}>{data.name}</Title>
          <Button onClick={open} w={{ base: '100%', xs: 320 }}>
            Редактировать объявление
          </Button>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} gap={'lg'}>
          <Skeleton
            h={{ base: 400, md: 600 }}
            radius={'0.5rem'}
            visible={navigation.state === 'loading'}
            w={{ base: '100%', md: '50%' }}
          >
            {
              <Image
                alt={data.name}
                h={{ base: 400, md: 600 }}
                radius={'0.5rem'}
                src={data.imageUrl ? data.imageUrl : placeholderImage}
                w={'100%'}
              />
            }
          </Skeleton>

          <Flex direction={'column'} gap={'lg'} justify="start" m={0} w={{ base: '100%', md: '50%' }}>
            <Title order={3}>Цена: {data.price}</Title>

            <Flex gap={'lg'}>
              <Badge color="pink" size="lg" variant="light">
                Просмотры: {data.views}
              </Badge>

              <Badge color="pink" size="lg" variant="light">
                Нравится: {data.likes}
              </Badge>
            </Flex>

            <Title order={3}>Описание</Title>

            {!data.description || data.description === '' ? 'Описание отсутствует' : null}

            <Text c={'dimmed'}>
              {!showMore
                ? data.description?.substring(0, MAX_LENGTH_DESCRIPTION) &&
                  data.description?.length > MAX_LENGTH_DESCRIPTION
                  ? data.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : data.description
                : null}
            </Text>

            <Collapse c="dimmed" in={showMore}>
              {showMore
                ? data.description
                : data.description && data.description?.length > MAX_LENGTH_DESCRIPTION
                  ? data.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : data.description}
            </Collapse>

            {data.description && data.description?.length > MAX_LENGTH_DESCRIPTION ? (
              <Button
                mt={'sm'}
                onClick={() => {
                  setShowMore(!showMore);
                }}
                w={200}
              >
                {showMore ? 'Скрыть' : 'Показать больше'}
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Container>
      <EditAdvertisementModal advertisement={data} close={close} opened={opened} />
    </>
  );
};
