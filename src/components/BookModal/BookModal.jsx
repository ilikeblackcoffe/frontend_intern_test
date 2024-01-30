import React from "react";
import { Formik, Form, Field } from "formik";
import { Modal, InputWrapper, ButtonWrapper, StyledButton as Button } from "../../StyledComponents";

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
            <Button onClick={toggleBookModal} style={{ backgroundColor: "red" }}>
              Cancel
            </Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Modal>
  );
};

export default BookModal;
