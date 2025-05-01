import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Transition } from '../ui/Transition';

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems: any[];
  className?: string;
}

/**
 * Main layout component with responsive sidebar
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarItems,
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        enter="transition-transform duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className={cn(
          'fixed inset-y-0 left-0 z-30 md:relative md:z-0',
          isMobile ? 'w-64' : 'w-64'
        )}
      >
        <Sidebar 
          items={sidebarItems} 
          onClose={() => setSidebarOpen(false)} 
        />
      </Transition>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className={cn('flex-1 overflow-y-auto p-4 md:p-6', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};
