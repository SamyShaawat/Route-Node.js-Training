import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Read = () => {
  const {id} = useParams();
  useEffect(() =>{
    axios.get('http://localhost:3000/read-user/' + id)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  },[])



  return <>read: {id}</>;
};

export default Read;
