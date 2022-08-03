const axios = require("axios");
const { APY_KEY } = process.env;
const { Dog, Temperament, Op } = require("../../db");
const url = `https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY}`;

const fullInfo = async ()=>{
   let allApiDogs = await axios.get(url);
   let allDbDogs = await Dog.findAll({
     include: {
       model: Temperament,
       attributes: ["name"],
       through: {
         attributes: [],
       },
     },
   });
   //hago esto para que el temperament siempre sea temperaments con un array de objetos y valores
   let filteredDbDogs = [];
   for (let i = 0; i < allDbDogs.length; i++) {
     filteredDbDogs.push({
       id: allDbDogs[i].dataValues.id,
       name: allDbDogs[i].dataValues.name,
       height: allDbDogs[i].dataValues.height,
       weight: allDbDogs[i].dataValues.weight,
       life_span: allDbDogs[i].dataValues.life_span,
       image: allDbDogs[i].dataValues.image,
       temperaments: allDbDogs[i].dataValues.temperaments.map((t) => t.name),
     });
   }

   let filteredApiDogs = await allApiDogs.data.map((dog) => {
     return {
       id: dog.id,
       image: dog.image.url,
       name: dog.name,
       temperaments: !!dog.temperament?[dog.temperament].join().split(", "):["unknown temperament"],
       weight: dog.weight.metric,
       height: dog.height.metric,
       life_span: dog.life_span

     };
   });

   
   let allDogs = [...filteredDbDogs, ...filteredApiDogs];
   return allDogs
}

//-------------------------------------------------------------------

module.exports = {
  indexAndName: async (req, res) => {
    try {
      let name = req.query.name; 
  
    
      if (name) {
         let allApiDogs = await axios.get(
           "https://api.thedogapi.com/v1/breeds/search?q=" + name
         );
        
         let allDbDogs = await Dog.findAll({
           include: {
             model: Temperament,
             attributes: ["name"],
             through: {
               attributes: [],
             },
           },
           where: {
             name: {
               [Op.iLike]: "%" + name + "%",
             },
           },
           order: [["name", "ASC"]],
         });
   
         //modifico el perro filtrado de db
         let filteredDbDogs = [];
         for (let i = 0; i < allDbDogs.length; i++) {
           filteredDbDogs.push({
             id: allDbDogs[i].dataValues.id,
             name: allDbDogs[i].dataValues.name,
             height: allDbDogs[i].dataValues.height,
             weight: allDbDogs[i].dataValues.weight,
             life_span: allDbDogs[i].dataValues.life_span,
             image: allDbDogs[i].dataValues.image,
             temperaments: allDbDogs[i].dataValues.temperaments.map((t) => t.name),
           });
         }
   
         //filtro la info desde la api que me interesa del perro 
         let filteredApiDogs = allApiDogs.data.map((dog) => {
           return {
             id: dog.id,
             image:
               "https://cdn2.thedogapi.com/images/" +
               dog.reference_image_id +
               ".jpg",
             name: dog.name,
             temperaments: !!dog.temperament?[dog.temperament].join().split(", "):["unknown temperament"],
             weight: dog.weight.metric,
             height:dog.height.metric,
           };
         });
   
         //concateno datos de api y bd y envío los datos
         let allDogs = [...filteredDbDogs, ...filteredApiDogs];
        
        res.send(allDogs);
      } else {
        let allDogs = await fullInfo()
        res.send(allDogs);
      }
    } catch (error) {
      next(error);
    }
  },

  indexId: async(req, res) => {
    try {
      let allDogs = await fullInfo()
      const {id} = req.params;
      let dogId = await allDogs.find(dog => dog.id == id)
      if(dogId){
        res.send(dogId)
      }else{
        res.status(404).send("Perrito no encontrado :(")
      }
    } catch (error) {
     res.status(404).send(error, "acurrido un error en la busqueda de params");
    }
  },

  indexCreate: async (req, res) => {
    try {
      const { name, height, weight, life_span, image, temperament } = req.body;
      //creo un nuevo perro en la db con los datos recibidos
      const newDog = await Dog.create({
        name,
        height,
        weight,
        weight,
        life_span,
        image,
      });

      //Busco y guardo los temperamentos de la db que coinciden con el temperamento pasado por body
      let tempDb = await Temperament.findAll({
        where: { name: temperament },
      });
      //asigno la variable anterior con los temperamentos a el nuevo perro
      await newDog.addTemperament(tempDb);

      res.send(newDog);
    } catch (error) {
      console.log(error);
    }
  },
};
