import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { CustomThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { MonthFilterProvider } from './context/MonthFilterContext';
import { CompanyProvider } from './context/CompanyContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { BillingPage } from './pages/BillingPage';
import { PurchasePage } from './pages/PurchasePage';
import { WorkersPage } from './pages/WorkersPage';
import { PartiesPage } from './pages/PartiesPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { MonthWiseReportPage } from './pages/MonthWiseReportPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppUsersPage } from './pages/AppUsersPage';
import { ApiDocsPage } from './pages/ApiDocsPage';

const drawerWidth = 260;

function MainAppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <Header onToggleMobileDrawer={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          overflowX: 'hidden',
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/purchases" element={<PurchasePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/parties" element={<PartiesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/month-wise" element={<MonthWiseReportPage />} />
          <Route path="/monthly-summary" element={<MonthWiseReportPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/app-users" element={<AppUsersPage />} />
          <Route path="/api-docs" element={<ApiDocsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CompanyProvider>
            <MonthFilterProvider>
              <BrowserRouter>
                <MainAppLayout />
              </BrowserRouter>
            </MonthFilterProvider>
          </CompanyProvider>
        </AuthProvider>
      </NotificationProvider>
    </CustomThemeProvider>
  );
}
