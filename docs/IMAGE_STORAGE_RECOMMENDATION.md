# Image Storage Recommendation: DigitalOcean Droplet vs Spaces

## Your Current Situation

- **~10,000 cards** with **3 image sizes each** (small, normal, large)
- **~30,000 total images** to store
- Currently referencing third-party URLs (lorcast.io)
- Using **Nuxt Image** module for optimization
- Running on **DigitalOcean Droplet**

## Storage Requirements Estimate

Assuming typical card image sizes:

- **Small**: ~50-100KB each = ~500MB-1GB total
- **Normal**: ~150-300KB each = ~1.5-3GB total
- **Large**: ~300-600KB each = ~3-6GB total

**Total Estimated Storage**: **~5-10GB** (all sizes combined)

If you only store one size (normal) and let Nuxt Image handle resizing:

- **Single size**: **~1.5-3GB**

---

## Recommendation: **DigitalOcean Spaces** ✅

### Why Spaces is Better for Your Use Case

| Feature           | Droplet Storage                     | DigitalOcean Spaces               |
| ----------------- | ----------------------------------- | --------------------------------- |
| **CDN Delivery**  | ❌ No CDN                           | ✅ Built-in CDN (faster globally) |
| **Serving Files** | ⚠️ Serves through app server        | ✅ Direct static file serving     |
| **Bandwidth**     | ⚠️ Counts against droplet bandwidth | ✅ Separate bandwidth pool        |
| **Scalability**   | ❌ Limited to droplet disk size     | ✅ Virtually unlimited            |
| **Backup**        | ⚠️ Manual backup required           | ✅ Automatic versioning           |
| **Cost**          | ✅ Included                         | ⚠️ ~$5/month + storage            |
| **Complexity**    | ✅ Simple (file system)             | ⚠️ S3-compatible API              |
| **Performance**   | ⚠️ Limited by droplet               | ✅ Optimized for static files     |

### Key Benefits for Your Project

1. **CDN Performance**
   - Images delivered from edge locations worldwide
   - Much faster for users far from your droplet
   - Your Nuxt Image module works perfectly with Spaces URLs

2. **Scalability**
   - No need to worry about droplet disk space
   - As you add more sets/cards, storage scales automatically
   - Can store all 3 sizes without concerns

3. **Separation of Concerns**
   - App server handles app logic
   - Spaces handles static assets
   - If you need to rebuild/migrate droplet, images are safe

4. **Bandwidth Management**
   - Image bandwidth doesn't count against droplet bandwidth
   - Separate billing (predictable costs)

5. **Integration with Nuxt Image**
   - Nuxt Image can optimize images from Spaces
   - Works seamlessly with S3-compatible storage

---

## When Droplet Storage is Acceptable

Droplet storage is fine if:

- ✅ Small scale (< 5GB images)
- ✅ Low traffic (< 1000 visitors/day)
- ✅ All users in same region as droplet
- ✅ Simple deployment (no CDN needed)
- ✅ Cost is primary concern

**For your use case**: With ~10k cards and potential growth, Spaces is recommended.

---

## Cost Comparison

### DigitalOcean Droplet Storage

- **Included** in droplet cost
- No additional cost for storage
- But: Limited by droplet plan (typically 25GB-320GB SSD)

### DigitalOcean Spaces

- **Storage**: $5/month base + $0.02/GB per month
- **Bandwidth**: First 1TB free, then $0.01/GB
- **Example costs**:
  - 10GB storage: ~$5.20/month
  - 20GB storage: ~$5.40/month
  - With moderate traffic: ~$5-10/month total

**Verdict**: ~$5-10/month is reasonable for the benefits.

---

## Implementation Approach

### Option A: DigitalOcean Spaces (Recommended)

#### Setup Steps

1. **Create Spaces Bucket**

   ```
   - Name: `lorcanalogy-images` (or similar)
   - Region: Same as your droplet (for faster uploads)
   - Enable CDN: Yes
   ```

2. **Folder Structure**

   ```
   lorcanalogy-images/
   ├── cards/
   │   ├── small/
   │   │   ├── crd_xxx.avif
   │   │   └── ...
   │   ├── normal/
   │   │   ├── crd_xxx.avif
   │   │   └── ...
   │   └── large/
   │       ├── crd_xxx.avif
   │       └── ...
   ```

3. **Access via CDN URL**
   ```
   https://lorcanalogy-images.nyc3.cdn.digitaloceanspaces.com/cards/normal/crd_xxx.avif
   ```

#### Download Script Structure

```typescript
// prisma/scripts/download-images.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const s3Client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "nyc3",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY!,
    secretAccessKey: process.env.SPACES_SECRET_KEY!,
  },
});

async function downloadAndUploadCardImage(
  cardId: string,
  imageUrl: string,
  size: "small" | "normal" | "large"
) {
  // Download image
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

  // Upload to Spaces
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "lorcanalogy-images",
      Key: `cards/${size}/${cardId}.avif`,
      Body: Buffer.from(response.data),
      ContentType: "image/avif",
      ACL: "public-read", // Make publicly accessible
    })
  );

  // Return CDN URL
  return `https://lorcanalogy-images.nyc3.cdn.digitaloceanspaces.com/cards/${size}/${cardId}.avif`;
}
```

#### Update Schema

```prisma
model Card {
  // ...
  imageSmall  String?  // CDN URL to small image
  imageNormal String?  // CDN URL to normal image
  imageLarge  String?  // CDN URL to large image
  // OR single field if using Nuxt Image resizing:
  image       String?  // CDN URL to normal size, Nuxt Image handles resizing
}
```

#### Nuxt Image Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  image: {
    // Spaces works with Nuxt Image out of the box
    domains: ["lorcanalogy-images.nyc3.cdn.digitaloceanspaces.com"],
    // Or use provider:
    providers: {
      spaces: {
        provider: "ipx", // Nuxt Image's built-in provider
        // Will optimize images from Spaces
      },
    },
  },
});
```

### Option B: Droplet Storage (Simpler, but Limited)

#### Setup Steps

1. **Create Directory Structure**

   ```
   /var/www/lorcanalogy/images/
   ├── cards/
   │   ├── small/
   │   ├── normal/
   │   └── large/
   ```

2. **Nginx Configuration** (serve static files directly)

   ```nginx
   location /images/ {
     alias /var/www/lorcanalogy/images/;
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

3. **Download Script**

   ```typescript
   // prisma/scripts/download-images.ts
   import axios from "axios";
   import fs from "fs";
   import path from "path";

   const IMAGE_DIR = "/var/www/lorcanalogy/images";

   async function downloadCardImage(
     cardId: string,
     imageUrl: string,
     size: "small" | "normal" | "large"
   ) {
     const response = await axios.get(imageUrl, { responseType: "stream" });
     const filePath = path.join(IMAGE_DIR, "cards", size, `${cardId}.avif`);

     // Ensure directory exists
     await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

     // Save file
     const writer = fs.createWriteStream(filePath);
     response.data.pipe(writer);

     return `/images/cards/${size}/${cardId}.avif`;
   }
   ```

4. **Watch Disk Space**
   ```bash
   # Monitor disk usage
   df -h
   # Alert when > 80% full
   ```

---

## Recommended Implementation Plan

### Phase 1: Setup Spaces

1. **Create Spaces Bucket** in DigitalOcean
   - Enable CDN
   - Set public read access
   - Note endpoint and keys

2. **Add Environment Variables**

   ```env
   SPACES_ACCESS_KEY=your_access_key
   SPACES_SECRET_KEY=your_secret_key
   SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com
   SPACES_BUCKET=lorcanalogy-images
   SPACES_CDN_URL=https://lorcanalogy-images.nyc3.cdn.digitaloceanspaces.com
   ```

3. **Install AWS SDK** (S3-compatible)
   ```bash
   npm install @aws-sdk/client-s3
   ```

### Phase 2: Download & Upload Script

1. **Create Bulk Download Script**
   - Read all cards from database
   - Download images from lorcast.io
   - Upload to Spaces
   - Update database with new URLs

2. **Script Structure**
   ```typescript
   // prisma/scripts/bulk-download-images.ts
   // - Fetches all cards
   // - Downloads each image (3 sizes)
   // - Uploads to Spaces
   // - Updates Card records
   // - Progress tracking
   // - Error handling & retry logic
   ```

### Phase 3: Update Schema & Code

1. **Add image fields to Card model**

   ```prisma
   imageSmall  String?
   imageNormal String?
   imageLarge  String?
   ```

2. **Update import script** to download images during card import

3. **Update components** to use new image URLs

---

## Migration Strategy

### Option 1: Bulk Download (Recommended)

- Download all images during maintenance window
- Upload to Spaces
- Update database in batch
- Switch URLs in one deployment

### Option 2: Lazy Loading

- Download images on-demand when cards are accessed
- Cache in Spaces
- Gradual migration

---

## Additional Considerations

### Image Format

- Current: `.avif` (excellent compression)
- Recommendation: Keep `.avif` format
- Nuxt Image can convert if needed

### Optimization

- Nuxt Image handles optimization automatically
- Spaces CDN provides caching
- Consider image compression during upload

### Backup Strategy

- Spaces: Built-in versioning
- Droplet: Regular backups to Spaces or external storage

### Monitoring

- Monitor Spaces bandwidth usage
- Set up alerts for unusual traffic
- Track storage growth

---

## Decision Matrix

**Use Spaces if:**

- ✅ You want best performance (CDN)
- ✅ You expect growth (> 10k cards)
- ✅ You want scalability
- ✅ $5-10/month is acceptable

**Use Droplet Storage if:**

- ✅ You want simplest setup
- ✅ You have < 5GB images
- ✅ Cost is primary concern
- ✅ All users are in same region

---

## Recommendation Summary

**For your project (~10k cards, potential growth):**

✅ **Use DigitalOcean Spaces** because:

1. CDN provides better performance globally
2. Scales with your data
3. Separates static assets from app server
4. Cost is reasonable (~$5-10/month)
5. Works seamlessly with Nuxt Image

The slight additional complexity is worth the performance and scalability benefits.

---

## Next Steps

1. **Review this recommendation**
2. **Create Spaces bucket** (if going with Spaces)
3. **Write download/upload script**
4. **Test with sample images**
5. **Run bulk download** (maintenance window)
6. **Update schema and code**
7. **Deploy**

Need help implementing any of these steps? Let me know!
