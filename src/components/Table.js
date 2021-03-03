import React from 'react'
import '../styles/table.css'

export default function Table({ filteredList, storesApi, apiState ,storesSelected}) {
	let headersArr = [
		'Release Date',
		'Price',
		'Title',
		'Steam Rating',
		'Reviews',
		'Store',
	]
    // console.log(storesApi.data)
    // console.log(storesSelected)
	let headers = headersArr.map((item) => {
		return <th class="headerCell">{item}</th>
	})

	let data = apiState.data.map((item) => {
		return (
			<tr
				class="dataRow"
				style={{
					opacity:
                        filteredList.map((value) => value.gameID).indexOf(item.gameID) > -1 
                            // &&storesSelected[item.storeName]
                            
							? 1
							: 0.3,
				}}>
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
							storesApi.data[parseInt(item.storeID - 1)].images.icon
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
				{data}
			</table>
		</div>
	)
}
