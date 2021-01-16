import { groupsLetter, stages,
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import LeagueWC from './classes/LeagueStage.js';
import PlayOffWC from './classes/PlayOffStage.js';

let winnerTeams = []; // Almacenamos ganadores de Rondas
let honorFinalTeams = [];
const RoundType = {
    final: 'final',
    semiFinal: 'semiFinal',
    playOff: 'palyOff'
}

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
    let i = 1;
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
const playOffs = playOffsClassified.map(team => team.name);

// console.log(playOffs);

let classifiedTeams = [];
const roundGame =['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
let classifiedTeamsRound = [];

for (let i=0; i<playOffs.length; i+=2){
    const playOffsMatch = playOffs.slice(i,i+2);
    classifiedTeams.push(playOffsMatch);
}

classifiedTeams.forEach((teamPlayOff, index) => {
    classifiedTeamsRound.push(new PlayOffWC(`${roundGame[index]} Match`, teamPlayOff))
})

console.log('============== OCTAVOS DE FINAL ============');


for (const classified of classifiedTeamsRound) {
    classified.scheduleMatchDays();
    classified.startPlayOff();   
}
printTeams(classifiedTeamsRound);

function printTeams(teams, roundType = RoundType.playOffs){
    for (const classified of teams) {
        // mostrar por pantalla los resultados de cada jornada y la clasificación
        classified.summaries.forEach(summary => {
        summary.results.forEach(result => {
            if(result.homeGoals > result.awayGoals){
                console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.homeTeam}`);
                if(roundType == RoundType.final){
                    console.log(`===============================================\n¡${result.homeTeam} campeón del mundo!\n===============================================`);
                }
            }else{
                console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.awayTeam}`);
                if(roundType == RoundType.final){
                    console.log(`===============================================\n¡${result.awayTeam} campeón del mundo!\n===============================================`);              
                } 
            }
            winnerTeams.push(classified.teams[0]);
            if(roundType == RoundType.honorFinal){
                honorFinalTeams.push(classified.teams[1]);
            }
        })
    })
    }
}

console.log('============== CUARTOS DE FINAL ============');

const quarterFinalsTeams = winnerTeams.map(team => team.name);
classifiedTeams = [];
classifiedTeamsRound = [];
winnerTeams = [];

for (let i=0; i<quarterFinalsTeams.length; i+=2){
    const playOffsMatch = quarterFinalsTeams.slice(i,i+2);
    classifiedTeams.push(playOffsMatch);
}

classifiedTeams.forEach((teamPlayOff, index) => {
    classifiedTeamsRound.push(new PlayOffWC(`${roundGame[index]} Match`, teamPlayOff))
})


for (const classified of classifiedTeamsRound) {
    classified.scheduleMatchDays();
    classified.startPlayOff();   
}

printTeams(classifiedTeamsRound);



console.log('============== SEMIFINALES ============');

const semiFinalsTeams = winnerTeams.map(team => team.name);
classifiedTeams = [];
classifiedTeamsRound = [];
winnerTeams = []

for (let i=0; i<semiFinalsTeams.length; i+=2){
    const playOffsMatch = semiFinalsTeams.slice(i,i+2);
    classifiedTeams.push(playOffsMatch);
}

classifiedTeams.forEach((teamPlayOff, index) => {
    classifiedTeamsRound.push(new PlayOffWC(`${roundGame[index]} Match`, teamPlayOff))
})

for (const classified of classifiedTeamsRound) {
    classified.scheduleMatchDays();
    classified.startPlayOff();   
}

printTeams(classifiedTeamsRound, RoundType.semiFinal);

// const honorFinal = []; // Almacenamos perdedores de Semis

// for (const classified of topFourTeams) {
//     // mostrar por pantalla los resultados de cada jornada y la clasificación
//     classified.summaries.forEach(summary => {
//     summary.results.forEach(result => {
//         if(result.homeGoals > result.awayGoals){
//             console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.homeTeam}`);
//         }else{
//             console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.awayTeam}`);            
//         }
//         final.push(classified.teams[0]);
//         honorFinal.push(classified.teams[1]);
//     })
// })
// }

// console.log('============== TERCER Y CUARTO PUESTO ============');

// const honorFinalTeams = honorFinal.map(team => team.name);


// const honorFinalist = [
//     new PlayOffWC ('First SemiFinal', honorFinalTeams)
// ];

// for (const classified of honorFinalist) {
//     classified.scheduleMatchDays();
//     classified.startPlayOff();   
// }

// for (const classified of honorFinalist) {
//     // mostrar por pantalla los resultados de cada jornada y la clasificación
//     classified.summaries.forEach(summary => {
//     summary.results.forEach(result => {
//         if(result.homeGoals > result.awayGoals){
//             console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.homeTeam}`);
//         }else{
//             console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.awayTeam}`);            
//         }
//     })
// })
// }

console.log('============== FINAL ============');

const finalTeams = winnerTeams.map(team => team.name);
classifiedTeams = [];
classifiedTeamsRound = [];
winnerTeams = [];

for (let i=0; i<finalTeams.length; i+=2){
    const playOffsMatch = finalTeams.slice(i,i+2);
    classifiedTeams.push(playOffsMatch);
}

classifiedTeams.forEach((teamPlayOff, index) => {
    classifiedTeamsRound.push(new PlayOffWC(`${roundGame[index]} Match`, teamPlayOff))
})

for (const classified of classifiedTeamsRound) {
    classified.scheduleMatchDays();
    classified.startPlayOff();   
}

printTeams(classifiedTeamsRound, RoundType.final);

