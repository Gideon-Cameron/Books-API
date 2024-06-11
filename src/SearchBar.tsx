import React, { useState } from 'react';

interface SearchBarProps {
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setBooks }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
      const data = await response.json();

      // Map the data to include only necessary fields
      const mappedBooks = data.items.map((item: any) => ({
        id: item.id,
        volumeInfo: {
          title: item.volumeInfo.title,
          description: item.volumeInfo.description,
          imageLinks: item.volumeInfo.imageLinks,
          previewLink: item.volumeInfo.previewLink, // Include previewLink
        },
      }));

      setBooks(mappedBooks);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
