import React, { useState } from "react";

const useInput = (initialInput: string) => {
  const [input, setInput] = useState(initialInput);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const resetInput = () => setInput(initialInput);

  const onSubmitCallback =
    (callback: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback();
      resetInput();
    };

  const onCancelCallback =
    (callback: () => void) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      callback();
      resetInput();
    };

  return { input, onChange, onSubmitCallback, onCancelCallback };
};

export default useInput;
