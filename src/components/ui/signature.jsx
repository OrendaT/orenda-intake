import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

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

  const [text, setText] = useState(() => null);
  const [isClicked, setIsClicked] = useState(false);
  const [focused, setFocused] = useState(false);

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
      ctx.font = 'italic 100px "Dancing Script"';
      ctx.fillStyle = 'rgba(0,0,0)';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, CANVAS_X / 2, CANVAS_Y / 2);
    }
    return canvas.toDataURL();
  };

  const handleChange = (value) => {
    const base64 = canvasRef.current?.toDataURL() || '';
    setSignature({ text: value ?? text, base64 });
    onChange({ text: value ?? text, base64 });
  };

  /** Redraw stored signature text on canvas */
  const sign = () => {
    if (signature.text) {
      drawOnCanvas(signature.text);
      setIsClicked(true);
      onChange(signature);
    }
  };

  /** Clears the signature */
  const clear = () => {
    setSignature({ text: '', base64: '' });
  };

  useEffect(() => {
    if (!signature.text && text) {
      setText('');
    }

    if (signature.text && text === '') {
      setText(null);
    }

    if (isClicked) {
      drawOnCanvas(signature.text || '');
      handleChange();
    }
  }, [signature, text]);

  useEffect(() => {
    if (value?.base64) {
      drawOnCanvas(value.text);
    }
  }, [drawOnCanvas]);

  return (
    <div id={id} className={cn('signature', className)}>
      {/* Text input for signature */}
      {(!signature.text || text !== null) && (
        <input
          type='text'
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > MAX_LENGTH) return;
            setText(value);
            handleChange(value);
          }}
          className='mb-2 mt-4 block w-full max-w-sm rounded bg-white/50 px-4 py-2 outline outline-1 outline-zinc-200 transition-all duration-300 ~text-sm/base focus:outline-zinc-500'
          placeholder='Type your signature here'
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (text === '') setText(null);
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
        {signature.text &&
          !value.text &&
          text === null &&
          !isClicked &&
          !focused && (
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

      {/* Clear button */}
      <button
        type='button'
        onClick={clear}
        className='ml-auto block rounded-lg border border-zinc-800 px-4 py-1.5 text-sm uppercase tracking-wide'
      >
        Clear
      </button>
    </div>
  );
};

/**
 * @author vehktaur
 * @component SignatureMaker
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
export default function SignatureMaker({
  name,
  disabled = false,
  required = true,
  errorMsg,
  className,
}) {
  return (
    <Controller
      name={name}
      rules={{ disabled, required: { value: required, message: errorMsg } }}
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
