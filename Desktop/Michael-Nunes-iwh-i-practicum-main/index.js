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
    properties: ['pet_name', 'pet_type', 'food_preferences'] // Adicione os nomes das propriedades que você deseja aqui
  }
  try {
    const response = await axios.get(petsEndpoint, { headers, params });
    console.log('Resposta da API:', JSON.stringify(response.data, null, 2)); 
    const pets = response.data.results; 
    console.log('Dados de pets:', JSON.stringify(pets, null, 2)); 
    res.render('pets', { pets: pets }); 
  } catch (error) {
    console.error(error);
  }
})

app.get('/update-pets', async (req, res) => {
  const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['pet_name', 'pet_type', 'food_preference']
  }
  try {
    const response = await axios.get(petsEndpoint, { headers, params });
    console.log('Resposta da API:', JSON.stringify(response.data, null, 2));
    const pets = response.data.results;
    console.log('Dados de pets:', JSON.stringify(pets, null, 2));
    res.render('updates', { pets: pets }); // Render the updates.pug template passing pet data
  } catch (error) {
    console.error(error);
  }
});


app.post('/pets', async (req, res) => {
  const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets?properties=pet_name,pet_type,food_preference';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['pet_name', 'pet_type', 'food_preferences'] // Adicione os nomes das propriedades que você deseja aqui
  }
  try {
    const response = await axios.get(petsEndpoint, { headers, params });
    console.log('Resposta da API:', JSON.stringify(response.data, null, 2)); 
    const pets = response.data.results;
    console.log('Dados de pets:', JSON.stringify(pets, null, 2)); 
    res.render('pets', { pets: pets });
  } catch (error) {
    console.error(error);
  }
})

app.listen(3000, () => console.log('Server running on port 3000')); 