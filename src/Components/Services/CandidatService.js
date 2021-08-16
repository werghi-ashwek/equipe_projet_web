const KEYS = {
    candidats: 'candidats',
    candidatId: 'candidatId'
}

export const getCategorieCollection = () => ([
    { id: '1', title: ' A1' },
    { id: '2', title: ' A' },
    { id: '3', title: ' B' },
    { id: '4', title: ' B+E ' },
    { id: '5', title: ' C ' },
    { id: '6', title: 'C+E ' },
    { id: '7', title: ' D ' },
    { id: '8', title: ' D+E ' },
    { id: '9', title: ' D1 ' },
    { id: '10', title: ' H ' }

])
export function insertCandidat(data) {
    let candidats = getAllCandidats();
    data['id'] = generateCandidatId()
    candidats.push(data)
    localStorage.setItem(KEYS.candidats, JSON.stringify(candidats))
}

export function generateCandidatId() {
    if (localStorage.getItem(KEYS.candidatId) == null)
        localStorage.setItem(KEYS.candidatId, '0')
    var id = parseInt(localStorage.getItem(KEYS.candidatId))
    localStorage.setItem(KEYS.candidatId, (++id).toString())
    return id;
}
export function updateCandidat(data) {
    let candidats = getAllCandidats();
    let recordIndex = candidats.findIndex(x => x.id === data.id);
    candidats[recordIndex] = { ...data }
    localStorage.setItem(KEYS.candidats, JSON.stringify(candidats));
}

export function deleteCandidat(id) {
    let candidats = getAllCandidats();
    candidats = candidats.filter(x => x.id !== id)
    localStorage.setItem(KEYS.candidats, JSON.stringify(candidats))
}

export function getAllCandidats() {
    if (localStorage.getItem(KEYS.candidats) == null)
        localStorage.setItem(KEYS.candidats, JSON.stringify([]))
    var candidats = JSON.parse(localStorage.getItem(KEYS.candidats));
    
    let categ = getCategorieCollection();
    return candidats.map(x => ({
        ...x,
         categorie: categ[x.categorieId-1].title
        
    }))
}