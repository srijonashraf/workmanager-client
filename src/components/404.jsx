import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            404 Error!
            <NavLink className="btn btn-primary" to={"/login"}>Go Back</NavLink>
        </div>
    );
};

export default Error;