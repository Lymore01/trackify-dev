"use client";

import CodeDisplay from "@/components/code-display";
import { Logo } from "@/components/custom-sidebar";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TESTIMONIALS, STATS, howItWorksSection } from "@/lib/constants";
import {
  ChartArea,
  File,
  Heart,
  Instagram,
  Linkedin,
  Map,
  Menu,
  MessageCircleHeart,
  MessageSquareWarning,
  Minus,
  Plus,
  ShoppingBag,
  Twitter,
  Webhook,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col relative bg-background">
      <div className="flex flex-col">
        <NavBar />
        <main className="grid px-4 py-2 grid-cols-1 lg:grid-cols-2 grid-rows-1 items-start w-full z-20 bg-background mt-20">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <HeroSection />
          </motion.div>

          <motion.div
            className="mt-8 relative w-full h-[300px] lg:h-[400px] items-end justify-end flex text-white rounded-tl-lg overflow-hidden"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* Glowing effect */}
            <div
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-indigo-400/40 blur-3xl opacity-80 z-0"
              aria-hidden="true"
            />
            <div className="flex relative w-[90%] h-[90%] z-10">
              <Image
                src="/images/Screenshot-dark.png"
                alt="dashboard image"
                layout="fill"
                objectFit="cover"
                objectPosition="top left"
                className="rounded-tl-lg"
              />
            </div>
          </motion.div>
        </main>
        {/* stats */}
        <div className="text-center z-20 bg-background px-4 py-8">
          <div className="grid grid-cols-3 mt-8 gap-2 bg-background">
            {STATS.map(({ stat, value }, idx) => (
              <StatsCard stat={stat} value={value} key={idx} />
            ))}
          </div>
        </div>

        {/* how it works */}
        <div className="bg-background z-20 py-24 px-4 text-center">
          <Tag variant={"info"}>
            <Map /> Steps
          </Tag>

          <h1 className="text-3xl text-slate-900 dark:text-foreground">
            How It Works
          </h1>
          <p className="text-md text-slate-600 mt-2 dark:text-muted-foreground">
            From adding your first link to catching live events via webhooks{" "}
            <br className="hidden lg:block" />
            see how easy it is to bring your app to life ✨
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <HowItWorksSection2 />
          </div>
        </div>

        {/* use cases */}
        <div className="bg-[#1B1B1B] dark:bg-accent z-20 py-24 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-3xl text-white">Use Cases</h1>
          <p className="text-md text-slate-200 mt-4">
            See Trackify in action—3 use cases that deliver impact.
          </p>
          <UseCases />
        </div>

        {/* testimonials */}
        <div className="bg-background z-20 flex items-center justify-center flex-col text-center px-4 py-24">
          <Tag variant={"info"}>
            <MessageCircleHeart /> Testimonials
          </Tag>
          <h1 className="text-3xl text-slate-900 dark:text-foreground">
            What our users are saying
          </h1>
          <p className="text-md text-slate-600 mt-4 dark:text-muted-foreground">
            Trackify is the go-to tool for link shortening and tracking
          </p>
          <Testimonials />
        </div>

        {/* CTA */}
        <div className="bg-background z-20 rounded-b-4xl px-4 py-24 grid place-content-center w-full">
          <div
            className={`grid place-content-center px-12 py-8 lg:px-36 lg:py-16 rounded-2xl text-slate-900 text-center space-y-4 bg-background border border-l-indigo-500 border-r-emerald-500 border-t-rose-500 border-b-yellow-500 mx-auto`}
          >
            <h1 className="text-3xl text-slate-900 dark:text-foreground">
              Shorten. Track. Grow.
            </h1>
            <p className="text-md text-slate-600 dark:text-muted-foreground">
              Smart links that power your business.
            </p>

            <div className="w-full flex items-center justify-center">
              <CTA />
            </div>
          </div>
        </div>
        <div className="h-[60vh]"></div>
      </div>
      {/* footer */}
      <div className="fixed bottom-0 w-full z-10 mt-8">
        <Footer />
      </div>
    </div>
  );
}

const HowItWorksSection2 = () => {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div className="w-ull lg:w-[90%] lg:mx-auto bg-background min-h-[500px] grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-full w-full lg:p-6">
        {howItWorksSection.map((item, i) => {
          const isOpen = selected === i;

          return (
            <motion.div
              key={i}
              initial={{ borderRadius: 8 }}
              className="mb-4 overflow-hidden rounded-lg bg-gray-50 dark:bg-accent shadow-sm transition-transform text-start"
            >
              <div
                onClick={() => setSelected(isOpen ? null : i)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors group"
              >
                <div className="flex gap-4 items-center">
                  <div className="size-10 shrink-0 grid place-content-center bg-black dark:group-hover:bg-black dark:group-hover:text-white dark:bg-white dark:text-black rounded-full text-white font-semibold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-lg font-medium text-slate-800 dark:text-foreground dark:group-hover:text-slate-800">
                    {item.title}
                  </p>
                </div>
                {isOpen ? (
                  <Minus className="text-slate-600 dark:text-foreground dark:group-hover:text-slate-600" />
                ) : (
                  <Plus className="text-slate-600 dark:text-foreground dark:group-hover:text-slate-600" />
                )}
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    className="p-4 text-slate-600 dark:text-muted-foreground text-base text-start"
                  >
                    {item.content}

                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md flex lg:hidden mt-4">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={`Step ${selected} image`}
                          layout="fill"
                          objectFit="top left"
                          className="rounded-lg"
                        />
                      ) : (
                        <CodeDisplay
                          codeString={"npm i @trackify-sdk"}
                        ></CodeDisplay>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {/* image */}
      {howItWorksSection[selected ?? 0].image ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md hidden lg:flex mt-6">
          <Image
            src={
              howItWorksSection[selected ?? 0].image ?? "/images/default.png"
            }
            alt={`Step ${selected} image`}
            layout="fill"
            objectFit="top left"
            className="rounded-lg"
          />
        </div>
      ) : (
        <div className="hidden lg:block">
          <CodeDisplay codeString="npm i @trackify-sdk" />
        </div>
      )}
    </div>
  );
};

const HowItWorksSection = ({
  step,
  text,
  image,
}: {
  step: number;
  text: string;
  image?: string;
}) => {
  return (
    <motion.div
      className="flex flex-col gap-6 w-full border p-2 rounded-lg"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Step Description */}
      <div className="flex gap-4 text-start items-center">
        <div className="size-10 shrink-0 grid place-content-center bg-black rounded-full text-white font-semibold text-sm">
          {step}
        </div>
        <p className="text-lg text-slate-800">{text}</p>
      </div>

      {/* Image or Code */}
      <motion.div
        className="w-full"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        {image ? (
          <div className="relative w-full h-[200px] lg:h-[300px] rounded-lg overflow-hidden shadow-md">
            <Image
              src={image}
              alt={`Step ${step} image`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <CodeDisplay codeString="npm i @trackify-sdk" />
        )}
      </motion.div>
    </motion.div>
  );
};

const borderColors = [
  "border-l-indigo-500",
  "border-l-emerald-500",
  "border-l-rose-500",
  "border-l-yellow-500",
];

const Testimonials = () => (
  <div className="grid lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-6 w-full max-w-6xl mx-auto mt-8 px-4">
    {TESTIMONIALS.map((t, i) => (
      <div
        key={i}
        className={`rounded-lg p-6 flex gap-4 bg-background border-l-4 shadow-sm ${
          borderColors[i % borderColors.length]
        }`}
      >
        <Image
          src={t.image}
          alt={t.name}
          width={48}
          height={48}
          className="rounded-full object-cover size-12 border-2 border-indigo-200"
        />

        {/* Content */}
        <div className="flex flex-col text-start">
          <div className="mb-1">
            <p className="text-slate-900 font-semibold text-base leading-tight dark:text-foreground">
              {t.name}
            </p>
            {t.company && (
              <p className="text-slate-500 text-sm dark:text-muted-foreground">
                {t.company}
              </p>
            )}
          </div>
          <p className="text-slate-700 text-base mt-2 italic dark:text-foreground">
            "{t.text}"
          </p>
        </div>
      </div>
    ))}
  </div>
);

export const NavBar = () => {
  const [open, setIsOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsOpen((pv: any) => !pv);
  };
  const router = useRouter();
  return (
    <header
      className="fixed top-0 flex w-full items-center justify-between py-2 px-4 z-30
        bg-white/60 dark:bg-background/60
        backdrop-blur-lg
        border-b border-white/20 dark:border-white/10
        shadow-sm"
    >
      <Logo />
      <div className="flex gap-2">
        <ModeToggle />
        <div className="hidden lg:flex gap-2 items-center">
          <Button
            className="w-full cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        </div>
        {/* mobile */}
        <div
          className="size-10 shrink-0 grid place-content-center bg-black rounded-full cursor-pointer text-white lg:hidden transition-transform duration-700"
          onClick={handleMenuOpen}
        >
          {open ? <X /> : <Menu />}
        </div>
      </div>
      <AnimatePresence>{open && <MobileMenu />}</AnimatePresence>
    </header>
  );
};

const MobileMenu = () => {
  const router = useRouter();
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full z-30 fixed top-14 left-0 h-auto px-2 block lg:hidden"
    >
      <div className="flex h-full w-full bg-background rounded-b-2xl shadow-lg px-2 py-4 flex-col justify-between">
        <ul className="space-y-4 text-lg">
          <li>Products</li>
          <Separator />
          <li>Docs</li>
          <Separator />
          <li>Pricing</li>
          <Separator />
          <li>Company</li>
          <Separator />
        </ul>
        {/* CTA */}
        <div className="mt-4 justify-between flex items-center">
          <Button
            className="w-full cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <motion.div
      className="relative text-wrap w-3/4 space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Glowing effect */}
      {/* <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[400px] h-[220px] rounded-full bg-indigo-400/40 blur-3xl opacity-80 z-0"
        aria-hidden="true"
      /> */}
      <motion.div variants={fadeInUp}>
        <Tag className="mx-0">SDK coming soon! 🎉</Tag>
      </motion.div>

      <motion.h1
        className="text-5xl text-slate-900 dark:text-foreground leading-14"
        variants={fadeInUp}
      >
        Track, Connect, and Power Your Apps with Ease.
      </motion.h1>

      <motion.p
        className="text-md text-slate-600 dark:text-muted-foreground"
        variants={fadeInUp}
      >
        Build faster with our developer-friendly SDKs and APIs. Connect, manage,
        and track your apps and links—all in one secure, powerful platform.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <CTA />
      </motion.div>
    </motion.div>
  );
};

export interface CardProps {
  stat: string;
  value: string;
}

const StatsCard = ({ stat, value }: CardProps) => {
  return (
    <div className="grid place-content-center p-2 rounded-md bg-gray-100 text-slate-900 dark:bg-accent dark:text-accent-foreground">
      <div className="space-y-1">
        <p className="text-lg font-semibold flex items-center">
          {stat}{" "}
          <Plus
            className="text-indigo-600 font-bold dark:text-indigo-800"
            size={16}
          />
        </p>
        <span className="text-sm text-slate-600 dark:text-muted-foreground">
          {value}
        </span>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flex bg-[#222527] dark:bg-accent h-[80vh] w-full">
      <div className="w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-2 mt-[30vh] relative">
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
          <div className="absolute bottom-4">
            <p className="text-zinc-400">
              @Trackify 2025 - All rights reserved.
            </p>
          </div>
        </div>
        {/* legal */}
        <div className="grid lg:grid-cols-2 gap-4 mb-12">
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
              <ul className="mt-3 flex gap-4 lg:flex-col">
                <Instagram size={16} />
                <Linkedin size={16} />
                <Twitter size={16} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CTA = () => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        className="bg-black capitalize cursor-pointer flex py-4 rounded-full dark:text-white dark:hover:bg-gray-50 dark:hover:text-black"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Join for free
      </Button>
      <Button
        className="cursor-pointer capitalize rounded-full dark:text-foreground"
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
      <div className="col-span-2 row-span-2 rounded-2xl bg-[#222527] dark:bg-background p-6 space-y-4 text-white flex flex-col items-start relative overflow-hidden min-h-[260px]">
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
          className="absolute right-2 bottom-2 w-[70px] lg:w-[180px] h-auto opacity-80 pointer-events-none drop-shadow-lg hidden"
        />
      </div>
      {/* Developer APIs */}
      <div className="col-span-2 rounded-2xl bg-[#222527] dark:bg-background space-y-4 p-6 text-white flex flex-col items-start relative overflow-hidden min-h-[180px]">
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
          className="absolute right-2 bottom-2 w-[70px] h-auto opacity-80 pointer-events-none hidden"
        />
      </div>

      {/* Documentation Sharing */}
      <div className="col-span-2 rounded-2xl bg-[#222527] dark:bg-background p-6 space-y-4 text-white flex flex-col items-start relative overflow-hidden min-h-[180px]">
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
          className="absolute right-2 bottom-2 w-[70px] h-auto opacity-80 pointer-events-none hidden"
        />
      </div>
    </div>
  );
};

// use cases
// how it works
// pricing
