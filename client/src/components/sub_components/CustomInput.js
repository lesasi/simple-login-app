import React from 'react';

const CustomInput = ({ value, setValue, error_message, ...rest }) => {
    return(
        <div className="custom_input">
            <div className='custom_input_value half'>
                <input 
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    {...rest}
                />
            </div>
            <div className="error_message half">
                {error_message}
            </div>
        </div>
    );
};

export default CustomInput;