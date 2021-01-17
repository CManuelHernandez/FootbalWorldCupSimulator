# FootbalWorldCupSimulator
Simulador de competición de futbol con el formato de La copa del mundo

Aplicación de JavaScript que muestra por cada ejecucción en consola una simulación de campeonto con el Formato de la fase final de la **Copa Mundial de Fútbol**.
La aplicación parte de la información que se encuentra en el archivo **teams.js**, el cual contiene los 32 participantes.

**Estructura:**
* teams.js
* index.js
* classes
* * WorldCup.js
* * LeagueStage.js  (Hereda de WorldCup.js)
* * PlayOffStage.js (Hereda de WorldCup.js)


# Requisitos de la aplicación

## Fase grupos (opcional)
Estos 32 equipos se agrupan en 8 grupos de 4 equipos cada uno. Aunque en realidad hay reglas sobre cómo los equipos se distribuyen en los grupos, para esta práctica se ignorarán. Los grupos se nombran por letras en orden alfabético, desde la A hasta la H.
Repartiremos los 32 equipos aleatoriamente en los 8 grupos. Para cada grupo, se jugará una liga de una sola vuelta, enfrentando a todos los equipos del grupo entre ellos. Tras jugar todos los partidos entre los equipos, tan sólo los dos primeros equipos de cada grupo se clasificarán para la fase de eliminatorias, es decir que se clasificarán 16 equipos. 

**Restricciones de la fase de grupos:**
* Los equipos se distribuirán en los grupos de manera aleatoria.
* En cada grupo, todos los equipos deberán jugar entre sí.
* La victoria supondrá ganar 3 puntos, el empate 1 y la derrota 0.
* La clasificación de la fase de grupos se realizará bajo los siguiente criterios:
* Los equipos se ordenarán en función de los puntos ganados descendentemente (primero el que más puntos tenga).
* En caso de empate a puntos, será primero el equipo que haya ganado al otro en el enfrentamiento entre ambos.
* En caso de empate también en la diferencia de goles, será primero el equipo por orden alfabético (vaya putada para Zimbabue).

## Fase de eliminatorias (playoff)
La fase de eliminatorias la jugarán los 16 mejores equipos de la fase de grupos (los dos primeros de cada grupo), en caso de implementar la fase de grupos (opcional). De no implementar la fase de grupos, serán 16 equipos seleccionados aleatoriamente.
**Restricción:** en la fase de eliminatorias no puede haber empates. En caso de empates, se deberá jugar hasta que un equipo finalmente gane. La segunda ronda de la fase de eliminatorias (cuartos de final) enfrentará a los 8 equipos ganadores de los partidos de la ronda anterior (octavos de final). Los ganadores de estos partidos pasarán a la siguiente ronda (semifinales).
Los equipos ganadores de las semifinales, pasarán a la final y los equipos perdedores jugarán un partido para establecer el tercer y cuarto puesto de la clasificación.
**Restricciones sólo si implementas la fase de grupos:**
1. Los enfrentamientos de la primera ronda de la fase de eliminatorias (octavos de final), será cruzando los primeros de grupo contra los segundos de grupo entre grupos contiguos (Grupo A vs Grupo B, Grupo C vs Grupo D, etc.).

* * **Ejemplo:**
Grupo A:
1º Uzbekistán
2º Vietnam
Grupo B:
1º Zimbabue
2º Jamaica
Los enfrentamientos serían: Uzbekistán vs Jamaica y Zimbabwe vs Vietnam.

2. Dos equipos que se hayan encontrado en la fase de grupos, no podrán volver a encontrarse en la fase de eliminatorias hasta la final. Para garantizar esto, los primeros equipos de los grupos A, B, C y D y los segundos equipos de los grupos E, F, G y H, irán por un lado de del cuadro, y los primeros equipos de los grupos E, F, G y H y los segundos equipos de los grupos A, B, C y D irán
por otro lado del cuadro.

## Requisitos del programa mínimo
* El programa comenzará indicando con un mensaje que “comienza el torneo”.
* El programa deberá mostrar los 16 equipos participantes en la fase de eliminatorias (play off).
* A continuación se deberán mostrar los resultados de los partidos en las diferentes rondas (octavos de final, cuartos de final y semifinales), indicando qué equipos se clasifican para la siguiente ronda (esto se mostrará desde octavos de final hasta semifinales).
* **Opcional**: Una vez finalizadas las semifinales, se mostrará el resultado del partido de tercer y cuarto puesto (que se juega entre equipos no clasificados para la final).
* Tras esto, se mostrará el resultado del partido de la final, anunciando posteriormente el equipo ganador como campeón del mundo.

## Requisitos con la fase de grupos
* Al arrancar el programa se deberá mostrar por pantalla la información de los equipos que hay en cada grupo y la planificación de partidos del mismo.
  * Nombre del grupo
  * Listado de los equipos (una en cada línea)
* La asignación de los equipos a cada grupo se realizará de manera aleatoria.
* Después se anunciará con un texto el comienzo del torneo
* A continuación se mostrarán los resultados de los partidos y la clasificación de cada grupo tras el final de la primera jornada de partidos, después los de la segunda jornada, y finalmente los de la tercera jornada.
* Una vez finalice la fase de grupos, se deberán anunciar el comienzo de la fase de eliminatorias.
* A partir de aquí, se continuaría con los requisitos del programa mínimo.
