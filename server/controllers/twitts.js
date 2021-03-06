const express = require('express');
const Twitt = require('../models/twitt');

module.exports = {
  getTwitts: (req,res) => {
    Twitt.find().sort('date')
    .then((data) => {
      res.json(data)
    })
  },
  searchTwitts: (req,res) => {
    console.log(req.query.q);
    Twitt.find({content: {$regex: req.query.q, $options: 'i'}}).sort('date')
    .then((data) => {
      res.json(data)
    })
  },
  getTwitt: (req,res) => {
    Twitt.find({_id:req.params.id})
    .then((data) => {
      res.json(data)
    })
  },
  postTwitt: (req,res) => {
    let newTwitt = new Twitt({
      content: req.body.content,
      postedBy: req.body.postedBy,
      tags: req.body.content.match(/\S*#(?:\[[^\]]+\]|\S+)/g)
    })
    newTwitt.save()
    .then((data) => {
      res.json(data)
    })
  },
  deleteTwitt: (req,res) => {
    Twitt.findOneAndRemove({_id: req.params.id})
    .then((data) => {
      res.send(`Twitt ${req.params.id} has been deleted`)
    })
  }
}
