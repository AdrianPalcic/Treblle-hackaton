
const Hero = () => {
  return (
    <section id="hero" className="px-4">
      <div className="max-w-6xl flex flex-col h-[70vh] md:h-[80vh] mx-auto justify-center">
        <div className="glass w-fit mx-auto p-2 rounded-full text-[12px] sm:text-[14px] border-0!">
          <span className="py-1 px-2 bg-primary rounded-full">New</span> Live
          Performance Boosts
        </div>
        <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-michroma font-light tracking-widest leading-[1.6] my-2 px-4">
          Smarter API Performance <br className="hidden sm:block" /> Real-Time Insights
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-extralight px-4 max-w-3xl mx-auto">
          RunTime AI monitors, analyzes, and optimizes your API's so you can
          focus on building - not debugging
        </p>
        <button className="button-secondary glass transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.15)] hover:scale-105 text-sm sm:text-base md:text-lg">
          Start Monitoring Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
