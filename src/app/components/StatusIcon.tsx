type StatusIconProps = {
  isCorrect: boolean;
};

const StatusIcon: React.FC<StatusIconProps> = ({ isCorrect }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {isCorrect ? (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M5 13l4 4L19 7" 
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      )}
    </svg>
  );
};

export default StatusIcon;
