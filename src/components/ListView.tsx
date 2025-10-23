import { Clock, MapPin, Zap } from "lucide-react";

const ListView = ({
  selectedTime,
  selectedMethod,
  selectedResponse,
}: {
  selectedTime: string;
  selectedMethod: string;
  selectedResponse: string;
}) => {
  const allApiCalls = [
    // Last hour
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
    // Last 6 hours
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
    // Last 24h
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
    // Last 7 days
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
    // Last 30 days
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

  // Filter by time period
  const filterByTime = (call: typeof allApiCalls[0]) => {
    const timeFilters: { [key: string]: number } = {
      "Last hour": 1,
      "Last 6 hours": 6,
      "Last 24h": 24,
      "Last 7 days": 168, // 7 * 24
      "Last 30 days": 720, // 30 * 24
    };
    const maxHours = timeFilters[selectedTime];
    return maxHours ? call.hoursAgo <= maxHours : true;
  };

  // Filter by method
  const filterByMethod = (call: typeof allApiCalls[0]) => {
    if (selectedMethod === "All") return true;
    return call.method === selectedMethod;
  };

  // Filter by response status
  const filterByResponse = (call: typeof allApiCalls[0]) => {
    if (selectedResponse === "All") return true;
    if (selectedResponse === "2xx Success") return call.status >= 200 && call.status < 300;
    if (selectedResponse === "3xx Redirect") return call.status >= 300 && call.status < 400;
    if (selectedResponse === "4xx Client Error") return call.status >= 400 && call.status < 500;
    if (selectedResponse === "5xx Server Error") return call.status >= 500 && call.status < 600;
    return true;
  };

  // Apply all filters
  const apiCalls = allApiCalls.filter(
    (call) => filterByTime(call) && filterByMethod(call) && filterByResponse(call)
  );

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
    <section className="max-w-6xl mx-auto ">
      <div className="glass p-3">
        <div id="requests" className="flex flex-col gap-2 w-full">
          {apiCalls.length < 1 ? (
            <div className="py-12 px-4 w-full text-center">
              <p className="text-xl text-white/60 font-light">
                No requests match your filters
              </p>
              <p className="text-sm text-white/40 mt-2">
                Try adjusting your filter parameters
              </p>
            </div>
          ) : (
            apiCalls.map((call) => (
              <div
                key={call.id}
                id="request"
                className="py-4 px-2 w-full bg-tetriary/30 rounded-2xl request-border flex justify-between items-center gap-4 hover:bg-white/5 cursor-pointer"
              >
                <div className="flex-1 ">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <div
                        className={`method py-1 px-3 rounded-full text-[16px] font-semibold ${getMethodColor(
                          call.method
                        )}`}
                      >
                        {call.method}
                      </div>
                      <div
                        className={`response py-1 px-3 rounded-full text-[16px] font-semibold ${getStatusColor(
                          call.status
                        )}`}
                      >
                        {call.status}
                      </div>
                      <span>{call.endpoint}</span>
                    </div>
                    <div className="flex gap-3 items-center mt-2">
                      <span className="flex gap-1 items-center font-extralight text-[14px]">
                        <Zap size={18} className="text-white/60" />
                        {call.responseTime}
                      </span>
                      <span className="flex gap-1 items-center font-extralight text-[14px]">
                        <MapPin size={18} className="text-white/60" />
                        {call.location}
                      </span>
                      <span className="flex gap-1 items-center font-extralight text-[14px]">
                        <Clock size={18} className="text-white/60" />
                        {call.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 border border-solid border-white"></div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ListView;
