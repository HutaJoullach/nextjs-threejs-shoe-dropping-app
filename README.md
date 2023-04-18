#  Next.js, Three.js, shoe dropping app

Simple three.js app to drop a shoe with your choise of mesh color. Login using your Github account and add your shoe.

<img width="1280" alt="Screen Shot 2023-04-18 at 9 39 56 PM" src="https://user-images.githubusercontent.com/60039508/232783099-30a485b5-f079-456c-b794-e092e102f196.png">

<img width="1280" alt="Screen Shot 2023-04-18 at 9 42 30 PM" src="https://user-images.githubusercontent.com/60039508/232783385-d1033489-e42d-4e92-aa19-1602e4e9b8e6.png">

## How to run the app?

- run `npm install`
- Signup and create an account for PlanetScale, Clerk, and Upstash if you don't have.
- Create .env file and add "DATABASE_URL" for PlanetScale, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" and "CLERK_SECRET_KEY" for Clerk, "UPSTASH_REDIS_REST_URL" and "UPSTASH_REDIS_REST_TOKEN" for Upstash.
- run `npx prisma studio` to connect to Prisma db.
- run `npm run dev` for the frontend.

![nextjs-threejs-portfolio1-min](https://user-images.githubusercontent.com/60039508/232768923-a3185c75-0176-4b94-a33f-c139f37a30fe.gif)

![nextjs-threejs-portfolio2](https://user-images.githubusercontent.com/60039508/232777466-32d9fe05-3ac4-484e-9324-e3f937a28a89.gif)

## Work in progress, scaffolding

- Adding author info mesh to each shoe, and disply all shoes that were created by that Github account user upon clicking.
- Edit, delete shoe functionality.
- Email modal, func to navbar.

This code still contains type errors since project is ongoing, so if you fixed any issues in the code, please send me a pull request :-)

<img width="1280" alt="Screen Shot 2023-04-18 at 9 46 12 PM" src="https://user-images.githubusercontent.com/60039508/232783945-a0df655e-4f54-433b-8c5c-393946f7003e.png">

<img width="1280" alt="Screen Shot 2023-04-18 at 9 46 51 PM" src="https://user-images.githubusercontent.com/60039508/232784157-f4a5fca5-0d24-499d-860a-7e289a010045.png">

Car physics functions used in this project were from following repo.

R3F-in-practice: https://github.com/Domenicobrz/R3F-in-practice

gltf file for the stag was from 3d content creator Quaternius.

Website: https://quaternius.com/index.html

Thanks for amazing inspiration and cool assets.
