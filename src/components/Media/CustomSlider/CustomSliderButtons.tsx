'use client';

import React from 'react';

type SliderButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

function CustomSliderButtons({
  direction,
  onClick,
  disabled = false,
  className = '',
}: SliderButtonProps) {
  return (
    <button
      aria-label={`${direction} scroll button`}
      onClick={onClick}
      disabled={disabled}
      className={`slider-control-btn ${'disabled:opacity-40 text-gray-400 '} ${className}`}
    >
      {direction === 'left' ? (
        <svg
          className="w-[16px] h-[10.3px] lg:w-[23px] lg:h-[22px] 2xl:w-[28px] 2xl:h-[24px]"
          width="28"
          height="24"
          viewBox="0 0 28 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.7488 10.9999L1.69043 10.9999M1.69043 10.9999L10.7167 20.0262M1.69043 10.9999L10.7167 1.97363"
            stroke="white"
            strokeWidth="2.29239"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="w-[16px] h-[16px] lg:w-[23px] lg:h-[22px] 2xl:w-[28px] 2xl:h-[24px] "
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9125 1.9707L25.9417 11.9999M25.9417 11.9999L15.9125 22.0291M25.9417 11.9999H1.87164"
            stroke="white"
            strokeWidth="2.29239"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default CustomSliderButtons;
