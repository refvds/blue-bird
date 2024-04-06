import React, { FC } from 'react';

interface IButtonProps {
  label: string;
  secondary?: boolean;
  fullWith?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick: () => void;
}

const Button: FC<IButtonProps> = ({ label, secondary, fullWith, large, disabled, outline, onClick }) => {
  return (
    <button
      className={`
        disabled:opacity-70 
        disabled:cursor-not-allowed 
        rounded-full 
        font-semibold 
        hover:placeholder-opacity-80 
        transition 
        border-2 
        ${fullWith ? 'w-full' : 'w-fit'} 
        ${secondary ? 'bg-white text-black border-black' : 'bg-sky-500 text-white border-sky-500'} 
        ${large ? 'text-xl px-5 py-3' : 'text-md px-4 py-2'} 
        ${outline ? 'bg-transparent  border-whiite text-white' : ''}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
