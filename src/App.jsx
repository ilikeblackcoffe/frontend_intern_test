import React, { useState, useEffect } from "react";
import { Container, Header, StyledButton as Button, Table, TableCell, TableHeader, ButtonWrapper, SearchInput, SearchContainer } from "./StyledComponents";
import AuthorModal from "./components/AuthorModal/AuthorModal";
import BookModal from "./components/BookModal/BookModal";

const App = () => {
  // State variables and methods
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [authorSearchQuery, setAuthorSearchQuery] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setAuthors(storedAuthors);
    setBooks(storedBooks);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("authors", JSON.stringify(authors));
  }, [authors]);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Handlers for submit and delete actions
  const handleAuthorSubmit = (author) => {
    setAuthors([...authors, { ...author, id: authors.length + 1 }]);
    setShowAuthorModal(false);
  };

  const handleBookSubmit = (book) => {
    const author = authors.find(
      (author) => author.id === parseInt(book.author_id)
    );
    setBooks([...books, { ...book, id: books.length + 1, author }]);
    setShowBookModal(false);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleDeleteAuthor = (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      setAuthors(authors.filter((author) => author.id !== id));
      // Also delete associated books, not working :(
      setBooks(books.filter((book) => book.author_id !== id));
    }
  };

  // Search handlers
  const handleBookSearchChange = (event) => {
    setBookSearchQuery(event.target.value);
  };

  const handleAuthorSearchChange = (event) => {
    setAuthorSearchQuery(event.target.value);
  };

  // Filtered data
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(authorSearchQuery.toLowerCase())
  );

  return (
    <Container>
      <Header>Books</Header>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Books by Name"
          value={bookSearchQuery}
          onChange={handleBookSearchChange}
        />
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Pages</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>{book.pages}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteBook(book.id)} style={{ backgroundColor: "red" }}>
                  Delete
                </Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>

      <Header>Authors</Header>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Authors by Name"
          value={authorSearchQuery}
          onChange={handleAuthorSearchChange}
        />
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredAuthors.map((author) => (
            <tr key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteAuthor(author.id)} style={{ backgroundColor: "red" }}>
                  Delete
                </Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonWrapper>
        <Button onClick={() => setShowAuthorModal(true)}>Add Author</Button>
        <Button onClick={() => setShowBookModal(true)}>Add Book</Button>
      </ButtonWrapper>

      {showAuthorModal && (
        <AuthorModal
          handleAuthorSubmit={handleAuthorSubmit}
          toggleAuthorModal={() => setShowAuthorModal(false)}
        />
      )}
      {showBookModal && (
        <BookModal
          handleBookSubmit={handleBookSubmit}
          toggleBookModal={() => setShowBookModal(false)}
          authors={authors}
        />
      )}

    </Container>
  );
};

export default App;
