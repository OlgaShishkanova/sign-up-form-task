import React from "react";
import { FieldErrors } from "react-hook-form";
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
        <div role="alert">
          <small className="text-danger">{message}</small>
        </div>
      )}
    />
  );
};

export default ErrorComponent;
