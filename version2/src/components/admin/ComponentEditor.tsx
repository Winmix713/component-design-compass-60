import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Input, Textarea, Divider } from '@heroui/react';
import { useAdmin } from '../../hooks/useAdmin';
import { useDebounce } from '../../hooks/useDebounce';
import { Component } from '../../context/store.types';
import { Icon } from '@iconify/react';

// Import a simple code editor (you might want to use Monaco editor in a real app)
// For this example, we'll use a textarea as a placeholder
interface ComponentEditorProps {
  onSave?: () => void;
  onCancel?: () => void;
}

/**
 * Component for editing component details and code
 */
export const ComponentEditor: React.FC<ComponentEditorProps> = ({
  onSave,
  onCancel,
}) => {
  const { selectedComponent, updateComponent } = useAdmin();
  const [component, setComponent] = React.useState<Component | null>(selectedComponent);
  const debouncedComponent = useDebounce(component, 500);
  
  // Fix: Add a ref to track if this is the initial mount
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    setComponent(selectedComponent);
  }, [selectedComponent]);

  React.useEffect(() => {
    // Fix: Skip the update on initial mount to prevent infinite loop
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (debouncedComponent && selectedComponent) {
      // Only update if there are actual changes
      if (JSON.stringify(debouncedComponent) !== JSON.stringify(selectedComponent)) {
        updateComponent(debouncedComponent);
      }
    }
  }, [debouncedComponent, selectedComponent, updateComponent]);

  const handleChange = (field: keyof Component, value: any) => {
    if (!component) return;
    
    setComponent({
      ...component,
      [field]: value,
    });
  };

  const handleTagsChange = (value: string) => {
    if (!component) return;
    
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    
    setComponent({
      ...component,
      tags,
    });
  };

  const handleSave = () => {
    if (component) {
      updateComponent(component);
      onSave?.();
    }
  };

  if (!component) {
    return (
      <Card>
        <CardBody className="flex items-center justify-center p-8">
          <p className="text-default-500">No component selected</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Edit Component</h2>
        <p className="text-default-500 text-sm">
          Make changes to the component and preview them in real-time
        </p>
      </CardHeader>
      
      <Divider />
      
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Component Name"
          value={component.name}
          onChange={(e) => handleChange('name', e.target.value)}
          variant="bordered"
        />
        
        <Textarea
          label="Description"
          value={component.description}
          onChange={(e) => handleChange('description', e.target.value)}
          variant="bordered"
        />
        
        <Input
          label="Category"
          value={component.category}
          onChange={(e) => handleChange('category', e.target.value)}
          variant="bordered"
        />
        
        <Input
          label="Tags (comma separated)"
          value={component.tags.join(', ')}
          onChange={(e) => handleTagsChange(e.target.value)}
          variant="bordered"
        />
        
        <div className="mt-4">
          <label className="block text-sm mb-2">Component Code</label>
          <Textarea
            value={component.code}
            onChange={(e) => handleChange('code', e.target.value)}
            variant="bordered"
            minRows={10}
            className="font-mono text-sm"
            placeholder="Enter component JSX code here"
          />
        </div>
      </CardBody>
      
      <Divider />
      
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="flat" 
          color="default"
          onPress={onCancel}
          startContent={<Icon icon="lucide:x" />}
        >
          Cancel
        </Button>
        <Button 
          color="primary"
          onPress={handleSave}
          startContent={<Icon icon="lucide:save" />}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};