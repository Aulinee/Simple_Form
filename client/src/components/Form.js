import React, { useRef } from "react"
import axios from 'axios';

export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            emailAddress: ""
        }
    )

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        const {name, value} = event.target
        axios.post("http://localhost:3001/create", formData)
        .then(() => {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        });
    }

    
    console.log(formData)
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="First Name"
                    className="form--input"
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}

                />
                <input 
                    type="text" 
                    placeholder="Last Name"
                    className="form--input"
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}

                />
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="form--input"
                    name="emailAddress"
                    onChange={handleChange}
                    value={formData.emailAddress}

                />
                <input className="form--submit" type="submit" />
            </form>
            
        </div>
    )
}
