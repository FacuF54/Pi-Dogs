const axios = require("axios");
const { APY_KEY } = process.env;
const { Temperament } = require("../../db");
const url = `https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY}`;

module.exports = {
  index: async (req, res) => {
    try {
      //guardo todos los perros en esta variable
      let allDogs = await axios.get(url);
      //mapeo y guardo los temperamentos de cada uno en esta variable, los separo por comas y los junto en un array de strings separados
      let Temps = allDogs.data
        .map((dog) => dog.temperament)
        .join()
        .split(", ");
      //vuelvo a filtrar, ya que vienen strings repetidos con doble coma
      let Temps2 = Temps.join()
        .split(",")
        .filter((t) => t);
      //teniendo ya el array separado de cada temperamento, busco existentes o creo nuevos temperamentos en la db
      Temps2.forEach((item) => {
        Temperament.findOrCreate({ 
          where: { name: item },
        });
      });
      //los ordeno alfabeticamente y los envío
      const allTemps = await Temperament.findAll({ order: [["name", "ASC"]] });
      let finish = allTemps.map(e=> e.name)
      
      res.send(finish)
    } catch (error) {
      next(error);
    }
  },
};
