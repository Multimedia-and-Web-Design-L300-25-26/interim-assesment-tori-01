import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'bg-white border border-gray-200 rounded-lg transition-all duration-200';

  const variants = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    outlined: 'border-2',
    flat: 'shadow-none border-none',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const hoverStyles = hover
    ? 'hover:shadow-lg hover:border-gray-300 cursor-pointer'
    : '';

  const classes = [
    baseStyles,
    variants[variant],
    paddings[padding],
    hoverStyles,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card sub-components for better organization
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;