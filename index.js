import { groupsLetter, stages, roundGame,
    grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH} from './teams.js';
import LeagueWC from './classes/LeagueStage.js';
import PlayOffWC from './classes/PlayOffStage.js';

let winnerTeams          = []; // Almacenamos ganadores de Rondas
let honorFinalTeams      = []; // Almacenamos ganadores para la ronda de 3º y 4º
let classifiedTeams      = [];
let classifiedTeamsRound = [];
let numerogrupo          = 0;

const cualifayedTeamsAsFirst  = []; //Almacena los primeros de cada grupo al final de la fase de grupos
const cualifayedTeamsAsSecond = []; //Almacena los segundos de cada grupo al final de la fase de grupos
const roundOfSixteenLeft      = [];
const roundOfSixteenRight     = [];
const RoundType = {
    final: 'final',
    honor: 'honor',
    semiFinal: 'semiFinal',
    playOff: 'palyOff'
}
const seminifinal  = 2;
const finalOfHonor = 3;
const final        = 4;

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
        console.log(`${home} vs ${away}`);
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

winnerTeams = [...roundOfSixteenLeft, ...roundOfSixteenRight];

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
            if(roundType == RoundType.semiFinal){
                honorFinalTeams.push(classified.teams[1]);
            }
        });
    });
    }
}

function worldCupPlayOffs(){
    stages.forEach((round, playOffStage) => {
      console.log(`============== ${stages[playOffStage]} ============`);
        //Imprimimos la fase en que nos encontramos y reiniciamos los arrays
      const nameTeams =
      playOffStage == finalOfHonor ? honorFinalTeams.map((team) => team.name) : winnerTeams.map((team) => team.name);
      classifiedTeams      = [];
      classifiedTeamsRound = [];
      if (playOffStage != finalOfHonor) winnerTeams = []; // Para 3º y 4º evitamos sobreescribir la información de los ganadores

      for (let i = 0; i < nameTeams.length; i += 2) {
        const playOffsMatch = nameTeams.slice(i, i + 2);
        classifiedTeams.push(playOffsMatch);
      }

      classifiedTeams.forEach((teamPlayOff, playOffStage) => {
        classifiedTeamsRound.push(
          new PlayOffWC(`${roundGame[playOffStage]} Match`, teamPlayOff)
        );
      });

      for (const classified of classifiedTeamsRound) {
        classified.scheduleMatchDays();
        classified.startPlayOff();
      }
      switch (playOffStage) {
        case seminifinal:
          printTeams(classifiedTeamsRound, RoundType.semiFinal);
          break;

        case finalOfHonor:
          printTeams(classifiedTeamsRound, RoundType.honor);
          break;

        case final:
          printTeams(classifiedTeamsRound, RoundType.final);
          break;

        default:
          printTeams(classifiedTeamsRound);
      }
    }); 
}
worldCupPlayOffs();



