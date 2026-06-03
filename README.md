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
```## Step 7: Create AWS EKS Cluster using Terraform

### Create EKS Configuration

Create a new directory:

```bash
mkdir terraform-eks
cd terraform-eks
nano main.tf
```

### Initialize Terraform

```bash
terraform init
```

### Format Terraform Code

```bash
terraform fmt
```

### Validate Terraform Code

```bash
terraform validate
```

### Preview Infrastructure Changes

```bash
terraform plan
```

Expected Output:

```text
Plan: 9 to add, 0 to change, 0 to destroy.
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
Apply complete! Resources added successfully.
```

### Verify EKS Cluster

```bash
aws eks list-clusters
```

Expected Result:

```text
production-eks-cluster
```

### Configure kubectl

```bash
aws eks update-kubeconfig \
  --region ap-south-1 \
  --name production-eks-cluster
```

Expected Result:

```text
Added new context arn:aws:eks:ap-south-1:ACCOUNT_ID:cluster/production-eks-cluster
```

### Verify Node Group

```bash
aws eks describe-nodegroup \
  --cluster-name production-eks-cluster \
  --nodegroup-name production-node-group \
  --region ap-south-1 \
  --query nodegroup.status
```

Expected Result:

```text
ACTIVE
```

### Verify Worker Nodes

```bash
kubectl get nodes
```

Expected Result:

```text
NAME                                        STATUS   ROLES   AGE
ip-10-0-3-xxx.ap-south-1.compute.internal   Ready    <none>
ip-10-0-4-xxx.ap-south-1.compute.internal   Ready    <none>
```

Expected Result:

```text
NAT Gateway Created
Private Route Table Created
Private Subnet Associations Created
Route: 0.0.0.0/0 -> NAT Gateway
``--------
## Step 8: Install Docker

### Install Docker

```bash
sudo apt update
sudo apt install -y docker.io
```

### Enable Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

### Verify Installation

```bash
docker --version
```

### Test Docker

```bash
docker run hello-world
```

Expected Result:

```text
Hello from Docker!
```-------



