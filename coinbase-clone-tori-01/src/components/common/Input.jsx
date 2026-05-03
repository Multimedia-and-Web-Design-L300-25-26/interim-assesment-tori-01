import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'flex items-center border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  const variants = {
    default: 'border-gray-300 bg-white',
    filled: 'border-gray-300 bg-gray-50 focus:bg-white',
    outlined: 'border-2 border-gray-300 bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const inputClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
    startIcon ? 'pl-10' : '',
    endIcon ? 'pr-10' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;