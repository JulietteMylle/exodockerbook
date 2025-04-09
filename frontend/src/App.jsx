import { useEffect, useState } from 'react';

const App = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    
    fetch('http://backend:3001/books') 
    .then((response) => response.json())
    .then((data) => {
      console.log('Books fetched:', data);
      setBooks(data);
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
  }, []);

  return (
    <div>
      <h1>Liste des livres</h1>
      {books.length === 0 ? (
        <p>Aucun livre trouvé</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App