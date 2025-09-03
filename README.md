# School Directory Mini-Project (Next.js + MySQL)

Implements the PDF requirements: two pages — `addSchool.jsx` (form using react-hook-form + image upload) and `showSchools.jsx` (grid listing like ecommerce). Data persists in MySQL (`schools` table) and images are stored in `public/schoolImages`.

## Tech
- Next.js (Pages Router) + React
- MySQL via `mysql2/promise`
- `react-hook-form` for validation
- File upload via `formidable` to `public/schoolImages`

## Getting Started

1. **Clone & Install**
```bash
npm install
```

2. **Environment**
Create `.env.local` with your DB credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=schooldb
DB_PORT=3306
```

3. **Database**
Create the database + table:
```sql
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL
);
```

> Note: The `contact` field is stored as `VARCHAR(20)` to accommodate leading zeros and international formats, while still validating digits client-side.

4. **Run Dev**
```bash
npm run dev
# open http://localhost:3000
```

5. **Build/Start**
```bash
npm run build
npm start
```

## Pages
- `/addSchool` — responsive form with validation. Uploads image first (`/api/upload`) then saves row (`/api/schools`).
- `/showSchools` — responsive card grid showing **name, address, city, and image** only.

## API
- `GET /api/schools` — returns `{ schools: [...] }`
- `POST /api/schools` — JSON body `{ name, address, city, state, contact, image, email_id }`
- `POST /api/upload` — `multipart/form-data` with `image`

## Deploy
- Vercel/Netlify compatible. For Vercel + MySQL, set env vars in the dashboard. Ensure the **`/public/schoolImages`** folder exists or is writable at runtime. For immutable file systems, switch to object storage (e.g., Cloudinary/S3) by replacing `/api/upload` with provider SDK calls.

## Notes
- Minimal styling with CSS for clean, responsive UI.
- A placeholder image is shown if no image is provided.
- SWR is used in `showSchools.jsx` for client-side fetching.
```
