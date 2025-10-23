import { ChevronsUpDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const RequestBar = ({
  view,
  setView,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("Last 24h");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedResponse, setSelectedResponse] = useState("All");

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
    <section className="max-w-6xl mx-auto mb-4 relative z-50">
      <div className="bar w-full glass px-4 py-2 rounded-full">
        <div className="flex items-center justify-between">
          <h3>Requests </h3>
          <div className="flex gap-4 items-center" ref={dropdownRef}>
            <div className="view flex items-center  p-1 rounded-full glass">
              <span
                onClick={() => setView("List")}
                className={`cursor-pointer py-1 px-4 rounded-full ${
                  view === "List" ? "bg-black" : ""
                }`}
              >
                List
              </span>
              <span
                onClick={() => setView("Table")}
                className={`cursor-pointer py-1 px-4 rounded-full ${
                  view === "Table" ? "bg-black" : ""
                }`}
              >
                Table
              </span>
            </div>

            <div className="relative">
              <div
                onClick={() => toggleDropdown("time")}
                className="tag flex items-center gap-1 py-2 px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors"
              >
                {selectedTime} <ChevronsUpDown size={20} />
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
                className="tag flex items-center gap-1 py-2 px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors"
              >
                Method: {selectedMethod} <ChevronsUpDown size={20} />
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

            {/* Response Dropdown */}
            <div className="relative">
              <div
                onClick={() => toggleDropdown("response")}
                className="tag flex items-center gap-1 py-2 px-4 bg-fourth rounded-full cursor-pointer hover:bg-fifth transition-colors"
              >
                Response: {selectedResponse} <ChevronsUpDown size={20} />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestBar;
