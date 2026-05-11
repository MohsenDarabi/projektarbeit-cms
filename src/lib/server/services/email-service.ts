import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Mail verschicken via Nodemailer
export async function sendEmail(mailData: { name: string; email: string; subject: string; message: string }) {
	// SMTP Zeug aus den Env-Vars ziehen
	const host = env.SMTP_HOST || 'smtp.ethereal.email';
	const port = parseInt(env.SMTP_PORT || '587');
	const user = env.SMTP_USER;
	const pass = env.SMTP_PASS;

	// Fallback für Dev/Test
	if (!user || !pass) {
		console.log('SMTP-Daten fehlen. Hier sind die Mail-Infos:', mailData);
		return;
	}

	const mailer = nodemailer.createTransport({
		host,
		port,
		auth: { user, pass }
	});

	await mailer.sendMail({
		from: `"${mailData.name}" <${mailData.email}>`,
		to: env.CONTACT_EMAIL || 'info@unternehmensname.de',
		subject: `Neuer Kontakt: ${mailData.subject}`,
		text: mailData.message,
		html: `
			<h3>Neue Nachricht über die Website</h3>
			<p><strong>Von:</strong> ${mailData.name} (${mailData.email})</p>
			<p><strong>Betreff:</strong> ${mailData.subject}</p>
			<hr/>
			<p style="white-space: pre-wrap;">${mailData.message}</p>
		`
	});
}
