import Image from "next/image";
import Link from "next/link";

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row max-w-full max-h-screen overflow-auto relative">
      <main className="flex-1 px-4 py-16 lg:px-8 lg:py-16 flex justify-center lg:justify-start items-center relative">
        <div className="absolute top-4 left-4">
          <Link
            href={"/"}
            className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
          >
            <svg
              width="24"
              height="auto"
              viewBox="0 0 36 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-slate-50"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
                fill="#0004E8"
              ></path>
            </svg>
          </Link>
        </div>

        {children}
      </main>
      <aside className="hidden lg:flex lg:flex-col h-screen lg:w-[50%] bg-black relative">
        <Image
          src="/images/aside.jpg"
          alt="aside image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </aside>
      <div className="absolute bottom-4 left-4">
        <p className="text-xs text-gray-500">
          copyright @ 2025-trackify. All rights recerved
        </p>
      </div>
    </div>
  );
}
