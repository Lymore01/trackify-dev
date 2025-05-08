import RegistrationForm from "@/components/forms/register-form";

export default function Register() {
  return (
    <div className="w-[100%] lg:w-[60%] mx-auto flex flex-col items-center mt-8 lg:mt-0">
      <h1 className="text-2xl text-zinc-700">Create an Account!</h1>
      <div className="mt-8 w-full">
        <RegistrationForm />
      </div>
    </div>
  );
}
