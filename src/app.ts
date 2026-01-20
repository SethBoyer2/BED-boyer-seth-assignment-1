import express, { Express } from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";
// import { assert } from "node:console";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (request, response) => {
  response.send("Hello, World!");
});

/**
 * API health check endpoint
 * @param path - API endpoint path
 * @returns - JSON response containing all the details of the health check
 */
app.get("/api/v1/health", (request, response) => {
  response.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

/**
 * Portfolio Performance endpoint
 * Converts initialInvestment and currentValue to Numbers after grabbing them from the query
 * @param path - API endpoint path
 * @returns - JSON response containing the full portfolio performance output
 * @throws - Error 400 if query parameters are invalid
 *
 */
app.get("/api/v1/performance", (request, response) => {
  const initialInvestmentInput = request.query.initialInvestment;
  const currentValueInput = request.query.currentValue;

  const initialInvestment = Number(initialInvestmentInput);
  const currentValue = Number(currentValueInput);

  if (Number.isNaN(initialInvestment) || Number.isNaN(currentValue)) {
    return response
      .status(400)
      .send({ error: "Error 400: Query parameter is invalid or NaN" });
  }

  let output: any = calculatePortfolioPerformance(
    initialInvestment,
    currentValue,
  );
  response.json(output);
});

export default app;
