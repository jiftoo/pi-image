call npx vite optimize 
call npm run build 
git fetch 
git checkout --orphan pages
git checkout pages
mv --force ./dist/** .
git add --all :!node_modules 
git commit -m "deploy pages"
git push origin pages 
echo "Done."
