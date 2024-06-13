import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


function GrerqUploadStatement() {
  const [excelFile, setExcelFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadIciciFile, setUploadIciciFile] = useState(null);
  const [uploadFibeFile, setUploadFibeFile] = useState(null);


  const onDropExcel = (acceptedFiles) => {
    setExcelFile(acceptedFiles[0]);
  };

  const onDropUpload = (acceptedFiles) => {
    setUploadFile(acceptedFiles[0]);
  };
  const onDropIcicicExcel = (acceptedFiles) => {
    setUploadIciciFile(acceptedFiles[0]);
  };
  const onDropFibeExcel = (acceptedFiles) => {
    setUploadFibeFile(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsExcel, getInputProps: getInputPropsExcel } = useDropzone({
    onDrop: onDropExcel,
    accept: '.xlsx', // Adjust to the accepted file type
    maxFiles: 1, // Allow only one file to be uploaded
  });

  const { getRootProps: getRootPropsUpload, getInputProps: getInputPropsUpload } = useDropzone({
    onDrop: onDropUpload,
    accept: '.xlsx',
    maxFiles: 1,
  });
  const { getRootProps: getRootPropsIciciExcel, getInputProps: getInputPropsIciciExcel } = useDropzone({
    onDrop: onDropIcicicExcel,
    accept: '.xlsx', // Adjust to the accepted file type
    maxFiles: 1, // Allow only one file to be uploaded
  });

  const { getRootProps: getRootPropsFibeExcel, getInputProps: getInputPropsFibeExcel } = useDropzone({
    onDrop: onDropFibeExcel,
    accept: '.xlsx', // Adjust to the accepted file type
    maxFiles: 1, // Allow only one file to be uploaded
  });


  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert('Please select an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);

    try {
      await axios.post('http://localhost:9000/api/propelled-statement', formData);
      alert('Excel file uploaded successfully!');
      setExcelFile(null)
    } catch (error) {
      console.error('Error uploading Excel file:', error.message);
      alert('Error uploading Excel file.');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', uploadFile);

    try {
      await axios.post('http://localhost:9000/api/greayquest-statement', formData);
      alert('File uploaded successfully!');
      setUploadFile(null)
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file.');
    }
  };

  const handleIciciExcelUpload = async () => {
    if (!uploadIciciFile) {
      alert('Please select an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', uploadIciciFile);

    try {
      await axios.post('http://localhost:9000/api/IciciBank/statement', formData);
      alert('Excel file uploaded successfully!');
      setUploadIciciFile(null)
    } catch (error) {
      console.error('Error uploading Excel file:', error.message);
      alert('Error uploading Excel file.');
    }
  }


  const handleIFibeExcelUpload = async () => {
    if (!uploadFibeFile) {
      alert('Please select an Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', uploadFibeFile);

    try {
      await axios.post('http://localhost:9000/api/Fibe-statement', formData);
      alert('Excel file uploaded successfully!');
      setUploadFibeFile(null)
    } catch (error) {
      console.error('Error uploading Excel file:', error.message);
      alert('Error uploading Excel file.');
    }
  }
  return (
    <div className="container mt-2 mb-5">
      <h6>Propelled Statement Excel File</h6>
      <div {...getRootPropsExcel()} style={dropzoneStyle}>
        <input {...getInputPropsExcel()} />
        <p className="btn btn-secondary">Drag and drop or click to select</p>
      </div>
      {excelFile && (
        <div>
          <p>Selected File: {excelFile.name}</p>
          <button className='btn btn-primary' onClick={handleExcelUpload}>Upload File</button>
        </div>
      )}

      <hr />

      <h6>Greayquest Statement Excel File</h6>
      <div {...getRootPropsUpload()} style={dropzoneStyle}>
        <input {...getInputPropsUpload()} />
        <p className="btn btn-secondary">Drag and drop or click to select</p>
      </div>
      {uploadFile && (
        <div>
          <p>Selected File: {uploadFile.name}</p>
          <button className='btn btn-primary' onClick={handleUpload}>Upload File</button>
        </div>
      )}
      <hr />
      <h6>Icici Bank Statement Excel File</h6>
      <div {...getRootPropsIciciExcel()} style={dropzoneStyle}>
        <input {...getInputPropsIciciExcel()} />
        <p className="btn btn-secondary">Drag and drop or click to select</p>
      </div>
      {uploadIciciFile && (
        <div>
          <p>Selected File: {uploadIciciFile.name}</p>
          <button className='btn btn-primary' onClick={handleIciciExcelUpload}>Upload File</button>
        </div>
      )}
      <hr />
      <h6>FiBi NBFC Statement Excel File</h6>
      <div {...getRootPropsFibeExcel()} style={dropzoneStyle}>
        <input {...getInputPropsFibeExcel()} />
        <p className="btn btn-secondary">Drag and drop or click to select</p>
      </div>
      {uploadFibeFile && (
        <div>
          <p>Selected File: {uploadFibeFile.name}</p>
          <button className='btn btn-primary' onClick={handleIFibeExcelUpload}>Upload File</button>
        </div>
      )}
    </div>
  );
}



const dropzoneStyle = {
  width: '70%',
  height: '90px',
  border: '2px dashed blue',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  margin: '18px auto',
};


export default GrerqUploadStatement;
