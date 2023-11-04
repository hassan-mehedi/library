import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Import Icons
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedSnackbars from "./components/snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

// Import API's
import { fetchSearchedBooks, fetchBooksFromBookShelves, addBookToBookShelves } from "./api/books";
import { getNewAccessToken } from "./api/auth";

// Import Assets
import ImageNotFound from "./assets/image-not-found.jpg";

// Create Default MUI Theme
const defaultTheme = createTheme();

export default function Album() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [bookShelveBooks, setBookShelveBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [open, setOpen] = useState(false);
    const [addButtonloading, setAddButtonLoading] = useState([]);
    const [searchButtonloading, setSearchButtonLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");

    // Handle Snackbar Close Event
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if (!navigator.onLine) {
            updateSnackBarState("Looks like a connection issue. Make sure you're online and try again.", "error", true);
        }

        // Get Access Token To Add Books To BookShelves
        getNewAccessToken().then(data => {
            setAccessToken(data.access_token);
        });

        // Fetch Previously Added Books
        updateSnackBarState("Getting your books", "info", true);
        fetchBooksFromBookShelves().then(res => {
            if (res.status === 200) {
                setBookShelveBooks(res.data.items);
                updateSnackBarState("Your bookshelf is ready", "success", true);
            } else {
                errorHandler(res.status);
            }
        });
    }, []);

    // Handle BookShelf Drawer
    const toggleDrawer = state => {
        setDrawerOpen(state);
    };

    // Handle Search Input
    const handleInput = event => {
        setSearchQuery(event.target.value);
    };

    // Handle 'Enter' Key Press While User Searches
    const handleKeyPress = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    // Handle Various Errors
    const errorHandler = status => {
        if (status === 404) {
            updateSnackBarState("No books found matching your search. Perhaps try different keywords?", "error", true);
        } else if (status === 429) {
            updateSnackBarState("You've been reading too fast! Please wait a bit and try searching again.", "error", true);
        } else if (status === 500) {
            updateSnackBarState(`Our digital library is currently under maintenance. Please come backlater!`, "error", true);
        }
    };

    // Search Handler For Books, Authors or Any Keywords
    const handleSearch = () => {
        setSearchButtonLoading(true);
        fetchSearchedBooks(searchQuery).then(res => {
            if (res.status === 200) {
                if (res.data.totalItems === 0) {
                    updateSnackBarState("No books found matching your search. Perhaps try different keywords?", "error", true);
                } else {
                    setSearchedBooks(res.data.items);
                    setSearchButtonLoading(false);
                    updateSnackBarState("We found what you were looking for", "success", true);
                }
            } else {
                errorHandler(res.status);
            }
        });
    };

    // Loading Handler For 'Add to library' Button
    const updateButtonLoadingState = (volumeId, state) => {
        let loading = addButtonloading.slice();
        loading[volumeId] = state;
        setAddButtonLoading(loading);
    };

    // Status Handler
    const updateSnackBarState = (message, severity, state) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(state);
    };

    // Bookshelf Handler
    const addToBookShelve = volumeId => {
        // Handling loading for each button
        updateButtonLoadingState(volumeId, true);
        // Update snackbar state
        updateSnackBarState("Please wait for google api to update bookshelves...", "info", true);

        addBookToBookShelves(volumeId, accessToken).then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    // Google book api takes some time to update it's shelves
                    // That's why we fetch after waiting for 10 seconds
                    // We set the loader to false after getting the updated booksshelf
                    fetchBooksFromBookShelves().then(res => {
                        if (res.status === 200) {
                            setBookShelveBooks(res.data.items);
                            // Handling loading for each button
                            updateButtonLoadingState(volumeId, false);
                            // Update snackbar state
                            updateSnackBarState("Successfully added", "success", true);
                        } else {
                            // Handling loading for each button
                            updateButtonLoadingState(volumeId, false);
                            updateSnackBarState("Error occured", "error", true);
                        }
                    });
                }, 10000);
            } else {
                // Handling loading for each button
                updateButtonLoadingState(volumeId, false);
                errorHandler(res.status);
            }
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <ImportContactsIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Library
                    </Typography>
                    <BookIcon
                        sx={{ ml: "auto", cursor: "pointer" }}
                        onClick={() => {
                            toggleDrawer(true);
                        }}
                    />
                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
                    <Container maxWidth="sm">
                        <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
                            <InputBase
                                autoFocus
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Books"
                                inputProps={{ "aria-label": "search for books" }}
                                onInput={event => handleInput(event)}
                                onKeyDown={handleKeyPress}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <Box sx={{ position: "relative" }}>
                                <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                                {searchButtonloading && (
                                    <CircularProgress
                                        size={31}
                                        sx={{
                                            color: "green",
                                            position: "absolute",
                                            top: 5,
                                            left: 5,
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {searchedBooks &&
                            searchedBooks.map(book => (
                                <Grid item key={book.id} xs={12} sm={6} md={6}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardMedia
                                            component="img"
                                            height={200}
                                            sx={{ objectFit: "none", backgroundColor: "#eeddee" }}
                                            image={`${book.volumeInfo.imageLinks?.thumbnail || ImageNotFound}`}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6">
                                                {book.volumeInfo.title}
                                            </Typography>
                                            <Typography gutterBottom variant="subtitle2">
                                                Author(s): {book.volumeInfo.authors?.join(", ")}
                                            </Typography>
                                            <Tooltip title={book.volumeInfo.description} arrow={true}>
                                                <Typography paragraph={true}>
                                                    {" "}
                                                    {book.volumeInfo.description?.substring(0, 100) || `[No Description Found]`}
                                                </Typography>
                                            </Tooltip>
                                        </CardContent>
                                        <CardActions>
                                            <Box sx={{ m: 1, position: "relative" }}>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{ textTransform: "none" }}
                                                    disabled={addButtonloading[book.id]}
                                                    onClick={() => {
                                                        addToBookShelve(book.id);
                                                    }}
                                                >
                                                    Add to library
                                                </Button>
                                                {addButtonloading[book.id] && (
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                            color: "green",
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            marginTop: "-12px",
                                                            marginLeft: "-12px",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => {
                        toggleDrawer(false);
                    }}
                >
                    <Box sx={{ maxWidth: 350, minWidth: 300, p: 2 }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "16px" }}>
                            <Typography variant="h4" color="inherit" textAlign="left">
                                Bookshelve
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    toggleDrawer(false);
                                }}
                            >
                                x
                            </Button>
                        </div>
                        <Divider />
                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                            {bookShelveBooks &&
                                bookShelveBooks.map(book => (
                                    <Grid item key={book.id} xs={12} sm={12} md={12}>
                                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                sx={{ objectFit: "none", backgroundColor: "#eeddee" }}
                                                image={`${book.volumeInfo.imageLinks?.thumbnail || ImageNotFound}`}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h6">
                                                    {book.volumeInfo.title}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle2">
                                                    Author(s): {book.volumeInfo.authors?.join(", ")}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Drawer>
                {open && <CustomizedSnackbars open={open} handleClose={handleClose} message={message} severity={severity} />}
            </main>
        </ThemeProvider>
    );
}
