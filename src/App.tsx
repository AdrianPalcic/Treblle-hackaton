import Hero from "./components/Hero";
import ListView from "./components/ListView";
import Navbar from "./components/Navbar";
import RequestBar from "./components/RequestBar";
import { useState } from "react";
import TableView from "./components/TableView";
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState("List");
  
  const [selectedTime, setSelectedTime] = useState("Last 24h");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedResponse, setSelectedResponse] = useState("All");

  return (
    <main>
      <Navbar />
      <Hero />
      <RequestBar 
        view={view} 
        setView={setView}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
        selectedResponse={selectedResponse}
        setSelectedResponse={setSelectedResponse}
      />
      {view === "List" ? (
        <ListView 
          selectedTime={selectedTime}
          selectedMethod={selectedMethod}
          selectedResponse={selectedResponse}
        />
      ) : (
        <TableView 
          selectedTime={selectedTime}
          selectedMethod={selectedMethod}
          selectedResponse={selectedResponse}
        />
      )}
      <Footer />
    </main>
  );
}

export default App;
