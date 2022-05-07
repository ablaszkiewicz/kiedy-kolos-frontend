import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';

export const UserMenu = () => {
  return (
    <Menu>
      <MenuButton>Profil</MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
        </Center>
        <br />
        <Center>
          <p>Username</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Wyloguj</MenuItem>
      </MenuList>
    </Menu>
  );
};
