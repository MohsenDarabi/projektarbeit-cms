import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = 'static/uploads';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB ist das Limit
const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

// Checken ob das Bild okay ist
export function validateImage(f: File): boolean {
	if (!validMimeTypes.includes(f.type)) {
		return false;
	}
	// Zu groß?
	if (f.size > MAX_IMAGE_SIZE) return false;
	
	return true;
}

export async function processImage(imageFile: File): Promise<string> {
	// Ordner sicherstellen
	await fs.mkdir(UPLOAD_DIR, { recursive: true });
	
	const name = `${uuidv4()}.webp`;
	const dest = path.join(UPLOAD_DIR, name);
	
	const buf = Buffer.from(await imageFile.arrayBuffer());
	
	// Mit Sharp optimieren und als webp speichern
	await sharp(buf)
		.resize(1200, undefined, { withoutEnlargement: true })
		.webp({ quality: 80 })
		.toFile(dest);
		
	return `/uploads/${name}`;
}

export async function deleteImage(img: string) {
	if (!img) return;
	const p = path.join('static', img);
	try {
		await fs.unlink(p);
	} catch (e) {
		// Loggen wenn das Löschen schiefgeht, aber nicht crashen
		console.warn('Bild konnte nicht gelöscht werden:', e);
	}
}
