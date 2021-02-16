import React, {useState} from 'react'


export default function StoresMenu({setStoresMenu,setStoresSelected,storesSelected}) {

    let storesArr=['Steam','Green Man Gaming','GOG','Humble Store','Fanatical','Game Billet','Epic Games Store','Games Load','Inidie Gala','All You Play','Gamers Gate','Direct 2 Drive','Origin','Uplay','Win Game Store','Voidu','Gamesplanet','2game','Blizzard Shop']

    let checkboxStyle={
        cursor:'pointer',
    }

    let checkboxes=null

    if(storesSelected==null){
        let obj={default:true}
        storesArr.map((item)=>{
            return obj[item]=true
        })
        setStoresSelected(obj)
    }

    if(storesSelected!==null){
        checkboxes= storesArr.map((item)=>{
            return <label style={checkboxStyle}><input class='storeCheckbox'type='checkbox' value={item} checked={storesSelected[item]}  onChange={handleChange}></input>{item}</label>
        })
    }

    function handleChange(e){
        let obj={...storesSelected}
        storesSelected.default=false
        obj[e.target.value]=!obj[e.target.value]
        setStoresSelected(obj)
    }
    
   
    return (
        <div class='stores'>
            <div class='storesOverlay'></div>
            <div class='storesSelection'>
                <h3>STORES</h3>
                <div class='checkboxContainer'>
                    {checkboxes}
                </div>
                <button  style={checkboxStyle} onClick={()=>setStoresMenu(false)}>CONTINUE</button>    
            </div>
        </div>
    )
}
