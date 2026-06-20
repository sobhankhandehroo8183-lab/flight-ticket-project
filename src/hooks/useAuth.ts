"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, setLoading, setError, logout, clearError } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      dispatch(setLoading(true));
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (credentials.email === "test@example.com" && credentials.password === "123456") {
          dispatch(setUser({
            user: { id: "1", email: credentials.email, name: "کاربر تست" },
            token: "mock-token-123456",
          }));
          toast.success("ورود با موفقیت انجام شد");
          return true;
        }
        throw new Error("اطلاعات ورود صحیح نیست");
      } catch (error: any) {
        const message = error.message || "خطا در ورود";
        dispatch(setError(message));
        toast.error(message);
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      dispatch(setLoading(true));
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setUser({
          user: { id: "1", email: data.email, name: data.name },
          token: "mock-token-" + Date.now(),
        }));
        toast.success("ثبت نام با موفقیت انجام شد");
        return true;
      } catch (error: any) {
        const message = error.message || "خطا در ثبت نام";
        dispatch(setError(message));
        toast.error(message);
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    toast.success("خروج با موفقیت انجام شد");
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...auth,
    login,
    register,
    logout: logoutUser,
    clearError: clearAuthError,
  };
};