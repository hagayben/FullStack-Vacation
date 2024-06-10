import { useEffect, useState } from "react";
import vacationService from "../../../services/Vacation";
import "./downloadCSV.css";

async function download() {
    const data = await vacationService.downloadReport()
    if(!data){
        return ''
    }
    const fileUrl = URL.createObjectURL(data)
    return fileUrl
}

function DownloadCSV(): JSX.Element {
    const [url, setUrl] = useState('')

    useEffect(() => {
        download().then(u => {
            setUrl(u)
        })
    }, [])

    return (
        <div className="downloadCSV">
            {!url && <div>is loading</div>}

            {url &&
                <>
                    <h1>Download CSV Vacation Report</h1>
                    <label>If you wont to download CSV click here</label>
                    <a href={url} download="report.csv">download</a>
                </>}
        </div>
    );
}

export default DownloadCSV;
