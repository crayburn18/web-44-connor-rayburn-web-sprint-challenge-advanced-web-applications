import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";


const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  const { id } = useParams()

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`/colors/${id}`, editColor)
      .then(res => {
        setColors(
          colors.map(item => {
            if(res.data.id === item.id ){
              return( res.data)
            
            }else{
              return(item)
            }
          })
        )
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = (colorid) => {
    axiosWithAuth()
      .delete(`/colors/${colorid}`)
      .then(res => {
        const newList = colors.filter(item => item.id !== colorid)
        setColors(newList)        
      })
      .catch(err => {
        console.log(err)
      })
  };

  useEffect(() =>{
    const fetchColor = fetchColorService()
    fetchColor.then(res => {
      setColors(res)
    })
  }, [])


  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
