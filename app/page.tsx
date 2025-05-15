import { Logo } from "@/components/custom-sidebar";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  File,
  Heart,
  Menu,
  Plus,
  ShoppingBag,
  Webhook,
} from "lucide-react";
import Image from "next/image";

const STATS: CardProps[] = [
  {
    stat: "10K",
    value: "Apps Managed",
  },
  {
    stat: "2.5M",
    value: "API req / month",
  },
  {
    stat: "100",
    value: "SDK downloads",
  },
];

const TESTIMONIALS = [
  {
    name: "Jane Doe",
    image: "/images/aside.jpg",
    text: "Trackify made it so easy to monitor my shop links and see what’s working. The analytics are a game changer!",
  },
  {
    name: "Samuel Lee",
    image: "/images/aside.jpg",
    text: "Integration was seamless. As a developer, I love the SDK and API flexibility. Highly recommended!",
  },
  {
    name: "Amina Yusuf",
    image: "/images/aside.jpg",
    text: "I use Trackify for all my marketing campaigns. The insights helped me double my conversion rate.",
  },
  {
    name: "Carlos Rivera",
    image: "/images/aside.jpg",
    text: "Shortening and sharing docs with Trackify is so smooth. My team always knows what’s most useful.",
  },
  
];

// min-h-[220px]
const Testimonials = () => (
  <div className="grid lg:grid-cols-4 lg:grid-rows-3 grid-cols-1 gap-4 w-full max-w-6xl mx-auto mt-8">
    {TESTIMONIALS.map((t, i) => (
      <div
        key={i}
        className={`rounded-lg p-6 flex flex-col items-start bg-white border relative`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={t.image}
            alt={t.name}
            width={100}
            height={100}
            className="size-12 rounded-full object-cover border-2 border-indigo-200"
          />
          <span className="font-semibold text-slate-900">{t.name}</span>
        </div>
        <p className="text-slate-700 text-base text-start">{t.text}</p>
      </div>
    ))}
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col relative bg-white">
      <div className="flex flex-col">
        <NavBar />
        <main className="grid px-4 py-2 grid-cols-1 lg:grid-cols-2 grid-rows-1 items-start w-full z-20 bg-white mt-8 ">
          <HeroSection />
          {/* screenshot */}
          <div className="mt-8 bg-[#222527] w-full h-[300px] lg:h-[400px] items-end justify-end flex text-white rounded-tl-lg">
            <div className="flex relative w-[90%] h-[90%]">
              <Image
                src="/images/Screenshot-dark.png"
                alt="dashboard image"
                layout="fill"
                objectFit="cover"
                objectPosition="top left"
                className="rounded-tl-lg"
              />
            </div>
          </div>
        </main>
        {/* stats */}
        <div className="text-center z-20 bg-white px-4 py-8">
          <div className="grid grid-cols-3 mt-8 gap-2 bg-white">
            {STATS.map(({ stat, value }, idx) => (
              <StatsCard stat={stat} value={value} key={idx} />
            ))}
          </div>
        </div>

        {/* use cases */}
        <div className="bg-white z-20 py-24 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-3xl text-slate-900">Use Cases</h1>
          <p className="text-md text-slate-600">
            There are millions of ways to agitate a problem and drive action.
            Here are <br className="hidden lg:block" /> examples of 3 products:
          </p>
          <UseCases />
        </div>

        {/* testimonials */}
        <div className="bg-white z-20 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-3xl text-slate-900">What our users are saying</h1>
          <Testimonials />
        </div>

        {/* CTA */}
        <div className="h-[50vh] bg-white z-20 rounded-b-4xl px-4 py-8 grid place-content-center w-full">
          <div className="grid place-content-center px-8 py-6 rounded-2xl text-slate-900 text-center space-y-4">
            <h1 className="text-3xl text-slate-900">Add Value To Your site</h1>
            <p className="text-md text-slate-600">
              all in one secure, powerful platform.
            </p>

            <div className="w-full flex items-center justify-center">
              <CTA />
            </div>
          </div>
        </div>
        <div className="h-[60vh] "></div>
      </div>
      {/* footer */}
      <div className="fixed bottom-0 w-full z-10 mt-8">
        <Footer />
      </div>
    </div>
  );
}

const NavBar = () => {
  return (
    <header className="flex w-full items-center justify-between py-2 px-4">
      <Logo />
      <div className="flex gap-2">
        <div className="hidden lg:flex gap-2 items-center">
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
        {/* mobile */}
        <div className="size-10 shrink-0 grid place-content-center bg-indigo-600 rounded-full cursor-pointer text-white lg:hidden">
          <Menu />
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <div className="text-wrap w-3/4 space-y-4">
      <Tag className="mx-0">With SDK available! 😊</Tag>
      <h1 className="text-5xl text-slate-900 leading-14">
        Track, Connect, and Power Your Apps with Ease.
      </h1>
      <p className="text-md text-slate-600">
        Build faster with our developer-friendly SDKs and APIs. Connect, manage,
        and track your apps and links—all in one secure, powerful platform.
      </p>
      <CTA />
    </div>
  );
};

interface CardProps {
  stat: string;
  value: string;
}

const StatsCard = ({ stat, value }: CardProps) => {
  return (
    <div className="grid place-content-center p-2 rounded-md bg-gray-100 text-slate-900">
      <div className="space-y-1">
        <p className="text-lg font-semibold flex items-center">
          {stat} <Plus className="text-indigo-600 font-bold" size={16} />
        </p>
        <span className="text-sm text-slate-600">{value}</span>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flex bg-[#222527] h-[80vh] w-full">
      <div className="w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-2 mt-[30vh]">
        <div className="flex flex-col justify-between items-start pb-4 text-sm text-zinc-300">
          <div className="space-y-4">
            <Logo />
            <h1 className="">Track, Connect, and Power Your Apps with Ease.</h1>
            <div className="p-2 rounded-md bg-black text-white inline-flex items-center">
              Built with <Heart className="fill-red-800 mx-2" size={12} /> by
              Lymore
            </div>
          </div>
          {/*copyright  */}
          <div>
            <p className="text-zinc-400">
              @Trackify 2025 - All rights reserved.
            </p>
          </div>
        </div>
        {/* legal */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-4 text-sm text-zinc-300 flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-zinc-400">Legal</h1>
              <ul className="mt-3 space-y-1">
                <li>Terms of services</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h1 className="text-zinc-400">Links</h1>
              <ul className="mt-3 space-y-1">
                <li>Login</li>
                <li>Docs</li>
              </ul>
            </div>
          </div>
          {/* socials */}
          <div className="space-y-4 text-sm text-zinc-300 flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-zinc-400">Social</h1>
              <ul className="mt-3 space-y-1">
                <li>Instagram</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CTA = () => {
  return (
    <div className="flex gap-2">
      <Button className="bg-black capitalize cursor-pointer flex py-4 rounded-full">
        Join for free
        {/* <ArrowRight size={16} className="ml-2" /> */}
      </Button>
      <Button
        className="cursor-pointer capitalize rounded-full"
        variant={"outline"}
      >
        View docs
      </Button>
    </div>
  );
};

const UseCases = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 w-full max-w-6xl mx-auto h-auto mt-8">
      {/* Ecommerce */}
      <div className="col-span-2 row-span-2 rounded-2xl bg-[#222527] p-6 space-y-4 text-white flex flex-col items-start relative overflow-hidden min-h-[260px]">
        <ShoppingBag className="text-white z-10" size={48} />
        <h1 className="text-xl font-semibold z-10">Ecommerce Sites</h1>
        <p className="text-start z-10">
          Integrate with your online store to track product links, user
          engagement, and shop analytics in real-time.
        </p>
        <Image
          src="/images/ecommerce.png"
          alt="Ecommerce"
          width={120}
          height={120}
          className="absolute right-2 bottom-2 w-[180px] h-auto opacity-80 pointer-events-none drop-shadow-lg"
        />
      </div>
      {/* Developer APIs */}
      <div className="col-span-2 rounded-2xl bg-[#222527] space-y-4 p-6 text-white flex flex-col items-start relative overflow-hidden min-h-[180px]">
        <Webhook size={40} className="z-10" />
        <h1 className="text-lg font-semibold mt-2 z-10">Developer APIs</h1>
        <p className="z-10 text-start">
          Easily embed link tracking and analytics into your apps using our
          robust SDKs and APIs.
        </p>
        <Image
          src="/images/ecommerce.png"
          alt="API Integration"
          width={80}
          height={80}
          className="absolute right-2 bottom-2 w-[70px] h-auto opacity-80 pointer-events-none"
        />
      </div>

      {/* Documentation Sharing */}
      <div className="col-span-2 rounded-2xl bg-[#222527] border p-6 space-y-4 text-white flex flex-col items-start relative overflow-hidden min-h-[180px]">
        <File size={40} className="z-10" />
        <h1 className="text-lg font-semibold mt-2 z-10">
          Documentation Sharing
        </h1>
        <p className="z-10 text-start">
          Share docs and resources with short links, and see which guides are
          most helpful to your users.
        </p>
        <Image
          src="/images/ecommerce.png"
          alt="Docs"
          width={80}
          height={80}
          className="absolute right-2 bottom-2 w-[70px] h-auto opacity-80 pointer-events-none"
        />
      </div>
    </div>
  );
};

// use cases
// how it works
// pricing
