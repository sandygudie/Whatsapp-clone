import React from "react"
import { Avatar } from "@material-ui/core";
import {
  
  SearchOutlined
} from "@material-ui/icons";
import SidebarList from "./SidebarList";
import { auth, createTimestamp, db } from "../../firebase";
import "./Sidebar.css";
import { NavLink, Switch, Route } from "react-router-dom";
import useRooms from "../../hooks/useRooms";
import useUsers from "../../hooks/useUsers";
import useChats from "../../hooks/useChats";
import Icon from "../../components/Icon";
import OptionsBtn from "../../components/OptionsButton"
import Tooltips from "../../components/Tooltips/Tooltips"

export default function Sidebar({ user, page }) {
  const rooms = useRooms();

  const users = useUsers(user);
  const chats = useChats(user, rooms);


  const [searchResults, setSearchResults] = React.useState([]);
  const [menu, setMenu] = React.useState(1);

  function signOut() {
    auth.signOut();
  }

 
  function createRoom() {
    const user = auth.currentUser;
    const nameInput = prompt("Type the name of your room");
  let  roomName =  nameInput.charAt(0).toUpperCase() + nameInput.slice(1);
 if(roomName === null){
   return
 }
  if (roomName.trim()) {
      db.collection("rooms").add({
        name: roomName,
        type: "room",
        createdby : user.displayName ,
        timestamp: createTimestamp(),
      });
    }
  }

  async function searchUsersAndRooms(event) {
    event.preventDefault();
    const query = event.target.value;
    const userSnapshot = await db
      .collection("users")
      .where("name", "==", query)
      .get();
    const roomSnapshot = await db
      .collection("rooms")
      .where("name", "==", query)
      .get();
    const userResults = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const roomResults = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const searchResults = [...userResults, ...roomResults];
    setMenu(4);
    setSearchResults(searchResults);
  }

  let Nav;
  if (page.isMobile) {
    Nav = NavLink;
  } else {
    Nav = (props) => (
      <div
        className={`${props.activeClass ? "sidebar__menu--selected" : ""}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }
  
  return (
    <div
      className="sidebar"
      style={{
        minHeight: page.isMobile ? page.height : "auto",
      }}
    >
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
        
        <Tooltips text="Status">
						<Icon
							id="status"
							className=" sidebar__action sidebar__action-icon sidebar__action-icon--status"
						/>
				</Tooltips>
				<Tooltips text=" New chat ">
						<Icon id="chat" className=" sidebar__action sidebar__action-icon" />
            </Tooltips>
            <Tooltips text="Menu">

					<OptionsBtn
    
						className="sidebar__action"
						ariaLabel="Menu"
						iconId="menu"
						iconClassName="sidebar__action-icon"
						options={[
							{
                title: "New group",
                link: createRoom

            },
            {
              title: 	"Archived",
              link: ""

          },
          {
            title: 	"Starred",
            link: ""

        },
        {
          title: "Settings",
          link: ""

      },
      {
        title: "Log out",
        link: signOut

    }
						]}
					/>
			</Tooltips>
        </div>
      </div>

      <div className="sidebar__search">
        <form
         
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            placeholder="Search for users or rooms"
            type="text"
            id="search"
            onChange={searchUsersAndRooms}
          />
        </form>
      </div>

     

      {page.isMobile ? (
        <Switch>
          <Route path="/chats">
            <SidebarList title="Chats" data={chats} />
          </Route>
          <Route path="/rooms">
            <SidebarList title="Rooms" data={rooms} />
          </Route>
          <Route path="/users">
            <SidebarList title="Users" data={users} />
          </Route>
          <Route path="/search">
            <SidebarList title="Search Results" data={searchResults} />
          </Route>
        </Switch>
      ) : menu === 1 ? (
        <SidebarList title="Chats" data={chats} />
      ) : menu === 2 ? (
        <SidebarList title="Rooms" data={rooms} />
      ) : menu === 3 ? (
        <SidebarList title="Users" data={users} />
      ) : menu === 4 ? (
        <SidebarList title="Search Results" data={searchResults} />
      ) : null}

      {/* <div className="sidebar__chat--addRoom">
        <IconButton onClick={createRoom}>
          <Add />
        </IconButton>


       
      </div> */}

     {/* <OptionsButton />   */}
    </div>
  );
}
