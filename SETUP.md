# Setup Instructions

## First-time setup (one extra step)

Clerk requires two folders with double square brackets in their names —
`[[...sign-in]]` and `[[...sign-up]]` — this is Next.js's "optional catch-all route"
syntax, not a typo. Many zip tools (especially Windows' built-in "Extract All")
strip or fail on `[` and `]` in paths, so **this zip does not contain those folders
directly**. Instead, the page code lives in `_route_templates/`, and a setup script
creates the bracket folders for you.

**After extracting the zip, run one of these once, from the project root:**

Mac/Linux:
```bash
chmod +x setup-routes.sh
./setup-routes.sh
```

Windows (PowerShell):
```powershell
.\setup-routes.ps1
```

That creates:
```
src/app/sign-in/[[...sign-in]]/page.tsx
src/app/sign-up/[[...sign-up]]/page.tsx
```
and removes the now-empty `_route_templates/` folder.

## If `npm install` fails with an ERESOLVE / peer dependency error

This means the exact Clerk/React version pins in `package.json` don't line up —
this can drift as Clerk ships new patches. Two options, in order of preference:

**Option A — let npm find a working combination itself:**
```bash
npm install @clerk/nextjs@latest-v6
```
This installs the newest patch on Clerk's v6 line (the API this project's code uses —
`<SignIn>`, `<SignUp>`, `clerkMiddleware`), which should have a React 19.1-compatible
peer range. Then run `npm install` again normally.

**Option B — if it still conflicts, force past the warning:**
```bash
npm install --legacy-peer-deps
```
This is safe here specifically because the conflict is peer-range metadata being overly
strict, not an actual runtime incompatibility — Clerk's v6 SDK does work with React 19.1
in practice, some patch versions just hadn't updated their declared range yet.

If neither works, paste the exact error here and it'll get fixed at the source
(`package.json`) rather than patched around every time.



```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
# from https://dashboard.clerk.com
npm run dev
```

Visit `http://localhost:3000` for the landing page, `/sign-in` and `/sign-up` for auth.
