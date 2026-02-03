# How to Add Custom Domain (e-room.tech) to Vercel

## 📋 Prerequisites
- ✅ Code pushed to GitHub (karthi2905/e-room)
- ✅ Domain purchased (e-room.tech)
- ⏳ Vercel account (sign up if needed)
- ⏳ Project deployed to Vercel

---

## 🚀 Step-by-Step Guide

### **STEP 1: Deploy Your Project to Vercel First**

#### 1.1 Go to Vercel
- Open: [https://vercel.com](https://vercel.com)
- Click **"Sign Up"** or **"Login"**
- Choose **"Continue with GitHub"**
- Authorize Vercel to access your GitHub

#### 1.2 Import Your Repository
1. Click **"Add New Project"** (or **"Import Project"**)
2. You'll see a list of your GitHub repositories
3. Find **"karthi2905/e-room"**
4. Click **"Import"** next to it

#### 1.3 Configure Build Settings
Vercel will auto-detect Next.js settings:
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅

**Don't click Deploy yet!** Continue to Step 1.4

#### 1.4 Add Environment Variables
Click **"Environment Variables"** and add these **9 variables**:

**Copy values from your `.env.local` file:**

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `CLERK_SECRET_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Production, Preview, Development |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Production, Preview, Development |
| `NEXT_PUBLIC_STREAM_API_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `STREAM_SECRET_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `OPENAI_API_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `GEMINI_API_KEY` | [Copy from .env.local] | Production, Preview, Development |
| `NEXT_PUBLIC_BASE_URL` | `https://e-room.tech` | Production, Preview, Development |

**How to add each variable:**
1. Click **"Add Another"** or **"Add Environment Variable"**
2. Enter **Name** (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
3. Enter **Value** (copy from your .env.local file)
4. Check all three boxes: **Production**, **Preview**, **Development**
5. Click **"Add"**
6. Repeat for all 9 variables

#### 1.5 Deploy
1. After adding all environment variables
2. Click **"Deploy"**
3. Wait 2-3 minutes for build to complete
4. You'll get a temporary URL like: `e-room-xyz.vercel.app`
5. **Test it!** Make sure it works before adding custom domain

---

### **STEP 2: Add Custom Domain in Vercel**

#### 2.1 Go to Domain Settings
1. In Vercel dashboard, click on your **e-room** project
2. Click **"Settings"** (top menu)
3. Click **"Domains"** (left sidebar)

#### 2.2 Add Your Domain
1. You'll see a text box that says **"Enter domain"**
2. Type: `e-room.tech`
3. Click **"Add"**

#### 2.3 Add WWW Subdomain (Optional but Recommended)
1. Click **"Add"** again
2. Type: `www.e-room.tech`
3. Click **"Add"**

#### 2.4 Vercel Shows DNS Configuration
After adding the domain, Vercel will show you **DNS records** to configure.

You'll see something like:

```
To configure e-room.tech, add the following records to your DNS provider:

Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Don't close this page!** You'll need these values in Step 3.

---

### **STEP 3: Configure DNS at Your Domain Registrar**

**Where did you buy e-room.tech?** Choose your provider below:

---

#### **Option A: Namecheap**

1. **Login to Namecheap:** [https://www.namecheap.com/myaccount/login/](https://www.namecheap.com/myaccount/login/)
2. Go to **Domain List**
3. Click **"Manage"** next to **e-room.tech**
4. Click **"Advanced DNS"** tab
5. **Delete any existing A or CNAME records for @ and www**
6. Click **"Add New Record"**

**Add Record 1 (Root Domain):**
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic (or 300)
```

**Add Record 2 (WWW Subdomain):**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic (or 300)
```

7. Click **"Save All Changes"** (green checkmark)

---

#### **Option B: GoDaddy**

1. **Login to GoDaddy:** [https://sso.godaddy.com/](https://sso.godaddy.com/)
2. Go to **My Products**
3. Find **e-room.tech** and click **"DNS"**
4. **Delete any existing A or CNAME records for @ and www**
5. Click **"Add"**

**Add Record 1 (Root Domain):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600 seconds (or Custom)
```

**Add Record 2 (WWW Subdomain):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour
```

6. Click **"Save"**

---

#### **Option C: Porkbun**

1. **Login to Porkbun:** [https://porkbun.com/account/login](https://porkbun.com/account/login)
2. Go to **Domain Management**
3. Click on **e-room.tech**
4. Scroll to **DNS Records**
5. **Delete any existing A or CNAME records**
6. Click **"Add"**

**Add Record 1 (Root Domain):**
```
Type: A
Host: (leave blank or @)
Answer: 76.76.21.21
TTL: 600
```

**Add Record 2 (WWW Subdomain):**
```
Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 600
```

7. Click **"Submit"**

---

#### **Option D: Cloudflare**

1. **Login to Cloudflare:** [https://dash.cloudflare.com/login](https://dash.cloudflare.com/login)
2. Select **e-room.tech** domain
3. Click **"DNS"** → **"Records"**
4. **Delete any existing A or CNAME records for @ and www**
5. Click **"Add record"**

**Add Record 1 (Root Domain):**
```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only (GRAY CLOUD - IMPORTANT!)
TTL: Auto
```

**Add Record 2 (WWW Subdomain):**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (GRAY CLOUD - IMPORTANT!)
TTL: Auto
```

**⚠️ IMPORTANT:** Make sure the cloud icon is **GRAY** (DNS only), not orange!

6. Click **"Save"**

---

#### **Option E: Other Providers (Generic Instructions)**

1. Login to your domain registrar
2. Find **DNS Management** or **DNS Settings**
3. Delete existing A and CNAME records for your domain
4. Add these records:

```
Type: A
Name/Host: @ (or leave blank)
Value/Points to: 76.76.21.21
TTL: 300-600 (or Automatic)

Type: CNAME
Name/Host: www
Value/Points to: cname.vercel-dns.com
TTL: 300-600 (or Automatic)
```

5. Save changes

---

### **STEP 4: Wait for DNS Propagation**

#### 4.1 How Long?
- **Minimum:** 5-10 minutes
- **Average:** 30 minutes - 2 hours
- **Maximum:** 24-48 hours

#### 4.2 Check DNS Propagation
Visit: [https://www.whatsmydns.net/#A/e-room.tech](https://www.whatsmydns.net/#A/e-room.tech)

You should see **76.76.21.21** appearing in different locations around the world.

#### 4.3 Check in Vercel
1. Go back to Vercel → Your Project → Settings → Domains
2. You'll see your domain with a status:
   - 🟡 **Pending:** DNS not configured yet
   - 🟢 **Valid:** DNS configured correctly!

---

### **STEP 5: SSL Certificate (Automatic)**

Once DNS is verified:
- Vercel **automatically** issues a free SSL certificate
- This takes **1-5 minutes** after DNS verification
- Your site will be accessible at **https://e-room.tech** (with 🔒)

---

### **STEP 6: Update Clerk & Stream.io**

#### 6.1 Update Clerk
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your **E-Room** application
3. Go to **Configure** → **Allowed Origins**
4. Add:
   ```
   https://e-room.tech
   https://www.e-room.tech
   ```
5. Click **"Save"**

#### 6.2 Update Stream.io
1. Go to [Stream.io Dashboard](https://dashboard.getstream.io)
2. Select your application
3. Go to **App Settings** → **Security**
4. Add to **Allowed Origins:**
   ```
   https://e-room.tech
   ```
5. Click **"Save"**

---

### **STEP 7: Test Your Site**

Visit: **https://e-room.tech**

**Test Checklist:**
- [ ] Site loads (no errors)
- [ ] SSL certificate active (🔒 in browser)
- [ ] Sign in works
- [ ] Sign up works
- [ ] Can create a meeting
- [ ] Can join a meeting
- [ ] Video/audio works
- [ ] Screen sharing works
- [ ] Chat works
- [ ] Recordings work
- [ ] AI summary works

---

## 🎉 Success!

Your E-Room is now live at:
- **https://e-room.tech**
- **https://www.e-room.tech**

---

## 🔄 Automatic Deployments

Every time you push to GitHub, Vercel will automatically deploy:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel deploys in ~2 minutes automatically!

---

## 🐛 Troubleshooting

### Domain not working after 24 hours?
- Check DNS records match exactly: `76.76.21.21` and `cname.vercel-dns.com`
- Remove any proxy/CDN (Cloudflare: use gray cloud, not orange)
- Check for typos in DNS records

### SSL certificate not issued?
- Wait 5 minutes after DNS verification
- Check that DNS is fully propagated
- Try removing and re-adding domain in Vercel

### Authentication not working?
- Verify Clerk allowed origins include `https://e-room.tech`
- Check environment variables in Vercel
- Clear browser cache and try again

### Video not working?
- Verify Stream.io allowed origins
- Check browser permissions for camera/microphone
- Test in different browser

---

## 📞 Quick Links

- **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repo:** [https://github.com/karthi2905/e-room](https://github.com/karthi2905/e-room)
- **Clerk Dashboard:** [https://dashboard.clerk.com](https://dashboard.clerk.com)
- **Stream.io Dashboard:** [https://dashboard.getstream.io](https://dashboard.getstream.io)
- **Check DNS:** [https://www.whatsmydns.net](https://www.whatsmydns.net)

---

## ✅ Final Checklist

- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Custom domain added in Vercel
- [ ] DNS records configured
- [ ] DNS propagated
- [ ] SSL certificate issued
- [ ] Clerk origins updated
- [ ] Stream.io origins updated
- [ ] Site tested and working

---

**Your E-Room is ready to go live! 🚀**
