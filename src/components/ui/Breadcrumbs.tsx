
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  title: string;
  href: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href} aria-current={item.current ? 'page' : undefined}>
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
