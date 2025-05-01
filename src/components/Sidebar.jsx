import React from 'react';
import { Button, Stack, Box, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Security,
  Description,
  Inventory2,
  Archive,
  Settings,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const drawerWidth = collapsed ? 40 : 130;

  const menuItems = [
    { label: 'ТСО', icon: <Security />, path: '/tso' },
    { label: 'Акты', icon: <Description />, path: '/acts' },
    { label: 'Накладные', icon: <Inventory2 />, path: '/invoices' },
    { label: 'Архив', icon: <Archive />, path: '/archive' },
    { label: 'Настройки', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#2b2b2b',
        p: 2,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: collapsed ? 'center' : 'flex-start',
        transition: 'width 0.3s',
      }}
    >
      <Box sx={{ alignSelf: collapsed ? 'center' : 'flex-end', mb: 2 }}>
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          disableRipple
          sx={{
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:focus': {
              outline: 'none',
              backgroundColor: 'transparent',
            },
          }}
        >
          {collapsed ? (
            <ChevronRight sx={{ color: '#ffffff' }} />
          ) : (
            <ChevronLeft sx={{ color: '#ffffff' }} />
          )}
        </IconButton>
      </Box>

      <Stack spacing={1} sx={{ width: '100%' }}>
        {menuItems.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Button
              key={item.label}
              startIcon={!collapsed && item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: isActive ? '#2196f3' : '#ffffff',
                backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                },
                textTransform: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                minWidth: 'initial',
                px: collapsed ? 1.5 : 2,
              }}
            >
              {collapsed ? item.icon : item.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Sidebar;
