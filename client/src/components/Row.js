import React from 'react';
import '../style.css'

function Row(props) {
    return (
        <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-sm text-gray-500">
                {props.userID}
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                    {props.firstName}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-500">
                    {props.lastName}
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
                {props.emailAddress}
            </td>
            <td className="px-6 py-4">
                <button className="px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</button>
            </td>
            <td className="px-6 py-4">
                <button className="px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</button>
            </td>
        </tr>
    );
  }
  
  export default Row;