import logo from '../../images/odm-logo.png'
import React, { useState, useEffect } from 'react';

function Header() {

    const [timeToRender, setTimeToRender] = useState('');

    // set and format the date
    function setDate() {
        const NewDate = new Date();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'][NewDate.getMonth()];
        const day = NewDate.getDate();
        const year = NewDate.getFullYear();
        const time = `${NewDate.getHours() > 12 ? NewDate.getHours() - 12 : NewDate.getHours()}:${NewDate.getMinutes()}:${NewDate.getSeconds()} ${NewDate.getHours() > 12 ? 'pm' : 'am'}`;
        const timeZone = `GMT ${NewDate.getTimezoneOffset() > 0 ? '-' : '+'}${NewDate.getTimezoneOffset() / (-60)}`;
        setTimeToRender(`${month} ${day}, ${year}, ${time} ${timeZone}`);
    }

    // run the clock
    useEffect(() => {
        setInterval(setDate, 1000);
    }, [])

    return (
        <header className="header">
            <img className='header__logo' src={logo} alt='logo' />
            <p className='header__date'>{timeToRender}</p>
        </header>
    );
}

export default Header;