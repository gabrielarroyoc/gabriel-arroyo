"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { AnimatedIconHandle } from "@/components/ui/types";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

import AccessibilityIcon from "@/components/ui/accessibility-icon";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import BrandNextjsIcon from "@/components/ui/brand-nextjs-icon";
import BrandReactIcon from "@/components/ui/brand-react-icon";
import CodeXmlIcon from "@/components/ui/code-xml-icon";
import CpuIcon from "@/components/ui/cpu-icon";
import FigmaIcon from "@/components/ui/figma-icon";
import GithubIcon from "@/components/ui/github-icon";
import GmailIcon from "@/components/ui/gmail-icon";
import LinkedinIcon from "@/components/ui/linkedin-icon";
import TypescriptIcon from "@/components/ui/typescript-icon";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import LangSwitcher from "@/components/LangSwitcher";

// ─── Animation Variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// ─── Stack icon map ──────────────────────────────────────────────────────────

const stackIcons = [
  { key: "React", icon: BrandReactIcon, tone: "bg-cyan-pop" },
  { key: "Next.js", icon: BrandNextjsIcon, tone: "bg-ink text-paper" },
  { key: "TypeScript", icon: TypescriptIcon, tone: "bg-blue-pop" },
  { key: "Figma", icon: FigmaIcon, tone: "bg-pink-pop" },
  { key: "accessibility", icon: AccessibilityIcon, tone: "bg-green-pop" },
  { key: "Performance", icon: CpuIcon, tone: "bg-yellow-pop" },
];

// ─── Scroll Section Wrapper ──────────────────────────────────────────────────

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stack Card ──────────────────────────────────────────────────────────────

function StackCard({
  name,
  icon: Icon,
  tone,
  desc,
  delay,
}: {
  name: string;
  icon: (typeof stackIcons)[number]["icon"];
  tone: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      onHoverStart={() => iconRef.current?.startAnimation()}
      onHoverEnd={() => iconRef.current?.stopAnimation()}
      className="cursor-pointer"
    >
      <Card className="block w-full overflow-hidden bg-paper shadow-brutal transition-shadow duration-200 hover:shadow-none">
        <div
          className={`flex items-center justify-between border-b-2 border-ink p-4 ${tone}`}
        >
          <p className="font-head text-xl font-black">{name}</p>
          <Icon ref={iconRef} size={34} />
        </div>
        <Card.Content>
          <p className="font-semibold leading-7 text-ink/76">{desc}</p>
        </Card.Content>
      </Card>
    </motion.div>
  );
}

// ─── Main Client Component ───────────────────────────────────────────────────

export default function PortfolioClient({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const valorRef = useRef(null);
  const processRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const valorInView = useInView(valorRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const projectsInView = useInView(projectsRef, {
    once: true,
    margin: "-80px",
  });
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  // Build stack items with localized names and descriptions
  const stackItems = stackIcons.map((s) => {
    const name =
      s.key === "accessibility" ? dict.stack.accessibility_label : s.key;
    const desc = dict.stack.card_desc.replace("{name}", name);
    return { ...s, name, desc };
  });

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* ── Nav ── */}
      <motion.header
        className="sticky top-0 z-30 border-b-2 border-ink bg-paper/95 backdrop-blur"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#topo"
            className="font-head text-xl font-black uppercase tracking-normal"
          >
            {dict.nav.logo}
          </a>
          <div className="hidden items-center gap-2 text-sm font-bold md:flex">
            <a className="nav-link" href="#valor">
              {dict.nav.valor}
            </a>
            <a className="nav-link" href="#stack">
              {dict.nav.stack}
            </a>
            <a className="nav-link" href="#projetos">
              {dict.nav.projetos}
            </a>
            <a className="nav-link" href="#contato">
              {dict.nav.contato}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher current={lang} />
            <Button
              render={<a href="#contato" />}
              className="hidden h-10 px-4 text-sm sm:inline-flex"
            >
              {dict.nav.contratar}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* ── Hero ── */}
      <section
        id="topo"
        className="relative border-b-2 border-ink bg-[linear-gradient(90deg,rgba(17,17,17,.08)_1px,transparent_1px),linear-gradient(rgba(17,17,17,.08)_1px,transparent_1px)] bg-[size:28px_28px]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-20">
          {/* Left column */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.15)}
          >
            <motion.div
              className="mb-5 flex flex-wrap items-center gap-3"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="surface" className="border-2 border-ink">
                {dict.hero.badge1}
              </Badge>
              <Badge variant="outline" className="bg-paper">
                {dict.hero.badge2}
              </Badge>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Text
                as="h1"
                className="max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl"
              >
                {dict.hero.h1}
              </Text>
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-ink/78 sm:text-xl"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {dict.hero.sub}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                size="lg"
                render={<a href="#contato" />}
                className="group min-h-14 justify-between gap-3"
              >
                {dict.hero.cta_primary}
                <ArrowNarrowRightIcon
                  size={24}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                render={<a href="#projetos" />}
                className="min-h-14"
              >
                {dict.hero.cta_secondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — cockpit card */}
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12, 0.5)}
          >
            {/* Cockpit card — must come first in DOM so stagger animates it before the tag */}
            <motion.div
              className="border-2 border-ink bg-paper shadow-brutal"
              variants={scaleIn}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b-2 border-ink bg-pink-pop px-4 py-3">
                <span className="font-head text-sm font-black uppercase">
                  {dict.hero.cockpit_title}
                </span>
                <div className="flex gap-2">
                  <span className="size-3 rounded-full border-2 border-ink bg-red-pop" />
                  <span className="size-3 rounded-full border-2 border-ink bg-yellow-pop" />
                  <span className="size-3 rounded-full border-2 border-ink bg-green-pop" />
                </div>
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <motion.div
                  className="border-2 border-ink bg-cyan-pop p-4 shadow-brutal-sm"
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                >
                  <CodeXmlIcon size={34} />
                  <p className="mt-4 font-head text-3xl font-black">
                    {dict.hero.cockpit_ui_title}
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {dict.hero.cockpit_ui_desc}
                  </p>
                </motion.div>

                <motion.div
                  className="border-2 border-ink bg-green-pop p-4 shadow-brutal-sm"
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                >
                  <AccessibilityIcon size={34} />
                  <p className="mt-4 font-head text-3xl font-black">
                    {dict.hero.cockpit_a11y_title}
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {dict.hero.cockpit_a11y_desc}
                  </p>
                </motion.div>

                <motion.div
                  className="border-2 border-ink bg-yellow-pop p-4 shadow-brutal-sm sm:col-span-2"
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-head text-2xl font-black">
                        {dict.hero.cockpit_ship_title}
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        {dict.hero.cockpit_ship_desc}
                      </p>
                    </div>
                    <CpuIcon size={42} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating tag — after card in DOM so z-index stacks it on top naturally */}
            <motion.div
              className="absolute -right-6 top-6 z-10 hidden lg:block"
              variants={scaleIn}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="rotate-6 border-2 border-ink bg-yellow-pop px-4 py-2 font-head text-sm font-black uppercase shadow-brutal"
                animate={{ y: [0, -6, 0], rotate: [6, 8, 6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {dict.hero.floating_tag}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Valor ── */}
      <section id="valor" className="border-b-2 border-ink bg-cyan-pop">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <ScrollReveal>
            <Text as="h2" className="text-4xl sm:text-5xl">
              {dict.valor.h2}
            </Text>
            <p className="mt-4 text-base font-semibold leading-7">
              {dict.valor.sub}
            </p>
          </ScrollReveal>

          <motion.div
            ref={valorRef}
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            animate={valorInView ? "visible" : "hidden"}
            variants={staggerContainer(0.1, 0.1)}
          >
            {dict.valor.strengths.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="block w-full bg-paper p-5">
                  <p className="text-base font-bold leading-7">{item}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section id="stack" className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="solid">{dict.stack.badge}</Badge>
                <Text as="h2" className="mt-4 text-4xl sm:text-5xl">
                  {dict.stack.h2}
                </Text>
              </div>
              <p className="max-w-xl text-base font-semibold leading-7 text-ink/75">
                {dict.stack.sub}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map((item, i) => (
              <StackCard
                key={item.key}
                name={item.name}
                icon={item.icon}
                tone={item.tone}
                desc={item.desc}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Projetos ── */}
      <section id="projetos" className="border-b-2 border-ink bg-green-pop">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Badge variant="outline" className="bg-paper">
                {dict.projetos.badge}
              </Badge>
              <Text as="h2" className="mt-4 text-4xl sm:text-5xl">
                {dict.projetos.h2}
              </Text>
            </div>
          </ScrollReveal>

          <motion.div
            ref={projectsRef}
            className="mt-8 grid gap-5 lg:grid-cols-3"
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            variants={staggerContainer(0.12, 0.1)}
          >
            {dict.projetos.items.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
              >
                <Card className="block w-full bg-paper">
                  <Card.Header>
                    <Card.Title className="text-2xl font-black">
                      {project.title}
                    </Card.Title>
                    <Card.Description className="text-base font-semibold leading-7 text-ink/74">
                      {project.description}
                    </Card.Description>
                  </Card.Header>
                  <Card.Content className="flex flex-wrap gap-2 pt-0">
                    {project.tags.map((tag) => (
                      <Badge key={tag} size="sm" variant="surface">
                        {tag}
                      </Badge>
                    ))}
                  </Card.Content>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-b-2 border-ink bg-paper">
        <motion.div
          ref={processRef}
          className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8"
          initial="hidden"
          animate={processInView ? "visible" : "hidden"}
          variants={staggerContainer(0.14, 0)}
        >
          {dict.processo.items.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
              className="border-2 border-ink bg-background p-5 shadow-brutal-sm"
            >
              <span className="font-head text-5xl font-black text-red-pop text-stroke">
                {item.step}
              </span>
              <Text as="h3" className="mt-3 text-2xl font-black">
                {item.title}
              </Text>
              <p className="mt-3 font-semibold leading-7 text-ink/75">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="bg-ink text-paper">
        <motion.div
          ref={contactRef}
          className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:px-8"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={staggerContainer(0.15, 0)}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="bg-yellow-pop text-ink">{dict.contato.badge}</Badge>
            <Text as="h2" className="mt-5 max-w-3xl text-4xl sm:text-6xl">
              {dict.contato.h2}
            </Text>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-paper/78">
              {dict.contato.sub}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            <Card className="block w-full bg-paper text-ink">
              <Card.Header>
                <Card.Title className="text-3xl font-black">
                  {dict.contato.card_title}
                </Card.Title>
                <Card.Description className="font-semibold leading-7 text-ink/74">
                  {dict.contato.card_desc}
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-3 pt-0">
                <a className="contact-link" href="mailto:contato@arroyo.dev">
                  <GmailIcon size={24} />
                  contato@arroyo.dev
                </a>
                <a
                  className="contact-link"
                  href="#"
                  aria-label={dict.contato.github_label}
                >
                  <GithubIcon size={24} />
                  GitHub
                </a>
                <a
                  className="contact-link"
                  href="#"
                  aria-label={dict.contato.linkedin_label}
                >
                  <LinkedinIcon size={24} />
                  LinkedIn
                </a>
              </Card.Content>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
