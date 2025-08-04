import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppBar from "./components/AppBar";

// import pages
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import EventPage from "./pages/EventPage";
import HistoryPage from "./pages/HistoryPage";
import EventFormPage from "./pages/EventFormPage";
import GameFormPage from "./pages/GameFormPage";
import EventFormEdit from "./pages/EventFormEdit";
import GameFormEdit from "./pages/GameFormEdit";
import { Toaster } from "sonner";

function App() {
    const defaultGames = [
        { id: "1", 
        gameTitle: "Trump: The Game", 
        gameContent: "Trump your opponents and become the greatest real estate developer in the world!", 
        gameRating: "4.3", 
        gameComplexity: "1.64", 
        gameMinPlayer: "3", 
        gameMaxPlayer: "4", 
        gameTime: "45"},
        { id: "2", 
        gameTitle: "Monopoly", 
        gameContent: "In this competitive real estate market, there's only one possible outcome: Monopoly!", 
        gameRating: "4.4", 
        gameComplexity: "1.62", 
        gameMinPlayer: "2", 
        gameMaxPlayer: "8", 
        gameTime: "180"},
        { id: "3", 
        gameTitle: "Scrabble", 
        gameContent: "Carefully place your lettered tiles to make high-scoring words.", 
        gameRating: "6.3", 
        gameComplexity: "2.06", 
        gameMinPlayer: "2", 
        gameMaxPlayer: "4", 
        gameTime: "90"},
        { id: "4", 
        gameTitle: "CATAN", 
        gameContent: "Collect and trade resources to build up the island of Catan in this modern classic.", 
        gameRating: "7.1", 
        gameComplexity: "2.29", 
        gameMinPlayer: "3", 
        gameMaxPlayer: "4", 
        gameTime: "120"},
        { id: "5", 
        gameTitle: "Chess", 
        gameContent: "Checkmate your opponent in this timeless abstract", 
        gameRating: "7.2", 
        gameComplexity: "3.65", 
        gameMinPlayer: "2", 
        gameMaxPlayer: "2", 
        gameTime: "90"},
    ];

    if (!localStorage.getItem("games")) {
        localStorage.setItem("games", JSON.stringify(defaultGames));
    }

    return (
        <Router>
            <AppBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/games" element={<GamePage/>}/>
                <Route path="/gameadd" element={<GameFormPage/>}/>
                <Route path="/gameedit/:id" element={<GameFormEdit/>}/>
                <Route path="/events" element={<EventPage/>}/>
                <Route path="/eventadd" element={<EventFormPage/>}/>
                <Route path="/eventedit/:id" element={<EventFormEdit/>}/>
                <Route path="/history" element={<HistoryPage/>}/>
            </Routes>
            <Toaster position="top-right" theme="dark"/>
        </Router>
    );
}

export default App;