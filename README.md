# pastebin-UI

This repo contains the code for the UI part of pastebin like application. This application supports file (.pdf) and text sharing with multiple possible parameters (passwords, max views, download limits etc).

## Project Overview

- Purpose: Provide a responsive UI for uploading, listing, previewing, and protecting paste/files.
- Built with: React (JSX) + Vite for fast development and bundling.

## Tech Stack

- React (functional components, hooks)
- Vite (dev server + build)
- Plain CSS for global styles (`src/index.css`), but most of the styles are managed inline using MUI.
- Auth0 for authentication and user management.

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## High-level Architecture

Top-level layout:

- `index.html` — HTML entry file used by Vite.
- `src/main.jsx` — React entry. Mounts the app and providers.
- `src/App.jsx` — Application root. Configures routes and layout.
- `src/index.css` — Global styles.

All UI code lives under `src/` and is split into logical folders:

- `assets/` — static assets (images, icons) referenced by components.
- `components/` — all React components grouped by feature.
  - `Header.jsx` — top navigation/header used across pages.
  - `Files/` — components for listing and managing uploaded files:
    - `Files.jsx` — page-level component orchestrating the file list and interactions.
    - `FileTable.jsx` — table view of files.
    - `DetailRow.jsx` — single row details component used in lists.
    - `FileDetailsModal.jsx` — modal showing per-file metadata.
    - `DeleteFileModal.jsx` — confirmation modal for deletions.
    - `DataBadge.jsx` — small badge component used for tags/labels.
    - `PreviewPane.jsx` — preview area for selected file/paste.
  - `Upload/` — upload flow and helpers:
    - `Upload.jsx` — main upload page / component.
    - `UploadBox.jsx` — drag/drop or select area for file/text upload.
    - `TextComponent.jsx` — text-only upload UI.
    - `Settings.jsx` — upload options (e.g., privacy, password, expiry).
  - `Utils/` — shared helpers and small UI primitives:
    - `CustomFunctions.js` — utility functions used across components.
    - `CustomInput.jsx` — styled input wrapper used in forms.
    - `Debounce.js` — debounce helper for search/typing.
    - `SidebarButtons.jsx` — small navigation/button widgets.
    - `Toast.jsx` & `ToastProvider.jsx` — lightweight toast notifications.
  - `ViewDoc/` — viewer screens for opened pastes/files:
    - `PasteView.jsx` — main view for text pastes.
    - `PDFViewer.jsx` — PDF previewer wrapper.
    - `TextViewer.jsx` — text file viewer.
    - `PasswordScreen.jsx` — prompt screen for password-protected items.
    - `ErrorScreen.jsx` — generic error / not-found screen.
- `Routes/` — routing helpers
  - `ProtectedRoute.jsx` — wrapper ensuring protected resources (auth/passwords) are handled before rendering pages.

## Data Flow & State

- Local/stateful components: pages and feature components manage local UI state using React hooks (e.g., selected file, modal open/close, form input)
- Shared UI concerns:
  - Toasts are managed via `ToastProvider.jsx` and consumed by `Toast.jsx`.
  - Debouncing for input is centralized in `Debounce.js`.
- Networking: This UI expects a backend API (for example, `pastebin-backend`) to provide paste/file upload, download, metadata, and auth endpoints. Components call services (either directly via `fetch`/`axios` inside component effects or via small wrapper functions in `CustomFunctions.js`).

## Authentication

Authentication is managed by **Auth0**. Access tokens and user info for security purpose is managed in localstorage instead of cookies for security purpose.

## Components Responsibilities (short)

- `Header.jsx`: branding, top-level navigation, global actions.
- `Files/*`: list and manage uploaded entities, show modals, and previews.
- `Upload/*`: collect file/text from users, configure upload settings (password, expiry), and send to backend.
- `ViewDoc/*`: render different content types (PDF, text) with password gating and error handling.
- `Utils/*`: utilities, small reusable UI pieces and providers.

## Routing & Protection

- Routing is centered in `App.jsx` and uses React Router (assumed) to map paths to pages.
- `ProtectedRoute.jsx` is used for pages that require a check (password, token or login). It either redirects, prompts for a password, or renders the target component.

## Styling

- Global styles are in `src/index.css` and small, component-scoped styles are handled inline or via classnames in the components.

## Testing & Linting

- Linting configuration exists (`eslint.config.js`). Add tests and CI as needed.

## Build & Deployment

- Vite handles dev and production builds. Production output goes to `dist/` after `npm run build`.
- Deploy the `dist/` folder on any static hosting (Netlify, Vercel, S3 + CloudFront) or serve it behind the backend server.

## Extending the UI

- Add new viewers in `ViewDoc/` for additional file types.
- Centralize API calls into a `services/` folder if you want to keep networking logic outside components.

## Contributing

- Fork, branch, open PRs, and run the dev server locally.
- Follow the existing component patterns (small, focused components; provider usage for cross-cutting concerns like toasts).

## Files To Inspect First

- `src/main.jsx`, `src/App.jsx`, and `src/components/Files/Files.jsx` — to understand app bootstrapping and the primary user flow.

---

If you'd like, I can also:

- generate a component map diagram,
- extract and document API endpoints expected by the UI,
- or produce a short contributor guide with PR checklist.
