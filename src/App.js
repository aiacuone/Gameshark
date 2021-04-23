import react, { useState, useEffect } from 'react'
import './App.css'
import StoresMenu from './components/StoresMenu'
import MultiRange from './components/MultiRange'
import Table from './components/Table'
import PageButtons from './components/PageButtons'
import logo from './images/shark/logo.svg'

//BUGS

function App() {
	////////////////////////////////// state ///////////////////////////////////////////

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
	const [titleApi, setTitleApi] = useState({
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
	const [sortBy, setSortBy] = useState()
	const [page, setPage] = useState(1)
	const [titleSearch, setTitleSearch] = useState('')

	let state = {
		apiState,
		storesApi,
		titleApi,
		storesMenu,
		storesSelected,
		stores,
		minReviewsAmount,
		maxReviewsAmount,
		minPrice,
		maxPrice,
		minReleaseDate,
		maxReleaseDate,
		minSteamRating,
		maxSteamRating,
		filteredList,
		unFilteredList,
		sortBy,
		page,
		titleSearch,
	}

	let setState = {
		setApiState,
		setStoresApi,
		setTitleApi,
		setStoresMenu,
		setStoresSelected,
		setStores,
		setMinReviewsAmount,
		setMaxReviewsAmount,
		setMinPrice,
		setMaxPrice,
		setMinReleaseDate,
		setMaxReleaseDate,
		setMinSteamRating,
		setMaxSteamRating,
		setFilteredList,
		setUnFilteredList,
		setSortBy,
		setPage,
		setTitleSearch,
	}

	////////////////////////////////// global variables ///////////////////////////////////

	let headers = {
		'Release Date': 'Release',
		Price: 'Price',
		Title: 'Title',
		'Steam Rating': 'Reviews',
		Reviews: 'reviews_amount',
		Store: 'Store',
	}

	let vars = { headers }

	////////////////////////////////// useEffects /////////////////////////////////////////

	//default API call
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

		//list of stores
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

	useEffect(() => {
		setFilteredList(apiState.data)
	}, [apiState.data])

	// useEffect(() => {
	// 	if (titleSearch) {
	// 		setTitleApi({ loading: true })

	// 		fetch('https://www.cheapshark.com/api/1.0/games?title='+titleSearch)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setTitleApi({ loading: false, data: data })
	// 				// createFilteredList({ gamesList: data })
	// 			})
	// 			.catch((error) => {
	// 				console.log(error)
	// 				setTitleApi({ loading: false, data: null, error: true })
	// 			})
	// 	}
		
	// }, [titleSearch])
	
	///////////////////////////// storesSelectedObject ////////////////////////////

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

	//////////////////////// updateFetch //////////////////////////////

	function updateFetch(fetchObj) {
		//creates list of stores
		let stores = () => {
			let arr = []
			Object.keys(storesSelected).map((item, index) => {
				storesSelected[item] && arr.push(index)
			})
			return arr.join()
		}

		let fetchSortBy = fetchObj && fetchObj.sortBy ? fetchObj.sortBy : ''

		let fetchPage = fetchObj && fetchObj.page ? fetchObj.page - 1 : page - 1

		let standardAddress =
			'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
			minPrice +
			'&upperPrice=' +
			maxPrice +
			'&steamRating=' +
			minSteamRating +
			'&pageNumber=' +
			fetchPage +
			'&storeID=' +
			stores()

		//Incorporates sortBy, if you add sortBy=, but with no value, it changes the default list, so its better to keep the sortBy out of the code if there is no sorting
		let fetchAddress =
			fetchSortBy && fetchSortBy !== 'reviews_amount'
				? standardAddress + '&sortBy=' + fetchSortBy
				: standardAddress

		setApiState({ loading: true })

		fetch(fetchAddress)
			.then((res) => res.json())
			.then((data) => {
				setApiState({ loading: false, data: data })
				createFilteredList({
					gamesList: data,
					sortByReviews: fetchObj.sortBy == 'reviews_amount' ? true : false,
				})
			})
			.catch((error) => {
				console.log(error)
				setApiState({ loading: false, data: null, error: true })
			})
	}
	/////////////////////////// createFilteredList /////////////////////////

	function createFilteredList(data) {
		//local sort by reviews amount
		let gamesList = data.sortByReviews
			? data.gamesList.sort((a, b) => {
					return b.steamRatingCount - a.steamRatingCount
			  })
			: data.gamesList

		let filtered = gamesList.filter((item) => {
			let filter1 =
				minReviewsAmount == 0
					? item
					: item.steamRatingCount >= minReviewsAmount * 1000
			let filter2 =
				maxReviewsAmount == 100
					? item
					: item.steamRatingCount <= maxReviewsAmount * 1000
			let filter3 =
				maxSteamRating == 100
					? item
					: item.steamRatingPercent == '0' ||
					  item.steamRatingPercent <= maxSteamRating
			let filter4 =
				minReleaseDate == 1990
					? item
					: item.releaseDate * 1000 > new Date(minReleaseDate, 0, 1).getTime()
			let filter5 =
				maxReleaseDate == 2021
					? item
					: item.releaseDate * 1000 < new Date(maxReleaseDate, 11, 31).getTime()

			return filter1 && filter2 && filter3 && filter4 && filter5
		})
		let unfiltered = gamesList.filter((item) => {
			if (filtered.indexOf(item) == -1) {
				return item
			}
		})

		setUnFilteredList(unfiltered)
		setFilteredList(filtered)
	}
	return (
		<div class="app">
			<img class='logo' src={logo} />
			{storesMenu && stores && apiState && (
				<StoresMenu
					createFilteredList={createFilteredList}
					updateFetch={updateFetch}
					state={state}
					setState={setState}
				/>
			)}
			<div class="sticky_container">
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
						updateFetch={updateFetch}
						state={state}
						setState={setState}
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
						updateFetch={updateFetch}
						state={state}
						setState={setState}
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
						updateFetch={updateFetch}
						state={state}
						setState={setState}
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
						updateFetch={updateFetch}
						state={state}
						setState={setState}
					/>
				</div>
				<div class="input_container">
					{/* <input
						class="title_search"
						type="text"
						placeholder="Title Search"
						onChange={(e) => setTitleSearch(e.target.value)}
						value={titleSearch}></input> */}

					<PageButtons
						state={state}
						setState={setState}
						updateFetch={updateFetch}
					/>
					<button
						class="stores_button header"
						onClick={() => setStoresMenu(true)}>
						STORES
					</button>
				</div>
			</div>

			{apiState.loading && <h3>LOADING...</h3>}

			{filteredList && unFilteredList && storesApi.data && !titleSearch&& (
				<Table
					state={state}
					setState={setState}
					updateFetch={updateFetch}
					vars={vars}
				/>
			)}
		</div>
	)
}

export default App
