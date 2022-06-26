import { useState, useEffect } from 'react';
import moreIcon from '../../images/Rectangle-more.png';
import lessIcon from '../../images/Rectangle-less.png';

function ComparingSection(props) {

    const [richEmployee, setRichEmployee] = useState({});
    const [poorEmployee, setPoorEmployee] = useState({});

    function formatToMomey(num = 0) {
        if (num < 0) {
            return `-$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(1)}`;
        }
        return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }


    // here the calaculation of the salary been made instead in api
    useEffect(() => {
        if (props.firstEmployee && props.secondEmployee) {
            props.firstEmployee.YearlyIncome = props.firstEmployee.Salary * 12;
            props.secondEmployee.YearlyIncome = props.secondEmployee.Salary * 12;
            props.firstEmployee.YearlyIncomeDifference = props.firstEmployee.YearlyIncome - props.secondEmployee.YearlyIncome;
            props.secondEmployee.YearlyIncomeDifference = props.secondEmployee.YearlyIncome - props.firstEmployee.YearlyIncome;

            if (props.firstEmployee.Salary > props.secondEmployee.Salary) {
                setRichEmployee(props.firstEmployee);
                setPoorEmployee(props.secondEmployee);
            } else {
                setRichEmployee(props.secondEmployee);
                setPoorEmployee(props.firstEmployee);
            }

        }
    }, [props?.firstEmployee?.Salary, props?.secondEmployee?.Salary])

    return (
        <section className="comparing-section">
            {
                (props.firstEmployee && props.secondEmployee) ?
                    <article className="comparing-section_main-container">
                        <h1 className='comparing-section__title'>so...<br />
                            Who earns the most?</h1>
                        <div className='comparing-section__comparing-container'>
                            <div className="comparing-section__employee-container comparing-section__employee-container_rich">
                                <div className='comparing-section__employee'>
                                    <h2 className="comparing-section__employee-name">{richEmployee.Name || ''}</h2>
                                    <p className="comparing-section__employee-salary">{formatToMomey(richEmployee.YearlyIncome) || ''}</p>
                                </div>
                                <p className='comparing-section__difference'>
                                    {formatToMomey(richEmployee.YearlyIncomeDifference) || ''}
                                    <img className="comparing-section__difference-icon" src={moreIcon} alt="more icon" />
                                </p>
                            </div>
                            <div className="comparing-section__vs-container">
                                <h3 className="comparing-section__vs-title">Vs.</h3>
                                <p className="comparing-section__vs-description">Yearly income</p>
                            </div>
                            <div className="comparing-section__employee-container comparing-section__employee-container_poor">
                                <div className='comparing-section__employee'>
                                    <h2 className="comparing-section__employee-name">{poorEmployee.Name || ''}</h2>
                                    <p className="comparing-section__employee-salary">{formatToMomey(poorEmployee.YearlyIncome) || ''}</p>
                                </div>
                                <p className='comparing-section__difference'>
                                    {formatToMomey(poorEmployee.YearlyIncomeDifference) || ''}
                                    <img className="comparing-section__difference-icon" src={lessIcon} alt="less icon" />
                                </p>
                            </div>
                        </div>
                    </article>
                    :
                    <p className='comparing-section__pick-message'>Pick 2 Employees<br /><span>and see who<br />earns the most</span></p>


            }
        </section>
    );
}

export default ComparingSection;