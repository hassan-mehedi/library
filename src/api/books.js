import axios from "axios";

async function fetchSearchedBooks(searchQuery) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}:keyes&key=${import.meta.env.VITE_API_KEY}`);

    return response.data;
}

async function fetchBooksFromBookShelves() {
    const response = await axios.get("https://www.googleapis.com/books/v1/users/111761101346127235024/bookshelves/1001/volumes");

    return response.data;
}

export { fetchSearchedBooks, fetchBooksFromBookShelves };
