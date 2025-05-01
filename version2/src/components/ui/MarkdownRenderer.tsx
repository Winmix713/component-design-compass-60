// Add new markdown renderer component
    import React from 'react';
    import ReactMarkdown from 'react-markdown';
    import { ComponentPreview } from './ComponentPreview';
    import { Card, CardBody, Divider } from '@heroui/react';
    import { cn } from '../../utils/cn';
    import SyntaxHighlighter from 'react-syntax-highlighter';
    import { vs2015, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
    import { useTheme } from '../../context/ThemeContext';

    interface MarkdownRendererProps {
      content: string;
      className?: string;
    }

    export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
      content,
      className,
    }) => {
      // Use document.documentElement.classList to check for dark mode
      const { isDarkMode } = useTheme();
      
      // Update dark mode state when the class changes
      React.useEffect(() => {
        const observer = new MutationObserver(() => {
          setIsDark(isDarkMode());
        });
        
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        });
        
        return () => observer.disconnect();
      }, []);
      
      // Fix the useTheme hook usage
      const [theme] = useTheme();
      
      return (
        <div className={cn('markdown-content', className)}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-bold mt-5 mb-2" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-lg font-bold mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="my-3 text-default-700" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 my-3" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 my-3" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="my-1" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-primary hover:underline" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-default-300 pl-4 italic my-4" {...props} />
              ),
              hr: () => <Divider className="my-6" />,
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-default-100" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-default-200 px-4 py-2 text-left" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-default-200 px-4 py-2" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const code = String(children).replace(/\n$/, '');
                
                // Handle inline code
                if (inline) {
                  return (
                    <code className="bg-default-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                
                // Handle code blocks
                if (language === 'preview') {
                  // This is a special case for component previews
                  // The format is: ```preview\n<Component code>\n```
                  return (
                    <ComponentPreview code={code}>
                      <div dangerouslySetInnerHTML={{ __html: code }} />
                    </ComponentPreview>
                  );
                }
                
                return (
                  <SyntaxHighlighter
                    language={language}
                    style={isDarkMode ? vs2015 : github}
                    className="rounded-md my-4"
                  >
                    {code}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    };