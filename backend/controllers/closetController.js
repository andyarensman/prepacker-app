const Gear = require('../models/gearModel')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

// get all gear
const getGear = async (req, res) => {
  const user_id = req.user._id

  // TODO: may need to change the sort later or do it in front end
  const gear = await Gear.find({ user_id }).collation({'locale':'en'}).sort({gear_name: 1})

  res.status(200).json(gear)
}


// get single gear
const getSingleGear = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
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
    category, 
    notes, 
    website 
    // image_url
  } = req.body

  // forgotten Field
  let emptyFields = []

  //! If there are more required fields, add them here with more if checks
  if(!gear_name) {
    emptyFields.push('gear_name')
  }
  if(!category) {
    emptyFields.push('category')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const gear = await Gear.create({
        gear_name, 
        weight,
        category, 
        price, 
        notes, 
        website,
        user_id 
        // image_url
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
  const {
    gear_name, 
    weight, 
    price,
    category, 
    notes, 
    website 
    // image_url
  } = req.body

  // forgotten Field
  let emptyFields = []

  //! If there are more required fields, add them here with more if checks
  if(!gear_name) {
    emptyFields.push('gear_name')
  }
  if(!category) {
    emptyFields.push('category')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields})
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such gear'})
  }

  const gear = await Gear.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  if (!gear) {
    return res.status(404).json({error: 'No such gear'})
  }

  res.status(200).json(gear)
}

// get scrape data
const getScrapedGear = async (req, res) => {

  const url_scrape = req.body.url_scrape

  // Create an object for the data in returnData
  let returnData = {};

  await axios({
    method: 'get',
    url: url_scrape,
    timeout: 60000,
    httpsAgent: new https.Agent({ keepAlive: true })
  })
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)

      //TODO: Add category scrape?
      //TODO: Clean it up a bit

      // Grab gear name
      const gear_name = $('#product-page-title').text().trim()
      if (gear_name.length !== 0) {
        // console.log(gear_name)
        returnData.gear_name = gear_name
      }

      // Grab the image source - removed for copyright concerns
      /*
      let image_url_end = $('#media-center-primary-image').attr('src')
      if (image_url_end.length !== 0) {
        const gear_image_url = 'https://www.rei.com' + image_url_end
        returnData.gear_image_url = gear_image_url
      }
      */

      // Grab Category
      let category;
      let potentialCategory1 = $('ol.cdr-breadcrumb__list_11-3-1 > li:nth-child(3) > a').text().trim().toLowerCase();
      let potentialCategory2 = $('ol.cdr-breadcrumb__list_11-3-1 > li:nth-child(2) > a').text().trim().toLowerCase()
      let potentialCategory3 = $('ol.cdr-breadcrumb__list_11-3-1 > li:nth-child(1) > a').text().trim().toLowerCase()

      //console.log(potentialCategory1, potentialCategory2, potentialCategory3)

      const categoryFinder = (item) => {
        switch (item) {
          case 'women\'s clothing':
          case 'men\'s clothing':
          case 'clothing':
          case 'footwear':
          case 'sunglasses':
            category = 'clothing';
            break;
          case 'hiking backpacks':
          case 'stuff sacks':
            category = 'container';
            break;
          case 'health and safety':
          case 'water bottles and treatment':
          case 'headlamps':
            category = 'essential';
            break;
          case 'camp bathroom':
            category = 'hygiene';
            break;
          case 'camp kitchen':
            category = 'kitchen';
            break;
          case 'tents':
          case 'sleeping bags':
          case 'sleeping pads, cots and hammocks':
            category = 'sleep';
            break;
          case 'avalanche safety gear':
          case 'mountaineering gear':
          case 'climbing helmets':
          case 'climbing harnesses':
          case 'climbing':
            category = 'mountaineering';
            break;
          default:
            break;
        }
      }

      categoryFinder(potentialCategory1)
      if (!category) {
        categoryFinder(potentialCategory2)
      }
      if (!category) {
        categoryFinder(potentialCategory3)
      }

      // console.log('category: ', category)

      if (category) {
        // console.log('added category')
        returnData.category = category
      }
      

      // Grab the current price
      let currency = $('#buy-box-product-price').text().trim()
      if (currency.length !== 0) {
        const price = Number(currency.replace(/[^0-9.-]+/g,""))
        returnData.price = price
      }

      // Grab all data from the table and store it as an array of objects (mostly for weight, but may use others later)

      let tableArray = [];
      let gearWeightOptions = {};
      let otherWeightKeys = [];
      let gear_weight_ounces;


      if ($("#tech-specs-collapsible > table > tbody > tr").text().length !== 0) {
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
      }
      
      // console.log(tableArray)
      // console.log(gearWeightOptions)

      // regex for lbs oz
      const lbsOzRegex = /\d+\s?lbs?\.?\s?\d+(\.\d+)?\s?oz\.?/i
      // regex lbs
      const lbsRegex = /\d+(\.\d+)?\s?lbs?/i
      // regex oz
      const ozRegex = /\d+(\.\d+)?\s?oz\.?/i
      // regex pounds
      const poundsRegex = /\d+(\.\d+)?\s?pounds?/i
      // regex ounces
      const ouncesRegex = /\d+(\.\d+)?\s?ounces?/i
      // regex numbers
      const weightNumRegex = /\d+(\.\d+)?/g

      // function for converting string weight to number
      const weightToNum = (weightText) => {
        let weightString;

        switch (true) {
          case lbsOzRegex.test(weightText):
            weightString = weightText.match(lbsOzRegex)[0]
            let weightArray = weightString.match(weightNumRegex)

            gear_weight_ounces = Number(weightArray[0])*16 + Number(weightArray[1]);
            break;
          case lbsRegex.test(weightText):
            weightString = weightText.match(lbsRegex)[0];
            let weightArray1 = weightString.match(weightNumRegex)

            gear_weight_ounces = Number(weightArray1[0])*16;
            break;
          case ozRegex.test(weightText):
            weightString = weightText.match(ozRegex)[0];
            let weightArray2 = weightString.match(weightNumRegex)

            gear_weight_ounces = Number(weightArray2[0]);
            break;
          case poundsRegex.test(weightText):
            weightString = weightText.match(poundsRegex)[0];
            let weightArray3 = weightString.match(weightNumRegex)

            gear_weight_ounces = Number(weightArray3[0])*16;
            break;
          case ouncesRegex.test(weightText):
            weightString = weightText.match(ouncesRegex)[0];
            let weightArray4 = weightString.match(weightNumRegex)

            gear_weight_ounces = Number(weightArray4[0]);
            break;
          default:
            break
        }
      }

      // Go through the gearWeightOptions and find the best match
      if (gearWeightOptions.weight) {
        weightToNum(gearWeightOptions.weight[0])
      } else if (gearWeightOptions['minimum trail weight']) {
        weightToNum(gearWeightOptions['minimum trail weight'][0])
      } else if (gearWeightOptions[otherWeightKeys]) {
        weightToNum(gearWeightOptions[otherWeightKeys][0])
      }
      
      // console.log(gear_weight_ounces, 'ounces')
      if (gear_weight_ounces) {
        returnData.gear_weight_ounces = gear_weight_ounces
      }
      
      
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