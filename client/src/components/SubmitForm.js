import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import { BASE_API_URL } from '../utils/constants';

const SubmitForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = axios.post("http://localhost:3001/insert", data)
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
    <div className="form-container">
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
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
            className={errors.first_name ? 'form--input outline-red' : 'form--input'}
          />
          {errors.first_name && (
            <p className="errorMsg margin-0">{errors.first_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
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
            className={errors.last_name ? 'form--input outline-red' : 'form--input'}
          />
          {errors.last_name && (
            <p className="errorMsg margin-0">{errors.last_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="email_address">
          <Form.Label>Email address</Form.Label>
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
            className={errors.email_address ? 'form--input outline-red' : 'form--input'}
          />
          {errors.email_address && (
            <p className="errorMsg margin-0">{errors.email_address.message}</p>
          )}
        </Form.Group>
        
        <Button className='form--submit' type="submit">
          Submit
        </Button>

        {errorMessage ? <p className='errorMsg'>{errorMessage}</p> : <p className='successMsg'>{successMessage}</p>}
        {userDetails && (
              <div className="user-details">
                <p>Following are the user details:</p>
                <div>First name: {userDetails.first_name}</div>
                <div>Last name: {userDetails.last_name}</div>
                <div>Email: {userDetails.email_address}</div>
              </div>
            )}
        
      </Form>
    </div>
  );
};

export default SubmitForm;