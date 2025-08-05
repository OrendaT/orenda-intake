import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import useSignature from '@/hooks/use-signature';
import type { BaseFieldProps } from '@/types';
import type { TSignature } from '@/context/signature-context';

const CANVAS_X = 1200; // Canvas width in pixels
const CANVAS_Y = 320; // Canvas height in pixels
const MAX_LENGTH = 29; // Max characters for signature text

/**
 * @author vehktaur
 * @component Comp
 * @description Component that renders a canvas-based text signature field.
 *
 */
const Comp = ({
  id,
  className,
  onChange,
  value,
}: {
  id: string;
  className?: string;
  onChange: (value: TSignature) => void;
  value: TSignature;
}) => {
  const { signature, setSignature } = useSignature();

  const [isClicked, setIsClicked] = useState(false);
  const [focused, setFocused] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /**
   * Draw signature text on canvas and update global signature state
   *
   * @param {string} text - Signature text
   */
  const drawOnCanvas = useCallback((text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const ratio = window.devicePixelRatio || 2;

    canvas.width = CANVAS_X * ratio;
    canvas.height = CANVAS_Y * ratio;
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (text) {
      ctx.font =
        'italic 100px "Dancing Script", "Pacifico", "Great Vibes", "Brush Script MT", cursive';
      ctx.fillStyle = 'rgba(0,0,0)';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, CANVAS_X / 2, CANVAS_Y / 2);
    }
    return canvas.toDataURL();
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      const base64 = drawOnCanvas(value) || '';

      if (!isClicked) setSignature({ text: value, base64 });
      onChange({ text: value, base64 });
    },
    [isClicked, drawOnCanvas, onChange, setSignature],
  );

  /** Redraw stored signature text on canvas */
  const sign = () => {
    if (signature.text) {
      drawOnCanvas(signature.text);
      setIsClicked(true);
      onChange(signature);
    }
  };

  /** Clears the signature from internal clear */
  // const clear = () => {
  //   setSignature({ text: "", base64: "" });
  //   setIsClicked(false);
  //   drawOnCanvas("");
  // };

  useEffect(() => {
    /** Clears the signature from external clear */
    if (!signature.text && value?.text) {
      handleChange('');
      setIsClicked(false);
    }

    /** Redraw stored signature text on canvas automatically
     * after signed via click to sign
     */
    if (isClicked) {
      drawOnCanvas(signature.text || '');
      onChange(signature);
    }
  }, [signature, isClicked, drawOnCanvas, onChange, handleChange, value.text]);

  return (
    <div id={id} className={cn('signature', className)}>
      {/* Text input for signature */}
      {(!signature.text || value?.text) && !isClicked && (
        <input
          type='text'
          value={value?.text}
          onChange={({ target: { value } }) => {
            if (value.length > MAX_LENGTH) return;
            handleChange(value);
          }}
          className='clamp-[text,sm,base] mt-4 mb-2 block w-full max-w-sm rounded bg-white/50 px-4 py-2 outline outline-zinc-200 transition-all duration-300 focus:outline-zinc-500'
          placeholder='Type your signature here'
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
          }}
        />
      )}

      {/* Canvas preview */}
      <div className='relative rounded-xl'>
        <canvas
          ref={canvasRef}
          width={CANVAS_X}
          height={CANVAS_Y}
          className='my-5 w-full rounded-[inherit] border border-dashed border-zinc-500'
        />

        {/* Click to sign overlay */}
        {signature?.text && !value?.text && !isClicked && !focused && (
          <button
            type='button'
            onClick={sign}
            className='font-open-sans absolute inset-0 content-center rounded-[inherit] bg-black/20 text-center'
          >
            <p className='clamp-[text,base,3xl] font-medium italic'>
              <span className='sm:hidden'>Tap</span>{' '}
              <span className='hidden sm:inline'>Click</span> to sign
            </p>
          </button>
        )}
      </div>
      <div>
        {errors?.[id] && <p className='error'>Your signature is required</p>}

        {/* Clear button */}
        {/* <button
          type='button'
          onClick={clear}
          className='ml-auto block rounded-lg border border-zinc-800 px-4 py-1.5 text-sm uppercase tracking-wide'
        >
          Clear
        </button> */}
      </div>
    </div>
  );
};

/**
 * @author vehktaur
 * @component SignaturePad
 *
 * @description A typed signature input controlled by React Hook Form. Renders a canvas preview and outputs
 * base64-encoded image of the signature.
 */
export default function SignaturePad({
  name,
  disabled,
  required = true,
  errorMsg = 'This field is required',
  className,
  rules,
}: BaseFieldProps) {
  return (
    <Controller
      name={name}
      disabled={disabled}
      rules={{
        required: { value: required, message: errorMsg },
        ...rules,
      }}
      render={({ field: { onChange, value } }) => (
        <Comp
          id={name}
          className={className}
          onChange={(signature: TSignature) => onChange(signature)}
          value={value}
        />
      )}
    />
  );
}
