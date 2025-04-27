import React, { useState } from 'react';

const IncidentList = ({ incidents }) => {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expandedId, setExpandedId] = useState(null);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' ? true : incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    return sortOrder === 'Newest'
      ? new Date(b.reported_at) - new Date(a.reported_at)
      : new Date(a.reported_at) - new Date(b.reported_at);
  });

  return (
    <div>
      <div className="controls">
        <select onChange={handleFilterChange}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      <div className="incident-list">
        {sortedIncidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <h3>{incident.title}</h3>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>
            <button onClick={() => toggleExpand(incident.id)}>
              {expandedId === incident.id ? "Hide Details" : "View Details"}
            </button>
            {expandedId === incident.id && <p className="description">{incident.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentList;
