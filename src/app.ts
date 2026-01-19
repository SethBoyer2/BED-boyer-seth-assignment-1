import express, { Express } from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";
// import { assert } from "node:console";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (request, response) => {
    response.send("Hello, World!");
});

app.get("/api/v1/health", (request, response) => {
    response.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});


app.get("/api/v1/performance", (request, response) => {
    const initialInvestmentInput = request.query.initialInvestment
    const currentValueInput = request.query.currentValue

    const initialInvestment = Number(initialInvestmentInput)
    const currentValue = Number(currentValueInput)

    let output: any = calculatePortfolioPerformance(initialInvestment, currentValue)
    response.json({
        output
    })
})




export default app;