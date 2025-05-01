import React from 'react';
    import { Switch, Tooltip } from '@heroui/react';
    import { Icon } from '@iconify/react';
    import { useTheme } from '../../context/ThemeContext';
    import { cn } from '../../utils/cn';

    interface ThemeSwitcherProps {
      className?: string;
    }

    export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
      const { isDarkMode, toggleDarkMode } = useTheme();
      
      return (
        <Tooltip 
          content={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          placement="bottom"
        >
          <div className={cn('flex items-center gap-2', className)}>
            <Switch
              size="sm"
              color="primary"
              isSelected={isDarkMode}
              onValueChange={toggleDarkMode}
              startContent={<Icon icon="lucide:sun" className={!isDarkMode ? "text-primary-500" : "text-default-500"} />}
              endContent={<Icon icon="lucide:moon" className={isDarkMode ? "text-primary-500" : "text-default-500"} />}
              className="mx-1"
            />
          </div>
        </Tooltip>
      );
    };