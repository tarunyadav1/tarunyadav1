const Mustache = require('mustache')
const fs = require('fs')
const fetch = require('node-fetch')
require('dotenv').config()
const MUSTACHE_MAIN_DIR = './main.mustache'

const DATA = {
	name: 'Tarun Yadav',
	date: new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short',
		timeZone: 'Europe/Stockholm',
	}),
	surename: 'Yadav',
	location: 'Delhi, India',
	temperature: '',
}

const weather = async () => {
	return await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${process.env.API}&units=metric`
	)
}

weather()
	.then((res) => res.json())
	.then((weatherData) => (DATA.temperature = weatherData.main?.temp))
	.then(() => generateReadMe())

function generateReadMe() {
	fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
		if (err) throw err
		const output = Mustache.render(data.toString(), DATA)
		fs.writeFileSync('README.md', output)
	})
}
