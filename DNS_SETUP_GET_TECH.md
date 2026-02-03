# Configure DNS for e-room.tech on Get.tech (Radix)

## 🎯 Step-by-Step Instructions for Get.tech

### **STEP 1: Login to Get.tech**

1. Go to: [https://get.tech](https://get.tech)
2. Click **"Sign In"** (top right)
3. Enter your email and password
4. Click **"Login"**

---

### **STEP 2: Access DNS Management**

1. After logging in, you'll see your dashboard
2. Find **"e-room.tech"** in your domain list
3. Click on **"e-room.tech"** or click **"Manage"**
4. Look for **"DNS Management"** or **"DNS Settings"** or **"Nameservers"**
5. Click on **"DNS Management"**

---

### **STEP 3: Check Nameservers**

Before adding DNS records, make sure you're using Get.tech nameservers:

**If you see custom nameservers (like Cloudflare):**
- You need to add DNS records at that provider instead
- Skip to the bottom of this guide

**If you see Get.tech/Radix nameservers:**
- Continue with Step 4 below

---

### **STEP 4: Delete Existing Records (If Any)**

1. Look for existing **A records** or **CNAME records** for:
   - `@` or root domain
   - `www`
2. **Delete them** (click trash/delete icon)
3. This prevents conflicts

---

### **STEP 5: Add DNS Records**

#### **Record 1: Root Domain (A Record)**

Click **"Add Record"** or **"Add New Record"**

Fill in:
```
Type: A
Host/Name: @ (or leave blank, or "e-room.tech")
Value/Points to/IP Address: 76.76.21.21
TTL: 3600 (or Auto/Default)
```

Click **"Add"** or **"Save"**

---

#### **Record 2: WWW Subdomain (CNAME Record)**

Click **"Add Record"** or **"Add New Record"** again

Fill in:
```
Type: CNAME
Host/Name: www
Value/Points to/Target: cname.vercel-dns.com
TTL: 3600 (or Auto/Default)
```

**Important:** 
- Do NOT add a dot (.) at the end of `cname.vercel-dns.com`
- Some providers auto-add it, that's fine

Click **"Add"** or **"Save"**

---

### **STEP 6: Save Changes**

1. Look for a **"Save Changes"** or **"Apply Changes"** button
2. Click it to confirm
3. You should see a success message

---

### **STEP 7: Verify Your DNS Records**

Your DNS records should now look like this:

| Type | Host/Name | Value/Points To | TTL |
|------|-----------|-----------------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

---

### **STEP 8: Wait for DNS Propagation**

⏱️ **Timeline:**
- **Minimum:** 5-10 minutes
- **Average:** 30 minutes - 1 hour
- **Maximum:** 24-48 hours

#### Check DNS Propagation:
1. Visit: [https://www.whatsmydns.net/#A/e-room.tech](https://www.whatsmydns.net/#A/e-room.tech)
2. You should see **76.76.21.21** appearing globally
3. Also check: [https://www.whatsmydns.net/#CNAME/www.e-room.tech](https://www.whatsmydns.net/#CNAME/www.e-room.tech)
4. You should see **cname.vercel-dns.com**

---

### **STEP 9: Check Vercel**

1. Go back to Vercel: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Go to your **e-room** project
3. Click **Settings** → **Domains**
4. Click **"Refresh"** next to your domains
5. Status should change from **"Invalid Configuration"** to **"Valid"** ✅

---

### **STEP 10: Wait for SSL Certificate**

Once DNS is verified (status shows "Valid"):
- Vercel automatically issues a free SSL certificate
- This takes **1-5 minutes**
- Your site will be accessible at **https://e-room.tech** 🔒

---

## 🎉 Success!

Your E-Room will be live at:
- **https://e-room.tech**
- **https://www.e-room.tech**

---

## 🔄 If Using Custom Nameservers

If Get.tech shows you're using **custom nameservers** (like Cloudflare, etc.):

1. **Check which nameservers you're using**
2. **Login to that provider** (e.g., Cloudflare)
3. **Add DNS records there** instead

**Common scenarios:**

### If Using Cloudflare:
1. Login to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select **e-room.tech**
3. Go to **DNS** → **Records**
4. Add the same A and CNAME records
5. **IMPORTANT:** Set Proxy status to **"DNS only"** (GRAY cloud, not orange!)

### If Using Other Nameservers:
- Login to that provider
- Add the same DNS records there

---

## 🐛 Troubleshooting

### "Record already exists" error?
- Delete the existing record first
- Then add the new one

### Can't find DNS Management?
- Look for: "DNS Settings", "DNS Records", "Manage DNS", "Nameservers"
- Contact Get.tech support if you can't find it

### DNS not propagating after 24 hours?
- Double-check the IP address: `76.76.21.21` (no typos!)
- Double-check CNAME: `cname.vercel-dns.com` (no typos!)
- Clear your browser cache
- Try a different browser or incognito mode

### Still showing "Invalid Configuration"?
- Wait 30 minutes and click "Refresh" in Vercel
- Check DNS propagation at whatsmydns.net
- Verify you added records to the correct provider

---

## 📞 Get.tech Support

If you need help:
- **Support:** [https://get.tech/support](https://get.tech/support)
- **Email:** support@get.tech
- **Knowledge Base:** [https://get.tech/help](https://get.tech/help)

---

## ✅ Final Checklist

- [ ] Logged into Get.tech
- [ ] Found DNS Management
- [ ] Deleted old A/CNAME records
- [ ] Added A record: @ → 76.76.21.21
- [ ] Added CNAME record: www → cname.vercel-dns.com
- [ ] Saved changes
- [ ] Waited for DNS propagation
- [ ] Verified in Vercel (status: Valid)
- [ ] SSL certificate issued
- [ ] Site live at https://e-room.tech

---

**Your E-Room will be live soon! 🚀**
