// This code is generated courtesy of John Mackay 
// with the assistance of ChatGPT.
export default {
  async fetch(request, env) {
    try {
      // Extract required fields from the request
      const { cf } = request;
      const logEntry = {
        ClientCountry: cf?.country || "Unknown",
        ClientRequestURI: request.url,
        EdgeStartTimestamp: Date.now(),
      };

      // Convert log entry to JSON string
      const logData = JSON.stringify(logEntry) + "\n";

      // Generate a file name based on timestamp
      const fileName = `logs/${new Date().toISOString()}-${crypto.randomUUID()}.json`;

      // Write the log data to R2
      await env.R2_BUCKET.put(fileName, logData, {
        httpMetadata: {
          contentType: "application/json",
        },
      });

      // Redirect the client to the requested URL
      return fetch(request);
    } catch (error) {
      // Handle errors
      console.error("Error logging request:", error);
      return new Response("Error logging request", { status: 500 });
    }
  },
};
