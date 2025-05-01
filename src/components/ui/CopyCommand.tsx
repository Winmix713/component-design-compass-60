
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CopyCommandProps {
  code: string;
  className?: string;
}

const CopyCommand: React.FC<CopyCommandProps> = ({ code, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {isCopied ? "Copied!" : "Copy Code"}
    </Button>
  );
};

export default CopyCommand;
