import { useState, lazy } from "react";
import { useChatContext } from "stream-chat-react";
import { CloseCreateChannel } from "../assets";

const UserList = lazy(() => import("./UserList"));

function ChannelNameInput({ channelName = "", setChannelName }) {
  function handleChange(event) {
    event.preventDefault();

    setChannelName(event.target.value);
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
}

export default function CreateChannel({ createType, setIsCreating }) {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  async function createChannel(e) {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === "team" ? "Create channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
}
