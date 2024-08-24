"use client";
import { useCallback, useState } from "react";

export type TModal = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useModal = (): TModal => {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { open, onOpen, onClose, toggle };
};
