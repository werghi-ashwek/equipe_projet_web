import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const KEYS = {
    vehicules: 'vehicules',
    vehiculeId: 'vehiculeId'
}


export function insertVehicule(data) {
    let vehicules = getAllVehicules();
    data['id'] = generateVehiculeId()
    vehicules.push(data)
    localStorage.setItem(KEYS.vehicules, JSON.stringify(vehicules))
}

export function generateVehiculeId() {
    if (localStorage.getItem(KEYS.vehiculeId) == null)
        localStorage.setItem(KEYS.vehiculeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.vehiculeId))
    localStorage.setItem(KEYS.vehiculeId, (++id).toString())
    return id;
}
export function updateVehicule(data) {
    let vehicules = getAllVehicules();
    let recordIndex = vehicules.findIndex(x => x.id === data.id);
    vehicules[recordIndex] = { ...data }
    localStorage.setItem(KEYS.vehicules, JSON.stringify(vehicules));
}

export function deleteVehicule(id) {
    let vehicules = getAllVehicules();
    vehicules = vehicules.filter(x => x.id !== id)
    localStorage.setItem(KEYS.vehicules, JSON.stringify(vehicules))
}

export function getAllVehicules() {
    if (localStorage.getItem(KEYS.vehicules) == null)
        localStorage.setItem(KEYS.vehicules, JSON.stringify([]))
    var vehicules = JSON.parse(localStorage.getItem(KEYS.vehicules));
    
    
    return vehicules.map(x => ({
        ...x,
         
    
    }))
}