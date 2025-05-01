
import React from 'react';
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
  includeHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  className,
  homeHref = '/',
  includeHome = true
}) => {
  const allItems = includeHome 
    ? [{ title: 'Home', href: homeHref, icon: <HomeIcon className="h-4 w-4" /> }, ...items]
    : items;

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        {allItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 mx-1 text-muted-foreground" />
            )}
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-1.5 hover:text-foreground transition-colors",
                item.current ? "font-medium text-foreground" : "text-muted-foreground"
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
