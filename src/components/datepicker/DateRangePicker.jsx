import React from 'react'
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';

const {RangePicker} = DatePicker

function DateRangePicker(props) {
  return (
    <div>
        <RangePicker  onChange={(values)=>{
            props.handleDateChange(values)
        }}/>
    </div>
  )
}

export default DateRangePicker