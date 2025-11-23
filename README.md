# FortisLine

A full-stack complaint submission and tracking system. Users submit campus/location complaints with optional attachments and receive a one‑time tracking code to monitor status. Administrators manage complaints via protected endpoints.

## Tech Stack
- Client: React 19, React Router v6, Vite, Tailwind CSS, Axios
- Server: Express 5, Mongoose 8, Multer (file uploads), express-session (session auth), dotenv, Cloudinary (planned), crypto (tracking codes), CORS
- Other deps present but not yet fully utilized: bcrypt, jsonwebtoken (future password hashing / token auth)

## Features
- Submit complaint with: type, location, date, description, up to 3 file attachments
- Deterministic HMAC tracking code: user sees plaintext once; server stores only hash
- Track complaint status by code (`/track` endpoint)
- Admin session login, list complaints, view details, update status (New / In Review / Resolved / Rejected)
- Secure static serving of uploaded files from `uploads/`

## Project Structure
```
client/              # React + Vite frontend
  src/
    pages/           # Landing, Form, Tracking, Admin pages
    components/      # Header, Footer, ProtectedRoute
server/              # Express backend
  models/            # Mongoose schemas (Complaints, Admin)
  middlewares/       # multer upload & admin auth
  routes/            # admin.routes.js
  utils/             # seedAdmin.js, tracking code generator
  uploads/           # Stored attachments
```

## Environment Variables
Create `server/.env`:
```
MONGO_URL=mongodb://localhost:27017/FortisLine
SESSION_SECRET=replace_with_strong_session_secret
TRACKING_CODE_SECRET=replace_with_strong_tracking_secret
# CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud_name> (if using later)
```

## Installation & Development
```bash
# Clone repository
git clone <repo-url>
cd FortisLine

# Backend setup
cd server
npm install
# (Optional) seed admin account
node utils/seedAdmin.js
npm start  # Runs on http://localhost:3000

# In a second terminal: frontend
cd ../client
npm install
npm run dev  # Vite dev server on http://localhost:5173
```

## Client Scripts
- `npm run dev` – Start Vite dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Lint sources

## Server Scripts
- `npm start` – Start Express with nodemon

## API Endpoints
### Public
- `POST /form` – Submit complaint (multipart form, field `attachments` up to 3 files). Returns `_id`, `status`, and one-time `trackingCode`.
- `GET /complaints` – List all complaints (public view; consider restricting later).
- `GET /getComplaint/:id` – Get complaint by id.
- `POST /track` – Body: `{ code: string }`; resolves status via HMAC hash comparison.
- `GET /uploads/:fileName` – Retrieve uploaded file (served safely from `uploads/`).

### Admin (requires session after login)
- `POST /admin/login` – Body: `{ email, password }`. Sets session `adminId`.
- `POST /admin/logout` – Destroy session.
- `GET /admin/me` – Check authentication state.
- `GET /admin/complaints` – List all complaints.
- `GET /admin/complaints/:id` – Detail.
- `PATCH /admin/complaints/:id/status` – Body: `{ status }` in allowed set.

## Data Model: Complaint
```
{
  type: String,
  location: String,
  date: String,
  desc: String,
  status: 'New' | 'In Review' | 'Resolved' | 'Rejected',
  attachments: string[],            # relative paths
  trackingCodeHash: String          # HMAC SHA-256 of lowercase tracking code
  timestamps: true
}
```

## Tracking Code Generation
- Built from 4 random neutral words + 4 digits (e.g. `cloud-river-leaf-stone-4821`).
- Plaintext given once at submission; stored server-side only as `trackingCodeHash` (`HMAC-SHA256(code, TRACKING_CODE_SECRET)`).
- Lookup: user submits code, server recomputes hash and matches document.

## Seeding Admin
Run: `node utils/seedAdmin.js` after setting `MONGO_URL`. Creates default admin:
```
email: admin@fortisline.com
password: admin123
```
Change these promptly in production and implement hashing.

## File Uploads
- Managed by Multer middleware: field name `attachments`, max 3.
- Stored in `server/uploads/`; served via `/uploads/<filename>`.
- Improve later: validate MIME types, integrate Cloudinary for remote storage.

## Security & Improvement Notes
- Admin passwords currently stored in plaintext – integrate bcrypt hashing.
- Consider switching auth to JWT or hardened sessions (secure cookies + HTTPS).
- Restrict `GET /complaints` publicly or add pagination / role checks.
- Enforce stricter validation on complaint fields & file types.
- Add rate limiting to submission and tracking endpoints.

## Production Recommendations
- Serve client build (Vite) via static hosting or reverse proxy (e.g. Nginx).
- Set `cookie.secure=true` and `sameSite=strict` under HTTPS.
- Use environment secrets (never hard-code). Rotate `TRACKING_CODE_SECRET` carefully – changing invalidates existing codes.

## License
Specify a license here (currently none). Add a LICENSE file if distributing.

## Contributing
1. Fork & branch (`feat/description`).
2. Run both servers locally & ensure lint passes.
3. Submit PR with clear description & screenshots for UI changes.

## Troubleshooting
- Server not starting: verify Mongo running & `MONGO_URL` correct.
- Tracking code not found: ensure user entered lowercase/hyphenated form; server normalizes to lowercase & trims.
- Attachments missing: confirm form field name `attachments` and max count ≤ 3.

---
© FortisLine – Improve transparency & resolution efficiency.
