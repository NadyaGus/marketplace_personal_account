import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Modal, TextInput, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';

import type { Advertisement } from '@/entities/advertisement';

import { createAdvertisement } from '../../model/createAdvertisement';

import classes from './createAdvertisementModal.module.css';

export const CreateAdvertisementModal = ({ close, opened }: { close: () => void; opened: boolean }): ReactNode => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    <Modal
      className={classes.modal}
      onClose={() => {
        close();
        form.reset();
      }}
      opened={opened}
      title="Новое объявление"
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
  );
};
