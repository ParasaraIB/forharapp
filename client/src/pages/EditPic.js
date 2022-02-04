import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"

import Navbar from "../components/Navbar";
import { useFetchStakeholders } from "../hooks/useFetch";
import { editPic, fetchPic, removePic } from "../store/actions/picAction";
import Swal from "sweetalert2";

const EditPic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const {stakeholders, institution, setInstitution} = useFetchStakeholders();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [stakeholder, setStakeholder] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSatkerDirjen, setSelectedSatkerDirjen] = useState("");
  const [stakeholderAccess, setStakeholderAccess] = useState({
    view: false,
    add: false,
    edit: false,
    remove: false
  });
  const [topicAccess, setTopicAccess] = useState({
    view: false,
    add: false,
    edit: false,
    remove: false,
    bulk_add: false,
    generate_report: false,
    export_to_csv: false
  });
  const [picAccess, setPicAccess] = useState({
    view: false,
    add: false,
    edit: false,
    remove: false,
    print_pic: false
  });
  const [archiveAccess, setArchiveAccess] = useState({
    view: false,
    move_to: false,
    bulk_add: false
  });
  const [trashAccess, setTrashAccess] = useState({
    view: false,
    restore: false,
    empty: false
  });
  const pic = useSelector((state) => state.picReducer.pic);

  useEffect(() => {
    dispatch(fetchPic(id))
  }, [dispatch, id]);

  useEffect(() => {
    if (pic) {
      setEmail(pic.email);
      setFullName(pic.full_name);
      setPhoneNumber(pic.phone_number.substr(3))
      setInstitution(pic.institution);
      setStakeholder(pic.satker_dirjen)
      setSelectedSatkerDirjen(pic.satker_dirjen.acronym);
      if (pic.stakeholder_access) setStakeholderAccess(pic.stakeholder_access);
      if (pic.topic_access) setTopicAccess(pic.topic_access);
      if (pic.pic_access) setPicAccess(pic.pic_access);
      if (pic.archive_access) setArchiveAccess(pic.archive_access);
      if (pic.trash_access) setTrashAccess(pic.trash_access);
    }
  }, [pic, setInstitution]);

  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !stakeholder || !phoneNumber) {
      Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please fill all the field",
      });
    } else {
      Swal.fire({
        title: "Save changes?",
        text: "All changes will be saved",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Saved",
            "All changes successfully saved",
            "success"
          )
          const editedPic = {
            _id: id,
            full_name: fullName,
            username: email.split("@")[0],
            email,
            institution,
            satker_dirjen: stakeholder,
            phone_number: `+62${phoneNumber}`,
            stakeholder_access: stakeholderAccess,
            topic_access: topicAccess,
            pic_access: picAccess,
            archive_access: archiveAccess,
            trash_access: trashAccess
          };
          dispatch(editPic(editedPic, navigate));
        }
      });
    }
  }
  
  const handleBack = (e) => {
    navigate(-1);
  }

  const handleRemove = (e) => {
    Swal.fire({
      title: "Save changes?",
      text: "All changes will be saved",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Saved",
          "All changes successfully saved",
          "success"
        )
        dispatch(removePic(id, navigate));
      }
    });
  }

  const inputFullName = (e) => {
    setFullName(e.target.value);
  }
  const inputEmail = (e) => {
    setEmail(e.target.value);
  }
  const inputInstitution = (e) => {
    setInstitution(e.target.value);
  }
  const inputStakeholder = (e) => {
    const selectedStakeholder = stakeholders.find(stakeholder => stakeholder.acronym === e.target.value);
    setStakeholder(selectedStakeholder);
    setSelectedSatkerDirjen(e.target.value);
  }
  const inputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }
  const inputStakeholderAccess = (e, type) => {
    switch (type) {
      case "view":
        setStakeholderAccess({
          ...stakeholderAccess,
          view: !stakeholderAccess.view
        });
        break;
      case "add":
        setStakeholderAccess({
          ...stakeholderAccess,
          add: !stakeholderAccess.add
        });
        break;
      case "edit":
        setStakeholderAccess({
          ...stakeholderAccess,
          edit: !stakeholderAccess.edit
        });
        break;
      case "remove":
        setStakeholderAccess({
          ...stakeholderAccess,
          remove: !stakeholderAccess.remove
        });
        break;
      default:
        return stakeholderAccess;
    }
  }
  const inputTopicAccess = (e, type) => {
    switch (type) {
      case "view":
        setTopicAccess({
          ...topicAccess,
          view: !topicAccess.view
        });
        break;
      case "add":
        setTopicAccess({
          ...topicAccess,
          add: !topicAccess.add
        });
        break;
      case "edit":
        setTopicAccess({
          ...topicAccess,
          edit: !topicAccess.edit
        });
        break;
      case "remove":
        setTopicAccess({
          ...topicAccess,
          remove: !topicAccess.remove
        });
        break;
      case "bulk_add":
        setTopicAccess({
          ...topicAccess,
          bulk_add: !topicAccess.bulk_add
        });
        break;
      case "generate_report":
        setTopicAccess({
          ...topicAccess,
          generate_report: !topicAccess.generate_report
        });
        break;
      case "export_to_csv":
        setTopicAccess({
          ...topicAccess,
          export_to_csv: !topicAccess.export_to_csv
        });
        break;
      default:
        return topicAccess;
    }
  }
  const inputPicAccess = (e, type) => {
    switch (type) {
      case "view":
        setPicAccess({
          ...picAccess,
          view: !picAccess.view
        });
        break;
      case "add":
        setPicAccess({
          ...picAccess,
          add: !picAccess.add
        });
        break;
      case "edit":
        setPicAccess({
          ...picAccess,
          edit: !picAccess.edit
        });
        break;
      case "remove":
        setPicAccess({
          ...picAccess,
          remove: !picAccess.remove
        });
        break;
      case "print_pic":
        setPicAccess({
          ...picAccess,
          print_pic: !picAccess.print_pic
        });
        break;
      default:
        return picAccess;
    }
  }
  const inputArchiveAccess = (e, type) => {
    switch (type) {
      case "view":
        setArchiveAccess({
          ...archiveAccess,
          view: !archiveAccess.view
        });
        break;
      case "move_to":
        setArchiveAccess({
          ...archiveAccess,
          move_to: !archiveAccess.move_to
        });
        break;
      case "bulk_add":
        setArchiveAccess({
          ...archiveAccess,
          bulk_add: !archiveAccess.bulk_add
        });
        break;
      default:
        return archiveAccess;
    }
  }
  const inputTrashAccess = (e, type) => {
    switch (type) {
      case "view":
        setTrashAccess({
          ...trashAccess,
          view: !trashAccess.view
        });
        break;
      case "restore":
        setTrashAccess({
          ...trashAccess,
          restore: !trashAccess.restore
        });
        break;
      case "emptys":
        setTrashAccess({
          ...trashAccess,
          empty: !trashAccess.empty
        });
        break;
      default:
        return trashAccess;
    }
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <div className="row">
              <div className="col-1 my-auto" style={{width: "3rem"}}>
                <h3 onClick={handleBack} style={{cursor: "pointer"}}>
                  <i className="bi bi-arrow-left"></i>
                </h3>
              </div>
              <div className="col my-auto">
                <h5>EDIT PIC</h5>
              </div>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row">
              <div className="col d-flex justify-content-end" style={{paddingRight: "4rem"}}>
                <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {
              pic === null ? 
                (<div className="container mt-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>)
              :
              (<div className="container mt-5">
                <div className="row">
                  <div className="col-1" style={{width: "10rem"}}>
                    <label style={{paddingTop: "0.4rem"}}>FULL NAME</label>
                  </div>
                  <div className="col-1" style={{width: "20rem"}}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Full name" aria-label="Full name" aria-describedby="basic-addon1" onChange={inputFullName} value={fullName} required />
                    </div>
                  </div>
                  <div className="col-1" style={{width: "10rem", marginLeft: "4.3rem"}}>
                    <label style={{paddingTop: "0.4rem"}}>PHONE NUMBER</label>
                  </div>
                  <div className="col-1" style={{width: "20rem"}}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon3">+62</span>
                      <input type="tel" className="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="Phone number" onChange={inputPhoneNumber} value={phoneNumber} required />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-1" style={{width: "10rem"}}>
                    <label style={{paddingTop: "0.4rem"}}>EMAIL</label>
                  </div>
                  <div className="col-1" style={{width: "20rem"}}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" onChange={inputEmail} value={email} required />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-1" style={{width: "10.8rem"}}>
                    <label>INSTITUTION</label>
                  </div>
                  <div className="col-1 form-check form-check-inline" style={{width: "10.3rem"}}>
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="BANK INDONESIA" onChange={inputInstitution} checked={institution === "BANK INDONESIA"} required />
                    <label className="form-check-label" htmlFor="inlineRadio1">BANK INDONESIA</label>
                  </div>
                  <div className="col-1 form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="KEMENTERIAN KEUANGAN" onChange={inputInstitution} checked={institution === "KEMENTERIAN KEUANGAN"} required />
                    <label className="form-check-label" htmlFor="inlineRadio2">KEMENKEU</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-1 my-auto" style={{width: "10rem"}}>
                    <label>SATKER/DIRJEN</label>
                  </div>
                  <div className="col-1" style={{width: "20rem"}}>
                    <select className="form-select" aria-label="Default select example" onChange={inputStakeholder} value={selectedSatkerDirjen} required>
                      <option value="" disabled>Select</option>
                      {
                        stakeholders.map((stakeholder) => {
                          return (
                            <option value={stakeholder.acronym} key={stakeholder._id}>{stakeholder.acronym}</option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                {
                  pic.super_user ? 
                  <div className="row mt-5">
                    <label><i><strong>SUPER USER</strong></i></label>
                  </div> :
                  <div>
                    <div className="row mt-5">
                      <label>ASSIGN ACCESS</label>
                    </div>
                    <div className="row mt-3">
                      <div className="col-1 my-auto" style={{width: "10rem", paddingLeft: "3.2rem"}}>
                        <label style={{fontSize: "0.9rem"}}>STAKEHOLDER</label>
                      </div>
                      <div className="col-1 col-xl-12 form-check my-auto" style={{paddingLeft: "2.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={stakeholderAccess.view} onChange={(e) => inputStakeholderAccess(e, "view")} checked={stakeholderAccess.view} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>VIEW</label>
                      </div>
                      <div className="col-1 col-xl-12 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={stakeholderAccess.add} onChange={(e) => inputStakeholderAccess(e, "add")} checked={stakeholderAccess.add} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>ADD</label>
                      </div>
                      <div className="col-1 col-xl-12 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={stakeholderAccess.edit} onChange={(e) => inputStakeholderAccess(e, "edit")} checked={stakeholderAccess.edit} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>EDIT</label>
                      </div>
                      <div className="col-1 col-xl-12 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={stakeholderAccess.remove} onChange={(e) => inputStakeholderAccess(e, "remove")} checked={stakeholderAccess.remove} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>REMOVE</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-1 my-auto" style={{width: "10rem", paddingLeft: "3.2rem"}}>
                        <label style={{fontSize: "0.9rem"}}>TOPIC</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "2.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.view} onChange={(e) => inputTopicAccess(e, "view")} checked={topicAccess.view} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>VIEW</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.add} onChange={(e) => inputTopicAccess(e, "add")} checked={topicAccess.add} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>ADD</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.edit} onChange={(e) => inputTopicAccess(e, "edit")} checked={topicAccess.edit} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>EDIT</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.remove} onChange={(e) => inputTopicAccess(e, "remove")} checked={topicAccess.remove} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>REMOVE</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "0.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.bulk_add} onChange={(e) => inputTopicAccess(e, "bulk_add")} checked={topicAccess.bulk_add} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>BULK ADD</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "0rem", paddingTop: "1rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.generate_report} onChange={(e) => inputTopicAccess(e, "generate_report")} checked={topicAccess.generate_report} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>GENERATE REPORT</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingTop: "1rem"}}>
                        <input className="form-check-input" type="checkbox" value={topicAccess.export_to_csv} onChange={(e) => inputTopicAccess(e, "export_to_csv")} checked={topicAccess.export_to_csv} />
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>EXPORT TO CSV</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-1 my-auto" style={{width: "10rem", paddingLeft: "3.2rem"}}>
                        <label style={{fontSize: "0.9rem"}}>PIC</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "2.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={picAccess.view} onChange={(e) => inputPicAccess(e, "view")} checked={picAccess.view}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>VIEW</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={picAccess.add} onChange={(e) => inputPicAccess(e, "add")} checked={picAccess.add}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>ADD</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={picAccess.edit} onChange={(e) => inputPicAccess(e, "edit")} checked={picAccess.edit}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>EDIT</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={picAccess.remove} onChange={(e) => inputPicAccess(e, "remove")} checked={picAccess.remove}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>REMOVE</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "0.5rem", width: "9rem" }}>
                        <input className="form-check-input" type="checkbox" value={picAccess.print_pic} onChange={(e) => inputPicAccess(e, "print_pic")} checked={picAccess.print_pic}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>PRINT PIC</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-1 my-auto" style={{width: "10rem", paddingLeft: "3.2rem"}}>
                        <label style={{fontSize: "0.9rem"}}>ARCHIVE</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "2.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={archiveAccess.view} onChange={(e) => inputArchiveAccess(e, "view")} checked={archiveAccess.view}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>VIEW</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={archiveAccess.move_to} onChange={(e) => inputArchiveAccess(e, "move_to")} checked={archiveAccess.move_to}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>MOVE TO</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={archiveAccess.bulk_add} onChange={(e) => inputArchiveAccess(e, "bulk_add")} checked={archiveAccess.bulk_add}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}> BULK ADD</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-1 my-auto" style={{width: "10rem", paddingLeft: "3.2rem"}}>
                        <label style={{fontSize: "0.9rem"}}>TRASH</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "2.5rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={trashAccess.view} onChange={(e) => inputTrashAccess(e, "view")} checked={trashAccess.view}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>VIEW</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={trashAccess.restore} onChange={(e) => inputTrashAccess(e, "restore")} checked={trashAccess.restore}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>RESTORE</label>
                      </div>
                      <div className="col-1 form-check my-auto" style={{paddingLeft: "1rem", width: "9rem"}}>
                        <input className="form-check-input" type="checkbox" value={trashAccess.empty} onChange={(e) => inputTrashAccess(e, "empty")} checked={trashAccess.empty}/>
                        <label className="form-check-label" style={{fontSize: "0.9rem"}}>EMPTY</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 d-flex justify-content-end" style={{paddingRight: "4rem"}}>
                        <button type="submit" className="btn btn-dark">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>)
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPic;