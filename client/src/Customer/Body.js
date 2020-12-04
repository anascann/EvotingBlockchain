import React, { useState } from "react";

const Body = ({ canidate1, canidate2, votecanidate, account }) => {
  const [Canidate, setCandidate] = useState("");

  const onchange = (e) => {
    setCandidate(e.target.value);
    console.log(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Canidate.id !== 0) votecanidate(Number(Canidate));
    else window.alert("there is error in submission");
  };

  return (
    <div className="mt-4 text-center" style={{ color: "#000000" }}>
      <h2>Election </h2>
      <hr
        style={{
          width: "70%",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#000000",
        }}
      />
      <div className="p-3 ml-auto mr-auto" style={{ width: "40%" }}>
        <div className="row ml-auto mr-auto  mb-2" style={{ width: "90%" }}>
          <div className="col">
            <p>#</p>
          </div>
          <div className="col">
            <p>Name</p>
          </div>
          <div className="col">
            <p>Votes</p>
          </div>
        </div>
        <hr
          style={{ width: "90%", borderStyle: "solid", borderColor: "#000000" }}
        />
        <div
          className="row ml-auto mr-auto mt-2  mb-2"
          style={{ width: "90%" }}
        >
          <div className="col">
            <p><h5>canditate 1</h5></p>
          </div>
          <div className="col">
            <p><h5>obama</h5></p>
          </div>
          <div className="col">
            <p><h5>4</h5></p>
          </div>
        </div>
        <hr
          style={{ width: "90%", borderStyle: "solid", borderColor: "#000000" }}
        />
        <div
          className="row ml-auto mr-auto mt-2  mb-2"
          style={{ width: "90%" }}
        >
          <div className="col">
            <p><h5>canidate 1</h5></p>
          </div>
          <div className="col">
            <p><h5>donald trump</h5></p>
          </div>
          <div className="col">
            <p><h5>3</h5></p>
          </div>
        </div>
      </div>
      <div className="my-5 mr-auto ml-auto text-left" style={{ width: "70%" }}>
        <h5>Cast Your Vote:</h5>
        <form onSubmit={onsubmit}>
          <select name="candidate" className="form-control" onChange={onchange}>
            <option defaultValue value="">
              Select
            </option>
            <option value="1"><h5>name</h5></option>
            <option value="2"><h5>name</h5></option>
          </select>
          <button className="btn btn-primary mt-2 btn-md w-100">
            Vote Candidate{""} {Canidate}
          </button>
        </form>
      </div>
      <p className="my-5">
        Your address: <span className="font-weight-bold">{account}</span>
      </p>
    </div>
  );
};

export default Body;