import { type ReactNode, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button, Container, Modal, TextInput, Textarea, Title } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import type { Advertisement } from '@/entities/advertisement';

import { AdvertisementItem } from '@/entities/advertisement/ui/AdvertisementItem';

import type { AdvertisementPageResponse } from '../model/types';

import { createAdvertisement } from '../model/createAdvertisement';

import classes from './advertisementsListPage.module.css';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData() as AdvertisementPageResponse;
  const [advertisements] = useState(pageLoaderData.data);
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
    console.log(advertisement);
    const newAdvertisement = await createAdvertisement(advertisement);
    console.log(newAdvertisement?.json());
  };

  return (
    <>
      <Container maw={1280} px={'lg'}>
        <Title order={2}>Ваши объявления</Title>
        {advertisements.map((item) => (
          <AdvertisementItem key={item.id} {...item} />
        ))}

        <Button onClick={open}>Создать новое объявление</Button>
      </Container>

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
