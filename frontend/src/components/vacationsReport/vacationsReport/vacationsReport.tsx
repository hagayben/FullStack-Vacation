import { useEffect, useState } from "react";
import vacationService from "../../../services/Vacation";
import "./vacationsReport.css";
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

async function getReportData() {
    const data = await vacationService.getReport()
    return data
}


function VacationsReport(): JSX.Element {
    const [report, setReport] = useState<{
        destination: string;
        amount: number;
    }[]>([])

    useEffect(() => {
        getReportData().then(u => {
            setReport(u)
        })
    }, [])


    const options = {
        title: {
            text: "Vacation Report"
        },
        data: [
            {
                type: "column",
                dataPoints: report.map(d => {
                    return {
                        label: d.destination,
                        y: d.amount
                    }
                })
            }
        ]
    }

    return (
        <div className="vacationsReport">
            <div>
                <CanvasJSChart options={options} />
            </div>

        </div>
    );
}

export default VacationsReport;
// render() {
//     const options = {
//         title: {
//             text: "Basic Column Chart"
//         },
//         data: [
//         {
//             // Change type to "doughnut", "line", "splineArea", etc.
//             type: "column",
//             dataPoints: [
//                 { label: "Apple",  y: 10  },
//                 { label: "Orange", y: 15  },
//                 { label: "Banana", y: 25  },
//                 { label: "Mango",  y: 30  },
//                 { label: "Grape",  y: 28  }
//             ]
//         }
//         ]
//     }
//     return (
//     <div>
//         <CanvasJSChart options = {options}
//             /* onRef={ref => this.chart = ref} */
//         />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//     </div>