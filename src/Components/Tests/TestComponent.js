import React from 'react'
import Card from './Card'
import q2 from './Images/q2.jpg'
import q3 from './Images/q3.jpg'
import './TestComponent.css'
import Grid from '@material-ui/core/Grid';
export default function TestComponent() {
  return (
    <div >
      <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
      <Card  text={'Test 1'} categorie={"Code/B"} img={q2} lien={"/main/Test/test1"}/>
      <Card  text={'Test 2'} categorie={"Code/A"} img={q3} lien={"/main/Test/test1"}/>
      <Card  text={'Test 3'} categorie={"Code/E"} img={q3} lien={"/main/Test/test1"}/>
</Grid>
     
    </div>
  )
}
