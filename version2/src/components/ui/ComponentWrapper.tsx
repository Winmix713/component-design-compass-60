import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Divider } from '@heroui/react';
import { CopyCommand } from './CopyCommand';
import { cn } from '../../utils/cn';

interface ComponentWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  code?: string;
  className?: string;
  bodyClassName?: string;
  showCode?: boolean;
  actions?: React.ReactNode;
}

/**
 * Wrapper for displaying components with title, description, and code
 */
export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  children,
  title,
  description,
  code,
  className,
  bodyClassName,
  showCode = false,
  actions,
}) => {
  return (
    <Card className={cn('w-full', className)}>
      {(title || description) && (
        <CardHeader className="flex flex-col gap-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-default-500 text-sm">{description}</p>}
        </CardHeader>
      )}
      
      <CardBody className={cn('flex items-center justify-center p-6', bodyClassName)}>
        {children}
      </CardBody>
      
      {(code || actions) && (
        <>
          <Divider />
          <CardFooter className="flex justify-between items-center">
            <div className="flex-1">
              {actions}
            </div>
            {code && (
              <CopyCommand text={code} />
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};
