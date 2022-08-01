import React from "react";
import Notes from "../components/Notes";

function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
}

export default Home;
