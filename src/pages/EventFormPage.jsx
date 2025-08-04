import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router';
import { toast } from "sonner";

function EventFormPage({allGames = []}) {
    const eventsInLocalStorage = localStorage.getItem("events");
    const [events, setEvents] = useState(eventsInLocalStorage ? JSON.parse(eventsInLocalStorage) : []);
    const gamesInLocalStorage = localStorage.getItem("games");
    const [games, setGames] = useState(gamesInLocalStorage ? JSON.parse(gamesInLocalStorage) : []);

    const [eventTitle, setEventTitle] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventAttendees, setEventAttendees] = useState([""]);
    const [eventGames, setEventGames] = useState([]);
    const [eventStatus, setEventStatus] = useState("pending");

    const navigate = useNavigate();

    // Handling
    const handleAttendeeAdd = () => {
        setEventAttendees([...eventAttendees, ""]);
    };
    const handleAttendeeRemove = (index) => {
        setEventAttendees(eventAttendees.filter((attendee, i) => i !== index));
    };
    const handleAttendeeChange = (index, value) => {
        const updated = [...eventAttendees];
        updated[index] = value;
        setEventAttendees(updated);
    };
    const handleSubmit = () => {
        if (eventTitle === "" || eventTime === "" || eventAttendees === "" || eventGames === "") {
            toast("Please fill in all the fields")
        } else {
            const updatedEvents = [
                ...events,
                {
                id: nanoid(),
                title: eventTitle,
                time: eventTime,
                attendees: eventAttendees,
                games: eventGames,
                status: eventStatus,
                },
            ];
            setEvents(updatedEvents);
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            toast("New event added");
            navigate("/events")
        }
    };


    return (
    <Container sx={{py: 10}}>
        <Typography variant="h4">Add Event</Typography>
        <Paper elevation={2} sx={{p: 2, mt: 5}}>
            <TextField fullWidth id="event_title" label="Title" variant="outlined" sx={{my: 1}} value={eventTitle} onChange={(event) => setEventTitle(event.target.value)}/>
            <TextField fullWidth type="datetime-local" id="event_time" sx={{my: 1}} value={eventTime} onChange={(event) => setEventTime(event.target.value)}/>
            <Box sx={{my: 1}}>
                <Typography variant="h6" sx={{my: 1}}>Attendees</Typography>
                {eventAttendees.map((name, index) => (
                    <Box key={index} sx={{display: "flex", alignItems: "center", gap: 2, my: 1}}>
                        <TextField fullWidth label={`Attendee ${index + 1}`} value={name} onChange={(event) => handleAttendeeChange(index, event.target.value)}/>
                        <IconButton onClick={() => handleAttendeeRemove(index)} disabled={eventAttendees.length === 1}>
                            <Delete/>
                        </IconButton>
                    </Box>
                ))}
                <Button variant="outlined" startIcon={<Add/>} sx={{my: 1}} onClick={handleAttendeeAdd}>Add Attendee</Button>
            </Box>
            <FormControl fullWidth sx={{my: 1}}>
                <InputLabel id="game-select-label">Select Games</InputLabel>
                <Select labelId="game-select-label" multiple label="Select Games" value={eventGames} onChange={(event) => setEventGames(event.target.value)} renderValue={(selected) => selected.join(", ")}>
                    {games.map((game) => (
                        <MenuItem key={game.id} value={game.gameTitle}>{game.gameTitle}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{display: "flex", gap: 1, mt: 2}}>
                <Button variant="contained" onClick={handleSubmit}>Add Event</Button>
                <Button variant="outlined" component={RouterLink} to="/events">Cancel</Button>
            </Box>
        </Paper>
    </Container>
    );
}

export default EventFormPage;