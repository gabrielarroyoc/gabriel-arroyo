"use client";

import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import LangSwitcher from "@/components/LangSwitcher";
import { useCallback, useEffect, useRef } from "react";

const LANGUAGE_SWAP_KEY = "portfolio-language-swap";

function readCssMs(element: HTMLElement, variable: string, fallback: number) {
  const raw = getComputedStyle(element).getPropertyValue(variable).trim();
  const value = Number.parseFloat(raw);

  if (!raw || Number.isNaN(value)) return fallback;

  return raw.endsWith("s") && !raw.endsWith("ms") ? value * 1000 : value;
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.5 8.5 8.5 3.5" />
      <path d="M4.5 3.5h4v4" />
    </svg>
  );
}

interface PortfolioClientProps {
  dict: Dictionary;
  lang: Locale;
}

export default function PortfolioClient({ dict, lang }: PortfolioClientProps) {
  const revealRef = useRef<HTMLElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const block = revealRef.current;
    if (!block) return;

    const hasLanguageSwap =
      window.sessionStorage.getItem(LANGUAGE_SWAP_KEY) === "true";

    if (hasLanguageSwap) {
      window.sessionStorage.removeItem(LANGUAGE_SWAP_KEY);
    }

    block.classList.remove("is-hiding");

    if (hasLanguageSwap) {
      block.classList.remove("is-initial-entry");
      block.setAttribute("data-lang-transition", "enter");
      block.classList.add("is-shown");

      const timeout = window.setTimeout(() => {
        block.removeAttribute("data-lang-transition");
      }, readCssMs(block, "--lang-swap-dur", 150));

      hasMountedRef.current = true;

      return () => window.clearTimeout(timeout);
    }

    if (hasMountedRef.current) {
      block.removeAttribute("data-lang-transition");
      block.classList.remove("is-initial-entry");
      block.classList.add("is-shown");
      return;
    }

    block.classList.remove("is-shown");
    block.classList.add("is-initial-entry");
    void block.offsetHeight;

    const frame = requestAnimationFrame(() => {
      block.classList.add("is-shown");
    });

    hasMountedRef.current = true;

    return () => cancelAnimationFrame(frame);
  }, [lang]);

  const handleBeforeLanguageSwitch = useCallback(
    async (next: Locale) => {
      if (next === lang) return;

      const block = revealRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      if (!block) return;

      window.sessionStorage.setItem(LANGUAGE_SWAP_KEY, "true");
      block.classList.remove("is-initial-entry");
      block.setAttribute("data-lang-transition", "exit");

      await new Promise<void>((resolve) => {
        window.setTimeout(
          resolve,
          readCssMs(block, "--lang-swap-dur", 150),
        );
      });
    },
    [lang],
  );

  return (
    <main
      ref={revealRef}
      data-animation-controller="true"
      className="t-stagger t-lang-swap mx-auto min-h-screen w-full max-w-xl px-6 py-16 sm:py-24"
    >
      <div data-animate="" className="t-stagger-line t-stagger-line--1">
        <header className="mb-16 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              {dict.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {dict.brand}
            </p>
          </div>
          <LangSwitcher
            current={lang}
            onBeforeSwitch={handleBeforeLanguageSwitch}
          />
        </header>
      </div>

      <div data-animate="" className="t-stagger-line t-stagger-line--2">
        <section className="mb-16 space-y-4">
          <p className="text-sm text-muted-foreground">{dict.role}</p>
          {dict.bio.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      <div data-animate="" className="t-stagger-line t-stagger-line--3">
        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium text-foreground">
            {dict.sections.projects}
          </h2>
          <ul className="-mx-3">
            {dict.projects.map((project) => {
              const status =
                "status" in project && project.status
                  ? project.status
                  : null;
              const content = (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="inline-flex items-baseline gap-1 text-[15px] font-medium text-foreground">
                      {project.title}
                      {project.url ? (
                        <ExternalLinkIcon className="relative top-px size-3 shrink-0 translate-x-[-2px] translate-y-[2px] text-foreground opacity-0 transition-all duration-150 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      ) : null}
                    </span>
                    {status ? (
                      <span className="text-sm text-muted-foreground">
                        {status}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </>
              );

              return (
                <li key={project.title}>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-muted"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="rounded-lg px-3 py-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div data-animate="" className="t-stagger-line t-stagger-line--4">
        <section className="mb-16">
          <h2 className="mb-6 text-sm font-medium text-foreground">
            {dict.sections.stack}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {dict.stack.join(" · ")}
          </p>
        </section>
      </div>

      <div data-animate="" className="t-stagger-line t-stagger-line--5">
        <section>
          <h2 className="mb-6 text-sm font-medium text-foreground">
            {dict.sections.connect}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
            <li>
              <a href={`mailto:${dict.connect.email}`} className="text-link">
                {dict.connect.emailLabel}
              </a>
            </li>
            <li>
              <a
                href={dict.connect.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {dict.connect.githubLabel}
              </a>
            </li>
            <li>
              <a
                href={dict.connect.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {dict.connect.linkedinLabel}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
