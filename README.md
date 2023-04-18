#  Next.js, Three.js, shoe dropping app

Simple three.js app to drop a shoe with your choise of mesh color. Login using your Github account and add your shoe.

<img width="1280" alt="Screen Shot 2023-04-18 at 9 39 56 PM" src="https://user-images.githubusercontent.com/60039508/232783099-30a485b5-f079-456c-b794-e092e102f196.png">

<img width="1280" alt="Screen Shot 2023-04-18 at 9 42 30 PM" src="https://user-images.githubusercontent.com/60039508/232783385-d1033489-e42d-4e92-aa19-1602e4e9b8e6.png">

## How do run the app?

- run `npm install`
- Signup and create an account for PlanetScale, Clerk, and Upstash if you don't have.
- Create .env file and add "DATABASE_URL" for PlanetScale, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" and "CLERK_SECRET_KEY" for Clerk, "UPSTASH_REDIS_REST_URL" and "UPSTASH_REDIS_REST_TOKEN" for Upstash.
- run `npx prisma studio` to connect to Prisma db.
- run `npm run dev` for the frontend.

![nextjs-threejs-portfolio1-min](https://user-images.githubusercontent.com/60039508/232768923-a3185c75-0176-4b94-a33f-c139f37a30fe.gif)

![nextjs-threejs-portfolio2](https://user-images.githubusercontent.com/60039508/232777466-32d9fe05-3ac4-484e-9324-e3f937a28a89.gif)

<img width="1280" alt="Screen Shot 2023-04-18 at 9 46 12 PM" src="https://user-images.githubusercontent.com/60039508/232783945-a0df655e-4f54-433b-8c5c-393946f7003e.png">

<img width="1280" alt="Screen Shot 2023-04-18 at 9 46 51 PM" src="https://user-images.githubusercontent.com/60039508/232784157-f4a5fca5-0d24-499d-860a-7e289a010045.png">

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
