import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router';
import { toast } from "sonner";

function GameFormPage() {
    const gamesInLocalStorage = localStorage.getItem("games");
    const [games, setGames] = useState(gamesInLocalStorage ? JSON.parse(gamesInLocalStorage) : []);

    const [gameTitle, setGameTitle] = useState("");
    const [gameRating, setGameRating] = useState("");
    const [gameMinPlayer, setGameMinPlayer] = useState("");
    const [gameMaxPlayer, setGameMaxPlayer] = useState("");
    const [gameTime, setGameTime] = useState("");
    const [gameComplexity, setGameComplexity] = useState("");
    const [gameContent, setGameContent] = useState("");

    const navigate = useNavigate();

    const handleAddNew = () => {
        if (gameTitle === "" || gameRating === "" || gameMinPlayer === "" || gameMaxPlayer === "" || gameTime === "" || gameComplexity === "" || gameContent === "") {
            toast("Please fill in all the fields");
        } else if (gameMinPlayer > gameMaxPlayer){
            toast("Minimum players cannot be more than maximum players")
        } else {
            const updatedGames = [
                ...games,
                {
                    id: nanoid(),
                    gameTitle: gameTitle,
                    gameRating: gameRating,
                    gameMinPlayer: gameMinPlayer,
                    gameMaxPlayer: gameMaxPlayer,
                    gameTime: gameTime,
                    gameComplexity: gameComplexity,
                    gameContent: gameContent,
                },
            ];
            setGames(updatedGames);
            localStorage.setItem("games", JSON.stringify(updatedGames));
            toast("New game added");
            navigate("/games");
        }
    };

    return (
    <Container sx={{py: 10}}>
        <Typography variant="h4">Add Board Games</Typography>
        <Paper elevation={2} sx={{p: 2, mt: 5}}>
            <TextField fullWidth id="game_title" label="Title" variant="outlined" value={gameTitle} onChange={(event) => setGameTitle(event.target.value)} sx={{my: 1}}/>
            <TextField type="number" fullWidth id="game_rating" label="Ratings (out of 10)" variant="outlined" value={gameRating} onChange={(event) => setGameRating(event.target.value)} sx={{my: 1}}/>
            <Box sx={{display: "flex", gap: "10px", my: 1}}>
                <TextField type="number" fullWidth id="game_min-player" label="Min. players" variant="outlined" value={gameMinPlayer} onChange={(event) => setGameMinPlayer(event.target.value)}/>
                <TextField type="number" fullWidth id="game_max-player" label="Max. players" variant="outlined" value={gameMaxPlayer} onChange={(event) => setGameMaxPlayer(event.target.value)}/>
            </Box>
            <TextField type="number" fullWidth id="game_time" label="Time (min)" variant="outlined" value={gameTime} onChange={(event) => setGameTime(event.target.value)} sx={{my: 1}}/>
            <TextField type="number" fullWidth id="game_complexity" label="Complexity (out of 5)" variant="outlined" value={gameComplexity} onChange={(event) => setGameComplexity(event.target.value)} sx={{my: 1}}/>
            <TextField fullWidth id="game_content" label="Description" variant="outlined" multiline rows={3} value={gameContent} onChange={(event) => setGameContent(event.target.value)} sx={{my: 1}}></TextField>
            <Box sx={{display: "flex", gap: 1, mt: 2}}>
                <Button variant="contained" onClick={handleAddNew}>Add Game</Button>
                <Button variant="outlined" component={RouterLink} to="/games">Cancel</Button>
            </Box>
        </Paper>
    </Container>
    );
}

export default GameFormPage;