const knex = require('../database/knex');

class DishRepository {
   async create({ name, description, category, price, ingredients }) {
      let dishId = await knex("dishes").insert({ name, description, category, price });

      dishId = dishId[0];

      const ingredientsInsert = ingredients.map( ingredient => {
         return {
            dishId,
            name: ingredient
         }
      });

      await knex("ingredients").insert(ingredientsInsert);

      return dishId;
   }

   async update({ dishId, dishName, dishDescription, dishCategory, dishPrice, dishIngredients }) {
      await knex("dishes").update({ name: dishName, description: dishDescription, category: dishCategory, price: dishPrice }).where({ id: dishId });

      const ingredientsUpdate = dishIngredients.map( ingredient => {
         return {
            name: ingredient,
            dishId
         }
      });

      await knex("ingredients").where({ dishId }).delete();
      await knex("ingredients").insert(ingredientsUpdate);
   }

   async index({ dishName}) {
      
      let dishes;

      if (dishName) {
         dishes = await knex("dishes").whereLike("name", `%${dishName}%`).orderBy("name");
      } else {
         dishes = await knex("dishes").orderBy("name");
      }
      
      const ingredients = await knex("ingredients");

      const dishesWithIngredients = dishes.map(dish => {
         const ingredientsData = ingredients.filter( ingredients => ingredients.dishId === dish.id);

         return {
            ...dish,
            ingredientsData
         }
      });

      const dishesData = dishesWithIngredients;

      return dishesData;
   }

   async show({ dishId }) {
      const dishData = await knex("dishes").where({ id: dishId }).first();
      const ingredientsData = await knex("ingredients").select('id', 'name').where({ dishId }).orderBy("name");

      return {
         dishData,
         ingredientsData
      };
   }

   async delete({ dishId }) {
      await knex("dishes").where({ id: dishId }).delete();
   }

   async updateImage({ dishId, dishData }) {
      await knex("dishes").update(dishData).where({ id: dishId });
   }
}

module.exports = DishRepository;