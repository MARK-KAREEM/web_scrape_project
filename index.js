const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    //image
    const [e1] = await page.$x('//*[@id="landingImage"]');
    const src = await e1.getProperty("src");
    const imageUrl = await src.jsonValue();

    // title
    const [e12] = await page.$x('//*[@id="productTitle"]');
    const txt = await e12.getProperty("textContent");
    const title = await txt.jsonValue();

    // price
    const [e13] = await page.$x('//*[@id="price_inside_buybox"]');
    const priceTxt = await e13.getProperty("textContent");
    const price = await priceTxt.jsonValue();

    console.log({ imageUrl, title, price });
  } catch (error) {
    console.log(message.error);
  }

  browser.close();
}

scrapeProduct(
  "https://www.amazon.com/Foamily-Premium-Hypoallergenic-Polyester-Standard/dp/B0106UASB4/?_encoding=UTF8&pd_rd_w=EEGnY&pf_rd_p=223027c6-8030-47e4-a6f7-fd0fd07387a6&pf_rd_r=H8A7RPGG8MA2CF0EWZ4Z&pd_rd_r=8e586a0f-ce83-4dc6-a9a4-c30638505a3a&pd_rd_wg=WCleD&ref_=pd_gw_unk"
);
