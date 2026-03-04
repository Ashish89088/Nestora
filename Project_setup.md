mkdir backend
cd backend
npm init -y

npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan

Validation + Utils
    npm install zod

DEV
    npm install --save-dev nodemon

Update package.json
    "scripts": {
        "dev": "nodemon src/server.js",
        "start": "node src/server.js"
    }


UI Setup
Nextjs
    npx create-next-app@latest frontend
    cd frontend

    npm install axios
    