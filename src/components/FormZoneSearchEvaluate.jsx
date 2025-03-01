import React, { useEffect, useState } from 'react'
import { getListHospitalAll } from '../api/Hospital'
import { getEvaluateForBarChartStackZone, getHospitalInListEvaluate, sumEvaluateAll } from '../api/Evaluate'
import { BarChart } from '@mui/x-charts';

const FormZoneSearchEvaluate = ({ zoneSearch }) => {

    const [listHospitalAll, setListHospitalAll] = useState([])
    const [dataForBarchart, setDataForBarchart] = useState([])

    useEffect(() => {
        loadListHospitalAll()
        loadDataForBarchart()
    }, [])


    const loadListHospitalAll = async () => {
        await getListHospitalAll()
            .then(res => {
                // console.log('Hosp: ', res.data)
                setListHospitalAll(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const loadDataForBarchart = async () => {
        await getEvaluateForBarChartStackZone(zoneSearch)
            .then(res => {
                setDataForBarchart(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const dataSource = dataForBarchart.map((item) => ({
        provname: item.provname,
        gemlevel: ((item.gemlevel / item.total_hosp) * 100).toFixed(1),
        goldlevel: ((item.goldlevel / item.total_hosp) * 100).toFixed(1),
        silverlevel: ((item.silverlevel / item.total_hosp) * 100).toFixed(1),
        notpasslevel: ((item.notpasslevel / item.total_hosp) * 100).toFixed(1),
    }))

    console.log('Data: ', dataSource)





    const hospitalInZone = listHospitalAll.filter(f => f.zone === zoneSearch)

    function valueFormatter(value) {
        return `${value} %`;
      }

    return (
        <>
            <div className='text-center'>
                <p>จำนวนร้อยละ (%) ของแต่ละระดับที่ได้จากคะแนนในการประเมิน รายจังหวัดของเขตฯ {parseInt(zoneSearch)}</p>
            </div>
            <BarChart
                height={350}
                margin={{ top: 50, right: 10, bottom: 60, left: 40 }}
                xAxis={[{ 
                    data: dataSource.map((item)=> item.provname), 
                    scaleType: "band", 
                    tickLabelStyle: { angle: -25, textAnchor: "end" } }]} // ค่าแกน X
                series={[
                    { data: dataSource.map((item)=> item.gemlevel), label: 'ระดับเพชร', id: 'gemID', stack: 'total', color: '#0088FE', valueFormatter },
                    { data: dataSource.map((item)=> item.goldlevel), label: 'ระดับทอง', id: 'goldID', stack: 'total', color: '#FFDC73', valueFormatter },
                    { data: dataSource.map((item)=> item.silverlevel), label: 'ระดับเงิน', id: 'silverID', stack: 'total', color: '#d1cfcf', valueFormatter },
                    { data: dataSource.map((item)=> item.notpasslevel), label: 'ไม่ผ่าน', id: 'noPassID', stack: 'total', color: '#fc5151', valueFormatter }
                ]}
                yAxis={[{ min: 0, max: 100 }]}
                sx={{
                    '& .MuiBarLabel-root': {
                        fill: 'white',
                        fontSize: 10,
                    },
                    ['.MuiChartsLegend-mark']: {
                        rx: '50%', // circle legend
                    },
                }}
            />

        </>

    )
}

export default FormZoneSearchEvaluate