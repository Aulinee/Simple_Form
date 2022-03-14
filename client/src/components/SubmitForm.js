import {useState, useEffect, Fragment} from 'react';
import { useForm} from 'react-hook-form';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

const SubmitForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [listOfUsers, setListOfUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: ""
  });

  const [editUserId, setEditUserId] = useState(null);

  const [count, setCount] = useState(1)

  const handleEditClick = (user) => {
    const formValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    };

    setEditUserId(user.userID);
    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleAddFormSubmit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, {firstname:editFormData.firstName, lastname:editFormData.lastName, emailaddress:editFormData.emailAddress })
    .then((response) => {
        setListOfUsers(
          listOfUsers.filter((val) => {
            return val.userID == id
                ? {
                    firstName: val.firstName,
                    lastName: val.lastName,
                    emailAddress: val.emailAddress,
                  }
                : val;
          })
        );
        setEditUserId(null);
      }
    );

    // const newContact = {
    //   id: nanoid(),
    //   fullName: addFormData.fullName,
    //   address: addFormData.address,
    //   phoneNumber: addFormData.phoneNumber,
    //   email: addFormData.email,
    // };

    // const newContacts = [...contacts, newContact];
    // setContacts(newContacts);
  };
  
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then((response) => {
      setListOfUsers(
        listOfUsers.filter((val) => {
          return val.userID != id;
        })
      );
    });
    console.log("Delete" + id)
  };

  const onSubmit = (data) => {
    try {
      axios.post("http://localhost:3001/insert", data)
      .then((response) => {
        setListOfUsers([
          ...listOfUsers, 
          {
            firstName, 
            lastName,
            emailAddress
          }
        ]
        );
      }); 
      
      setCount(prevCount => prevCount + 1);
      setSuccessMessage('Successfully submitted!.');
      setErrorMessage('');

    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log('error', error.response.data);
        setErrorMessage(error.response.data);
      }
    }
  };

  const rowLists = Array.isArray(listOfUsers) && listOfUsers.map(item => {
    return (
        <Fragment>
            {editUserId === item.userID ? (
              <EditableRow
                editFormData={editFormData}
                editUserId={editUserId}
                handleEditFormChange={handleEditFormChange}
                handleCancelClick={handleCancelClick}
                handleAddFormSubmit={handleAddFormSubmit}
              />
            ) : (
              <ReadOnlyRow 
                key={item.userID}
                {...item}
                handleUpdate={handleEditClick}
                handleEditFormChange={handleEditFormChange}
                handleDelete={deleteUser}
              />
            )}
          </Fragment>
    )
  })

  useEffect(() => {
    console.log("Effect Use")
    console.log("b" + editFormData);
    console.log("c" + editUserId);

    axios.get("http://localhost:3001/getUsers")
    .then((response) => {
        setListOfUsers(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [count, editUserId, editFormData]);


  return (
    <div className='m-auto w-3/5'>
      <Form className="form bg-white" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="first_name" className='w-full'>
          <Form.Label className='font-medium'>First Name</Form.Label>
          <Form.Control
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            autoComplete="off"
            ref={register({
              required: 'First name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name should contain only characters.'
              }
            })}
            className={errors.first_name ? 'form--input outline-red-600' : 'form--input'}
          />
          {errors.first_name && (
            <p className="text-red-600 pb-4 m-0">{errors.first_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="last_name" className='w-full'>
          <Form.Label className='font-medium'>Last Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            name="last_name"
            placeholder="Enter your last name"
            autoComplete="off"
            ref={register({
              required: 'Last name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Last name should contain only characters.'
              }
            })}
            className={errors.last_name ? 'form--input outline-red-600' : 'form--input'}
          />
          {errors.last_name && (
            <p className="text-red-600 pb-4 m-0">{errors.last_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="email_address" className='w-full'>
          <Form.Label className='font-medium'>Email address</Form.Label>
          <Form.Control
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
            type="text"
            name="email_address"
            placeholder="Enter your email address"
            autoComplete="off"
            ref={register({
              required: 'Email address is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.'
              }
            })}
            className={errors.email_address ? 'form--input outline-red-600' : 'form--input'}
          />
          {errors.email_address && (
            <p className="text-red-600 pb-4 m-0">{errors.email_address.message}</p>
          )}
        </Form.Group>
        
        <Button className='form--submit ' type="submit">
          Submit
        </Button>

        {errorMessage ? <p className='text-red-600'>{errorMessage}</p> : <p className='text-green-700 pt-4'>{successMessage}</p>}
        
      </Form>

      <div className="form bg-white mt-6">
        <h1 className='text-3xl uppercase font-medium text-black text-center mb-5'>List of users</h1>
        <table className='border-collapse border border-gray-300'>
            <thead className="bg-gray-50">
                <tr>
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
                {rowLists}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default SubmitForm;