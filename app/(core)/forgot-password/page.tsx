import ForgotPasswordForm from "@/components/forms/forgot-pass-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="w-[60%] mx-auto flex flex-col items-center">
      <Link
        href={"/login"}
        className="w-full flex justify-start items-center gap-2"
      >
        <ArrowLeft
          size={16}
          className="hover:scale-150 transition-transform duration-200 ease-in-out"
        />
        <span className="text-sm hover:underline">Back to Login</span>
      </Link>

      <div className="space-y-2 mt-8">
        <h1 className="text-2xl text-zinc-700">Forgot Your Password?</h1>
        <p className="text-sm text-gray-500">
          Enter your email you signed up with and wait for your recovery data to
          be sent.
        </p>
      </div>

      <div className="mt-8 w-full">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
