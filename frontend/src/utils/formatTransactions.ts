import { ITransactions } from "../types/ITransactions";

export const formatTransactions = (transactions: ITransactions[]) => {
  if (!transactions?.length) return;

  return transactions.reduce((acm, transaction) => {
    acm[transaction.nom_vendedor] = acm[transaction.nom_vendedor] || [];
    acm[transaction.nom_vendedor].push(transaction);

    return acm;
  }, {} as { [nom_vendedor: string]: ITransactions[] });
};