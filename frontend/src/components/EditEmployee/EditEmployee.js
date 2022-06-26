import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

function EditEmployee(props) {

    const [values, setValues] = useState(props.employeeToEdit);
    const [isSending, setIsSending] = useState(false);
    const [sendingMessage, setSendingMessage] = useState('');


    // initilazing the form details
    useEffect(() => {
        setIsSending(false);
        setValues(props.employeeToEdit);
    }, [props.employeeToEdit])

    const handleChange = (event) => {
        setIsSending(false);
        setSendingMessage('');
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
    };

    function resetToOrigin(e) {
        setIsSending(false);
        e.preventDefault();
        setSendingMessage('');
        setValues(props.employeeToEdit);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSending(true);
        props.updateEmployee(values)
            .then((data) => {
                setSendingMessage('Details Updated');
                setIsSending(false);
            })
            .catch(() => {
                setSendingMessage('try again');
                setIsSending(false);
            });
    }
    return (
        <section className="edit-employee">
            <Link className='edit-employee__back-buttom' to="/" >{'< Back'}</Link>
            <h1 className='edit-employee__title'>{props.employeeToEdit.Name || 'Name'}</h1>
            <form className='edit-employee__form'>
                <h2 className='edit-employee__form-title'>Edit Details</h2>
                <ul className='edit-employee__inputs-list'>
                    <li className="edit-employee__input-container">
                        <label
                            className='edit-employee__ladel'>
                            Address

                        </label>
                        <input
                            className='edit-employee__input'
                            type="text"
                            value={values.Address || ''}
                            onChange={handleChange}
                            name="Address"
                            required
                        />
                    </li>
                    <li className="edit-employee__input-container">
                        <label
                            className='edit-employee__ladel'>
                            Phone
                        </label>
                        <input
                            className='edit-employee__input'
                            type="text"
                            value={values.Phone || ''}
                            onChange={handleChange}
                            name="Phone"
                            required
                        />
                    </li>
                    <li className="edit-employee__input-container">
                        <label
                            className='edit-employee__ladel'>
                            Email
                        </label>
                        <input
                            className='edit-employee__input'
                            type="email"
                            value={values.Email || ''}
                            onChange={handleChange}
                            name="Email"
                            required
                        />
                    </li>
                    <li className="edit-employee__input-container">
                        <label
                            className='edit-employee__ladel'>
                            Marital Status
                        </label>
                        <input
                            className='edit-employee__input'
                            type="text"
                            value={values.MaritalStatus || ''}
                            onChange={handleChange}
                            name="MaritalStatus"
                            required
                        />
                    </li>
                    <li className="edit-employee__input-container">
                        <label
                            className='edit-employee__ladel'>
                            Gender
                        </label>
                        <input
                            className='edit-employee__input'
                            type="text"
                            value={values.Gender || ''}
                            onChange={handleChange}
                            name="Gender"
                            required
                        />
                    </li>
                </ul>
                <div className='edit-employee__buttons-container'>
                    <div className="edit-employee__submition-conainer">
                        <input className='edit-employee__button edit-employee__button_update' type='submit' value={'Update'} onClick={handleSubmit} />
                        {isSending ? <Preloader/> : <p className='edit-employee__submition-message'>{sendingMessage}</p>}
                    </div>
                    <button className='edit-employee__button edit-employee__button_cancel' onClick={resetToOrigin}>Cancel</button>
                </div>
            </form>
        </section>
    );

}

export default EditEmployee;