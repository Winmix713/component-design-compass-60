
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
}

const ComponentTabs: React.FC<ComponentTabsProps> = ({ tabs, defaultValue = "preview" }) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
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
