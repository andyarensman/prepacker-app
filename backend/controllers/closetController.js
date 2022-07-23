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

      // Create an array of objects for the data in returnData
      //TODO: Get other data
      const gear_name = $('#product-page-title').text().trim()
      console.log(gear_name)
      returnData.push({gear_name})

      // Grab the image source
      const gear_image_url = 'https://www.rei.com' + $('#media-center-primary-image').attr('src')
      console.log(gear_image_url)
      returnData.push({gear_image_url})

      // Grab all data from the table and store it as an array of objects

      let tableArray = []
      let gearWeightOptions = {};
      let otherWeightKeys = []

      $("#tech-specs-collapsible > table > tbody > tr").each((index, element) => {

        let key = $(element).find('th').text().trim().toLowerCase()
        let value = []

        // This is a mess but it works
        value.push(...$('p', element).text().trim().split(/\r?\n/))
        value.forEach((e, i) => {
          value[i] = e.replace(/\r?\n/, '').trim().toLowerCase()
        })
        value = value.filter(e => e)

        // weight options
        switch (key) {
          case 'weight':
          case 'minimum trail weight':
            gearWeightOptions[key] = value;
            break;
          case key.match(/weight/)?.input:
            gearWeightOptions[key] = value;
            otherWeightKeys.push(key)
            break;
          default:
            break;
        }

        let obj = {}
        obj[key] = value
        tableArray.push(obj)
      });
      // console.log(tableArray)
      console.log(gearWeightOptions)

      // regex for lbs oz
      const lbsOzRegex = /\d+\s?lbs?\.?\s?\d+\s?oz\.?/i
      // regex lbs
      const lbsRegex = /\d+\s?lbs?/i
      // regex oz
      const ozRegex = /\d+\s?oz\.?/i
      // regex pounds
      const poundsRegex = /\d+\.?(\d+)?\s?pounds?/i
      // regex ounces
      const ouncesRegex = /\d+\.?(\d+)?\s?ounces?/i

      // function for converting string weight to number
      const weightToNum = (weightText) => {
        switch (true) {
          case lbsOzRegex.test(weightText):
            let test = weightText.match(lbsOzRegex)
            console.log(test[0]);
            break;
          case lbsRegex.test(weightText):
            console.log(weightText.match(lbsRegex));
            break;
          case ozRegex.test(weightText):
            console.log(weightText.match(ozRegex));
            break;
          case poundsRegex.test(weightText):
            console.log(weightText.match(poundsRegex));
            break;
          case ouncesRegex.test(weightText):
            console.log(weightText.match(ouncesRegex));
            break;
          default:
            break
        }
      }

      // Go through the gearWeightOptions and first find if anything exactly matches 'weight'
      if (gearWeightOptions.weight) {
        console.log('yeah weight')
        weightToNum(gearWeightOptions.weight[0])
      } else if (gearWeightOptions['minimum trail weight']) {
        console.log('min weight')
        weightToNum(gearWeightOptions['minimum trail weight'][0])
      } else if (gearWeightOptions[otherWeightKeys[0]]) {
        console.log('other key')
        weightToNum(gearWeightOptions[otherWeightKeys[0]])
      }
      
      // if not, go through again and find any key with weight in it's name

      // convert the key's value to a number by figuring out if it's pounds, oz, or both. won't always be labeled the same way
      
      
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