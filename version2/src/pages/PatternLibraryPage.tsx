import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from '@heroui/react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ComponentPreview } from '../components/ui/ComponentPreview';
import { Icon } from '@iconify/react';

const PatternLibraryPage = () => {
  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: 'lucide:home',
    },
    {
      label: 'Pattern Library',
      href: '/pattern-library',
      icon: 'lucide:layout-template',
    },
  ];

  const patterns = [
    {
      id: 'forms',
      title: 'Form Patterns',
      description: 'Common form layouts and validation patterns',
      icon: 'lucide:file-text',
    },
    {
      id: 'navigation',
      title: 'Navigation Patterns',
      description: 'Patterns for site navigation and wayfinding',
      icon: 'lucide:navigation',
    },
    {
      id: 'data-display',
      title: 'Data Display',
      description: 'Patterns for displaying data in tables and lists',
      icon: 'lucide:table',
    },
    {
      id: 'feedback',
      title: 'User Feedback',
      description: 'Patterns for providing feedback to users',
      icon: 'lucide:message-circle',
    },
    {
      id: 'layout',
      title: 'Layout Patterns',
      description: 'Common layout structures for various screen sizes',
      icon: 'lucide:layout',
    },
    {
      id: 'authentication',
      title: 'Authentication',
      description: 'Patterns for user authentication flows',
      icon: 'lucide:lock',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pattern Library</h1>
          <p className="text-default-600">
            Explore our collection of UI patterns and best practices for common scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map((pattern) => (
            <Card key={pattern.id} isPressable className="hover:shadow-md transition-shadow">
              <CardBody className="flex flex-col gap-4 p-6">
                <div className="bg-primary-100 p-4 rounded-full w-14 h-14 flex items-center justify-center">
                  <Icon icon={pattern.icon} className="text-primary-500" width={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{pattern.title}</h2>
                  <p className="text-default-600 mt-1">{pattern.description}</p>
                </div>
              </CardBody>
              <CardFooter>
                <Button 
                  color="primary" 
                  variant="flat" 
                  endContent={<Icon icon="lucide:arrow-right" />}
                  fullWidth
                >
                  View Pattern
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-bold">Featured Pattern: Form Layout</h2>
          </CardHeader>
          <CardBody>
            <ComponentPreview>
              <div className="w-full max-w-md mx-auto p-4">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-default-200 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-default-200 rounded-md"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-default-200 rounded-md"
                      rows={4}
                      placeholder="Your message here..."
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </ComponentPreview>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PatternLibraryPage;
