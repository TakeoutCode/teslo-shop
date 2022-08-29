import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import EscalatorWarningOutlined from '@mui/icons-material/EscalatorWarningOutlined';
import FemaleOutlined from '@mui/icons-material/FemaleOutlined';
import LoginOutlined from '@mui/icons-material/LoginOutlined';
import MaleOutlined from '@mui/icons-material/MaleOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { UiContext, AuthContext } from '../../context/';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type='text'
              placeholder='Buscar...'
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Mis Ordenes'} />
              </ListItem>
            </>
          )}

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/kid')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItem>

          {isLoggedIn ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Salir'} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Ingresar'} />
            </ListItem>
          )}

          {/* Admin */}

          {user?.role === 'admin' && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Productos'} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Ordenes'} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={'Usuarios'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
