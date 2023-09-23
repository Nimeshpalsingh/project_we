import { FC } from "react";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

type Props = {
  errors?: FieldErrors<FieldValues> | FieldError;
};

const CommonErrorText: FC<Props> = ({ errors }) => {
  return errors && errors.message ? (
    <div className="message error">
      <p>
        <>{errors?.message}</>
      </p>
    </div>
  ) : null;
};

export default CommonErrorText;
