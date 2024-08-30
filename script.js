// AI Companion Component
function AICompanion() {
  const [userInput, setUserInput] = React.useState('');
  const [response, setResponse] = React.useState('Hello! How can I help you today?');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    let newResponse = '';
    
    if (userInput.toLowerCase().includes('anxious')) {
      newResponse = "I'm sorry to hear that. How about trying a quick breathing exercise? Focus on inhaling deeply and slowly exhaling.";
    } else if (userInput.toLowerCase().includes('happy')) {
      newResponse = "That's wonderful! Remember to cherish these moments. What made you happy today?";
    } else if (userInput.toLowerCase().includes('help')) {
      newResponse = "I'm here to help! Would you like to talk about what's on your mind or explore some relaxation techniques?";
    } else if (userInput.toLowerCase().includes('stressed')) {
      newResponse = "Stress can be tough. Let's take a moment to relax. How about we focus on some deep breathing or a short walk?";
    } else if (userInput.toLowerCase().includes('sad')) {
      newResponse = "I'm sorry you're feeling sad. It's okay to feel this way. Do you want to talk about it?";
    } else if (userInput.toLowerCase().includes('excited')) {
      newResponse = "Excitement is great! What's got you feeling so energized?";
    } else {
      newResponse = "Hmm, I'm not sure how to respond to that. Could you tell me more about how you're feeling?";
    }

    setResponse(newResponse);
    setUserInput('');
  };

  return (
    <div>
      <div>{response}</div>
      <input
        type="text"
        placeholder="Type your message..."
        value={userInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

// Progress Tracker Component with Chart
function ProgressTracker() {
  const [logs, setLogs] = React.useState([]);
  const [newLog, setNewLog] = React.useState('');

  const handleLogChange = (e) => {
    setNewLog(e.target.value);
  };

  const handleAddLog = () => {
    if (newLog.trim() !== '') {
      setLogs([...logs, { date: new Date().toLocaleDateString(), text: newLog }]);
      setNewLog('');
    }
  };

  React.useEffect(() => {
    const ctx = document.getElementById('moodChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: logs.map(log => log.date),
        datasets: [{
          label: 'Mood Log',
          data: logs.map(log => log.text.length), // Example: using text length as a simple measure
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      }
    });
  }, [logs]);

  return (
    <div>
      <h2>Daily Log</h2>
      <input
        type="text"
        placeholder="How are you feeling today?"
        value={newLog}
        onChange={handleLogChange}
      />
      <button onClick={handleAddLog}>Add Log</button>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>{log.date}:</strong> {log.text}
          </li>
        ))}
      </ul>
      <canvas id="moodChart" width="400" height="200"></canvas>
    </div>
  );
}

// Settings Component
function Settings() {
  const [companionName, setCompanionName] = React.useState('AI Companion');

  const handleNameChange = (e) => {
    setCompanionName(e.target.value);
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Set Companion Name:
        <input
          type="text"
          value={companionName}
          onChange={handleNameChange}
        />
      </label>
      <p>Current Name: {companionName}</p>
    </div>
  );
}

// Updated App Component to include settings
function App() {
  const [page, setPage] = React.useState('home');

  return (
    <div>
      <h1>Anxiety Companion</h1>
      <button onClick={() => setPage('home')}>Home</button>
      <button onClick={() => setPage('settings')}>Settings</button>
      
      {page === 'home' && (
        <>
          <AICompanion />
          <ProgressTracker />
        </>
      )}
      
      {page === 'settings' && <Settings />}
    </div>
  );
}

// Rendering the App
ReactDOM.render(<App />, document.getElementById('root'));
