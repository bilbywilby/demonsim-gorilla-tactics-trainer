# Cloudflare Full-Stack Boilerplate

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bilbywilby/demonsim-gorilla-tactics-trainer)

A production-ready full-stack boilerplate powered by Cloudflare Workers and Pages. Features a modern React 18 frontend with TypeScript, shadcn/ui components, Tailwind CSS, and a Hono-based API backend. Perfect for building scalable web apps with zero-config deployment to Cloudflare's global edge network.

## Features

- **Full-Stack Ready**: React frontend + Hono API backend in a single deployment
- **Modern UI**: shadcn/ui with Tailwind CSS, dark mode, and responsive design
- **TypeScript Everywhere**: End-to-end type safety including Workers bindings
- **Developer Experience**: Vite hot reload, TanStack Query, React Router, and error boundaries
- **Cloudflare Native**: Workers for API, Pages for static assets, automatic SPA handling
- **Performance Optimized**: Code splitting, lazy loading, and edge deployment
- **Extensible**: Easy to add routes, pages, and components following best practices
- **Production Features**: CORS, logging, health checks, client error reporting

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide Icons, TanStack Query, React Router, Framer Motion, Sonner |
| **Backend** | Hono, Cloudflare Workers, TypeScript |
| **UI/UX** | Radix UI Primitives, Headless UI, clsx, Tailwind Merge |
| **State/Data** | Zustand, React Hook Form, Zod |
| **Dev Tools** | ESLint, Bun, wrangler |
| **Other** | Immer, UUID, Date-fns |

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

2. **Development Server**
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`). Frontend HMR and backend hot reload enabled.

3. **Build for Production**
   ```bash
   bun build
   ```

## Development

### Project Structure
```
├── src/              # React frontend (Vite + TypeScript)
│   ├── components/   # Reusable UI components + shadcn/ui
│   ├── pages/        # Route-based pages
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utilities and helpers
├── worker/           # Hono API routes (Cloudflare Workers)
│   ├── index.ts      # Core app (DO NOT EDIT)
│   ├── userRoutes.ts # Add custom API routes here
│   └── core-utils.ts # Type definitions (DO NOT EDIT)
├── tailwind.config.js # Design system customization
└── wrangler.jsonc    # Cloudflare deployment config
```

### Adding Frontend Pages
- Create new pages in `src/pages/`
- Add routes in `src/main.tsx`
- Use `AppLayout` for sidebar layouts (optional)

### Adding API Routes
- Edit `worker/userRoutes.ts` only
- Example:
  ```ts
  app.get('/api/users', (c) => c.json({ users: [] }));
  app.post('/api/users', async (c) => {
    const body = await c.req.json();
    // Handle logic
    return c.json({ success: true });
  });
  ```

### Type Generation
```bash
bun cf-typegen  # Generate Worker types
```

### Linting
```bash
bun lint
```

## Deployment

Deploy to Cloudflare Pages/Workers with one command:

```bash
bun deploy
```

This builds the app and runs `wrangler deploy`. Your app will be live on `*.workers.dev` or a custom Pages domain.

### Manual Deployment Steps
1. Install Wrangler: `bun add -g wrangler`
2. Login: `wrangler login`
3. Configure: Edit `wrangler.jsonc` (name, bindings, etc.)
4. Deploy: `wrangler deploy`

For custom domains or advanced config, see [Cloudflare Workers docs](https://developers.cloudflare.com/workers/).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bilbywilby/demonsim-gorilla-tactics-trainer)

## Customization

- **Theme/UI**: Edit `tailwind.config.js` and `src/index.css`
- **Sidebar**: Modify `src/components/app-sidebar.tsx`
- **Components**: Add shadcn/ui via `npx shadcn-ui@latest add <component>`
- **Env Vars**: Add to `wrangler.jsonc` under `vars`

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server (frontend + backend) |
| `bun build` | Build for production |
| `bun preview` | Local preview of production build |
| `bun lint` | Run ESLint |
| `bun deploy` | Build + deploy to Cloudflare |
| `bun cf-typegen` | Generate Worker types |

## Contributing

1. Fork the repo
2. Create a feature branch (`bun dev`)
3. Commit changes (`git commit -m 'feat: ...'`)
4. Push and open a PR

## License

MIT License - see [LICENSE](LICENSE) for details.

---

⭐ Built with [Cloudflare Workers](https://workers.cloudflare.com) • [React](https://react.dev) • [shadcn/ui](https://ui.shadcn.com)