import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { FormProvider } from "./contexts/FormContext";
import ApplicationWizard from "./components/ApplicationWizard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AccessibilityProvider>
          <NavigationProvider>
            <FormProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-start">
                <Toaster position="top-right" />
                <Routes>
                  <Route path="/" element={<ApplicationWizard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </FormProvider>
          </NavigationProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
