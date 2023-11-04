import React, { useState } from "react";
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
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BookIcon from "@mui/icons-material/Book";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { fetchSearchedBooks, fetchBooksFromBookShelves } from "./api/books";
import ImageNotFound from "./assets/image-not-found.jpg";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export default function Album() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [bookShelveBooks, setBookShelveBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleDrawer = state => {
        setDrawerOpen(state);

        if (state) {
            fetchBooksFromBookShelves().then(data => {
                setBookShelveBooks(data.items);
            });
        }
    };

    const handleInput = event => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {
        fetchSearchedBooks(searchQuery).then(data => {
            setSearchedBooks(data.items);
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
                            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
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
                                            <Button size="small" sx={{ textTransform: "none" }}>
                                                Add to library
                                            </Button>
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
                    <Box sx={{ maxWidth: 350, p: 2 }} role="presentation" onClick={() => {}} onKeyDown={() => {}}>
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
                                                <Tooltip title={book.volumeInfo.description} arrow={true}>
                                                    <Typography paragraph={true}>
                                                        {" "}
                                                        {book.volumeInfo.description?.substring(0, 100) || `[No Description Found]`}
                                                    </Typography>
                                                </Tooltip>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" sx={{ textTransform: "none" }} color="error">
                                                    Remove from library
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Drawer>
            </main>
        </ThemeProvider>
    );
}
