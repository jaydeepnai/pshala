import React from 'react'
import EText from './Fields/EText'
import ERadio from './Fields/ERadio'
import DropDownList from './Fields/EDDL'
import ECheckBox from './Fields/ECheckBox'
import EButton from './Fields/EButton'
import EDate from './Fields/EDate'
import ETextArea from './Fields/ETextArea'
import EPassword from './Fields/EPassword'
import EPassAndConfirm from './Fields/EPass&Confirm'
import ECaptch from './Fields/ECaptch'
import EReset from './Fields/EReset'
import ELink from './Fields/Elink'
import EAutoComplate from './Fields/EAutoComplate'
import EPhone from './Fields/EPhone'

function FormField({ item, formik }) {
    if (item.type === "text" || item.type === "email" || item.type === "number") {
        return (
            <EText item={item} formik={formik} />
        )
    }
    else if (item.type === "phone") {
        return (
            <EPhone item={item} formik={formik} />
        )
    }
    else if (item.type === "Radio") {
        return <ERadio item={item} formik={formik} />
    }
    else if (item.type === "DDL") {
        return <DropDownList item={item} formik={formik} />
    }
    else if (item.type === "CheckBox") {
        return <ECheckBox item={item} formik={formik} />
    }
    else if (item.type === "Button") {
        return <EButton item={item} formik={formik} />
    }
    else if (item.type === "link") {
        return <ELink item={item} formik={formik} />
    }
    else if (item.type === "AutoComplate") {
        return <EAutoComplate item={item} formik={formik} />
    }
    else if (item.type === "reset") {
        return <EReset item={item} formik={formik} />
    }
    else if (item.type === "Date") {
        return <EDate item={item} formik={formik} />
    }
    else if (item.type === "TextArea") {
        return <ETextArea item={item} formik={formik} />
    } else if (item.type === "password") {
        return <EPassword item={item} formik={formik} />
    }
    else if (item.type === "password&confirmPassword") {
        return <EPassAndConfirm item={item} formik={formik} />
    }
    else if (item.type === "Captcha") {
        return <ECaptch item={item} formik={formik} />
    }
}

export default FormField