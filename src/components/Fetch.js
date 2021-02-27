import React from 'react'

export default function Fetch({
	apiState,
	setApiState,
	state,
	setFilteredList,
}) {
	function fetchData() {
		setApiState({ loading: true })
		fetch('https://www.cheapshark.com/api/1.0/deals?')
			.then((res) => res.json())
			.then((data) => {
				setApiState({ loading: false, data: data })

				let filtered = data.filter((item) => {
					return (
						item.steamRatingCount >= state.minReviewsAmount * 1000 &&
						item.steamRatingCount <= state.maxReviewsAmount * 1000 &&
						item.steamRatingPercent >= state.minSteamRating &&
						item.steamRatingPercent <= state.maxSteamRating &&
						item.salePrice >= state.minPrice &&
						item.salePrice <= state.maxPrice
					)
				})
				setFilteredList(filtered)
			})
			.catch((error) => {
				console.log(error)
				setApiState({ loading: false, data: null, error: true })
			})
	}

	return (
		<div>
			<button onClick={fetchData}> SEARCH </button>
		</div>
	)
}
