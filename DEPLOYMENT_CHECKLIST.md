# E-Room Deployment Checklist for e-room.tech

## ✅ Completed Steps
- [x] Code committed to git
- [x] Git remote configured (https://github.com/karthi2905/e-room.git)
- [x] Branch renamed to main

## 🔄 Current Step: Push to GitHub
**Waiting for:** GitHub repository creation at https://github.com/karthi2905/e-room

**Once repository is created, run:**
```bash
git push -u origin main
```

## 📋 Next Steps After Push

### 1. Deploy to Vercel
- Go to: https://vercel.com
- Sign in with GitHub
- Click "Add New Project"
- Import: karthi2905/e-room
- Add environment variables (see below)
- Deploy

### 2. Environment Variables for Vercel
Copy these from your `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = [your_value]
CLERK_SECRET_KEY = [your_value]
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
NEXT_PUBLIC_STREAM_API_KEY = [your_value]
STREAM_SECRET_KEY = [your_value]
OPENAI_API_KEY = [your_value]
GEMINI_API_KEY = [your_value]
NEXT_PUBLIC_BASE_URL = https://e-room.tech
```

### 3. Connect Custom Domain (e-room.tech)

**In Vercel:**
1. Go to Settings → Domains
2. Add: `e-room.tech`
3. Add: `www.e-room.tech`

**DNS Configuration:**
Vercel will show you DNS records to add. Typically:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Where to add DNS records:**
- Login to your domain registrar (where you bought e-room.tech)
- Find DNS settings or DNS management
- Add the records shown by Vercel

### 4. Update Clerk & Stream.io

**Clerk Dashboard:**
- Add allowed origin: `https://e-room.tech`
- Add allowed origin: `https://www.e-room.tech`

**Stream.io Dashboard:**
- Add allowed origin: `https://e-room.tech`

---

## 🎯 Final Result
Your E-Room will be live at: **https://e-room.tech**

---

## ⏱️ Timeline
- GitHub push: 1 minute
- Vercel deployment: 3-5 minutes
- DNS propagation: 10 minutes - 48 hours (usually 30 minutes)

---

## 📞 Repository URL
https://github.com/karthi2905/e-room

## 🌐 Live URL (after deployment)
https://e-room.tech
