import React from 'react';
import { AdminState, AdminAction, Component, Theme } from './store.types';

// Default theme
const defaultTheme: Theme = {
  id: 'default',
  name: 'Default Theme',
  colors: {
    primary: '#3182ce',
    secondary: '#805ad5',
    background: '#ffffff',
    text: '#1a202c',
    accent: '#ed8936',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      base: '1rem',
      sm: '0.875rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '4': '1rem',
    '8': '2rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// Sample component
const sampleButton: Component = {
  id: 'button-primary',
  name: 'Primary Button',
  description: 'A primary button component',
  code: '<Button color="primary">Primary Button</Button>',
  category: 'buttons',
  tags: ['button', 'primary', 'interactive'],
};

// Initial state
const initialState: AdminState = {
  isAdminMode: false,
  components: [sampleButton],
  selectedComponent: null,
  themes: [defaultTheme],
  activeTheme: defaultTheme,
};

// Create context
const AdminContext = React.createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_ADMIN_MODE':
      return { ...state, isAdminMode: action.payload };
    case 'SET_COMPONENTS':
      return { ...state, components: action.payload };
    case 'SET_SELECTED_COMPONENT':
      return { ...state, selectedComponent: action.payload };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        selectedComponent:
          state.selectedComponent?.id === action.payload.id
            ? action.payload
            : state.selectedComponent,
      };
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case 'DELETE_COMPONENT':
      return {
        ...state,
        components: state.components.filter((c) => c.id !== action.payload),
        selectedComponent:
          state.selectedComponent?.id === action.payload
            ? null
            : state.selectedComponent,
      };
    case 'SET_THEMES':
      return { ...state, themes: action.payload };
    case 'SET_ACTIVE_THEME':
      return { ...state, activeTheme: action.payload };
    case 'UPDATE_THEME':
      return {
        ...state,
        themes: state.themes.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        activeTheme:
          state.activeTheme?.id === action.payload.id
            ? action.payload
            : state.activeTheme,
      };
    default:
      return state;
  }
}

// Provider component
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook for using the admin context
export const useAdmin = () => {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
