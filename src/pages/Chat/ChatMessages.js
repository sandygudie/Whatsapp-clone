import { CircularProgress } from "@material-ui/core";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Icon from "../../components/Icon";
export default function ChatMessages({
  messages,
  user,
  roomId,
  audioId,
  setAudioId,
  room,
}) {
  if (!messages) return null;

  return messages.map((message) => {
    const isSender = message.uid === user.uid;

    // Time
    var dt = new Date(message.time);
    var hours = dt.getHours(); // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    var minutes = dt.getMinutes();
    let currentminutes =
      minutes.toString().length < 2 ? `0${minutes}` : minutes;
    var finalTime = hours + ":" + currentminutes + " " + AmOrPm;

    // color
    let colorarr = [
      "#FFAEBC",
      "#A0E7E5",
      "#B4F8C8",
      "#189AB4",
      "#75E6DA",
      "#18A558",
      "#21B6A8",
    ];

    //  messagebox length
    // const messagelength = message.message.length > 30;

    let color = colorarr[Math.floor(Math.random() * colorarr.length)];
    return (
      <div
        key={message.id}
        style={{ width: message.message?.length > 30 || message.audioUrl ?  " 500px" : "fit-content" }}
        className={`chat__message ${
          isSender ? "chat__message--sender sender--message" : "message--others"
        }`}

       
      >
        {room?.type === "room" ? (
          !isSender ? (
            <span style={{ color: color }} className="chat__name">
              {message.name}
            </span>
          ) : (
            " "
          )
        ) : (
          " "
        )}

        {message.imageUrl === "uploading" ? (
          <div className="image-container">
            <div className="image__container--loader">
              <CircularProgress
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </div>
          </div>
        ) : message.imageUrl ? (
          <div className="image-container">
            <img src={message.imageUrl} alt={message.name} />
          </div>
        ) : null}

        {message.audioName ? (
          <AudioPlayer
            sender={isSender}
            roomId={roomId}
            id={message.id}
            audioUrl={message.audioUrl}
            audioId={audioId}
            setAudioId={setAudioId}
          />
        ) : (
          <span className="chat__message--message">{message.message}</span>
        )}

        <span className="chat__timestamp">
        <span style={{marginRight:"5px"}}>  {finalTime}</span>
          {isSender ? (
            room?.type === "room" ? (
              <Icon
                id="singleTick"
                className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
              />
            ) : (
              <Icon
                id="doubleTick"
                className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
              />
            )
          ) : (
            ""
          )}
        </span>
      </div>
    );
  });
}
