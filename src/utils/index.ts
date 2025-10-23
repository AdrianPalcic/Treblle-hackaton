import type { APIResponse, Problem, ProblemType, ProblemSeverity } from '../types'
export const getTimeDifference = (timestamp: string) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return { display: `${diffMins} min ago`, hours: diffHours };
  } else if (diffHours < 24) {
    return {
      display: `${Math.floor(diffHours)} hours ago`,
      hours: diffHours,
    };
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return { display: `${diffDays} days ago`, hours: diffHours };
  }
};

export const detectProblems = (apiResponses: APIResponse[]): Problem[] => {
  const problems: Problem[] = [];
  const SLOW_THRESHOLD = 1000; // ms
  const VERY_SLOW_THRESHOLD = 2000; // ms

  apiResponses.forEach((response) => {
    const responseTimeMs = parseFloat(response.responseTime.replace("ms", ""));
    const isError = response.status >= 400;
    const isSlow = responseTimeMs >= SLOW_THRESHOLD;
    const isVerySlow = responseTimeMs >= VERY_SLOW_THRESHOLD;

    if (isError || isSlow) {
      let type: ProblemType;
      let severity: ProblemSeverity;
      let errorMessage: string | undefined;

      // Determine type and severity
      if (isError && isVerySlow) {
        type = "critical";
        severity = "high";
        errorMessage = `${response.status >= 500 ? "Server" : "Client"} error with very slow response`;
      } else if (isError) {
        type = "error";
        severity = response.status >= 500 ? "high" : "medium";
        errorMessage = response.status >= 500 
          ? "Server error - endpoint may be down"
          : "Client error - check request parameters";
      } else if (isVerySlow) {
        type = "slow";
        severity = "high";
        errorMessage = "Very slow response time detected";
      } else {
        type = "slow";
        severity = "medium";
        errorMessage = "Slow response time detected";
      }

      problems.push({
        id: response.id,
        type,
        severity,
        endpoint: response.endpoint,
        method: response.method,
        status: response.status,
        responseTime: response.responseTime,
        errorMessage,
        createdAt: response.createdAt,
        location: response.location,
        originalCallId: response.id,
      });
    }
  });

  return problems;
};
