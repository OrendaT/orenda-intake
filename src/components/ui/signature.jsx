import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import useSignature from '@/hooks/useSignature';

const CANVAS_X = 1200; // Canvas width in pixels
const CANVAS_Y = 320; // Canvas height in pixels
const MAX_LENGTH = 29; // Max characters for signature text

/**
 * @author vehktaur
 * @component Comp
 * @description Component that renders a canvas-based text signature field.
 *
 * @param {Object} props
 * @param {string} props.className - Optional wrapper class
 * @param {Function} props.onChange - Callback to return base64 signature image
 */
const Comp = ({ id, className, onChange, value }) => {
  const { signature, setSignature } = useSignature();

  const [isClicked, setIsClicked] = useState(false);
  const [focused, setFocused] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  const canvasRef = useRef(null);

  /**
   * Draw signature text on canvas and update global signature state
   *
   * @param {string} text - Signature text
   */
  const drawOnCanvas = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
  };

  const handleChange = (value) => {
    const base64 = drawOnCanvas(value);
    if (!isClicked) setSignature({ text: value, base64 });
    onChange({ text: value, base64 });
  };

  /** Redraw stored signature text on canvas */
  const sign = () => {
    if (signature.text) {
      drawOnCanvas(signature.text);
      setIsClicked(true);
      onChange(signature);
    }
  };

  /** Clears the signature from internal clear */
  const clear = () => {
    setSignature({ text: '', base64: '' });
    setIsClicked(false);
    drawOnCanvas('');
  };

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
  }, [signature, isClicked, drawOnCanvas]);

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
          className='mb-2 mt-4 block w-full max-w-sm rounded bg-white/50 px-4 py-2 outline outline-1 outline-zinc-200 transition-all duration-300 ~text-sm/base focus:outline-zinc-500'
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
            className='absolute inset-0 content-center rounded-[inherit] bg-black/20 text-center font-open-sans'
          >
            <p className='font-medium italic ~text-base/3xl'>
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
 *
 * @param {Object} props
 * @param {string} props.name - RHF field name
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.required=true] - Set field as required
 * @param {string} [props.errorMsg] - Error message for validation
 * @param {string} [props.className] - Optional wrapper class
 */
export default function SignaturePad({
  name,
  disabled = false,
  required = true,
  errorMsg,
  className,
  options,
}) {
  return (
    <Controller
      name={name}
      rules={{
        disabled,
        required: { value: required, message: errorMsg },
        ...options,
      }}
      render={({ field: { onChange, value } }) => (
        <Comp
          id={name}
          className={className}
          onChange={(signature) => onChange(signature)}
          value={value}
        />
      )}
    />
  );
}
