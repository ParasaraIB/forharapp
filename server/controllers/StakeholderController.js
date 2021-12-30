"use strict";

const {
  Stakeholder,
  Pic,
  Topic
} = require("../models");

class StakeholderController {
  static async addStakeholder (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true, "stakeholder_access.add": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {
        name,
        acronym,
        institution
      } = req.body;

      if (
        !name ||
        !acronym ||
        !institution
      ) return res.status(400).json({message: "Incomplete input"});

      const newStakeholder = new Stakeholder();
      newStakeholder.name = name;
      newStakeholder.acronym = acronym;
      newStakeholder.institution = institution;
      await newStakeholder.save();

      return res.status(201).json({
        message: "Stakeholder successfully added",
        newStakeholder
      });
    } catch (err) {
      console.error(err, "<<<< error in addStakeholder StakeholderController");
      return next(err);
    }
  }

  static async stakeholderList (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {page = 0, search = ""} = req.query;
      const dataLimit = 10;
      const filter = {removed: {$ne: true}};

      if (search) {
        const reg = new RegExp(search, "i");
        filter.$or = [
          {name: reg},
          {acronym: reg}
        ];
      }

      const promiseAll = await Promise.all([
        Stakeholder.find(filter).sort("-_id").skip(dataLimit * page).limit(dataLimit).lean(),
        Stakeholder.countDocuments(filter)
      ]);

      const stakeholders = promiseAll[0];
      const count = promiseAll[1];
      const pages = Math.ceil(count / dataLimit);

      return res.status(200).json({
        message: "Here's the list of stakeholders",
        stakeholders,
        pages
      });
    } catch (err) {
      console.error(err, "<<<< error in stakeholderList StakeholderController");
      return next(err);
    }
  }

  static async stakeholderDetail (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id,
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {id} = req.query;

      const stakeholder = await Stakeholder.findOne({_id: id, removed: {$ne: true}}).lean();
      if (!stakeholder) return res.status(404).json({message: "Stakeholder not found"});

      const topicFilter = {
        $or: [
          {"initiator.id": stakeholder._id},
          {"related_satker.id": stakeholder._id},
          {"related_dirjen.id": stakeholder._id}
        ],
        removed: {$ne: true},
        status: {$ne: "Done"}
      };
      const topics = await Topic.find(topicFilter).distinct("title").lean();
      stakeholder.topics = topics

      return res.status(200).json({
        message: "Here's the stakeholder detail",
        stakeholder
      });
    } catch (err) {
      console.error(err, "<<<< error in stakeholderDetail StakeholderController");
      return next(err)
    }
  }

  static async editStakeholder (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id,
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true, "stakeholder_access.edit": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {
        _id,
        name,
        acronym,
        institution
      } = req.body;

      if (
        !name ||
        !acronym ||
        !institution
      ) return res.status(400).json({message: "Incomplete input"});

      const stakeholder = await Stakeholder.findOne({_id, removed: {$ne: true}});
      if (!stakeholder) return res.status(404).json({message: "Stakeholder not found"});

      const currentDate = new Date();

      stakeholder.name = name;
      stakeholder.acronym = acronym;
      stakeholder.institution = institution;
      stakeholder.edited_by.push(
        {
          pic_id: checkPic.pic_id,
          email: checkPic.email,
          edited_at: currentDate
        }
      );
      stakeholder.markModified("edited_by");

      const filter = {
        $or: [
          {"initiator.id": stakeholder._id}
        ]
      };
      
      if (institution === "BI") filter.$or.push({"related_satker.id": stakeholder._id});
      else filter.$or.push({"related_dirjen.id": stakeholder._id});

      const updates = {
        id: stakeholder._id,
        acronym: stakeholder.acronym
      };
      
      const promiseAll = await Promise.all([
        stakeholder.save(),
        Pic.updateMany({"satker_dirjen.id": stakeholder._id}, {name, acronym, institution}),
        Topic.updateMany(filter, updates)
      ]);

      return res.status(200).json({
        message: "Stakeholder updated successfully",
        stakeholder: promiseAll[0]
      });
    } catch (err) {
      console.error(err, "<<<< error in editStakeholder StakeholderController");
      return next(err);
    }
  }

  static async removeStakeholder (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id,
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true, "stakeholder_access.remove": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {_id} = req.body;
      const currentDate = new Date();

      const stakeholder = await Stakeholder.findOneAndUpdate(
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
      if (!stakeholder) return res.status(404).json({message: "Stakeholder not found or already removed"});

      return res.status(200).json({
        message: "Stakeholder removed successfully"
      });
    } catch (err) {
      console.error(err, "<<<< error in removeStakeholder StakeholderController");
      return next(err);
    }
  }

  static async getStakeholders (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        pic_id: req.payload.pic_id,
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"stakeholder_access.view": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const stakeholders = await Stakeholder.find().distinct("acronym").lean();
      
      return res.status(200).json({
        message: "Here' the list of stakeholders",
        stakeholders
      })
    } catch (err) {
      console.error(err, "<<<< error in getStakeholders StakeholderController");
      return next(err);
    }
  }
}

module.exports = StakeholderController;