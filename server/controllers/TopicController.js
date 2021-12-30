"use strict";

const {
  Topic,
  Pic,
  Counter
} = require("../models");

class TopicController {
  static async addTopic (req, res, next) {
    try {
      console.log("masuk")
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
      const countText = `0000000${topicCount.count.toString()}`.substr(-7);

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
      newTopic.progresses = [progresses];
      newTopic.initiator = initiator;
      newTopic.related_satker = related_satker;
      newTopic.related_dirjen = related_dirjen;
      newTopic.pic_bi = pic_bi;
      newTopic.pic_kemenkeu = pic_kemenkeu;
      newTopic.importance = importance;
      newTopic.agreement = agreement;
      newTopic.docs_link = docs_link;
      newTopic.outputs = outputs;
      await newTopic.save();

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
          {"topic_access.view": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {page = 0, search = "", status, importance, satker_dirjen, from_date, to_date} = req.query;
      const dataLimit = 10;
      const filter = {removed: {$ne: true}};

      if (search) {
        const reg = new RegExp(search, "i");
        filter.$or = [
          {title: reg},
          {topic_id: reg}
        ];
      }
      if (status) filter.status = status;
      if (importance) filter.importance = importance;
      if (satker_dirjen) filter.satker_dirjen = satker_dirjen;
      if (from_date && to_date) {
        filter.created_at = {
          $gte: new Date(from_date),
          $lt: new Date(to_date)
        }
      }

      const promiseAll = await Promise.all([
        Topic.find(filter).sort("-_id").skip(dataLimit * page).limit(dataLimit).lean(),
        Topic.countDocuments(filter)
      ]);

      const topics = promiseAll[0];
      const count = promiseAll[1];
      const pages = Math.ceil(count / dataLimit);

      return res.status(200).json({
        message: "Here's the list of topics",
        topics,
        pages
      });
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
          {"topic_access.view": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {id} = req.query;

      const topic = await Topic.findOne({_id: id, removed: {$ne: true}}).lean();
      if (!topic) return res.status(404).json({message: "Topic not found"});

      return res.status(200).json({
        message: "Here's the topic detail",
        topic
      });
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
          {"topic_access.view": true, "topic_access.edit": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {
        _id,
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

      const topic = await Topic.findOne({_id, removed: {$ne: true}});
      if (!topic) return res.status(404).json({message: "Topic not found"});

      const currentDate = new Date();

      topic.title = title;
      topic.status = status;
      topic.category = category;
      topic.start_date = start_date;
      topic.end_data = end_date;
      topic.reminders = reminders;
      if (progresses && topic.progresses.length && progresses.percentage <= topic.progresses[topic.progresses.length - 1].percentage) return res.status(400).json({message: "New progress must be higher than the previous"});
      topic.progresses.push(progresses);
      topic.markModified("progresses");
      topic.initiator = initiator;
      topic.related_satker = related_satker;
      topic.related_dirjen = related_dirjen;
      topic.pic_bi = pic_bi;
      topic.pic_kemenkeu = pic_kemenkeu;
      topic.importance = importance;
      topic.agreement = agreement;
      topic.docs_link = docs_link;
      topic.outputs = outputs;
      topic.edited_by.push(
        {
          pic_id: checkPic.pic_id,
          email: checkPic.email,
          edited_at: currentDate
        }
      );
      topic.markModified("edited_by");
      await topic.save();

      return res.status(200).json({
        message: "Topic edited successfully",
        topic
      });
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

      const {_id} = req.body;
      const currentDate = new Date();

      const topic = await Topic.findOneAndUpdate(
        {_id, removed: {$ne: true}},
        {
          $set: {removed: true},
          $push: {
            removed_by: {
              pic_id: checkPic.pic_id,
              email: checkPic.email,
              removed_at: currentDate
            }
          }
        }
      ).lean();
      if (!topic) return res.status(404).json({message: "Topic not found or already removed"});

      return res.status(200).json({
        message: "Topic removed successfully"
      });
    } catch (err) {
      console.error(err, "<<<< error in removeTopic TopicController");
      return next(err);
    }
  }
}

module.exports = TopicController;