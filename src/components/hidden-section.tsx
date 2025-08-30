import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';

const HiddenSection = ({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence mode='wait'>
      {show && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onAnimationComplete={() => {
            // Scroll into view after the enter animation completes
            ref.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
          className={cn(
            'clamp-[ml,1.5,5] relative mt-5 py-2 ps-5 pe-0 before:absolute before:inset-y-0 before:left-0 before:h-full before:w-[3px] before:rounded-full before:bg-[#b2b2b2]',
            className,
          )}
        >
          {children}{' '}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HiddenSection;
