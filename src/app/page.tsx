"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchParams } from "@/redux/slices/flightSearchSlice";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  UserIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { 
  FireIcon,
  TrophyIcon,
  StarIcon,
  RocketLaunchIcon,
  HeartIcon,
  HomeIcon
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    cabinClass: "economy" as const,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.origin || !formData.destination || !formData.departureDate) {
      toast.error("لطفاً تمام فیلدهای اجباری را پر کنید");
      return;
    }

    if (formData.origin === formData.destination) {
      toast.error("مبدا و مقصد نمی‌توانند یکسان باشند");
      return;
    }

    setIsLoading(true);
    dispatch(setSearchParams(formData));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/flight-results");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const popularDestinations = [
    { name: "استانبول", code: "IST", flag: "🇹🇷", price: "۱۲.۵M", color: "from-amber-500 to-orange-500" },
    { name: "دبی", code: "DXB", flag: "🇦🇪", price: "۱۸.۵M", color: "from-yellow-400 to-amber-500" },
    { name: "لندن", code: "LHR", flag: "🇬🇧", price: "۳۲M", color: "from-blue-400 to-indigo-500" },
    { name: "پاریس", code: "CDG", flag: "🇫🇷", price: "۲۸M", color: "from-pink-400 to-rose-500" },
    { name: "بانکوک", code: "BKK", flag: "🇹🇭", price: "۲۲M", color: "from-red-400 to-pink-500" },
    { name: "کوالالامپور", code: "KUL", flag: "🇲🇾", price: "۱۹M", color: "from-blue-500 to-cyan-500" },
  ];

  const displayedDestinations = showAllDestinations ? popularDestinations : popularDestinations.slice(0, 4);

  const stats = [
    { number: "۵۰۰+", label: "مسیر پروازی" },
    { number: "۱۰۰۰+", label: "کاربر راضی" },
    { number: "۹۸%", label: "رضایت کاربران" },
    { number: "۲۴/۷", label: "پشتیبانی" },
  ];

  const features = [
    { icon: <GlobeAltIcon className="w-6 h-6" />, title: "مقایسه لحظه‌ای", desc: "قیمت‌ها از ۵+ منبع معتبر", color: "from-purple-500 to-blue-500" },
    { icon: <ShieldCheckIcon className="w-6 h-6" />, title: "ضمانت بهترین قیمت", desc: "در صورت گران‌تر بودن، تفاوت را برمی‌گردانیم", color: "from-emerald-500 to-teal-500" },
    { icon: <ClockIcon className="w-6 h-6" />, title: "پشتیبانی ۲۴/۷", desc: "همیشه در کنار شما هستیم", color: "from-amber-500 to-orange-500" },
    { icon: <SparklesIcon className="w-6 h-6" />, title: "پرداخت آسان", desc: "با کلیه کارت‌های بانکی", color: "from-pink-500 to-rose-500" },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-hero">
      
      {/* ===== OVERLAY ===== */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-none" />

      {/* ===== HEADER / MENU ===== */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"
      >
        {/* Logo - Left */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <PaperAirplaneIcon className="w-8 h-8 text-white rotate-45" />
          <span className="text-white font-bold text-xl hidden sm:block">FlyCompare</span>
        </motion.div>

        {/* Menu - Right (like Deevid.ai) */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-white/80">
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              href="/"
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
            >
              <HomeIcon className="w-4 h-4" />
              خانه
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              href="/flight-results"
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              جستجو
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/20"
            >
              ورود / ثبت‌نام
            </motion.button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 md:hidden"
            >
              <div className="flex flex-col gap-3">
                <a href="/" className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all">خانه</a>
                <a href="/flight-results" className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all">جستجو</a>
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/20">
                  ورود / ثبت‌نام
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 md:py-8">
        
        {/* ===== HERO SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
          >
            <span className="gradient-text">پروازهای خارجی</span>
            <br />
            <span className="text-white">با بهترین قیمت</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto"
          >
            قیمت‌ها را از <span className="text-purple-300 font-bold">trip.com</span> و{" "}
            <span className="text-emerald-300 font-bold">سایت‌های داخلی</span> مقایسه کن
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            {[
              { icon: ShieldCheckIcon, label: "ضمانت بهترین قیمت", color: "text-emerald-300" },
              { icon: ClockIcon, label: "مقایسه لحظه‌ای", color: "text-purple-300" },
              { icon: CheckBadgeIcon, label: "۱۰۰۰+ مسیر", color: "text-blue-300" },
              { icon: RocketLaunchIcon, label: "پرداخت امن", color: "text-amber-300" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 text-xs"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-white/80">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ===== SEARCH FORM + IMAGE (ساید به ساید) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* ===== LEFT - SEARCH FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/15 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Origin & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <PaperAirplaneIcon className="w-4 h-4 text-purple-300 inline ml-1" />
                    مبدا
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="تهران (IKA)"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <GlobeAltIcon className="w-4 h-4 text-blue-300 inline ml-1" />
                    مقصد
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="استانبول (IST)"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <CalendarIcon className="w-4 h-4 text-rose-300 inline ml-1" />
                    تاریخ رفت
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <ArrowPathIcon className="w-4 h-4 text-amber-300 inline ml-1" />
                    تاریخ برگشت (اختیاری)
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Passengers & Cabin */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <UserIcon className="w-4 h-4 text-indigo-300 inline ml-1" />
                    بزرگسالان
                  </label>
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleInputChange}
                    min="1"
                    max="9"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <UserIcon className="w-4 h-4 text-pink-300 inline ml-1" />
                    کودکان
                  </label>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleInputChange}
                    min="0"
                    max="9"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-1.5">
                    <SparklesIcon className="w-4 h-4 text-amber-300 inline ml-1" />
                    کلاس
                  </label>
                  <select
                    name="cabinClass"
                    value={formData.cabinClass}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all duration-300"
                  >
                    <option value="economy" className="text-gray-800">اکونومی</option>
                    <option value="premium" className="text-gray-800">پریمیوم</option>
                    <option value="business" className="text-gray-800">بیزینس</option>
                    <option value="first" className="text-gray-800">فرست</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    در حال جستجو...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="w-6 h-6" />
                    جستجوی پرواز
                  </>
                )}
              </motion.button>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ===== RIGHT - IMAGE / DECORATION ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center h-full min-h-[400px] relative"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-8xl mb-4"
                >
                  ✈️
                </motion.div>
                <h3 className="text-white font-bold text-2xl mb-2">سفر خود را برنامه‌ریزی کن</h3>
                <p className="text-white/60 text-sm">بهترین قیمت‌ها را در کمترین زمان پیدا کن</p>
                
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۵۰۰+</div>
                    <div className="text-white/40 text-xs">مسیر</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۱۰۰۰+</div>
                    <div className="text-white/40 text-xs">کاربر</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۹۸%</div>
                    <div className="text-white/40 text-xs">رضایت</div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== POPULAR DESTINATIONS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white/90 flex items-center gap-2">
              <FireIcon className="w-5 h-5 text-rose-400 animate-pulse" />
              مقاصد محبوب
            </h3>
            <button
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="text-xs text-white/60 hover:text-white font-medium transition-colors flex items-center gap-1"
            >
              {showAllDestinations ? "مشاهده کمتر" : "مشاهده همه"}
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showAllDestinations ? "rotate-180" : ""}`} />
            </button>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {displayedDestinations.map((dest, i) => (
                <motion.div
                  key={dest.code}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className={`bg-gradient-to-br ${dest.color} rounded-xl p-4 text-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                  onClick={() => setFormData(prev => ({ ...prev, destination: `${dest.name} (${dest.code})` }))}
                >
                  <div className="text-3xl mb-1">{dest.flag}</div>
                  <div className="font-bold text-sm">{dest.name}</div>
                  <div className="text-xs opacity-80">{dest.code}</div>
                  <div className="text-sm font-bold mt-1 bg-white/20 rounded-full px-2 py-0.5 inline-block">
                    {dest.price}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* ===== FEATURES ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
                {feature.icon}
              </div>
              <h4 className="font-bold text-sm text-center">{feature.title}</h4>
              <p className="text-xs text-white/80 text-center mt-0.5">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== FOOTER ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-white/40 mt-6 pt-4 border-t border-white/10"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span>🔹 مقایسه بین trip.com، علی‌بابا، فلای‌تودی</span>
            <span>🔹 قیمت‌ها به‌روزرسانی لحظه‌ای</span>
            <span>🔹 بیش از ۵۰۰۰ کاربر راضی</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}