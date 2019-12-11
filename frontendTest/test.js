const ok = require('assert').ok
const app = require('../server/app');
const puppeteer = require('puppeteer');
var browser, page

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 15000
};

describe('posAjax', function () {
    before(async function () {
        browser = await puppeteer.launch(opts)
        page = await browser.newPage()
    })
    after(function () {
        browser.close()
        app.stop()
    })

    describe('puppeteer', function () {
        it('GET /user/login should see Login an account.</p>', async function () {
            await page.goto('http://localhost:3000/user/login', { waitUntil: 'domcontentloaded' })
            let html = await page.content()
            
        })
        it('login {uid:"admin", password:"0000"}', async function () {
            await page.focus('#uid')
            await page.keyboard.type('admin')
            await page.focus('#password')
            await page.keyboard.type('0000')
            await page.click('#login')
        })
        it('should see alert ok!', async function () {
            //ok()
        })

    })
})