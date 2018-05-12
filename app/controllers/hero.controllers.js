const Hero = require('../models/hero.models.js');

exports.add = (req, res) => {
  if (!req.body.name || !req.body.nickname || !req.body.type ||
      !req.body.base_health || !req.body.base_mana || !req.body.base_armor) {
      return res.status(400).send({
        message: 'Hero content cannot be empty'
      });
  }

  const hero = new Hero({
    name: req.body.name,
    nickname: req.body.nickname,
    type: req.body.type,
    base_health: req.body.base_health,
    base_mana: req.body.base_mana,
    base_armor: req.body.base_armor
  });

  hero.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occured while adding a hero'
    });
  });
}

exports.getAll = (req, res) => {
  Hero.find().then(heroes => {
    res.send(heroes);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occured while getting all the heroes'
    })
  });
}

exports.getOne = (req, res) => {
  Hero.findById(req.params.heroId).then(hero => {
    if (!hero) {
      return res.status(404).send({
        message: 'Hero not found with id '+req.params.heroId
      });
    }
    res.send(hero);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Hero not found with id '+req.params.heroId
      });
    }
    return res.status(500).send({
      message: 'Error getting a hero with id '+req.params.heroId
    });
  });
}

exports.edit = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Hero content can not be empty'
    });
  }

  Hero.findByIdAndUpdate(req.params.heroId, {
    name: req.body.name,
    nickname: req.body.nickname,
    type: req.body.type,
    base_health: req.body.base_health,
    base_mana: req.body.base_mana,
    base_armor: req.body.base_armor
  }, {new: true}).then(hero => {
    if (!hero) {
      return res.status(404).send({
        message: 'Hero not found with id '+req.params.heroId
      });
    }
    res.send(hero);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Hero not found with id '+req.params.heroId
      });
    }
    return res.status(500).send({
      message: 'An error occur when updating a hero with id '+req.params.heroId
    });
  });
}

exports.remove = (req, res) => {
  Hero.findByIdAndRemove(req.params.heroId).then(hero => {
    if (!hero) {
      return res.status(404).send({
        message: 'Hero not found with id '+req.params.heroId
      });
    }
    res.send({message: 'Hero has been deleted'});
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Hero not found with id "+req.params.heroId
      });
    }
    return res.status(500).send({
      message: 'Some error occur when remove hero with id '+req.params.heroId
    });
  });
}
