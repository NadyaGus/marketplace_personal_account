import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from '@mantine/form';

import type { Advertisment } from '@/types';

import { AdvertisementModal } from '@/shared/advertisementModal/AdvertisementModal';

import { createAdvertisement } from '../../model/createAdvertisement';

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

  const handleSubmit = async (advertisement: Partial<Advertisment>): Promise<void> => {
    await createAdvertisement(advertisement);
    form.reset();
    close();
    navigate(`/advertisements?${searchParams.get('page') ? `page=${searchParams.get('page')}` : '1'}`);
  };

  return (
    <AdvertisementModal
      buttonTitle={'Создать объявление'}
      close={close}
      form={form}
      handleSubmit={handleSubmit}
      modalTitle={'Создание объявления'}
      opened={opened}
    />
  );
};
