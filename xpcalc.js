Hooks.on("renderCombatTracker", (tracker, html, data) => {
        if (!game.user.isGM) return;
	if (data.combat?.combatants === undefined) return;
	let allies = 0;
	let enemies = 0;
	let totalXP = 0;
	data.combat.combatants.forEach(combatant => {
		let tok = combatant.token;
		let dispo;

		/* Non-CONST and tok.disposition are 7.x... remove when appropriate */
		const FRIENDLY = CONST?.TOKEN_DISPOSITIONS?.FRIENDLY === undefined ? TOKEN_DISPOSITIONS.FRIENDLY : CONST.TOKEN_DISPOSITIONS.FRIENDLY;
		const HOSTILE = CONST?.TOKEN_DISPOSITIONS?.HOSTILE === undefined ? TOKEN_DISPOSITIONS.HOSTILE : CONST.TOKEN_DISPOSITIONS.HOSTILE;

		if (tok?.disposition !== undefined)
			dispo = tok.disposition;
		else if (tok?.data?.disposition !== undefined)
			dispo = tok.data.disposition;

		if (dispo !== undefined) {
			switch (dispo) {
				case FRIENDLY:
					allies++;
					break;
				case HOSTILE:
					if (combatant.actor?.data?.data?.details?.xp?.value !== undefined) {
						let xp = combatant.actor.data.data.details.xp.value;
						totalXP += xp;
						enemies++;
					}
			}
		}
	});
	if (allies > 0 && totalXP > 0) {
		let cc = html.find("#combat-controls");
		cc.before("XP: " + totalXP + " (" + enemies + ") / " + allies + " = " + Math.floor(totalXP / allies) + " (" + Math.floor(totalXP / allies / 2) + ")");
	}
});
