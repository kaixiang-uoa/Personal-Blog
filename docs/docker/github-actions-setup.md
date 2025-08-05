# GitHub Actions CI/CD Setup Guide

This guide explains how to set up GitHub Actions for automatic Docker image building and deployment.

## 🔧 Prerequisites

1. **GitHub Repository**: Your code should be pushed to a GitHub repository
2. **Docker Hub Account**: You need a Docker Hub account (username: `kxzhang220`)
3. **Docker Hub Access Token**: Create a personal access token for GitHub Actions

## 🔐 Step 1: Create Docker Hub Access Token

1. Go to [Docker Hub](https://hub.docker.com/)
2. Sign in with your account (`kxzhang220`)
3. Click on your username → **Account Settings**
4. Navigate to **Security** tab
5. Click **New Access Token**
6. Token description: `GitHub Actions - Personal Blog`
7. Access permissions: **Read, Write, Delete**
8. Click **Generate**
9. **⚠️ Copy the token immediately** (you won't see it again)

## 🔑 Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `DOCKER_HUB_USERNAME` | `kxzhang220` | Your Docker Hub username |
| `DOCKER_HUB_TOKEN` | `dckr_pat_xxxxx...` | The access token from Step 1 |

### Secret Configuration Steps:

```bash
# Secret 1: DOCKER_HUB_USERNAME
Name: DOCKER_HUB_USERNAME
Value: kxzhang220

# Secret 2: DOCKER_HUB_TOKEN  
Name: DOCKER_HUB_TOKEN
Value: [Your Docker Hub Access Token]
```

## 🚀 Step 3: Workflow Triggers

The GitHub Actions workflow will automatically trigger on:

### Automatic Triggers:
- **Push to main branch** with changes in `Back-end/` directory
- **Pull Request** to main branch with backend changes
- **Manual dispatch** (you can trigger it manually)

### Workflow Behavior:
- **On PR**: Only build and test (no push to Docker Hub)
- **On main push**: Build, test, and push to Docker Hub
- **Manual trigger**: Build, test, and push to Docker Hub

## 📊 Step 4: Workflow Jobs

### Job 1: Build and Test
- Builds Docker image
- Starts MongoDB container for testing
- Runs application container
- Tests health endpoint (`/api/v1/health`)
- Cleans up test containers

### Job 2: Push to Docker Hub
- Only runs on main branch pushes
- Logs into Docker Hub using secrets
- Builds and pushes image with multiple tags:
  - `latest` (for main branch)
  - `main-<commit-sha>` (for versioning)
- Uses Docker layer caching for faster builds

### Job 3: Notification
- Notifies success/failure status
- Provides deployment-ready information

## 🔍 Step 5: Verify Setup

### Test the Workflow:

1. **Make a small change** to backend code
2. **Commit and push** to main branch:
   ```bash
   git add .
   git commit -m "test: trigger GitHub Actions workflow"
   git push origin main
   ```

3. **Check workflow status**:
   - Go to your GitHub repository
   - Click **Actions** tab
   - You should see the workflow running

4. **Verify Docker Hub**:
   - After successful workflow
   - Check [your Docker Hub repository](https://hub.docker.com/r/kxzhang220/blog-backend)
   - New image should be available with `latest` tag

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Authentication Failed
```
Error: Login failed
```
**Solution**: Check if `DOCKER_HUB_USERNAME` and `DOCKER_HUB_TOKEN` secrets are correctly set.

#### 2. Build Context Not Found
```
Error: failed to solve: failed to read dockerfile
```
**Solution**: Ensure the workflow file path is correct: `./Back-end/Dockerfile`

#### 3. Health Check Failed
```
Error: curl: (7) Failed to connect to localhost port 3002
```
**Solution**: The application might need more time to start. Increase sleep time in workflow.

#### 4. MongoDB Connection Failed
```
Error: MongoDB connection failed
```
**Solution**: Ensure MongoDB container is fully started before running app container.

### Debug Steps:

1. **Check workflow logs** in GitHub Actions tab
2. **Verify secrets** are properly configured
3. **Test locally** with the same Docker commands
4. **Check Docker Hub** permissions and token validity

## 🎯 Next Steps

After successful setup:

1. **Test the full workflow** with a real code change
2. **Set up Oracle Cloud deployment** to pull the latest image
3. **Configure automatic deployment** triggers (optional)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)
- [Docker Build Push Action](https://github.com/docker/build-push-action)

---

**✅ Once configured, every `git push` to main will automatically build and deploy your Docker image!**