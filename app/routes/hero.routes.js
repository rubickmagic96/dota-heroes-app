module.exports = (app) => {
  const heroes = require('../controllers/hero.controllers.js');

  app.post('/heroes', heroes.add);
  app.get('/heroes', heroes.getAll);
  app.get('/heroes/:heroId', heroes.getOne);
  app.put('/heroes/:heroId', heroes.edit);
  app.delete('/heroes/:heroId', heroes.remove);
}
