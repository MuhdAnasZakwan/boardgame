import { Box, Chip, Container, Fab, IconButton, List, ListItem, ListItemText, Modal, Paper, Typography } from "@mui/material";
import { Add, Delete, Edit, Info } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';
import { useState } from "react";
import { toast } from "sonner";

function EventPage() {
    const eventsInLocalStorage = localStorage.getItem("events");
    const [events, setEvents] = useState(eventsInLocalStorage ? JSON.parse(eventsInLocalStorage) : []);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const pendingEvents = events.filter((event) => event.status === "pending");

    const handleOpen = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };
    const handleClose = (event) => {
        setOpen(false);
        setSelectedEvent(null);
    };

    const handleEventDelete = (event) => {
        const confirmDelete = confirm("Are you sure you want to delete this event?");
        if (confirmDelete) {
            const updatedEvents = events.filter((item) => item.id !== event.id);
            setEvents(updatedEvents);
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            toast("Event has been deleted");
        }
    }

    return (
    <Container sx={{py: 10}}>
        <Typography variant="h4">Planned Events</Typography>
        <Box sx={{mt: 5}}>
            <Paper elevation={2} sx={{px: 3}}>
                <List sx={{width: "100%"}}>
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", border: "2px solid black", boxShadow: 24, p: 4}}>
                            <Typography variant="h4">{selectedEvent?.title}</Typography>
                            <Typography variant="body2">{selectedEvent?.time}</Typography>
                            <Typography variant="h5" sx={{mt: 2}}>Attendees</Typography>
                            {selectedEvent?.attendees?.map((name, index) => (
                                <Typography key={index} variant="body1">{index+1}. {name}</Typography>
                            ))}
                            <Typography variant="h5" sx={{mt: 2}}>Games</Typography>
                            {selectedEvent?.games?.map((game, index) => (
                                <Typography key={index} variant="body1">{index+1}. {game}</Typography>
                            ))}
                        </Box>
                    </Modal>
                    {pendingEvents.length > 0 ? (
                        pendingEvents.map((event) => (
                            <ListItem key={event.id} disableGutters divider secondaryAction={
                                <Box sx={{display: "flex", gap: "10px"}}>
                                    <Chip color="warning" label="Pending"/>
                                    <IconButton onClick={() => handleOpen(event)}><Info/></IconButton>
                                    <IconButton component={RouterLink} to={`/eventedit/${event.id}`}><Edit/></IconButton>
                                    <IconButton onClick={() => handleEventDelete(event)}><Delete/></IconButton>
                                </Box>
                            }>
                                <ListItemText primary={
                                    <Typography variant="h6">{event.title}</Typography>
                                } secondary={
                                    <Typography variant="body2">{event.time}</Typography>
                                }></ListItemText>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{mt: 4, textAlign: "center", width: "100%"}}>There's no pending event...</Typography>
                    )}
                </List>
            </Paper>
            <Fab sx={{position: "absolute", bottom: 16, right: 16}} color="primary" component={RouterLink} to="/eventadd"><Add/></Fab>
        </Box>
    </Container>
    );
}

export default EventPage;