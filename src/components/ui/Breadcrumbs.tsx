
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  title: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="flex mb-6">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              {item.current ? (
                <span className="text-foreground font-medium">{item.title}</span>
              ) : (
                <button 
                  onClick={() => navigate(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </button>
              )}
            </li>
            {index < items.length - 1 && (
              <li className="text-muted-foreground">
                <ChevronRight size={16} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
