import React, { useEffect, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorComponent from "../shared/ErrorComponent";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

enum PassLevel {
  Low = "Low",
  Mid = "Medium",
  High = "High",
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const [passLevel, changePassLevel] = useState(PassLevel.Low);
  const watchPass = watch("password", "");

  const passwordBasicCheck = (value: string) => {
    if (value.length < 6) {
      return "Password should have 6 or more symbols";
    } else if (value.length > 30) {
      return "Password should not have more then 30 symbols";
    } else if (value.search(/\d/) == -1) {
      return "Password should contain at least one digit";
    } else if (value.search(/[a-zA-Z]/) == -1) {
      return "Password should contain at least one letter";
    }
    return true;
  };

  const passwordExtraCheck = (value: string) => {
    if (value.length > 6 && value.length <= 10) {
      return PassLevel.Mid;
    } else if (value.length > 10 && value.length <= 30) {
      return PassLevel.High;
    }
    return PassLevel.Low;
  };

  useEffect(() => {
    const basicCheck = passwordBasicCheck(watchPass);
    if (basicCheck === true) {
      changePassLevel(passwordExtraCheck(watchPass));
    } else {
      changePassLevel(PassLevel.Low);
    }
  }, [watchPass]);
  return (
    <>
      <h2 className="text-center my-3">Sign Up </h2>
      <div className="mt-3 d-flex justify-content-center">
        <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your First Name"
              {...register("firstName", { required: "This field is required" })}
            />
            <ErrorComponent name="firstName" errors={errors} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last Name"
              {...register("lastName", { required: "This field is required" })}
            />
            <ErrorComponent name="lastName" errors={errors} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <ErrorComponent name="email" errors={errors} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
                validate: {
                  validatePass: (v) => passwordBasicCheck(v),
                },
              })}
            />
            {watchPass && (
              <div className="d-flex justify-content-between mt-2">
                <ProgressBar
                  className="progress-bar__item"
                  variant="danger"
                  now={100}
                  label={PassLevel.Low}
                  key={1}
                />
                <ProgressBar
                  className="progress-bar__item"
                  variant="warning"
                  now={
                    passLevel === PassLevel.Mid || passLevel === PassLevel.High
                      ? 100
                      : 0
                  }
                  label={PassLevel.Mid}
                  key={2}
                />
                <ProgressBar
                  className="progress-bar__item"
                  variant="success"
                  now={passLevel === PassLevel.High ? 100 : 0}
                  label={PassLevel.High}
                  key={3}
                />
              </div>
            )}
            <ErrorComponent name="password" errors={errors} />
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
