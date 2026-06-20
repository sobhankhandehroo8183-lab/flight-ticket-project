"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, formatDate } from "@/utils/formatters";
import { 
  ArrowLeftIcon, 
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
  ClockIcon,
  XMarkIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { 
  StarIcon,
  FireIcon,
  PaperAirplaneIcon,
  TrophyIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

// ============================================
// COMPONENTS
// ============================================

const Button = ({ children, onClick, variant = "primary", size = "md", className = "" }: any) => {
  const variants: any = {
    primary: "bg-gradient-to-r from-[#6C63FF] to-[#00D2FF] text-white shadow-lg shadow-purple-500/25",
    outline: "border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white",
    ghost: "hover:bg-gray-100 text-gray-700",
    success: "bg-gradient-to-r from-[#00B894] to-[#00D2FF] text-white",
    danger: "bg-gradient-to-r from-[#FF6B6B] to-[#FDCB6E] text-white",
  };
  const sizes: any = {
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-6 py-3 text-lg rounded-2xl"
  };
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${className}`}
    >
      {children}
    </button>
  );
};

const FilterChip = ({ label, active, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
      active 
        ? "bg-gradient-to-r from-[#6C63FF] to-[#00D2FF] text-white shadow-md" 
        : "bg-white border border-gray-200 text-gray-600 hover:border-[#6C63FF]"
    }`}
  >
    {label}
  </motion.button>
);

// ============================================
// MOCK DATA
// ============================================

const mockFlights = [
  {
    id: "1",
    airline: "ترکیش ایرلاینز",
    flightNumber: "TK-1234",
    origin: "IKA",
    destination: "IST",
    departureTime: new Date(Date.now() + 3600000).toISOString(),
    arrivalTime: new Date(Date.now() + 7200000).toISOString(),
    duration: "180",
    price: 12500000,
    currency: "IRR",
    priceInIRR: 12500000,
    stops: 0,
    cabinClass: "economy",
    source: "trip.com",
    isBestPrice: true,
    rating: 4.8,
    reviews: 234,
    amenities: ["WiFi", "غذا", "سرگرمی"]
  },
  {
    id: "2",
    airline: "امارات",
    flightNumber: "EK-5678",
    origin: "IKA",
    destination: "DXB",
    departureTime: new Date(Date.now() + 7200000).toISOString(),
    arrivalTime: new Date(Date.now() + 10800000).toISOString(),
    duration: "240",
    price: 18500000,
    currency: "IRR",
    priceInIRR: 18500000,
    stops: 1,
    stopCities: ["DOH"],
    cabinClass: "economy",
    source: "علی‌بابا",
    isBestPrice: false,
    rating: 4.5,
    reviews: 189,
    amenities: ["WiFi", "سرگرمی"]
  },
  {
    id: "3",
    airline: "قطر ایرویز",
    flightNumber: "QR-9012",
    origin: "IKA",
    destination: "LHR",
    departureTime: new Date(Date.now() + 10800000).toISOString(),
    arrivalTime: new Date(Date.now() + 18000000).toISOString(),
    duration: "360",
    price: 32000000,
    currency: "IRR",
    priceInIRR: 32000000,
    stops: 1,
    stopCities: ["DOH"],
    cabinClass: "business",
    source: "فلای‌تودی",
    isBestPrice: false,
    rating: 4.9,
    reviews: 312,
    amenities: ["WiFi", "غذا", "سرگرمی", "اتاق خواب"]
  },
  {
    id: "4",
    airline: "لوفتهانزا",
    flightNumber: "LH-4567",
    origin: "IKA",
    destination: "FRA",
    departureTime: new Date(Date.now() + 14400000).toISOString(),
    arrivalTime: new Date(Date.now() + 21600000).toISOString(),
    duration: "420",
    price: 28000000,
    currency: "IRR",
    priceInIRR: 28000000,
    stops: 0,
    cabinClass: "economy",
    source: "trip.com",
    isBestPrice: false,
    rating: 4.7,
    reviews: 156,
    amenities: ["WiFi", "غذا"]
  },
  {
    id: "5",
    airline: "هواپیمایی جمهوری اسلامی",
    flightNumber: "IR-8910",
    origin: "IKA",
    destination: "IST",
    departureTime: new Date(Date.now() + 18000000).toISOString(),
    arrivalTime: new Date(Date.now() + 21600000).toISOString(),
    duration: "210",
    price: 9500000,
    currency: "IRR",
    priceInIRR: 9500000,
    stops: 0,
    cabinClass: "economy",
    source: "علی‌بابا",
    isBestPrice: true,
    rating: 4.2,
    reviews: 89,
    amenities: ["غذا"]
  },
];

// ============================================
// MAIN PAGE
// ============================================

export default function FlightResultsPage() {
  const router = useRouter();
  const flightSearch = useSelector((state: RootState) => state.flightSearch);
  const { results, isLoading, origin, destination, departureDate } = flightSearch;
  
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure" | "rating">("price");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState<string>("همه");
  const [selectedStops, setSelectedStops] = useState<string>("همه");
  const [priceRange, setPriceRange] = useState<number>(50000000);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const displayResults = results.length > 0 ? results : mockFlights;

  // Sort options
  const sortOptions = [
    { value: "price", label: "قیمت", icon: <ArrowsUpDownIcon className="w-4 h-4" /> },
    { value: "duration", label: "مدت زمان", icon: <ClockIcon className="w-4 h-4" /> },
    { value: "departure", label: "زمان حرکت", icon: <PaperAirplaneIcon className="w-4 h-4" /> },
    { value: "rating", label: "امتیاز", icon: <StarIcon className="w-4 h-4" /> },
  ];

  // Cabin classes
  const cabinClasses = ["همه", "اکونومی", "بیزینس", "فرست"];
  const stopOptions = ["همه", "مستقیم", "۱ توقف", "۲+ توقف"];

  useEffect(() => {
    let sorted = [...displayResults];

    // Filter by cabin
    if (selectedCabin !== "همه") {
      sorted = sorted.filter(f => f.cabinClass === selectedCabin);
    }

    // Filter by stops
    if (selectedStops === "مستقیم") {
      sorted = sorted.filter(f => f.stops === 0);
    } else if (selectedStops === "۱ توقف") {
      sorted = sorted.filter(f => f.stops === 1);
    } else if (selectedStops === "۲+ توقف") {
      sorted = sorted.filter(f => f.stops >= 2);
    }

    // Filter by price
    sorted = sorted.filter(f => f.priceInIRR <= priceRange);

    // Sort
    if (sortBy === "price") {
      sorted.sort((a, b) => (a.priceInIRR || 0) - (b.priceInIRR || 0));
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0));
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredResults(sorted);
  }, [displayResults, sortBy, selectedCabin, selectedStops, priceRange]);

  const getBestBadge = (flight: any) => {
    if (flight.isBestPrice) {
      return { text: "بهترین قیمت", icon: <TrophyIcon className="w-4 h-4" />, color: "badge-best" };
    }
    if (flight.stops === 0) {
      return { text: "مستقیم", icon: <CheckBadgeIcon className="w-4 h-4" />, color: "badge-fast" };
    }
    return null;
  };

  const getDurationText = (duration: string) => {
    const mins = parseInt(duration);
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#6C63FF]/20 border-t-[#6C63FF] rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PaperAirplaneIcon className="w-8 h-8 text-[#6C63FF] animate-pulse rotate-45" />
          </div>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-gray-500 font-medium"
        >
          در حال جستجوی بهترین قیمت‌ها...
        </motion.p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <span className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse" />
          <span>trip.com</span>
          <span className="w-2 h-2 bg-[#00D2FF] rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
          <span>علی‌بابا</span>
          <span className="w-2 h-2 bg-[#00B894] rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
          <span>فلای‌تودی</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        
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
              onClick={() => router.push("/")}
              className="p-2 hover:bg-white/50 rounded-full transition-all backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <PaperAirplaneIcon className="w-6 h-6 text-[#6C63FF] rotate-45" />
                نتایج پروازها
              </h1>
              <p className="text-gray-500 text-sm">
                {origin || "مبدا"} → {destination || "مقصد"} • 
                <span className="font-semibold text-[#6C63FF]"> {filteredResults.length}</span> پرواز
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* View Toggle */}
            <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-1 border border-white/50">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-[#6C63FF] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-[#6C63FF] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Button */}
            <Button
              variant={showFilters ? "primary" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon className="w-5 h-5 inline mr-1" />
              فیلتر
              {showFilters ? <ChevronUpIcon className="w-4 h-4 inline ml-1" /> : <ChevronDownIcon className="w-4 h-4 inline ml-1" />}
            </Button>
          </div>
        </motion.div>

        {/* ===== FILTERS PANEL ===== */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="glass-card p-6 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">مرتب‌سازی</label>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <FilterChip
                        key={option.value}
                        label={option.label}
                        active={sortBy === option.value}
                        onClick={() => setSortBy(option.value as any)}
                      />
                    ))}
                  </div>
                </div>

                {/* Cabin Class */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">کلاس پرواز</label>
                  <div className="flex flex-wrap gap-2">
                    {cabinClasses.map((cls) => (
                      <FilterChip
                        key={cls}
                        label={cls}
                        active={selectedCabin === cls}
                        onClick={() => setSelectedCabin(cls)}
                      />
                    ))}
                  </div>
                </div>

                {/* Stops */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">توقف</label>
                  <div className="flex flex-wrap gap-2">
                    {stopOptions.map((stop) => (
                      <FilterChip
                        key={stop}
                        label={stop}
                        active={selectedStops === stop}
                        onClick={() => setSelectedStops(stop)}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    حداکثر قیمت: {formatPrice(priceRange)}
                  </label>
                  <input
                    type="range"
                    min="5000000"
                    max="50000000"
                    step="1000000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-[#6C63FF]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatPrice(5000000)}</span>
                    <span>{formatPrice(50000000)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== RESULTS ===== */}
        {filteredResults.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700">هیچ پروازی یافت نشد</h3>
            <p className="text-gray-400 mt-2">فیلترهای خود را تغییر دهید و دوباره امتحان کنید</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => router.push("/")}
            >
              جستجوی جدید
            </Button>
          </motion.div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
            {filteredResults.map((flight, index) => {
              const badge = getBestBadge(flight);
              const isExpanded = expandedCard === flight.id;

              return (
                <motion.div
                  key={flight.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flight-card relative overflow-hidden"
                >
                  {/* Best Price Glow */}
                  {flight.isBestPrice && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00B894]/20 to-[#00D2FF]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  )}

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Airline */}
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                            flight.isBestPrice 
                              ? "bg-gradient-to-br from-[#00B894] to-[#00D2FF]" 
                              : "bg-gradient-to-br from-[#6C63FF] to-[#00D2FF]"
                          }`}
                        >
                          {flight.airline?.charAt(0) || "✈"}
                        </motion.div>
                        <div>
                          <div className="font-semibold text-gray-800">{flight.airline}</div>
                          <div className="text-xs text-gray-400">{flight.flightNumber}</div>
                          {flight.rating && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <StarIcon className="w-3 h-3 text-[#FDCB6E] fill-[#FDCB6E]" />
                              <span className="text-xs font-semibold text-gray-700">{flight.rating}</span>
                              <span className="text-xs text-gray-400">({flight.reviews})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Route */}
                      <div className="flex-1 flex items-center justify-center gap-3 md:gap-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-800">
                            {formatDate(flight.departureTime, "HH:mm")}
                          </div>
                          <div className="text-sm text-gray-500">{flight.origin}</div>
                        </div>

                        <div className="flex flex-col items-center flex-1 max-w-[100px] md:max-w-[150px]">
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>{getDurationText(flight.duration)}</span>
                            {flight.stops === 0 && (
                              <span className="text-[#00B894] text-xs font-bold">● مستقیم</span>
                            )}
                            {flight.stops === 1 && (
                              <span className="text-amber-500 text-xs font-bold">● ۱ توقف</span>
                            )}
                            {flight.stops >= 2 && (
                              <span className="text-rose-500 text-xs font-bold">● {flight.stops} توقف</span>
                            )}
                          </div>
                          <div className="w-full h-[2px] bg-gradient-to-r from-[#6C63FF] via-[#00D2FF] to-[#6C63FF] relative">
                            <motion.div 
                              className="absolute -top-1.5 left-1/2 transform -translate-x-1/2"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="w-3 h-3 bg-white border-2 border-[#6C63FF] rounded-full" />
                            </motion.div>
                          </div>
                          {flight.stopCities && (
                            <div className="text-[10px] text-gray-400 mt-1">
                              {flight.stopCities.join(" • ")}
                            </div>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-800">
                            {formatDate(flight.arrivalTime, "HH:mm")}
                          </div>
                          <div className="text-sm text-gray-500">{flight.destination}</div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center gap-4 min-w-[160px] justify-end">
                        <div className="text-right">
                          <motion.div 
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-2xl font-bold gradient-text"
                          >
                            {formatPrice(flight.priceInIRR || flight.price || 0)}
                          </motion.div>
                          <div className="flex flex-wrap items-center gap-1 justify-end mt-1">
                            {badge && (
                              <span className={`badge-new ${badge.color}`}>
                                {badge.icon}
                                {badge.text}
                              </span>
                            )}
                            {flight.amenities && (
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                {flight.amenities.slice(0, 2).join(" • ")}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="group"
                          onClick={() => router.push(`/compare-prices?flightId=${flight.id}`)}
                        >
                          مقایسه
                          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200/50"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">کلاس پرواز</div>
                              <div className="font-semibold">{flight.cabinClass}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">منبع</div>
                              <div className="font-semibold">{flight.source}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">مدت زمان</div>
                              <div className="font-semibold">{getDurationText(flight.duration)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">امکانات</div>
                              <div className="font-semibold flex flex-wrap gap-1">
                                {flight.amenities?.map((item: string) => (
                                  <span key={item} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== FOOTER ===== */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {filteredResults.length} پرواز یافت شد
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              قیمت‌ها به‌روزرسانی لحظه‌ای
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              {displayResults.length} منبع مختلف
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}