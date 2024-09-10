import type { UseFormReturnType } from '@mantine/form';

import type { ReactNode } from 'react';

import { Button, Modal, TextInput, Textarea } from '@mantine/core';
import { Form } from '@mantine/form';

import type { Advertisment } from '@/types';

import classes from './advertisementModal.module.css';

export const AdvertisementModal = ({
  buttonTitle,
  close,
  form,
  handleSubmit,
  modalTitle,
  opened,
}: {
  buttonTitle: string;
  close: () => void;
  form: UseFormReturnType<{
    createdAt: string;
    description: string;
    id?: string;
    imageUrl: string;
    name: string;
    price: number;
  }>;
  handleSubmit: (advertisement: Partial<Advertisment>) => Promise<void>;
  modalTitle: string;
  opened: boolean;
}): ReactNode => {
  return (
    <Modal
      className={classes.modal}
      onClose={() => {
        close();
        form.reset();
      }}
      opened={opened}
      title={modalTitle}
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
        <Button type="submit">{buttonTitle}</Button>
      </Form>
    </Modal>
  );
};
