import { CurrencyCode } from 'types';
import { liveChain } from '@src/web3/connectors';
import { unique } from './helpersGeneral';
import { useWeb3React } from '@web3-react/core';

export function numberWithCommas(amount: number, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export const TotalCreditsWithValue = (ccPayments) => {
  let creditsReceived = 0;
  let totalWorth = 0;
  if (ccPayments) {
    ccPayments.map((payment) => {
      creditsReceived += payment.amount;
      totalWorth += payment.amount * payment.currency.contributorCreditClass.currentFunding;
    });

    return { creditsReceived, totalWorth };
  }
  return;
};

export const AddFinancialInvestmentsAmount = (investments) => {
  let totalAmount = 0;
  investments?.map((investment) => (totalAmount += investment.amount));
  return totalAmount;
};
