import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
}

export const LoadingSpinner = ({
  size = "md",
  color = "blue",
  text = "در حال بارگذاری...",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-600",
    green: "border-green-600",
    red: "border-red-600",
    gray: "border-gray-600",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-t-transparent ${colorClasses[color as keyof typeof colorClasses]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
}; 
