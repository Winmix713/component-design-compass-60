// Add new accessibility checker component
    import React from 'react';
    import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
    import { Icon } from '@iconify/react';

    interface AccessibilityIssue {
      id: string;
      impact: 'critical' | 'serious' | 'moderate' | 'minor';
      description: string;
      helpUrl: string;
      nodes: Array<{
        html: string;
        target: string[];
      }>;
    }

    interface AccessibilityCheckerProps {
      componentRef: React.RefObject<HTMLElement>;
      onCheck?: (issues: AccessibilityIssue[]) => void;
    }

    export const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({
      componentRef,
      onCheck,
    }) => {
      const [issues, setIssues] = React.useState<AccessibilityIssue[]>([]);
      const [isChecking, setIsChecking] = React.useState(false);
      
      const runA11yCheck = async () => {
        if (!componentRef.current) return;
        
        setIsChecking(true);
        
        try {
          // In a real implementation, you would use axe-core here
          // This is a mock implementation
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock issues for demonstration
          const mockIssues: AccessibilityIssue[] = [
            {
              id: 'color-contrast',
              impact: 'serious',
              description: 'Elements must have sufficient color contrast',
              helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/color-contrast',
              nodes: [
                {
                  html: '<button class="low-contrast">Submit</button>',
                  target: ['.low-contrast']
                }
              ]
            },
            {
              id: 'aria-required-attr',
              impact: 'critical',
              description: 'Required ARIA attributes must be provided',
              helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-required-attr',
              nodes: [
                {
                  html: '<div role="checkbox"></div>',
                  target: ['[role="checkbox"]']
                }
              ]
            }
          ];
          
          setIssues(mockIssues);
          if (onCheck) onCheck(mockIssues);
        } catch (error) {
          console.error('Error running accessibility check:', error);
        } finally {
          setIsChecking(false);
        }
      };
      
      const getImpactColor = (impact: string) => {
        switch (impact) {
          case 'critical': return 'danger';
          case 'serious': return 'warning';
          case 'moderate': return 'primary';
          case 'minor': return 'default';
          default: return 'default';
        }
      };
      
      return (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Accessibility Checker</h3>
            <Button
              color="primary"
              size="sm"
              onPress={runA11yCheck}
              isLoading={isChecking}
              startContent={!isChecking && <Icon icon="lucide:check-circle" />}
            >
              Run Check
            </Button>
          </CardHeader>
          <CardBody>
            {issues.length === 0 ? (
              <p className="text-default-500">
                Run an accessibility check to see issues
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  Found {issues.length} accessibility issues
                </p>
                {issues.map((issue) => (
                  <Card key={issue.id} className="border border-default-200">
                    <CardBody className="p-3">
                      <div className="flex items-start gap-2">
                        <Chip color={getImpactColor(issue.impact)} size="sm">
                          {issue.impact}
                        </Chip>
                        <div>
                          <p className="font-medium">{issue.description}</p>
                          <p className="text-xs text-default-500 mt-1">
                            {issue.nodes[0].html}
                          </p>
                          <a 
                            href={issue.helpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-2 inline-block"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      );
    };