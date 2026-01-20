
/**
 * Interface representing the full output of the portfolio performance calculations
 */
interface performanceOutput {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

/**
 * Calculates the performance of a financial portfolio
 * @param initialInvestment - The starting capital in the portfolio
 * @param currentValue - The current capital in the portfolio
 * @returns JSON object holding portfolio data
 */
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number,
): performanceOutput {
  const profitOrLoss = currentValue - initialInvestment;

  // ternary operator used to cover edge case of initial investment being zero - prevents zero division errors
  const percentageChange =
   initialInvestment == 0 ? 0 : (profitOrLoss / initialInvestment) * 100;

  let performanceSummary: string;

  switch (true) {

    case percentageChange >= 50:
        performanceSummary = `Outstanding performance! Exception returns on your investment`
        break;

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


    case percentageChange >= -10 && percentageChange <0:
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
