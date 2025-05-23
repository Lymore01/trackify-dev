import ChangePassForm from "@/components/forms/change-password";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function Login() {
  return (
    <div className="w-[100%] lg:w-[60%] mx-auto flex flex-col items-center mt-8 lg:mt-0">
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

      <div className="space-y-2 mt-8 ">
        <h1 className="text-2xl text-zinc-700">Change password</h1>
        <p className="text-sm text-gray-500">
          create a new and secure password
        </p>
      </div>

      <div className="mt-8 w-full">
        <ChangePassForm />
      </div>
    </div>
  );
}
