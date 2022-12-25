import moment from "moment";
const Messages = ({ messages, currentUserId }) => {
  return (
    <div className="chat-body">
      {messages?.map((message) => {
        return (
          <div
            key={message._id}
            className={
              message.senderId === currentUserId ? "message own" : "message"
            }
          >
            <span>{message.text}</span>
            <span>{moment(message.createdAt).fromNow()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
