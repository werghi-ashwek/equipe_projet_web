import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../Controls/Controls";
import { useForm, Form } from '../UseForm';
import * as candidatService from "../Services/CandidatService";
import generator from "generate-password";



const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const typeItems = [
    { id: 'code', title: 'Code' },
    { id: 'Conduite', title: 'Conduite' },
   
]

const initialFValues = {
    id: 0,
    fullName: '',
    age: '' ,
    mobile: '',
    city: '',
    type:'code',
    categorie:"",
    gender: 'male',
    Date_examencode: new Date(),
    Date_examenconduite: new Date(),
    payment:"",
    password:'',
    role:'candidate'
}

export default function CandidatForm( props ) {
    
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length == 8 ? "" : " Mobile number is not valid."
        if ('categorieId' in fieldValues)
            temp.categorieId = fieldValues.categorieId.length != 0 ? "" : "This field is required." 
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
       
        }
    }
    const generatePassword = () => {
        const pwd = generator.generate({
          length: 10,
          lowercase: true,
          uppercase:true,
          numbers:true,
          symbols: false
        });
        if( values.id == 0)
          {values.password=pwd;}
    } 

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        label="Age"
                        name="age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    

                </Grid>
                <Grid item xs={6}>
                   
                    <Controls.RadioGroup
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleInputChange}
                        items={typeItems}
                    />
                     <Controls.Select
                        name="categorieId"
                        label="Catégorie Permis"
                        value={values.categorie_permis}
                        onChange={handleInputChange}
                         options={candidatService.getCategorieCollection()}
                        error={errors.categorie_permis}
                    />
                    <Controls.DatePicker
                        name="dateexamen"
                        label="Date Examen  "
                        value={values.dateexamen}
                        onChange={handleInputChange}
                    />
                    
                    <Controls.Input
                        label="Payee"
                        name="payee"
                        value={values.payee}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="A payer"
                        name="apayer"
                        value={values.apayer}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick={generatePassword}/>
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
