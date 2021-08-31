

const puppeteer = require('puppeteer');
const chalk = require('chalk');
const inquirer = require('inquirer')

const mdnUrl = 'https://developer.mozilla.org/en-US/search?locale=en-US'

const start = async () => {
  inquirer.prompt({
    type: 'input',
    name: 'userInput',
    message: 'Enter array method to search for'
  })
	.then(res => getResults(res.userInput))
}

async function getResults(term) {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(mdnUrl);
	await page.type('#main-q', `Array.prototype.${term}`);
	await page.keyboard.down('Enter');
	await page.waitForSelector('.result');
	
	const resultUrl = await page.evaluate(() => {
    		const topResult = document.querySelector('.result-title');
		return topResult.href;
	});

	await page.goto(resultUrl);

	const resultDef = await page.evaluate(() => {
    		const termDef = document.querySelector('p');
		return termDef.innerText;
	});

	browser.close();

	console.log(chalk.magentaBright(resultDef));
	console.log(chalk.underline.dim(resultUrl));

}

start()