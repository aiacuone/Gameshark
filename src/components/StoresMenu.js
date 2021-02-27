import React, { useState } from 'react'

export default function StoresMenu({
	setStoresMenu,
	setStoresSelected,
	storesSelected,
}) {
	let storesArr = [
		'Steam',
		'Green Man Gaming',
		'GOG',
		'Humble Store',
		'Fanatical',
		'Game Billet',
		'Epic Games Store',
		'Games Load',
		'Inidie Gala',
		'All You Play',
		'Gamers Gate',
		'Direct 2 Drive',
		'Origin',
		'Uplay',
		'Win Game Store',
		'Voidu',
		'Gamesplanet',
		'2game',
		'Blizzard Shop',
	]

	let checkboxStyle = {
		cursor: 'pointer',
	}

	let checkboxes = null

	//creates the object needed to make the list
	if (storesSelected == null) {
		//error if no if statement
		let obj = { default: true }
		storesArr.map((item) => {
			return (obj[item] = true)
		})
		setStoresSelected(obj)
	}

	//creates the checkboxes based storesSelected Object
	if (storesSelected !== null) {
		//error if no if statement
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
	}

	//handles the state of the tickboxes
	function handleChange(value) {
		let obj = { ...storesSelected }
		storesSelected.default = false
		obj[value] = !obj[value]
		setStoresSelected(obj)
	}

	return (
		<div class="stores">
			<div class="storesOverlay"></div>
			<div class="storesSelection">
				<h3>STORES</h3>
				<div class="checkboxContainer">{checkboxes}</div>
				<button style={checkboxStyle} onClick={() => setStoresMenu(false)}>
					CONTINUE
				</button>
			</div>
		</div>
	)
}
