Get-ChildItem -File `
| Where-Object { $_.Extension -match "\.(jpg|jpeg|png|gif|bmp|tiff|webp)$" } `
| ForEach-Object { 
    Write-Host "Updating $_"
    exiftool -all= -overwrite_original "$_"
}