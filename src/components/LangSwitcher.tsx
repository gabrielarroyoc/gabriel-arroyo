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
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {(["pt", "en"] as Locale[]).map((lang, index) => (
        <span key={lang} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => switchTo(lang)}
            aria-current={current === lang ? "true" : undefined}
            className={`uppercase transition-colors ${
              current === lang
                ? "text-foreground"
                : "hover:text-foreground"
            }`}
          >
            {lang}
          </button>
        </span>
      ))}
    </div>
  );
}
