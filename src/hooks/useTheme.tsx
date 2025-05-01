
import { useContext } from 'react';
import ThemeContext, { ThemeMode } from '@/context/ThemeContext';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

// This is a simple wrapper around the ThemeContext to provide a more convenient API
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default useTheme;
