import axios from "axios";


export const listHospital = async () =>
    await axios.get(import.meta.env.VITE_APP_API_HOSP+ `/getListHospitals2`)


export const getEvaluateReportAll = async () =>
    await axios.get(import.meta.env.VITE_APP_API+ `/report_evaluate_all`)