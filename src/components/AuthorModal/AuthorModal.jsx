import React from "react";
import { Formik, Form, Field } from "formik";
import { Modal, InputWrapper, ButtonWrapper, StyledButton as Button } from "../../StyledComponents";

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
            <Field type="text" name="name" placeholder="Author's Name" required />
            <Field type="email" name="email" placeholder="Author's E-mail" />
          </InputWrapper>
          <ButtonWrapper>
            <Button type="submit">Confirm</Button>
            <Button onClick={toggleAuthorModal} style={{ backgroundColor: "red" }}>
              Cancel
            </Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AuthorModal;
