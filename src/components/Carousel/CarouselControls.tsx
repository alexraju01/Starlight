interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselControls({ onPrev, onNext }: Props) {
  return (
    <div className="absolute flex justify-between gap-2.5 p-5 z-30 md:right-[25px] lg:right-[101px] bottom-[47px]">
      <button
        className="border-2 hover:cursor-pointer border-solid p-3.5 rounded-lg border-white"
        onClick={onPrev}
      >
        {/* Left Arrow */}
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.75 9L1.25 9M1.25 9L9.125 16.875M1.25 9L9.125 1.125"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="bg-white border-2 p-3.5 hover:cursor-pointer rounded-lg border-white"
        onClick={onNext}
      >
        {/* Right Arrow */}
        <svg
          width="20"
          height="18"
          viewBox="0 0 24 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.75 1.25L22.5 10M22.5 10L13.75 18.75M22.5 10H1.5"
            stroke="#100F10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
