import React, { useState } from 'react'
import VehiculeForm from "./VehiculeFormComponent";
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../UseTable";
import { Search } from "@material-ui/icons";
import PageHeader from "../PageHeader";
import Controls from "../Controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import * as vehiculeService from "../Services/VehiculeService";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import  UseDialog from "../UseDialog";
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Countdown from '../Countdown';



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
    
    newButton: {
        position: 'absolute',
        right: '10px'
    },
     root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    }
}))



const headCells = [
    { id: 'marque', label: 'Marque' },
    { id: 'matricule', label: 'Matricule' },
    { id: 'visite_technique', label: 'Visite Technique ' },
    { id: 'visite_vignette', label: 'Visite Vignette'  },
    { id: 'visite_assurence', label: ' Visite Assurence'  },
    { id: 'visite_reparation', label: 'Visite Assurence '  },
   
    { id: 'actions', label: 'Actions', disableSorting: true },
]


export default function VehiculesComponent() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vehiculeService.getAllVehicules())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [OpenDialog, setOpenDialog] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

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


    const addOrEdit = (vehicule, resetForm) => {
        if (vehicule.id == 0)
            vehiculeService.insertVehicule(vehicule)
        else
            vehiculeService.updateVehicule(vehicule)
        resetForm()
        setRecordForEdit(null)
        setOpenDialog(false)
        setRecords(vehiculeService.getAllVehicules())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInDialog = item => {
        
        setRecordForEdit(item)
        setOpenDialog(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        vehiculeService.deleteVehicule(id);
        setRecords(vehiculeService.getAllVehicules())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    return (
        <div>
            
            <PageHeader
                title="Vehicules"
                subTitle="Auto_Ecole"
                icon={<DriveEtaOutlinedIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
            
                <Toolbar>
                    <Controls.Input
                        label="Search Vehicule"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenDialog(true); setRecordForEdit(null);vehiculeService.getAllVehicules();}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.marque}</TableCell>
                                    <TableCell>{item.matricule}</TableCell>
                                    <TableCell>{<Countdown date={item.visite_technique}/>}</TableCell>
                                    <TableCell>{<Countdown date={item.visite_vignette}/>}</TableCell>
                                    <TableCell>{<Countdown date={item.visite_assurence}/>}</TableCell>
                                    <TableCell>{<Countdown date={item.visite_reparation}/>}</TableCell>
                                    
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() =>{ openInDialog(item) }}
                                        >
                                        
                                         <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                           onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <UseDialog
                title="Vehicule Form"
                OpenDialog={OpenDialog}
                setOpenDialog={setOpenDialog}
            >
                <VehiculeForm
                     recordForEdit={recordForEdit}
                     addOrEdit={addOrEdit} 
               />
            </UseDialog>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
             <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};
