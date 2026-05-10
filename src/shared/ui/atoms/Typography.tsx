import React from 'react';
import styles from './Typography.module.css';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  font?: 'serif' | 'sans';
  italic?: boolean;
  color?: 'white' | 'gold' | 'gray' | 'maroon';
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'p',
  font = 'sans',
  italic = false,
  color = 'white',
  className = '',
}) => {
  const Component = variant;
  const classes = [
    styles[variant],
    styles[font],
    italic ? styles.italic : '',
    styles[color],
    className,
  ].join(' ');

  return <Component className={classes}>{children}</Component>;
};

export default Typography;
