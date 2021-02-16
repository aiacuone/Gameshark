import React, {useState} from 'react'
import '../styles/rangeSlider.css'

export default function NewRangeSlider() {

    let [min,setMin]=useState(0)
    let [max,setMax]=useState(100)

    return (
        <div class='newRangeSlider'>
            <div class='rangeMulti'>
                <div class='track'/>
                <div class='rangeFill' style={{left:min+1+'%',width:max-min+'%'}}></div>
                <input class='range min'type='range' value={min} onChange={(e)=>{
                    parseInt(e.target.value)<max&&setMin(parseInt(e.target.value))}}>
                </input>
                <input class='range max'type='range' value={max} onChange={(e)=>{
                    parseInt(e.target.value)>min&&setMax(parseInt(e.target.value))
                }}></input>
                <div class='thumb min' style={{left:min+'%'}}></div>
                <div class='thumb max'style={{left:max+'%'}}></div>
            </div>
            {<h3>{min} - {max}</h3>}
        </div>
    )
}
