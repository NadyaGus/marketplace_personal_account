import type { ReactNode } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Burger, Container, Drawer, Flex, Group, Image, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { HeaderLink } from '../types';

import logo from './assets/Avito_logo.svg';

import classes from './header.module.css';

export const Header = ({ links }: { links: HeaderLink[] }): ReactNode => {
  const [active, setActive] = useState(links[0].link);
  const [opened, { toggle }] = useDisclosure(false);
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      className={classes.link}
      data-active={active === link.link || undefined}
      key={link.label}
      onClick={() => {
        setActive(link.link);
        if (drawerOpened) {
          handleBurgerClick();
        }
      }}
      to={link.link}
    >
      {link.label}
    </Link>
  ));

  const handleBurgerClick = (): void => {
    toggle();
    toggleDrawer();
  };

  return (
    <header className={classes.header}>
      <Container className={classes.inner} maw={1280} px={'lg'}>
        <Link to="/">
          <Image alt="logo" src={logo} w={100} />
        </Link>

        <Title display={{ base: 'none', sm: 'block' }} order={1} size={'1.5rem'}>
          Личный кабинет
        </Title>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          hiddenFrom="xs"
          onClick={() => {
            handleBurgerClick();
          }}
          opened={opened}
          size="sm"
        />

        <Drawer
          className={classes.drawer}
          hiddenFrom="xs"
          onClose={closeDrawer}
          opened={drawerOpened}
          padding="md"
          position="top"
          size={'xs'}
          zIndex={1}
        >
          <Flex align="center" direction="column" gap={24} justify="center" mt={32} pb="xl" ta="center">
            {items}
          </Flex>
        </Drawer>
      </Container>
    </header>
  );
};
