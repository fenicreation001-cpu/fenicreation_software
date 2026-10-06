import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BillingIcon from '@mui/icons-material/ReceiptLong';
import PurchaseIcon from '@mui/icons-material/ShoppingCart';
import WorkerIcon from '@mui/icons-material/Badge';
import PartyIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/AccountBalanceWallet';
import ReportIcon from '@mui/icons-material/Assessment';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import SettingIcon from '@mui/icons-material/Settings';
import AndroidIcon from '@mui/icons-material/PhoneAndroid';
import CodeIcon from '@mui/icons-material/Code';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppManageIcon from '@mui/icons-material/AdminPanelSettings';
import UsersIcon from '@mui/icons-material/Group';
import { useThemeContext } from '../context/ThemeContext';
import { useCompany } from '../context/CompanyContext';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  drawerWidth: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile, drawerWidth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { language } = useThemeContext();
  const { settings } = useCompany();

  const isAppManageActive = location.pathname === '/app-users' || location.pathname === '/api-docs';
  const [appManageOpen, setAppManageOpen] = useState<boolean>(isAppManageActive);

  useEffect(() => {
    if (isAppManageActive) {
      setAppManageOpen(true);
    }
  }, [location.pathname, isAppManageActive]);

  const navItems = [
    { text: 'Dashboard', guText: 'ડેશબોર્ડ', icon: <DashboardIcon />, path: '/' },
    { text: 'Billing Management', guText: 'બિલિંગ મેનેજમેન્ટ', icon: <BillingIcon />, path: '/billing' },
    { text: 'Material Purchase', guText: 'ખરીદી મેનેજમેન્ટ', icon: <PurchaseIcon />, path: '/purchases' },
    { text: 'Worker Salary', guText: 'કારીગર પગાર (ઉપાડ)', icon: <WorkerIcon />, path: '/workers' },
    { text: 'Party Management', guText: 'પાર્ટી મેનેજમેન્ટ', icon: <PartyIcon />, path: '/parties' },
    { text: 'Payment Management', guText: 'ચુકવણી મેનેજમેન્ટ', icon: <PaymentIcon />, path: '/payments' },
    { text: 'Month-Wise Report', guText: 'મહિનાવાર સમરી રિપોર્ટ', icon: <CalendarIcon />, path: '/month-wise' },
    { text: 'Reports & Export', guText: 'રિપોર્ટ્સ અને એક્સપોર્ટ', icon: <ReportIcon />, path: '/reports' },
    { text: 'Settings', guText: 'સેટિંગ્સ', icon: <SettingIcon />, path: '/settings' },
  ];

  const appManageItems = [
    { text: 'App Users', guText: 'એપ યુઝર્સ (મોબાઇલ)', icon: <UsersIcon />, path: '/app-users' },
    { text: 'Android API Docs', guText: 'એન્ડ્રોઇડ એપીઆઈ ડોક્સ', icon: <CodeIcon />, path: '/api-docs' },
  ];

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#0f172a', // Slate 900
        color: '#f8fafc',
        py: 2.5,
        px: 2,
      }}
    >
      {/* Brand Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, mb: 3 }}>
        {settings.logoUrl ? (
          <Box
            component="img"
            src={settings.logoUrl}
            alt={settings.companyName || 'Logo'}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              objectFit: 'cover',
              bgcolor: '#ffffff',
              p: 0.2,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            }}
          />
        ) : (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: '#6366f1', // Indigo 500
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            }}
          >
            {settings.companyName ? settings.companyName.charAt(0) : 'F'}
          </Box>
        )}
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1, color: '#ffffff', letterSpacing: '-0.02em' }} noWrap>
            {settings.companyName || 'FENI CREATION'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 500 }} noWrap>
            {settings.tagline || (language === 'gu' ? 'બિલિંગ અને એકાઉન્ટિંગ' : 'Textile Billing & ERP')}
          </Typography>
        </Box>
      </Box>

      {/* Navigation List */}
      <List disablePadding sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={isMobile ? onCloseMobile : undefined}
                sx={{
                  borderRadius: '8px',
                  py: 1,
                  px: 1.8,
                  bgcolor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  color: isActive ? '#818cf8' : '#94a3b8',
                  borderLeft: isActive ? '4px solid #6366f1' : '4px solid transparent',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    '& .MuiListItemIcon-root': {
                      color: '#ffffff',
                    },
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#818cf8' : '#64748b',
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={language === 'gu' ? item.guText : item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: isActive ? '0.01em' : 'normal',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* App Manage Collapsible Dropdown Menu */}
        <ListItem disablePadding sx={{ mt: 0.5 }}>
          <ListItemButton
            onClick={() => setAppManageOpen((prev) => !prev)}
            sx={{
              borderRadius: '8px',
              py: 1,
              px: 1.8,
              bgcolor: isAppManageActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: isAppManageActive ? '#818cf8' : '#94a3b8',
              borderLeft: isAppManageActive ? '4px solid #6366f1' : '4px solid transparent',
              '&:hover': {
                bgcolor: isAppManageActive ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                '& .MuiListItemIcon-root': {
                  color: '#ffffff',
                },
              },
              transition: 'all 0.15s ease',
            }}
          >
            <ListItemIcon
              sx={{
                color: isAppManageActive ? '#818cf8' : '#64748b',
                minWidth: 36,
              }}
            >
              <AppManageIcon />
            </ListItemIcon>
            <ListItemText
              primary={language === 'gu' ? 'એપ મેનેજમેન્ટ' : 'App Manage'}
              primaryTypographyProps={{
                sx: {
                  fontSize: '0.875rem',
                  fontWeight: isAppManageActive ? 700 : 500,
                  letterSpacing: isAppManageActive ? '0.01em' : 'normal',
                },
              }}
            />
            {appManageOpen ? (
              <ExpandLess sx={{ fontSize: 20, color: isAppManageActive ? '#818cf8' : '#64748b' }} />
            ) : (
              <ExpandMore sx={{ fontSize: 20, color: '#64748b' }} />
            )}
          </ListItemButton>
        </ListItem>

        {/* Sub-items for App Manage */}
        <Collapse in={appManageOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
            {appManageItems.map((subItem) => {
              const isSubActive = location.pathname === subItem.path;
              return (
                <ListItem key={subItem.path} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={subItem.path}
                    onClick={isMobile ? onCloseMobile : undefined}
                    sx={{
                      borderRadius: '8px',
                      py: 0.8,
                      px: 1.5,
                      bgcolor: isSubActive ? 'rgba(99, 102, 241, 0.22)' : 'transparent',
                      color: isSubActive ? '#a5b4fc' : '#94a3b8',
                      borderLeft: isSubActive ? '3px solid #818cf8' : '3px solid transparent',
                      '&:hover': {
                        bgcolor: isSubActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        '& .MuiListItemIcon-root': {
                          color: '#ffffff',
                        },
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isSubActive ? '#a5b4fc' : '#64748b',
                        minWidth: 32,
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.15rem',
                        },
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={language === 'gu' ? subItem.guText : subItem.text}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '0.825rem',
                          fontWeight: isSubActive ? 700 : 500,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>

      <Divider sx={{ borderColor: '#1e293b', my: 2 }} />

      {/* Footer / User Profile Badge */}
      <Box sx={{ p: 1.5, bgcolor: '#1e293b', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {settings.logoUrl ? (
          <Box
            component="img"
            src={settings.logoUrl}
            alt="Logo"
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              objectFit: 'cover',
              bgcolor: '#ffffff',
              p: 0.2,
            }}
          />
        ) : (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#4f46e5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          >
            AD
          </Box>
        )}
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#ffffff', fontSize: '0.8rem', lineHeight: 1.2 }} noWrap>
            Feni Admin
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block' }} noWrap>
            GSTIN: {settings.gstin || '24BAMPV2618G2ZI'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#0f172a', borderRight: '1px solid #1e293b' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#0f172a', borderRight: '1px solid #1e293b' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
