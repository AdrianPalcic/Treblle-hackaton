import {
  Clock,
  MapPin,
  Zap,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";
import type { Problem } from "../types";
import { getTimeDifference } from "../utils";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const ProblemsTableView = ({
  problems,
  selectedTime,
  selectedType,
  selectedMethod,
  activeSort,
  sortByCreatedAt,
  sortByResponseTime,
  currentPage,
  onPageChange,
  onProblemClick,
}: {
  problems: Problem[];
  selectedTime: string;
  selectedType: string;
  selectedMethod: string;
  activeSort: "createdAt" | "responseTime" | "severity";
  sortByCreatedAt: "latest" | "oldest";
  sortByResponseTime: "fastest" | "slowest";
  currentPage: number;
  onPageChange: (page: number) => void;
  onProblemClick: (problem: Problem) => void;
}) => {
  const filterByTime = (problem: Problem) => {
    const timeFilters: { [key: string]: number } = {
      "Last hour": 1,
      "Last 6 hours": 6,
      "Last 24h": 24,
      "Last 7 days": 168,
      "Last 30 days": 720,
    };
    const maxHours = timeFilters[selectedTime];
    const timeDiff = getTimeDifference(problem.createdAt);
    return maxHours ? timeDiff.hours <= maxHours : true;
  };

  const filterByType = (problem: Problem) => {
    if (selectedType === "All") return true;
    return problem.type === selectedType.toLowerCase();
  };

  const filterByMethod = (problem: Problem) => {
    if (selectedMethod === "All") return true;
    return problem.method === selectedMethod;
  };

  const filteredProblems = problems.filter(
    (problem) =>
      filterByTime(problem) &&
      filterByType(problem) &&
      filterByMethod(problem)
  );

  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (activeSort === "createdAt") {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortByCreatedAt === "latest" ? bTime - aTime : aTime - bTime;
    } else if (activeSort === "responseTime") {
      const parseResponseTime = (time: string) =>
        parseFloat(time.replace("ms", ""));
      const aTime = parseResponseTime(a.responseTime);
      const bTime = parseResponseTime(b.responseTime);
      return sortByResponseTime === "fastest" ? aTime - bTime : bTime - aTime;
    } else {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
  });

  const totalPages = Math.ceil(sortedProblems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedProblems = sortedProblems.slice(startIndex, endIndex);

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

  const getSeverityConfig = (severity: string) => {
    const configs: {
      [key: string]: {
        color: string;
        icon: typeof AlertCircle;
        bg: string;
      };
    } = {
      high: {
        color: "text-red-400",
        icon: AlertCircle,
        bg: "bg-red-500/20 text-red-400",
      },
      medium: {
        color: "text-yellow-400",
        icon: AlertTriangle,
        bg: "bg-yellow-500/20 text-yellow-400",
      },
      low: {
        color: "text-blue-400",
        icon: Info,
        bg: "bg-blue-500/20 text-blue-400",
      },
    };
    return configs[severity] || configs.low;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      error: "bg-red-500/20 text-red-400",
      slow: "bg-orange-500/20 text-orange-400",
      critical: "bg-purple-500/20 text-purple-400",
    };
    return colors[type] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="glass p-2 md:p-3">
        <div className="overflow-x-auto bg-tetriary rounded-2xl -mx-2 md:mx-0 mb-2">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Severity
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Type
                </th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-white/80 text-xs md:text-sm">
                  Method
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
              {displayedProblems.length < 1 ? (
                <tr>
                  <td colSpan={7} className="py-8 md:py-12 px-4 text-center">
                    <p className="text-lg md:text-xl text-white/60 font-light">
                      No problems match your filters
                    </p>
                    <p className="text-xs md:text-sm text-white/40 mt-2">
                      Great! Your API is performing well
                    </p>
                  </td>
                </tr>
              ) : (
                displayedProblems.map((problem) => {
                  const SeverityIcon = getSeverityConfig(problem.severity).icon;
                  return (
                    <tr
                      key={problem.id}
                      onClick={() => onProblemClick(problem)}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <div className="flex items-center gap-1.5">
                          <SeverityIcon
                            size={16}
                            className={getSeverityConfig(problem.severity).color}
                          />
                          <div
                            className={`py-1 px-2 md:px-3 rounded-full text-[11px] md:text-[13px] font-semibold w-fit ${
                              getSeverityConfig(problem.severity).bg
                            }`}
                          >
                            {problem.severity.toUpperCase()}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <div
                          className={`py-1 px-2 md:px-3 rounded-full text-[11px] md:text-[13px] font-semibold w-fit ${getTypeColor(
                            problem.type
                          )}`}
                        >
                          {problem.type.toUpperCase()}
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <div
                          className={`py-1 px-2 md:px-3 rounded-full text-[11px] md:text-[14px] font-semibold w-fit ${getMethodColor(
                            problem.method
                          )}`}
                        >
                          {problem.method}
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-white/90 text-xs md:text-sm">
                        api/{problem.endpoint}
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <span className="flex gap-1 items-center font-extralight text-[11px] md:text-[14px]">
                          <Zap size={14} className="text-white/60 md:hidden" />
                          <Zap
                            size={18}
                            className="text-white/60 hidden md:block"
                          />
                          <span className="hidden sm:inline">
                            {problem.responseTime}
                          </span>
                          <span className="sm:hidden">
                            {problem.responseTime.replace("ms", "")}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                        <span className="flex gap-1 items-center font-extralight text-[14px]">
                          <MapPin size={18} className="text-white/60" />
                          {problem.location}
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
                            {getTimeDifference(problem.createdAt).display}
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })
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

export default ProblemsTableView;

