export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^09[0-9]{9}$/;
  return re.test(phone);
};

export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "رمز عبور باید حداقل یک حرف بزرگ داشته باشد" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "رمز عبور باید حداقل یک حرف کوچک داشته باشد" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "رمز عبور باید حداقل یک عدد داشته باشد" };
  }
  return { valid: true, message: "رمز عبور معتبر است" };
};

export const validateDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const validateFlightSearch = (data: {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
}) => {
  const errors: Record<string, string> = {};

  if (!data.origin || data.origin.trim().length < 2) {
    errors.origin = "مبدا باید حداقل ۲ کاراکتر باشد";
  }

  if (!data.destination || data.destination.trim().length < 2) {
    errors.destination = "مقصد باید حداقل ۲ کاراکتر باشد";
  }

  if (data.origin === data.destination) {
    errors.destination = "مبدا و مقصد نمی‌توانند یکسان باشند";
  }

  if (!data.departureDate) {
    errors.departureDate = "تاریخ رفت الزامی است";
  }

  if (data.adults < 1) {
    errors.adults = "حداقل یک بزرگسال باید انتخاب شود";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}; 
