import React from 'react'
import '../styles/table.css'

export default function Table({ state, setState, updateFetch, vars }) {

	let headers = Object.keys(vars.headers).map((item) => {
		return (
			<th
				style={{ color: state.sortBy == item && 'yellow', cursor: 'pointer' }}
				onClick={() => {
					if (state.sortBy == item) {
						setState.setSortBy(undefined)
						updateFetch('deliberate_undefined')
					} else {
						setState.setSortBy(item)
						updateFetch(item)
					}
				}}
				class="headerCell">
				{item}
			</th>
		)
	})

	let filteredTable = state.filteredList.map((item) => {
		return (
			<tr class="dataRow">
				<td>{item.releaseDate > 0 && item.releaseDate}</td>
				<td>{item.salePrice}</td>
				<td>
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td>{item.steamRatingPercent > 0 && item.steamRatingPercent}</td>
				<td>{item.steamRatingCount > 0 && item.steamRatingCount}</td>
				<td>
					<img
						src={
							'https://www.cheapshark.com' +
							state.storesApi.data[parseInt(item.storeID - 1)].images.icon
						}
					/>
				</td>
			</tr>
		)
	})

	let unFilteredTable = state.unFilteredList.map((item) => {
		return (
			<tr
				class="dataRow"
				style={{
					opacity: 0.5,
				}}>
				<td>{item.releaseDate > 0 && item.releaseDate}</td>
				<td>{item.salePrice}</td>
				<td>
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td
				style={{
					//creates red color when not within range
					color:
						(item.steamRatingPercent < state.minSteamRating&&
							'red') ||
						(item.steamRatingPercent > state.maxSteamRating && 'red'),
				}}
				>{item.steamRatingPercent > 0 && item.steamRatingPercent}</td>
				<td
					style={{
						//creates red color when not within range
						color:
							(item.steamRatingCount < state.minReviewsAmount * 1000 &&
								'red') ||
							(item.steamRatingCount > state.maxReviewsAmount * 1000 && 'red'),
					}}>
					{item.steamRatingCount > 0 ? (
						item.steamRatingCount
					) : (
						<hr width="40px" size={3} style={{ background: 'red' }}></hr>
					)}
				</td>
				<td>
					<img
						src={
							'https://www.cheapshark.com' +
							state.storesApi.data[parseInt(item.storeID - 1)].images.icon
						}
					/>
				</td>
			</tr>
		)
	})

	return (
		<div class="tableContainer">
			<table>
				<tr class="headerRow">{headers}</tr>
				{filteredTable}
				{unFilteredTable}
			</table>
		</div>
	)
}
