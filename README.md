<p align="center">
  <img src="./public/logo.svg" alt="Trackify Logo" width="80">
  <h2 align="center">Trackify</h2>
  <p align="center">
    A comprehensive link and webhook management platform for developers
    <br />
    <a href="https://trackify-dev.vercel.app"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lymore01/trackify-dev">GitHub</a>
    ·
    <a href="https://github.com/lymore01/trackify-dev/issues">Issues</a>
  </p>
</p>

## About the Project

Trackify is a professional suite designed to centralize and manage shortened links and webhook endpoints. Built with Next.js and Prisma, it provides a secure environment for developers to orchestrate their application assets with real-time tracking and granular analytics.

## Why Trackify

Modern applications often require multiple shortened URLs and webhook listeners. Trackify simplifies this complexity by providing a unified dashboard to monitor performance and manage lifecycle events efficiently.

- **Unified Management:** Oversee applications, links, and webhooks from a single interface.
- **Analytics:** Gain insights into click rates, device information, and geographic location data.
- **Developer First:** Built with TypeScript, Prisma, and Redis for a robust and type-safe developer experience.
- **Security:** Integrated authentication and API key management for secure asset access.

## Getting Started

To set up Trackify locally, follow these steps:

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Lymore01/trackify-dev
pnpm install
```

2. Configure your environment variables in a `.env` file (refer to `.env.example`).
3. Push the database schema to your provider:

```bash
pnpm prisma db push
```

4. Run the development server:

```bash
pnpm run dev
```

## Contribution

Trackify is open source. If you would like to contribute, please fork the repository and use a feature branch. Pull requests are strictly welcomed.

## License

This project is licensed under the MIT License.
