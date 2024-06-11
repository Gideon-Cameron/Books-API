import React from 'react';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    previewLink: string; // Ensure previewLink is part of the volumeInfo
  };
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget;
    const description = target.querySelector('p');
    if (description) {
      description.style.display = description.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id} onClick={handleClick}>
          <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.description}</p>
          <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
            <button>View</button>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
