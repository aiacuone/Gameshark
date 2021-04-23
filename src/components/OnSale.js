import React from 'react'

export default function OnSale({onSale,setOnSale}) {
    return (
        <div className='onSaleContainer'>
            <label>On Sale</label>
            <input className='onSale' type='checkbox' selected={onSale} onChange={()=>setOnSale(!onSale)}></input>
        </div>
    )
}
