import * as React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TSO from './pages/TSO';
import Acts from './pages/Acts';
import Invoices from './pages/Invoices';
import ArchivePage from './pages/Archive';
import SettingsPage from './pages/Settings';
import Sidebar from './components/Sidebar'; // убедись, что путь корректный
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = React.useState('ТСО');
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { label: 'ТСО', path: '/tso' },
    { label: 'Акты', path: '/acts' },
    { label: 'Накладные', path: '/invoices' },
    { label: 'Архив', path: '/archive' },
    { label: 'Настройки', path: '/settings' },
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => currentPath.startsWith(item.path));
    if (activeItem) {
      setActiveButton(activeItem.label);
    }
  }, [location]);

  const drawerWidth = collapsed ? 60 : 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          p: 3,
          transition: 'margin-left 0.3s',
        }}
      >
        <Routes>
          <Route path="/tso" element={<TSO />} />
          <Route path="/acts" element={<Acts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<TSO />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
