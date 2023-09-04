// import { Checkbox, CheckboxGroup } from "@adobe/react-spectrum";
import { FormControl, FormLabel } from "@mui/material";
import React from "react";

function ECheckBox({ item, formik }) {
    const OnChange = (e, i) => {
        if (e) {
            formik.setFieldValue(item.name, [...formik.values[item.name], i.name]);
        }
        else {
            const values = formik.values[item.name]
            var index = values.indexOf(i.name);
            if (index !== -1) {
                values.splice(index, 1);
            }
        }
    }

    return (
        <div className={item.GridName}>
            <FormControl
                className={item.Classes}>
                <FormLabel id="demo-radio-buttons-group-label">{item.label}</FormLabel>
                {/* <CheckboxGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    orientation="horizontal"
                    key={item.name}
                    id={item.id}
                    placeHolder="Status"
                    name={item.name}
                    onBlur={formik.handleBlur}
                >
                    {item.elm.map((i) => (
                        <Checkbox
                            value={i.name}
                            key={i.name}
                            onChange={(e) => OnChange(e, i)}
                            label={i.label}
                        >{i.name}</Checkbox>
                    ))}
                </CheckboxGroup> */}
            </FormControl>
            {formik.errors[item.name] && formik.touched[item.name] && (
                <div className="input-feedback">{formik.errors[item.name]}</div>
            )}
        </div>
    );
}

export default ECheckBox;