# production-devops-platform
Designed and deployed a production-ready AWS DevOps platform featuring Infrastructure as Code (Terraform), Kubernetes (EKS), GitOps (ArgoCD), CI/CD (Jenkins), monitoring (Prometheus &amp; Grafana), autoscaling (Karpenter), and secure secrets management.
Step 1: Configure AWS CLI

# Check AWS CLI
aws --version

# Configure AWS Credentials
aws configure

# Verify Login
aws sts get-caller-identity
Expected output:
{
  "UserId": "...",
  "Account": "...",
  "Arn": "arn:aws:iam::xxxx:user/Amit"
}
-------------------------------------------
## Step 2: Install Terraform

### Update Packages

```bash
sudo apt update
sudo apt install -y gnupg software-properties-common curl
```

### Add HashiCorp GPG Key

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | \
sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

### Add HashiCorp Repository

```bash
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

### Install Terraform

```bash
sudo apt update
sudo apt install terraform -y
```

### Verify Installation

```bash
terraform version
```

Expected Output:

```text
Terraform v1.x.x
```
---------------------------------------------------------------------------------
