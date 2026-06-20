import { formatPrice } from "@/utils/formatters";
import { motion } from "framer-motion";

interface PriceCardProps {
  source: string;
  price: number;
  currency: string;
  isBestPrice?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PriceCard = ({
  source,
  price,
  currency,
  isBestPrice = false,
  onClick,
  className = "",
}: PriceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        p-4 rounded-xl border-2 transition-all cursor-pointer
        ${isBestPrice ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-blue-300"}
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{source}</span>
        {isBestPrice && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            بهترین قیمت
          </span>
        )}
      </div>
      <div className="mt-2 text-2xl font-bold text-gray-800">
        {formatPrice(price, currency)}
      </div>
      <div className="mt-1 text-xs text-gray-500">قیمت به {currency}</div>
    </motion.div>
  );
}; 
