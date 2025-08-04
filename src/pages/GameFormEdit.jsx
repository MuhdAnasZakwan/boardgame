import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router';
import { toast } from "sonner";

function GameFormEdit() {
    const navigate = useNavigate();
    const {id} = useParams();

    const gamesInLocalStorage = localStorage.getItem("games");
    const [games, setGames] = useState(gamesInLocalStorage ? JSON.parse(gamesInLocalStorage) : []);

    const selectedGame = games.find((game) => game.id === id);

    const [gameTitle, setGameTitle] = useState(selectedGame ? selectedGame.gameTitle : "");
    const [gameRating, setGameRating] = useState(selectedGame ? selectedGame.gameRating : "");
    const [gameMinPlayer, setGameMinPlayer] = useState(selectedGame ? selectedGame.gameMinPlayer : "");
    const [gameMaxPlayer, setGameMaxPlayer] = useState(selectedGame ? selectedGame.gameMaxPlayer : "");
    const [gameTime, setGameTime] = useState(selectedGame ? selectedGame.gameTime : "");
    const [gameComplexity, setGameComplexity] = useState(selectedGame ? selectedGame.gameComplexity : "");
    const [gameContent, setGameContent] = useState(selectedGame ? selectedGame.gameContent : "");

    const handleUpdate = () => {
        if (gameTitle === "" || gameRating === "" || gameMinPlayer === "" || gameMaxPlayer === "" || gameTime === "" || gameComplexity === "" || gameContent === "") {
            toast("Please fill in all the fields");
        } else {
            const updatedGames = [...games];
            setGames(
                updatedGames.map((game) => {
                    if (game.id === id) {
                        game.gameTitle = gameTitle;
                        game.gameRating = gameRating;
                        game.gameMinPlayer = gameMinPlayer;
                        game.gameMaxPlayer = gameMaxPlayer;
                        game.gameTime = gameTime;
                        game.gameComplexity = gameComplexity;
                        game.gameContent = gameContent;
                    }
                    return game;
                })
            );
            localStorage.setItem("games", JSON.stringify(updatedGames));
            toast("Game has been updated");
            navigate("/games");
        }
    };

    if (!selectedGame) {
        return <div>Note not found...</div>
    }
    
    return (
    <Container sx={{py: 10}}>
        <Typography variant="h4">Edit Board Game</Typography>
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
                <Button variant="contained" onClick={handleUpdate}>Update Game</Button>
                <Button variant="outlined" component={RouterLink} to="/games">Cancel</Button>
            </Box>
        </Paper>
    </Container>
    );
}

export default GameFormEdit;