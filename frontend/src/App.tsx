import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import './App.css'

import Dropzone from './components/Dropzone';
import api from './services/api';
import { ITransactions } from './types/ITransactions';

function App() {
  const [loadingUploadFile, setLoadingUploadFile] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

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
      setTransactions(responseUploadFile.data);
    }

    setLoadingUploadFile(false);
  };

  const getTransactions = async () => {
    try {
      const response = await api.get<ITransactions[]>('/transactions');

      setTransactions(response.data);
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
      <Dropzone onFileUploaded={onDragFile} loading={loadingUploadFile} />

      <button>Upload file</button>
    </div>
  )
}

export default App
