"use client";

import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import LangSwitcher from "@/components/LangSwitcher";

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
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-6 py-16 sm:py-24">
      <header className="mb-16 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {dict.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            {dict.brand}
          </p>
        </div>
        <LangSwitcher current={lang} />
      </header>

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

      <section className="mb-16">
        <h2 className="mb-6 text-sm font-medium text-foreground">
          {dict.sections.projects}
        </h2>
        <ul className="-mx-3">
          {dict.projects.map((project) => {
            const status =
              "status" in project && project.status ? project.status : null;
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

      <section className="mb-16">
        <h2 className="mb-6 text-sm font-medium text-foreground">
          {dict.sections.stack}
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {dict.stack.join(" · ")}
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-sm font-medium text-foreground">
          {dict.sections.connect}
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
          <li>
            <a
              href={`mailto:${dict.connect.email}`}
              className="text-link"
            >
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
    </main>
  );
}
