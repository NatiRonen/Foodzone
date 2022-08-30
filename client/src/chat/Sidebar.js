import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../redux/userSlice";
import { FiSearch } from "react-icons/fi";
import { API_URL } from "../services/apiService";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const [tempRooms, setTempRooms] = useState([]);
  const {
    socket,
    setCurrentRoom,
    rooms,
    setRooms,
    currentRoom,
    setServiceMsg,
  } = useContext(AppContext);

  const dispatch = useDispatch();
  const searchRoomRef = useRef();

  useEffect(() => {
    if (user) {
      getRooms();
    }
  }, []);

  //switch the event off before on to prevert bugs
  socket.off("update-forums").on("update-forums", (payload) => {
    setRooms(payload);
  });
  const getRooms = async () => {
    let url = API_URL + "/chat/rooms";
    let resp = await axios(url);
    setRooms(resp.data);
    joinRoom(resp.data[0].name);
    setTempRooms(resp.data);
  };

  const joinRoom = (_room, _isPublic = true) => {
    if (!user) {
      return alert("Please login first");
    }
    if (_isPublic) {
      setServiceMsg(false);
    }
    socket.emit("join-room", _room);
    setCurrentRoom(_room);
    dispatch(resetNotifications(_room));
  };

  socket.off("notifications").on("notifications", (_room) => {
    if (currentRoom !== _room) dispatch(addNotifications(_room));
  });

  const handleServiceMsg = () => {
    setServiceMsg(true);
    joinRoom(user._id, false);
  };

  const searchRoom = async () => {
    let searchQ = searchRoomRef.current.value;
    let temp = await rooms.filter((item) =>
      item.name.toUpperCase().includes(searchQ.toUpperCase())
    );
    setTempRooms(temp);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchRoom();
    }
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <div className="forms_panel">
        <div className="settings-tray ps-4">
          <img className="profile-image" src={user.picture} alt="Profile img" />
          <span className="text-capitalize fw-semibold fst-italic">
            Hello {user.name}
          </span>
        </div>
        <div className="search-box">
          <div className="input-wrapper p-2">
            <FiSearch style={{ cursor: "pointer" }} onClick={searchRoom} />
            <input
              ref={searchRoomRef}
              onKeyPress={handleKeyPress}
              placeholder="Search here"
              type="text"
              className="ps-3"
            />
          </div>
        </div>
        <small className="chat_titel ps-3">Forums</small>
        <ListGroup className="scroll_div">
          {tempRooms.map((room, idx) => (
            <div
              key={idx}
              onClick={() => joinRoom(room.name)}
              active={room.name === currentRoom}
              className="friend-drawer friend-drawer--onhover"
            >
              <img
                className="profile-image"
                src={`https://avatars.dicebear.com/api/bottts/${room.name}.svg`}
                alt=""
              />
              <div className="mt-2 d-flex align-items-center">
                <h6>{room.name}</h6>
                {/* <p className="text-muted">Hey, you're arrested!</p> */}
                {currentRoom !== room.name && (
                  <div className="badge rounded-pill bg-success  ms-5">
                    {user.newMessages[room.name]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ListGroup>
        <small className="chat_titel ps-3">Customers Service</small>
        <div
          className="friend-drawer friend-drawer--onhover"
          active={user._id === currentRoom}
          onClick={handleServiceMsg}
        >
          <img className="profile-image" src={`/images/support.png`} alt="" />

          <div className="mt-2 d-flex align-items-center">
            <div>
              <h6 className="fs-5">Contact Us</h6>
              <div className="text-muted fs-6">Always here for you :)</div>
            </div>
            <span className="badge rounded-pill bg-success float-end  ms-5">
              {user.newMessages[user._id]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
