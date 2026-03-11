import { ProcessVideoBbox, ALLOWED_VIDEO_MIME_TYPES } from './video.types';

export function validateBbox(bbox: unknown): bbox is ProcessVideoBbox {
  if (!bbox || typeof bbox !== 'object') return false;
  const b = bbox as Record<string, unknown>;
  return (
    typeof b.x === 'number' &&
    typeof b.y === 'number' &&
    typeof b.width === 'number' &&
    typeof b.height === 'number'
  );
}

export function isAllowedMimeType(mimeType: string): boolean {
  return (ALLOWED_VIDEO_MIME_TYPES as readonly string[]).includes(mimeType);
}

export function generateStorageKey(_fileName: string, mimeType: string): string {
  const ext = mimeType === 'video/quicktime' ? 'mov' : mimeType.split('/')[1] ?? 'mp4';
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  return `videos/${unique}.${ext}`;
}
