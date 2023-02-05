import React, { useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const resetInput = () => setValue(initialValue);

  const onSubmitCallback =
    (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback();
      resetInput();
    };

  return { value, setValue, onChange, onSubmitCallback };
};

export default useInput;
