import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | Morgan ERP",
  description: "Sign in to your Morgan ERP account",
};

export default function LoginPage() {
  return <LoginForm />;
}
