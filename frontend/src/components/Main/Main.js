import EmployeesList from "../EmployeesList/EmployeesList";
import ComparingSection from "../ComparingSection/ComparingSection";

function Main(props) {
    return(
        <main className="main">
            <EmployeesList
             list={props.employeesList}
             assignEmployees={props.assignEmployees}
             assignEmployeeToUpdate={props.assignEmployeeToUpdate}
            />
            <ComparingSection
            firstEmployee={props.firstEmployee}
            secondEmployee={props.secondEmployee}
            />

        </main>
    );
}

export default Main;