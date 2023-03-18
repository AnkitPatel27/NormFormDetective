import React, { useState } from "react";
import "./css_modules/app.css";
import image_h from "./images/Group.png";
import "./css_modules/button.css";
import Attrinput from "./components/attrinput";
import Attrdisp from "./components/attrdisp";
import Fdinput from "./components/fdinput";
import { uid } from "uid";
import { Stack } from "@mui/system";
import { Tab, Tabs  } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TabPanel from "./components/tabpanel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

let Fds = [];

function App() {
  const [uid_fd, setuid_fd] = useState([uid()]);
  const [attributes, setattributes] = useState(new Set());
  const [tabvalue, set_tabvalue] = useState(0);
  const datafrominput = (value) => {
    setattributes((pattributes) => {
      let k = new Set(pattributes);
      k.add(value);
      return k;
    });
  };

  const delete_attr = (chipval) => {
    if (attributes.has(chipval)) {
      setattributes((pattributes) => {
        let k = new Set(pattributes);
        k.delete(chipval);
        return k;
      });
    }
  };

  const inc_n_fd = () => {
    setuid_fd((prev) => {
      let k = [...prev];
      k.push(uid());
      return k;
    });
  };

  const delete_fd = (event) => {
    setuid_fd((prev) => {
      let k = [...prev];
      k = k.filter(function (item) {
        return item !== event.target.id;
      });
      return k;
    });

    Fds = Fds.filter(function (item) {
      return item["uid"] !== event.target.id;
    });
  };

  const handleTabChange = (e, val) => {
    set_tabvalue(val);
  };

  const take_fd_data = (side, id, data) => {
    let index = Fds.findIndex((val) => {
      if (val["uid"] === id) {
        return true;
      }
      return false;
    });
    if (index === -1 && data.length !== 0) {
      Fds = [...Fds, { uid: id }];
      index = Fds.length - 1;
    }
    if (side === "L" && index !== -1) {
      Fds[index]["lhs"] = [...data];
    }
    if (side === "R" && index !== -1) {
      Fds[index]["rhs"] = [...data];
    }
  };

  const handleClickbutton = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="gridContainer">
        <div className="header">
          <span id="header_1">Normalize with ease </span>
          <br></br>
          <span id="header_2">Let us determine the form for you!</span>
        </div>
        <img src={image_h} alt="" className="image_h" />
        <div className="header_subtext">
          <div id="hs1_1">
            Take control of your database's organization -<br /> Enter your
            functional dependencies and desired form to achieve optimal
            normalization!
          </div>
          <div>
            <button className="buttons" onClick={handleClickbutton}>Scroll to bottom</button>
          </div>
        </div>

        <div className="Tabs">
          <ThemeProvider theme={darkTheme}>
            <Stack>
              <Tabs
                value={tabvalue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="Tabspanel"
              >
                <Tab sx={{ minWidth: "150px" }} label="Set Attributes" />
                <Tab sx={{ minWidth: "150px" }} label="Minimal Cover or 3NF" />
                <Tab sx={{ minWidth: "150px" }} label="Candidate Keys" />
                <Tab sx={{ minWidth: "150px" }} label="Check Normal Form" />
                <Tab sx={{ minWidth: "150px" }} label="2nd NF" />
                <Tab sx={{ minWidth: "150px" }} label="3rd NF" />
                <Tab sx={{ minWidth: "150px" }} label="BCNF" />
              </Tabs>
              <TabPanel
                key={15464564}
                className="Tabspanel"
                value={tabvalue}
                index={0}
              >
                <div className="attr_input">
                  <h1>Add Attributes</h1>
                  <Attrinput datafrominput={datafrominput} />
                  {/* <Button variant="contained" color="success" disableElevation>
                    Add Attribute
                  </Button> */}
                 
                </div>
                <div className="attr_disp">
                  {[...attributes].map((value) => {
                    return (
                      <Attrdisp
                        key={value}
                        label={value}
                        delete_attr={delete_attr}
                      ></Attrdisp>
                    );
                  })}
                </div>
                <div className="fdinput_disp_container">
                  <h1>
                    Functional Dependencies
                    <span
                      className="material-symbols-outlined icon add"
                      onClick={inc_n_fd}
                    >
                      add_circle
                    </span>
                  </h1>

                  {uid_fd.map((value, index) => {
                    // let indfds = Fds.findIndex((val) => {
                    //   if (val["uid"] === value) {
                    //     return true;
                    //   }
                    //   return false;
                    // });
                    return (
                      <div key={value} className="fdinput_disp">
                        <Fdinput
                          options={[...attributes]}
                          side="L"
                          id={value}
                          passData={take_fd_data}
                          start={1}
                        ></Fdinput>
                        <span className="material-symbols-outlined icon">
                          arrow_right_alt
                        </span>
                        <Fdinput
                          options={[...attributes]}
                          side="R"
                          id={value}
                          passData={take_fd_data}
                          start={0}
                        ></Fdinput>
                        <span
                          className="material-symbols-outlined icon delete"
                          id={value}
                          onClick={delete_fd}
                        >
                          delete_forever
                        </span>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel
                key={21231231}
                className="Tabspanel"
                value={tabvalue}
                query="Find Minimal Cover/Find 3NF Other Method"
                index={1}
                Fds={Fds}
                attributes={attributes}
              ></TabPanel>
              <TabPanel
                key={3789789890}
                className="Tabspanel"
                query="Find Candidate Keys"
                value={tabvalue}
                index={2}
                Fds={Fds}
                attributes={attributes}
              ></TabPanel>
              <TabPanel
                key={43544365689}
                className="Tabspanel"
                query="Check Normal Form"
                value={tabvalue}
                index={3}
                Fds={Fds}
                attributes={attributes}
              ></TabPanel>
              <TabPanel
                key={5647463563}
                className="Tabspanel"
                query="Normalize to 2NF"
                value={tabvalue}
                index={4}
                Fds={Fds}
                attributes={attributes}
                datafrom={"NFForm_2"}
              ></TabPanel>
              <TabPanel
                key={6735564645}
                className="Tabspanel"
                query="Normalize to 3NF"
                value={tabvalue}
                index={5}
                Fds={Fds}
                attributes={attributes}
                datafrom={"NFForm_3"}
              ></TabPanel>
              <TabPanel
                key={74567362727}
                className="Tabspanel"
                query="Normalize to BCNF"
                value={tabvalue}
                index={6}
                Fds={Fds}
                attributes={attributes}
                datafrom={"BCNF_Form"}
              ></TabPanel>
            </Stack>
          </ThemeProvider>
        </div>
      </div>
      {/* <div>Please donot enter same value on both side of functionaldependency this may generate wrong answer</div> */}
    </>
  );
}
export default App;
