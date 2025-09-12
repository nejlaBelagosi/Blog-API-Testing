# 📝 Blog API - Postman Tests

This repository contains a Postman collection for testing the **Blog API**, using 
[JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a sample API.  
Tests are executed with **Postman** and **Newman**, and HTML reports are generated automatically.

---

## 🛠 Tools & Technologies
- **Postman** – API development and testing  
- **Newman** – command-line runner for Postman collections  
- **JSONPlaceholder** – fake online REST API for testing and prototyping  

---
## 📂 Repository Structure

---

# 📑 Documentation

Detailed API documentation can be found in the [reports](https://github.com/nejlaBelagosi/Blog-API-Testing/tree/main/reports) folder.

For the sample API reference, check out:
👉 [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/guide)

---

## ▶️ How to Run Tests

```
**1. Clone the repository**
git clone https://github.com/username/blog-api-postman.git
cd blog-api-postman

**2. Install dependencies**
npm install -g newman

**3. Run tests**
newman run "Blog API.postman_collection.json" -e "Blog API.postman_environment.json"

**4. Generate an HTML report
newman run "BlogA PI.postman_collection.json" \
  -e "Blog API.postman_environment.json" \
  -r html --reporter-html-export test-results/blog-api-test-report.html

```

---

#⚡ Key Features

-Automated functional API tests
-Validations for GET, POST, PUT, DELETE requests
-Environment variables for flexibility
-Exported HTML test reports

