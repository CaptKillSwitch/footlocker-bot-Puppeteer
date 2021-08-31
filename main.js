const puppeteer = require('puppeteer');

const _url = "https://www.footlocker.ca/en/product/~/42073305.html";
const size = "07.0";

(async () => {
    async function click(e){
       await page.waitForTimeout((300*Math.random())+1000);
       await e.hover();
       await e.click();
    }
    const browser = await puppeteer.launch({headless: false,defaultViewport: null, args: ['--start-maximized']},);
    const page = await browser.newPage();
    console.log("Loading page, "+_url);
    await page.goto(_url);
    console.log("Step 1: Cancelling Message");
    let element = await page.waitForXPath('/html/body/div[34]/div[1]/form/div/div[2]/div[11]/button');
    await click(element);
    console.log("successful");
    console.log("Step 2: Selecting size");
    await page.evaluate(()=>{
        [...document.querySelectorAll('span')].find(e => e.textContent==="08.0").click();
    });
    let allSpans = await page.$$('div.c-form-field--checked');
    if(allSpans.length>1){
        console.log("successful");
        console.log("Step 3: Adding to cart");
        element = await page.waitForXPath("/html/body/div[1]/div[1]/main/div/div[2]/div/div/form/ul/li[3]/button");
        await click(element);
        console.log("successful");
    }
  })();