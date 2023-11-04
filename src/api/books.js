import axios from "axios";

async function fetchSearchedBooks(searchQuery) {
    const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=0&maxResults=40&key=${import.meta.env.VITE_API_KEY}`
    );

    return { data: response.data, status: response.status };
}

async function fetchBooksFromBookShelves() {
    const response = await axios.get(
        "https://www.googleapis.com/books/v1/users/111761101346127235024/bookshelves/1001/volumes?startIndex=0&maxResults=40"
    );

    return { data: response.data, status: response.status };
}

async function addBookToBookShelves(volumeId, accessToken) {
    const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/1001/addVolume?volumeId=${volumeId}&key=${import.meta.env.VITE_API_KEY}`;
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    const response = await axios.post(url, null, config);

    return { data: response.data, status: response.status };
}

export { fetchSearchedBooks, fetchBooksFromBookShelves, addBookToBookShelves };
