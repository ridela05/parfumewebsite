# Beast — Parfume Landing (Vite + React)

Landing page for the perfume brand "Beast" built with Vite + React (JavaScript).

Features:
- Sections: Hero, Why, Product List (Contentful), CTA (WhatsApp prefill), Social Proof, Footer
- Uses AIDA copywriting principles
- Flat design with brown color palette
- Integrates Contentful via the official `contentful` library and reads content type `parfumes` with fields: `name`, `description`, `price`, `category`, `image`, `featured`
- FontAwesome for icons

Setup

A. If you are creating the project from scratch (matches screenshot):

- Create a new Vite React project in the current directory (choose one):

  ```bash
  # npm (recommended shorthand)
  npm create vite@latest . -- --template react

  # or with npx
  npx create-vite . --template react
  ```

  Notes:
  - If prompted "Current directory is not empty. Please choose how to proceed:", choose **Ignore files and continue** to scaffold into the current folder, and **Yes** when asked to install with npm and start now to see output like:
    - "Scaffolding project in /path/to/your/dir..."
    - "Installing dependencies with npm..."

B. Existing project (how to run this repository):

1. Copy `.env.example` to `.env` and set values (already set for demo):
   - VITE_CONTENTFUL_SPACE_ID
   - VITE_CONTENTFUL_ACCESS_TOKEN
   - VITE_WHATSAPP_NUMBER (e.g., 6282289906123)
2. Install dependencies:
   npm install
3. Run dev server:
   npm run dev

Notes
- The WhatsApp CTA uses `https://wa.me/<number>?text=<message>`; number must be in international format without leading + (e.g., 6282...)
- To view draft/unpublished entries use the Contentful Preview API: set `VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN=<your_preview_token>` and `VITE_CONTENTFUL_USE_PREVIEW=1` in `.env`, then restart the dev server. When preview mode is enabled the app will show a small banner at the top so you know drafts are being shown.
- The application uses Contentful as the single source of truth for product data and images. Product images are displayed only when provided by Contentful. If an entry does not include an image, the UI shows a neutral "Gambar tidak tersedia" block instead of using a locally hosted placeholder image.
- This project uses FontAwesome SVG React components. If you add/modify icons, install/update packages: `@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-brands-svg-icons`.
- Do not commit `.env` with secrets to version control.
