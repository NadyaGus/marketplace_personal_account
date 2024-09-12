import type { ReactNode } from 'react';

import { Anchor, Text } from '@mantine/core';

import classes from './footer.module.css';

export const Footer = (): ReactNode => {
  return (
    <footer className={classes.footer}>
      <Anchor component="a" fw={500} href="https://github.com/NadyaGus" target="_blank">
        GitHub
      </Anchor>
      <Text fw={500}>2024</Text>
      <Anchor component="a" fw={500} href="https://gitverse.ru/NadyaGus" target="_blank">
        GitVerse
      </Anchor>
    </footer>
  );
};
