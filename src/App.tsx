import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import RequestBar from "./components/RequestBar";
import { useState } from "react";

function App() {
  const [view, setView] = useState("List");

  return (
    <main>
      <Navbar />
      <Hero />
      <RequestBar view={view} setView={setView} />
    </main>
  );
}

export default App;
