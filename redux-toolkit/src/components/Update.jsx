import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/features/userDetailsSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(id);s
  const [updateData, setUpdateData] = useState();
  const { users, loading } = useSelector((state) => state.app);
  //   console.log(users);
  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user.id === id);
      setUpdateData(singleUser[0]);
    }
  }, [id, users]);
  //   console.log(updateData);
  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };
  return (
    <div>
      <h2 className="my-2 text-center">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            value={updateData && updateData.name}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={updateData && updateData.email}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Age
          </label>
          <input
            type="text"
            class="form-control"
            name="age"
            value={updateData && updateData.age}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            type="radio"
            id="flexRadioDefault1"
            name="gender"
            value="male"
            checked={updateData && updateData.gender === "male"}
            onChange={newData}
          />
          <label class="form-check-label">Male</label>
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            value="female"
            onChange={newData}
            checked={updateData && updateData.gender === "female"}
          />
          <label class="form-check-label">Female</label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
