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
				key={ new Date().getTime()+item}
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

	let filteredTable = state.filteredList.map((item,index) => {
		return (
			<tr class="dataRow" key={ new Date().getTime()+item.title+index}>
				<td class="table_data release_date">
					{item.releaseDate > 0 && timestampConvert(item.releaseDate * 1000)}
				</td>
				<td class="table_data price">{item.salePrice}</td>
				<td class="table_data title">
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td class="table_data steam_rating">
					{item.steamRatingPercent > 0 && item.steamRatingPercent}
				</td>
				<td class="table_data steam_rating_count">
					{item.steamRatingCount > 0 && item.steamRatingCount}
				</td>
				<td class="table_data store">
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

	let unFilteredTable = state.unFilteredList.map((item,index) => {
		return (
			<tr
			key={ new Date().getTime()+item.title+index}
				class="dataRow"
				style={{
					// opacity: 0.6,
					// background:'grey'
				}}>
				<td
					class="table_data release_date unfiltered"
					style={{
						// opacity: 1,
						color:
							item.releaseDate * 1000 <
								new Date(state.minReleaseDate, 11, 31).getTime()&&
								'red' ||
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
				<td class="table_data price unfiltered">{item.salePrice}</td>
				<td class="table_data title unfiltered">
					<div class="dataCell">
						<img class="thumb" src={item.thumb} />
						<p class="title">{item.title}</p>
					</div>
				</td>
				<td
					class="table_data steam_rating unfiltered"
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
					class="table_data steam_rating_count unfiltered"
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
				<td class="table_data store unfiltered">
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
