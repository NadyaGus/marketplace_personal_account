import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import placeholderImage from '@/../public/placeholder.png';
import { Badge, Button, Collapse, Container, Flex, Image, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { parseAdvertisementData } from '../model/parseAdvertisementData';
import { EditAdvertisementModal } from './modal/EditAdvertisementModal';

const MAX_LENGTH_DESCRIPTION = 200;

export const AdvertisementPage = (): ReactNode => {
  const data = useLoaderData();
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [opened, { close, open }] = useDisclosure(false);

  window.scrollTo(0, 0);

  const isAdvertisement = parseAdvertisementData(data);

  if (!isAdvertisement.id) {
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
          <Title order={1}>{isAdvertisement.name}</Title>
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
                alt={isAdvertisement.name}
                h={{ base: 400, md: 600 }}
                radius={'0.5rem'}
                src={isAdvertisement.imageUrl ? isAdvertisement.imageUrl : placeholderImage}
                w={'100%'}
              />
            }
          </Skeleton>

          <Flex direction={'column'} gap={'lg'} justify="start" m={0} w={{ base: '100%', md: '50%' }}>
            <Title order={3}>Цена: {isAdvertisement.price} ₽</Title>

            <Flex gap={'lg'}>
              <Badge color="pink" size="lg" variant="light">
                Просмотры: {isAdvertisement.views ?? 0}
              </Badge>

              <Badge color="pink" size="lg" variant="light">
                Нравится: {isAdvertisement.likes ?? 0}
              </Badge>
            </Flex>

            <Title order={3}>Описание</Title>

            {!isAdvertisement.description || isAdvertisement.description === '' ? 'Описание отсутствует' : null}

            <Text c={'dimmed'}>
              {!showMore
                ? isAdvertisement.description?.substring(0, MAX_LENGTH_DESCRIPTION) &&
                  isAdvertisement.description?.length > MAX_LENGTH_DESCRIPTION
                  ? isAdvertisement.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : isAdvertisement.description
                : null}
            </Text>

            <Collapse c="dimmed" in={showMore}>
              {showMore
                ? isAdvertisement.description
                : isAdvertisement.description && isAdvertisement.description?.length > MAX_LENGTH_DESCRIPTION
                  ? isAdvertisement.description?.substring(0, MAX_LENGTH_DESCRIPTION) + '...'
                  : isAdvertisement.description}
            </Collapse>

            {isAdvertisement.description && isAdvertisement.description?.length > MAX_LENGTH_DESCRIPTION ? (
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
      <EditAdvertisementModal advertisement={isAdvertisement} close={close} opened={opened} />
    </>
  );
};
