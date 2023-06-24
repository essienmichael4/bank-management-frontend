import { useState } from 'react';
// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

function TransactionChart() {
    const [state, setState] = useState({
          
        series: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      })

  return (
    <div className='w-full min-w-[780px] h-full z-0 isolate'>
        <ReactApexChart className="w-full h-full z-0 isolate"
            options={state.options} 
            series={state.series} 
            type="line" 
            height={380} 
        />
    </div>
  )

}

export default TransactionChart