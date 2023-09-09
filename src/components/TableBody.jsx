import React from 'react'

const TableBody = ({allOrFilterUsers}) => {
  return (
    <tbody>
              {allOrFilterUsers.map((user) => (
                <tr className="hover:bg-[#ebebeb]">
                  <td className="p-3 border border-slate-300">
                    {user.firstName}
                  </td>
                  <td className="p-3 border border-slate-300">
                    {user.lastName}
                  </td>
                  <td className="p-3 border border-slate-300">
                    {user.maidenName}
                  </td>
                  <td className="p-3 border border-slate-300">{user.age}</td>
                  <td className="p-3 border border-slate-300">{user.gender}</td>
                  <td className="p-3 border border-slate-300">{user.email}</td>
                  <td className="p-3 border border-slate-300">
                    {user.username}
                  </td>
                  <td className="p-3 border border-slate-300">
                    {user.bloodGroup}
                  </td>
                  <td className="p-3 border border-slate-300">
                    {user.eyeColor}
                  </td>
                </tr>
              ))}
            </tbody>
  )
}

export default TableBody