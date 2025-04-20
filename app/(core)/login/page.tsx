import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="w-[60%] mx-auto flex flex-col items-center">
      <h1 className="text-2xl text-zinc-700">Welcome Back!</h1>

      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
