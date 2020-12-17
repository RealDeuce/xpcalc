Hooks.on("renderCombatTracker", (tracker, html, data) => {
        if (!game.user.isGM) return;
	let allies = 0;
	let enemies = 0;
	let totalXP = 0;
	data.combat.combatants.forEach(combatant => {
		let tok = combatant.token;

		switch (tok.disposition) {
			case TOKEN_DISPOSITIONS.FRIENDLY:
				allies++;
				break;
			case TOKEN_DISPOSITIONS.HOSTILE:
				let xp = combatant.actor.data.data.details.xp.value;
				totalXP += xp;
				enemies++;
		}
	});
	if (allies > 0 && totalXP > 0) {
		let cc = html.find("#combat-controls");
		cc.before("XP: " + totalXP + " (" + enemies + ") / " + allies + " = " + (totalXP / allies) + " (" + Math.floor(totalXP / allies / 2) + ")");
	}
});
