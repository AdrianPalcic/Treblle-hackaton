const Navbar = () => {
  return (
    <header className="w-full mt-8 ">
      <nav className=" mx-auto max-w-6xl flex justify-between items-center glass py-3 px-4 rounded-full">
        <h1 className="text-lg font-extralight tracking-widest">RUNTIME</h1>
        <button className="py-3 px-4 bg-primary border border-solid border-primary-light rounded-full text-[14px] tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,32,122,0.5)] hover:border-primary-light/80">
          Start Monitoring Now
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
