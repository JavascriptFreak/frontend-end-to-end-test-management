import React, { createContext, useState } from 'react';

export const TestResultsContext = createContext();

export function TestResultsProvider({ children }) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const runTests = async () => {
    if (!url || !file) {
      setError('Please provide both a URL and a design image.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('url', url);
    formData.append('design', file);

    try {
      const response = await fetch('http://localhost:3001/compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to run comparison. Please check the server and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestResultsContext.Provider
      value={{ url, setUrl, file, setFile, loading, error, results, runTests }}
    >
      {children}
    </TestResultsContext.Provider>
  );
}