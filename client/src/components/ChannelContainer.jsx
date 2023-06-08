import { lazy } from "react";
import { Channel, MessageTeam } from "stream-chat-react";

const ChannelInner = lazy(() => import("./ChannelInner"));
const CreateChannel = lazy(() => import("./CreateChannel"));
const EditChannel = lazy(() => import("./EditChannel"));

function EmptyState() {
  return (
    <article className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </article>
  );
}

export default function ChannelContainer({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) {
  if (isCreating) {
    return (
      <article className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </article>
    );
  }

  if (isEditing) {
    return (
      <article className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </article>
    );
  }

  return (
    <article className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </article>
  );
}
