import React from 'react'
import '../styles/table.css'

export default function Table({ state, setState, updateFetch, vars }) {
	let timestampConvert = (timestamp) => {
		let dateObj = new Date(timestamp)

		let month = dateObj.getMonth() + 1
		let year = dateObj.getFullYear()
		let date = dateObj.getDate()
		return date + '/' + month + '/' + year
	}

	let headers = Object.keys(vars.headers).map((item) => {
		return (
			<th
				style={{
					color: state.sortBy == vars.headers[item] && 'yellow',
					cursor: 'pointer',
				}}
				onClick={() => {
					if (state.sortBy == vars.headers[item]) {
						setState.setSortBy(undefined)
						updateFetch({ sortBy: '' })
						// updateFetch('')
					} else {
						setState.setSortBy(vars.headers[item])
						updateFetch({ sortBy: vars.headers[item] })
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
				<td class="table_data">
					{item.releaseDate > 0 && timestampConvert(item.releaseDate * 1000)}
				</td>
				<td class="table_data">{item.salePrice}</td>
				<td class="table_data">
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td class="table_data">
					{item.steamRatingPercent > 0 && item.steamRatingPercent}
				</td>
				<td class="table_data">
					{item.steamRatingCount > 0 && item.steamRatingCount}
				</td>
				<td class="table_data">
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
				<td
					class="table_data"
					style={{
						color:
							item.releaseDate * 1000 <
								new Date(state.minReleaseDate, 11, 31).getTime() ||
							(item.releaseDate * 1000 >
								new Date(state.maxReleaseDate, 11, 31).getTime() &&
								'red'),
					}}>
					{item.releaseDate > 0
						? timestampConvert(item.releaseDate * 1000)
						: state.minReleaseDate !== 1990 && (
								<hr width="40px" size={3} style={{ background: 'red' }}></hr>
						  )}
				</td>
				<td class="table_data">{item.salePrice}</td>
				<td class="table_data">
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td
					class="table_data"
					style={{
						//creates red color when not within range
						color:
							(item.steamRatingPercent < state.minSteamRating && 'red') ||
							(item.steamRatingPercent > state.maxSteamRating && 'red'),
					}}>
					{item.steamRatingPercent == 0 && state.minSteamRating !== 0 ? (
						<hr width="40px" size={3} style={{ background: 'red' }}></hr>
					) : (
						item.steamRatingPercent
					)}
				</td>
				<td
					class="table_data"
					style={{
						//creates red color when not within range
						color:
							(parseInt(item.steamRatingCount) <
								state.minReviewsAmount * 1000 &&
								'red') ||
							(state.maxReviewsAmount !== 100 &&
								parseInt(item.steamRatingCount) >
									state.maxReviewsAmount * 1000 &&
								'red'),
					}}>
					{item.steamRatingCount > 0
						? parseInt(item.steamRatingCount)
						: state.minReviewsAmount !== 0 && (
								<hr width="40px" size={3} style={{ background: 'red' }}></hr>
						  )}
				</td>
				<td class="table_data">
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
