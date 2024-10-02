# Research Article Chatbot (In Development)

## Description

The goal of this application is to create a chatbot that allows users to search through a dataset of research articles.

This project leverages **Vite**, **React**, **TypeScript**, and **Express** to create a robust application that integrates **OpenAI** for natural language processing and **OpenAlex** for accessing research article data.

Due to CORS issues and the need to protect the OpenAI API key, I decided to create a simple Express API server to handle requests to OpenAI. This allows for secure and efficient communication between the client and the OpenAI service.

> **Note**: This application is currently under development. Some features may not be fully implemented, and the project is subject to change as it evolves.

## Features

- **Conversational search**: Smooth interaction with users to facilitate article search.
- **Advanced filters**: Users can search for articles by:
  - Publication year
  - Citation count
  - Open access status
  - Keywords
- **Data access**: Article data is sourced from **OpenAlex**, ensuring up-to-date and comprehensive research materials.

## Installation

Follow these steps to run the project locally:

1. Clone this repository

2. Install dependencies for both client and server:
   ```bash
    cd server
    npm install
    cd ../researchbot-task
    npm install
   ```
3. Create a .env file in the server folder and add the following:

   - **OpenAI API**: You will need to sign up for an API key from OpenAI to access natural language processing.
     Add the API keys to a .env file:

   ```bash
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development client:

   ```bash
   npm run dev
   ```

5. Start the development server:

   ```bash
   ts-node server.ts
   ```

## Running with Docker Compose

To run both the client and server together, you can use Docker Compose. Follow these steps:

1. Run the app using Docker Compose:

   ```bash
   docker-compose up --build
   ```

The application will be available at:

    Server: http://localhost:3000
    Client: http://localhost:8080

## Use of AI Assistance

Throughout the development of this project, I used ChatGPT for various tasks, including:

- Docker Compose: It was my first time setting up Docker Compose to manage both the client and the server, and ChatGPT helped me understand how to properly configure it.

- CORS Issues: From the start, I intended to make the OpenAI API calls through a backend API to avoid exposing sensitive keys, but I initially decided to build only the client app to simplify the setup. This led me to attempt making the calls directly from the client, which caused CORS issues. After consulting with ChatGPT and doing additional research, I corrected this decision by creating a backend with Express to handle the API calls properly. This solution not only resolved the CORS issue.

- Helper Functions: I used ChatGPT to assist in creating helper functions, such as a function to validate URLs, ensuring the code remained organized and free of common errors.
