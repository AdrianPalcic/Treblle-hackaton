const Hero = () => {
  return (
    <section id="hero" className="px-4 relative">
      <div
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[750px] rounded-full opacity-65 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #e1207a 0%, #ff6b35 35%, #f5348e 55%, transparent 75%)",
          animation: "float1 20s ease-in-out infinite, colorShift1 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[15%] right-[-10%] w-[680px] h-[720px] rounded-full opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #ff6b35 0%, #ff8c42 30%, #e1207a 55%, transparent 75%)",
          animation: "float2 25s ease-in-out infinite, colorShift2 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-5%] w-[800px] h-[850px] rounded-full opacity-75 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #9103eb 0%, #e1207a 38%, #ff6b35 65%, transparent 80%)",
          animation: "float3 22s ease-in-out infinite, colorShift3 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[5%] left-[-8%] w-[650px] h-[700px] rounded-full opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #ff8c42 0%, #9103eb 45%, #e1207a 75%, transparent 85%)",
          animation: "float4 28s ease-in-out infinite, colorShift4 16s ease-in-out infinite",
        }}
      />

      <div className="max-w-6xl flex flex-col h-[70vh] md:h-[80vh] mx-auto justify-center relative z-10">
        <div className="glass w-fit mx-auto p-2 rounded-full text-[12px] sm:text-[14px] border-0!">
          <span className="py-1 px-2 bg-primary rounded-full">New</span> Live
          Performance Boosts
        </div>
        <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-michroma font-light tracking-widest leading-[1.6] my-2 px-4">
          Smarter API Performance <br className="hidden sm:block" /> Real-Time
          Insights
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
