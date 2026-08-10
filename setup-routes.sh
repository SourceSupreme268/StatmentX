#!/usr/bin/env bash
# Run this once after extracting the zip: ./setup-routes.sh
# Creates Clerk's required bracket-named route folders (which don't survive
# some zip extractors) and moves the page files into them.
set -e

mkdir -p "src/app/sign-in/[[...sign-in]]"
mkdir -p "src/app/sign-up/[[...sign-up]]"

mv _route_templates/sign-in-page.tsx "src/app/sign-in/[[...sign-in]]/page.tsx"
mv _route_templates/sign-up-page.tsx "src/app/sign-up/[[...sign-up]]/page.tsx"

rmdir _route_templates

echo "Done. Created:"
echo "  src/app/sign-in/[[...sign-in]]/page.tsx"
echo "  src/app/sign-up/[[...sign-up]]/page.tsx"
