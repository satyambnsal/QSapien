import React from 'react';
import {PropTypes} from 'prop-types';

const Errors=(props)=>{
    const {errors}=props;
    return(
        <div>
            <ul>
                {
                    errors.map(error=>(
                        <li key={error.time}>{error.body}</li>
                    ))
                }
            </ul>
        </div>
    )
}
Errors.propTypes={
    errors:PropTypes.arrayOf(
        PropTypes.shape({
            body:PropTypes.string,
            time:PropTypes.date
        })
    )
}
export default Errors;