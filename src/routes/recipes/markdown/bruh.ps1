Write-Host "Enumerating images"
$images = Get-ChildItem -File `
| Where-Object { $_.Extension -match "\.(jpg|jpeg|png|gif|bmp|tiff|webp)$" }

Write-Host "Stripping images"
foreach ($img in $images) {
    Write-Host "Updating $img"
    exiftool -all= -overwrite_original "$img"
}

Read-Host "manual: copy images to a temp folder somewhere"

Write-Host "Removing images"
git rm *.png *.jpg -f

Write-Host "Pruning history"
./rm2.ps1

Read-Host "manual: copy images back"

Write-Host "Restoring images"
git add *.jpg *.png