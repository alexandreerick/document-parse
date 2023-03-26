import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import './App.css'

import Dropzone from './components/Dropzone';
import TransactionsCard from './components/TransactionsCard';
import api from './services/api';
import { ITransactions } from './types/ITransactions';
import { formatTransactions } from './utils/formatTransactions';

interface ITransactionsByAffiliated { 
  [nom_vendedor: string]: ITransactions[];
}

function App() {
  const [loadingUploadFile, setLoadingUploadFile] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [transactions, setTransactions] = useState<ITransactionsByAffiliated>({} as ITransactionsByAffiliated);

  const onDragFile = async (file: File) => {
    setLoadingUploadFile(true);

    const data = new FormData();
    data.append('file', file);

    const responseUploadFile = await api.post("/transactions", data);

    if (responseUploadFile?.data?.failed) {
      setLoadingUploadFile(false);
      return toast(responseUploadFile?.data?.message, {
        type: "error",
      });
    }

    if (responseUploadFile.data?.length) {
      toast("Data uploaded successfully");
      const formatted = formatTransactions(responseUploadFile.data);
      if (formatted) {
        setTransactions(formatted);
      }
      setShowUploadInput(false);
    }

    setLoadingUploadFile(false);
  };

  const getTransactions = async () => {
    try {
      const response = await api.get<ITransactions[]>('/transactions');

      if (response.data?.length) {
        const formatted = formatTransactions(response.data);
        if (formatted) {
          setTransactions(formatted);
        }
        setShowUploadInput(false);
      }

    } catch (error) {
      console.log("error", error)
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="App">
      <h1>Parse your document</h1>
      {showUploadInput ? (
        <Dropzone onFileUploaded={onDragFile} loading={loadingUploadFile} />
      ) : (
        <button onClick={() => setShowUploadInput(true)}>Upload file</button>
      )}

      <div className='transactions-cards-container'>
        {Object.keys(transactions)?.length ? Object.keys(transactions).map(affiliated => (
          <TransactionsCard
          key={affiliated}
          transactions={transactions[affiliated]}
          nom_vendedor={affiliated}
        />
        )) : null}
      </div>
    </div>
  )
}

export default App
