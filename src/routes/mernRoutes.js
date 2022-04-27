import { 
    addNewPlayer, 
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer } 
from '../controllers/playerControllers';

const routes = (app) => {
    app.route('/players')
        .get(getPlayers) //get end point
        .post(addNewPlayer); //post end point
    
    app.route('/players/:PlayerId')
    .get(getPlayerById) //to get specific players
    .put(updatePlayer)
    .delete(deletePlayer); //to update specific players
}

export default routes;