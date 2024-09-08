gh run list --limit 200 --json databaseId -q ".[].databaseId" `
| ForEach-Object { 
    Write-Host "Pruning $_" -ForegroundColor Green
    gh api "repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/actions/runs/$_" -X DELETE 
}