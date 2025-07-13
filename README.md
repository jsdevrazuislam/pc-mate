# PCMate - AI-Powered PC Builder

PCMate is an intelligent PC configuration tool that leverages AI to suggest optimal hardware components based on user requirements, with full multi-language support.

## Key Features

### AI-Powered Recommendations
- 🤖 Smart component suggestions using Google Gemini
- 💡 Build optimization for different use cases (gaming, productivity, etc.)
- ⚡ Real-time compatibility checking

### Multi-Language Support
- 🌐 Switch between multiple languages
- 📦 Comprehensive hardware terminology translations
- 🔄 Dynamic content switching

### Core Functionality
- 🛠️ Interactive PC building interface
- 💰 Budget-based component filtering
- 📊 Performance estimation
- 📱 Fully responsive design

## Technology Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **shadcn/ui** (Beautifully designed components)
- **Tailwind CSS** (Utility-first styling)
- **i18next** (Internationalization)
- **React Hook Form** (Form management)
- **Zod** (Schema validation)

### Backend
- **Next.js API Routes**
- **Google Gemini API** (AI recommendations)

### Development Tools
- **ESLint** + **Prettier** (Code quality)
- **Husky** (Git hooks)
- **GitHub Actions** (CI/CD)

## Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jsdevrazuislam/pc-mate.git
   cd pc-mate
2. **Install dependencies**:
   ```bash
    pnpm install
3. **Set up environment variables**:
   ```bash
    GEMINI_API_KEY=your_api_key_here
4. **Run the development server**:
   ```bash
    pnpm dev
# Project Structure
```bash
pc-mate/
├── app/
│   ├── (main)/               # Main application routes
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
│   ├── builder/              # PC Builder components
│   ├── ui/                   # shadcn components
│   └── language-switcher.tsx # Language selector
├── context/                  # React contexts
│   └── i18n-store.tsx        # i18n state
├── hooks/                    # Custom hooks
├── i18n/                     # Translation files
│   ├── en/
│   ├── bn/
├── lib/                      # Utility functions
│   ├── gemini.ts             # Gemini integration
├── types/                    # TypeScript types
├── public/                   # Static assets