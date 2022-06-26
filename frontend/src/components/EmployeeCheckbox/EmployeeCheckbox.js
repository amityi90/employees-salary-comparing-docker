import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EmployeeCheckbox(props) {

    const inputRef = useRef(null);

    // define the employ that will be updated
    function assignEmployeeToEdit() {
        props.assignEmployeeToUpdate(props.employee);
    }

    return (
        <li
            className="employees-checkbox"
        >
            <label className={`employees-checkbox__label ${inputRef?.current?.disabled && 'employees-checkbox__label_disabled'}`} htmlFor={props.index}>
                <input
                    className='employees-checkbox__checkbox'
                    type="checkbox"
                    id={props.index}
                    name={props.employee.Name}
                    onChange={props.toggleEmployee}
                    ref={inputRef}
                />
                <div className='employees-checkbox__new-checkbox'>
                    {inputRef?.current?.checked && <div className='employees-checkbox__checkbox-fill' />}
                </div>
                <p className='employees-checkbox__label-text'>{props.employee.Name}</p>
            </label>
            <Link className='employees-checkbox__edit-buttom' to="/edit" onClick={assignEmployeeToEdit}>
                <div className="employees-checkbox__edit-icon" />
                Edit
            </Link>
        </li>
    );
}

export default EmployeeCheckbox;