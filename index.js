import { worldCupContenders , groupsLetter,
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import WorldCup from './classes/WorldCup.js';
import LeagueWC from './classes/LeagueStage.js';
import PlayOffWC from './classes/PlayOffStage.js';


const groups = [
    new LeagueWC ('Group A', grupoA),
    new LeagueWC ('Group B', grupoB),
    new LeagueWC ('Group C', grupoC),
    new LeagueWC ('Group D', grupoD),
    new LeagueWC ('Group E', grupoE),
    new LeagueWC ('Group F', grupoF),
    new LeagueWC ('Group G', grupoG),
    new LeagueWC ('Group H', grupoH),
];

let numerogrupo = 0;
for (const group of groups) {

    console.log(`GRUPO ${groupsLetter[numerogrupo]}`)
    console.log('-----------------------')
    const teamNames = group.getTeamNames();
    teamNames.forEach(function(equipo) {
    console.log(equipo);
    });
    console.log('');

    group.scheduleMatchDays();
    group.start();
    
    let i = 1
    group.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i} del grupo ${groupsLetter[numerogrupo]}`)
    matchDay.forEach(match => {
        const home = match[0];
        const away = match[1];
        console.log(`${home} vs ${away}`)
    })
    i++
    console.log('');
    }); 
    numerogrupo++;
}

console.log('===============================================');
console.log('============== COMIENZA EL MUNDIAL ============');
console.log('===============================================');
console.log('');

const cualifayedTeamsAsFirst = []; //Almacena los primeros de cada grupo al final de la fase de grupos
const cualifayedTeamsAsSecond = []; //Almacena los segundos de cada grupo al final de la fase de grupos

numerogrupo = 0;
for (const group of groups) {
    // mostrar por pantalla los resultados de cada jornada y la clasificación
    let i = 1
    group.summaries.forEach(summary => {
    console.log(`RESULTADO JORNADA ${i} del grupo ${groupsLetter[numerogrupo]}`)
    summary.results.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
    })
    console.table(summary.standings.map(team => {
        return {
            Team: team.name,
            Points: team.points,
            PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
            Won: team.matchesWon,
            Drawn: team.matchesDrawn,
            Lost: team.matchesLost,
            GoalsFor: team.goalsFor,
            GoalsAgainst: team.goalsAgainst,
            GoalsDiff: team.goalsFor - team.goalsAgainst
        }
    }))
    i++;
})
numerogrupo++;

cualifayedTeamsAsFirst.push(group.teams[0]);
cualifayedTeamsAsSecond.push(group.teams[1]);

}

const roundOfSixteenLeft = [];
const roundOfSixteenRight = [];

for (let i = 0; i < cualifayedTeamsAsFirst.length; i++){
    // Evitamos que se crucen hasta la final equipos clasificados del mismo grupo
    if (i % 2 == 0 ){
        roundOfSixteenLeft.push(cualifayedTeamsAsFirst[i]);
        roundOfSixteenRight.push(cualifayedTeamsAsSecond[i]);
    } else {
        roundOfSixteenRight.push(cualifayedTeamsAsFirst[i]);
        roundOfSixteenLeft.push(cualifayedTeamsAsSecond[i]);
    }
}

const playOffsClassified = [...roundOfSixteenLeft, ...roundOfSixteenRight];
const playOffs = playOffsClassified.map(team => team.name);;

// console.log(playOffs);

const roundOfSixteenOne = playOffs.slice(0,2);
const roundOfSixteenTwo = playOffs.slice(2,4);
const roundOfSixteenThree = playOffs.slice(4,6);
const roundOfSixteenFour = playOffs.slice(6,8);
const roundOfSixteenFive = playOffs.slice(8,10);
const roundOfSixteenSix = playOffs.slice(10,12);
const roundOfSixteenSeven = playOffs.slice(12,14);
const roundOfSixteenEight = playOffs.slice(14,16);

const classifiedTeams = [
    new PlayOffWC ('First Round of Sixteen', roundOfSixteenOne),
    new PlayOffWC ('Second Round of Sixteen', roundOfSixteenTwo),
    new PlayOffWC ('Third Round of Sixteen', roundOfSixteenThree),
    new PlayOffWC ('Fourth Round of Sixteen', roundOfSixteenFour),
    new PlayOffWC ('Fifth Round of Sixteen', roundOfSixteenFive),
    new PlayOffWC ('Sixth Round of Sixteen', roundOfSixteenSix),
    new PlayOffWC ('Seventh Round of Sixteen', roundOfSixteenSeven),
    new PlayOffWC ('Eighth Round of Sixteen', roundOfSixteenEight),
];

console.log('============== OCTAVOS DE FINAL ============');

for (const classified of classifiedTeams) {

    classified.PlayOffSchedule();
    // console.log(classified.playOffDaySchedule);
    // classified.playOffDaySchedule.forEach(matchDay => {
    //     matchDay.forEach(match => {
    //         console.log(match.join(' vs '))
    //     });    
    // });

    classified.startPlayOff();   
}

const quarterFinals = []; // Almacenamos ganadores de Octavos

for (const classified of classifiedTeams) {
    // mostrar por pantalla los resultados de cada jornada y la clasificación
    classified.summaries.forEach(summary => {
    summary.results.forEach(result => {
        if(result.homeGoals > result.awayGoals){
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.homeTeam}`);
        }else{
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.awayTeam}`);            
        }
        quarterFinals.push(classified.teams[0]);
    })
})
}

console.log('============== CUARTOS DE FINAL ============');
console.log(quarterFinals);
