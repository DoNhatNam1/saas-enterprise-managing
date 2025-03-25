# Environment Variables Setup Guide

## Overview
This guide explains how to set up environment variables for the PayloadCMS deployment using GitHub Actions and AWS EKS.

## GitHub Actions Configuration

### Setting Up Secrets
1. Navigate to your GitHub repository
2. Go to **Settings** > **Secrets and variables** > **Actions**
3. Click "New repository secret"
4. Add the following secrets:

#### AWS Credentials (Required for ECR)
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
  ```bash
  # Get AWS credentials
  aws configure list
  # or check ~/.aws/credentials
  ```

#### Database Configuration
- `DATABASE_URI`: Your NeonDB connection string
  ```
  postgresql://neondb_owner:2PXiQHCa6eEb@ep-tight-cell-a1hdoys4.ap-southeast-1.aws.neon.tech/saas_db?sslmode=require
  ```
- `PAYLOAD_SECRET`: JWT encryption key
  ```
  f314752e99f2fae4372a57db
  ```

#### UploadThing Configuration
- `UPLOADTHING_SECRET`: Your UploadThing secret key
  ```
  sk_live_e13fabc7def591f1079baf23f6ddcfebb8985e8032d9de168437c8e23c57b7ff
  ```
- `UPLOADTHING_APP_ID`: Your UploadThing app ID
  ```
  4361ag5x7x
  ```

#### Payment Gateway
- `APPID`: Your ZaloPay app ID
  ```
  2554
  ```
- `KEY1`: ZaloPay key 1
  ```
  sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn
  ```
- `KEY2`: ZaloPay key 2
  ```
  trMrHtvjo6myautxDUiAcYsVtaeQ8nhf
  ```

#### Email Service (Resend)
- `RESEND_SENDER_EMAIL`: Sender email address
  ```
  namnhatvt2595@resend.dev
  ```
- `RESEND_API_KEY`: Resend API key
  ```
  re_4AiApqw5_M2fFUyssPZFcshfBTwgkjHgS
  ```

#### Kinde Authentication
- `KINDE_CLIENT_ID`: Kinde client ID
  ```
  4e0d0b6f80f24785aa1d932927a06f6c
  ```
- `KINDE_CLIENT_SECRET`: Kinde client secret
  ```
  zxo6FqcQxyJ5c8FiK4wPAAWvNWQ537oaQDDukY9OrYCe5peFFY0G
  ```
- `KINDE_ISSUER_URL`: Kinde issuer URL
  ```
  https://weldingstorestestingweb.kinde.com
  ```

### Setting Up Public Variables
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Select the "Variables" tab
3. Click "New repository variable"
4. Add these public variables:

#### Next.js Public URLs
- `NEXT_PUBLIC_SERVER_URL`: Backend API URL
  ```
  https://be.weldingstoreswebtest.com
  ```
- `NEXT_PUBLIC_UPLOADTHING_URL`: UploadThing endpoint
  ```
  https://be.weldingstoreswebtest.com
  ```
- `NEXT_PUBLIC_KINDE_SITE_URL`: Kinde authentication URL
  ```
  https://be.weldingstoreswebtest.com
  ```

## Verification Steps

1. Check if all secrets are set:
```bash
# List all secrets (names only)
gh secret list
```

2. Check if all variables are set:
```bash
# List all variables
gh variable list
```

3. Verify GitHub Actions workflow:
```bash
# Check workflow status
gh run list
```

## Additional Notes

- All URLs should use HTTPS in production
- Keep secrets secure and never commit them to the repository
- Update secrets immediately if compromised
- Use different values for development and production environments

## Troubleshooting

If you encounter issues:

1. Check GitHub Actions logs for build errors
2. Verify all secrets and variables are properly set
3. Ensure AWS credentials have proper permissions
4. Confirm all URLs are accessible
5. Check EKS cluster connectivity