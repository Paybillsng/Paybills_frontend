import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NotificationProvider } from "@/hooks/useNotifications";
import { setupPaymentProviders } from "@/lib/paymentProviders";
import App from "./App";
import "./index.css";
import "./lib/i18n";

const queryClient = new QueryClient();

// Setup payment providers
setupPaymentProviders();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider userId="demo-user-id">
          <App />
          <Toaster />
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
