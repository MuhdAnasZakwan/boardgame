import { EventNote, SportsEsports } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router';

function HomePage() {
    return (
    <Box sx={{
    backgroundImage: "url(/assets/boardgameimg.jpg)", 
    backgroundSize: "cover", 
    backgroundPosition: "center", 
    height: "100vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    color: "white", 
    textAlign: "center",
    position: "relative",
    "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    }
    }}>
        <Container sx={{zIndex: 1}}>
            <Typography variant="h2">Board Game Night Organizer</Typography>
            <Stack direction="row" spacing={2} sx={{justifyContent: "center", mt: 4}}>
                <Button variant="contained" color="primary" size="large" component={RouterLink} to="/events" startIcon={<EventNote/>}>Add Events</Button>
                <Button variant="contained" color="inherit" sx={{color: "black"}} size="large" component={RouterLink} to="/games" startIcon={<SportsEsports/>}>Add Board Games</Button>
            </Stack>
        </Container>
    </Box>
    )
}

export default HomePage;