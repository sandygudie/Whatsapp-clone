import React from "react";
import { Avatar } from "@material-ui/core";

import SidebarList from "./SidebarList";
import { auth, createTimestamp, db } from "../../firebase";
import "./Sidebar.css";
import {  Switch, Route } from "react-router-dom";
import useRooms from "../../hooks/useRooms";
import useUsers from "../../hooks/useUsers";
import useChats from "../../hooks/useChats";
import Icon from "../../components/Icon";
import OptionsBtn from "../../components/OptionsButton";
import Tooltips from "../../components/Tooltips/Tooltips";
import Alert from "../../components/Alert/Alert";

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
    const roomName = prompt("Type the name of your room");

    if (roomName === null) {
      return;
    }
    if (roomName.trim()) {
      db.collection("rooms").add({
        name: roomName.charAt(0).toUpperCase() + roomName.slice(1),
        type: "room",
        createdby: user.displayName,
        timestamp: createTimestamp(),
      });
    }
  }

 function onSubmitSearch(event) {
   console.log("ihear")
  event.preventDefault();
  event.target.elements.search.value = " "
  setMenu(1);
  }
  function refreshSearch() {
    
   setMenu(1);
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

  // let Nav;
  // if (page.isMobile) {
  //   Nav = NavLink;
  // } else {
  //   Nav = (props) => (
  //     <div
  //       className={`${props.activeClass ? "sidebar__menu--selected" : ""}`}
  //       onClick={props.onClick}
  //     >
  //       {props.children}
  //     </div>
  //   );
  // }

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
                  link: createRoom,
                },
                {
                  title: "Archived",
                },
                {
                  title: "Starred",
                },
                {
                  title: "Settings",
                },
                {
                  title: "Log out",
                  link: signOut,
                },
              ]}
            />
          </Tooltips>
        </div>
      </div>


      <Alert />

<div >
<form onSubmit = {onSubmitSearch} className="search-wrapper"autoComplete = "false" >
  <div className="search-icons">
  <Icon id="search" className="search-icon" />

<Icon  onClick ={refreshSearch} className="search__back-btn" id="back" />

  </div>

 

<input
type="text"
 className="search" 
 id="search"
placeholder="Search or start a new chat" 
onfocus="this.placeholder = ''"
onChange={searchUsersAndRooms} />
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

   
    </div>
  );
}
