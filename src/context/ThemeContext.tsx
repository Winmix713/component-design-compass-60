
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAdmin } from './AdminContext';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  applyThemeVariable: (variable: string) => string;
  getThemeColor: (colorName: string) => string;
  getThemeValue: (category: string, key: string) => string;
  radius: string;
  setRadius: (radius: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  isDarkMode: false,
  applyThemeVariable: () => '',
  getThemeColor: () => '',
  getThemeValue: () => '',
  radius: '0.5rem',
  setRadius: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeTheme } = useAdmin();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [radius, setRadius] = useState('0.5rem');

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Use system preference as default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    // Check for saved radius
    const savedRadius = localStorage.getItem('radius');
    if (savedRadius) {
      setRadius(savedRadius);
    }
  }, []);

  // Apply theme based on mode
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      setIsDarkMode(theme === 'dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply CSS variable for border radius
    const root = document.documentElement;
    root.style.setProperty('--radius', radius);
    localStorage.setItem('radius', radius);
  }, [radius]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'light';
      // If system, use the opposite of the current system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'light' : 'dark';
    });
  };

  // Theme utility functions
  const applyThemeVariable = (variable: string) => {
    // Format: category.key (e.g., colors.primary, typography.fontSize.base)
    const parts = variable.split('.');
    if (parts.length < 2 || !activeTheme) return '';

    const category = parts[0];
    const path = parts.slice(1);

    let value: any = activeTheme?.[category as keyof typeof activeTheme];
    
    for (const key of path) {
      if (!value || typeof value !== 'object') return '';
      value = value[key];
    }

    return value || '';
  };

  const getThemeColor = (colorName: string) => {
    return activeTheme?.colors?.[colorName] || '';
  };

  const getThemeValue = (category: string, key: string) => {
    if (!activeTheme) return '';
    const categoryObj = activeTheme[category as keyof typeof activeTheme];
    if (!categoryObj || typeof categoryObj !== 'object') return '';
    
    return (categoryObj as any)[key] || '';
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme,
        toggleTheme,
        isDarkMode,
        applyThemeVariable,
        getThemeColor,
        getThemeValue,
        radius,
        setRadius
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
