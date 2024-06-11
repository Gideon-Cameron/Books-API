import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    previewLink: string; // Include previewLink in the interface
  };
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch well-liked books to display by default
    const fetchBooks = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=bestsellers&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`);
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
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <SearchBar setBooks={setBooks} />
      <BookList books={books} />
    </div>
  );
};

export default Home;
