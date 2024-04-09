import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ErrorComponent from "../shared/ErrorComponent";
import PasswordField from "./PasswordField";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const methods = useForm<IFormInput>();
  const errors = methods.formState.errors;
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log("Data from form was submitted:", data);
  return (
    <>
      <h2 className="text-center my-3">Sign Up </h2>
      <div className="col col-md-6 mx-auto">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your First Name"
                {...methods.register("firstName", {
                  required: "This field is required",
                })}
              />
              <ErrorComponent name="firstName" errors={errors} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Last Name"
                {...methods.register("lastName", {
                  required: "This field is required",
                })}
              />
              <ErrorComponent name="lastName" errors={errors} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                {...methods.register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <ErrorComponent name="email" errors={errors} />
            </Form.Group>

            <PasswordField />

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </FormProvider>
      </div>
    </>
  );
};

export default SignUpForm;
