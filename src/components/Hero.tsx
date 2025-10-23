
const Hero = () => {
  return (
    <section id="hero">
      <div className="max-w-6xl flex flex-col h-[80vh] mx-auto justify-center">
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
        <button className="button-secondary glass transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.15)] hover:scale-105">
          Start Monitoring Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
