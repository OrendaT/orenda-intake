export const convertToFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (typeof value === 'string') {
      formData.append(key, value);
    } else if (value instanceof File) {
      formData.append(key, value);
    }
  });

  return formData;
};

/**
 * Converts a base64 data URL to a File object.
 * @param {string} base64Data - The base64 data URL.
 * @param {string} fileName - The name of the file to create (e.g., 'signature.png').
 * @returns {File|Blob} - A File object (or Blob fallback) that can be uploaded or saved.
 */
export const base64ToFile = (base64Data: string, fileName: string) => {
  if (!base64Data.includes(',')) {
    return '';
  }

  const [header, data] = base64Data.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Ensure filename has an extension
  if (!/\.[0-9a-z]+$/i.test(fileName)) {
    const ext = mime.split('/')[1] || 'png'; // fallback
    fileName = `${fileName}.${ext}`;
  }

  return new File([uint8Array], fileName, { type: mime });
};

export const toUSDate = (date: Date | string) => {
  const _date = new Date(date);
  return _date.toLocaleDateString('en-US');
};

export const convertFileListsToFiles = <T>(obj: Record<string, unknown>): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof FileList) {
      obj[key] = value.length === 1 ? value[0] : [...value];
    }
  });
  return obj as T;
};

export const convertBase64ToFile = <T>(obj: Record<string, unknown>): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object' && 'base64' in value) {
      const base64 = value.base64;
      if (typeof base64 === 'string') {
        obj[key] = base64ToFile(base64, key);
      }
    }
  });

  return obj as T;
};

export const parseDates = <T>(obj: Record<string, unknown>): T => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value && value instanceof Date && !isNaN(value.getTime())) {
      obj[key] = toUSDate(value);
    }
  });

  return obj as T;
};
