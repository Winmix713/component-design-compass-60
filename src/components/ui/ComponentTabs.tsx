
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CopyCommand from './CopyCommand';

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  code?: string;
}

interface ComponentTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  showCopyButton?: boolean;
}

const ComponentTabs: React.FC<ComponentTabsProps> = ({ 
  tabs, 
  defaultValue, 
  className,
  showCopyButton = true
}) => {
  const initialTab = defaultValue || (tabs.length > 0 ? tabs[0].value : '');
  const [activeTab, setActiveTab] = React.useState(initialTab);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const activeTabData = tabs.find(tab => tab.value === activeTab);
  
  return (
    <Tabs 
      defaultValue={initialTab} 
      className={className}
      onValueChange={handleTabChange}
    >
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {showCopyButton && activeTabData?.code && (
          <CopyCommand code={activeTabData.code} />
        )}
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ComponentTabs;
