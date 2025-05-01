
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types for components and themes
export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  previewProps?: Record<string, any>;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
    [key: string]: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      sm: string;
      lg: string;
      xl: string;
      '2xl': string;
      [key: string]: string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
      [key: string]: string;
    };
  };
  spacing: {
    [key: string]: string;
  };
  borderRadius: {
    [key: string]: string;
  };
  shadows: {
    [key: string]: string;
  };
}

export interface AdminState {
  isAdminMode: boolean;
  isEditing: boolean;
  components: Component[];
  selectedComponent: Component | null;
  themes: Theme[];
  activeTheme: Theme;
}

type AdminAction =
  | { type: 'SET_ADMIN_MODE'; payload: boolean }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_COMPONENTS'; payload: Component[] }
  | { type: 'SET_SELECTED_COMPONENT'; payload: Component | null }
  | { type: 'UPDATE_COMPONENT'; payload: Component }
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'SET_THEMES'; payload: Theme[] }
  | { type: 'SET_ACTIVE_THEME'; payload: Theme }
  | { type: 'UPDATE_THEME'; payload: Theme };

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
  code: '<Button variant="default">Primary Button</Button>',
  category: 'buttons',
  tags: ['button', 'primary', 'interactive'],
};

// Initial state
const initialState: AdminState = {
  isAdminMode: false,
  isEditing: false,
  components: [sampleButton],
  selectedComponent: null,
  themes: [defaultTheme],
  activeTheme: defaultTheme,
};

// Create context
const AdminContext = createContext<{
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
    case 'SET_EDITING':
      return { ...state, isEditing: action.payload };
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
          state.activeTheme.id === action.payload.id
            ? action.payload
            : state.activeTheme,
      };
    default:
      return state;
  }
}

// Provider component
export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook for using the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return {
    ...context,
    isAdminMode: context.state.isAdminMode,
    isEditing: context.state.isEditing,
    components: context.state.components,
    selectedComponent: context.state.selectedComponent,
    themes: context.state.themes,
    activeTheme: context.state.activeTheme,
    setAdminMode: (value: boolean) => context.dispatch({ type: 'SET_ADMIN_MODE', payload: value }),
    setIsEditing: (value: boolean) => context.dispatch({ type: 'SET_EDITING', payload: value }),
    selectComponent: (component: Component | null) => context.dispatch({ type: 'SET_SELECTED_COMPONENT', payload: component }),
    updateComponent: (component: Component) => context.dispatch({ type: 'UPDATE_COMPONENT', payload: component }),
    addComponent: (component: Component) => context.dispatch({ type: 'ADD_COMPONENT', payload: component }),
    deleteComponent: (id: string) => context.dispatch({ type: 'DELETE_COMPONENT', payload: id }),
    setActiveTheme: (theme: Theme) => context.dispatch({ type: 'SET_ACTIVE_THEME', payload: theme }),
    updateTheme: (theme: Theme) => context.dispatch({ type: 'UPDATE_THEME', payload: theme }),
  };
};

export default AdminContext;
