import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 100, // 100 requests per ip
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 10, // 10 login attempts per ip
  standardHeaders: true,
  legacyHeaders: false,
  message: {status:"error", message: "Too many login attempts, try again later."},
});