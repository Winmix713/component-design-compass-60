import React from 'react';
import { Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/cn';

interface CopyCommandProps {
  text: string;
  className?: string;
  successMessage?: string;
  timeout?: number;
}

/**
 * Component for copying text to clipboard
 */
export const CopyCommand: React.FC<CopyCommandProps> = ({
  text,
  className,
  successMessage = 'Copied!',
  timeout = 2000,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Tooltip
      content={copied ? successMessage : 'Copy to clipboard'}
      placement="top"
      color={copied ? 'success' : 'default'}
    >
      <Button
        isIconOnly
        variant="light"
        size="sm"
        className={cn('text-default-500 hover:text-default-900', className)}
        onPress={handleCopy}
        aria-label="Copy to clipboard"
      >
        <Icon 
          icon={copied ? 'lucide:check' : 'lucide:copy'} 
          className={cn(
            'transition-all',
            copied ? 'text-success' : 'text-default-500'
          )}
        />
      </Button>
    </Tooltip>
  );
};
