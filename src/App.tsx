import Hero from "./components/Hero";
import ListView from "./components/ListView";
import Navbar from "./components/Navbar";
import RequestBar from "./components/RequestBar";
import { useState } from "react";
import TableView from "./components/TableView";
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState("List");

  return (
    <main>
      <Navbar />
      <Hero />
      <RequestBar view={view} setView={setView} />
      {view === "List" ? <ListView /> : <TableView />}
      <Footer />
    </main>
  );
}

export default App;
