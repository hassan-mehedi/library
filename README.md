# Google Books Library

Welcome to the Google Books Library project! This application is a digital library that allows users to search for books using the Google Books API, add books to bookshelves, and view search results in a grid format. Users can also access their bookshelf and view their saved books in a list format through a sidebar.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Setup](#setup)
-   [Usage](#usage)
-   [Responsive Design](#responsive-design)
-   [Design Decisions](#design-decisions)

## Features

-   **Book Search**: Search for books using keywords.
-   **Bookshelf**: Add and manage books in your bookshelf.
-   **Error Handling**: Handle various error scenarios gracefully.

## Technologies Used

-   Frontend Framework: React.js
-   CSS Framework: Material-UI (MUI)
-   HTTP Requests: Axios

## Setup

To get started with this application, follow these steps:

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com/hassan-mehedi/library.git
    ```

2. Change your working directory to the project folder:

    ```bash
    cd library
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Usage

1. Run the application:

    ```bash
    npm run dev
    ```

2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## Responsive Design

This application is designed to be responsive and works seamlessly on both desktop and mobile devices. The layout adjusts to the screen size, ensuring a great user experience on various devices.

## Design Decisions

In developing the Google Books Library application, I made a few key design choices to create a functional and user-friendly experience.

### State Management

I relied on React's built-in state management because the application primarily interacts with a user's Google account bookshelf. This choice simplifies the state management process by leveraging React's capabilities for efficient data handling.

### Material-UI (MUI) for Styling

For styling, I opted for Material-UI (MUI), a CSS framework. MUI provides pre-designed components and styles aligned with Material Design principles, making it easy to maintain a visually appealing interface.

### Mobile-First and Responsive Design

To cater to a wide range of devices, I designed the application with a mobile-first approach. The layout adjusts dynamically based on the user's screen size, ensuring a seamless experience on both desktop and mobile.

### Error Handling and User Feedback

I implemented clear error messages for different scenarios, such as HTTP status codes, rate limiting, network issues, and unexpected data, to guide users when issues occur.

## Live Website

Visit [Google Books](https://google-books-by-mehedi.netlify.app) to see the live website
