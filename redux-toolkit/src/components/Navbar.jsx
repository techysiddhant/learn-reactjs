import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../redux/features/userDetailsSlice";

const Navbar = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.app.users);
  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Redux Toolkit Tutorial
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Create Post
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/read">
                All Posts ({(allUsers && allUsers.length) || 0})
              </Link>
            </li>
          </ul>

          <input
            class="form-control me-2 w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
