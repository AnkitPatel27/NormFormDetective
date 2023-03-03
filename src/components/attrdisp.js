import React from "react";
import { Stack } from "@mui/system";
import { Chip } from "@mui/material";
import { useState } from "react";

function Attrdisp(props) {
  // const [chips,setchips] = useState();
  const handleDelete = () => {
        // console.log(props.label)
        props.delete_attr(props.label)
  }
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip size="medium" label={props.label} onDelete={handleDelete} sx={{ color: 'white',backgroundColor:"#749c9c" }} />
      </Stack>
    </>
  );
}
export default Attrdisp;
