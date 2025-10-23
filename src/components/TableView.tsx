import { Clock, MapPin, Zap } from "lucide-react";

const TableView = () => {
  const apiCalls = [
    {
      id: 1,
      method: "GET",
      status: 200,
      endpoint: "auth/register",
      responseTime: "25.26ms",
      location: "Senj, Croatia",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      method: "POST",
      status: 201,
      endpoint: "api/users",
      responseTime: "34.12ms",
      location: "Zagreb, Croatia",
      timestamp: "2:35 PM",
    },
    {
      id: 3,
      method: "GET",
      status: 200,
      endpoint: "api/products",
      responseTime: "18.45ms",
      location: "Split, Croatia",
      timestamp: "2:36 PM",
    },
    {
      id: 4,
      method: "PUT",
      status: 200,
      endpoint: "api/users/123",
      responseTime: "42.78ms",
      location: "Rijeka, Croatia",
      timestamp: "2:37 PM",
    },
    {
      id: 5,
      method: "DELETE",
      status: 204,
      endpoint: "api/products/456",
      responseTime: "21.33ms",
      location: "Osijek, Croatia",
      timestamp: "2:38 PM",
    },
  ];

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
      <div className="glass p-6 ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Method
                </th>
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Endpoint
                </th>
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Response Time
                </th>
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-semibold text-white/80">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {apiCalls.map((call) => (
                <tr
                  key={call.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div
                      className={`method py-1 px-3 rounded-full text-[14px] font-semibold w-fit ${getMethodColor(
                        call.method
                      )}`}
                    >
                      {call.method}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className={`response py-1 px-3 rounded-full text-[14px] font-semibold w-fit ${getStatusColor(
                        call.status
                      )}`}
                    >
                      {call.status}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/90">{call.endpoint}</td>
                  <td className="py-4 px-4">
                    <span className="flex gap-1 items-center font-extralight text-[14px]">
                      <Zap size={18} className="text-white/60" />
                      {call.responseTime}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex gap-1 items-center font-extralight text-[14px]">
                      <MapPin size={18} className="text-white/60" />
                      {call.location}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex gap-1 items-center font-extralight text-[14px]">
                      <Clock size={18} className="text-white/60" />
                      {call.timestamp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TableView;
