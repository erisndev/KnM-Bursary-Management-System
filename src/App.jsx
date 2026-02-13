import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            <AppRoutes />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg, #363636)',
                color: 'var(--toast-color, #fff)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
