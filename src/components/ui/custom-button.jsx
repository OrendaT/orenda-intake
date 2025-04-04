import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const Button = ({
  asChild,
  className,
  disabled,
  isSubmitting,
  hoverClass,
  children,
  ...props
}) => {
  // Default button classes
  const btnClasses = cn(
    `group relative z-[1] block w-full max-w-[16.31rem] overflow-hidden rounded-3xl border border-orenda-purple px-4 py-[0.62rem] font-open-sans font-bold text-orenda-purple transition-colors hover:text-white `,
    'italic' && isSubmitting,
    disabled && 'cursor-not-allowed opacity-50 hover:text-orenda-purple',
  );

  // default hover classes
  const spanClasses = cn(
    'absolute -left-[2px] -top-[1px] z-[-1] inline-block h-[calc(100%+2px)] w-0 rounded-3xl border bg-orenda-purple transition-all duration-500 group-hover:w-[calc(100%+4px)] hover:border-orenda-purple',
    disabled && 'hidden',
  );

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      disabled={disabled || isSubmitting}
      className={cn(btnClasses, className)}
      {...props}
    >
      <span className={cn(spanClasses, hoverClass)} />
      {children}
    </Comp>
  );
};
export default Button;
