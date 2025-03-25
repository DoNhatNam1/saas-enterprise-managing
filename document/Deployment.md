# Deployment Guide for Payload CMS on AWS EKS

## Prerequisites
- AWS CLI installed and configured 
- kubectl installed
- Terraform installed
- Docker installed
- Git installed

## Project Structure
```plaintext
.
├── .github/
│   └── workflows/
│       └── ci-cd.yaml           # GitHub Actions workflow for ECR
├── terraform-deploy/            # Infrastructure deployment
│   ├── terraform/
│   │   ├── step-0/             # Base infrastructure (VPC, EKS, etc.)
│   │   └── step-2/             # Additional components (ALB, etc.)
│   ├── kubernetes/
│   │   └── saas-enterprise-managing/
│   │       ├── namespace.yml
│   │       ├── configmap.yml   # Public environment variables
│   │       ├── secret.yml      # Private environment variables
│   │       ├── deployment.yml  # Main application deployment
│   │       ├── service.yml     # Service configuration
│   │       ├── ingress.yml     # ALB Ingress configuration
│   │       └── hpa.yaml        # Horizontal Pod Autoscaling
│   ├── scripts/
│   │   └── setup-env.sh        # Environment setup script
│   ├── clusterRoles/
│   │   └── 0-viewer-cluster-role.yml
│   └── commands.txt            # Useful kubectl commands
├── document/                    # Documentation
│   ├── Deployment.md           # This deployment guide
│   └── setup-env.md           # Environment variables guide
├── src/                        # Application source code
├── Dockerfile                  # Multi-stage build configuration
└── .env.example               # Example environment variables
```

## Step-by-Step Deployment Guide

### 1. Infrastructure Setup

```bash
# Navigate to terraform directory
cd terraform-deploy/terraform

# Run the deployment script
./run_terraform_steps.sh

# When prompted, enter your EKS cluster name
# The script will automatically:
# - Initialize terraform
# - Apply step-0 (Base infrastructure)
# - Apply step-2 (Additional components)

# Configure kubectl for the new cluster
aws eks update-kubeconfig --name your-cluster-name --region ap-southeast-1
```

### 2. Deploy Kubernetes Resources

```bash
# Navigate to kubernetes directory
cd terraform-deploy/kubernetes/saas-enterprise-managing

# Create namespace
kubectl apply -f namespace.yml

# Apply environment variables
kubectl apply -f configmap.yml
kubectl apply -f secret.yml

# Deploy application
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml
kubectl apply -f hpa.yaml

# Verify deployments
kubectl get all -n saas-enterprise-managing
```

### 3. Monitor Deployment

```bash
# Watch pods
watch -t kubectl get pods -n saas-enterprise-managing

# Watch HPA
watch -t kubectl get hpa -n saas-enterprise-managing

# Check services
kubectl get svc -n saas-enterprise-managing

# Check ingress
kubectl get ing -n saas-enterprise-managing
```

### 4. Verify Application

```bash
# Check logs
kubectl logs -f deployment/saas-enterprise -n saas-enterprise-managing

# Port forward (if needed for local testing)
kubectl port-forward svc/saas-enterprise 3000:3000 -n saas-enterprise-managing

# Test the application
curl "https://be.weldingstoreswebtest.com/health"
```

### 5. Common Troubleshooting Commands

```bash
# Check pod details
kubectl describe pod <pod-name> -n saas-enterprise-managing

# Check service endpoints
kubectl get endpoints -n saas-enterprise-managing

# Check ALB controller logs
kubectl logs -n kube-system deployment/aws-load-balancer-controller

# Check HPA status
kubectl describe hpa saas-enterprise -n saas-enterprise-managing
```

### 6. Cleanup (if needed)

```bash
# Delete all resources
cd terraform-deploy/kubernetes/saas-enterprise-managing
kubectl delete -f .

# Destroy infrastructure
cd ../../terraform
./run_terraform_destroy.sh
```

## Important Notes

- All resources are deployed in the `saas-enterprise-managing` namespace
- Application is accessible at `https://be.weldingstoreswebtest.com`
- HPA is configured to scale between 2-10 pods based on CPU and memory usage
- SSL termination is handled by ALB Ingress Controller
- Environment variables are managed through ConfigMap and Secrets

## Useful Links

- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [ALB Ingress Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/)
