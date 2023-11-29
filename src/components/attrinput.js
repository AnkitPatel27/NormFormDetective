import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Attrinput(props) {
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    // console.log("entered",event)
    if (event.key === "Enter") {
      const inputvalue = inputRef.current.children[1].children[0].value.trim();
      if (inputvalue.length !== 0) {
        props.datafrominput(inputvalue);
      }
      inputRef.current.children[1].children[0].value = "";
    }
  };

  const buttonclick = ()=>{
    const inputvalue = inputRef.current.children[1].children[0].value.trim();
      if (inputvalue.length !== 0) {
        props.datafrominput(inputvalue);
      }
      inputRef.current.children[1].children[0].value = "";
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <TextField
        label="Enter the Attribute"
        variant="outlined"
        ref={inputRef}
        onKeyDown={handleKeyPress}
        fullWidth
      ></TextField>
      <button className="addbutton" onClick={buttonclick}>Add Attribute</button>
    </ThemeProvider>
  );
}

export default Attrinput;
