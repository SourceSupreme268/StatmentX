# Run this once after extracting the zip: .\setup-routes.ps1
# Creates Clerk's required bracket-named route folders (which don't survive
# some zip extractors) and moves the page files into them.

New-Item -ItemType Directory -Force -Path "src/app/sign-in/[[...sign-in]]" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/sign-up/[[...sign-up]]" | Out-Null

Move-Item -Force "_route_templates/sign-in-page.tsx" "src/app/sign-in/[[...sign-in]]/page.tsx"
Move-Item -Force "_route_templates/sign-up-page.tsx" "src/app/sign-up/[[...sign-up]]/page.tsx"

Remove-Item "_route_templates"

Write-Host "Done. Created:"
Write-Host "  src/app/sign-in/[[...sign-in]]/page.tsx"
Write-Host "  src/app/sign-up/[[...sign-up]]/page.tsx"
