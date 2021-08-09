const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
app.use(express.json())
app.post("/pdf", async (req, res) => {
    let bufferObj = Buffer.from(req.body.html, "base64");
    let decodedString = bufferObj.toString("utf8");
    const browser = await puppeteer.launch({ headless: true,defaultViewport: {width:1370, height:900}, args:["--no-sandbox"]});
    const page = await browser.newPage();
    await page.setViewport({width:1370, height:900});
    await page.goto(`data:text/html,${decodedString}`, {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({width:'1370px', height:'1600px'});
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
})

app.listen(3000, () => {
    console.log("Server started");
});