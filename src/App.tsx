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
  // View states
  const [view, setView] = useState("List");

  // Sorting states
  const [selectedTime, setSelectedTime] = useState("Last 24h");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedResponse, setSelectedResponse] = useState("All");
  
  // Active sort - only one can be active at a time
  const [activeSort, setActiveSort] = useState<"createdAt" | "responseTime">("createdAt");
  const [sortByCreatedAt, setSortByCreatedAt] = useState<"latest" | "oldest">(
    "latest"
  );
  const [sortByResponseTime, setSortByResponseTime] = useState<
    "fastest" | "slowest"
  >("fastest");

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
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        sortByCreatedAt={sortByCreatedAt}
        setSortByCreatedAt={setSortByCreatedAt}
        sortByResponseTime={sortByResponseTime}
        setSortByResponseTime={setSortByResponseTime}
      />
      {view === "List" ? (
        <ListView
          selectedTime={selectedTime}
          selectedMethod={selectedMethod}
          selectedResponse={selectedResponse}
          activeSort={activeSort}
          sortByCreatedAt={sortByCreatedAt}
          sortByResponseTime={sortByResponseTime}
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
          activeSort={activeSort}
          sortByCreatedAt={sortByCreatedAt}
          sortByResponseTime={sortByResponseTime}
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
