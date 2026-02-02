const requestCounts = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const limit = parseInt(process.env.RATE_LIMIT_PER_MIN || '60', 10);
  const now = Date.now();
  const windowMs = 60 * 1000;

  const existing = requestCounts.get(identifier);

  if (!existing || now > existing.resetTime) {
    const resetTime = now + windowMs;
    requestCounts.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: existing.resetTime,
    };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetTime: existing.resetTime,
  };
}

export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': process.env.RATE_LIMIT_PER_MIN || '60',
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };
}

setInterval(() => {
  const now = Date.now();
  Array.from(requestCounts.entries()).forEach(([key, value]) => {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  });
}, 60000);
