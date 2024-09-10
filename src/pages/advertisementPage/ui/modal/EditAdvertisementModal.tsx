import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, TextInput, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';

import type { Advertisment } from '@/types';

import { editAdvertisement } from '../../model/editAdvertisement';

import classes from './editAdvertisementModal.module.css';

export const EditAdvertisementModal = ({
  advertisement,
  close,
  opened,
}: {
  advertisement: Advertisment;
  close: () => void;
  opened: boolean;
}): ReactNode => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      createdAt: advertisement.createdAt,
      description: advertisement.description,
      id: advertisement.id,
      imageUrl: advertisement.imageUrl,
      name: advertisement.name,
      price: advertisement.price,
    },
    validate: {
      name: (value) => (value.length < 5 ? 'Название должно иметь минимум 5 символов' : null),
      price: (value) => (value < 0 || !+value ? 'Введите корректную цену' : null),
    },
  });

  const handleSubmit = async (advertisement: Omit<Advertisment, 'createdAt' | 'likes' | 'views'>): Promise<void> => {
    await editAdvertisement(advertisement);
    form.reset();
    close();
    navigate(`/advertisements/${advertisement.id}`);
  };

  return (
    <Modal
      className={classes.modal}
      onClose={() => {
        close();
        form.reset();
      }}
      opened={opened}
      title="Редактировать объявление"
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
        <Button type="submit">Сохранить</Button>
      </Form>
    </Modal>
  );
};
