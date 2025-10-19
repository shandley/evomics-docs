# Repository Rename Guide

This guide walks through renaming the repository from `unix-for-biologists` to `evomics-docs` on GitHub and updating the Vercel deployment.

## What's Been Updated in the Codebase

All code references have been updated to use the new repository name:

- ✅ `package.json` - name, repository URL, homepage, and keywords
- ✅ `README.md` - comprehensive rewrite for multi-guide architecture
- ✅ `lib/layout.shared.tsx` - GitHub URL in navigation
- ✅ `CONTRIBUTING.md` - development standards and guidelines
- ✅ `GUIDE_TEMPLATE.md` - template for adding new guides

## Step 1: Rename GitHub Repository

### On GitHub:

1. Go to your repository: https://github.com/shandley/unix-for-biologists
2. Click **Settings** (in the repository menu)
3. Scroll down to the **Repository name** section
4. Change the name from `unix-for-biologists` to `evomics-docs`
5. Click **Rename**

**Important**: GitHub automatically redirects old URLs to the new repository name, so existing links won't break immediately.

### On Your Local Machine:

After renaming on GitHub, update your local repository's remote URL:

```bash
# Navigate to your repository
cd /Users/scotthandley/Code/unix-for-biologists

# Update the remote URL
git remote set-url origin https://github.com/shandley/evomics-docs.git

# Verify the change
git remote -v
```

**Optional**: Rename your local directory to match:

```bash
# Navigate to parent directory
cd /Users/scotthandley/Code

# Rename the directory
mv unix-for-biologists evomics-docs

# Navigate into the renamed directory
cd evomics-docs
```

## Step 2: Update Vercel Project

### Option A: Automatic Update (Recommended)

Vercel will automatically detect the repository rename because it's connected via GitHub integration:

1. Go to https://vercel.com/dashboard
2. Find your `unix-for-biologists` project
3. Vercel should automatically update the Git connection to the new repository name
4. Verify by checking **Settings** → **Git** - it should show `shandley/evomics-docs`

### Option B: Manual Update (If Needed)

If Vercel doesn't automatically detect the rename:

1. Go to https://vercel.com/dashboard
2. Select the `unix-for-biologists` project
3. Go to **Settings** → **General**
4. Scroll to **Project Name** and rename to `evomics-docs`
5. Click **Save**
6. Go to **Settings** → **Git**
7. Disconnect and reconnect the repository if the URL shows the old name

## Step 3: Verify Everything Works

### Check GitHub:

- [ ] Repository URL is now https://github.com/shandley/evomics-docs
- [ ] Old URL https://github.com/shandley/unix-for-biologists redirects to new URL
- [ ] README displays correctly on GitHub
- [ ] All links in README work

### Check Local Repository:

```bash
# Verify remote URL is updated
git remote -v
# Should show: https://github.com/shandley/evomics-docs.git

# Pull to ensure connection works
git pull

# Push a test commit (if you have changes)
git add .
git commit -m "docs: update repository name to evomics-docs"
git push
```

### Check Vercel:

- [ ] Project name shows `evomics-docs` (or updated name)
- [ ] Git integration points to `shandley/evomics-docs`
- [ ] Next deployment uses the new repository
- [ ] Site still works at https://docs.evomics.org
- [ ] GitHub link in site navigation points to new URL

## Step 4: Commit and Deploy Changes

Now that everything is renamed, commit the codebase updates:

```bash
# Stage all the updated files
git add package.json README.md CONTRIBUTING.md GUIDE_TEMPLATE.md lib/layout.shared.tsx REPOSITORY_RENAME_GUIDE.md

# Commit with descriptive message
git commit -m "docs: rename repository to evomics-docs and add development standards

- Update package.json with new repository URL and metadata
- Rewrite README for multi-guide architecture
- Add comprehensive CONTRIBUTING.md with development standards
- Add GUIDE_TEMPLATE.md for standardized guide creation
- Update GitHub URL in navigation
- Add repository rename guide"

# Push to GitHub
git push
```

Vercel will automatically deploy the changes when you push to the `main` branch.

## Step 5: Update Any External References (Optional)

If you've shared links or references to the old repository:

- Update any bookmarks to the new URL
- Update documentation or presentations that reference the old name
- Notify collaborators of the name change

**Note**: GitHub redirects mean old links will still work, but it's good practice to update them.

## Troubleshooting

### Issue: Git push fails with authentication error

**Solution**: Update the remote URL as shown in Step 1.

```bash
git remote set-url origin https://github.com/shandley/evomics-docs.git
```

### Issue: Vercel still shows old repository name

**Solution**:
1. Go to Vercel project Settings → Git
2. Disconnect the repository
3. Reconnect and select `shandley/evomics-docs`

### Issue: Local directory name doesn't match repository

This is fine! The directory name on your local machine doesn't have to match the repository name. However, you can rename it as shown in Step 1 (Optional) if you prefer consistency.

### Issue: Can't find the repository on GitHub

Make sure you're looking at the new URL: https://github.com/shandley/evomics-docs

The old URL should redirect automatically.

## Summary

After completing these steps:

- ✅ GitHub repository renamed to `evomics-docs`
- ✅ Local git remote updated
- ✅ Vercel project updated
- ✅ All code references updated
- ✅ Changes committed and deployed
- ✅ Site continues to work at https://docs.evomics.org

The repository is now properly named and ready for future guides (R, Virome, Statistics, etc.) to be added to the unified documentation platform.
