import { useState, useEffect } from 'react'
import { Button, Card, CardContent, CardActions, Grid, Typography } from '@mui/material';
import { APIKEY } from './App';

function PriceCard(props) {
    const [price, setPrice] = useState({});

    const updatePrice = () => {
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${props.sym}&tsyms=INR,USD,JPY&api_key=${APIKEY}`)
            .then((res) => res.json())
            .then((res) => setPrice(res))
    }

    useEffect(() => {
        let id = setInterval(updatePrice, 3000);
        return () => clearInterval(id);
    })

    return (
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant="h3" component="div">
                        {props.sym}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {Object.keys(price).map((curr) => {
                            return <span key={curr}><strong>{curr}:&nbsp;</strong>{price[curr]}<br /></span>
                        })}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={() => props.removeSym(props.sym)}>Remove</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default PriceCard;