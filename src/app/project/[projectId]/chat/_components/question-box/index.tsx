"use client";
import { Button } from "@/components/atoms/button";
import { FormInput } from "@/components/molecules/form-input";
import { Stack } from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

type TProps = {
  setQuestion: Dispatch<SetStateAction<string>>;
}

type TForm = {
  question: string;
};

export const QuestionBox: React.FC<TProps> = ({ setQuestion }) => {
  const { control, handleSubmit, reset } = useForm<TForm>();

  const onSubmit = useCallback((data: TForm) => {
    setQuestion(data.question);

    reset();
  }, []);

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row">
        <FormInput
          label=""
          control={control}
          name="question"
          placeholder="ask about project"
          fullWidth
        />

        <Button type="submit">Send</Button>
      </Stack>
    </form>
    
  );
};
