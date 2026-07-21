"use client";

import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import LangSwitcher from "@/components/LangSwitcher";

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
        <ul className="space-y-8">
          {dict.projects.map((project) => (
            <li key={project.title}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-[15px] font-medium"
                >
                  {project.title}
                </a>
              ) : (
                <span className="text-[15px] font-medium text-foreground">
                  {project.title}
                </span>
              )}
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </li>
          ))}
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
