import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import useChatMessages from "../../hooks/useChatMessages";
import Icon from "../../components/Icon";

export default function SidebarListItem({ item }) {
  const user = auth.currentUser;
  const messages = useChatMessages(item.id);

  if (!messages) return null;

  let lastMessages;
  let isSender;
  let lastMessage;
  let lastMessagetime;

  if (messages.length > 0) {
    lastMessages = messages[messages.length - 1];

    isSender = lastMessages.uid === user.uid;

    lastMessage = messages[messages.length - 1].message;

    lastMessagetime = messages[messages.length - 1].time;
    var dt = new Date(lastMessagetime);
    var hours = dt.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    var minutes = dt.getMinutes();
    let currentminutes =
      minutes.toString().length < 2 ? `0${minutes}` : minutes;
    lastMessagetime = hours + ":" + currentminutes + " " + AmOrPm;
  }

  return (
    <Link className="link" to={`/room/${item.id}`}>
      <div className="sidebar__chat">
        {item.type === "room" ? (
          <div className="room__Avatar">
            <i className="fas fa-user-friends"></i>
          </div>
        ) : (
          <div className="avatar__container">
            <Avatar
              style={{
                width: 45,
                height: 45,
              }}
              src={item.photoURL}
            />
          </div>
        )}

        <div className="sidebar_chat_details">
          <div className="sidebar__chat--info">
            <p>{item.name}</p>
            <span>{lastMessagetime}</span>
          </div>

          {item.type === "room" ? (
            <div className="sidebar__chat--message">
              {isSender ? (
                <Icon
                  id="singleTick"
                  className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
                />
              ) : lastMessages?.name ? (
                lastMessages.name + ": "
              ) : (
                <span>
                  {item?.createdby} created group "{item.name}"{" "}
                </span>
              )}
              <span>
                {lastMessage}
                {/* {lastMessage?.length > 15
                  ? lastMessage.substr(0, 15) + "..."
                  : lastMessage} */}
              </span>
            </div>
          ) : (
            <div className="sidebar__chat--message">
              {isSender ? (
                <Icon
                  id="doubleTick"
                  className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
                />
              ) : (
                " "
              )}
              <span>
                {/* {lastMessage?.length > 15
                  ? lastMessage.substr(0, 15) + "..."
                  : lastMessage} */}
                     {lastMessage}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
