import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
  const [reqData, setreqData] = useState(null);
  const { children } = props;
  const no_data_then = ()=> {
    return  (<>
        <div className="answervis" style={{ padding: "5px" }}>
          or  
          <h1
            style={{
              fontSize: "x-large",
              fontFamily: "sans-serif",
              margin: "10px",
            }}
          >
            No Attributes or Edges given
          </h1>
          <h3 style={{ fontSize: "large", margin: "15px" }}>
            Enter any edges or attributes
          </h3>
        </div>
      </>)
  }
  const get_vis = () => {
    if (props.value !== props.index) {
      return ``;
    }
    if (props.index === 0) {
      return children;
    }
    if (props.index === 1) {
      let data = reqData.minimal_cover;
      let g = (
        <>
          <div>
            {data.map((value, index) => {
              return (
                <>
                  <div className="answervis">
                    <h1
                      style={{
                        fontSize: "x-large",
                        fontFamily: "sans-serif",
                        margin: "10px",
                      }}
                    >
                      Edge {index + 1}
                    </h1>
                    <div className="innerarrow">
                      <div> &#123; {value.left.join(", ")} &#125;</div>
                      <span className="material-symbols-outlined icon">
                        arrow_right_alt
                      </span>
                      <div> &#123; {value.right.join(", ")} &#125;</div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
      if (data.length === 0) {
        g = no_data_then;
      }
      return g;
    }
    if (props.index === 2) {
      let data = reqData.candidate_keys;
      let g = (
        <>
          <div>
            {data.map((value, index) => {
              return (
                <>
                  <div className="answervis">
                    <div style={{ fontSize: "large", margin: "15px" }}>
                      {index + 1}&#93; Candidate key
                    </div>
                    <div style={{ fontSize: "medium", marginBottom: "10px" }}>
                      &#123; {value.join(", ")} &#125;
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
      if (data.length === 0) {
        g = no_data_then;
      }
      return g;
    }
    if (props.index === 3) {
      let data = reqData.normal_form;
      let g = (
        <>
          <div>
            <>
              <div className="answervi">
                <h2>
                  2nd Normal Form{" "}
                  {data["2NF"][0] ? (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "green",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      done
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "red",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      dangerous
                    </span>
                  )}
                </h2>
              </div>
              <div className="answervi">
                <h2>
                  3rd Normal Form{" "}
                  {data["3NF"][0] ? (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "green",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      done
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "red",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      dangerous
                    </span>
                  )}
                </h2>
              </div>
              <div className="answervi">
                <h2>
                  BCNF Normal Form{" "}
                  {data["BCNF"][0] ? (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "green",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      done
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: "red",
                        transform: "scale(1.5)",
                        marginLeft: "10px",
                      }}
                    >
                      dangerous
                    </span>
                  )}
                </h2>
              </div>
            </>
          </div>
        </>
      );
      return g;
    }
    if (props.index === 4 || props.index === 5 || props.index === 6) {
      let data = reqData[props.datafrom];
      let g = (
        <>
          <div>
            {data.map((value, index) => {
              return (
                <>
                  <h1
                    style={{
                      fontSize: "x-large",
                      fontFamily: "sans-serif",
                      margin: "10px",
                    }}
                  >
                    Relation {index + 1}
                  </h1>
                  <div className="answervis">
                    <div style={{ fontSize: "large", margin: "15px" }}>
                      Attributes
                    </div>
                    <div style={{ fontSize: "medium" }}>
                      &#123; {value.attributes.join(", ")} &#125;
                    </div>
                    <div
                      style={{
                        fontSize: "large",
                        margin: "15px",
                        marginTop: "30px",
                      }}
                    >
                      {" "}
                      Functional Dependencies{" "}
                    </div>
                    {value.fds.map((val, ind) => {
                      return (
                        <div className="innerarrow">
                          <div> &#123; {val.left.join(", ")} &#125;</div>
                          <span className="material-symbols-outlined icon">
                            arrow_right_alt
                          </span>
                          <div> &#123; {val.right.join(", ")} &#125;</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
      if (data[0].attributes.length === 0) {
        g = no_data_then;
      }
      return g;
    }
  };


  useEffect(() => {
    function GetDataForGivenForm() {

      const leftk = props.Fds.map((item) => item.lhs);
      const rightk = props.Fds.map((item) => item.rhs);
      const diff = rightk.map((x, index) =>
        x.filter((val) => !leftk[index].includes(val))
      );
      axios
        .post("http://52.149.136.51:8000/api/v1/", {
          data: {
            query: props.query,
            attributes: Array.from(props.attributes),
            left: leftk,
            right: diff,
          },
        })
        .then((res) => {
          setreqData(res.data.data.queryResult);
        })
        .catch((err) => {});
    }
    if (props.index !== 0 && props.value === props.index) {
      setreqData(null);
      GetDataForGivenForm();
    }
  }, [props]);

  if (props.index === 0 && props.value === props.index) {
    return children;
  }
  if (props.value === props.index) {
    return (
      <>
        {reqData ? (
          get_vis()
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
            
            {no_data_then()}
          </Box>
        )}
      </>
    );
  }
};
export default TabPanel;
