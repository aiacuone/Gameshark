import React from 'react'
// import OutlinedInput from '@material-ui/core/OutlinedInput';

export default function InputText({setTitle,title}) {
    return (
        <div>
            <input class='titleInput' type='text' placeholder={'Search Title'} value={title} onChange={(e)=>setTitle(e.value)}></input>
            <button class='titleSearch'>SEARCH</button>
        </div>
    )
}
