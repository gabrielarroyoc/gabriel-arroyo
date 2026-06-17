# ARROYO.DEV ▮

> **Portfolio de front-end com personalidade.**
> Interfaces que parecem boas, carregam rápido e vendem o valor do produto.

---

```
┌─────────────────────────────────────────────┐
│  Next.js 16  ·  React 19  ·  TypeScript 5   │
│  Tailwind 4  ·  Framer Motion  ·  i18n      │
└─────────────────────────────────────────────┘
```

---

## ▶ RODAR O PROJETO

```bash
pnpm dev
```

Abra **http://localhost:3000** — o proxy detecta o idioma do browser e redireciona automaticamente.

| Rota | Idioma |
|---|---|
| `/pt` | 🇧🇷 Português |
| `/en` | 🇺🇸 English |

---

## ▮ STACK

```
REACT         → componentes e estado
NEXT.JS 16    → app router, server components, proxy.ts
TYPESCRIPT    → tipagem em tudo
TAILWIND 4    → design system com tokens custom
FRAMER MOTION → animações de entrada e hover
```

---

## ▮ ESTRUTURA

```
src/
├── app/
│   └── [lang]/
│       ├── layout.tsx        ← html lang dinâmico + metadata
│       ├── page.tsx          ← server component (carrega dict)
│       └── dictionaries.ts   ← loader server-only
├── components/
│   ├── PortfolioClient.tsx   ← toda a UI + animações
│   ├── LangSwitcher.tsx      ← botão PT | EN
│   ├── retroui/              ← Badge, Button, Card, Text
│   └── ui/                   ← ícones animados
├── dictionaries/
│   ├── pt.json               ← strings em português
│   └── en.json               ← strings em inglês
└── proxy.ts                  ← auto-redirect por Accept-Language
```

---

## ▮ I18N

A internacionalização é **100% nativa** — sem bibliotecas externas.

- `proxy.ts` lê o header `Accept-Language` e redireciona `/` → `/pt` ou `/en`
- Dicionários são JSON simples carregados em Server Components
- O `LangSwitcher` troca o idioma mantendo a rota

---

## ▮ ANIMAÇÕES

Todas feitas com **Framer Motion** (`motion/react`):

- **Hero** — stagger em cascata nos elementos de entrada
- **Scroll** — `useInView` com `once: true` em cada seção
- **Stack cards** — hover dispara `startAnimation()` nos ícones via `ref`
- **Tag flutuante** — loop infinito `y: [0, -6, 0]`
- **Nav** — slide-down ao montar

---

## ▮ DESIGN

Estilo **neobrutalist**:

```
border: 2px solid #111
shadow: 8px 8px 0 #111     ← shadow-brutal
colors: cyan · yellow · pink · green · red · blue (pop palette)
font:   Arial Black / Impact (headings)
        Inter (body)
```

---

## ▶ BUILD

```bash
pnpm build
pnpm start
```

---

**arroyo.dev** — feito com critério.
