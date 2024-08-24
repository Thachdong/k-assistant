import { useModal } from "@/hooks/useModal";
import { useCallback } from "react";

export const useCtaButtonMethods = () => {
  const speedDialModal = useModal();

  const drawerModal = useModal();

  const handleOpenDrawer = useCallback(() => {
    drawerModal.onOpen();

    speedDialModal.onClose();
  }, []);

  return {
    handleOpenDrawer,
    speedDialModal,
    drawerModal,
  };
};
