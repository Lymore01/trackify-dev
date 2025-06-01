import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="w-[100%] lg:w-[60%] mx-auto flex flex-col items-center mt-8 lg:mt-0">
      <h1 className="text-2xl text-zinc-700 dark:text-foreground">Welcome Back!</h1>

      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
