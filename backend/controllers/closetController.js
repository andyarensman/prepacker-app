const Gear = require('../models/gearModel')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')

// get all gear
const getGear = async (req, res) => {
  // TODO: may need to change the sort later or do it in front end
  const gear = await Gear.find({}).sort({createdAt: -1})

  res.status(200).json(gear)
}


// get single gear
const getSingleGear = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findById(id)

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)
}


// add new gear
const addGear = async (req, res) => {
  const {
    gear_name, 
    weight, 
    price, 
    notes, 
    website, 
    image_url
  } = req.body

  // forgotten Field
  let emptyFields = []

  //! If there are more required fields, add them here with more if checks
  if(!gear_name) {
    emptyFields.push('gear_name')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  // add doc to db
  try {
    const gear = await Gear.create({
        gear_name, 
        weight, 
        price, 
        notes, 
        website, 
        image_url
      })
    res.status(200).json(gear)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// delete gear
const deleteSingleGear = async (req, res) => {
  const { id } = req.params

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findOneAndDelete({_id: id})

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)

}

// edit gear
const editGear = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findOneAndUpdate({_id: id }, {
    ...req.body
  })

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)
}

const getScrapedGear = async (req, res) => {

  const url_scrape = req.body.url_scrape
  let returnData = [];

  await axios(url_scrape)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)

      // Create an array of objects for the data
      //TODO: Get other data
      const gear_name = $('#product-page-title').text().trim()
      console.log(gear_name)
      returnData.push({gear_name})

      // console.log($('#tech-specs-collapsible > table > tbody > tr:nth-child(11) > td > p:nth-child(1)').text())

      let tableArray = []

      $("#tech-specs-collapsible > table > tbody > tr").each((index, element) => {
        //console.log($(element).text());
        // console.log($(element).find('td').text().trim());

        let key = $(element).find('th').text().trim()
        let value = []

        // value.push($(element).find('td').find('p').text().trim())

        
        console.log(value)
      });

      // Grab full table?
      /*
      [
        {
          tech-spec: "info"
        }
      ]
      */

      // Weight - need a regex and alg. for converting weight text to num
      // 1) Get the weight String

      // 2) ???

      // 3) Profit
      
      
    }).catch(err => console.log(err))
  
  //console.log(returnData)
  //Send the data back to frontend
  res.status(200).json(returnData)
}


module.exports = {
  getGear,
  getSingleGear,
  addGear,
  deleteSingleGear,
  editGear,
  getScrapedGear
}