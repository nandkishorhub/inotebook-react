import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const colorList = [
  "#BDC3C7",
  "#F5CBA7",
  "#DC7633",
  "#5D6D7E",
  "#1B4F72",
  "#F1948A",
  "#EBDEF0 ",
  "#82E0AA ",
  "#85C1E9",
  "#CD6155 ",
];

function NoteItem(props) {
  const { note, updateNote } = props;
  const { deleteNote } = useContext(noteContext);
  const [color, setcolor] = useState("white");
  useEffect(() => {
    const currntColor = colorList[Math.floor(Math.random() * colorList.length)];
    setcolor(currntColor);
  }, []);

  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ backgroundColor: color }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => deleteNote(note._id, props)}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={() => updateNote(note)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
