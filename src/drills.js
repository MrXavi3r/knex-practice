const knex = require("knex");
require("dotenv").config();

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});
console.log("knex and driver installed correctly");

function getItemsWithText(searchTerm) {
    knexInstance
      .select('name')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
}

getItemsWithText('Shamburger')

function paginateProducts(page) {
        const productsPerPage = 6
        const offset = productsPerPage * (page - 1)
        knexInstance
          .select('*')
          .from('shopping_list')
          .limit(productsPerPage)
          .offset(offset)
          .then(result => {
            console.log({page})
            console.log(result)
          })
      }
      paginateProducts(2)

      function getItemsAddedAfter(daysAgo) {
        knexInstance
          .select('*')
          .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
          )
          .from('shopping_list')

          .then(result => {
            console.log(result)
          })
      }
      console.log('added after')
      getItemsAddedAfter(30)

      function totalCost(){
        knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('total cost')
            console.log(result)
        })
      }

      totalCost()