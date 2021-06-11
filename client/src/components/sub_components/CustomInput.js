import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  field: {
      marginBottom: theme.spacing(2)
  },
}));

const CustomInput = ({ value, setValue, error_message, ...rest }) => {
    const classes = useStyles();

    return(
        <div className={classes.field}>
            <TextField 
                onChange={(e) => setValue(e.target.value)}
                value={value}
                autoComplete="off"
                variant="outlined"
                error={error_message !== ''} 
                helperText={error_message}
                fullWidth
                {...rest}
            />
        </div>
    );
};

export default CustomInput;