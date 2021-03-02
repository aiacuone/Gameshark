import React, { useEffect } from 'react'

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
			})
			.catch((error) => {
				console.log(error)
				setApiState({ loading: false, data: null, error: true })
			})
	}

	//CHAINED FILTER METHODS works but alot of code, and not versatile

	let minReviewsFilter = (item) =>
		item.steamRatingCount >= state.minReviewsAmount * 1000
	let maxReviewsFilter = (item) =>
		item.steamRatingCount <= state.maxReviewsAmount * 1000
	let minRatingFilter = (item) =>
		item.steamRatingPercent >= state.minSteamRating
	let maxRatingFilter = (item) =>
		item.steamRatingPercent <= state.maxSteamRating
	let minPriceFilter = (item) => item.salePrice >= state.minPrice
	let maxPriceFilter = (item) => item.salePrice <= state.maxPrice

	let filtered = []
	if (apiState.data) {
		if (state.maxReviewsAmount === 100) {
			filtered = apiState.data
				.filter(minReviewsFilter)
				// .filter(maxReviewsFilter)
				.filter(minRatingFilter)
				.filter(maxRatingFilter)
				.filter(minPriceFilter)
				.filter(maxPriceFilter)
		} else if (state.maxPrice == 50) {
			filtered = apiState.data
				.filter(minReviewsFilter)
				.filter(maxReviewsFilter)
				.filter(minRatingFilter)
				.filter(maxRatingFilter)
				.filter(minPriceFilter)
			// .filter(maxPriceFilter)
		} else if (state.maxReviewsAmount === 100 && state.maxPrice == 50) {
			filtered = apiState.data
				.filter(minReviewsFilter)
				// .filter(maxReviewsFilter)
				.filter(minRatingFilter)
				.filter(maxRatingFilter)
				.filter(minPriceFilter)
			// .filter(maxPriceFilter)
		} else {
			filtered = apiState.data
				.filter(minReviewsFilter)
				.filter(maxReviewsFilter)
				.filter(minRatingFilter)
				.filter(maxRatingFilter)
				.filter(minPriceFilter)
				.filter(maxPriceFilter)
		}
	}

	useEffect(() => {
		setFilteredList(filtered)
	}, [
		apiState.data,
		state.minReviewsAmount,
		state.maxReviewsAmount,
		state.minSteamRating,
		state.maxSteamRating,
		state.minPrice,
		state.maxPrice,
	])

	return (
		<div>
			<button onClick={fetchData}> SEARCH </button>
		</div>
	)
}

// let maxSteamRatingCount = state.maxReviewsAmount == 100 ? null:state.maxReviewsAmount * 1000
