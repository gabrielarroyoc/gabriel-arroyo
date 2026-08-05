"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

interface LangSwitcherProps {
  current: Locale;
  onBeforeSwitch?: (next: Locale) => Promise<void> | void;
}

export default function LangSwitcher({
  current,
  onBeforeSwitch,
}: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSwitching, setIsSwitching] = useState(false);

  async function switchTo(next: Locale) {
    if (next === current || isSwitching) return;

    setIsSwitching(true);

    try {
      await onBeforeSwitch?.(next);

      const segments = pathname.split("/");
      segments[1] = next;
      router.push(segments.join("/") || "/");
    } finally {
      setIsSwitching(false);
    }
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
            disabled={isSwitching || current === lang}
            className={`uppercase transition-colors ${
              current === lang
                ? "text-foreground"
                : "hover:text-foreground disabled:text-muted-foreground"
            }`}
          >
            {lang}
          </button>
        </span>
      ))}
    </div>
  );
}
