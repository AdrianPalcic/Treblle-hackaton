import { Clock, MapPin, Zap } from "lucide-react";
import type { APIResponse } from "../types";
import { getTimeDifference } from "../utils";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const TableView = ({
  responses,
  selectedTime,
  selectedMethod,
  selectedResponse,
  activeSort,
  sortByCreatedAt,
  sortByResponseTime,
  currentPage,
  onPageChange,
  onApiCallClick,
}: {
  responses: APIResponse[];
  selectedTime: string;
  selectedMethod: string;
  selectedResponse: string;
  activeSort: "createdAt" | "responseTime";
  sortByCreatedAt: "latest" | "oldest";
  sortByResponseTime: "fastest" | "slowest";
  currentPage: number;
  onPageChange: (page: number) => void;
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
    if (selectedResponse === "Success")
      return call.status >= 200 && call.status < 300;
    if (selectedResponse === "Redirect")
      return call.status >= 300 && call.status < 400;
    if (selectedResponse === "Client Error")
      return call.status >= 400 && call.status < 500;
    if (selectedResponse === "Server Error")
      return call.status >= 500 && call.status < 600;
    return true;
  };

  const filteredCalls = responses.filter(
    (call) =>
      filterByTime(call) && filterByMethod(call) && filterByResponse(call)
  );

  const sortedCalls = [...filteredCalls].sort((a, b) => {
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

  // Pagination logic
  const totalPages = Math.ceil(sortedCalls.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const apiCalls = sortedCalls.slice(startIndex, endIndex);

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
        <div className="overflow-x-auto bg-tetriary rounded-2xl -mx-2 md:mx-0 mb-2">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Method
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Status
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Endpoint
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Response
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm hidden lg:table-cell">
                  Location
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {apiCalls.length < 1 ? (
                <tr>
                  <td colSpan={6} className="py-8 md:py-12 px-4 text-center">
                    <p className="text-lg md:text-xl text-white/60 font-light">
                      No requests match your filters
                    </p>
                    <p className="text-xs md:text-sm text-white/40 mt-2">
                      Try adjusting your filter parameters
                    </p>
                  </td>
                </tr>
              ) : (
                apiCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => onApiCallClick(call)}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <div
                        className={`method py-1 px-2 md:px-3 rounded-full text-[11px] md:text-[14px] font-semibold w-fit ${getMethodColor(
                          call.method
                        )}`}
                      >
                        {call.method}
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <div
                        className={`response py-1 px-2 md:px-3 rounded-full text-[11px] md:text-[14px] font-semibold w-fit ${getStatusColor(
                          call.status
                        )}`}
                      >
                        {call.status}
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4 text-white/90 text-xs md:text-sm">
                      api/{call.endpoint}
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <span className="flex gap-1 items-center font-extralight text-[11px] md:text-[14px]">
                        <Zap size={14} className="text-white/60 md:hidden" />
                        <Zap
                          size={18}
                          className="text-white/60 hidden md:block"
                        />
                        <span className="hidden sm:inline">
                          {call.responseTime}
                        </span>
                        <span className="sm:hidden">
                          {call.responseTime.replace("ms", "")}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                      <span className="flex gap-1 items-center font-extralight text-[14px]">
                        <MapPin size={18} className="text-white/60" />
                        {call.location}
                      </span>
                    </td>
                    <td className="py-3 md:py-4 px-2 md:px-4">
                      <span className="flex gap-1 items-center font-extralight text-[11px] md:text-[14px]">
                        <Clock size={14} className="text-white/60 md:hidden" />
                        <Clock
                          size={18}
                          className="text-white/60 hidden md:block"
                        />
                        <span className="whitespace-nowrap">
                          {getTimeDifference(call.createdAt).display}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
};

export default TableView;
