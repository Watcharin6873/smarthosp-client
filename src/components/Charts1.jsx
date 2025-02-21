import React from 'react'
import Chart from 'react-apexcharts'

const Charts1 = () => {
    const dataSource = [
        { days: 'Sun', series1: 30, series2: 23, series3: 24 },
        { days: 'Mon', series1: 40, series2: 12, series3: 20 },
        { days: 'Tue', series1: 25, series2: 54, series3: 5 },
        { days: 'Wed', series1: 50, series2: 61, series3: 75 },
        { days: 'Thu', series1: 49, series2: 32, series3: 42 },
        { days: 'Fri', series1: 21, series2: 56, series3: 79 },
        { days: 'Sat', series1: 70, series2: 81, series3: 72 },
    ]

    const days = dataSource?.map((d) => d.days)
    const series1 = dataSource?.map((s1) => parseInt(s1.series1))
    const series2 = dataSource?.map((s2) => parseInt(s2.series2))
    const series3 = dataSource?.map((s3) => parseInt(s3.series3))

    console.log(series1)


    const options = {
        xaxis: {
            categories: days
        }
    };
    const series = [
        {
            name: "series-1",
            data: series1
        },
        {
            name: "series-2",
            data: series2
        },
        {
            name: "series-3",
            data: series3
        }
    ];


    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="area"
            />
        </div>
    )
}

export default Charts1