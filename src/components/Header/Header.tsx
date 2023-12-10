import { Title, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

export function Header() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <>
    <Group bg={dark ? '#373A40' : '#099cff'}>
      <Burger size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <Title className={classes.title} ta="left" mt={5}> {/* margin-top */}
        Licență{' '}
      </Title>
    </Group>
    </>
  );
}
