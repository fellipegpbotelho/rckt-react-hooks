import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/fellipegpbotelho/repos"
      );
      const data = await response.json();
      setRepositories(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos :)`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <button onClick={() => handleFavorite(repo.id)}>
              {repo.favorite ? "Desfavoritar" : "Favoritar"}
            </button>
            <b style={{ marginLeft: 10 }}>{repo.name}</b>
            {repo.favorite && <span>(Favorito)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
