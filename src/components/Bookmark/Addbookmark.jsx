import React from 'react';
import Add_Lawyercart from './Add_Lawyercart';

export default function Addbookmark({add_Lawyercarts}) {
  return add_Lawyercarts.map((add_Lawyercart) => {
    <Add_Lawyercart  key={add_Lawyercart.ID} cartProduct={add_Lawyercart}/>
  }
    
  )
}
