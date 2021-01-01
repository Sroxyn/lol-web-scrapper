# Kullanımı / Usage
```js
const lol = require('lol-web-scrapper');
let data = await lol.getHero('Hero-Name','tr/en')
console.log(data)//{title: 'Akali',description: 'the Rogue Assassin'...}
```

## [Output]
```js
{
  title: 'Akali',
  description: 'the Rogue Assassin',
  hero_image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg',
  hardness: 'Moderate',
  rol: 'Assassin',
  skins: [
    [
	(...)
    ],
    [
	(...)
    ]
  ],
  passive_skil: {
	(...)
  },
  q_skil: {
	(...)
  },
  w_skil: {
	(...)
  },
  e_skil: {
	(...)
  },
  r_skil: {
	(...)
  }
}
```