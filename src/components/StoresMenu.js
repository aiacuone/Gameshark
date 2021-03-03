import React, { useState } from 'react'

export default function StoresMenu({
	setStoresMenu,
	setStoresSelected,
	storesSelected,
	storesArr,
	createFilteredList,
}) {
	let checkboxStyle = {
		cursor: 'pointer',
	}

	let checkboxes = null

	checkboxes = storesArr.map((item) => {
		return (
			<label style={checkboxStyle}>
				<input
					class="storeCheckbox"
					type="checkbox"
					checked={storesSelected[item]}
					onChange={() => handleChange(item)}></input>
				{item}
			</label>
		)
	})

	//handles the state of the tickboxes
	function handleChange(value) {
		let obj = { ...storesSelected }
		storesSelected.default = false
		obj[value] = !obj[value]
		setStoresSelected(obj)
    }
    
    function handleSelectAll(value) {
        let obj = { ...storesSelected }
        Object.keys(obj).map((item) => {
            obj[item]=value
        })
        setStoresSelected(obj)
    }

	return (
		<div class="stores">
			<div class="storesOverlay"></div>
			<div class="storesSelection">
				<h3>STORES</h3>
				<div class="checkboxContainer">{checkboxes}</div>
				<button
					style={checkboxStyle}
					onClick={() => {
						setStoresMenu(false)
						createFilteredList()
					}}>
                    Continue
				</button>
                <button onClick={ ()=>handleSelectAll(true)}>Select All</button>
                <button onClick={() => handleSelectAll(false)}>Deselect All</button>
			</div>
		</div>
	)
}
