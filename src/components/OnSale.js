import React from 'react'

export default function OnSale({onSale,setOnSale}) {
    return (
        <div class='onSaleContainer'>
            <label>On Sale</label>
            <input class='onSale' type='checkbox' selected={onSale} onChange={()=>setOnSale(!onSale)}></input>
        </div>
    )
}
