import Hero from "./components/Hero";
import ListView from "./components/ListView";
import Navbar from "./components/Navbar";
import RequestBar from "./components/RequestBar";
import { useState } from "react";
import TableView from "./components/TableView";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import type { APICall } from "./types";

function App() {
  const [view, setView] = useState("List");
  
  const [selectedTime, setSelectedTime] = useState("Last 24h");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedResponse, setSelectedResponse] = useState("All");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApiCall, setSelectedApiCall] = useState<APICall | null>(null);

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
          onApiCallClick={(call) => {
            setSelectedApiCall(call);
            setIsModalOpen(true);
          }}
        />
      ) : (
        <TableView 
          selectedTime={selectedTime}
          selectedMethod={selectedMethod}
          selectedResponse={selectedResponse}
          onApiCallClick={(call) => {
            setSelectedApiCall(call);
            setIsModalOpen(true);
          }}
        />
      )}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apiCall={selectedApiCall}
      />
      <Footer />
    </main>
  );
}

export default App;
