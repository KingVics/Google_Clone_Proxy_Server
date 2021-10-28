const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')



const API_HOST = process.env.API_HOST
const API_KEY = process.env.API_KEY
const API_AGENT = process.env.API_AGENT

//Init Cache
let cache = apicache.middleware


router.get('/:search/:type', cache('2 minutes'), async(req, res) => {
    const type = req.params.type
    const search = req.params.search
    const baseURL =  search === 'videos' ? `https://google-search3.p.rapidapi.com/api/v1/search/q=${type}&num=10 videos` : `https://google-search3.p.rapidapi.com/api/v1/${search}/q=${type}&num=100`


    try {
        const apiRes = await needle('get', baseURL, {
        headers: {
            'x-user-agent': API_AGENT,
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY
        }})
        const data = apiRes.body
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error}) 
    }
})




module.exports = router