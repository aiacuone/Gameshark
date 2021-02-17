import React from 'react'
import '../styles/rangeSlider.css'

export default function NewRangeSlider({title,values,setValues,min,max,step}) {

    function handleChange(e,rangeValue){
        let newValues={...values}
        rangeValue==='min'?newValues.min=parseInt(e.target.value):newValues.max=parseInt(e.target.value)
        setValues(newValues)
    }

    return (
        <div class='newRangeSlider'>
            <h3>{title}</h3>

            <input class='range min'type='range' max={max} min={min} step={step} value={values.min} onChange={(e)=>{
                parseInt(e.target.value)<values.max&&handleChange(e,'min')
            }}></input>

            <input class='range max'type='range' max={max} min={min} step={step} value={values.max} onChange={(e)=>{
                parseInt(e.target.value)>values.min&&handleChange(e,'max')
            }}></input>

            <div class='rangeMulti'>
                <div class='track'/>
                <div class='rangeFill' style={{left:values.min+1+'%',width:values.max-values.min+'%'}}></div>
                <div class='thumb min' style={{left:values.min+'%'}}></div>
                <div class='thumb max'style={{left:values.max+'%'}}></div>
            </div>
            {<h3>{values.min} - {values.max}</h3>}
        </div>
    )
}
