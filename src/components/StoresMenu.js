import React, { useState } from 'react'

export default function StoresMenu({
	createFilteredList,
	state,
	setState,
	updateFetch,
}) {
	let checkboxStyle = {
		cursor: 'pointer',
	}

	let checkboxes = null

	checkboxes = state.stores.map((item) => {
		return (
			<label style={checkboxStyle}>
				<input
					class="storeCheckbox"
					type="checkbox"
					checked={state.storesSelected[item]}
					onChange={() => handleChange(item)}></input>
				{item}
			</label>
		)
	})

	//handles the state of the tickboxes
	function handleChange(value) {
		let obj = { ...state.storesSelected }
		state.storesSelected.default = false
		obj[value] = !obj[value]
		setState.setStoresSelected(obj)
	}

	function handleSelectAll(value) {
		let obj = { ...state.storesSelected }
		Object.keys(obj).map((item) => {
			obj[item] = value
		})
		setState.setStoresSelected(obj)
	}

	return (
		<div class="stores">
			<div class="storesOverlay"></div>
			<div class="storesSelection">
				<h3>STORES</h3>
				<div class="select_container">
					<button class='stores_button select'onClick={() => handleSelectAll(true)}>Select All</button>
					<button class='stores_button deselect'onClick={() => handleSelectAll(false)}>Deselect All</button>
				</div>

				<button
					class='stores_button continue'
					style={checkboxStyle}
					onClick={() => {
						setState.setStoresMenu(false)
						updateFetch({
							page: state.page,
							sortBy: state.sortBy && state.sortBy,
						})
					}}>
					Continue
				</button>
				<div class="checkboxContainer">{checkboxes}</div>
			</div>
		</div>
	)
}
