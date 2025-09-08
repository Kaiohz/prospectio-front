import { Toaster } from "@/application/components/ui/toaster";
import { Toaster as Sonner } from "@/application/components/ui/sonner";
import { TooltipProvider } from "@/application/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/application/hooks/use-theme";
import { Layout } from "@/application/components/layout/layout";
import  ChainlitWidget from "@/application/components/chainlit/chainlitWidget";
import Companies from "./application/pages/Companies";
import Contacts from "./application/pages/Contacts";
import Jobs from "./application/pages/Jobs";
import Profile from "./application/pages/Profile";
import NotFound from "./application/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="prospectio-ui-theme">
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Jobs />} />
            <Route path="companies" element={<Companies />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
    <ChainlitWidget/>
  </QueryClientProvider>
);

export default App;
