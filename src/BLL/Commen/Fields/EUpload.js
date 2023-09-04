import { useState } from "react";
import FileUpload from "react-material-file-upload";

function EUpload({ item, formik }) {
    return (<>
        <FileUpload
            key={item.name}
            // onChange={setFiles}
            value={formik.values[item.name]}
            // onChange={formik.handleChange}
            type="file"
            onChange={(event) => {
                // event)
                // const files = event.target.files;
                let myFiles = Array.from(event);
                formik.setFieldValue("file", myFiles);
            }}
            placeholder={item.name}
            name={item.name}
            multiple={true}
            rightLabel="to select files"
            buttonLabel="click here"
            buttonRemoveLabel="Remove all"
            maxFileSize={10}
            maxUploadFiles={0}
            bannerProps={{ elevation: 0, variant: "outlined" }}
            containerProps={{ elevation: 0, variant: "outlined" }}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        {/* <img src={preview} /> */}
    </>
    )
}

export default EUpload