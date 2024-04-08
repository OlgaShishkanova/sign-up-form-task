import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  name: string;
  errors: FieldErrors;
}

const ErrorComponent: React.FC<Props> = ({ name, errors }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <div>
          <small className="text-danger">{message}</small>
        </div>
      )}
    />
  );
};

export default ErrorComponent;
