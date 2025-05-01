import React from 'react';
import { Card, CardBody, CardHeader, Divider, Chip } from '@heroui/react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Icon } from '@iconify/react';

const ChangelogPage = () => {
  const breadcrumbItems = [
    {
      label: 'Home',
      href: '/',
      icon: 'lucide:home',
    },
    {
      label: 'Changelog',
      href: '/changelog',
      icon: 'lucide:history',
    },
  ];

  const changes = [
    {
      version: '1.2.0',
      date: '2023-06-15',
      changes: [
        {
          type: 'feature',
          description: 'Added theme editor for customizing design tokens',
        },
        {
          type: 'feature',
          description: 'Added component editor for modifying component code',
        },
        {
          type: 'improvement',
          description: 'Enhanced sidebar navigation with nested items',
        },
      ],
    },
    {
      version: '1.1.0',
      date: '2023-05-01',
      changes: [
        {
          type: 'feature',
          description: 'Added pattern library section',
        },
        {
          type: 'fix',
          description: 'Fixed responsive layout issues on mobile devices',
        },
        {
          type: 'improvement',
          description: 'Improved component preview with better code highlighting',
        },
      ],
    },
    {
      version: '1.0.0',
      date: '2023-04-15',
      changes: [
        {
          type: 'feature',
          description: 'Initial release of Boltoo Design System',
        },
        {
          type: 'feature',
          description: 'Component library with documentation',
        },
        {
          type: 'feature',
          description: 'Design tokens documentation',
        },
      ],
    },
  ];

  const getChipColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'success';
      case 'fix':
        return 'danger';
      case 'improvement':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getChipIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return 'lucide:plus-circle';
      case 'fix':
        return 'lucide:bug';
      case 'improvement':
        return 'lucide:arrow-up-circle';
      default:
        return 'lucide:info';
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-6" />
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Changelog</h1>
          <p className="text-default-600">
            A record of all notable changes made to the Boltoo Design System.
          </p>
        </div>

        <div className="space-y-8">
          {changes.map((release) => (
            <Card key={release.version} className="overflow-hidden">
              <CardHeader className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Version {release.version}</h2>
                  <p className="text-default-500">{release.date}</p>
                </div>
                <Chip color="primary" variant="flat">
                  Release
                </Chip>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                {release.changes.map((change, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Chip
                      color={getChipColor(change.type)}
                      variant="flat"
                      startContent={<Icon icon={getChipIcon(change.type)} />}
                      className="capitalize"
                    >
                      {change.type}
                    </Chip>
                    <p>{change.description}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;
