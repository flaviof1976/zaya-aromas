import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/politica-de-privacidade"} component={PrivacyPolicy} />
      <Route path={"/termos-de-uso"} component={Terms} />
      <Route path={"/trocas-e-devolucoes"} component={Returns} />
      <Route path={"/politica-de-cookies"} component={CookiePolicy} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
