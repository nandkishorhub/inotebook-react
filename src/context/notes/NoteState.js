import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const noteCollection = [
    {
      _id: "62dfdfdb520cc97c5211ff51",
      user: "62dfaed0d9c9c81704e6da85",
      title: "First note thorugh thunder client",
      description: "Welcome note",
      tag: "personal",
      date: "2022-07-26T12:36:43.853Z",
      __v: 0,
    },
    {
      _id: "62e25758a620befb07fcbd36",
      user: "62dfaed0d9c9c81704e6da85",
      title: "samsung",
      description: "samsung widgets",
      tag: "business",
      date: "2022-07-28T09:31:04.490Z",
      __v: 0,
    },
    {
      _id: "62dfdfdb520cc97c5211ff51",
      user: "62dfaed0d9c9c81704e6da85",
      title: "First note thorugh thunder client",
      description: "Welcome note",
      tag: "personal",
      date: "2022-07-26T12:36:43.853Z",
      __v: 0,
    },
    {
      _id: "62e25758a620befb07fcbd36",
      user: "62dfaed0d9c9c81704e6da85",
      title: "samsung",
      description: "samsung widgets",
      tag: "business",
      date: "2022-07-28T09:31:04.490Z",
      __v: 0,
    },
    {
      _id: "62dfdfdb520cc97c5211ff51",
      user: "62dfaed0d9c9c81704e6da85",
      title: "First note thorugh thunder client",
      description: "Welcome note",
      tag: "personal",
      date: "2022-07-26T12:36:43.853Z",
      __v: 0,
    },
    {
      _id: "62e25758a620befb07fcbd36",
      user: "62dfaed0d9c9c81704e6da85",
      title: "samsung",
      description: "samsung widgets",
      tag: "business",
      date: "2022-07-28T09:31:04.490Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(noteCollection);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
