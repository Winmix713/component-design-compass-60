import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { cn } from '../../utils/cn';
import { Tabs, Tab } from '@heroui/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '../../context/ThemeContext';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'light' | 'dark' | 'transparent';
  withBorder?: boolean;
  centered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  code?: string;
  language?: string;
  showCode?: boolean;
}

/**
 * Enhanced component for previewing UI components with code display
 */
export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  className,
  background = 'default',
  withBorder = false,
  centered = true,
  padding = 'md',
  code,
  language = 'jsx',
  showCode = true,
}) => {
  // Use document.documentElement.classList to check for dark mode
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = React.useState<string>("preview");
  
  // Update dark mode state when the class changes
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(isDarkMode());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);
  
  const backgroundClasses = {
    default: 'bg-content1',
    light: 'bg-content2',
    dark: 'bg-content3',
    transparent: 'bg-transparent',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-8',
  };

  return (
    <Card 
      className={cn(
        'w-full overflow-hidden',
        withBorder ? 'border border-divider' : '',
        className
      )}
      shadow="none"
    >
      {showCode && code && (
        <Tabs 
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          aria-label="Component Preview Tabs"
          size="sm"
          variant="underlined"
          classNames={{
            base: "px-2 pt-2",
            tabList: "gap-4",
          }}
        >
          <Tab key="preview" title="Preview" />
          <Tab key="code" title="Code" />
        </Tabs>
      )}
      
      {(!showCode || !code || activeTab === "preview") && (
        <CardBody 
          className={cn(
            backgroundClasses[background],
            paddingClasses[padding],
            centered ? 'flex items-center justify-center' : '',
            'transition-colors'
          )}
        >
          {children}
        </CardBody>
      )}
      
      {showCode && code && activeTab === "code" && (
        <CardBody className="p-0">
          <SyntaxHighlighter
            language={language}
            style={isDarkMode ? vs2015 : github}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.9rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </CardBody>
      )}
    </Card>
  );
};