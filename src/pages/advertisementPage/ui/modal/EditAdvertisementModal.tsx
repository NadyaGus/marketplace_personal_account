import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '@mantine/form';

import type { Advertisment } from '@/types';

import { AdvertisementModal } from '@/shared/advertisementModal/AdvertisementModal';

import { editAdvertisement } from '../../model/editAdvertisement';

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
      description: advertisement.description ?? '',
      imageUrl: advertisement.imageUrl ?? '',
      name: advertisement.name,
      price: advertisement.price,
    },
    validate: {
      name: (value) => (value.length < 5 ? 'Название должно иметь минимум 5 символов' : null),
      price: (value) => (value < 0 || !+value ? 'Введите корректную цену' : null),
    },
  });

  const handleSubmit = async (editedAdvertisement: Partial<Advertisment>): Promise<void> => {
    try {
      await editAdvertisement({ advertisement: editedAdvertisement, id: advertisement.id }).catch((error) =>
        console.error(error),
      );
    } catch {
      form.reset();
    }
    close();
    navigate(`/advertisements/${advertisement.id}`);
  };

  return (
    <AdvertisementModal
      buttonTitle={'Редактировать объявление'}
      close={close}
      form={form}
      handleSubmit={handleSubmit}
      modalTitle="Редактировать объявление"
      opened={opened}
    />
  );
};
