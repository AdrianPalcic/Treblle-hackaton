import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <section id="hero">
        <div className="max-w-6xl flex flex-col h-[70vh] mx-auto justify-center">
          <div className="glass w-fit mx-auto p-2 rounded-full text-[14px] border-0!">
            <span className="py-1 px-2 bg-primary rounded-full">New</span> Live
            Performance Boosts
          </div>
          <h1 className="hero-heading text-5xl text-center font-michroma font-light tracking-widest leading-[1.6] my-2">
            Smarter API Performance <br /> Real-Time Insights
          </h1>
          <p className="text-center text-xl font-extralight">
            RunTime AI monitors, analyzes, and optimizes your API's so you can
            focus on building - not debugging
          </p>
          <button className="w-fit glass py-3 px-4 rounded-full mx-auto mt-4 text-[18px] font-light">
            Start Monitoring Now
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
