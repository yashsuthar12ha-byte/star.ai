# ⭐ Star.AI — Netlify Deployment Guide

## Folder Structure
```
star-ai/
├── public/
│   └── index.html          ← Your website
├── netlify/
│   └── functions/
│       └── ask.js          ← Backend API (secure)
├── netlify.toml            ← Netlify config
└── README.md
```

---

## Step 1 — Anthropic API Key lao

1. Jao: https://console.anthropic.com
2. Account banao (ya login karo)
3. "API Keys" section mein jao
4. "Create Key" click karo
5. Key copy karke rakho (ek hi baar dikhti hai!)

---

## Step 2 — Netlify Account banao

1. Jao: https://netlify.com
2. "Sign up" → GitHub ya Email se free account banao

---

## Step 3 — Website Upload karo

1. Netlify dashboard pe jao
2. **"Add new site" → "Deploy manually"** click karo
3. Poora `star-ai` folder drag & drop karo
4. Wait karo — 1 minute mein live ho jayegi! 🚀

---

## Step 4 — API Key add karo (IMPORTANT)

Bina is step ke AI kaam nahi karega:

1. Netlify dashboard mein apni site open karo
2. **Site configuration → Environment variables** mein jao
3. **"Add variable"** click karo:
   - Key: `ANTHROPIC_API_KEY`
   - Value: (jo key tune Step 1 mein copy ki thi)
4. Save karo
5. **Deploys → "Trigger deploy"** click karo (redeploy karna padega)

---

## Step 5 — Done! 🎉

Tera Star.AI live hai!
- Custom domain bhi add kar sakta hai Netlify mein (free `.netlify.app` milta hai)
- Google AdSense ke liye site ka URL use karo

---

## Contact
📧 yashsuthar12ha@gmail.com
