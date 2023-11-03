import React from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <ImportContactsIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Library
                    </Typography>
                    <BookIcon sx={{ ml: "auto" }} />
                </Toolbar>
            </AppBar>
            <main>
                <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
                    <Container maxWidth="sm">
                        <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
                            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Books" inputProps={{ "aria-label": "search for books" }} />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                    <CardMedia component="div" sx={{ pt: "56.25%" }} image="https://source.unsplash.com/random?wallpapers" />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>This is a media card. You can use this section to describe the content.</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Add to library</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Drawer anchor="right" open={true} onClose={() => {}}>
                    <Box sx={{ width: 350, p: 1 }} role="presentation" onClick={() => {}} onKeyDown={() => {}}>
                        <Typography variant="h4" color="inherit" textAlign="center">
                            Your Books
                        </Typography>
                        <Divider />
                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                            {cards.map(card => (
                                <Grid item key={card} xs={12} sm={12} md={12}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardMedia component="div" sx={{ pt: "56.25%" }} image="https://source.unsplash.com/random?wallpapers" />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Heading
                                            </Typography>
                                            <Typography>This is a media card. You can use this section to describe the content.</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="error">
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
