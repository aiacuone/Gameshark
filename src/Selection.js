import React from 'react'

export default function Selection({selection}) {

    const setSelection=selection.setSelection


    //SORT ALPHABETICALLY  !!DONT DELETE!!
    // selection.apiState.data&&selection.apiState.data.sort((a,b)=>{
    //    return a.external>b.external?1:-1

    // })

    // selection.apiState.data&&selection.apiState.data.map((item)=>{
    //     console.log(item.external)
    // })

    return (
        <div class='selection'>

            <label>Title<input class='titleInput' type='text' value={selection.title} onChange={(e)=>setSelection.setTitle(e.target.value)}></input></label>
            <label>Price Range<input type="range" min="1" max="100" class="slider" onChange={(e)=>setSelection.setPriceRange(e.target.value)}></input>{selection.priceRange}</label>
            <label>Steam Rating<input type="range" min="1" max="100" class="slider" onChange={(e)=>setSelection.setSteamRating(e.target.value)}></input>{selection.steamRating}</label>
            <label>Amount of Reviews<input type="range" min="1000" max="100000" class="slider" step='1000'onChange={(e)=>setSelection.setReviewsAmount(e.target.value)}></input>{selection.reviewsAmount}</label>
            <label>Earliest Release Date<input type="range" min="1990" max="2020" class="slider" onChange={(e)=>setSelection.setEarlyReleaseDate(e.target.value)}></input>{selection.earlyReleaseDate}</label>
            <label>Latest Release Date<input type="range" min="1991" max="2021" class="slider" onChange={(e)=>setSelection.setLateReleaseDate(e.target.value)}></input>{selection.lateReleaseDate}</label>
            {/* <input data-role='doubleslider'></input> */}
            <label>ON SALE<input checked={selection.onSale} type='checkbox' onChange={()=>setSelection.setOnSale(!selection.onSale)}></input></label>
            <button>STORES</button>

            
        </div>
    )
}
