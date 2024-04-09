import React, { useEffect, useState } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import ErrorComponent from "../shared/ErrorComponent";

enum PassLevel {
  Low = "Low",
  Mid = "Medium",
  High = "High",
}

const PasswordField: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [passLevel, changePassLevel] = useState("");
  const watchPass = watch("password", "");

  const passwordBasicCheck = (value: string) => {
    if (value.length < 6) {
      return "Password should have 6 or more symbols";
    } else if (value.search(/\d/) === -1) {
      return "Password should contain at least one digit";
    } else if (value.search(/[a-zA-Z]/) === -1) {
      return "Password should contain at least one letter";
    }
    return true;
  };

  const isStrongPassword = (value: string) => {
    // strong password requires min 10 symbols. At least 1 lowercase letter,
    // 1 uppercase letter, 1 digit and 1 special character among these !@#$%^&*()_+
    const strongPasswordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{10,}$/;
    return strongPasswordRegex.test(value);
  };

  const isMediumPassword = (value: string) => {
    // strong password requires min 8 symbols. At least 1 lowercase letter,
    // 1 uppercase letter and 1 digit
    const mediumPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return mediumPasswordRegex.test(value);
  };

  useEffect(() => {
    const basicCheck = passwordBasicCheck(watchPass);
    if (basicCheck === true) {
      if (isStrongPassword(watchPass)) {
        changePassLevel(PassLevel.High);
      } else {
        isMediumPassword(watchPass)
          ? changePassLevel(PassLevel.Mid)
          : changePassLevel(PassLevel.Low);
      }
    } else {
      changePassLevel("");
    }
  }, [watchPass]);
  return (
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
      {passLevel && (
        <div className="d-flex justify-content-between mt-2">
          <ProgressBar
            className="progress-bar__item"
            variant="danger"
            now={passLevel ? 100 : 0}
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
  );
};

export default PasswordField;
