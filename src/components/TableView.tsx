import { Clock, MapPin, Zap } from "lucide-react";
import type { APICall } from "../types";

const TableView = ({
  selectedTime,
  selectedMethod,
  selectedResponse,
  activeSort,
  sortByCreatedAt,
  sortByResponseTime,
  onApiCallClick,
}: {
  selectedTime: string;
  selectedMethod: string;
  selectedResponse: string;
  activeSort: "createdAt" | "responseTime";
  sortByCreatedAt: "latest" | "oldest";
  sortByResponseTime: "fastest" | "slowest";
  onApiCallClick: (call: APICall) => void;
}) => {
  const allApiCalls = [
    {
      id: 1,
      method: "GET",
      status: 200,
      endpoint: "auth/register",
      responseTime: "25.26ms",
      location: "Senj, Croatia",
      timestamp: "30 min ago",
      hoursAgo: 0.5,
    },
    {
      id: 2,
      method: "POST",
      status: 201,
      endpoint: "api/users",
      responseTime: "34.12ms",
      location: "Zagreb, Croatia",
      timestamp: "45 min ago",
      hoursAgo: 0.75,
    },
    {
      id: 3,
      method: "GET",
      status: 404,
      endpoint: "api/products/999",
      responseTime: "18.45ms",
      location: "Split, Croatia",
      timestamp: "3 hours ago",
      hoursAgo: 3,
    },
    {
      id: 4,
      method: "PUT",
      status: 200,
      endpoint: "api/users/123",
      responseTime: "42.78ms",
      location: "Rijeka, Croatia",
      timestamp: "5 hours ago",
      hoursAgo: 5,
    },
    {
      id: 5,
      method: "DELETE",
      status: 204,
      endpoint: "api/products/456",
      responseTime: "21.33ms",
      location: "Osijek, Croatia",
      timestamp: "12 hours ago",
      hoursAgo: 12,
    },
    {
      id: 6,
      method: "PATCH",
      status: 200,
      endpoint: "api/users/profile",
      responseTime: "28.91ms",
      location: "Dubrovnik, Croatia",
      timestamp: "18 hours ago",
      hoursAgo: 18,
    },
    {
      id: 7,
      method: "POST",
      status: 500,
      endpoint: "api/payments",
      responseTime: "156.42ms",
      location: "Zadar, Croatia",
      timestamp: "20 hours ago",
      hoursAgo: 20,
    },
    {
      id: 8,
      method: "GET",
      status: 301,
      endpoint: "api/redirect",
      responseTime: "12.15ms",
      location: "Pula, Croatia",
      timestamp: "3 days ago",
      hoursAgo: 72,
    },
    {
      id: 9,
      method: "DELETE",
      status: 401,
      endpoint: "api/admin/users",
      responseTime: "8.22ms",
      location: "Varaždin, Croatia",
      timestamp: "5 days ago",
      hoursAgo: 120,
    },
    {
      id: 10,
      method: "POST",
      status: 422,
      endpoint: "api/validation",
      responseTime: "45.67ms",
      location: "Karlovac, Croatia",
      timestamp: "15 days ago",
      hoursAgo: 360,
    },
    {
      id: 11,
      method: "GET",
      status: 200,
      endpoint: "api/analytics",
      responseTime: "89.34ms",
      location: "Šibenik, Croatia",
      timestamp: "25 days ago",
      hoursAgo: 600,
    },
  ];

  const filterByTime = (call: APICall) => {
    const timeFilters: { [key: string]: number } = {
      "Last hour": 1,
      "Last 6 hours": 6,
      "Last 24h": 24,
      "Last 7 days": 168,
      "Last 30 days": 720,
    };
    const maxHours = timeFilters[selectedTime];
    return maxHours ? call.hoursAgo <= maxHours : true;
  };

  const filterByMethod = (call: APICall) => {
    if (selectedMethod === "All") return true;
    return call.method === selectedMethod;
  };

  const filterByResponse = (call: APICall) => {
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

  const filteredCalls = allApiCalls.filter(
    (call) =>
      filterByTime(call) && filterByMethod(call) && filterByResponse(call)
  );

  const apiCalls = [...filteredCalls].sort((a, b) => {
    if (activeSort === "createdAt") {
      return sortByCreatedAt === "latest"
        ? a.hoursAgo - b.hoursAgo
        : b.hoursAgo - a.hoursAgo;
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
        <div className="overflow-x-auto bg-tetriary rounded-2xl -mx-2 md:mx-0">
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
                      {call.endpoint}
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
                          {call.timestamp}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TableView;
