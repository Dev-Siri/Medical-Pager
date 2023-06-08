import { Avatar, useChatContext } from "stream-chat-react";

function DirectPreview({ channel, client }) {
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID
  );

  return (
    <div className="channel-preview__item single">
      <Avatar
        image={members[0]?.user?.image}
        name={members[0]?.user?.fullName}
        size={24}
      />
      <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
    </div>
  );
}

export default function TeamChannelPreview({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) {
  const { channel: activeChannel, client } = useChatContext();

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? (
        <p className="channel-preview__item">
          #{channel?.data?.name || channel?.data?.id}
        </p>
      ) : (
        <DirectPreview channel={channel} client={client} />
      )}
    </div>
  );
}
