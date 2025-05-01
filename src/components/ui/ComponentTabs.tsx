
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface ComponentTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  defaultTab?: string; // Added for backward compatibility
}

const ComponentTabs: React.FC<ComponentTabsProps> = ({ 
  tabs, 
  defaultValue = "preview",
  defaultTab
}) => {
  // Use defaultTab if provided (for backward compatibility)
  const initialTab = defaultTab || defaultValue;
  
  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <TabsList className="mb-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ComponentTabs;
