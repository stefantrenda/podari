
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DonationDetails from "./pages/DonationDetails";
import CreateDonation from "./pages/CreateDonation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import { DonationProvider } from "./contexts/DonationContext";
import { SocketProvider } from "./contexts/SocketContext";
import { MessageProvider } from "./contexts/MessageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SocketProvider>
        <DonationProvider>
          <MessageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/donation/:id" element={<DonationDetails />} />
                <Route path="/create" element={<CreateDonation />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MessageProvider>
        </DonationProvider>
      </SocketProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
