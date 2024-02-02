import { AccountCircle } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

function Input({label, type, icon}) {
    return (
        <FormControl sx={{ width: '50ch' }} variant="outlined">
            <InputLabel htmlFor={label}>{label}</InputLabel>

            <OutlinedInput id={label} type={type} label={label}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton edge="end" >
                           {icon}
                        </IconButton>
                    </InputAdornment>
                }
                fullWidth
            />
        </FormControl>
    )
}

export default Input