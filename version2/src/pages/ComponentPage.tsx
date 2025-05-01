import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Tabs, Tab, Divider } from '@heroui/react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ComponentWrapper } from '../components/ui/ComponentWrapper';
import { ComponentPreview } from '../components/ui/ComponentPreview';
import { ComponentTabs } from '../components/ui/ComponentTabs';
import { ComponentEditor } from '../components/admin/ComponentEditor';
import { useAdmin } from '../hooks/useAdmin';
import { Button } from '@heroui/react';

const ComponentPage = () => {
  const { category } = useParams<{ category: string }>();
  const { components, isAdminMode, selectedComponent, selectComponent } = useAdmin();
  
  const filteredComponents = category
    ? components.filter(c => c.category === category)
    : components;

  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: 'lucide:home',
    },
    {
      label: 'Components',
      href: '/components',
      icon: 'lucide:layers',
    },
    ...(category ? [
      {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/components/${category}`,
      },
    ] : []),
  ];

  const categories = [...new Set(components.map(c => c.category))];

  // Add sample documentation for components
  const getComponentDocumentation = (componentId: string) => {
    const docs: Record<string, string> = {
      'button-primary': `
# Button Component

Buttons allow users to perform actions and choose with a single tap.

## Usage

\`\`\`jsx
import { Button } from '@heroui/react';

function App() {
  return <Button color="primary">Primary Button</Button>;
}
\`\`\`

## Examples

### Variants

\`\`\`preview
<div className="flex gap-2">
  <Button variant="solid">Solid</Button>
  <Button variant="bordered">Bordered</Button>
  <Button variant="light">Light</Button>
  <Button variant="flat">Flat</Button>
  <Button variant="faded">Faded</Button>
  <Button variant="shadow">Shadow</Button>
  <Button variant="ghost">Ghost</Button>
</div>
\`\`\`

### Colors

\`\`\`preview
<div className="flex gap-2">
  <Button color="default">Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="success">Success</Button>
  <Button color="warning">Warning</Button>
  <Button color="danger">Danger</Button>
</div>
\`\`\`

## Accessibility

- Buttons have role="button" by default
- Use aria-label when the button has no visible text
- Disabled buttons should have aria-disabled="true"
`,
    };
    
    return docs[componentId] || '';
  };
  
  return (
    <div className="container mx-auto max-w-6xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Components`
              : 'Components'
            }
          </h1>
          <p className="text-default-600">
            {category 
              ? `Explore our ${category} components with examples and documentation.`
              : 'Explore our component library with examples and documentation.'
            }
          </p>
        </div>
        
        {!category && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Card 
                key={cat} 
                isPressable 
                onPress={() => window.location.href = `/components/${cat}`}
                className="hover:shadow-md transition-shadow"
              >
                <CardBody className="p-4">
                  <h2 className="text-lg font-medium capitalize">{cat}</h2>
                  <p className="text-default-500 text-sm">
                    {components.filter(c => c.category === cat).length} components
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        
        {isAdminMode && selectedComponent && (
          <div className="mb-6">
            <ComponentEditor onCancel={() => selectComponent(null)} />
          </div>
        )}
        
        {category && (
          <div className="grid grid-cols-1 gap-8">
            {filteredComponents.map((component) => (
              <ComponentWrapper
                key={component.id}
                title={component.name}
                description={component.description}
                code={component.code}
                actions={
                  isAdminMode && (
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="primary"
                      onPress={() => selectComponent(component)}
                    >
                      Edit Component
                    </Button>
                  )
                }
              >
                <ComponentTabs
                  tabs={[
                    {
                      id: 'preview',
                      label: 'Preview',
                      content: (
                        <ComponentPreview>
                          <div dangerouslySetInnerHTML={{ __html: component.code }} />
                        </ComponentPreview>
                      ),
                    },
                    {
                      id: 'code',
                      label: 'Code',
                      content: (
                        <pre className="bg-default-50 p-4 rounded-md overflow-auto">
                          <code>{component.code}</code>
                        </pre>
                      ),
                      code: component.code,
                      documentation: getComponentDocumentation(component.id),
                    },
                  ]}
                />
              </ComponentWrapper>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPage;