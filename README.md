# Codeverta.com

Codeverta is a developer-centric platform featuring advanced code utilities, AI-powered tools, and a technical blog. Built with the bleeding-edge **Next.js 15** and **React 19** stack, it integrates client-side machine learning and automated content generation.

## 🚀 Key Features

### AI & ML Integration

- **GenAI:** Powered by `@google/genai` for content assistance.
- **On-Device ML:** Uses `onnxruntime-web` for client-side inference.
- **Image Processing:** Browser-based background removal (`@imgly/background-removal`) and compression.

### Developer Utilities

- **PDF Tools:** Manipulation and rendering via `pdf-lib` and `pdfjs-dist`.
- **Generators:** QR Code generation and file converters.

### Advanced Content System

- **Automation:** Python-based auto-content generation (`autocontent.py`).
- **MDX Engine:** Robust blog system using `next-mdx-remote` with syntax highlighting and GFM support.
- **SEO:** Automated sitemap generation and internal link processing.
- **Multilingual (i18n):** Full localization support using `next-i18next`.

### Modern UI/UX

- Built with **Radix UI** primitives, **Framer Motion** animations, and **Tailwind CSS**.

---

## 🛠️ Tech Stack

**Core Framework**

- Next.js 15 (App Router & Turbopack)
- React 19
- TypeScript

**Backend & Database**

- **Database:** MySQL with Prisma ORM
- **Auth/Services:** Firebase
- **API Clients:** Axios, Google GenAI SDK

**UI & Styling**

- Tailwind CSS
- Radix UI (Headless components)
- Framer Motion (Animations)
- Lucide React (Icons)
- Sonner (Toast notifications)

**Scripts & Automation**

- Python (Content generation)
- Node.js (Markdown enhancement)
- Husky (Git hooks)

---

## 📂 Project Structure

| Directory       | Description                                                   |
| :-------------- | :------------------------------------------------------------ |
| `/@/components` | Core UI components (Shadcn/Radix implementation).             |
| `/blog`         | Markdown/MDX files for blog articles.                         |
| `/components`   | Global shared React components.                               |
| `/erp`          | Vue.js based dashboard sub-project.                           |
| `/lib`          | Library code, API wrappers, and Prisma client.                |
| `/pages`        | Next.js routes (Legacy/Pages router support).                 |
| `/scripts`      | Automation scripts (`autocontent.py`, `enhance-markdown.js`). |
| `/public`       | Static assets.                                                |
| `/utils`        | Helper functions.                                             |

---

## ⚡ Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm
- Python 3.x (with venv for content scripts)
- MySQL Database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/RobyCigar/codeverta.git](https://github.com/RobyCigar/codeverta.git)
    cd codeverta
    ```

2.  **Install Node dependencies:**

    ```bash
    pnpm install
    ```

3.  **Setup Python Environment (for content scripts):**

    ```bash
    cd scripts
    python -m venv venv
    source venv/bin/activate # or venv\Scripts\activate on Windows
    pip install -r ../requirements.txt
    cd ..
    ```

4.  **Environment Setup:**

    ```bash
    cp .env.example .env.local
    # Configure Database URL, Firebase keys, and Google GenAI keys in .env.local
    ```

5.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

### Available Scripts

- `pnpm dev`: Start Next.js with Turbopack.
- `pnpm build:vue`: Build the ERP dashboard (Vue.js) and copy to public.
- `pnpm generate-content`: Run the Python auto-content generator.
- `pnpm enhance-markdown`: Process and format MDX files.
- `pnpm postbuild`: Generate sitemap.
