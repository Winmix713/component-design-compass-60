import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, NavbarContent, NavbarItem, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';
import { useAdmin } from '../../hooks/useAdmin';
import { Search } from '../ui/Search';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}

/**
 * Header component with navigation and user controls
 */
export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  className,
}) => {
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.();
  };

  return (
    <Navbar 
      className={cn('border-b border-divider', className)}
      maxWidth="full"
      isBordered
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
          onChange={handleMenuToggle}
        />
      </NavbarContent>

      <NavbarBrand className="flex items-center gap-2">
        <Icon icon="lucide:box" width={24} className="text-primary" />
        <p className="font-bold text-inherit">Boltoo</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-default-600 hover:text-primary">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/components" className="text-default-600 hover:text-primary">
            Components
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/design-tokens" className="text-default-600 hover:text-primary">
            Design Tokens
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/pattern-library" className="text-default-600 hover:text-primary">
            Patterns
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        
        <NavbarItem>
          <Button
            variant={isAdminMode ? "solid" : "flat"}
            color={isAdminMode ? "primary" : "default"}
            onPress={toggleAdminMode}
            startContent={<Icon icon="lucide:settings" />}
            size="sm"
          >
            {isAdminMode ? "Admin Mode" : "Normal Mode"}
          </Button>
        </NavbarItem>
        
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="User"
                size="sm"
                src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">user@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                Settings
              </DropdownItem>
              <DropdownItem key="team" startContent={<Icon icon="lucide:users" />}>
                Team
              </DropdownItem>
              <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" />}>
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<Icon icon="lucide:log-out" />}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link 
            to="/" 
            className="w-full text-default-600 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            to="/components" 
            className="w-full text-default-600 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Components
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            to="/design-tokens" 
            className="w-full text-default-600 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Design Tokens
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link 
            to="/pattern-library" 
            className="w-full text-default-600 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Patterns
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};