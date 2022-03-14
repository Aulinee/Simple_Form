import React from 'react';
import '../style.css'

function EditableRow(props) {
    return (
        <tr className="whitespace-nowrap bg-purple-200">
            <td className="px-6 py-4">
                <input
                    className="text-sm text-black-900 bg-purple-200 w-full box-border"
                    type="text"
                    required="required"
                    placeholder="Enter your firstname..."
                    name="firstName"
                    value={props.editFormData.firstName}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td className="px-6 py-4">
                <input
                    className="text-sm text-black-900 bg-purple-200 w-full box-border"
                    type="text"
                    required="required"
                    placeholder="Enter your lastname..."
                    name="lastName"
                    value={props.editFormData.lastName}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td className="px-6 py-4">
                <input
                    className="text-sm text-black-900 bg-purple-200 w-full box-border"
                    type="text"
                    required="required"
                    placeholder="Enter your emailAddress..."
                    name="emailAddress"
                    value={props.editFormData.emailAddress}
                    onChange={props.handleEditFormChange}
                ></input>
            </td>
            <td className="px-6 py-4">
                <button className="px-4 py-1 text-sm text-white bg-blue-400 rounded cursor-pointer" onClick={() => {props.handleAddFormSubmit(props.editUserId);}}>Save</button>
            </td>
            <td className="px-6 py-4">
                <button className="px-4 py-1 text-sm text-white bg-red-400 rounded cursor-pointer" onClick={props.handleCancelClick}>Cancel</button>
            </td>
        </tr>
    );
  }
  
  export default EditableRow;