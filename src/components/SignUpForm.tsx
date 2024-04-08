import React from "react";
import { Button, Form } from "react-bootstrap";

const SignUpForm: React.FC = () => {
  return (
    <>
      <h2 className="text-center my-3">Sign Up </h2>
      <div className="mt-3 d-flex justify-content-center">
        <Form className="w-50">
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Second Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Second Name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">Check Password here</Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignUpForm;
