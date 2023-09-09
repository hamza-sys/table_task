import React, { useEffect, useReducer } from "react";
import UsersContext from "../context/UsersContext";
import { reducer } from "../reducers/UserReducer";
import {
  CHANGE_PAGE_SIZE,
  CHANGE_SEARCH_VALUE,
  COMPLETED_USERS_REQ,
  FILTER_USERS,
  INITIALIZE_USERS_REQ,
  SUCCESS_USERS_REQ,
} from "../userActions";
import axios from "axios";

const UserState = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    pageSize: 5,
    total: 100,
    filterUsers: [],
    search: ''
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    const getUsers = async () => {
      try {
        dispatch({ type: INITIALIZE_USERS_REQ });
        const res = await axios.get(
          `https://dummyjson.com/users?limit=5`
        );

        dispatch({ type: SUCCESS_USERS_REQ, payload: res.data.users });

        dispatch({ type: COMPLETED_USERS_REQ });
      } catch (err) {
        console.log(err);

        dispatch({ type: COMPLETED_USERS_REQ });
      }
    };
    getUsers();
  }, []);

  const handlePageSizeChange = async ({ target: { value } }) => {
    try {
      dispatch({ type: INITIALIZE_USERS_REQ });

      const res = await axios.get(`https://dummyjson.com/users?limit=${value}`);

      dispatch({ type: CHANGE_PAGE_SIZE, payload: { users: res.data.users, pageSize: value } });
      dispatch({type: COMPLETED_USERS_REQ})
    } catch (err) {
      console.log(err);
      dispatch({ type: COMPLETED_USERS_REQ });
    }
  };

  const handlePageClick = async (page) => {
    const p = state.pageSize;
    
    const lastUser = page * p;
    const skip = lastUser - p;

     try {
      dispatch({ type: INITIALIZE_USERS_REQ });

      const res = await axios.get(`https://dummyjson.com/users?limit=${p}&skip=${skip}`);

       dispatch({ type: SUCCESS_USERS_REQ, payload: res.data.users });
       
      dispatch({type: COMPLETED_USERS_REQ})
    } catch (err) {
      console.log(err);
      dispatch({ type: COMPLETED_USERS_REQ });
    }

    console.log(lastUser, skip)
  }

    const handleSearchChange = ({target: {value}}) => {

      const copyUsers = [...state.users]

      dispatch({type: CHANGE_SEARCH_VALUE, payload: value})

      const filteredUsers = copyUsers.filter(user => {
         return user.firstName.includes(value) || user.lastName.includes(value) || user.age.toString().includes(value) || user.email.includes(value) || user.username.includes(value) || user.eyeColor.includes(value) || user.maidenName.includes(value) || user.gender.includes(value)
        
      })

      dispatch({type: FILTER_USERS, payload: filteredUsers})
  }

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        pageSize: state.pageSize,
        total: state.total,
        filterUsers: state.filterUsers,
        search: state.search,
        handleSearchChange,
        handlePageSizeChange,
        handlePageClick,
        dispatch
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UserState;
