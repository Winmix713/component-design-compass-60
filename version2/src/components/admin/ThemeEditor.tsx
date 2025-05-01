import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Input, Divider, Tabs, Tab } from '@heroui/react';
import { useAdmin } from '../../hooks/useAdmin';
import { useDebounce } from '../../hooks/useDebounce';
import { Theme } from '../../context/store.types';
import { Icon } from '@iconify/react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <Input
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="bordered"
        size="sm"
        className="flex-1"
      />
      <div 
        className="w-8 h-8 rounded border border-default-200" 
        style={{ backgroundColor: value }}
      />
    </div>
  );
};

interface ThemeEditorProps {
  onSave?: () => void;
  onCancel?: () => void;
}

/**
 * Component for editing theme properties
 */
export const ThemeEditor: React.FC<ThemeEditorProps> = ({
  onSave,
  onCancel,
}) => {
  const { activeTheme, updateTheme } = useAdmin();
  const [theme, setTheme] = React.useState<Theme | null>(activeTheme);
  const debouncedTheme = useDebounce(theme, 500);
  
  // Fix: Add a ref to track if this is the initial mount
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    setTheme(activeTheme);
  }, [activeTheme]);

  React.useEffect(() => {
    // Fix: Skip the update on initial mount to prevent infinite loop
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (debouncedTheme && activeTheme) {
      // Only update if there are actual changes
      if (JSON.stringify(debouncedTheme) !== JSON.stringify(activeTheme)) {
        updateTheme(debouncedTheme);
      }
    }
  }, [debouncedTheme, activeTheme, updateTheme]);

  const handleNameChange = (value: string) => {
    if (!theme) return;
    setTheme({
      ...theme,
      name: value,
    });
  };

  const handleColorChange = (colorName: string, value: string) => {
    if (!theme) return;
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [colorName]: value,
      },
    });
  };

  const handleFontFamilyChange = (value: string) => {
    if (!theme) return;
    setTheme({
      ...theme,
      typography: {
        ...theme.typography,
        fontFamily: value,
      },
    });
  };

  const handleFontSizeChange = (size: string, value: string) => {
    if (!theme) return;
    setTheme({
      ...theme,
      typography: {
        ...theme.typography,
        fontSize: {
          ...theme.typography.fontSize,
          [size]: value,
        },
      },
    });
  };

  const handleSave = () => {
    if (theme) {
      updateTheme(theme);
      onSave?.();
    }
  };

  if (!theme) {
    return (
      <Card>
        <CardBody className="flex items-center justify-center p-8">
          <p className="text-default-500">No theme selected</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">Edit Theme</h2>
        <p className="text-default-500 text-sm">
          Customize the theme colors, typography, and other properties
        </p>
      </CardHeader>
      
      <Divider />
      
      <CardBody>
        <Tabs variant="underlined">
          <Tab key="general" title="General">
            <div className="flex flex-col gap-4 py-4">
              <Input
                label="Theme Name"
                value={theme.name}
                onChange={(e) => handleNameChange(e.target.value)}
                variant="bordered"
              />
            </div>
          </Tab>
          
          <Tab key="colors" title="Colors">
            <div className="flex flex-col gap-4 py-4">
              <h3 className="text-lg font-medium">Brand Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorInput 
                  label="Primary" 
                  value={theme.colors.primary} 
                  onChange={(value) => handleColorChange('primary', value)} 
                />
                <ColorInput 
                  label="Secondary" 
                  value={theme.colors.secondary} 
                  onChange={(value) => handleColorChange('secondary', value)} 
                />
                <ColorInput 
                  label="Accent" 
                  value={theme.colors.accent} 
                  onChange={(value) => handleColorChange('accent', value)} 
                />
              </div>
              
              <h3 className="text-lg font-medium mt-4">Interface Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorInput 
                  label="Background" 
                  value={theme.colors.background} 
                  onChange={(value) => handleColorChange('background', value)} 
                />
                <ColorInput 
                  label="Text" 
                  value={theme.colors.text} 
                  onChange={(value) => handleColorChange('text', value)} 
                />
              </div>
            </div>
          </Tab>
          
          <Tab key="typography" title="Typography">
            <div className="flex flex-col gap-4 py-4">
              <Input
                label="Font Family"
                value={theme.typography.fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                variant="bordered"
              />
              
              <h3 className="text-lg font-medium mt-2">Font Sizes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Base"
                  value={theme.typography.fontSize.base}
                  onChange={(e) => handleFontSizeChange('base', e.target.value)}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Small"
                  value={theme.typography.fontSize.sm}
                  onChange={(e) => handleFontSizeChange('sm', e.target.value)}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Large"
                  value={theme.typography.fontSize.lg}
                  onChange={(e) => handleFontSizeChange('lg', e.target.value)}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="Extra Large"
                  value={theme.typography.fontSize.xl}
                  onChange={(e) => handleFontSizeChange('xl', e.target.value)}
                  variant="bordered"
                  size="sm"
                />
                <Input
                  label="2XL"
                  value={theme.typography.fontSize['2xl']}
                  onChange={(e) => handleFontSizeChange('2xl', e.target.value)}
                  variant="bordered"
                  size="sm"
                />
              </div>
            </div>
          </Tab>
        </Tabs>
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