Array.prototype.shuffle = function()
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

const teams = ["Sudáfrica", "Australia", "Argelia", "Dinamarca",
                "Alemania", "Corea del Norte", "Camerún", "Eslovaquia",
                "Argentina", "Corea del Sur", "Costa de Marfil", "Eslovenia",
                "Brasil", "Japón", "Ghana", "Francia",
                "España", "Estados Unidos", "Nigueria", "Grecia",
                "Inglaterra", "Honduras", "Chile", "Portugal",
                "Italia", "México", "Paraguay", "Serbia",
                "Páises Bajos", "Nueva Zelanda", "Uruguay", "Suiza"];
export {teams as worldCupContenders}

teams.shuffle();
export const grupoA = teams.slice(0,4);
export const grupoB = teams.slice(4,8);
export const grupoC = teams.slice(8,12);
export const grupoD = teams.slice(12,16);
export const grupoE = teams.slice(16,20);
export const grupoF = teams.slice(20,24);
export const grupoG = teams.slice(24,28);
export const grupoH = teams.slice(28,32);