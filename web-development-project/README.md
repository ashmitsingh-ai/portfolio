# Web Development Projects — Starter Pack
**Developer:** Ashmit Singh Jaiswal  
**Branding:** ASJ  
**Design Palette:** Charcoal Grey (`#111317`), Moonlit Silver (`#f4f6fa`), Signal Red (`#e51d2c`)

This bundle implements all three web development projects:
1. **Resume / Portfolio Website** (`portfolio/`)
2. **React Contact Cards App** (`react-contact-cards/`)
3. **React Like Cards App** (`react-like-cards/`)

---

## 1. Resume / Portfolio Website (`portfolio/`)

### Features
- Responsive layout with navigation, about, skills, selected projects, contact form, and message dashboard.
- Styled in **Charcoal Grey**, **Moonlit Silver**, and **Signal Red**.
- Light and dark theme toggle with user preference saved in browser `localStorage`.
- Contact form validates and saves submissions to `localStorage` as JSON.
- Demo admin dashboard for reviewing submissions.
- Optional Google Sheets backend integration via `Code.gs`.

### Run Locally
```bash
python -m http.server 8000 -d portfolio
```
Or open `portfolio/index.html` in Chrome or using VS Code Live Server.

### Demo Admin Login
- **Username:** `admin`
- **Password:** `Portfolio@123`

---

## 2. React Contact Cards (`react-contact-cards/`)

Dynamic React application with reusable `ContactForm`, `ContactCard`, and `UserList` components.

### Run Locally
```bash
cd react-contact-cards
npm install
npm run dev
```
Open the local URL displayed by Vite (e.g. `http://localhost:5173`).

---

## 3. React Like Cards (`react-like-cards/`)

Reusable `LikeCard` components receiving `title`, `description`, and `category` props with independent `useState` toggle logic.

### Run Locally
```bash
cd react-like-cards
npm install
npm run dev
```
Open the local URL displayed by Vite (e.g. `http://localhost:5174`).

---

## Publish Portfolio to GitHub Pages
1. Create a repository on GitHub.
2. Push your files or upload the contents of the `portfolio/` folder.
3. In repository **Settings** → **Pages**, select deployment branch `main` and save.
4. Your public URL will be generated automatically.

---

## Security Note
The demo admin panel is a client-side prototype. For a production release handling private personal data, connect a real authentication service (e.g. Supabase, Firebase, or an express/FastAPI backend) with server-side access control.
