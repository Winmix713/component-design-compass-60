
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, BookOpen } from "lucide-react";
import { componentCategories } from '@/lib/componentData';
import { useAdmin } from '@/context/AdminContext';
import SidebarSection from './SidebarSection';

const sections = [
  { title: 'Getting Started', path: '/' },
  { title: 'Design Tokens', path: '/tokens' },
  { title: 'Pattern Library', path: '/patterns' },
  { title: 'Changelog', path: '/changelog' },
  { title: 'Integrations', path: '/integrations' },
];

const docSections = [
  { name: "Button", id: "button" },
  { name: "Input", id: "input" },
  { name: "Modal", id: "modal" },
  { name: "Card", id: "card" },
  { name: "Table", id: "table" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDocs, setExpandedDocs] = useState(true);
  const { isAdminMode, setAdminMode } = useAdmin();

  const isDocActive = (docId: string) => {
    return location.pathname === `/docs/${docId}`;
  };

  // Filter components based on search query
  const filteredCategories = searchQuery.trim() === '' 
    ? componentCategories 
    : componentCategories.map(category => ({
        ...category,
        components: category.components.filter(comp => 
          comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comp.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.components.length > 0);

  // Filter doc sections based on search query
  const filteredDocs = searchQuery.trim() === ''
    ? docSections
    : docSections.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="w-64 h-screen border-r flex flex-col bg-sidebar">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Component search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-1 space-y-1">
          {/* Main Navigation Sections */}
          {sections.map((section) => (
            <SidebarSection 
              key={section.title} 
              title={section.title} 
              path={section.path}
            />
          ))}
          
          {/* Documentation Section */}
          <SidebarSection
            title="Documentation"
            icon={<BookOpen className="h-4 w-4" />}
            collapsible
            defaultExpanded={expandedDocs}
          >
            {filteredDocs.length > 0 && filteredDocs.map((doc) => (
              <Button
                key={doc.id}
                variant={isDocActive(doc.id) ? "secondary" : "ghost"}
                className={`w-full justify-start text-sm h-8 px-3 ${
                  isDocActive(doc.id) ? "font-medium" : "font-normal"
                } flex items-center`}
                onClick={() => navigate(`/docs/${doc.id}`)}
              >
                <span>{doc.name}</span>
              </Button>
            ))}
          </SidebarSection>
          
          {/* Component Categories */}
          {filteredCategories.map((category) => (
            <SidebarSection 
              key={category.name}
              title={category.name}
              collapsible
              defaultExpanded={true}
            >
              {category.components.map((component) => (
                <Button
                  key={component.id}
                  variant={location.pathname === `/components/${component.id}` ? "secondary" : "ghost"}
                  className={`w-full justify-start text-sm h-8 px-3 ${
                    location.pathname === `/components/${component.id}` ? "font-medium" : "font-normal"
                  } flex items-center`}
                  onClick={() => navigate(`/components/${component.id}`)}
                >
                  <span>{component.name}</span>
                  {component.badge && (
                    <span className="ml-auto bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                      {component.badge}
                    </span>
                  )}
                </Button>
              ))}
            </SidebarSection>
          ))}
        </nav>
      </div>
      
      <div className="border-t p-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Version 2.1.4</span>
        <div className="flex items-center">
          <span>Admin Mode</span>
          <div className="ml-2">
            <Switch
              checked={isAdminMode}
              onCheckedChange={setAdminMode}
              aria-label="Toggle admin mode"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
