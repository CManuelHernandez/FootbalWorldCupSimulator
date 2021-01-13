import { worldCupContenders , 
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import WorldCup from './classes/WorldCup.js';
import LeagueWC from './classes/LeagueStage.js';


const groups = new LeagueWC ('Group A', grupoA);

const teamNames = groups.teams.map(team => team.name);

// teamNames.forEach(function(equipo) {
//     console.log(equipo)
// })

groups.scheduleMatchDays()

console.log(groups.matchDaySchedule)