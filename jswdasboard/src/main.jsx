import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { Accountprovider } from "./context/context";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load the App component for code splitting
const LazyApp = React.lazy(() => import("./App"));

const Root = () => (
  <React.StrictMode>
    <Router>
      <Accountprovider>
        <ThemeProvider>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyApp />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </Accountprovider>
    </Router>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
