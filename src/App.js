import react, {useState,useEffect} from 'react'
import './App.css';
import Fetch from './components/Fetch'
import Selection from './Selection'

function App() {


  const [apiState, setApiState] = useState({ loading: false, data: null, error: false })
  const [title, setTitle]=useState('')
  const [priceRange,setPriceRange]=useState('')
  const [steamRating, setSteamRating]=useState('')
  const [reviewsAmount, setReviewsAmount]=useState('')
  const [onSale, setOnSale]=useState(false)
  const [stores, setStores]=useState(false)
  const [earlyReleaseDate, setEarlyReleaseDate]=useState('')
  const [lateReleaseDate, setLateReleaseDate]=useState('')

  let selection={
    apiState:apiState,
    title:title,
    priceRange:priceRange,
    steamRating:steamRating,
    reviewsAmount:reviewsAmount,
    onSale:onSale,
    stores:stores,
    earlyReleaseDate:earlyReleaseDate,
    lateReleaseDate:lateReleaseDate,
    setSelection:{
      setApiState:value=>setApiState(value),
      setTitle:value=>setTitle(value),
      setPriceRange:value=>setPriceRange(value),
      setSteamRating:value=>setSteamRating(value),
      setReviewsAmount:value=>setReviewsAmount(value),
      setOnSale:value=>setOnSale(value),
      setStores:value=>setStores(value),
      setEarlyReleaseDate:value=>setEarlyReleaseDate(value),
      setLateReleaseDate:value=>setLateReleaseDate(value),
    }
  }

  return (
    <div className="App">
      <Fetch selection={selection}/>
      <Selection selection={selection}/>
    </div>
  );
}

export default App;
