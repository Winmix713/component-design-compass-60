
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import ThemeSwitcher from './ui/ThemeSwitcher';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminMode, setIsEditing } = useAdmin();
  const { toast } = useToast();
  
  const handleOpenAdminTools = () => {
    if (isAdminMode) {
      setIsEditing(true);
      toast({
        title: "Admin Editor Opened",
        description: "You can now edit components and themes.",
      });
    } else {
      toast({
        title: "Admin Mode Required",
        description: "Please enable Admin Mode in the sidebar first.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <header className={cn(
      "h-16 border-b flex items-center justify-between px-4 bg-background",
      isAdminMode && "border-primary/20"
    )}>
      <div className="flex items-center gap-4">
        <div 
          className="font-bold text-lg cursor-pointer flex items-center gap-2" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold">
            UI
          </div>
          <span>UI Components</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {location.pathname !== '/' && (
            <div className="flex items-center gap-1">
              <span 
                className="hover:text-foreground cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="mx-1">/</span>
              <span className="text-foreground">
                {location.pathname.split('/')[1]?.charAt(0).toUpperCase() + location.pathname.split('/')[1]?.slice(1) || ''}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isAdminMode && (
          <div className="mr-2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
            Admin Mode
          </div>
        )}
        
        <ThemeSwitcher />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Settings"
                onClick={handleOpenAdminTools}
              >
                <Settings size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open admin tools</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button
          variant="ghost"
          size="icon"
          aria-label="User profile"
        >
          <User size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
