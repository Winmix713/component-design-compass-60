import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAdmin } from '../hooks/useAdmin';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

const HomePage = () => {
  const { isAdminMode } = useAdmin();

  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: 'lucide:home',
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />
      
      <div className="flex flex-col gap-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Boltoo Design System</h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            A comprehensive design system with components, patterns, and design tokens
            for building consistent user interfaces.
          </p>
        </div>

        {isAdminMode && (
          <Card className="bg-primary-50 border-primary-200 mb-6">
            <CardBody className="flex items-center gap-4">
              <Icon icon="lucide:info" className="text-primary-500" width={24} />
              <div>
                <h3 className="text-lg font-medium text-primary-700">Admin Mode Enabled</h3>
                <p className="text-primary-600">
                  You can now edit components and themes. Access the editor from the component pages.
                </p>
              </div>
            </CardBody>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-col gap-4 items-center text-center p-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <Icon icon="lucide:layers" className="text-primary-500" width={32} />
              </div>
              <h2 className="text-xl font-bold">Components</h2>
              <p className="text-default-600">
                Explore our library of UI components with examples and documentation.
              </p>
              <Button 
                as={Link} 
                to="/components" 
                color="primary" 
                variant="flat"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                View Components
              </Button>
            </CardBody>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-col gap-4 items-center text-center p-6">
              <div className="bg-secondary-100 p-4 rounded-full">
                <Icon icon="lucide:palette" className="text-secondary-500" width={32} />
              </div>
              <h2 className="text-xl font-bold">Design Tokens</h2>
              <p className="text-default-600">
                Discover the design tokens that define our visual language.
              </p>
              <Button 
                as={Link} 
                to="/design-tokens" 
                color="secondary" 
                variant="flat"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                View Design Tokens
              </Button>
            </CardBody>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-col gap-4 items-center text-center p-6">
              <div className="bg-success-100 p-4 rounded-full">
                <Icon icon="lucide:layout-template" className="text-success-500" width={32} />
              </div>
              <h2 className="text-xl font-bold">Pattern Library</h2>
              <p className="text-default-600">
                Learn about our UI patterns and best practices for common scenarios.
              </p>
              <Button 
                as={Link} 
                to="/pattern-library" 
                color="success" 
                variant="flat"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                View Patterns
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
