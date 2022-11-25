import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({ opened, onClose }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
    >
      <PostShare />
    </Modal>
  );
};

export default ShareModal;
