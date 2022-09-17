import React from "react";
import "./custom.css";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
      );
      console.log(response.data);
      setUsers(response.data);
    };
    loadUsers();
  }, []);
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.name.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  };

  const myComponent = {
    width: "176px",
    height: "120px",
    overflow: "auto",
    margin: "auto",
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users by ID, address, name, items, pincode"
        value={text}
        onChange={(e) => onChangeHandler(e.target.value)}
        style={{ marginTop: "10px" }}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
      />
      <div style={myComponent}>
        {suggestions
          ? suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="suggestion"
                onClick={() => onSuggestHandler(suggestion.name)}
              >
                <p>{`BB_${suggestion.id}`}</p>
                {suggestion.name}
                <p>{suggestion.address}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SearchUser;
