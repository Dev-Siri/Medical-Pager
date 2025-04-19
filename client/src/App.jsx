import { Suspense, lazy, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

const ChannelListContainer = lazy(() =>
  import("./components/ChannelListContainer")
);
const ChannelContainer = lazy(() => import("./components/ChannelContainer"));
const Auth = lazy(() => import("./components/Auth"));

const cookies = new Cookies();

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      name: cookies.get("username"),
      id: cookies.get("userId"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

export default function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <Suspense fallback="...">
      <main className="app__wrapper">
        <Chat client={client} theme="team light">
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            createType={createType}
          />
        </Chat>
      </main>
    </Suspense>
  );
}
