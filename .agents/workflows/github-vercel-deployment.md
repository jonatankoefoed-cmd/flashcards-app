---
description: Deploy en lokal applikation til Github og automatisk til Vercel
---

# Formål
At uploade en lokal applikation til GitHub og forbinde den med Vercel. Når dette er opsat, vil alle lokale ændringer, du vælger at "pushe", automatisk og helt ubesværet blive bygget og opdateret live af Vercel.

### Første gang (Opsætning af projektet)

1. Sørg for at den lokale kode er klar, og initialisér Git:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Brug GitHub CLI til at oprette dit online repository og push koden:
```bash
gh repo create <repo-navn> --public --source=. --remote=origin
git branch -M main
git push -u origin main
```
*(Spørg evt. brugeren om ønsket repository-navn eller brug blot mappens navn).*

3. Brugeren fuldfører opsætningen på Vercel:
Bed brugeren logge ind på [Vercel](https://vercel.com/new), klikke på **"Add New..." -> "Project"**, finde det nye GitHub repository på listen, og trykke **"Deploy"**. Vercel sørger for resten, og opsætter automatisk den integration der kræves for de fremtidige, ubesværede opdateringer.

---

### Efter opsætning: "Automatisk" uploade ændringer

Når du arbejder videre og gerne vil have dine lokale koder udgivet live, skal koden bare pushes til Github. Du kan blot bede agenten om at "pushe ændringer". Følgende køres:

```bash
git add .
git commit -m "Opdatering fra lokal PC"
git push
```
*(Vercel bliver atomatisk underrettet af GitHub, og lægger sekunderne efter ændringerne live!)*
