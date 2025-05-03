# **ProsprAI**

<div align="center">
  <img src="https://github.com/UniverseVG/prospr-ai/blob/main/public/logo.png" alt="ProsprAI Logo" />
  <p><strong>AI-Powered Career Management Platform</strong></p>
</div>

# **🚀 Overview**

ProsprAI is a comprehensive career management platform powered by AI. It helps job seekers optimize their career journey with personalized guidance, interview preparation, industry insights, and smart resume creation.

Live Demo: https://prospr-ai.vercel.app

# **✨ Features**

### **🧠 AI-Powered Career Guidance**

Get personalized career advice and insights powered by advanced AI technology.

### **💼 Interview Preparation**

Practice with role-specific questions and get instant feedback to improve your performance.

### **📈 Industry Insights**

Stay ahead with real-time industry trends, salary data, and market analysis.

### **📝 Smart Resume Creation**

Generate ATS-optimized resumes with AI assistance.

# **🛠️ Tech Stack**

- **Frontend & Backend**: [Next.js 15](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: [Gemini AI](https://ai.google.dev/) for CV generation, interview prep, resume building
- **Database**: [Neon DB](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Scheduled Tasks**: Ingest for periodic industry insights generation

# **📂 Project Structure**

```bash
prospr-ai/
├── .next/ # Next.js build output
├── .vscode/ # VS Code configuration
├── actions/ # Server actions
├── app/ # Application routes and pages
├── components/ # UI components
├── data/ # Data files and constants
├── hooks/ # Custom React hooks
├── lib/ # Utility libraries
├── node_modules/ # Dependencies
├── prisma/ # Prisma schema & migrations
├── public/ # Static assets
├── types/ # TypeScript type definitions
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── components.json # Shadcn UI components config
├── eslint.config.mjs # ESLint configuration
├── middleware.ts # Next.js middleware
├── next-env.d.ts # Next.js TypeScript declarations
├── next.config.ts # Next.js configuration
├── package-lock.json # Dependency lock file
├── package.json # Project dependencies and scripts
├── postcss.config.mjs # PostCSS configuration
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration
```

# **📋 Implementation Details**

### **AI-Powered Features**

- **Resume Builder**: Uses Gemini AI to generate optimized content for experience descriptions and certifications
- **CV Generator**: AI-assisted creation of professional CVs tailored to specific industries
- **Interview Assignment Generator**: Creates practice scenarios and questions based on job descriptions
- **Industry Insights**: Scheduled weekly updates using Ingest to provide fresh market data

### **Authentication & User Management**

ProsprAI uses Clerk for secure authentication and user management, supporting multiple sign-in methods and profile management.

### **Database Structure**

Prisma ORM interfaces with Neon DB to manage:

- User profiles
- Resume data
- Industry insights
- Interview practice sessions

# **🚀 Getting Started**

### **Prerequisites**

- Node.js 18.x or higher
- npm or yarn
- Gemini AI API credentials
- Clerk account and API keys
- Neon DB instance

### **Installation**

1. Clone the repository

```bash
git clone https://github.com/UniverseVG/prospr-ai.git
cd prospr-ai
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your API keys and configuration settings.

Example .env configuration:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
GEMINI_API_KEY=
```

4. Set up the database

```bash
npx prisma migrate dev
```

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

# **🔄 Scheduled Tasks**

The industry insights generation runs every 7 days via Ingest, fetching the latest market data using Gemini AI.

To set up the scheduled task:

```bash
npx ingest setup
```

To know more about the ingest setup in Next.js, refer the below docs.
https://www.inngest.com/docs/getting-started/nextjs-quick-start?ref=docs-home

# **🤝 Contributing**

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/UniverseVG/prospr-ai/issues).

# **📧 Contact**

Project Link: [https://github.com/UniverseVG/prospr-ai](https://github.com/UniverseVG/prospr-ai)

---

<div align="center">
  <p>Built with ❤️ using Next.js and Gemini AI</p>
</div>
