import useRooms from "./useRooms";
import useUsers from "./useUsers";

export default function useChats(user) {
  const rooms = useRooms(user);

  const users = useUsers(user);

  if (!rooms) return null;
  if (!users) return null;
  const roomUsers = rooms.concat(users);

  

  return roomUsers;
}
