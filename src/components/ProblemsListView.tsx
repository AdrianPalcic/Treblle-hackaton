import { Clock, MapPin, Zap, AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { Problem } from "../types";
import { getTimeDifference } from "../utils";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const ProblemsListView = ({
  problems,
  selectedTime,
  selectedType,
  selectedSeverity,
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
  selectedSeverity: string;
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

  const filterBySeverity = (problem: Problem) => {
    if (selectedSeverity === "All") return true;
    return problem.severity === selectedSeverity.toLowerCase();
  };

  const filterByMethod = (problem: Problem) => {
    if (selectedMethod === "All") return true;
    return problem.method === selectedMethod;
  };

  const filteredProblems = problems.filter(
    (problem) =>
      filterByTime(problem) &&
      filterByType(problem) &&
      filterBySeverity(problem) &&
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
        <div id="problems" className="flex flex-col gap-2 w-full mb-2">
          {displayedProblems.length < 1 ? (
            <div className="py-8 md:py-12 px-4 w-full text-center">
              <p className="text-lg md:text-xl text-white/60 font-light">
                No problems match your filters
              </p>
              <p className="text-xs md:text-sm text-white/40 mt-2">
                Great! Your API is performing well
              </p>
            </div>
          ) : (
            displayedProblems.map((problem) => {
              const SeverityIcon = getSeverityConfig(problem.severity).icon;
              return (
                <div
                  key={problem.id}
                  onClick={() => onProblemClick(problem)}
                  className="py-3 md:py-4 px-2 md:px-3 w-full bg-tetriary/30 rounded-2xl request-border flex flex-col gap-3 hover:bg-white/5 cursor-pointer transition-all"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="flex items-center gap-1">
                        <SeverityIcon
                          size={18}
                          className={getSeverityConfig(problem.severity).color}
                        />
                        <div
                          className={`py-1 px-2 md:px-3 rounded-full text-[13px] md:text-[14px] font-semibold ${
                            getSeverityConfig(problem.severity).bg
                          }`}
                        >
                          {problem.severity.toUpperCase()}
                        </div>
                      </div>
                      <div
                        className={`py-1 px-2 md:px-3 rounded-full text-[13px] md:text-[14px] font-semibold ${getTypeColor(
                          problem.type
                        )}`}
                      >
                        {problem.type.toUpperCase()}
                      </div>
                      <div
                        className={`py-1 px-2 md:px-3 rounded-full text-[13px] md:text-[16px] font-semibold ${getMethodColor(
                          problem.method
                        )}`}
                      >
                        {problem.method}
                      </div>
                      <span className="text-sm md:text-base truncate">
                        api/{problem.endpoint}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs md:text-sm text-white/80">
                        {problem.errorMessage}
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                        <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                          <Zap size={16} className="text-white/60 md:hidden" />
                          <Zap
                            size={18}
                            className="text-white/60 hidden md:block"
                          />
                          {problem.responseTime}
                        </span>
                        <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                          <MapPin
                            size={16}
                            className="text-white/60 md:hidden"
                          />
                          <MapPin
                            size={18}
                            className="text-white/60 hidden md:block"
                          />
                          <span className="truncate max-w-[120px] md:max-w-none">
                            {problem.location}
                          </span>
                        </span>
                        <span className="flex gap-1 items-center font-extralight text-[12px] md:text-[14px]">
                          <Clock size={16} className="text-white/60 md:hidden" />
                          <Clock
                            size={18}
                            className="text-white/60 hidden md:block"
                          />
                          {getTimeDifference(problem.createdAt).display}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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

export default ProblemsListView;

