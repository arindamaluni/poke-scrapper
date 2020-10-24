const fetch = require('node-fetch')
const serverUrl = 'http://localhost:3000'

async function go () {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const pokemons = await response.json()

    pokemons.results.forEach(async (pokemon, i) => {
      try {
        const id = i + 1

        const pokemonData = {
          ...pokemon,
          id,
          picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }

        await fetch(`${serverUrl}/pokemon`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pokemonData)
        })
        console.log(`Posted info about pokemon #${id} ${pokemon.name}`)
      } catch (error) {
        console.error('Error while posting pokemon to json server', error)
      }
    })
  } catch (error) {
    console.error('Error while getting pokemon from pokeapi', error)
  }
}

go()
