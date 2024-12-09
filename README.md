# sb1-pqzeyz

This project is a drama management system that includes various components for handling drama data, mapping, and statistics. It provides interfaces and components for managing drama sources, mapping tables, migration statistics, and more. The project is structured with TypeScript interfaces and React components to ensure type safety and modularity.

## Setup

1. Install dependencies:
```
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
```
REACT_APP_API_URL=<your_api_url>
REACT_APP_API_KEY=<your_api_key>
```

3. Start the development server:
```
npm start
```

## Folder Structure

```
.
├── app
│   └── migration
│       └── dramas
│           └── bugaboo-inter
│               └── [id]
│                   └── page.tsx
├── components
│   ├── data-table
│   │   └── data-table-pagination.tsx
│   ├── drama-mapping
│   │   └── mapping-table.tsx
│   ├── layout
│   │   └── section-stats.tsx
│   ├── migration
│   │   ├── data-quality-card.tsx
│   │   ├── migration-stats.tsx
│   │   ├── migration-table.tsx
│   │   └── summary-card.tsx
│   ├── stats
│   │   └── stats-card.tsx
│   └── ui
│       ├── badge.tsx
│       ├── calendar.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── pagination.tsx
│       └── sonner.tsx
├── hooks
│   └── use-toast.ts
├── lib
│   ├── mock-data.ts
│   ├── stats.ts
│   └── types
│       ├── data-table.ts
│       ├── drama-mapping.ts
│       └── index.ts
```

- **Drama Mapping**: Interfaces and components for mapping drama sources and targets.
- **Migration Stats**: Components to display migration statistics and handle processed and failed items.
- **UI Components**: Includes reusable UI components like badges, calendars, carousels, charts, and pagination.
- **Data Types**: TypeScript interfaces for data structures such as shows, actors, dramas, and data tables.

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/bugek/sb1-pqzeyz)
