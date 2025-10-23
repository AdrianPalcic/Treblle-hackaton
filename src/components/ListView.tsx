import { Clock, MapPin, Zap } from "lucide-react";
import type { APIResponse } from "../types";
import Chart from "./Chart";
import { getTimeDifference } from "../utils";

const ListView = ({
  responses,
  selectedTime,
  selectedMethod,
  selectedResponse,
  activeSort,
  sortByCreatedAt,
  sortByResponseTime,
  onApiCallClick,
}: {
  responses: APIResponse[];
  selectedTime: string;
  selectedMethod: string;
  selectedResponse: string;
  activeSort: "createdAt" | "responseTime";
  sortByCreatedAt: "latest" | "oldest";
  sortByResponseTime: "fastest" | "slowest";
  onApiCallClick: (call: APIResponse) => void;
}) => {
  const filterByTime = (call: APIResponse) => {
    const timeFilters: { [key: string]: number } = {
      "Last hour": 1,
      "Last 6 hours": 6,
      "Last 24h": 24,
      "Last 7 days": 168,
      "Last 30 days": 720,
    };
    const maxHours = timeFilters[selectedTime];
    const timeDiff = getTimeDifference(call.createdAt);
    return maxHours ? timeDiff.hours <= maxHours : true;
  };

  const filterByMethod = (call: APIResponse) => {
    if (selectedMethod === "All") return true;
    return call.method === selectedMethod;
  };

  const filterByResponse = (call: APIResponse) => {
    if (selectedResponse === "All") return true;
    if (selectedResponse === "2xx Success")
      return call.status >= 200 && call.status < 300;
    if (selectedResponse === "3xx Redirect")
      return call.status >= 300 && call.status < 400;
    if (selectedResponse === "4xx Client Error")
      return call.status >= 400 && call.status < 500;
    if (selectedResponse === "5xx Server Error")
      return call.status >= 500 && call.status < 600;
    return true;
  };

  const filteredCalls = responses.filter(
    (call) =>
      filterByTime(call) && filterByMethod(call) && filterByResponse(call)
  );

  const apiCalls = [...filteredCalls].sort((a, b) => {
    if (activeSort === "createdAt") {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortByCreatedAt === "latest"
        ? bTime - aTime
        : aTime - bTime;
    } else {
      const parseResponseTime = (time: string) =>
        parseFloat(time.replace("ms", ""));
      const aTime = parseResponseTime(a.responseTime);
      const bTime = parseResponseTime(b.responseTime);

      return sortByResponseTime === "fastest" ? aTime - bTime : bTime - aTime;
    }
  });

  const getMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      GET: "bg-blue-500/20 text-blue-400",
      POST: "bg-green-500/20 text-green-400",
      PUT: "bg-yellow-500/20 text-yellow-400",
      DELETE: "bg-red-500/20 text-red-400",
      PATCH: "bg-purple-500/20 text-purple-400",
    };
    return colors[method] || "bg-gray-500/20 text-gray-400";
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-400/20 text-green-300";
    if (status >= 300 && status < 400) return "bg-blue-400/20 text-blue-300";
    if (status >= 400 && status < 500)
      return "bg-yellow-400/20 text-yellow-300";
    return "bg-red-400/20 text-red-300";
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="glass p-2 md:p-3">
        <div id="requests" className="flex flex-col gap-2 w-full">
          {apiCalls.length < 1 ? (
            <div className="py-8 md:py-12 px-4 w-full text-center">
              <p className="text-lg md:text-xl text-white/60 font-light">
                No requests match your filters
              </p>
              <p className="text-xs md:text-sm text-white/40 mt-2">
                Try adjusting your filter parameters
              </p>
            </div>
          ) : (
            apiCalls.map((call) => (
              <div
                key={call.id}
                id="request"
                onClick={() => onApiCallClick(call)}
                className="py-3 md:py-4 px-2 md:px-3 w-full bg-tetriary/30 rounded-2xl request-border flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex-1 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center">
                      <div
                        className={`method py-1 px-2 md:px-3 rounded-full text-[13px] md:text-[16px] font-semibold ${getMethodColor(
                          call.method
                        )}`}
                      >
                        {call.method}
                      </div>
                      <div
                        className={`response py-1 px-2 md:px-3 rounded-full text-[13px] md:text-[16px] font-semibold ${getStatusColor(
                          call.status
                        )}`}
                      >
                        {call.status}
                      </div>
                      <span className="text-sm md:text-base truncate">
                        api/{call.endpoint}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                      <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                        <Zap size={16} className="text-white/60 md:hidden" />
                        <Zap
                          size={18}
                          className="text-white/60 hidden md:block"
                        />
                        {call.responseTime}
                      </span>
                      <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                        <MapPin size={16} className="text-white/60 md:hidden" />
                        <MapPin
                          size={18}
                          className="text-white/60 hidden md:block"
                        />
                        <span className="truncate max-w-[120px] md:max-w-none">
                          {call.location}
                        </span>
                      </span>
                      <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                        <Clock size={16} className="text-white/60 md:hidden" />
                        <Clock
                          size={18}
                          className="text-white/60 hidden md:block"
                        />
                        {getTimeDifference(call.createdAt).display}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block flex-1">
                  <Chart />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ListView;
