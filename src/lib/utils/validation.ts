export interface KontaktData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

// Validierung für das Kontaktformular
export function checkKontaktForm(raw: KontaktData) {
	const errs: Record<string, string> = {};

	// Name checken
	if (!raw.name || raw.name.trim().length < 2) {
		errs.name = 'Bitte gib einen Namen an (min. 2 Zeichen)';
	}

	// Email-Regex (bisschen vereinfacht)
	const mailCheck = /^\S+@\S+\.\S+$/;
	if (!raw.email || !mailCheck.test(raw.email)) {
		errs.email = 'Die E-Mail-Adresse sieht nicht richtig aus';
	}

	if (!raw.subject || raw.subject.trim().length < 3) {
		errs.subject = 'Betreff ist zu kurz';
	}

	// Nachricht darf nicht leer sein
	if (!raw.message || raw.message.trim().length < 10) {
		errs.message = 'Die Nachricht sollte schon ein paar Worte enthalten (min. 10 Zeichen)';
	}

	return errs;
}
