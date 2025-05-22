import React from 'react';
import type { ButtonProps } from '../types/ButtonProps';

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;