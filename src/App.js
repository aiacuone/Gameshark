import react, { useState, useEffect } from 'react'
import './App.css'
import StoresMenu from './components/StoresMenu'
import MultiRange from './components/MultiRange'
import Table from './components/Table'
import PageButtons from './components/PageButtons'


//BUGS
//1.Games appearing to have a release date exceeding 2021, sometimes as far as 2105, to replicate, sort by release date
//2. When de-selecting sort by, sortBy is not being removed from API call. It works for title and price, but not the rest


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

	let state = {
		apiState,
		storesApi,
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
	}

	let setState = {
		setApiState,
		setStoresApi,
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
	}

	////////////////////////////////// global variables ///////////////////////////////////

	let headers = {
		'Release Date': 'Release',
		Price: 'Price',
		Title: 'Title',
		'Steam Rating': 'Reviews',
		Reviews: '',
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
	// console.log(sortBy)
	function updateFetch(fetchObj) {

		//creates array of stores that are selected
		let storesArr = []
		storesSelected &&
			Object.keys(storesSelected).map((item, index) => {
				storesSelected[item] && storesArr.push(index)
			})
		
		
		//SHOULD BE ABLE TO SIMPLIFY THIS ALOT WHEN FINISHED
		let fetchSortBy
			if (fetchObj&&fetchObj.sortBy) {
				fetchSortBy = fetchObj.sortBy
			} else if (fetchObj && !fetchObj.sortBy) {
				fetchSortBy=''
			// } else {
			// 	fetchSortBy=sortBy
			}

		
		let fetchPage
		if (fetchObj && fetchObj.page) {
			fetchPage = fetchObj.page - 1

		} else {
			fetchPage=page - 1
		}   

		let fetchAddress
		if (!fetchSortBy) {
			fetchAddress =
				'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
				minPrice +
				'&upperPrice=' +
				maxPrice +
				'&steamRating=' +
				minSteamRating +
				'&pageNumber=' +
				fetchPage +
				'&storeID=' +
				storesArr.join()
		} else {
			fetchAddress =
				'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
				minPrice +
				'&upperPrice=' +
				maxPrice +
				'&steamRating=' +
				minSteamRating +
				'&sortBy=' +
				fetchSortBy +
				'&pageNumber=' +
				fetchPage +
				'&storeID=' +
				storesArr.join()
		}

		setApiState({ loading: true })

		fetch(fetchAddress)
			.then((res) => res.json())
			.then((data) => {
				setApiState({ loading: false, data: data })
				createFilteredList(data)
			})
			.catch((error) => {
				console.log(error)
				setApiState({ loading: false, data: null, error: true })
			})
	}
	/////////////////////////// createFilteredList /////////////////////////

	function createFilteredList(data) {
		let filtered = data.filter((item) => {
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
				minReleaseDate == 2021
					? item
					: item.releaseDate * 1000 < new Date(maxReleaseDate, 11, 31).getTime()

			return filter1 && filter2 && filter3 && filter4 && filter5
		})
		let unfiltered = data.filter((item) => {
			if (filtered.indexOf(item) == -1) {
				return item
			}
		})

		setUnFilteredList(unfiltered)
		setFilteredList(filtered)
	}

	return (
		<div class="app">
			<h1>CHEAPSHARK GAME DEALS</h1>
			{storesMenu && stores && apiState && (
				<StoresMenu
					createFilteredList={createFilteredList}
					updateFetch={updateFetch}
					state={state}
					setState={setState}
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

			<button onClick={() => setStoresMenu(true)}>STORES</button>

			<PageButtons state={state} setState={setState} updateFetch={updateFetch} />
			
			{apiState.loading && <h3>LOADING...</h3>}

			{filteredList && <h3>FILTERED LIST:{filteredList.length}</h3>}
			{unFilteredList && <h3>UN-FILTERED LIST:{unFilteredList.length}</h3>}

			{apiState.data && <h3>GAMES:{apiState.data.length}</h3>}

			{/* {(filteredList && unFilteredList) && ( */}
				
			{/* )} */}

			{filteredList && unFilteredList && storesApi.data && (
				<Table
					state={state}
					setState={setState}
					updateFetch={updateFetch}
					vars={vars}
				/>
			)}

			{(filteredList&&(filteredList.length+unFilteredList.length>20)) && (
				<PageButtons state={state} setState={setState} updateFetch={ updateFetch}/>
			)}
		</div>
	)
}

export default App
