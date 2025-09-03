import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      const timestamp = Date.now();
      const safe = (part.originalFilename || 'image').replace(/[^a-zA-Z0-9-_\.]/g, '_');
      return `${timestamp}_${safe}`;
    }
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error parsing the files' });
    }
    const file = files.image;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;
    const fileName = path.basename(filePath);
    return res.status(200).json({ fileName });
  });
}
