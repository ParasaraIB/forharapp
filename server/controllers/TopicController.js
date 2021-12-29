"use strict";

const {
  Topic,
  Pic,
  Counter
} = require("../models");

class TopicController {
  static async addTopic (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});
      
      const {
        title,
        status,
        category,
        start_date,
        end_date,
        reminders,
        progresses,
        initiator,
        related_satker,
        related_dirjen,
        pic_bi,
        pic_kemenkeu,
        importance,
        agreement,
        docs_link,
        outputs
      } = req.body;

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const subYear = year.toString().substr(-2);
      const month = currentDate.getMonth() + 1;
      const yearMonth = `${year}-${month}`;
      let monthText = `00${month.toString()}`;
      monthText = monthText.substr(-2);

      const topicCount = await Counter.findOneAndUpdate({yearMonth, type: "Topic"}, {$inc: {count: 1}}, {new: true, upsert: true});
      const countText = `0000000${picCount.count.toString()}`.substr(-7);

      if (
        !title ||
        !status ||
        !category ||
        !start_date ||
        !end_date ||
        !reminders ||
        !initiator ||
        !related_satker ||
        !related_dirjen ||
        !pic_bi ||
        !pic_kemenkeu ||
        !importance
      ) return res.status(400).json({message: "Incomplete input"});

      const newTopic = new Topic();
      newTopic.topic_id = `FRH-${subYear}-${monthText}-${countText}`;
      newTopic.title = title;
      newTopic.status = status;
      newTopic.category = category;
      newTopic.start_date = start_date;
      newTopic.end_date = end_date;
      newTopic.reminders = reminders;
      newTopic.progresses = progresses;
      newTopic.initiator = initiator;
      newTopic.related_satker = related_satker;
      newTopic.related_dirjen = related_dirjen;
      newTopic.pic_bi = pic_bi;
      newTopic.pic_kemenkeu = pic_kemenkeu;
      newTopic.importance = importance;
      newTopic.agreement = agreement;
      newTopic.docs_link = docs_link;
      newTopic.outputs = outputs;

      return res.status(201).json({
        message: "Topic successfully added",
        newTopic
      })
    } catch (err) {
      console.error(err, "<<<< error in addTopic TopicController");
      return next(err);
    }
  }

  static async topicList (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

    } catch (err) {
      console.error(err, "<<<< error in topicList TopicController");
      return next(err);
    }
  }

  static async topicDetail (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

    } catch (err) {
      console.error(err, "<<<< error in topicDetail TopicController");
      return next(err);
    }
  }

  static async editTopic (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

    } catch (err) {
      console.error(err, "<<<< error in editTopic TopicController");
      return next(err);
    }
  }

  static async removeTopic (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

    } catch (err) {
      console.error(err, "<<<< error in removeTopic TopicController");
      return next(err);
    }
  }
  
  static async addTopic (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"topic_access.view": true, "topic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

    } catch (err) {
      console.error(err, "<<<< error in addTopic TopicController");
      return next(err);
    }
  }
}

module.exports = TopicController;