"use strict";

const {
  Pic,
  Counter
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

      let phoneChecked = phone_number

      if (phone_number.slice(0, 3) === "+62") phoneChecked = "08" + phone_number.slice(4)
      else if (phone_number.slice(0, 2) === "62") phoneChecked = "08" + phone_number.slice(3)
      if (phone_number.length > 15) return res.status(400).json({ message: "Phone number must be less than 15 characters!" })

      const newPic = new Pic();
      newPic.pic_id = `PIC-${subYear}-${monthText}-${countText}`;
      newPic.full_name = full_name;
      newPic.username = username;
      newPic.email = email;
      newPic.institution = institution;
      newPic.satker_dirjen = satker_dirjen;
      newPic.phone_number = phoneChecked;
      if (password !== confirm_password) return res.status(400).json({message: "Incorrect password!"});
      newPic.hashPassword(password);
      newPic.stakeholder_access = stakeholder_access;
      newPic.topic_access = topic_access;
      newPic.pic_access = pic_access;
      newPic.archive_access = archive_access;
      newPic.trash_access = trash_access;
      await newPic.save();
      return res.status(201).json({
        message: "PIC successfully added",
        newPic
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

      const picList = promiseAll[0];
      const count = promiseAll[1];
      const pages = Math.ceil(count / dataLimit);

      return res.status(200).json({
        message: "Here's the list of pics",
        picList,
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

      const pic = await Pic.findOne({_id: id}).lean();
      if (!pic) return res.status(404).json({message: "Pic not found"});

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

      if (_id === req.payload._id) return res.status(400).json({message: "Can't remove a logged in user"});

      const pic = await Pic.findOneAndUpdate(
        {_id}, 
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
      if (!pic) return res.status(404).json({message: "Pic not found"});

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