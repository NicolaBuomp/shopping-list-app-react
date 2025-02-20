Shopping List React
Un’applicazione web per la gestione condivisa di liste della spesa, sviluppata con React per il frontend e con un backend in NestJS (supportato da Supabase).

Tecnologie Utilizzate
React + Vite: Per un frontend performante e moderno.
Redux Toolkit: Gestione dello stato globale (autenticazione, liste, tema, ecc.).
React Router: Routing client-side e protezione delle rotte.
Tailwind CSS 4: Styling reattivo, con supporto a light/dark theme via custom properties.
NestJS (Backend): Per la logica di business e l’autenticazione.
Supabase: Database e autenticazione, accessibili dal backend.
WebSockets: Aggiornamenti in tempo reale.
Notifiche Push: Per eventi importanti (se previste).
Funzionalità Principali
Autenticazione degli utenti (login, registrazione).
Creazione e gestione di liste della spesa.
Aggiunta, modifica ed eliminazione di elementi nella lista.
Condivisione delle liste con altri utenti e gestione dei permessi (proprietario, editor, viewer).
Aggiornamenti in tempo reale tramite WebSockets (opzionale).
Tema Light/Dark configurabile e persistito in localStorage.
Supporto offline (se implementato) con sincronizzazione automatica.
Requisiti
Node.js (v14 o superiore)
npm o yarn
Backend NestJS configurato (che utilizza Supabase)
Installazione
Clona il repository:

bash
Copia
Modifica
git clone https://github.com/tuo-utente/shopping-list-react.git
cd shopping-list-react
Installa le dipendenze:

bash
Copia
Modifica
npm install
oppure

bash
Copia
Modifica
yarn
Configura l’ambiente:

Se il progetto richiede variabili d’ambiente (API base URL, chiavi, ecc.), crea un file .env nella root del progetto e definisci le variabili necessarie, per esempio:

env
Copia
Modifica
VITE_API_BASE_URL=https://tuo-backend.com/api
Avvia l’app in locale:

bash
Copia
Modifica
npm run dev
Apri poi il browser su http://localhost:5173 (o la porta indicata da Vite) per visualizzare l’app.

Struttura del Progetto
Un esempio di struttura tipica (semplificata):

pgsql
Copia
Modifica
shopping-list-react
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ store/
│  │  │  ├─ authSlice.ts
│  │  │  ├─ themeSlice.ts
│  │  │  └─ index.ts (o store.ts)
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  ├─ LoginPage.tsx
│  │  ├─ SignUpPage.tsx
│  │  └─ DashboardPage.tsx
│  ├─ shared/
│  │  ├─ components/
│  │  │  ├─ Header.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  ├─ ThemeSwitch.tsx
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ layout/
│  │  │  └─ Layout.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css      # Tailwind + definizioni tema
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
app/store: Redux Toolkit store e slice (autenticazione, tema, liste, ecc.).
pages: Componenti pagina principali (Home, Login, Dashboard, ecc.).
shared/components: Componenti riutilizzabili (Header, Sidebar, Switch del tema…).
shared/layout: Layout generale con <Header /> + <Sidebar /> + <Outlet /> (React Router).
