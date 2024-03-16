# Long And Short Polling

```js
const express = require("express");
const app = express();
const PORT = 3000;

// Simulated function to fetch stock data (takes time)
const fetchStockData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        value: ["this", "is", "test", "data"],
        message: "This data is coming from 3rd party api",
      };
      resolve(data);
    }, 3000); // Simulated delay of 3 seconds
  });
};

// # Endpoint for short polling
app.get("/short-polling", async (req, res) => {
  try {
    // Fetch the latest stock data
    const data = await fetchStockData();
    // Return the fetched data
    res.json(data);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

/**
 * ################# ------------------------- ###################
 * ------------------- ****Long Polling**** ----------------------
 * ################# ------------------------- ###################
 */

// Keep track of long-polling clients
let longPollingClients = [];

/**
 * `handleLongPolling` - Function to handle long-polling requests
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const handleLongPolling = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    // Set timeout for long polling
    const timeout = setTimeout(() => {
      // Remove the client from the array
      longPollingClients = longPollingClients.filter(
        (client) => client !== res
      );

      // Send an processing message response if no data is available after 10 seconds
      resolve({
        message: "Data still processing",
      });
    }, 10000); // Timeout after 10 seconds

    // Fetch the latest stock data
    const data = await fetchStockData();

    // Clear the timeout if data is available before timeout
    clearTimeout(timeout);

    // Return the fetched data
    resolve(data);
  });
};

// # Long polling endpoint
app.get("/long-polling", async (req, res) => {
  try {
    // Push the client's response object to the array
    longPollingClients.push(res);

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // Call the handleLongPolling function
    const response = await handleLongPolling(req, res);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

/**
 * Function to notify long-polling clients when new data is available
 *
 */
const notifyClients = async () => {
  try {
    // Fetch the latest stock data
    const data = await fetchStockData();
    // Notify long-polling clients
    longPollingClients.forEach((client) => {
      client.json(data);
      client.end();
    });
    // Clear the array after notifying clients
    longPollingClients = [];
  } catch (error) {
    console.error("Failed to notify clients:", error);
  }
};

// Route to trigger data update
app.post("/update-data", async (req, res) => {
  try {
    // Simulate data update process
    // For demonstration purposes, let's assume data is updated instantly
    await notifyClients();
    res.send("Data updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```
