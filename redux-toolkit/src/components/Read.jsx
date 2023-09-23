import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../redux/features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const [id, setId] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState("");
  const dispatch = useDispatch();
  const { users, loading, searchData } = useSelector((state) => state.app);
  useEffect(() => {
    // console.log(showUser());
    dispatch(showUser());
  }, [dispatch]);
  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data</h2>
      <div className="mx-auto w-50">
        <input
          class="form-check-input"
          type="radio"
          id="flexRadioDefault1"
          name="gender"
          checked={radioData === ""}
          onChange={(e) => setRadioData("")}
        />
        <label class="form-check-label">All</label>
        <input
          class="form-check-input"
          type="radio"
          id="flexRadioDefault1"
          name="gender"
          value="male"
          checked={radioData === "male"}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label class="form-check-label">Male</label>
        <input
          class="form-check-input"
          type="radio"
          id="flexRadioDefault1"
          name="gender"
          value="female"
          checked={radioData === "female"}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label class="form-check-label">Female</label>
      </div>
      <div>
        {users &&
          users
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
              if (radioData === "male") {
                return ele.gender === radioData;
              } else if (radioData === "female") {
                return ele.gender === radioData;
              } else {
                return ele;
              }
            })

            .map((ele) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${ele.id}`} className="card-link">
                    edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
