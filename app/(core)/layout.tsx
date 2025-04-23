import Image from "next/image";

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row max-w-full max-h-screen overflow-auto relative">
      <main className="flex-1 px-4 py-16 lg:px-8 lg:py-16 flex justify-start items-center">
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
    </div>
  );
}
