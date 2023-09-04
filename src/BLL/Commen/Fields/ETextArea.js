import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ETextArea({ item, formik }) {
    return (
        <div className={item.GridName}>
            <Autocomplete
                options={[]}
                freeSolo={true}
                sx={{ width: 280 }}
                renderInput={(params) => {
                    return <TextField {...params}
                        key={item.name}
                        id={item.name}
                        sx={{ m: 1, width: 280 }}
                        value={formik.values[item.name]}
                        onChange={formik.handleChange}
                        type={item.type}
                        placeholder={item.name}
                        name={item.name}
                        label={item.name}
                        multiline={true}
                        error={formik.errors[item.name] && formik.touched[item.name]}
                        helperText={formik.errors[item.name] && formik.touched[item.name] ? (
                            <div className="input-feedback">{formik.errors[item.name]}</div>
                        ) : item.helperText}
                        onBlur={formik.handleBlur}
                    />

                }}
            />
        </div>
    );
}

export default ETextArea;