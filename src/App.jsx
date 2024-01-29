import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Header,
  StyledButton as Button,
  Table,
  TableCell,
  TableHeader,
  ButtonWrapper,
  Modal,
  InputWrapper,
  SearchInput,
  SearchContainer 
} from "./StyledComponents";

// AuthorModal component: Renders a modal for adding authors
const AuthorModal = ({ handleAuthorSubmit, toggleAuthorModal }) => {
  return (
    <Modal>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={(values, { resetForm }) => {
          handleAuthorSubmit(values);
          resetForm();
          toggleAuthorModal();
        }}
      >
        <Form>
          <InputWrapper>
            <Field
              type="text"
              name="name"
              placeholder="Author's Name"
              required
            />
            <Field type="email" name="email" placeholder="Author's E-mail" />
          </InputWrapper>
          <ButtonWrapper>
            <Button type="submit">Confirm</Button>
            <Button onClick={toggleAuthorModal} style={{backgroundColor: "red"}}>Cancel</Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Modal>
  );
};

// BookModal component: Renders a modal for adding books
const BookModal = ({ handleBookSubmit, toggleBookModal, authors }) => {
  return (
    <Modal>
      <Formik
        initialValues={{ name: "", author_id: "", pages: "" }}
        onSubmit={(values, { resetForm }) => {
          handleBookSubmit(values);
          resetForm();
          toggleBookModal();
        }}
      >
        <Form>
          <InputWrapper>
            <Field type="text" name="name" placeholder="Book Name" required />
            <Field as="select" name="author_id" required>
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Field>
            <Field type="number" name="pages" placeholder="Pages" />
          </InputWrapper>
          <ButtonWrapper>
            <Button type="submit">Confirm</Button>
            <Button onClick={toggleBookModal}  style={{backgroundColor: "red"}}>Cancel</Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Modal>
  );
};
//Main component: App
const App = () => {
  // State variables for managing the application state
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [authorSearchQuery, setAuthorSearchQuery] = useState("");

  //Hook to load data from localStorage on 
  useEffect(() => {
     // Retrieve stored data from localStorage, or initialize as an empty array if no data is found
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    // Set the state variable with the retrieved data
    setAuthors(storedAuthors);
    setBooks(storedBooks);
  }, []);

  //Hook to save data to localStorage 
  useEffect(() => {
    localStorage.setItem("authors", JSON.stringify(authors));
  }, [authors]);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  //Handle submit button
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
//Handle delete button
  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleDeleteAuthor = (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      setAuthors(authors.filter((author) => author.id !== id));
      // Also delete associated books
      setBooks(books.filter((book) => book.author_id !== id));
    }
  };

  //Handle searchbar by name and filter the result
  const handleBookSearchChange = (event) => {
    setBookSearchQuery(event.target.value);
  };

  const handleAuthorSearchChange = (event) => {
    setAuthorSearchQuery(event.target.value);
  };

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
                <Button onClick={() => handleDeleteBook(book.id)} style={{backgroundColor: "red"}}>
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
                <Button onClick={() => handleDeleteAuthor(author.id)} style={{backgroundColor: "red"}}>
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