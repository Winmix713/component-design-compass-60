import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

/**
 * Enhanced breadcrumbs component
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  separator,
  onItemClick,
}) => {
  const [currentPage, setCurrentPage] = React.useState<React.Key>(
    items.length > 0 ? items[items.length - 1].label : ''
  );

  const handleAction = (key: React.Key) => {
    setCurrentPage(key);
  };

  return (
    <HeroBreadcrumbs
      className={cn('py-2', className)}
      onAction={handleAction}
      separator={separator || <Icon icon="lucide:chevron-right" className="text-default-400" />}
      underline="hover"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const key = item.label;
        
        return (
          <BreadcrumbItem
            key={key}
            isCurrent={currentPage === key}
            onClick={() => onItemClick?.(item, index)}
          >
            {item.href && !isLast ? (
              <Link 
                to={item.href} 
                className="flex items-center gap-1"
                onClick={() => setCurrentPage(key)}
              >
                {item.icon && <Icon icon={item.icon} className="text-default-500" />}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1">
                {item.icon && <Icon icon={item.icon} className="text-default-500" />}
                {item.label}
              </span>
            )}
          </BreadcrumbItem>
        );
      })}
    </HeroBreadcrumbs>
  );
};
