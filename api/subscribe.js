const rateLimitMap = new Map();

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";

  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap
    .get(ip)
    .filter((t) => now - t < RATE_LIMIT_WINDOW);

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length > MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests. Please wait.",
    });
  }

  const { email } = req.body;

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [Number(process.env.BREVO_LIST_ID)],
          updateEnabled: true,
          attributes: {},
        }),
      }
    );

    const data = await response.json();

    console.log("BREVO RESPONSE:", data);

    if (!response.ok) {
      if (data.code === "duplicate_parameter") {
        return res.status(200).json({
          success: true,
          message: "Already subscribed",
        });
      }

      return res.status(response.status).json({
        success: false,
        message: data.message || "Brevo error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}