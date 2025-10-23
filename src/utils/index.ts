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
