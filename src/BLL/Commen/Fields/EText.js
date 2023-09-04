import TextField from '@mui/material/TextField';


function EText({ item, formik }) {
    return (
        <div className={item.GridName}>
            <TextField
                sx={{ m: 1, minWidth: item.width }}
                id={item.name}
                inputProps={{
                    autocomplete: 'new-text',
                    form: {
                        autocomplete: 'off',
                    },
                }}
                name={item.name}
                label={item.label}
                variant="outlined"
                fullWidth
                key={item.name}
                margin="normal"
                placeholder={item.label}
                value={formik.values[item?.name]}
                onChange={formik.handleChange}
                type={item.type}
                onBlur={formik.handleBlur}
                error={formik.errors[item.name] && formik.touched[item.name]}
                helperText={formik.errors[item.name] && formik.touched[item.name] && (
                    <div className="input-feedback">{formik.errors[item.name]}</div>
                )}
            />
        </div>
    );
}

export default EText;
