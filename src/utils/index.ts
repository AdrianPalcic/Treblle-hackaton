import type {
  APIResponse,
  Problem,
  ProblemType,
  ProblemSeverity,
} from "../types";
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
  const SLOW_THRESHOLD = 400;
  const VERY_SLOW_THRESHOLD = 1000;
  let problemId = 1;

  apiResponses.forEach((response) => {
    const responseTimeMs = parseFloat(response.responseTime.replace("ms", ""));
    const isError = response.status >= 400;
    const isSlow = responseTimeMs >= SLOW_THRESHOLD;
    const isVerySlow = responseTimeMs >= VERY_SLOW_THRESHOLD;

    if (isError || isSlow) {
      let type: ProblemType;
      let severity: ProblemSeverity;
      let errorMessage: string;

      if (isError && isSlow) {
        type = "critical";
        severity = "high";
        const errorType = response.status >= 500 ? "Server error" : "Client error";
        const speedType = isVerySlow ? "very slow" : "slow";
        errorMessage = `${errorType} (${response.status}) with ${speedType} response time (${response.responseTime}) - endpoint may be experiencing issues`;
      } else if (isError) {
        type = "error";
        severity = response.status >= 500 ? "high" : "medium";
        errorMessage =
          response.status >= 500
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
        id: problemId++,
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
