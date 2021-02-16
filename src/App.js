import react, {useState,useEffect} from 'react'
import './App.css';
import Fetch from './components/Fetch'
import Selection from './Selection'
import RangeSlider from './components/RangeSlider'
import SingleSlider from './components/SingleSlider'
import InputText from './components/InputText'
import OnSale from './components/OnSale'
import StoresButton from './components/StoresButton'
import StoresMenu from './components/StoresMenu'
import NewRangeSlider from './components/NewRangeSlider'

function App() {


  const [apiState, setApiState] =  useState({ loading: false, data: null, error: false })
  const [title, setTitle]=useState('')
  const [priceRange, setPriceRange]=useState([0,100])
  const [steamRating, setSteamRating]=useState([50,100])
  const [reviewsAmount, setReviewsAmount]=useState([0,10000])
  const [onSale, setOnSale]=useState(false)
  const [storesMenu, setStoresMenu]=useState(false)
  const [releaseDate, setReleaseDate]=useState([1995,2021])
  const [storesSelected, setStoresSelected]=useState(null)


  return (
    <div class="app">


      {storesMenu&&<StoresMenu
        setStoresMenu={(value)=>setStoresMenu(value)}
        storesMenu={storesMenu}
        setStoresSelected={(value)=>setStoresSelected(value)}
        storesSelected={storesSelected}
        />}

      <div class='titleHeader'>

        <InputText 
          setTitle={(value)=>setTitle(value)}
          title={title}
        />
      </div>

      <div class='inputContainer'>
        <RangeSlider 
          title='Release Date'
          value={releaseDate}
          setValue={(value)=>setReleaseDate(value)}
          step={1}
          min={1980}
          max={2021}
        />
        <RangeSlider 
          title='Price Range'
          value={priceRange}
          setValue={(value)=>setPriceRange(value)}
          step={5}
          min={0}
          max={100}
        />
      </div>

      <div class='inputContainer 2'>
        <RangeSlider 
          title='Steam Rating'
          value={steamRating} 
          setValue={(value)=>setSteamRating(value)}
          min={0}
          max={100}
          step={5}
        />
        <RangeSlider 
          title='Reviews Amount'
          value={reviewsAmount} 
          setValue={(value)=>setReviewsAmount(value)}
          min={0}
          max={10000}
          step={1000}
        />
      </div>

      <div class='inputContainer 3'>
        <OnSale
          onSale={onSale}
          setOnSale={(value)=>setOnSale(value)}
        />
       <button onClick={()=>setStoresMenu(true)}>STORES</button>

      </div>
      <NewRangeSlider/>

    </div>
    
  );
}

export default App;



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