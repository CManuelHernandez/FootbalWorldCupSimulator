import { worldCupContenders , 
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import WorldCup from './classes/WorldCup.js';
import LeagueWC from './classes/LeagueStage.js';


const groups = new LeagueWC ('Group A', grupoA);

for (const team of groups.teams) {
    console.log(team);
}