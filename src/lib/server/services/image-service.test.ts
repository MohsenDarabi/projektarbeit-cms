import { describe, it, expect, vi } from 'vitest';
import { validateImage, processImage } from './image-service';

describe('ImageService', () => {
	it('should validate image types', () => {
		const validFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
		const invalidFile = new File([''], 'test.pdf', { type: 'application/pdf' });
		
		expect(validateImage(validFile)).toBe(true);
		expect(validateImage(invalidFile)).toBe(false);
	});

	it('should validate image size', () => {
		// 6MB file
		const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
		expect(validateImage(largeFile)).toBe(false);
	});
});
