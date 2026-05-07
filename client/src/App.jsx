import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import Kanban from './pages/Kanban';
import InvoiceSettings from './pages/InvoiceSettings';
import Subscription from './pages/Subscription';
import ClientPortal from './pages/ClientPortal';
import InvoiceDetails from './pages/InvoiceDetails';
import Reports from './pages/Reports';
import Gateways from './pages/Gateways';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Security from './pages/Security';
import HelpCenter from './pages/HelpCenter';

const SubscriptionGuard = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;

  // Admin bypass
  if (user.role === 'admin') return children;

  // Check if subscription active or trial not expired
  if (user.subscriptionStatus === 'active') return children;

  const now = new Date();
  const trialEndsAt = new Date(user.trialEndsAt);
  
  if (now > trialEndsAt) {
    return <Navigate to="/pricing" />;
  }

  return children;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={
              <SubscriptionGuard>
                <Dashboard />
              </SubscriptionGuard>
            } />
            <Route path="/invoices" element={
              <SubscriptionGuard>
                <Invoices />
              </SubscriptionGuard>
            } />
            <Route path="/invoices/:id" element={
              <SubscriptionGuard>
                <InvoiceDetails />
              </SubscriptionGuard>
            } />
            <Route path="/reports" element={
              <SubscriptionGuard>
                <Reports />
              </SubscriptionGuard>
            } />
            <Route path="/gateways" element={
              <SubscriptionGuard>
                <Gateways />
              </SubscriptionGuard>
            } />
            <Route path="/clients" element={
              <SubscriptionGuard>
                <Clients />
              </SubscriptionGuard>
            } />
            <Route path="/features" element={
              <SubscriptionGuard>
                <Features />
              </SubscriptionGuard>
            } />
            <Route path="/projects" element={
              <SubscriptionGuard>
                <Kanban />
              </SubscriptionGuard>
            } />
            <Route path="/settings/invoice" element={
              <SubscriptionGuard>
                <InvoiceSettings />
              </SubscriptionGuard>
            } />
            <Route path="/settings/subscription" element={
              <SubscriptionGuard>
                <Subscription />
              </SubscriptionGuard>
            } />
            <Route path="/settings/security" element={
              <SubscriptionGuard>
                <Security />
              </SubscriptionGuard>
            } />
            <Route path="/settings/account" element={
              <SubscriptionGuard>
                <AccountSettings />
              </SubscriptionGuard>
            } />
            <Route path="/profile" element={
              <SubscriptionGuard>
                <Profile />
              </SubscriptionGuard>
            } />
            <Route path="/help" element={
              <SubscriptionGuard>
                <HelpCenter />
              </SubscriptionGuard>
            } />
            <Route path="/portal" element={
              <SubscriptionGuard>
                <ClientPortal />
              </SubscriptionGuard>
            } />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Navigate to="/settings/invoice" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </LanguageProvider>
  );
}

export default App;
