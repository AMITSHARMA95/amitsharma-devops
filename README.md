# production-devops-platform

Building a production-grade AWS DevOps platform featuring Terraform, AWS EKS, Jenkins, ArgoCD, Helm, Prometheus, Grafana, Karpenter and GitOps workflows.

---

## Step 1: Configure AWS CLI

### Check AWS CLI

```bash
aws --version
```

### Configure AWS Credentials

```bash
aws configure
```

### Verify Login

```bash
aws sts get-caller-identity
```

Expected Output:

```json
{
  "UserId": "...",
  "Account": "...",
  "Arn": "arn:aws:iam::xxxx:user/Amit"
}
```

---

## Step 2: Install Terraform

### Install Terraform

```bash
sudo apt update
sudo apt install -y gnupg software-properties-common curl

curl -fsSL https://apt.releases.hashicorp.com/gpg | \
sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

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

---

## Step 3: Create AWS VPC using Terraform

### Initialize Terraform

```bash
terraform init
terraform fmt
terraform validate
terraform plan
```

Expected Output:

```text
Plan: 1 to add, 0 to change, 0 to destroy.
```

### Apply Configuration

```bash
terraform apply
```

Type:

```text
yes
```

Expected Output:

```text
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

### Verify VPC

```bash
aws ec2 describe-vpcs --filters "Name=tag:Name,Values=production-vpc"
```

Expected Result:

```text
VPC Created
State: available
CIDR: 10.0.0.0/16
```

---

## Step 4: Create Public and Private Subnets

### Apply Changes

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

Expected Output:

```text
Plan: 4 to add, 0 to change, 0 to destroy.
```

### Verify Subnets

```bash
aws ec2 describe-subnets
```

Expected Result:

```text
public-subnet-1
public-subnet-2
private-subnet-1
private-subnet-2
```

---

## Step 5: Create Internet Gateway and Public Route Table

### Apply Changes

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

Expected Output:

```text
Plan: 4 to add, 0 to change, 0 to destroy.
```

### Verify Resources

```bash
aws ec2 describe-internet-gateways
aws ec2 describe-route-tables
```

Expected Result:

```text
Internet Gateway Attached
Public Route Table Created
Public Subnet Associations Created
Route: 0.0.0.0/0 -> Internet Gateway
```

---

## Step 6: Create NAT Gateway and Private Route Table

### Apply Changes

```bash
terraform fmt
terraform validate
terraform plan
terraform apply
```

Expected Output:

```text
Plan: 5 to add, 0 to change, 0 to destroy.
```

### Verify Resources

```bash
aws ec2 describe-nat-gateways
aws ec2 describe-route-tables
```

Expected Result:

```text
NAT Gateway Created
Private Route Table Created
Private Subnet Associations Created
Route: 0.0.0.0/0 -> NAT Gateway
```
