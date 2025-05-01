import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and display errors
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="max-w-md mx-auto my-8">
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:alert-triangle" className="text-danger" width={24} />
            <div className="flex flex-col">
              <p className="text-lg font-medium">Something went wrong</p>
              <p className="text-small text-default-500">
                An error occurred while rendering this component
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="bg-default-50 p-3 rounded-md overflow-auto max-h-40">
              <pre className="text-xs text-default-700">
                {this.state.error?.toString() || 'Unknown error'}
              </pre>
            </div>
          </CardBody>
          <CardFooter>
            <Button 
              color="primary" 
              onPress={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
): React.FC<P> {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
}
