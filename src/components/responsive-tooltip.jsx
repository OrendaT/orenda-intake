import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const ResponsiveTooltip = ({
  trigger,
  content,
  className,
  contentClassName,
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger
            type='button'
            className={cn(
              'ml-2 hidden size-4 shrink-0 place-items-center rounded-full border-2 border-zinc-700 text-xs leading-none md:grid',
              className,
            )}
          >
            {trigger || '?'}
          </TooltipTrigger>
          <TooltipContent className={cn('max-w-[40ch]', contentClassName)}>
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Popover>
        <PopoverTrigger
          type='button'
          className={cn(
            'ml-2 grid size-4 shrink-0 place-items-center rounded-full border-2 border-zinc-700 text-xs leading-none md:hidden',
            className,
          )}
        >
          ?
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'max-w-[40ch] bg-black/90 p-2 text-xs text-white',
            contentClassName,
          )}
        >
          {content}
        </PopoverContent>
      </Popover>
    </>
  );
};
export default ResponsiveTooltip;
