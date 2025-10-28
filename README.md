## Introduction

Manga app is a simple web app to catalog manga and manage the reading status.
Made with [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
This project require a API that can be found in [`simple-manga-api`](https://github.com/lisboa-daniel/simple-manga-api) repository 

## Getting Started to run locally

Use your favoite package manager to install dependencies.
Example.

```bash
npm install
```

Configure your environment, creating a `.env ` file with this entries:
```bash
API_URL="<api_endpoint>"
JWT_SECRET="<number>"
```

* API_URL is the <host>/api/ endpoint of [`simple-manga-api`](https://github.com/lisboa-daniel/simple-manga-api)
* JWT_SECRET is the [`secret`](https://auth0.com/docs/secure/tokens/json-web-tokens#:~:text=JSON%20web%20token%20(JWT)%2C,token%20is%20always%20a%20JWT.) used for creating sessions that you need to generate

To run the developer environment:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To build and run:
```bash
npm run build
npm run start
```

With the api running open: [http://localhost:3000](http://localhost:3000) with your browser to see the result. (the port may vary)


## Demo

A demo featuring the app will be deployed soon
