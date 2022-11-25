import { Modal, useMantineTheme } from "@mantine/core";

const ProfileModal = ({ opened, onClose }) => {
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
      <form className="infoForm">
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works At"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives In"
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
          />
        </div>
        <div>
            Profile Image
            <input type="file" name="profileImage" />
            Cover Image
            <input type="file" name="coverImage" />
        </div>
        <button className="button info-button">Update</button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
