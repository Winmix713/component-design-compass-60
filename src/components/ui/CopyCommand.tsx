
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface CopyCommandProps {
  code: string;
  className?: string;
  successMessage?: string;
  timeout?: number;
}

const CopyCommand: React.FC<CopyCommandProps> = ({ 
  code, 
  className,
  successMessage = "Copied to clipboard",
  timeout = 2000 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      
      toast({
        title: "Success",
        description: successMessage,
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleCopy}
      className={cn("h-8 px-2 gap-1", className)}
      disabled={isCopied}
    >
      {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
};

export default CopyCommand;
