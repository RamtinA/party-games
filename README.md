# Party Games

A fun collection of party games built with Next.js, TypeScript, and Tailwind CSS. This is a Progressive Web App (PWA) that works on both mobile and desktop devices.

## Features

- 🕵️ **AGENT-X Game**: A thrilling game where players must identify secret agents
- 🌍 **Multi-language Support**: English and Persian (Farsi)
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive design
- 🔄 **PWA Support**: Installable as a native app
- ⚡ **Fast & Modern**: Built with Next.js 15 and TypeScript

## Games

### AGENT-X
A social deduction game where:
- Players answer questions each round
- Secret agents must lie while others tell the truth
- Players try to identify who the agents are
- Points are awarded based on correct identification

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   ├── games/          # Game-specific components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # App header
│   └── Footer.tsx      # App footer
├── context/            # React Context for state management
│   ├── AppContext.tsx  # Global app state
│   └── GameContext.tsx # Game-specific state
├── data/               # Static data files
│   └── questions.json  # Game questions
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Main types
└── app/                # Next.js app directory
    ├── layout.tsx      # Root layout
    ├── page.tsx        # Main page component
    └── globals.css     # Global styles
```

## Adding New Games

The project is designed to be easily extensible. To add a new game:

1. Create a new component in `src/components/games/`
2. Add the game definition to the games array in `HomePage.tsx`
3. Add routing logic in `page.tsx`
4. Implement game-specific settings in the settings flow

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management
- **PWA** - Progressive Web App features
- **Framer Motion** - Animations (ready for use)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Developed by R