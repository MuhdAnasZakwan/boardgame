import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router';
import { toast } from "sonner";

function EventFormEdit() {
    const navigate = useNavigate();
    const {id} = useParams();

    const eventsInLocalStorage = localStorage.getItem("events");
    const [events, setEvents] = useState(eventsInLocalStorage ? JSON.parse(eventsInLocalStorage) : []);
    const gamesInLocalStorage = localStorage.getItem("games");
    const [games, setGames] = useState(gamesInLocalStorage ? JSON.parse(gamesInLocalStorage) : []);

    const selectedEvent = events.find((event) => event.id === id);

    const [eventTitle, setEventTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [eventTime, setEventTime] = useState(selectedEvent ? selectedEvent.time : "");
    const [eventAttendees, setEventAttendees] = useState(selectedEvent? selectedEvent.attendees : [""]);
    const [eventGames, setEventGames] = useState(selectedEvent ? selectedEvent.games : []);
    const [eventStatus, setEventStatus] = useState(selectedEvent ? selectedEvent.status : "pending");
    const [eventScore, setEventScore] = useState(Array.isArray(selectedEvent?.score) ? selectedEvent.score : []);

    // When status="ended", keep score sync with attendees
    useEffect(() => {
        if (eventStatus === "ended") {
            const newScore = [...eventScore];
            while (newScore.length < eventAttendees.length) {
                newScore.push("");
            }
            if (newScore.length > eventAttendees.length) {
                newScore.length = eventAttendees.length;
            }
            setEventScore(newScore);
        }
    }, [eventStatus, eventAttendees])

    // Handling
    const handleAttendeeAdd = () => {
        setEventAttendees([...eventAttendees, ""]);
        setEventScore([...eventScore, ""]);
    };
    const handleAttendeeRemove = (index) => {
        setEventAttendees(eventAttendees.filter((attendee, i) => i !== index));
        setEventScore(eventScore.filter((score, i) => i !== index));
    };
    const handleAttendeeChange = (index, value) => {
        const updated = [...eventAttendees];
        updated[index] = value;
        setEventAttendees(updated);
    };
    const handleScoreChange = (index, value) => {
        const updatedScore = [...eventScore];
        updatedScore[index] = value;
        setEventScore(updatedScore);
    }
    const handleUpdate = () => {
        if (eventTitle === "" || eventTime === "" || eventAttendees.length === 0 || eventGames.length === 0) {
            toast("Please fill in all the fields");
        } else {
            const updatedEvents = [...events];
            setEvents(
                updatedEvents.map((event) => {
                    if (event.id === id) {
                        event.title = eventTitle;
                        event.time = eventTime;
                        event.attendees = eventAttendees;
                        event.games = eventGames;
                        event.status = eventStatus;
                        if (eventStatus === "ended") {
                            event.score = eventScore.map((score) => Number(score));
                        } else {
                            event.score = [];
                        }
                    }
                    return event;
                })
            );
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            toast("Event has been updated");
            navigate("/events");
        }
    };

    if (!selectedEvent) {
        return <div>Note not found...</div>
    }
    
    return (
    <Container sx={{py: 10}}>
        <Typography variant="h4">Edit Event</Typography>
        <Paper elevation={2} sx={{p: 2, mt: 5}}>
            <TextField fullWidth id="event_title" label="Title" variant="outlined" sx={{my: 1}} value={eventTitle} onChange={(event) => setEventTitle(event.target.value)}/>
            <TextField fullWidth type="datetime-local" id="event_time" sx={{my: 1}} value={eventTime} onChange={(event) => setEventTime(event.target.value)}/>
            <FormControl fullWidth sx={{my: 1}}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select labelId="status-select-label" value={eventStatus} onChange={(event) => setEventStatus(event.target.value)}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="ended">Ended</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{my: 1}}>
                <Typography variant="h6" sx={{my: 1}}>Attendees</Typography>
                {eventAttendees.map((name, index) => (
                    <Box key={index} sx={{display: "flex", alignItems: "center", gap: 2, my: 1}}>
                        <TextField fullWidth label={`Attendee ${index + 1}`} value={name} onChange={(event) => handleAttendeeChange(index, event.target.value)}/>
                        {eventStatus === "ended" ? (
                            <TextField type="number" label="Score" value={String(eventScore[index] !== undefined ? eventScore[index] : "")} onChange={(event) => handleScoreChange(index, event.target.value)}/>
                        ) : null}
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
                <Button variant="contained" onClick={handleUpdate}>Update Event</Button>
                <Button variant="outlined" component={RouterLink} to="/events">Cancel</Button>
            </Box>
        </Paper>
    </Container>
    );
}

export default EventFormEdit;