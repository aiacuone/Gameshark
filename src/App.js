import react, { useState, useEffect } from 'react'
import './App.css'
import Fetch from './components/Fetch'
import StoresMenu from './components/StoresMenu'
import MultiRange from './components/MultiRange'
import Table from './components/Table'

function App() {
	const [apiState, setApiState] = useState({
		loading: false,
		data: null,
		error: false,
	})
	const [storesApi, setStoresApi] = useState({
		loading: false,
		data: null,
		error: false,
	})
	const [storesMenu, setStoresMenu] = useState(false)
	const [storesSelected, setStoresSelected] = useState(null)
	const [stores, setStores] = useState()
	const [minReviewsAmount, setMinReviewsAmount] = useState(0)
	const [maxReviewsAmount, setMaxReviewsAmount] = useState(100)
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(50)
	const [minReleaseDate, setMinReleaseDate] = useState(1990)
	const [maxReleaseDate, setMaxReleaseDate] = useState(2021)
	const [minSteamRating, setMinSteamRating] = useState(0)
	const [maxSteamRating, setMaxSteamRating] = useState(100)
	const [filteredList, setFilteredList] = useState()
	const [unFilteredList, setUnFilteredList] = useState([])

	useEffect(() => {
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

		setStoresApi({ loading: true })

		fetch('https://www.cheapshark.com/api/1.0/stores')
			.then((res) => res.json())
			.then((data) => {
				setStoresApi({ loading: false, data: data })
			})
			.catch((error) => {
				console.log(error)
				setStoresApi({ loading: false, data: null, error: true })
			})
	}, [])

	//storesSelectedObject
	if (storesApi.data && !storesSelected) {
		//error without if statement
		let obj = { default: true }
		let storesArr = storesApi.data.map((item) => item.storeName)
		setStores(storesArr)
		storesArr.map((item) => {
			return (obj[item] = true)
		})
		setStoresSelected(obj)
	}

	//CHAINED FILTER METHODS works but alot of code, and not versatile

	useEffect(() => {
		setFilteredList(apiState.data)
	}, [apiState.data])

	//WORKING FILTER FUNCTION
	function createFilteredList() {
		let minReviewsFilter = (item) =>
			item.steamRatingCount >= minReviewsAmount * 1000
		let maxReviewsFilter = (item) =>
			item.steamRatingCount <= maxReviewsAmount * 1000
		let minRatingFilter = (item) => item.steamRatingPercent >= minSteamRating
		let maxRatingFilter = (item) => item.steamRatingPercent <= maxSteamRating
		let minPriceFilter = (item) => item.salePrice >= minPrice
		let maxPriceFilter = (item) => item.salePrice <= maxPrice

		let filtered = []
		if (apiState.data && storesSelected && stores) {

			if (maxReviewsAmount === 100) {
				filtered = apiState.data
					.filter(minReviewsFilter)
					// .filter(maxReviewsFilter)
					.filter(minRatingFilter)
					.filter(maxRatingFilter)
					.filter(minPriceFilter)
					.filter(maxPriceFilter)
			} else if (maxPrice == 50) {
				filtered = apiState.data
					.filter(minReviewsFilter)
					.filter(maxReviewsFilter)
					.filter(minRatingFilter)
					.filter(maxRatingFilter)
					.filter(minPriceFilter)
				// .filter(maxPriceFilter)
			} else if (maxReviewsAmount === 100 && maxPrice == 50) {
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
		filtered = filtered.filter(
			(item) => storesSelected[stores[item.storeID - 1]]
		)

		let unfiltered = apiState.data.filter((item) => {
			if (filtered.indexOf(item) == -1) {
				return item
			}
		})
		setUnFilteredList(unfiltered)
		setFilteredList(filtered)
	}

	//ROBS METHOD, NEEDS TO BE LOOKED AT
	/*
	function createFilteredList() {
		//filter functions
		let minReviewsFilter = (item) =>
			item.steamRatingCount >= minReviewsAmount * 1000
		//robs method
		let maxReviewsFilter = (item) => {
			if (maxReviewsAmount == 100) return
			return item.steamRatingCount <= maxReviewsAmount * 1000
		}

		let minRatingFilter = (item) => item.steamRatingPercent >= minSteamRating
		let maxRatingFilter = (item) => item.steamRatingPercent <= maxSteamRating
		let minPriceFilter = (item) => item.salePrice >= minPrice

    //alternative method, but with same result
		let maxPriceFilter = (item) =>maxPrice !== 50&& item.salePrice <= maxPrice

		let filtered = []
		//applying filter functions
		if (apiState.data) {
			filtered = apiState.data
				.filter(minReviewsFilter)
				.filter(maxReviewsFilter)
				.filter(minRatingFilter)
				.filter(maxRatingFilter)
				.filter(minPriceFilter)
				.filter(maxPriceFilter)
		}

		setFilteredList(filtered)
	}
*/

	return (
		<div class="app">
			<h1>CHEAPSHARK GAME DEALS</h1>
			{storesMenu && stores && apiState && (
				<StoresMenu
					storesArr={stores}
					setStoresMenu={(value) => setStoresMenu(value)}
					storesMenu={storesMenu}
					storesApi={storesApi}
					setStoresSelected={(value) => setStoresSelected(value)}
					storesSelected={storesSelected}
					createFilteredList={createFilteredList}
				/>
			)}

			<div class="rangeContainer">
				<MultiRange
					title={'Reviews'}
					min={0}
					max={100}
					minThumb={minReviewsAmount}
					maxThumb={maxReviewsAmount}
					multiplier={1000}
					divider={1000}
					setMinThumb={(value) => setMinReviewsAmount(value)}
					setMaxThumb={(value) => setMaxReviewsAmount(value)}
					createFilteredList={createFilteredList}
				/>
				<MultiRange
					min={0}
					max={50}
					minThumb={minPrice}
					maxThumb={maxPrice}
					title={'Price'}
					currency={'£'}
					setMinThumb={(value) => setMinPrice(value)}
					setMaxThumb={(value) => setMaxPrice(value)}
					createFilteredList={createFilteredList}
				/>
				<MultiRange
					title={'Release Date'}
					min={1990}
					max={2021}
					minThumb={minReleaseDate}
					maxThumb={maxReleaseDate}
					setMinThumb={(value) => setMinReleaseDate(value)}
					setMaxThumb={(value) => setMaxReleaseDate(value)}
					createFilteredList={createFilteredList}
				/>
				<MultiRange
					title={'Steam Rating'}
					min={0}
					max={100}
					minThumb={minSteamRating}
					maxThumb={maxSteamRating}
					percentage={true}
					setMinThumb={(value) => setMinSteamRating(value)}
					setMaxThumb={(value) => setMaxSteamRating(value)}
					createFilteredList={createFilteredList}
				/>
			</div>
			<button onClick={() => setStoresMenu(true)}>STORES</button>
			{apiState.loading && <h3>LOADING...</h3>}
			{filteredList && <h3>RESULTS:{filteredList.length}</h3>}
			{apiState.data && <h3>GAMES:{apiState.data.length}</h3>}

			{filteredList && unFilteredList && storesApi.data && (
				<Table
					filteredList={filteredList}
					unFilteredList={unFilteredList}
					storesApi={storesApi}
					apiState={apiState}
					storesSelected={storesSelected}
					minPrice={minPrice}
					maxPrice={maxPrice}
				/>
			)}
		</div>
	)
}

export default App
