
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeContext from '@/context/ThemeContext'; 
import CopyCommand from './ui/CopyCommand';

interface MarkdownProps {
  content: string;
  className?: string;
}

// Define a type for the code component props that includes the 'inline' property
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  // Use the ThemeContext
  const { theme } = useContext(ThemeContext);
  
  // Choose code highlighting style based on theme
  // If theme is 'system', check system preferences
  let effectiveTheme: 'light' | 'dark' = theme === 'system'
    ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme as 'light' | 'dark';
  
  const codeStyle = effectiveTheme === 'dark' ? tomorrow : prism;
  
  return (
    <div className={`markdown-content ${className || ''}`}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            
            return !inline && match ? (
              <div className="relative">
                <SyntaxHighlighter
                  style={codeStyle}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <CopyCommand 
                  code={String(children)} 
                  className="absolute top-2 right-2" 
                />
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
