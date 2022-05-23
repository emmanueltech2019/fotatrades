var base = "https://api.coinranking.com/v2/coins"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKey = "coinranking527413fc5a5a256eb021b40ced75a7e03a91c6ded37286e6"

fetch(`${proxyUrl}${base}${apiKey}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin': '*'
    }
}).then((res) => {
    console.log(res)
})