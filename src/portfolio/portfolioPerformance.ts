interface performanceOutput {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number,
): performanceOutput {
  const profitOrLoss = currentValue - initialInvestment;

  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  let performanceSummary: string;

  switch (true) {
    case percentageChange >= 30:
      performanceSummary = `The portfolio has gained significantly with a profit of $${profitOrLoss}.`;
      break;

    case percentageChange >= 10:
      performanceSummary = `The portfolio has had solid gains with a profit of $${profitOrLoss}.`;
      break;

    case percentageChange > 0:
      performanceSummary = `The portfolio has seen modest gains with a profit of $${profitOrLoss}.`;
      break;

    case percentageChange == 0:
        performanceSummary = `The portfolio has broken even.`
        break;


    case percentageChange >= -10:
      performanceSummary = `The portfolio has seen minor losses, with a loss of $${profitOrLoss}.`;
      break;

    default:
      performanceSummary = `The portfolio has seen significant losses, with a loss of $${profitOrLoss}.`;
      break;
  }

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}

// What endpoint URL structure is used -
// Query parameters

// What input parameters the endpoint expects -
// Initial Investment & Current value

// What fields are returned in the response -
// Initial Investment, Current value, Profit or loss, Percentage change, performance summary

// What calculations produce those results -
// Current value - Initial Investment = Profit/loss

// What different summary messages exist and when each one appears -
// (EQGT30) =>30% = Excellent,
// (EQGT10) =>10% = Solid,
// (GT0) >0% = Modest,
// 0 = No Change,
// (EQGT) =>-10% = Minor Loss,
// (LT) <-10% = Significant loss

// My implementation Must:
// Take query params of initial invest and current val
// Return init invest, current val, profit or loss, percent change, performance summary
// Calculate profit/loss
// Provide feedback based on percent change
