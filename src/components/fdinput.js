import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import { Autocomplete } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Fdinput(props) {
  const [values, setValues] = useState([]);
  const options = props.options;
  useEffect(() => {
    props.passData(props.side, props.id, [...values]);
  }, [values,props]);

  useEffect(() => {
    let k = props.id+props.side
    if(window.localStorage.getItem(k)){
      console.warn("data",JSON.parse(localStorage.getItem(k)));
      setValues((val) => JSON.parse(localStorage.getItem(k)));
    }
  }, [props.id,props.side]);

  useEffect(() => {
    let k = props.id+props.side
    if(values.length!==0){
      window.localStorage.setItem(k,JSON.stringify(values));
    }
  }, [values,props.id,props.side]);
  

  if (options.val !== 0 && values.length!==0 && !values.every((val) => options.includes(val))) {
    setValues((pvalues) => {
      let k = [...pvalues];
      k = k.filter((item) => options.includes(item));
      return k;
    });
  }
  // if(props.already_given.length!==0){
  //   setValues((val)=>{
  //     return [...props.already_given]
  //   })
  // }
  const handleAddChip = (_, newValue) => {
    if (newValue && !values.includes(newValue)) {
      setValues((pval) => [...pval, newValue]);
      console.log("will call the function");
    }
  };

  const handleDeleteChip = (valueToDelete) => {
    setValues((prevValues) =>
      prevValues.filter((value) => value !== valueToDelete)
    );
  };

  return (
    <div style={{ flex: "1 1 auto" }}>
      <ThemeProvider theme={darkTheme}>
        <Stack>
          <Autocomplete
            sx={{
              display: "flex",
              justifyContent: props.start === 1 ? "start" : "end",
            }}
            theme="dark"
            multiple
            options={options}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "80%",
                  fieldset: {
                    "&:hover": {
                      borderColor: "#ffffff",
                    },
                  },
                }}
                variant="outlined"
                label="Select multiple options"
                placeholder="Enter an option"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddChip(null, event.target.value.trim());
                  }
                }}
              />
            )}
            value={values}
            onChange={(_, newValue) => setValues(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={option}
                  onDelete={() => handleDeleteChip(option)}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </Stack>
      </ThemeProvider>
    </div>
   
  );
}

export default Fdinput;

