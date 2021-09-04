/* eslint-disable camelcase */
export interface IPortfolioItem {
  fund_code: string;
  fund_return: string;
  fund_type: string;
  type: string;
  value: number;
  proportionOfOpenPositions?: string;
}

export interface IPorfolioListProps {
  fundsPortfolio: IPortfolioItem[];
}
