import {useState, useEffect} from 'react';
import { useForm} from 'react-hook-form';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import Row from './Row';

const SubmitForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [listOfUsers, setListOfUsers] = useState([]);

  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log("Effect Use")
      axios.get("http://localhost:3001/getUsers")
      .then((response) => {
          setListOfUsers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [count]);

  console.log(listOfUsers)

  const rowLists = listOfUsers?.map(item => {
    return (
        <Row 
            
            {...item}
        />
    )
  }) 

  const onSubmit = async (data) => {
    try {
      const response = axios.post("http://localhost:3001/insert", data); 
      setCount(prevCount => prevCount + 1);
      console.log(count)
      
      setListOfUsers([
        ...listOfUsers,
            userDetails.first_name, 
            userDetails.last_name,
            userDetails.email_address
      ]);
      
      setSuccessMessage('Successfully submitted!.');
      setErrorMessage('');
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log('error', error.response.data);
        setErrorMessage(error.response.data);
      }
    }
  };

  return (
    <div className='m-auto w-3/5'>
      <Form className="form bg-white" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="first_name" className='w-full'>
          <Form.Label className='font-medium'>First Name</Form.Label>
          <Form.Control
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
                {rowLists}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default SubmitForm;