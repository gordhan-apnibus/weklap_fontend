import React, { useState } from 'react';
import axios from 'axios';
import './CsvUploader.css';


function CsvUploader() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await axios.post('http://localhost:8000/excel/convert_csv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getDeveloperStatus = (tasks) => {
      const numTasks = tasks.filter((task) => task !== null).length;
      if (numTasks >= 5) {
        return 'Developer Fully Occupied';
      } else if (numTasks >= 3) {
        return 'Occupancy is average';
      } else if (numTasks >= 1) {
        return 'You can assign a new task, workload is very minimum';
      } else {
        return 'Totally Free, assign anything';
      }
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.uploadContainer}>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button style={styles.uploadButton} onClick={handleUpload}>
            Upload
          </button>
        </div>
        {data && (
          <div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Developer</th>
                  <th>Task 1</th>
                  <th>Task 2</th>
                  <th>Task 3</th>
                  <th>Task 4</th>
                  <th>Task 5</th>
                  <th>Task 6</th>
                  <th>Task 7</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    {data[key].map((task, index) => (
                      <td key={index}>{task}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Developer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{getDeveloperStatus(data[key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  uploadButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
    marginLeft: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    borderCollapse: 'collapse',
    width: '80%',
    marginTop: '20px',
  },
  th: {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
};

export default CsvUploader;
