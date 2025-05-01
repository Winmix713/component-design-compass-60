import React from 'react';
import { useAdmin } from '../hooks/useAdmin';

interface ThemeContextType {
  applyThemeVariable: (variable: string) => string;
  getThemeColor: (colorName: string) => string;
  getThemeValue: (category: string, key: string) => string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  applyThemeVariable: () => '',
  getThemeColor: () => '',
  getThemeValue: () => '',
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { activeTheme } = useAdmin();
  // Add dark mode state
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // Check if dark mode was previously enabled
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('boltoo-theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  // Apply dark mode class to document
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('boltoo-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('boltoo-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const applyThemeVariable = React.useCallback(
    (variable: string) => {
      // Format: category.key (e.g., colors.primary, typography.fontSize.base)
      const parts = variable.split('.');
      if (parts.length < 2) return '';

      const category = parts[0];
      const path = parts.slice(1);

      let value: any = activeTheme?.[category as keyof typeof activeTheme];
      
      for (const key of path) {
        if (!value || typeof value !== 'object') return '';
        value = value[key];
      }

      return value || '';
    },
    [activeTheme]
  );

  const getThemeColor = React.useCallback(
    (colorName: string) => {
      return activeTheme?.colors?.[colorName] || '';
    },
    [activeTheme]
  );

  const getThemeValue = React.useCallback(
    (category: string, key: string) => {
      const categoryObj = activeTheme?.[category as keyof typeof activeTheme];
      if (!categoryObj || typeof categoryObj !== 'object') return '';
      
      return (categoryObj as any)[key] || '';
    },
    [activeTheme]
  );

  const value = React.useMemo(
    () => ({
      applyThemeVariable,
      getThemeColor,
      getThemeValue,
      isDarkMode,
      toggleDarkMode,
    }),
    [applyThemeVariable, getThemeColor, getThemeValue, isDarkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};