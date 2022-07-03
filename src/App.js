import './App.css';
import { useEffect, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import PriceCard from './priceCard'
import { Container } from '@mui/system';
export const APIKEY = '4089ff3842473995346ee2b23624aaf72504146d052d4ac10dc4ebec5b84ffb4'

function App() {
  const [symbol, setSymbol] = useState('');
  const [symList, setSymList] = useState({});

  useEffect(() => {
    fetch(`https://min-api.cryptocompare.com/data/blockchain/list?api_key=${APIKEY}`)
      .then((r) => r.json())
      .then((res) => {
        setSymList(Object.keys(res.Data).reduce((o, i) => { o[i] = false; return o }, {}));
        console.log(`loaded ${Object.keys(res.Data).length} symbols`)
      })
  }, [])

  const handleChange = (event) => {
    setSymbol(event.target.value)
  }

  const addSym = () => {
    symList[symbol] = true;
    setSymList({ ...symList })
  }

  const removeSym = (sym) => {
    symList[sym] = false;
    setSymList({ ...symList })
  }

  const showCard = (sym) => {
    return <div key={sym}>
      <PriceCard key={sym} sym={sym} removeSym={() => removeSym(sym)} />
    </div>
  }

  return (
    <div className="App">
      <Stack spacing={2} direction="row">
        <FormControl>
          <InputLabel>Symbol</InputLabel>
          <Select
            value={symbol}
            label="Symbol"
            onChange={handleChange}
          >
            {Object.keys(symList).map((s) => {
              return <MenuItem key={s} value={s}>{s}</MenuItem>
            })}
          </Select>
        </FormControl>
        <Button variant='contained' onClick={addSym}>Add</Button>
      </Stack>
      <Container maxWidth={false}>
        <Grid sx={{ flexGrow: 1 }} spacing={0} container justifyContent="space-evenly">
          {
            Object.keys(symList).filter((i) => { return symList[i] }).map((s) => {
              return showCard(s)
            })
          }
        </Grid>
      </Container>
    </div >
  );
}

export default App;
