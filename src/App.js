import react, { useState } from 'react'
import './App.css'
import Fetch from './components/Fetch'
import InputText from './components/InputText'
import OnSale from './components/OnSale'
import StoresMenu from './components/StoresMenu'
import MultiRange from './components/MultiRange'

function App() {
	const [apiState, setApiState] = useState({
		loading: false,
		data: null,
		error: false,
	})
	const [title, setTitle] = useState('')
	const [onSale, setOnSale] = useState(false)
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

	return (
		<div class="app">
			{storesMenu && (
				<StoresMenu
					setStoresMenu={(value) => setStoresMenu(value)}
					storesMenu={storesMenu}
					setStoresSelected={(value) => setStoresSelected(value)}
					storesSelected={storesSelected}
				/>
			)}

			<div class="titleHeader">
				<InputText setTitle={(value) => setTitle(value)} title={title} />
			</div>
			<div class="rangeContainer">
				<MultiRange
					title={'Reviews'}
					min={0}
					max={100}
					minThumb={minReviewsAmount}
					maxThumb={maxReviewsAmount}
					multiplier={1000}
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

			<div class="inputContainer 3">
				<OnSale onSale={onSale} setOnSale={(value) => setOnSale(value)} />
				<button onClick={() => setStoresMenu(true)}>STORES</button>
			</div>
		</div>
	)
}

export default App

// const [state, setState]= useState({
//   apiState:{ loading: false, data: null, error: false },
//   title:'',
//   priceRange:[0,100],
//   steamRating:50,
//   reviewsAmount:0,
//   onSale:false,
//   stores:'',
//   releaseDate:[1995,2010],
// })
