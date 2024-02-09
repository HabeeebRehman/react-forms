import { useState } from'react'
import './Form.css'

const intialState = {
    fname:"",
    lname:"",
    email:"",
    phone:"",
}

const Form = () => {
    const [formData , setFormData] = useState(intialState);
    const [formError, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handelChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const validateForm = (data) => {
        const err = {};
        const {fname ,lname , email , phone} = data;

        if (fname.trim() === "") {
            err.fname = "Please enter your first name !";
        }else if (!/^[a-zA-Z]+$/.test(fname)) {
            err.fname = "Please enter valid first name !";
        }
        if (lname.trim() === "") {
            err.lname = "Please enter your last name !";
        }
        if (email.trim() === "") {
            err.email = "Please enter your email !";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            err.email = "Please enter valid email !";
        }
        if (phone.trim() === "" || !/^\d+$/.test(phone)) {
            err.phone = "Please enter valid phone number !";
        }else if (phone.trim().length!== 10) {
            err.phone = "Please enter 10 digit phone number !";
        }
        return err;
    }; 

    const handelSubmit = (e) => {
        e.preventDefault();
        const  errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false);
        }
    }
    return (
        <div className='form-main'>
            {isSubmitted && <h2>Registration Sucessfully Completed</h2>}
            <form onSubmit={handelSubmit} className='input-form'>
                <div className='input-group'>
                    <input type="text"placeholder="First Name" name="fname"
                     value={formData.fname} onChange={handelChange}/>
                    {formError && <p>{formError.fname}</p>}
                </div>

                <div className='input-group'>
                    <input type="text"placeholder="Last Name" name="lname"
                     value={formData.lname} onChange={handelChange}/>
                    {formError && <p>{formError.lname}</p>}
                </div>

                <div className='input-group'>
                    <input type="text"placeholder="Email" name="email"
                     value={formData.email} onChange={handelChange}/>
                    {formError && <p>{formError.email}</p>}
                </div>

                <div className='input-group'>
                    <input type="text"placeholder="Phone no" name="phone"
                     value={formData.phone} onChange={handelChange}/>
                    {formError && <p>{formError.phone}</p>}
                </div>                    

                <input className='submit' type="submit" value="Register"/>
            </form>
        </div>
    )
}
export default Form;