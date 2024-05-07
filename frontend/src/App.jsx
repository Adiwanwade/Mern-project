import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/content')
      .then(res => {
        setContents(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Content List</h1>
      <ul>
        {contents.map(content => (
          <li key={content._id}>
            <h2>{content.title}</h2>
            <p>{content.body}</p>
            <p>Author: {content.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;