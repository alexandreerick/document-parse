import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileArrowUp, Spinner } from "@phosphor-icons/react";

import "./styles.css";

interface IDropzoneProps {
  onFileUploaded: (file: File) => void;
  loading: boolean;
}

const Dropzone = ({ onFileUploaded, loading = false }: IDropzoneProps) => {
  const maxSize = 60000;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.txt']
    },
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} required />
        <p>
          {loading ? (
            <Spinner size={32} color="#FFFFFF" weight="bold" className="loading-spin"/>
          ) : (
            <>
              <FileArrowUp weight="bold" color="#FFFFFF" />
              Drop your file here
              {isDragReject && " / File type invalid"}
              {isFileTooLarge && " / File too large!"}
            </>
          )}
        </p>
    </div>
  );
};

export default Dropzone;