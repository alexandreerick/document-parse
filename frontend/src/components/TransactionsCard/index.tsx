import { useMemo } from 'react';
import { ITransactions } from "../../types/ITransactions";

import "./styles.css";

interface ITransactionsCardProps {
  nom_vendedor: string;
  transactions: ITransactions[];
}

const TransactionsCard = ({ nom_vendedor, transactions }: ITransactionsCardProps) => {

  const total = useMemo(() => {
    return transactions.reduce((acm, act) => {
      return acm + act.num_valor
    }, 0);
  }, []);

  return (
    <div className="card-container">
      <p className="affiliated-text">Affiliated: {nom_vendedor}</p>

      {transactions.map(transaction => (
        <div
          key={transaction.seq_transacao}
          className="transaction-container"
        >
          <p>{transaction.nom_produto}</p>
          <p>{transaction.num_valor}</p>
        </div>
      ))}

      <div>
        <p>Total: {total}</p>
      </div>
    </div>
  )
}

export default TransactionsCard;