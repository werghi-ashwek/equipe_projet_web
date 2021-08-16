import React, { useState } from 'react'
import CandidatForm from "./CandidatFormComponents";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../UseTable";
import { Search } from "@material-ui/icons";
import PageHeader from "../PageHeader";
import Controls from "../Controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import * as candidatService from "../Services/CandidatService";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import  UseDialog from "../UseDialog";
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';

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
    }
}))


const headCells = [
    { id: 'fullName', label: 'Candidat Name' },
    { id: 'age', label: 'Age' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'type/categorie', label: 'Type/Catégorie'  },
    { id: 'dateexamen', label: 'Date Examen '  },
    { id: 'payee/ apayer', label: 'Payee/A Payer'  },

    
    { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function CandidatsComponent() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(candidatService.getAllCandidats())
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

    const addOrEdit = (candidat, resetForm) => {
        if (candidat.id == 0)
            candidatService.insertCandidat(candidat)
        else
            candidatService.updateCandidat(candidat)
        resetForm()
        setRecordForEdit(null)
        setOpenDialog(false)
        setRecords(candidatService.getAllCandidats())
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
        candidatService.deleteCandidat(id);
        setRecords(candidatService.getAllCandidats())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    // {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse({new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.dateexamen)))})))}
    return (
        <div >
            <PageHeader
                title="Our Candidats"
                subTitle="Auto_Ecole"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/* <CandidatForm /> */}
                <Toolbar>
                    <Controls.Input
                        label="Search Candidat"
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
                        onClick={() => { setOpenDialog(true); setRecordForEdit(null);candidatService.getAllCandidats();}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.type}/{item.categorie}</TableCell>
                                    <TableCell>{item.dateexamen}</TableCell>
                                    <TableCell>{item.payee}/{item.apayer}</TableCell>

                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() =>{ openInDialog(item) }}>
                                        
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
                title="Candidat Form"
                OpenDialog={OpenDialog}
                setOpenDialog={setOpenDialog}
            >
                <CandidatForm
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
