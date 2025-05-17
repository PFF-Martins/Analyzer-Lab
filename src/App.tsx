
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Index";
import TopologyPage from "./pages/Topology";
import DevicesPage from "./pages/Devices";
import TrafficPage from "./pages/Traffic";
import MetricsPage from "./pages/Metrics";
import DatabasePage from "./pages/Database";
import UsersPage from "./pages/Users";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/topology" element={<Layout><TopologyPage /></Layout>} />
          <Route path="/devices" element={<Layout><DevicesPage /></Layout>} />
          <Route path="/traffic" element={<Layout><TrafficPage /></Layout>} />
          <Route path="/metrics" element={<Layout><MetricsPage /></Layout>} />
          <Route path="/database" element={<Layout><DatabasePage /></Layout>} />
          <Route path="/users" element={<Layout><UsersPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
