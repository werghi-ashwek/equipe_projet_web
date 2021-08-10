import React , { useEffect, useState }from 'react'
import TemplateAdmin from '../Template/TemplateAdmin'
import TemplateEmployer from '../Template/TemplateEmployer'
import TemplateCandidate from '../Template/TemplateCandidate'


export default function MainTemp() {

    const [role, setRole] = useState("");
    useEffect(() => {
        setRole("admin")
      }, []);
    return (
        <div> 
           {role == "candidate" &&  <TemplateCandidate/>}
           {role =="employer" &&  <TemplateEmployer/>}
           {role == "admin" &&  <TemplateAdmin/>}
        </div>
    )
}