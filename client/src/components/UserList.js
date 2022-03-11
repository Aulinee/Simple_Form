import {useState,useEffect} from 'react';
import axios from 'axios';
import Row from './Row';

const UserList = (props) => {
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getUsers").then((response) => {
            setListOfUsers(response.data);
        });
    }, []);

    


    // const rowList = listOfUsers.data.map(item => {
    //     return (
    //         <Row 
    //             key={item.id}
    //             {...item}
    //         />
    //     )
    // })

    return (
        <div className='mx-auto my-10 w-3/5 justify-center'>
            <div className="form bg-white">
            <h1 className='text-3xl uppercase font-medium text-black text-center mb-5'>List of users</h1>
            <table className='border-collapse border border-gray-300'>
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            ID
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            First Name
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Last Name
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Email Addres
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Edit
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {/* {rowList} */}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default UserList;