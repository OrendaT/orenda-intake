import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

const HiddenSection = ({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence mode='wait'>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            'relative mt-5 clamp-[ml,1.5,5] py-2 ps-5 pe-0 before:absolute before:inset-y-0 before:left-0 before:h-full before:w-[3px] before:rounded-full before:bg-[#b2b2b2]',
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
