# Creators Club

Creators club is the online web application designed for the creators from where they can start their own subscription page. The creators can offers exclusive content among their certain subscribers These content can be of any form post, video or text the subscribers can cancel their subscription and renew their subscriptions from the platform. This way they can support their desired creators.

## Installation

Install nodejs in your application with any desired package, npm, yarn or pnpm

Navigate to backend directory present in the project folder and run the below command

```bash
cd backend
npm install
```

Now navigate back to the frontend directory and run the below command

```bash
cd frontend
npm install
```

## Environment Variables Setup

Now create a file named .env in your backend folder and fill out configuration show below

```node
PORT = 8000 or any desired port
NODE_ENV = development or production
MONGODB_URI = mongo database url
CORS_ORIGIN = frontend url or localhost:3000

SMTP_HOST = gmail or outlook
SMTP_PORT = 465
SMTP_SERVICE = gmail
SMTP_MAIL = your email
SMTP_PASSWORD = password

JWT_SECRET = 12322331asd

CLOUDINARY_NAME = any
CLOUDINARY_API_KEY = any
CLOUDINARY_API_SECRET = any

ACTIVATION_SECRET = 323121331

STRIPE_SECRET_KEY = any
STRIPE_PUBLISHABLE_KEY = any

```

These above are the environment variables configuration you are required in the backend

## Running

if not in backend directory from your shell navigate to backend directory

```bash
cd backend
npm run dev
```

You will see the message in your terminal saying server running on port:5000 and mongodb connected message additionally concurrently will also start your frontend server in the port 30000

## License

[MIT](https://choosealicense.com/licenses/mit/)
