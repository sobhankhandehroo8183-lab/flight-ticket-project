"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, formatDate } from "@/utils/formatters";
import { 
  ArrowLeftIcon,
  ChartBarIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShareIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { 
  TrophyIcon,
  FireIcon,
  ShieldCheckIcon,
  StarIcon,
  BoltIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

// ============================================
// COMPONENTS
// ============================================

const Button = ({ children, onClick, variant = "primary", size = "md", isLoading = false, className = "" }: any) => {
  const variants: any = {
    primary: "bg-gradient-to-r from-[#6C63FF] to-[#00D2FF] text-white shadow-lg shadow-purple-500/25",
    outline: "border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white",
    success: "bg-gradient-to-r from-[#00B894] to-[#00D2FF] text-white shadow-lg shadow-emerald-500/25",
    danger: "bg-gradient-to-r from-[#FF6B6B] to-[#FDCB6E] text-white",
    ghost: "hover:bg-gray-100 text-gray-700",
  };
  const sizes: any = {
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${variants[variant]} ${sizes[size]} font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <ArrowPathIcon className="w-5 h-5 animate-spin" />
          در حال مقایسه...
        </>
      ) : children}
    </button>
  );
};

// ============================================
// MOCK DATA
// ============================================

const mockFlightData = {
  id: "1",
  airline: "ترکیش ایرلاینز",
  flightNumber: "TK-1234",
  origin: "تهران (IKA)",
  destination: "استانبول (IST)",
  departureTime: new Date(Date.now() + 3600000).toISOString(),
  arrivalTime: new Date(Date.now() + 7200000).toISOString(),
  duration: "3 ساعت",
};

const mockTripPrices = [
  { source: "trip.com", price: 12500000, currency: "IRR", priceInIRR: 12500000, isBestPrice: true, features: ["پشتیبانی ۲۴/۷", "لغو رایگان", "پرداخت امن"], rating: 4.8 },
  { source: "kayak.com", price: 12800000, currency: "IRR", priceInIRR: 12800000, isBestPrice: false, features: ["مقایسه قیمت"], rating: 4.5 },
  { source: "skyscanner.com", price: 13000000, currency: "IRR", priceInIRR: 13000000, isBestPrice: false, features: ["پشتیبانی ۲۴/۷"], rating: 4.6 },
];

const mockDomesticPrices = [
  { source: "علی‌بابا", price: 13800000, currency: "IRR", priceInIRR: 13800000, isBestPrice: false, features: ["پشتیبانی فارسی", "پرداخت آسان", "تخفیف ویژه"], rating: 4.7 },
  { source: "فلای‌تودی", price: 14200000, currency: "IRR", priceInIRR: 14200000, isBestPrice: false, features: ["تخفیف ویژه"], rating: 4.3 },
  { source: "جار", price: 14500000, currency: "IRR", priceInIRR: 14500000, isBestPrice: false, features: ["پشتیبانی فارسی"], rating: 4.4 },
];

const mockCompareResult = {
  tripPrice: 12500000,
  domesticPrice: 13800000,
  difference: 1300000,
  savings: 1300000,
  isCheaper: true,
  tripSource: "trip.com",
  domesticSource: "علی‌بابا",
  lastUpdated: new Date().toISOString(),
};

// ============================================
// MAIN PAGE
// ============================================

export default function ComparePricesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  
  const [flightData] = useState(mockFlightData);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [tripPrices, setTripPrices] = useState<any[]>([]);
  const [domesticPrices, setDomesticPrices] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<"compare" | "details">("compare");
  const [isLiked, setIsLiked] = useState(false);

  const handleCompare = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setComparisonResult(mockCompareResult);
    setTripPrices(mockTripPrices);
    setDomesticPrices(mockDomesticPrices);
    setIsLoading(false);
    toast.success("مقایسه قیمت‌ها با موفقیت انجام شد!");
  };

  useEffect(() => {
    if (flightId) {
      handleCompare();
    }
  }, [flightId]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      toast.success("لینک کپی شد!");
    });
  };

  const getBestPrice = (prices: any[]) => {
    return prices.reduce((min, p) => p.priceInIRR < min.priceInIRR ? p : min, prices[0]);
  };

  const bestTrip = getBestPrice(tripPrices);
  const bestDomestic = getBestPrice(domesticPrices);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/flight-results")}
              className="p-2 hover:bg-white/50 rounded-full transition-all backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-[#6C63FF]" />
                مقایسه قیمت
              </h1>
              <p className="text-gray-500 text-sm">
                {flightData.origin} → {flightData.destination}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <ShareIcon className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsLiked(!isLiked)}
            >
              <HeartIcon className={`w-5 h-5 ${isLiked ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
            </Button>
          </div>
        </motion.div>

        {/* ===== FLIGHT INFO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#00D2FF] rounded-xl flex items-center justify-center text-white font-bold">
                {flightData.airline?.charAt(0) || "✈"}
              </div>
              <div>
                <div className="text-xs text-gray-400">شرکت هواپیمایی</div>
                <div className="font-semibold text-gray-800">{flightData.airline}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">شماره پرواز</div>
              <div className="font-semibold text-gray-800">{flightData.flightNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">تاریخ حرکت</div>
              <div className="font-semibold text-gray-800">{formatDate(flightData.departureTime)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">مدت زمان</div>
              <div className="font-semibold text-gray-800">{flightData.duration}</div>
            </div>
          </div>
        </motion.div>

        {/* ===== TABS ===== */}
        <div className="flex gap-2 mb-6 bg-white/50 backdrop-blur-sm rounded-2xl p-1 border border-white/50 max-w-xs">
          <button
            onClick={() => setSelectedTab("compare")}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              selectedTab === "compare" 
                ? "bg-[#6C63FF] text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            مقایسه قیمت
          </button>
          <button
            onClick={() => setSelectedTab("details")}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              selectedTab === "details" 
                ? "bg-[#6C63FF] text-white shadow-md" 
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            جزئیات پرواز
          </button>
        </div>

        {/* ===== LOADING STATE ===== */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-[#6C63FF]/20 border-t-[#6C63FF] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChartBarIcon className="w-8 h-8 text-[#6C63FF] animate-pulse" />
                </div>
              </div>
              <p className="mt-6 text-gray-500 font-medium">در حال دریافت قیمت‌ها از منابع مختلف...</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                {["trip.com", "علی‌بابا", "فلای‌تودی", "کایاک"].map((source, i) => (
                  <span key={source} className="flex items-center gap-1.5">
                    <span 
                      className="w-2 h-2 rounded-full animate-pulse" 
                      style={{ 
                        backgroundColor: ["#6C63FF", "#00B894", "#FDCB6E", "#FF6B6B"][i],
                        animationDelay: `${i * 0.2}s` 
                      }} 
                    />
                    {source}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== RESULTS ===== */}
        <AnimatePresence>
          {!isLoading && comparisonResult && selectedTab === "compare" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* ===== COMPARISON RESULT CARD ===== */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`rounded-3xl shadow-2xl p-8 border-2 ${
                  comparisonResult.isCheaper 
                    ? "bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border-emerald-400" 
                    : "bg-gradient-to-br from-rose-50/80 to-amber-50/80 border-rose-400"
                }`}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-6xl mb-2"
                  >
                    {comparisonResult.isCheaper ? "🎉" : "⚠️"}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold">
                    {comparisonResult.isCheaper ? (
                      <span className="text-emerald-600">سایت‌های داخلی ارزان‌تر هستند!</span>
                    ) : (
                      <span className="text-rose-600">trip.com ارزان‌تر است!</span>
                    )}
                  </h3>
                  
                  <p className="text-gray-600 mt-2">
                    اختلاف قیمت: <span className="font-bold text-lg">{formatPrice(Math.abs(comparisonResult.savings))}</span>
                  </p>
                  
                  <div className="text-xs text-gray-400 mt-1">
                    آخرین به‌روزرسانی: {new Date(comparisonResult.lastUpdated).toLocaleTimeString("fa-IR")}
                  </div>

                  {/* ===== PRICE BARS ===== */}
                  <div className="max-w-2xl mx-auto mt-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-20 text-right">trip.com</span>
                      <div className="flex-1 h-4 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(comparisonResult.tripPrice / Math.max(comparisonResult.tripPrice, comparisonResult.domesticPrice)) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D2FF] rounded-full"
                        />
                      </div>
                      <span className="text-sm font-bold text-[#6C63FF]">{formatPrice(comparisonResult.tripPrice)}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-gray-500 w-20 text-right">داخلی</span>
                      <div className="flex-1 h-4 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(comparisonResult.domesticPrice / Math.max(comparisonResult.tripPrice, comparisonResult.domesticPrice)) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#00B894] to-[#00D2FF] rounded-full"
                        />
                      </div>
                      <span className="text-sm font-bold text-emerald-600">{formatPrice(comparisonResult.domesticPrice)}</span>
                    </div>
                  </div>

                  {/* ===== SAVINGS BADGE ===== */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mt-4 ${
                      comparisonResult.isCheaper 
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-200" 
                        : "bg-rose-500/10 text-rose-600 border border-rose-200"
                    }`}
                  >
                    <SparklesIcon className="w-5 h-5" />
                    <span className="font-medium">
                      {comparisonResult.isCheaper 
                        ? `صرفه‌جویی ${formatPrice(comparisonResult.savings)} با خرید از سایت‌های داخلی` 
                        : `خرید از trip.com ${formatPrice(Math.abs(comparisonResult.savings))} ارزان‌تر است`}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* ===== PRICE CARDS ===== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* International */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="flight-card bg-white/90 backdrop-blur-sm border border-white/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#6C63FF] flex items-center gap-2">
                      <GlobeAltIcon className="w-5 h-5" />
                      بین‌المللی
                    </h3>
                    <div className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full">
                      <span className="text-gray-500">{tripPrices.length} منبع</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {tripPrices.map((price, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                          price.isBestPrice 
                            ? "bg-gradient-to-r from-[#6C63FF]/10 to-[#00D2FF]/10 border-2 border-[#6C63FF]/20 shadow-sm" 
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{price.source}</span>
                            {price.isBestPrice && (
                              <span className="badge-new badge-best text-[10px]">
                                <TrophyIcon className="w-3 h-3" />
                                بهترین
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {price.features?.slice(0, 2).map((f: string) => (
                              <span key={f} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                                {f}
                              </span>
                            ))}
                            {price.rating && (
                              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                <StarIcon className="w-3 h-3 text-[#FDCB6E] fill-[#FDCB6E]" />
                                {price.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${price.isBestPrice ? "text-[#6C63FF] text-lg" : "text-gray-800"}`}>
                            {formatPrice(price.priceInIRR)}
                          </span>
                          {price.isBestPrice && (
                            <div className="text-[10px] text-emerald-500">ارزان‌ترین</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Domestic */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="flight-card bg-white/90 backdrop-blur-sm border border-white/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-emerald-600 flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5" />
                      داخلی
                    </h3>
                    <div className="flex items-center gap-1 text-xs bg-emerald-50 px-2 py-1 rounded-full">
                      <span className="text-gray-500">{domesticPrices.length} منبع</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {domesticPrices.map((price, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                          price.isBestPrice 
                            ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/20 shadow-sm" 
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{price.source}</span>
                            {price.isBestPrice && (
                              <span className="badge-new badge-best text-[10px]">
                                <TrophyIcon className="w-3 h-3" />
                                بهترین
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {price.features?.slice(0, 2).map((f: string) => (
                              <span key={f} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                                {f}
                              </span>
                            ))}
                            {price.rating && (
                              <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                <StarIcon className="w-3 h-3 text-[#FDCB6E] fill-[#FDCB6E]" />
                                {price.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${price.isBestPrice ? "text-emerald-600 text-lg" : "text-gray-800"}`}>
                            {formatPrice(price.priceInIRR)}
                          </span>
                          {price.isBestPrice && (
                            <div className="text-[10px] text-emerald-500">ارزان‌ترین</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ===== SAVINGS COMPARISON ===== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <BoltIcon className="w-5 h-5 text-amber-500" />
                  مقایسه سریع
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-gray-400">ارزان‌ترین خارجی</div>
                    <div className="font-bold text-[#6C63FF]">{formatPrice(bestTrip?.priceInIRR)}</div>
                    <div className="text-xs text-gray-400">{bestTrip?.source}</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-gray-400">ارزان‌ترین داخلی</div>
                    <div className="font-bold text-emerald-600">{formatPrice(bestDomestic?.priceInIRR)}</div>
                    <div className="text-xs text-gray-400">{bestDomestic?.source}</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-gray-400">اختلاف قیمت</div>
                    <div className={`font-bold ${comparisonResult.isCheaper ? "text-emerald-600" : "text-rose-600"}`}>
                      {formatPrice(Math.abs(comparisonResult.difference))}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-gray-400">برنده</div>
                    <div className={`font-bold ${comparisonResult.isCheaper ? "text-emerald-600" : "text-[#6C63FF]"}`}>
                      {comparisonResult.isCheaper ? "داخلی" : "trip.com"}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ===== ACTION BUTTONS ===== */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button variant="outline" onClick={() => router.push("/flight-results")}>
                  بازگشت به نتایج
                </Button>
                <Button variant="primary" onClick={handleCompare}>
                  <ArrowPathIcon className="w-5 h-5" />
                  مقایسه مجدد
                </Button>
                <Button variant="success" onClick={() => {
                  toast.success("در حال انتقال به صفحه خرید...", {
                    icon: "🛒",
                    style: {
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #00B894, #00D2FF)',
                      color: '#fff',
                    },
                  });
                }}>
                  <RocketLaunchIcon className="w-5 h-5" />
                  خرید بلیط
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== DETAILS TAB ===== */}
        <AnimatePresence>
          {!isLoading && comparisonResult && selectedTab === "details" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <InformationCircleIcon className="w-6 h-6 text-[#6C63FF]" />
                جزئیات پرواز
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">شرکت هواپیمایی</div>
                  <div className="font-semibold text-gray-800">{flightData.airline}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">شماره پرواز</div>
                  <div className="font-semibold text-gray-800">{flightData.flightNumber}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">مسیر</div>
                  <div className="font-semibold text-gray-800">{flightData.origin} → {flightData.destination}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">تاریخ حرکت</div>
                  <div className="font-semibold text-gray-800">{formatDate(flightData.departureTime)}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">تاریخ ورود</div>
                  <div className="font-semibold text-gray-800">{formatDate(flightData.arrivalTime)}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-xs text-gray-400">مدت زمان</div>
                  <div className="font-semibold text-gray-800">{flightData.duration}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== FOOTER ===== */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse" />
              مقایسه از {tripPrices.length + domesticPrices.length} منبع
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              قیمت‌ها به‌روزرسانی لحظه‌ای
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              تضمین بهترین قیمت
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}