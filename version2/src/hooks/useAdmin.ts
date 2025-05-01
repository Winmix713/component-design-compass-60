import { useAdmin as useAdminContext } from '../context/AdminContext';
import { Component, Theme } from '../context/store.types';

/**
 * Hook for using admin functionality
 */
export function useAdmin() {
  const { state, dispatch } = useAdminContext();

  // Admin mode
  const toggleAdminMode = () => {
    dispatch({ type: 'SET_ADMIN_MODE', payload: !state.isAdminMode });
  };

  // Component operations
  const selectComponent = (component: Component | null) => {
    dispatch({ type: 'SET_SELECTED_COMPONENT', payload: component });
  };

  const updateComponent = (component: Component) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: component });
  };

  const addComponent = (component: Component) => {
    dispatch({ type: 'ADD_COMPONENT', payload: component });
  };

  const deleteComponent = (id: string) => {
    dispatch({ type: 'DELETE_COMPONENT', payload: id });
  };

  // Theme operations
  const setActiveTheme = (theme: Theme) => {
    dispatch({ type: 'SET_ACTIVE_THEME', payload: theme });
  };

  const updateTheme = (theme: Theme) => {
    dispatch({ type: 'UPDATE_THEME', payload: theme });
  };

  return {
    isAdminMode: state.isAdminMode,
    components: state.components,
    selectedComponent: state.selectedComponent,
    themes: state.themes,
    activeTheme: state.activeTheme,
    toggleAdminMode,
    selectComponent,
    updateComponent,
    addComponent,
    deleteComponent,
    setActiveTheme,
    updateTheme,
  };
}
