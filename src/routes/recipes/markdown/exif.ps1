Get-ChildItem -File `
| Where-Object { $_.Extension -match "\.(jpg|jpeg|png|gif|bmp|tiff|webp)$" } `
| ForEach-Object { exiftool -all= -overwrite_original "$_" }