const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));



const private_app_token = 'pat-eu1-1b6601b6-4629-4fee-8915-cd073031724d'

app.get('/homepage-pets', async (req, res) => {
  const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets?properties=pet_name,pet_type,food_preference';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['pet_name', 'pet_type', 'food_preferences'] // Add the property names you want here
  }
  try {
    const response = await axios.get(petsEndpoint, { headers, params });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    const pets = response.data.results;
    console.log('Pet data:', JSON.stringify(pets, null, 2));
    res.render('homepage', { pets: pets });
  } catch (error) {
    console.error(error);
  }
})

app.get('/update-pets', (req, res) => {
  try {
    res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
  } catch (error) {
    console.error(error);
  }
});


app.post('/update-pets', async (req, res) => {
  const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const data = {
    properties: {
      pet_name: req.body.pet_name,
      pet_type: req.body.pet_type,
      food_preference: req.body.food_preference
    }
  }
  try {
    const response = await axios.post(petsEndpoint, data, { headers });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    res.redirect('/homepage-pets'); // Redirects to home page
  } catch (error) {
    console.error(error);
  }
});


app.listen(3000, () => console.log('Server running on port 3000')); 