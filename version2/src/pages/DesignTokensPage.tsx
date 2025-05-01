import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ThemeEditor } from '../components/admin/ThemeEditor';
import { useAdmin } from '../hooks/useAdmin';
import { useTheme } from '../context/ThemeContext';

const DesignTokensPage = () => {
  const { category } = useParams<{ category: string }>();
  const { isAdminMode, activeTheme } = useAdmin();
  const { getThemeColor } = useTheme();
  
  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: 'lucide:home',
    },
    {
      label: 'Design Tokens',
      href: '/design-tokens',
      icon: 'lucide:palette',
    },
    ...(category ? [
      {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/design-tokens/${category}`,
      },
    ] : []),
  ];

  const renderColorTokens = () => {
    if (!activeTheme) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(activeTheme.colors).map(([name, value]) => (
          <Card key={name} className="overflow-hidden">
            <div 
              className="h-24" 
              style={{ backgroundColor: value }}
            />
            <CardBody className="p-4">
              <h3 className="font-medium capitalize">{name}</h3>
              <p className="text-default-500 text-sm">{value}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };

  const renderTypographyTokens = () => {
    if (!activeTheme) return null;
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Font Family</h3>
          </CardHeader>
          <CardBody>
            <p style={{ fontFamily: activeTheme.typography.fontFamily }}>
              {activeTheme.typography.fontFamily}
            </p>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Font Sizes</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            {Object.entries(activeTheme.typography.fontSize).map(([name, value]) => (
              <div key={name} className="flex justify-between items-center">
                <p className="capitalize">{name}</p>
                <p style={{ fontSize: value }}>{value}</p>
              </div>
            ))}
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Font Weights</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            {Object.entries(activeTheme.typography.fontWeight).map(([name, value]) => (
              <div key={name} className="flex justify-between items-center">
                <p className="capitalize">{name}</p>
                <p style={{ fontWeight: value }}>{value}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  };

  const renderSpacingTokens = () => {
    if (!activeTheme) return null;
    
    return (
      <div className="space-y-4">
        {Object.entries(activeTheme.spacing).map(([name, value]) => (
          <Card key={name}>
            <CardBody className="flex items-center gap-4">
              <div 
                className="bg-primary-100" 
                style={{ width: value, height: value }}
              />
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-default-500 text-sm">{value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (category === 'colors') {
      return renderColorTokens();
    } else if (category === 'typography') {
      return renderTypographyTokens();
    } else if (category === 'spacing') {
      return renderSpacingTokens();
    }
    
    return (
      <Tabs>
        <Tab key="colors" title="Colors">
          {renderColorTokens()}
        </Tab>
        <Tab key="typography" title="Typography">
          {renderTypographyTokens()}
        </Tab>
        <Tab key="spacing" title="Spacing">
          {renderSpacingTokens()}
        </Tab>
      </Tabs>
    );
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tokens`
              : 'Design Tokens'
            }
          </h1>
          <p className="text-default-600">
            {category 
              ? `Explore our ${category} design tokens that define our visual language.`
              : 'Explore the design tokens that define our visual language.'
            }
          </p>
        </div>

        {isAdminMode && (
          <div className="mb-6">
            <ThemeEditor />
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default DesignTokensPage;
