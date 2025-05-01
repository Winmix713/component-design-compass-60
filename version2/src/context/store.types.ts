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
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
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

export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  previewProps?: Record<string, any>;
}

export interface AdminState {
  isAdminMode: boolean;
  components: Component[];
  selectedComponent: Component | null;
  themes: Theme[];
  activeTheme: Theme | null;
}

export type AdminAction =
  | { type: 'SET_ADMIN_MODE'; payload: boolean }
  | { type: 'SET_COMPONENTS'; payload: Component[] }
  | { type: 'SET_SELECTED_COMPONENT'; payload: Component | null }
  | { type: 'UPDATE_COMPONENT'; payload: Component }
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'SET_THEMES'; payload: Theme[] }
  | { type: 'SET_ACTIVE_THEME'; payload: Theme }
  | { type: 'UPDATE_THEME'; payload: Theme };
