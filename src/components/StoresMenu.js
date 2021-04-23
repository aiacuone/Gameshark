import React, { useState, useEffect } from 'react'

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

	checkboxes = state.stores.map((item, index) => {
		return (
			<label
				className="store_label"
				style={checkboxStyle}
				key={new Date().getTime() + item + index}>
				<input
					className="storeCheckbox"
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

	useEffect(() => {
		function handleExit(e) {
			if (e.target.className == 'storesOverlay') {
				setState.setStoresMenu(false)
			}
		}

		document.addEventListener('mousedown', handleExit)
		return () => {
			document.removeEventListener('mousedown', handleExit)
		}
	})

	return (
		<div className="stores">
			<div className="storesOverlay"></div>
			<div className="storesSelection">
				<p className="stores_title">STORES</p>
				<div className="select_container">
					<button
						className="stores_button select"
						onClick={() => handleSelectAll(true)}>
						Select All
					</button>
					<button
						className="stores_button deselect"
						onClick={() => handleSelectAll(false)}>
						Deselect All
					</button>
				</div>

				<button
					className="stores_button continue"
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
				<div className="checkboxContainer">{checkboxes}</div>
			</div>
		</div>
	)
}
