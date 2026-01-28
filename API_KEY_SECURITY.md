# 🔐 How to Add OpenAI API Key Safely

## ⚠️ IMPORTANT: Your API key was exposed!

**What happened:**
You shared your OpenAI API key in a public conversation. This means anyone who saw it could use your API credits.

**What to do NOW:**

### Step 1: Revoke the Exposed Key
1. Go to: https://platform.openai.com/api-keys
2. Find the key starting with: sk-proj-FBY...
3. Click the trash/delete icon or "Revoke"
4. Confirm deletion

### Step 2: Create a New Key
1. On the same page, click "Create new secret key"
2. Give it a name like "E-Room Development"
3. Copy the key (you'll only see it once!)
4. Store it safely

### Step 3: Add to .env.local

**Open your `.env.local` file and add:**

```env
# OpenAI API Key for AI Meeting Summarizer
OPENAI_API_KEY=sk-proj-YOUR_NEW_KEY_HERE

# Optional: Choose model (default: gpt-3.5-turbo)
OPENAI_MODEL=gpt-3.5-turbo
```

**Replace `sk-proj-YOUR_NEW_KEY_HERE` with your actual new key.**

### Step 4: Restart Dev Server

After adding the key:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Security Checklist

- [ ] Old key revoked on OpenAI platform
- [ ] New key created
- [ ] New key added to `.env.local`
- [ ] `.env.local` is in `.gitignore` (already done ✓)
- [ ] Dev server restarted
- [ ] Never share API keys in public again!

---

## 🔒 Best Practices

### DO:
✅ Store keys in `.env.local`
✅ Add `.env.local` to `.gitignore`
✅ Use environment variables
✅ Revoke unused keys
✅ Monitor API usage

### DON'T:
❌ Share keys in chat/email
❌ Commit keys to git
❌ Post keys on forums
❌ Share screenshots with keys
❌ Hard-code keys in code

---

## 📊 Monitor Your Usage

After adding the key:
1. Go to https://platform.openai.com/usage
2. Check your usage and costs
3. Set up billing alerts
4. Monitor for unexpected usage

---

## 💰 Cost Management

**Free Tier:**
- New accounts get $5 free credit
- Expires after 3 months

**GPT-3.5-turbo Pricing:**
- Input: $0.0015 per 1K tokens
- Output: $0.002 per 1K tokens
- ~$0.002 per meeting summary

**GPT-4 Pricing:**
- Input: $0.03 per 1K tokens
- Output: $0.06 per 1K tokens
- ~$0.03 per meeting summary

**Recommendation:** Start with GPT-3.5-turbo

---

## 🎯 Next Steps

1. **Revoke old key** ← Do this first!
2. **Create new key**
3. **Add to .env.local**
4. **Restart server**
5. **Test AI summary feature**

---

**Remember: API keys are like passwords - never share them publicly!**
