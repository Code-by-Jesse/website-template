# Website Template

Een Next.js website template met Payload CMS, gebouwd op een block-based component architectuur.

## Tech Stack

- **Next.js 15** — React framework met App Router en Turbopack
- **Payload CMS 3** — Headless CMS met admin panel op `/admin`
- **SQLite** — Standaard database voor lokale ontwikkeling
- **SCSS** — Styling met Sass
- **GSAP + Lenis** — Animaties en smooth scrolling

## Aan de slag

### 1. Installeer dependencies

```bash
npm install
```

### 2. Maak een `.env` bestand

Kopieer het voorbeeldbestand:

```bash
cp .env.example .env
```

Dit bevat de volgende variabelen:

| Variabele              | Standaard                    | Omschrijving                          |
| ---------------------- | ---------------------------- | ------------------------------------- |
| `DATABASE_URL`         | `file:./data/payload.db`     | Database connectie-URL                |
| `PAYLOAD_SECRET`       | `dev-secret-change-in-production` | Secret voor encryptie in Payload |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000`      | Publieke URL van de site              |

### 3. Start de dev server

```bash
npm run dev
```

De site draait op [http://localhost:3000](http://localhost:3000) en het CMS op [http://localhost:3000/admin](http://localhost:3000/admin).

Bij de eerste keer opstarten maakt Payload automatisch de SQLite database aan in de `data/` map en vraagt het je om een admin-account te maken.

## Database

### Standaard: SQLite (lokaal)

Standaard gebruikt het project een lokale SQLite database. Dit bestand wordt opgeslagen als `data/payload.db`. Dit is ideaal voor ontwikkeling omdat:

- Er geen externe database nodig is
- De database direct beschikbaar is na `npm run dev`
- Je de database kunt resetten door het `data/payload.db` bestand te verwijderen

### Productie: PostgreSQL (bijv. Neon)

Voor productie wordt een PostgreSQL database aanbevolen. Om over te stappen:

#### 1. Installeer de Postgres adapter

Verwijder de SQLite adapter en installeer de Postgres adapter:

```bash
npm uninstall @payloadcms/db-sqlite
npm install @payloadcms/db-postgres
```

#### 2. Pas `payload.config.ts` aan

Vervang de SQLite adapter door de Postgres adapter:

```ts
// Verwijder:
import { sqliteAdapter } from '@payloadcms/db-sqlite'

// Voeg toe:
import { postgresAdapter } from '@payloadcms/db-postgres'
```

En verander de `db` configuratie:

```ts
// Verwijder:
db: sqliteAdapter({
  client: {
    url: process.env.DATABASE_URL || 'file:./data/payload.db',
  },
}),

// Voeg toe:
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
  },
}),
```

#### 3. Stel de `DATABASE_URL` in

Stel je PostgreSQL connectie-URL in als environment variabele:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

Bij deployment op Vercel kun je een database koppelen via de [Vercel Marketplace](https://vercel.com/marketplace) (bijv. Neon of Supabase). De `DATABASE_URL` wordt dan automatisch als environment variabele ingesteld.

## Scripts

| Script                | Omschrijving                        |
| --------------------- | ----------------------------------- |
| `npm run dev`         | Start de dev server met Turbopack   |
| `npm run build`       | Bouw de applicatie voor productie   |
| `npm run start`       | Start de productie server           |
| `npm run lint`        | Draai ESLint                        |
| `npm run generate:types` | Genereer Payload TypeScript types |

## Projectstructuur

```
src/
├── app/          # Next.js App Router pagina's en layouts
├── blocks/       # Payload CMS content blocks
├── collections/  # Payload CMS collecties (Pages, Projects, Blog, etc.)
├── components/   # React componenten (inclusief admin UI)
├── fields/       # Herbruikbare Payload veld configuraties
├── globals/      # Payload globals (Header, Footer, Site Settings)
├── lib/          # Utilities en helpers
└── styles/       # Globale SCSS styles
```
