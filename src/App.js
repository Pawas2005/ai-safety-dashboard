import React, { useState } from 'react';
import mockIncidents from './data';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import './index.css';

function App() {
  const [incidents, setIncidents] = useState(mockIncidents);

  const addIncident = (newIncident) => {
    setIncidents([newIncident, ...incidents]);
  };

  return (
    <div className="App">
      <h1>AI Safety Incident Dashboard</h1>
      <IncidentForm addIncident={addIncident} />
      <IncidentList incidents={incidents} />
    </div>
  );
}

export default App;
