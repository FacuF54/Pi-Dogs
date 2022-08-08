import React from 'react';
import { Link } from 'react-router-dom';
import landing from './landing.module.css';

const LandingPage = ()=> {
    return (
        <div className={landing.contain}>
            <div className={landing.containButton}>
                <Link to="/home"  className={landing.linkNav}>
                    <button className={landing.botonLanding}>Woof! ʕ•́ᴥ•̀ʔっ</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage 