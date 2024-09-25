# List Grow
List Grow is a website-based application that helps you record your playing or holiday trips

# Technology (Based TypeScript)
## Frontend
- Vue (Vite)
- Tailwind
## Backend (Server)
- Express JS
- Cloudinary
## Database
- PostgreSQL (Vercel)
## Deploy
- Netlify (Frontend)
- Vercel (Database & Server)

# ERD
![Japahit-your todo drawio](https://github.com/user-attachments/assets/a7ba9f6f-b35c-4517-9d70-a38b57ae8c67)

Currently, there are only 3 tables, namely token which functions to store refresh and access tokens, user containing user information, and todo for managing todos.

# Mechanism in JWT token management
![Japahit-Page-3 drawio](https://github.com/user-attachments/assets/1c488968-beb6-4ee6-be7e-9aeb463a9e21)

# How to start (Development)
1 Setup database. You can use the manual method or use `docker-compose.yaml` on docker folder that containt db setup (PostgreSQL)
2 Open each folder (Frontend and Backend) and replace the `.env` credentials with your own
3) Write `npm run dev` on CLI. Frontend have port `5173` and Backend have port `4002`

# How to start (Production)
1) Build all project (Backend and frontend)
2) Get PostgreSQL DB Credential from Vercel
3) Replace db credential on .env
4) For Backend:
   - Just login to vercel CLI
   - Write `vercel` (automatically deploy)
5) If You have the public url API from Vercel, just replace to Frontend .env
   - You can deploy manually with build and deploy the `dist` folder on Netlify
   - Or Connect with Github repository for Frontend (I don't use this)
