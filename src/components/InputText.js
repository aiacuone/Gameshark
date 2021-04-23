import React from 'react'
// import OutlinedInput from '@material-ui/core/OutlinedInput';

export default function InputText({setTitle,title}) {
    return (
        <div>
            <input className='titleInput' type='text' placeholder={'Search Title'} value={title} onChange={(e)=>setTitle(e.value)}></input>
            <button className='titleSearch'>SEARCH</button>
        </div>
    )
}
