import React, {useEffect, useState} from 'react'
import Chart from 'react-apexcharts'

function RevenueChart(props) {
    const {dataBalance, dataNames } = props

    const options = {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return dataBalance[0]
              }
            }
          }
        }
      },
      labels: dataNames,
    }

    const series = dataBalance

  return (
    <div className='w-full'>
        <Chart 
          className='w-full'
            options={options} 
            series={series} 
            type="radialBar" 
            // height={350} 
        />
    </div>
  )
}

export default RevenueChart