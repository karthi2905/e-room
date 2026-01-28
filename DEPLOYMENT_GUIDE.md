# E-Room Deployment Guide

## 🚀 Deploy to Vercel (Recommended for Next.js)

Vercel is the best choice for Next.js applications as it's made by the same team.

### Prerequisites
- GitHub account
- Your custom domain
- Environment variables ready

---

## Step 1: Prepare Your Project

### 1.1 Check Environment Variables
Make sure your `.env.local` file has all required keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here

# Stream.io Video
NEXT_PUBLIC_STREAM_API_KEY=your_key_here
STREAM_SECRET_KEY=your_secret_here

# Google Gemini AI
GEMINI_API_KEY=your_key_here

# App URL (update after deployment)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 1.2 Update Clerk URLs
In your Clerk Dashboard, you'll need to add your production domain later.

---

## Step 2: Push to GitHub

If not already done:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/e-room.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? e-room
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Add Environment Variables (see Step 4)
6. Click "Deploy"

---

## Step 4: Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your key | Production, Preview, Development |
| `CLERK_SECRET_KEY` | Your secret | Production, Preview, Development |
| `NEXT_PUBLIC_STREAM_API_KEY` | Your key | Production, Preview, Development |
| `STREAM_SECRET_KEY` | Your secret | Production, Preview, Development |
| `GEMINI_API_KEY` | Your key | Production, Preview, Development |
| `NEXT_PUBLIC_BASE_URL` | `https://yourdomain.com` | Production |

4. **Redeploy** after adding variables

---

## Step 5: Connect Your Custom Domain

### 5.1 Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain: `yourdomain.com`
4. Vercel will show you DNS records to add

### 5.2 Configure DNS (Your Domain Provider)

You'll need to add these DNS records in your domain registrar:

#### For Root Domain (`yourdomain.com`):

**Option A: A Record (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option B: CNAME (if A record not supported)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### For WWW Subdomain (`www.yourdomain.com`):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 5.3 Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours**
- Check status: [whatsmydns.net](https://www.whatsmydns.net)
- Vercel will automatically issue SSL certificate once DNS is verified

---

## Step 6: Update Clerk Configuration

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your E-Room application
3. Go to **API Keys** → **Allowed Origins**
4. Add your production domain:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
5. Go to **Paths** and update redirect URLs if needed

---

## Step 7: Update Stream.io Configuration

1. Go to [Stream.io Dashboard](https://dashboard.getstream.io)
2. Select your application
3. Add your production domain to allowed origins:
   - `https://yourdomain.com`

---

## Step 8: Test Your Deployment

### Checklist:
- [ ] Site loads at `https://yourdomain.com`
- [ ] SSL certificate is active (🔒 in browser)
- [ ] Authentication works (Clerk sign-in/sign-up)
- [ ] Can create a meeting
- [ ] Can join a meeting
- [ ] Video/audio works
- [ ] Screen sharing works
- [ ] Chat works
- [ ] Meeting recordings work
- [ ] AI summary generation works

---

## 🔄 Continuous Deployment

Once set up, every push to your `main` branch will automatically deploy to production!

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel will automatically deploy
```

---

## 🌐 DNS Configuration by Provider

### Namecheap
1. Login → Domain List → Manage
2. Advanced DNS → Add New Record
3. Add A and CNAME records as shown above

### GoDaddy
1. Login → My Products → DNS
2. Add Records → A or CNAME
3. Add records as shown above

### Porkbun
1. Login → Domain Management → DNS
2. Add → A Record or CNAME
3. Add records as shown above

### Cloudflare
1. Login → Select Domain → DNS
2. Add Record
3. Add A and CNAME records
4. **Important:** Set Proxy Status to "DNS Only" (gray cloud)

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# If successful, check Vercel build logs
```

### Environment Variables Not Working
- Make sure they're added in Vercel Dashboard
- Redeploy after adding variables
- Check variable names match exactly

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records: `nslookup yourdomain.com`
- Verify DNS records in domain provider match Vercel requirements

### Clerk Authentication Fails
- Check allowed origins in Clerk Dashboard
- Verify environment variables are correct
- Check browser console for errors

### Video Not Working
- Check Stream.io allowed origins
- Verify Stream.io API keys
- Check browser permissions for camera/mic

---

## 📊 Monitoring

### Vercel Analytics
- Go to your project → Analytics
- View page views, performance, and errors

### Vercel Logs
- Go to your project → Deployments → Select deployment → Logs
- View real-time logs and errors

---

## 💰 Costs

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Serverless functions

### Upgrade if you need:
- More bandwidth
- More serverless function execution time
- Team collaboration features

---

## 🔐 Security Checklist

- [ ] All API keys are in environment variables (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] HTTPS is enforced
- [ ] Clerk authentication is properly configured
- [ ] CORS is configured for Stream.io

---

## 📝 Post-Deployment

1. **Update README** with your live URL
2. **Test all features** thoroughly
3. **Monitor Vercel logs** for errors
4. **Set up custom error pages** (optional)
5. **Configure analytics** (optional)

---

## 🚀 Alternative: Deploy to Netlify

If you prefer Netlify:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Add environment variables in Netlify Dashboard
# Configure custom domain in Netlify
```

**Note:** Vercel is recommended for Next.js projects due to better optimization and serverless function support.

---

## 📞 Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Clerk Docs:** [clerk.com/docs](https://clerk.com/docs)
- **Stream.io Docs:** [getstream.io/video/docs](https://getstream.io/video/docs)

---

## ✅ Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables ready
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] Custom domain added in Vercel
- [ ] DNS records configured
- [ ] Clerk origins updated
- [ ] Stream.io origins updated
- [ ] Deployment tested
- [ ] All features working

---

**Ready to deploy? Let's do this! 🚀**
