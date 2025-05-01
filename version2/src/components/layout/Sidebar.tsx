import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Switch, Tooltip, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';
import { useAdmin } from '../../hooks/useAdmin';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  onClose?: () => void;
}

/**
 * Sidebar navigation component
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  className,
  onClose,
}) => {
  const location = useLocation();
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id} className="w-full">
        <div className="flex flex-col w-full">
          {hasChildren ? (
            <Button
              variant="flat"
              color={active ? 'primary' : 'default'}
              className={cn(
                'justify-between mb-1',
                active ? 'bg-primary-100 text-primary-600' : '',
                depth > 0 ? 'pl-8' : ''
              )}
              onPress={() => toggleExpand(item.id)}
              endContent={
                <Icon
                  icon={isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right'}
                  className="text-default-500"
                  width={16}
                />
              }
              startContent={
                item.icon && <Icon icon={item.icon} className="text-default-500" width={18} />
              }
            >
              {item.label}
            </Button>
          ) : (
            <Button
              as={Link}
              to={item.href}
              variant="flat"
              color={active ? 'primary' : 'default'}
              className={cn(
                'justify-start mb-1 text-left',
                active ? 'bg-primary-100 text-primary-600' : '',
                depth > 0 ? 'pl-8' : ''
              )}
              onPress={() => isMobile && onClose?.()}
              startContent={
                item.icon && <Icon icon={item.icon} className={active ? 'text-primary-500' : 'text-default-500'} width={18} />
              }
            >
              {item.label}
            </Button>
          )}

          {hasChildren && isExpanded && (
            <div className="ml-2 border-l border-default-200 pl-2 my-1">
              {item.children?.map((child) => renderSidebarItem(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'flex flex-col w-64 h-full bg-content1 border-r border-divider overflow-y-auto',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Boltoo</h2>
          {isMobile && (
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
              aria-label="Close sidebar"
            >
              <Icon icon="lucide:x" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:settings" className="text-default-500" />
            <span className="text-sm font-medium">Admin Mode</span>
          </div>
          <Tooltip content={isAdminMode ? 'Disable Admin Mode' : 'Enable Admin Mode'}>
            <Switch
              size="sm"
              color="primary"
              isSelected={isAdminMode}
              onValueChange={toggleAdminMode}
            />
          </Tooltip>
        </div>

        <Divider className="my-4" />

        <nav className="flex flex-col gap-1">
          {items.map((item) => renderSidebarItem(item))}
        </nav>
      </div>
    </aside>
  );
};
