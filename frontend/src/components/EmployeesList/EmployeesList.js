import EmployeeCheckbox from '../EmployeeCheckbox/EmployeeCheckbox';

function EmployeesList(props) {

    // manage the employees list and who need to be compared
    function toggleEmployee(evt) {
        const employees = document.querySelectorAll('.employees-checkbox__checkbox');
        const checkedEmployees = Array.from(employees).filter(employee => { return employee.checked; });
        if (checkedEmployees.length >= 2) {
            employees.forEach(employee => {
                if (!employee.checked) {
                    employee.disabled = true;
                }
            })
        } else {
            employees.forEach(employee => { employee.disabled = false; })
        }
        props.assignEmployees(props.list[checkedEmployees[0]?.id] || null, props.list[checkedEmployees[1]?.id] || null);
    }

    return (
        <section className="employees-list">
            <ul className='employees-list__list'>
                {props.list.map((employee, i) => {
                    return (
                        <EmployeeCheckbox
                        key={i}
                        employee={employee}
                        toggleEmployee={toggleEmployee}
                        index={i}
                        assignEmployeeToUpdate={props.assignEmployeeToUpdate}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default EmployeesList;