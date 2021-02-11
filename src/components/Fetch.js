import React, {useEffect,}from 'react'

export default function Fetch({selection}) {

    // console.log(selection.setSelection)

    useEffect(() => {
        // console.log(apiState, 'apiState Initial')
      selection.setSelection.setApiState({ loading: true })
      fetch( 'https://www.cheapshark.com/api/1.0/games?title=batman')
        .then((res) => res.json())
        .then((data) => {
            selection.setSelection.setApiState({ loading: false, data: data })
            // console.log(data)
        // console.log(data,apiState.loading, 'success')
        })
        .catch((error) => {
        // console.log(error) 
        // <<<< this should contain an error message, we can either have error state as boolean or make the error state an object so we can display the API error message to the user (or display our own message based on the error code)
        selection.setSelection.setApiState({ loading: false, data: null, error: true })
        })
    
    }, [])




    // fetch('https://www.cheapshark.com/api/1.0/stores')
    // .then((res)=>res.json())
    // .then((data)=>{
    //         console.log(data)
    // })
    // .catch((error)=>{
    //     console.log(error)
    // })
    

    // apiState.data&&(
    //     apiState.data.map((item)=>{
    //         console.log(item)
    //         // console.log(item.title, item.salePrice, item.steamAppID,'steamAppID')
    //     })
    // )




    return (
        <div>

        </div>
    )
}

