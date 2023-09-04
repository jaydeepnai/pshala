import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import '../../../MediaQuery.css';

function ECaptch({ item, formik }) {
    const [sitekey, setSitekey] = useState('6LdLK_QmAAAAAHL3aAlpTUZLj_cRGNOzy_Yk9AFO')
    const [secretkey, setSecretkey] = useState('6LdLK_QmAAAAACId_VXBkkzmH5zRnxlOZeMIB0YO')
    const [css, setCss] = useState('')
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false)

    const Submit = (value) => {
        var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${value}`
        axios.post(url).then((data) => {
            // console.log(data) 
        }
        ).catch((error) => {
            // console.log(error)
        })
    }
    const OnLoad = (e) => {
        setIsRecaptchaLoaded(true)
    }
    return (
        <div className={item.GridName}>
            <ReCAPTCHA
                size="normal"
                theme='light'
                sitekey={sitekey}
                onChange={Submit}
                className={isRecaptchaLoaded ? "custom-recaptcha" : ""}
                onLoad={(e) => OnLoad(e)}
            />
        </div>
    )
}

export default ECaptch
