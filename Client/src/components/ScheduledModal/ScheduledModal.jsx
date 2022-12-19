import { useState } from "react";
import { Modal } from "@mantine/core";

const ScheduledModal = () => {
  const [opened, setOpened] = useState(true);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Schedule your post"
    >
      <div className="schedule">
        <p>Select a date and time the future for your post to be published</p>
        <input type="datetime-local" />
      </div>
    </Modal>
  );
};

export default ScheduledModal;
