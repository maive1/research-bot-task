# Research Article Chatbot (In Development)

## Description

The goal of this application is to create a chatbot that allows users to search through a dataset of research articles.

This project leverages **Vite**, **React**, **TypeScript**, and integrates **OpenAI** for natural language processing and **OpenAlex** for accessing research article data.

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

2. Install dependencies
   ```bash
   npm install
   ```
3. Set up API key:

   - **OpenAI API**: You will need to sign up for an API key from OpenAI to access natural language processing.
     Add the API keys to a .env file:

   ```bash
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```
