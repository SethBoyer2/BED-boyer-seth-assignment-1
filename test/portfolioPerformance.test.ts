import request, { Response } from "supertest";
import app from "../src/app";
import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("GET api/v1/performance", () => {
  it("should return all fields with valid information", async () => {
    const response: Response = await request(app).get("/api/v1/performance?initialInvestment=10000&currentValue=12000");
    expect(response.body).toEqual
      ({
        initialInvestment: 10000,
        currentValue: 12000,
        profitOrLoss: 2000,
        percentageChange: 20,
        performanceSummary: "The portfolio has has solid gains with a profit of $2000"
      });

  it("should return error 400 if fields are invalid", async () => {
    const response: Response = await request(app).get("/api/v1/performance?initialInvestment=&currentValue=hi")

  })
  });

  it("should return profit or loss calculation successfully", async () => {
    const testCase1 = calculatePortfolioPerformance(10000, 20000)

    expect(testCase1.profitOrLoss).toEqual(10000)
  });



});

