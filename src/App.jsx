import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchScreen from './components/SearchScreen';
import './App.css';

function App() {
  const [uniqueId, setUniqueId] = useState('');

  return (
    <div className="App">
      <Header />
      {uniqueId ? (
        <Dashboard uniqueId={uniqueId} />
      ) : (
        <SearchScreen onUniqueIdChange={setUniqueId} />
      )}
      <Footer />
    </div>
  );
}

export default App;