"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

interface LangSwitcherProps {
  current: Locale;
}

export default function LangSwitcher({ current }: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    // Replace /pt or /en prefix in pathname
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center gap-0.5 border-2 border-ink text-sm font-bold overflow-hidden shadow-brutal-sm">
      {(["pt", "en"] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          aria-current={current === lang ? "true" : undefined}
          className={`px-2.5 py-1 uppercase transition-colors duration-150 cursor-pointer ${
            current === lang
              ? "bg-ink text-paper"
              : "bg-paper text-ink hover:bg-yellow-pop"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
