import { Box, Button, Card, Chip, Container, Fab, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { AccessTime, Add, Delete, Edit, Groups, Psychology, Star } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';
import { useState } from "react";
import { toast } from "sonner";

function GamePage() {
    const gamesInLocalStorage = localStorage.getItem("games");
    const [games, setGames] = useState(gamesInLocalStorage ? JSON.parse(gamesInLocalStorage) : []);

    const [ratingFilter, setRatingFilter] = useState("all");
    const [playerFilter, setPlayerFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all");
    const [complexityFilter, setComplexityFilter] = useState("all");

    const filteredGames = games.filter((game) => {
        const rating = parseFloat(game.gameRating);
        const minPlayer = parseInt(game.gameMinPlayer);
        const maxPlayer = parseInt(game.gameMaxPlayer);
        const time = parseInt(game.gameTime);
        const complexity = parseFloat(game.gameComplexity);

        // The Eliminator
        if (ratingFilter !== "all" && rating < parseInt(ratingFilter)) {
            return false;
        }
        if (playerFilter !== "all") {
            const pfilter = parseInt(playerFilter);
            if (pfilter < minPlayer || pfilter > maxPlayer) {
                return false;
            }
        }
        if (timeFilter !== "all" && time > parseInt(timeFilter)) {
            return false;
        }
        if (complexityFilter !== "all" && complexity < parseInt(complexityFilter)) {
            return false;
        }

        return true;
    });

    const handleGameDelete = (game) => {
        const confirmDelete = confirm("Are you sure you want to delete this game?");
        if (confirmDelete) {
            const updatedGames = games.filter((item) => item.id !== game.id);
            setGames(updatedGames);
            localStorage.setItem("games", JSON.stringify(updatedGames));
            toast("Game has been deleted");
        }
    }

    return (
    <Container sx={{py: 10}}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Typography variant="h4">All Board Games</Typography>
            <Box sx={{display: "flex", gap: "10px"}}>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="ratings-label">Ratings</InputLabel>
                        <Select labelId="ratings-label" id="ratings" label="ratings" value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}>
                            <MenuItem value={"all"}>All Ratings</MenuItem>
                            <MenuItem value={1}>1 And Above</MenuItem>
                            <MenuItem value={2}>2 And Above</MenuItem>
                            <MenuItem value={3}>3 And Above</MenuItem>
                            <MenuItem value={4}>4 And Above</MenuItem>
                            <MenuItem value={5}>5 And Above</MenuItem>
                            <MenuItem value={6}>6 And Above</MenuItem>
                            <MenuItem value={7}>7 And Above</MenuItem>
                            <MenuItem value={8}>8 And Above</MenuItem>
                            <MenuItem value={9}>9 And Above</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="players-label">Players</InputLabel>
                        <Select labelId="players-label" id="players" label="players" value={playerFilter} onChange={(event) => setPlayerFilter(event.target.value)}>
                            <MenuItem value={"all"}>All Players</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="time-label">Time</InputLabel>
                        <Select labelId="time-label" id="time" label="time" value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)}>
                            <MenuItem value={"all"}>All time</MenuItem>
                            <MenuItem value={30}>Under 30 minutes</MenuItem>
                            <MenuItem value={60}>Under 60 minutes</MenuItem>
                            <MenuItem value={90}>Under 90 minutes</MenuItem>
                            <MenuItem value={120}>Under 120 minutes</MenuItem>
                            <MenuItem value={180}>Under 180 minutes</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="complexity-label">Complexity</InputLabel>
                        <Select labelId="complexity-label" id="complexity" label="complexity" value={complexityFilter} onChange={(event) => setComplexityFilter(event.target.value)}>
                            <MenuItem value={"all"}>All Complexity</MenuItem>
                            <MenuItem value={2}>2 And Above</MenuItem>
                            <MenuItem value={3}>3 And Above</MenuItem>
                            <MenuItem value={4}>4 And Above</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
        <Box>
            <Grid container spacing={2} sx={{mt: 5}}>
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <Grid key={game.id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                            <Card variant="outlined" sx={{p: 2}}>
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <Typography variant="h5">{game.gameTitle}</Typography>
                                    <Chip icon={<Star/>} label={`${game.gameRating}`}/>
                                </Box>
                                <Typography variant="body1" sx={{my: 2}}>{game.gameContent}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <Chip icon={<Groups/>} label={`${game.gameMinPlayer} - ${game.gameMaxPlayer}`}/>
                                    <Chip icon={<AccessTime/>} label={`${game.gameTime} min`}/>
                                    <Chip icon={<Psychology/>} label={`${game.gameComplexity} / 5`}/>
                                </Stack>
                                <Box sx={{mt: 2, display: "flex", gap: 2}}>
                                    <Button variant="outlined" color="primary" size="small" component={RouterLink} to={`/gameedit/${game.id}`}><Edit/>Edit</Button>
                                    <Button variant="outlined" color="error" size="small" onClick={() => handleGameDelete(game)}><Delete/>Delete</Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" sx={{mt: 4, textAlign: "center", width: "100%"}}>No games found.</Typography>
                )}
            </Grid>
            <Fab sx={{position: "absolute", bottom: 16, right: 16}} color="primary" component={RouterLink} to="/gameadd"><Add/></Fab>
        </Box>
    </Container>
    );
}

export default GamePage;