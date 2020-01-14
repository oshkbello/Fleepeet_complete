import React from 'react'
import {Link } from 'react-router-dom'
export default ()=>{
    return(
        <div className="col-md-3 col-sm-4 col-6 col-lg-2">
            <div className="logo">
                <Link to="/">
                    <img src="images/logo/flipeetLogo1.png" alt="Flipeet Logo" />
                </Link>
            </div>
        </div>
    )
}