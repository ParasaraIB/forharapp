import { useEffect, useState } from "react";

import {API_URL} from "../store/actionTypes";

export const useFetchStakeholders = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = `${API_URL}/stakeholder/getStakeholders`;
    if (institution) {
      url = `${url}?search=${institution}`;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => setStakeholders(data.stakeholders))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [institution]);

  return {stakeholders, institution, loading, error, setInstitution};
}