# Quick Start: Deploy E-Room to e-room.tech

## 🚀 3-Step Process

### STEP 1: Deploy to Vercel (5 minutes)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import `karthi2905/e-room`
4. Add environment variables (copy from .env.local)
5. Click Deploy

### STEP 2: Add Domain in Vercel (1 minute)
1. Go to Settings → Domains
2. Add `e-room.tech`
3. Add `www.e-room.tech`
4. Copy the DNS records Vercel shows you

### STEP 3: Configure DNS (2 minutes)
Go to where you bought e-room.tech and add:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📋 Environment Variables Needed

Copy these from your `.env.local` file:

1. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
2. CLERK_SECRET_KEY
3. NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
4. NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
5. NEXT_PUBLIC_STREAM_API_KEY
6. STREAM_SECRET_KEY
7. OPENAI_API_KEY
8. GEMINI_API_KEY
9. NEXT_PUBLIC_BASE_URL = https://e-room.tech

---

## ⏱️ Timeline

- Deploy to Vercel: 3-5 minutes
- Add domain: 1 minute
- Configure DNS: 2 minutes
- DNS propagation: 10 minutes - 2 hours
- SSL certificate: Automatic (5 minutes after DNS)

**Total time: ~30 minutes to 2 hours**

---

## 🎯 Where Did You Buy e-room.tech?

**Namecheap?** → Domain List → Manage → Advanced DNS
**GoDaddy?** → My Products → DNS
**Porkbun?** → Domain Management → DNS
**Cloudflare?** → Select domain → DNS → Records (use GRAY cloud!)

---

## ✅ After DNS is Set

1. Update Clerk: Add `https://e-room.tech` to allowed origins
2. Update Stream.io: Add `https://e-room.tech` to allowed origins
3. Test your site!

---

## 🌐 Your Site Will Be Live At:
- https://e-room.tech
- https://www.e-room.tech

---

**Need detailed instructions? See: HOW_TO_ADD_CUSTOM_DOMAIN.md**
