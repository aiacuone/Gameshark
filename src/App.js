import react, { useState, useEffect } from 'react'
import './app.css'
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
  const [stores, setStores] = useState({		loading: false,
		data: null,
		error: false,})
	const [storesMenu, setStoresMenu] = useState(false)
	const [storesSelected, setStoresSelected] = useState(null)
	const [minReviewsAmount, setMinReviewsAmount] = useState(0)
	const [maxReviewsAmount, setMaxReviewsAmount] = useState(100)
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(50)
	const [minReleaseDate, setMinReleaseDate] = useState(1990)
	const [maxReleaseDate, setMaxReleaseDate] = useState(2021)
	const [minSteamRating, setMinSteamRating] = useState(0)
	const [maxSteamRating, setMaxSteamRating] = useState(100)
  const [filteredList, setFilteredList] = useState()

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
  }, [])
  
  useEffect(() => {
		setStores({ loading: true })

		fetch('https://www.cheapshark.com/api/1.0/stores')
			.then((res) => res.json())
			.then((data) => {
				setStores({ loading: false, data: data })
			})
			.catch((error) => {
				console.log(error)
				setStores({ loading: false, data: null, error: true })
			})
  }, [])
  
  let storesArr;
  storesArr=stores.data && stores.data.map((item) => {

  })

	//CHAINED FILTER METHODS works but alot of code, and not versatile

	let minReviewsFilter = (item) =>
		item.steamRatingCount >= minReviewsAmount * 1000
	let maxReviewsFilter = (item) =>
		item.steamRatingCount <= maxReviewsAmount * 1000
	let minRatingFilter = (item) => item.steamRatingPercent >= minSteamRating
	let maxRatingFilter = (item) => item.steamRatingPercent <= maxSteamRating
	let minPriceFilter = (item) => item.salePrice >= minPrice
	let maxPriceFilter = (item) => item.salePrice <= maxPrice

	useEffect(() => {
		setFilteredList(apiState.data)
	}, [apiState.data])

	function createFilteredList() {
		let filtered = []
		if (apiState.data) {
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

		setFilteredList(filtered)
	}

	return (
		<div class="app">
			<h1>CHEAPSHARK GAME DEALS</h1>
			{storesMenu && (
				<StoresMenu
					setStoresMenu={(value) => setStoresMenu(value)}
					storesMenu={storesMenu}
					setStoresSelected={(value) => setStoresSelected(value)}
					storesSelected={storesSelected}
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

      {filteredList && stores.data&&<Table filteredList={filteredList} stores={ stores}/>}
      {console.log(storesSelected)}
		</div>
	)
}

export default App
