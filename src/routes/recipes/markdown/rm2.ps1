java -jar 'C:\Program Files\bin\bfg-1.14.0.jar'  `
    --delete-files "{borscht.jpg,drop cookies.jpg,ham pea soup.png,mexican pizza.jpg,peanut butter balls.jpg,quinoa casserole.jpg,taco seasoning.png,toblerone cheesecake.jpg,turkey casserole.jpg,turkey soup.jpg}" `
    ../../../..

Write-Host "Cleaning up..." -ForegroundColor Green
git reflog expire --expire=now --all
git gc --prune=now --aggressive