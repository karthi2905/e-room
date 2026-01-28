# E-Room Deployment to e-room.tech

## Quick Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `e-room`
3. Description: "Video conferencing platform with AI-powered features"
4. Set to **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push Code to GitHub

After creating the repository, run these commands:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/e-room.git

# Stage all changes
git add .

# Commit changes
git commit -m "Initial commit - E-Room video conferencing app"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with GitHub
3. Click **"Add New Project"**
4. **Import** your `e-room` repository
5. Configure:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Add Environment Variables** (click "Environment Variables"):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = [your_clerk_publishable_key]
CLERK_SECRET_KEY = [your_clerk_secret_key]
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
NEXT_PUBLIC_STREAM_API_KEY = [your_stream_api_key]
STREAM_SECRET_KEY = [your_stream_secret_key]
OPENAI_API_KEY = [your_openai_key]
GEMINI_API_KEY = [your_gemini_key]
NEXT_PUBLIC_BASE_URL = https://e-room.tech
```

7. Click **"Deploy"**
8. Wait for deployment to complete (~2-3 minutes)

#### Option B: Using Vercel CLI (Faster)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts and add environment variables when asked
```

### Step 4: Connect Custom Domain (e-room.tech)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `e-room.tech`
   - Also add: `www.e-room.tech`
   - Click **"Add"**

2. **Vercel will show DNS records to configure**

### Step 5: Configure DNS Records

**Where did you buy e-room.tech from?**

#### If from Namecheap:
1. Login to Namecheap
2. Go to **Domain List** → **Manage** (for e-room.tech)
3. Go to **Advanced DNS** tab
4. Add these records:

```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### If from GoDaddy:
1. Login to GoDaddy
2. Go to **My Products** → **DNS**
3. Add these records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

#### If from Porkbun:
1. Login to Porkbun
2. Go to **Domain Management** → **DNS**
3. Add these records:

```
Type: A
Host: (blank or @)
Answer: 76.76.21.21
TTL: 600

Type: CNAME
Host: www
Answer: cname.vercel-dns.com
TTL: 600
```

#### If from Cloudflare:
1. Login to Cloudflare
2. Select **e-room.tech** domain
3. Go to **DNS** → **Records**
4. Add these records:

```
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only (gray cloud)
TTL: Auto

Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud)
TTL: Auto
```

**Important:** Make sure proxy is OFF (gray cloud) for Cloudflare!

### Step 6: Wait for DNS Propagation

- DNS changes take **5 minutes to 48 hours**
- Usually works within **10-30 minutes**
- Check status: [whatsmydns.net](https://www.whatsmydns.net/?query=e-room.tech)
- Vercel will automatically issue SSL certificate

### Step 7: Update Clerk Configuration

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Select your E-Room application
3. Go to **API Keys** → **Allowed Origins**
4. Add these URLs:
   ```
   https://e-room.tech
   https://www.e-room.tech
   ```
5. Save changes

### Step 8: Update Stream.io Configuration

1. Go to [dashboard.getstream.io](https://dashboard.getstream.io)
2. Select your application
3. Add to allowed origins:
   ```
   https://e-room.tech
   ```

### Step 9: Test Your Deployment

Visit: **https://e-room.tech**

Test checklist:
- [ ] Site loads correctly
- [ ] SSL certificate active (🔒)
- [ ] Sign in/Sign up works
- [ ] Can create a meeting
- [ ] Can join a meeting
- [ ] Video/audio works
- [ ] Screen sharing works
- [ ] Chat works
- [ ] Recordings work
- [ ] AI summary works

---

## 🔄 Future Updates

After initial deployment, any push to GitHub will auto-deploy:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically deploy your changes!

---

## 🐛 Troubleshooting

### Domain not working?
- Wait 24 hours for DNS propagation
- Check DNS: `nslookup e-room.tech`
- Verify DNS records match exactly

### Build fails?
- Check Vercel deployment logs
- Test locally: `npm run build`
- Verify all environment variables are added

### Authentication fails?
- Check Clerk allowed origins
- Verify environment variables
- Check browser console for errors

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Verify all environment variables
4. Check DNS propagation status

---

**Your E-Room will be live at: https://e-room.tech** 🚀
