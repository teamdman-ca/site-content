az storage blob upload-batch `
    --account-name "site10201" `
    --source .\content `
    --destination '$web' `

$config = Get-Content .\.env | ConvertFrom-StringData;

# https://www.davepaquette.com/archive/2020/05/10/deploying-a-static-site-to-azure-using-the-az-cli.aspx
az cdn endpoint purge `
    --resource-group $config.rgp `
    --name $config.cdn `
    --profile-name $config.profile `
    --no-wait `
    --content-paths '/' '/index.html';