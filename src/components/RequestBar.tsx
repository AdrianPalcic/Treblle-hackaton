import { ChevronsUpDown, ArrowUpDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const RequestBar = ({
  view,
  setView,
  selectedTime,
  setSelectedTime,
  selectedMethod,
  setSelectedMethod,
  selectedResponse,
  setSelectedResponse,
  activeSort,
  setActiveSort,
  sortByCreatedAt,
  setSortByCreatedAt,
  sortByResponseTime,
  setSortByResponseTime,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedMethod: string;
  setSelectedMethod: React.Dispatch<React.SetStateAction<string>>;
  selectedResponse: string;
  setSelectedResponse: React.Dispatch<React.SetStateAction<string>>;
  activeSort: "createdAt" | "responseTime";
  setActiveSort: React.Dispatch<
    React.SetStateAction<"createdAt" | "responseTime">
  >;
  sortByCreatedAt: "latest" | "oldest";
  setSortByCreatedAt: React.Dispatch<React.SetStateAction<"latest" | "oldest">>;
  sortByResponseTime: "fastest" | "slowest";
  setSortByResponseTime: React.Dispatch<
    React.SetStateAction<"fastest" | "slowest">
  >;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // UX
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeOptions = [
    "Last hour",
    "Last 6 hours",
    "Last 24h",
    "Last 7 days",
    "Last 30 days",
  ];

  const methodOptions = [
    { value: "All", color: "text-white" },
    { value: "GET", color: "text-blue-400" },
    { value: "POST", color: "text-green-400" },
    { value: "PUT", color: "text-yellow-400" },
    { value: "DELETE", color: "text-red-400" },
    { value: "PATCH", color: "text-purple-400" },
  ];

  const responseOptions = [
    { value: "All", color: "text-white" },
    { value: "2xx Success", color: "text-green-300" },
    { value: "3xx Redirect", color: "text-blue-300" },
    { value: "4xx Client Error", color: "text-yellow-300" },
    { value: "5xx Server Error", color: "text-red-300" },
  ];

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <section className="max-w-6xl mx-auto mb-4 relative z-50 px-4">
      <div className="bar w-full glass px-3 md:px-4 py-3 md:py-2 rounded-2xl md:rounded-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
          <h3 className="text-sm md:text-base">Requests </h3>
          <div
            className="flex flex-wrap gap-2 md:gap-4 items-center w-full md:w-auto"
            ref={dropdownRef}
          >
            <div className="view flex items-center p-1 rounded-full glass text-xs md:text-sm">
              <span
                onClick={() => setView("List")}
                className={`cursor-pointer py-1 px-2 md:px-4 rounded-full ${
                  view === "List" ? "bg-black" : ""
                }`}
              >
                List
              </span>
              <span
                onClick={() => setView("Table")}
                className={`cursor-pointer py-1 px-2 md:px-4 rounded-full ${
                  view === "Table" ? "bg-black" : ""
                }`}
              >
                Table
              </span>
            </div>

            <div className="relative">
              <div
                onClick={() => toggleDropdown("time")}
                className="tag flex items-center gap-1 py-1.5 md:py-2 px-2 md:px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors text-xs md:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">{selectedTime}</span>
                <span className="sm:hidden">
                  {selectedTime.replace("Last ", "")}
                </span>
                <ChevronsUpDown size={16} className="md:hidden" />
                <ChevronsUpDown size={20} className="hidden md:block" />
              </div>
              {openDropdown === "time" && (
                <div className="absolute top-full mt-2 right-0 tag bg-tetriary rounded-xl p-2 min-w-[150px] z-[1000]">
                  {timeOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSelectedTime(option);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${
                        selectedTime === option ? "bg-white/10" : ""
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => toggleDropdown("method")}
                className="tag flex items-center gap-1 py-1.5 md:py-2 px-2 md:px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors text-xs md:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">
                  Method: {selectedMethod}
                </span>
                <span className="sm:hidden">{selectedMethod}</span>
                <ChevronsUpDown size={16} className="md:hidden" />
                <ChevronsUpDown size={20} className="hidden md:block" />
              </div>
              {openDropdown === "method" && (
                <div className="absolute top-full mt-2 right-0 tag bg-tetriary rounded-xl p-2 min-w-[150px] z-[1000]">
                  {methodOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelectedMethod(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${
                        selectedMethod === option.value ? "bg-white/10" : ""
                      } ${option.color}`}
                    >
                      {option.value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => toggleDropdown("response")}
                className="tag flex items-center gap-1 py-1.5 md:py-2 px-2 md:px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors text-xs md:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">
                  Response: {selectedResponse}
                </span>
                <span className="sm:hidden">
                  {selectedResponse
                    .replace(" Success", "")
                    .replace(" Redirect", "")
                    .replace(" Client Error", "")
                    .replace(" Server Error", "")}
                </span>
                <ChevronsUpDown size={16} className="md:hidden" />
                <ChevronsUpDown size={20} className="hidden md:block" />
              </div>
              {openDropdown === "response" && (
                <div className="absolute top-full mt-2 right-0 tag bg-tetriary rounded-xl p-2 min-w-[180px] z-[1000]">
                  {responseOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSelectedResponse(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${
                        selectedResponse === option.value ? "bg-white/10" : ""
                      } ${option.color}`}
                    >
                      {option.value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setActiveSort("createdAt");
                setSortByCreatedAt(
                  sortByCreatedAt === "latest" ? "oldest" : "latest"
                );
              }}
              className="tag flex items-center gap-1 py-1.5 md:py-2 px-2 md:px-4 rounded-full cursor-pointer bg-fourth hover:bg-fifth transition-colors text-xs md:text-sm whitespace-nowrap "
            >
              <ArrowUpDown size={16} className="md:hidden" />
              <ArrowUpDown size={18} className="hidden md:block" />
              <span className="hidden sm:inline">
                {sortByCreatedAt === "latest" ? "Latest" : "Oldest"}
              </span>
              <span className="sm:hidden">
                {sortByCreatedAt === "latest" ? "New" : "Old"}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSort("responseTime");
                setSortByResponseTime(
                  sortByResponseTime === "fastest" ? "slowest" : "fastest"
                );
              }}
              className="tag flex items-center gap-1 py-1.5 md:py-2 px-2 md:px-4 rounded-full cursor-pointer bg-fourth hover:bg-fifth transition-colors text-xs md:text-sm whitespace-nowrap "
            >
              <ArrowUpDown size={16} className="md:hidden" />
              <ArrowUpDown size={18} className="hidden md:block" />
              <span className="hidden sm:inline">
                {sortByResponseTime === "fastest" ? "Fastest" : "Slowest"}
              </span>
              <span className="sm:hidden">
                {sortByResponseTime === "fastest" ? "Fast" : "Slow"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestBar;
