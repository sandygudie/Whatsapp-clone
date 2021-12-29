import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import useRooms from "./useRooms";
import useUsers from "./useUsers";


export default function useChats(user,rooms) {




  const roomsagain = useRooms(user);

  const users = useUsers(user);

  if (! roomsagain) return null;
  if (!users ) return null;
  const chatnews =  roomsagain.concat(users)

  // console.log(chatnews)
 
  // console.log(chats )
  // return  chats ;



  // const [snapshot] = useCollection(
  //   user
  //     ? db
  //         .collection("users")
  //         .doc(user.uid)
  //         .collection("chats")
  //         .orderBy("timestamp", "desc")
  //     : null
  // );
  // const chatsusers = snapshot?.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));
   
  // const [snapshotroom] = useCollection(
  //   rooms
  //     ? db
  //         .collection("rooms")
          
  //         .orderBy("timestamp", "desc")
  //     : null
  // );
  // // const [snapshotroom] = useCollection(

  // //   db.collection("rooms").orderBy("timestamp", "desc")
  // // );

  // const chatsrooms = snapshotroom?.docs.map((doc) => ({
  //   id: doc.id,
  //   userID: doc.id,
  //   ...doc.data(),
  // }));



  // if (!chatsusers) return null;
  // if (!chatsrooms) return null;

  // const chats =  chatsrooms.concat(chatsusers)


  // const filteredArr = chats.reduce((acc, current) => {
  //   const x = acc.find(item => item.id === current.id);
  //   if (!x) {
  //     return acc.concat([current]);
  //   } else {
  //     return acc;
  //   }
  // }, []);






  
  return chatnews ;


  


}






  


