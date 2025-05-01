
import React from 'react';
import { Component } from '@/lib/componentData';

interface ComponentPreviewProps {
  component: Component;
  variant: string;
  state: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component, variant, state }) => {
  // This would be a real implementation using the actual components
  // For this demo, we'll render placeholder UI based on the component type
  
  if (component.id === 'button') {
    const getButtonClass = () => {
      let classes = 'px-4 py-2 rounded-md font-medium';
      
      // Variant classes
      if (variant === 'Primary') {
        classes += ' bg-primary-600 text-white hover:bg-primary-700';
      } else if (variant === 'Secondary') {
        classes += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
      } else if (variant === 'Text') {
        classes += ' text-primary-600 hover:underline';
      } else if (variant === 'Icon') {
        classes = 'p-2 rounded-md bg-primary-600 text-white';
      }
      
      // State classes
      if (state === 'Disabled') {
        classes += ' opacity-50 cursor-not-allowed';
      } else if (state === 'Hover') {
        classes += ' ring-2 ring-primary-300';
      } else if (state === 'Focus') {
        classes += ' ring-2 ring-primary-500 ring-offset-2';
      }
      
      return classes;
    };
    
    return (
      <button className={getButtonClass()} disabled={state === 'Disabled'}>
        {variant === 'Icon' ? '★' : 'Button'}
      </button>
    );
  }
  
  if (component.id === 'input') {
    const getInputClass = () => {
      let classes = 'px-3 py-2 rounded-md border';
      
      // Variant classes
      if (variant === 'Default' || variant === 'Outlined') {
        classes += ' border-gray-300 bg-white';
      } else if (variant === 'Filled') {
        classes += ' border-transparent bg-gray-100';
      }
      
      // State classes
      if (state === 'Focus') {
        classes += ' ring-2 ring-primary-500 border-primary-500';
      } else if (state === 'Error') {
        classes += ' border-red-500 ring-1 ring-red-500';
      } else if (state === 'Disabled') {
        classes += ' bg-gray-100 text-gray-400 cursor-not-allowed';
      }
      
      return classes;
    };
    
    return (
      <div className="w-full max-w-xs">
        <label className="block text-sm font-medium mb-1">Input Label</label>
        <input 
          type="text" 
          className={getInputClass()} 
          placeholder="Enter text"
          disabled={state === 'Disabled'}
        />
        {state === 'Error' && (
          <p className="mt-1 text-sm text-red-500">Error message here</p>
        )}
      </div>
    );
  }

  // Default component preview
  return (
    <div className="border border-dashed border-gray-300 p-6 text-center rounded-md bg-white">
      <p className="text-muted-foreground">{component.name} Preview</p>
      <p className="text-sm text-muted-foreground mt-1">Variant: {variant}</p>
      <p className="text-sm text-muted-foreground">State: {state}</p>
    </div>
  );
};

export default ComponentPreview;
