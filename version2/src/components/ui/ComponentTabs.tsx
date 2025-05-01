import React from 'react';
import { Tabs, Tab } from '@heroui/react';
import { CopyCommand } from './CopyCommand';
import { cn } from '../../utils/cn';
import { AccessibilityChecker } from './AccessibilityChecker';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ComponentTab {
  id: string;
  label: string;
  content: React.ReactNode;
  code?: string;
  documentation?: string;
}

interface ComponentTabsProps {
  tabs: ComponentTab[];
  defaultSelectedKey?: string;
  className?: string;
  showCopyButton?: boolean;
  showA11yTab?: boolean;
}

/**
 * Enhanced component for displaying tabbed content with documentation and a11y
 */
export const ComponentTabs: React.FC<ComponentTabsProps> = ({
  tabs,
  defaultSelectedKey,
  className,
  showCopyButton = true,
  showA11yTab = true,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(
    defaultSelectedKey || (tabs.length > 0 ? tabs[0].id : '')
  );
  const componentRef = React.useRef<HTMLDivElement>(null);
  
  const handleSelectionChange = (key: React.Key) => {
    setSelectedTab(key as string);
  };
  
  const selectedTabData = tabs.find(tab => tab.id === selectedTab);
  const hasDocumentation = tabs.some(tab => tab.documentation);
  
  // Create enhanced tabs array with documentation and a11y if needed
  const enhancedTabs = React.useMemo(() => {
    const baseTabs = [...tabs];
    
    // Add documentation tab if any tab has documentation
    if (hasDocumentation) {
      const docTab = tabs.find(tab => tab.documentation);
      if (docTab) {
        baseTabs.push({
          id: 'documentation',
          label: 'Documentation',
          content: (
            <div className="p-4">
              <MarkdownRenderer content={docTab.documentation || ''} />
            </div>
          ),
        });
      }
    }
    
    // Add accessibility tab if requested
    if (showA11yTab) {
      baseTabs.push({
        id: 'accessibility',
        label: 'Accessibility',
        content: (
          <div className="p-4">
            <AccessibilityChecker componentRef={componentRef} />
          </div>
        ),
      });
    }
    
    return baseTabs;
  }, [tabs, hasDocumentation, showA11yTab]);
  
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <Tabs 
          selectedKey={selectedTab} 
          onSelectionChange={handleSelectionChange}
          variant="underlined"
          size="sm"
        >
          {enhancedTabs.map((tab) => (
            <Tab key={tab.id} title={tab.label} />
          ))}
        </Tabs>
        
        {showCopyButton && selectedTabData?.code && selectedTab !== 'documentation' && selectedTab !== 'accessibility' && (
          <CopyCommand text={selectedTabData.code} />
        )}
      </div>
      
      <div className="mt-4" ref={componentRef}>
        {selectedTabData?.content}
      </div>
    </div>
  );
};