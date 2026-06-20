export const formatPrice = (price: number, currency?: string) => {
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: currency || "IRR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string | Date, mode?: string) => {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "نامشخص";
  }

  if (mode === "HH:mm") {
    return d.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (mode === "YYYY/MM/DD") {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return d.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDuration = (minutes: number | string) => {
  const mins = typeof minutes === "string" ? parseInt(minutes) : minutes;
  if (isNaN(mins)) return "—";
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (hours === 0) return `${remainingMins} دقیقه`;
  return `${hours} ساعت و ${remainingMins} دقیقه`;
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("fa-IR").format(num);
};