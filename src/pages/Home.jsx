import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UsersContext from "../context/UsersContext";

import { CiSearch } from "react-icons/ci";
import { CLEAR_SEARCH_VALUE } from "../userActions";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";

const Home = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [tableHeader] = useState([
    'First Name',
    'Last Name',
    'Maiden Name',
    'age',
    'gender',
    'email',
    'username',
    'bloodgroup',
    'eyecolor'
  ])

  const {
    users,
    loading,
    total,
    pageSize,
    filterUsers,
    search,
    handlePageSizeChange,
    handlePageClick,
    handleSearchChange,
    dispatch
  } = useContext(UsersContext);

  console.log(total / pageSize);

  const totalPagesSize = Math.ceil(total / pageSize);
  const totalPages = [...Array(totalPagesSize).keys()].map((x) => ++x);
  console.log(totalPages);

  const handleSearchVisibility = () => {
    setOpenSearch((prev) => {
      dispatch({ type: CLEAR_SEARCH_VALUE })
      return !prev;
    });
  };

  return (
    <div className="max-w-7xl text-center mx-auto my-10 flex flex-col justify-center">

      <div className="flex gap-4 items-center mb-4">
        <div>
          <select
            onChange={handlePageSizeChange}
            className="p-2 bg-white border-none outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="pl-5">Entries</span>
        </div>

        <div className="flex items-center">
          <CiSearch onClick={handleSearchVisibility} 
            style={{
              cursor: "pointer",
            }}
          />
          {openSearch && (
            <>
              <input
                className="text-sm outline-none border border-slate-400 ml-2 pl-2"
                type="text" name="search"  onChange={handleSearchChange}
              />
              <span
                onClick={handleSearchVisibility}
                className="px-2 mx-1 cursor-pointer"
              >
                x
              </span>
            </>
          )}
        </div>
      </div>

      {loading ? (
        "loading users"
      ) : users?.length > 0 ? (
        <div>
            <table className="border-collapse border border-[#ebebeb] uppercase">
              {<TableHead headerValues={tableHeader} />}
           

            {search.length > 0 ? <TableBody allOrFilterUsers={filterUsers} /> : <TableBody allOrFilterUsers={users} /> }
          </table>

          <div className="mt-5 text-center">
            {totalPages.map((page) => (
              <span
                onClick={() => handlePageClick(page)}
                className="p-2 cursor-pointer"
              >
                {page}
              </span>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Home;
