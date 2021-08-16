import React ,{useState}from 'react'
import TeamForm from '../Team/TeamFormComponent';
import CandidatForm from '../Candidats/CandidatFormComponents';
import * as employeeService from "../Services/EmployeService";
import * as candidateService from "../Services/CandidatService"
import Controls from "../Controls/Controls";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../UseTable";
import { Search } from "@material-ui/icons";
import PageHeader from "../PageHeader";



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        boxShadow: '0 8px 16px 0 #7a7a7a',
        borderRadius:10,
        backgroundColor: '#c9c9c9'
    },
    searchInput: {
        width: '50%'
    },
    
    
}))
const headCells = [
    { id: 'fullName', label: ' Name' },
    { id: 'role', label: 'Role' },
    { id: 'pwd', label: 'Password' }
    
]

function UsersComponent( ) {

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState(candidateService.getAllCandidats().concat(employeeService.getAllEmployees()))
     
        /*for (let i = 0; i < cand.length; i++) {
            setRecords([...records,cand[i] ])
        }*/
   
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable( records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }
   
    return (
        <div>
            <PageHeader
                title="Users"
                subTitle="Auto_Ecole"
                icon={<SupervisedUserCircleIcon fontSize="large"  />}
            />
            <Paper className={classes.pageContent}>
                
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item =>
                           (<TableRow key={item.id}>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{item.password}</TableCell>
                            </TableRow>)
                        )} 
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </div>
    )
}

export default UsersComponent;

 
