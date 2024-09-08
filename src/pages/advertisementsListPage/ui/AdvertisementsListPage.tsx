import { type ReactNode } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Container, Modal, TextInput, Textarea, Title } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import type { Advertisement } from '@/entities/advertisement';

import { AdvertisementItem } from '@/entities/advertisement';
import { PaginationWidget } from '@/widgets/pagination';

import type { AdvertisementPageResponse } from '../types';

import { createAdvertisement } from '../model/createAdvertisement';

import classes from './advertisementsListPage.module.css';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData() as AdvertisementPageResponse;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [opened, { close, open }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      createdAt: new Date().toISOString(),
      description: '',
      imageUrl: '',
      name: '',
      price: 0,
    },
    validate: {
      name: (value) => (value.length < 5 ? 'Название должно иметь минимум 5 символов' : null),
      price: (value) => (value < 0 || !+value ? 'Введите корректную цену' : null),
    },
  });

  const handleSubmit = async (advertisement: Partial<Advertisement>): Promise<void> => {
    await createAdvertisement(advertisement);
    form.reset();
    close();
    navigate(`/advertisements?${searchParams.get('page') ? `page=${searchParams.get('page')}` : '1'}`);
  };

  return (
    <>
      <Container maw={1280} px={'lg'}>
        <Title order={2}>Ваши объявления</Title>
        {pageLoaderData.data.map((item) => (
          <AdvertisementItem key={item.id} {...item} />
        ))}

        <Button onClick={open}>Создать новое объявление</Button>
      </Container>

      <PaginationWidget pages={pageLoaderData.pages} />

      <Modal
        className={classes.modal}
        onClose={() => {
          close();
          form.reset();
        }}
        opened={opened}
        title="Новое объявлениe"
        withCloseButton={true}
      >
        <Form
          form={form}
          onSubmit={(advertisement) => {
            handleSubmit(advertisement).catch((error) => console.error(error));
          }}
        >
          <TextInput
            label="Название объявления"
            mih={88}
            placeholder="Введите название объявления"
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Ссылка на изображение"
            mih={88}
            placeholder="Введите ссылку на изображение"
            {...form.getInputProps('imageUrl')}
          />

          <TextInput label="Цена в рублях" mih={88} placeholder="Введите цену" {...form.getInputProps('price')} />

          <Textarea
            label="Описание"
            maxLength={200}
            mb={32}
            placeholder="Введите описание"
            {...form.getInputProps('description')}
          />
          <Button type="submit">Создать</Button>
        </Form>
      </Modal>
    </>
  );
};
