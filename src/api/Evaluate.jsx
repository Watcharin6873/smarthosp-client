import axios from "axios";


//Get SubQuestList
export const getSubQuetList = async (token) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getSubQuetList`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get evaluate for split comma
export const getListEvaluateByHosp3 = async (token, hcode) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/splitComma?hcode=${hcode}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate all
export const getListEvaluateAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateAll`)
}

//Sum Evaluate all
export const sumEvaluateAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/sumEvaluateAll`)
}

//Sum Evaluate for all
export const getSumEvaluateForAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getSumEvaluateForAll`)
}

//Sum Evaluate for all
export const getSumEvaluateForAll2 = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getSumEvaluateForAll2`)
}

//Get Hospital in list evaluate
export const getHospitalInListEvaluate = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getHospitalInListEvaluate`)
}

//Get evaluate for barchart
export const getEvaluateForBarChartStackZone = async (zone) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateForBarChartStackZone?zone=${zone}`)
}


//Get evaluate for barchart
export const getEvaluateForChart = async (zone) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateForChart`)
}


//Get List SubQuest
export const getListSubQuestsForEvaluate = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListSubQuestsForEvaluate/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Save Evaluate
export const saveEvaluates = async (token, values) => {
    return await axios.post(import.meta.env.VITE_APP_API + `/saveEvaluates`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}


//Get Evaluate by hcode
export const getListEvaluateByHosp = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByHosp/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by hcode v2
export const getListEvaluateByHosp2 = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByHosp2/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by hcode
export const getEvaluateByHosp = async (token, questId, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateByHosp?questId=${questId}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by hcode
export const getEvaluateByHosp3 = async (token, category_questId, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateByHosp3?category_questId=${category_questId}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Sum Evaluate by hcode
export const sumEvaluateByHosp = async (token, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/sumEvaluateByHosp?hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by pProvname
export const getListEvaluateByProv = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByProv/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by pProvname
export const getListEvaluateByZone = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByZone/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by id
export const getEvaluateById = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateById/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by id
export const refreshEvaluate = async (token, category_questId, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/refreshEvaluate?category_questId=${category_questId}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Update point Evaluate
export const updateChoiceEvaluate = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/updateChoiceEvaluate`, values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Save documents for Evaluate
export const saveDocuments = async (token, values) => {
    return await axios.post(import.meta.env.VITE_APP_API + `/saveDocuments`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}


//get documents of evaluate
export const getDocumentsFromEvaluate = async (token) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getDocumentsFromEvaluate`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//get documents of evaluate
export const getDocumentByEvaluateByHosp = async (token,values, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getDocumentsByEvaluateByHosp?category_questId=${values}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//get Evidence of evaluate
export const getEvidenceFromEvaluate = async (token, id, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvidenceFromEvaluate?id=${id}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Save documents for Evaluate
export const uploadFileById = async (token, id, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/uploadFileById/` + id, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

//ssj approve 
export const ssjChangeStatusApprove = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/ssjChangeStatusApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//zone approve 
export const zoneChangeStatusApprove = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/zoneChangeStatusApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//Upload cyber image data
export const uploadCyberImage = async (token, values) => {
    return await axios.post(import.meta.env.VITE_APP_API + `/uploadCyberImageFile`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}


//Get cyber image data
export const getCyberSecurityLevelData = async (token, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getCyberSecurityLevelData?hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get cyber image data
export const removeFileById = async (token, id) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/removeFileById/`+ id,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get sum evaluate by zone
export const getSumEvaluateByZone = async (token, zone) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getSumEvaluateByZone?zone=${zone}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get sum evaluate by prov
export const getSumEvaluateByProv = async (token, province) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getSumEvaluateByProv?province=${province}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//CHECK SSJ NOT APPROVE
export const checkSsjNotApprove = async (token, hospcode, category_questId) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/checkSsjNotApprove?hospcode=${hospcode}&category_questId=${category_questId}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//CHECK ZONE NOT APPROVE
export const checkZoneNotApprove = async (token, hospcode, category_questId, province) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/checkZoneNotApprove?hospcode=${hospcode}&category_questId=${category_questId}&province=${province}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//SSJ UNAPPROVE
export const ssjUnApprove = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/ssjUnApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//SSJ UNAPPROVE
export const zoneUnApprove = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/zoneUnApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//Get sum evaluate by zone
export const selectApproveEvaluate = async (token, zone) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/selectApproveEvaluate?zone=${zone}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//ZONE APPROVE
export const ssjApproveById = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/ssjApproveById`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Comment Evaluate
export const commentEvaluate = async (token, values) =>{
    return await axios.post(import.meta.env.VITE_APP_API + `/commentEvaluate`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//Update comment Evaluate
export const updateCommentEvaluate = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/updateCommentEvaluate`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//Get comment evaluate
export const getCommentEvaluate = async (token) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getCommentEvaluate`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get comment by id
export const getCommentEvaluateById = async (token, id) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getCommentEvaluateById/`+ id,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get approve all
export const getCheckApproveAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/checkApproveAll`)
}


//Get approve all
export const getCheckApproveZone = async (zone) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/checkApproveZone?zone=${zone}`)
}


//Split comma for check approve all
export const splitCommaForCheckApprove = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/splitCommaForCheckApprove`)
}


//Update comment Evaluate
export const changeStatusZoneApprove = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/changeStatusZoneApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}