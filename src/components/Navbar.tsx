const Navbar = () => {
  return (
    <header className="w-full mt-4 md:mt-8 px-4">
      <nav className="mx-auto max-w-6xl flex justify-between items-center glass py-3 px-4 md:px-6 rounded-full">
        <h1 className="text-sm md:text-lg font-extralight tracking-widest">
          RUNTIME
        </h1>
        <button className="py-2 px-3 md:py-3 md:px-4 bg-primary border border-solid border-primary-light rounded-full text-[12px] md:text-[14px] tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,32,122,0.5)] hover:border-primary-light/80 whitespace-nowrap">
          <a href="#dashboard" className="w-fit mx-auto">
            <span className="hidden sm:inline">Start Monitoring Now</span>
          </a>
          <a href="#dashboard" className="w-fit mx-auto">
            <span className="sm:hidden">Start Now</span>
          </a>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
