import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/feedback/tooltip";
import { Button } from "@/components/ui/inputs/button";
import { cn } from "@/lib/utils";

interface EditorMenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltipText: string;
  children: React.ReactNode;
}

export function EditorMenuButton({
  onClick,
  isActive = false,
  disabled = false,
  tooltipText,
  children,
}: EditorMenuButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              isActive && "bg-accent text-accent-foreground",
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
            <span className="sr-only">{tooltipText}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
