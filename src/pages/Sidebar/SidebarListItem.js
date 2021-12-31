import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import useChatMessages from "../../hooks/useChatMessages";
import Icon from "../../components/Icon";
// import { MdInsertPhoto} from "@material-ui/icons";

import PhotoIcon from '@material-ui/icons/Photo';


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

<div className="sidebar_chat--bottom">
          {item.type === "room" ? (
            <span className="sidebar__chat--message">
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
            </span>
          ) : (
            <span className="sidebar__chat--message">
              {isSender ? (
                <Icon
                  id="doubleTick"
                  className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
                />
              ) : (
                " "
              )}
            </span>
          )}
          
          <span className="sidebar__chat--lastmessage">
            {lastMessage ? (
              lastMessage 
            ) : lastMessages?.audioUrl ? (
              <>
                <Icon
                  id="microphone"
                  className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
                />
                <span>Audio</span>
              </>
            ) : lastMessages?.imageUrl ? (
              <>
              
               <PhotoIcon className=" photo__icon" />
                <span>Photo</span>
              </>
            ) : (
              " "
            )}
          </span>
        </div>
        </div>
      </div>
    </Link>
  );
}
