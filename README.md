# Student Discussion Frontend

A Next.js + TypeScript frontend for the Student Discussion LMS system, built with the App Router and designed to connect to a backend API with authentication, session handling, and Docker support.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jfaylon/student-discussion-frontend.git
cd student-discussion-frontend
```

### 2. Choose how to run the application:

- [Run with Docker](#option-a-run-with-docker) – preferred and isolated
- [Run locally (dev mode)](#option-b-run-locally-dev-mode) – for development

---

## ⚙️ Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Framework     | Next.js (App Router) |
| Language      | TypeScript           |
| UI Library    | Tailwind CSS / CSS Modules |
| API Layer     | Axios                |
| Auth Handling | Cookies + Redirects  |
| Environment   | dotenv + `.env.*`    |
| Deployment    | Docker               |

---

## Running the Application

There are **two ways** to run the frontend:

---

### Option A: Run with Docker

This is the preferred method for isolated environments.

#### 1. Copy the Docker environment file

```bash
cp .env.docker.example .env.docker
```

> Make sure `NEXT_PUBLIC_BACKEND_API_URL` is pointing to your backend (usually `http://localhost:8000`).

#### 2. Build the Docker image

```bash
docker build -t lms-frontend --build-arg ENV=docker .
```

#### 3. Run the container

```bash
docker run --rm --name frontend \
  --network lms-network \
  -p 3000:3000 \
  lms-frontend
```

Visit the app at [http://localhost:3000](http://localhost:3000)

---

### Option B: Run Locally (Dev Mode)

This is ideal for development with hot reload.

#### Requirements

- Install **Node.js v22+**
- Backend must be running (locally or via Docker)

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure your environment

Copy the example env file:

```bash
cp .env.example .env.local
```

> Ensure `NEXT_PUBLIC_BACKEND_API_URL` in `.env.local` points to your backend (`http://localhost:8000` by default).

#### 3. Start the dev server

```bash
npm run dev
```

Frontend will run at [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Variables

The following variables must be set in `.env.local` or `.env.docker`:

| Variable                     | Example Value                  | Description                     |
|------------------------------|--------------------------------|---------------------------------|
| `NEXT_PUBLIC_BACKEND_API_URL`| `http://localhost:8000`        | URL to backend API              |
| `NEXT_PUBLIC_FRONTEND_URL`   | `http://localhost:3000`        | URL to self                     |

> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Project Structure

```
frontend/
├── app/                # App Router pages and layouts
├── components/         # Shared UI components
├── lib/                # Axios instance and helpers
├── public/             # Static assets
├── styles/             # Global styles
├── .env.example        # Local development environment example
├── .env.docker.example # Docker environment example
├── Dockerfile
├── next.config.js/ts
└── package.json
```

---

## API Routing and Proxying

You can proxy API requests in `next.config.js` to avoid CORS issues:

```ts
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/:path*"
      }
    ];
  }
};
```

Then use client-side calls like:

```ts
await axios.get("/api/account/me", { withCredentials: true });
```

---

## Available Scripts

| Script           | Description                            |
|------------------|----------------------------------------|
| `npm run dev`    | Start Next.js in dev mode              |
| `npm run build`  | Build the production-ready app         |
| `npm run start`  | Start the compiled app (Node server)   |
| `npm run lint`   | Run ESLint checks                      |

---

## Notes

- Make sure `.env.docker` and `.env.local` are created before running the app.
- `withCredentials: true` must be enabled for cross-origin cookies to work.
- Backend must be running and handle CORS + cookies appropriately.
- Only 2 accounts are made (1 admin and 1 instructor) which is found on https://github.com/jfaylon/student-discussion-backend

---

## Future Enhancements
- Better and more graceful error handling. The usage of toasts and error pages will make the system more seamless.
- Assuming that the data will be enriched with more data, more charts/graphs may be created.
- Multiple authentication methods (which can be supported in the Credentials table and passport.js) may be necessary for convenience of the user.
- Registration of account and forgot password mechanisms. Currently, the instructor and admin password is setup via Environment variable.

