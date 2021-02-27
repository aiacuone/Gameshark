import react, { useState } from 'react'
import './App.css'
import Fetch from './components/Fetch'
import StoresMenu from './components/StoresMenu'
import MultiRange from './components/MultiRange'

function App() {
	const [apiState, setApiState] = useState({
		loading: false,
		data: null,
		error: false,
	})
	const [storesMenu, setStoresMenu] = useState(false)
	const [storesSelected, setStoresSelected] = useState(null)
	const [minReviewsAmount, setMinReviewsAmount] = useState(0)
	const [maxReviewsAmount, setMaxReviewsAmount] = useState(100)
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(100)
	const [minReleaseDate, setMinReleaseDate] = useState(1990)
	const [maxReleaseDate, setMaxReleaseDate] = useState(2021)
	const [minSteamRating, setMinSteamRating] = useState(0)
	const [maxSteamRating, setMaxSteamRating] = useState(100)
	const [filteredList, setFilteredList] = useState([])

	let state = {
		storesSelected,
		minReviewsAmount,
		maxReviewsAmount,
		minPrice,
		maxPrice,
		minReleaseDate,
		maxReleaseDate,
		minSteamRating,
		maxSteamRating,
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
			<button onClick={() => setStoresMenu(true)}>STORES</button>
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
				/>
				<MultiRange
					min={0}
					max={100}
					minThumb={minPrice}
					maxThumb={maxPrice}
					title={'Price'}
					currency={'£'}
					setMinThumb={(value) => setMinPrice(value)}
					setMaxThumb={(value) => setMaxPrice(value)}
				/>
				<MultiRange
					title={'Release Date'}
					min={1990}
					max={2021}
					minThumb={minReleaseDate}
					maxThumb={maxReleaseDate}
					setMinThumb={(value) => setMinReleaseDate(value)}
					setMaxThumb={(value) => setMaxReleaseDate(value)}
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
				/>
			</div>
			<Fetch
				apiState={apiState}
				setApiState={(value) => setApiState(value)}
				state={state}
				setFilteredList={(value) => setFilteredList(value)}
			/>
			{/* {JSON.stringify(filteredList)} */}
		</div>
	)
}

export default App
