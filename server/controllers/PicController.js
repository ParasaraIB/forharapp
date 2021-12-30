"use strict";

const {
  Pic,
  Counter,
  Topic
} = require("../models");

class PicController {
  static async picLogin (req, res, next) {
    try {
      const {email, password} = req.body;
      const pic = await Pic.findOne({deleted: {$ne: true}, email});
      if (!pic || !pic.validPassword(password)) return res.status(400).json({message: "Invalid email or password"});
      const access_token = pic.generateJwt();
      return res.status(200).json({
        message: "Here's the access token",
        access_token
      });
    } catch (err) {
      console.error(err, "<<<< error in picLogin PicController");
      next(err);
    }
  }

  static async addPic (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"pic_access.view": true, "pic_access.add": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {
        full_name,
        username,
        email,
        institution,
        satker_dirjen,
        phone_number,
        password,
        confirm_password,
        stakeholder_access,
        topic_access,
        pic_access,
        archive_access,
        trash_access
      } = req.body;

      if (checkPic.email === email) return res.status(400).json({message: "Email has already registered"});

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const subYear = year.toString().substr(-2);
      const month = currentDate.getMonth() + 1;
      const yearMonth = `${year}-${month}`;
      let monthText = `00${month.toString()}`;
      monthText = monthText.substr(-2);

      const picCount = await Counter.findOneAndUpdate({yearMonth, type: "Pic"}, {$inc: {count: 1}}, {new: true, upsert: true});
      const countText = `0000000${picCount.count.toString()}`.substr(-7);

      if (
        !full_name || 
        !username ||
        !email ||
        !institution ||
        !satker_dirjen ||
        !phone_number ||
        !password ||
        !confirm_password
      ) return res.status(400).json({message: "Incomplete input"});

      const newPic = new Pic();
      newPic.pic_id = `PIC-${subYear}-${monthText}-${countText}`;
      newPic.full_name = full_name;
      newPic.username = username;
      newPic.email = email;
      newPic.institution = institution;
      newPic.satker_dirjen = satker_dirjen;
      newPic.phone_number = phone_number;
      if (password !== confirm_password) return res.status(400).json({message: "Incorrect password!"});
      newPic.hashPassword(password);
      newPic.password_reset_hash = "";
      newPic.password_reset_salt = "";
      newPic.stakeholder_access = stakeholder_access;
      newPic.topic_access = topic_access;
      newPic.pic_access = pic_access;
      newPic.archive_access = archive_access;
      newPic.trash_access = trash_access;
      await newPic.save();

      const returnedData = newPic.toObject();
      delete returnedData.hash;
      delete returnedData.salt;
      delete returnedData.password_reset_hash;
      delete returnedData.password_reset_salt;

      return res.status(201).json({
        message: "Pic successfully added",
        newPic: returnedData
      });
    } catch (err) {
      console.error(err, "<<<< error in addPic PicController");
      return next(err);
    }
  }

  static async picList (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email, 
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"pic_access.view": true}
        ]
      }).lean();
      
      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {page = 0, search = "", satker_dirjen} = req.query;
      const dataLimit = 10;
      const filter = {removed: {$ne: true}};

      if (satker_dirjen) filter.satker_dirjen = satker_dirjen;
      if (search) {
        const reg = new RegExp(search, "i");
        filter.$or = [
          {full_name: reg},
          {email: reg},
          {phone_number: reg}
        ];
      }

      const promiseAll = await Promise.all([
        Pic.find(filter, {hash: 0, salt: 0}).sort("-_id").skip(dataLimit * page).limit(dataLimit).lean(),
        Pic.countDocuments(filter)
      ]);

      const pics = promiseAll[0];
      const count = promiseAll[1];
      const pages = Math.ceil(count / dataLimit);

      return res.status(200).json({
        message: "Here's the list of Pics",
        pics,
        pages
      });
    } catch (err) {
      console.error(err, "<<<< error in picList PicController");
      return next(err);
    }
  }

  static async picDetail (req, res, next) {
    try {
      const checkPic = await Pic.findOne({
        email: req.payload.email,
        removed: {$ne: true},
        $or: [
          {super_user: true},
          {"pic_access.view": true}
        ]
      }).lean();

      if (!checkPic) return res.status(403).json({message: "Forbidden"});

      const {id} = req.query;

      const pic = await Pic.findOne({_id: id, removed: {$ne: true}}).lean();
      if (!pic) return res.status(404).json({message: "Pic not found"});

      const topicFilter = {
        $or: [
          {"pic_bi.id": pic._id},
          {"pic_kemenkeu.id": pic._id}
        ],
        removed: {$ne: true},
        status: {$ne: "Done"}
      };
      const topics = await Topic.find(topicFilter).distinct("title").lean();
      pic.topics = topics;

      return res.status(200).json({
        message: "Here's the pic detail",
        pic
      });
    } catch (err) {
      console.error(err, "<<<< error in picDetail PicController");
      return next(err);
    }
  }

  static async editPic (req, res, next) {
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
        full_name,
        username,
        email,
        institution,
        satker_dirjen,
        phone_number,
        stakeholder_access,
        topic_access,
        pic_access,
        archive_access,
        trash_access
      } = req.body;

      if (_id === checkPic._id.toString()) return res.status(403).json({message: "Cannot edit a logged in pic"});

      if (
        !full_name || 
        !username ||
        !email ||
        !institution ||
        !satker_dirjen ||
        !phone_number
      ) return res.status(400).json({message: "Incomplete input"});

      const pic = await Pic.findOne({_id, removed: {$ne: true}});
      if (!pic) return res.status(404).json({message: "Pic not found"});

      const currentDate = new Date();

      pic.full_name = full_name;
      pic.username = username;
      pic.email = email;
      pic.institution = institution;
      pic.satker_dirjen = satker_dirjen;
      pic.phone_number = phone_number;
      pic.stakeholder_access = stakeholder_access;
      pic.topic_access = topic_access;
      pic.pic_access = pic_access;
      pic.archive_access = archive_access;
      pic.trash_access = trash_access;
      if (!pic.edited_by || pic.edited_by.length === 0) pic.edited_by = [];
      pic.edited_by.push(
        {
          pic_id: checkPic.pic_id,
          email: checkPic.email,
          edited_at: currentDate
        }
      );
      pic.markModified("edited_by");

      const filter = institution === "BI" ? {"pic_bi.id": pic._id} : {"pic_kemenkeu.id": pic._id};
      const update = {
        id: pic._id,
        full_name: pic.full_name,
        phone_number: pic.phone_number
      };

      const promiseAll = await Promise.all([
        pic.save(),
        Topic.updateMany(filter, update)
      ]);

      const returnedData = promiseAll[0].toObject();
      delete returnedData.hash;
      delete returnedData.salt;
      delete returnedData.password_reset_hash;
      delete returnedData.password_reset_salt;

      return res.status(200).json({
        message: "Pic successfully edited",
        pic: returnedData
      });
    } catch (err) {
      console.error(err, "<<<< error in editPic PicController");
      return next(err);
    }
  }

  static async removePic (req, res, next) {
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

      if (_id === req.payload._id) return res.status(403).json({message: "Cannot remove a logged in pic"});

      const pic = await Pic.findOneAndUpdate(
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
      if (!pic) return res.status(404).json({message: "Pic not found or already removed"});

      return res.status(200).json({
        message: "Pic removed successfully"
      });
    } catch (err) {
      console.error(err, "<<<< error in removePic PicController");
      return next(err);
    }
  }
}

module.exports = PicController;