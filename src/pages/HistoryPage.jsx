import { Delete, Info } from "@mui/icons-material";
import { Box, Chip, Container, IconButton, List, ListItem, ListItemText, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

function HistoryPage() {
    const eventsInLocalStorage = localStorage.getItem("events");
    const [events, setEvents] = useState(eventsInLocalStorage ? JSON.parse(eventsInLocalStorage) : []);
    const allEvents = eventsInLocalStorage ? JSON.parse(eventsInLocalStorage) : [];
    const endedEvents = allEvents.filter((event) => event.status === "ended");

    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleOpen = (history) => {
        setSelectedEvent(history);
        setOpen(true);
    };
    const handleClose = (history) => {
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
        <Typography variant="h4">Finished Event</Typography>
        <Box sx={{mt: 5}}>
            <Paper elevation={2} sx={{px: 3}}>
               <List sx={{width: "100%"}}>
                    {endedEvents.length > 0 ? (
                        endedEvents.map((event) => (
                            <ListItem key={event.id} disableGutters divider secondaryAction={
                                <Box sx={{display: "flex", gap: "10px"}}>
                                    <Chip color="success" label="Ended"/>
                                    <IconButton onClick={() => handleOpen(event)}><Info/></IconButton>
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
                        <Typography variant="body1" sx={{ mt: 4, textAlign: "center", width: "100%" }}>No finished events yet.</Typography>
                    )}
               </List>

               <Modal open={open} onClose={handleClose}>
                    <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", border: "2px solid black", boxShadow: 24, p: 4}}>
                        <Typography variant="h4">{selectedEvent?.title}</Typography>
                        <Typography variant="body2">{selectedEvent?.time}</Typography>
                        <Typography variant="h5" sx={{mt: 2}}>Games</Typography>
                        {selectedEvent?.games?.map((game, index) => (
                            <Typography key={index} variant="body1">{index + 1}. {game}</Typography>
                        ))}
                        <Typography variant="h5" sx={{mt: 2}}>Scores</Typography>
                        {selectedEvent?.attendees?.map((attendee, index) => (
                            <Typography key={index} variant="body1">{attendee}: {selectedEvent?.score?.[index] ? selectedEvent?.score?.[index] : "No Score"}</Typography>
                        ))}
                    </Box>
                </Modal>
            </Paper>
        </Box>
    </Container>
    );
}

export default HistoryPage;