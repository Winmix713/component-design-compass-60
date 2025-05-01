
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SectionProps {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const SidebarSection: React.FC<SectionProps> = ({ 
  title, 
  path,
  icon,
  children,
  collapsible = false,
  defaultExpanded = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const isActive = path ? location.pathname === path : false;
  
  const toggleExpanded = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    } else if (path) {
      navigate(path);
    }
  };
  
  return (
    <div className="space-y-1">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-between text-sm h-9 px-3 ${isActive ? "font-medium" : "font-normal"}`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span>{title}</span>
        </div>
        {collapsible && (
          isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      
      {collapsible && isExpanded && children && (
        <div className="ml-4 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
