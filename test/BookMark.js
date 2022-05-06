const assert = require("assert")

const BookMark = artifacts.require('BookMark')

contract('BookMark', () => {
    let urls = null

    before(async() => {
        urls = await BookMark.deployed()
    })

    it ('should push a url', async() => {
        await urls.set('www.youtube.com')
        const url = await urls.get()
        assert(url[1] === 'www.youtube.com')
    })

    it ('should get urls', async() => {
        const _urls = await urls.get()
        const websites = _urls.map(url => url)
        assert.deepEqual(websites, ['www.example.com', 'www.youtube.com'])
    })


    it ('should get url by id', async () => {
        const url = await urls.getById(1)
        assert(url === 'www.youtube.com')
    })

    it ('should push a tab url', async() => {
        await urls.setTabUrl('www.bing.com')
        const url = await urls.getTabUrls()
        assert(url[0] === 'www.bing.com')
    })

    it ('should get tab urls', async() => {
        const _urls = await urls.getTabUrls()
        const websites = _urls.map(url => url)
        assert.deepEqual(websites, ['www.bing.com'])
    })


})