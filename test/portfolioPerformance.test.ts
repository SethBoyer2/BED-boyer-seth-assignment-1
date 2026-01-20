import request, { Response } from "supertest";
import app from "../src/app";
import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("GET api/v1/performance", () => {
  it("should return all fields with valid information", async () => {
    // Arrange & Act
    const response: Response = await request(app).get(
      "/api/v1/performance?initialInvestment=10000&currentValue=12000",
    );

    // Assert
    expect(response.body).toEqual({
      initialInvestment: 10000,
      currentValue: 12000,
      profitOrLoss: 2000,
      percentageChange: 20,
      performanceSummary:
        "The portfolio has had solid gains with a profit of $2000.",
    });
  });

  it("should return error 400 if query params are invalid", async () => {
    // Arrange & Act
    const response: Response = await request(app).get(
      "/api/v1/performance?initialInvestment=&currentValue=hi",
    );

    // Assert
    expect(response.status).toBe(400);
  });

  it("should return profit or loss calculation successfully", async () => {
    // Arrange & Act
    const profitOrLossCheck = calculatePortfolioPerformance(10000, 20000);

    // Assert
    expect(profitOrLossCheck.profitOrLoss).toEqual(10000);
  });

  it("should tell you that you gained significantly on gains over 30%", async () => {
    // Arrange & Act
    const significantGainCheck = calculatePortfolioPerformance(10000, 14000);

    // Assert
    expect(significantGainCheck.performanceSummary).toEqual(
      "The portfolio has gained significantly with a profit of $4000.",
    );
  });

  it("should tell you that you have had modest gains over 0 but less than 10%", async () => {
    // Arrange & Act
    const modestGainCheck = calculatePortfolioPerformance(10000, 10500);

    // Assert
    expect(modestGainCheck.performanceSummary).toEqual(
      "The portfolio has seen modest gains with a profit of $500.",
    );
  });

  it("should tell you that you have seen minor losses under -10% loss", async () => {
    // Arrange & Act
    const minorLossCheck = calculatePortfolioPerformance(10000, 9000);

    // Assert
    expect(minorLossCheck.performanceSummary).toEqual(
      "The portfolio has seen minor losses, with a loss of $-1000.",
    );
  });

  it("should tell you that you've broken even on no gain or loss", async () => {
    // Arrange & Act
    const brokeEvenCheck = calculatePortfolioPerformance(10000, 10000);

    // Assert
    expect(brokeEvenCheck.performanceSummary).toEqual(
      "The portfolio has broken even.",
    );
  });
});
