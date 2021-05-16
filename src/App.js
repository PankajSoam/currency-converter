import React,{useEffect, useState} from 'react'; 
import './App.css';
import CurrencyRow from './currencyRow';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=2d0e44e47375b55469023cddac038424&format=1';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate,setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log(exchangeRate);

  useEffect(()=>{
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency])
    });
  },[])


  return (
    <>
      <h1>hello world</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}        
        onChangeCurrency={e => setFromCurrency(e.target.value)}
      />

      <div className="equals">=</div>

      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        />
    </>
  );
}

export default App;
