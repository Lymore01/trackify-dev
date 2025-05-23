"use client";

import { Separator } from "@/components/ui/separator";
import { NavBar } from "../page";
import { useState } from "react";

const sections = [
  { id: "getting-started", title: "Getting Started" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "tracking-events", title: "Tracking Events" },
  { id: "api-reference", title: "API Reference" },
  { id: "faq", title: "FAQ" },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <NavBar />

      <main className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside className="w-[260px] border-r bg-gray-100 p-6 space-y-4 fixed top-16 left-0 bottom-0 overflow-y-auto">
          <h2 className="text-md mb-4">Get Started</h2>
          <nav className="flex flex-col gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm hover:text-blue-600 transition ${
                  activeSection === section.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-[260px] p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <h1 className="text-md text-indigo-600">Learn Trackify</h1>
          <h1 className="text-2xl mt-4 text-gray-900">Introduction</h1>
          <p className="mt-4 text-gray-600">
            Welcome to the trackify documentation!
          </p>
          <Separator className="mt-4" />
          <h1 className="text-2xl mt-4 text-gray-900">Why Trackify?</h1>
          <p className="mt-4 text-gray-600">
            Trackify allow you to build faster with our developer-friendly SDKs
            and APIs. Connect, manage, and track your apps and links—all in one
            secure, powerful platform.
          </p>
          <Separator className="mt-4" />

          <h1 className="text-2xl mt-4 text-gray-900">How To Use Trackify</h1>
          <p className="mt-4 text-gray-600">
            Welcome to the trackify documentation!
          </p>
          <Separator className="mt-4" />
        </div>
      </main>
    </div>
  );
}
