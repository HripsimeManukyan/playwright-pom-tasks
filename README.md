# Playwright POM Tasks

![Playwright](https://img.shields.io/badge/Tested%20With-Playwright-2ea44f?logo=microsoftedge\&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript\&logoColor=white)
![Design](https://img.shields.io/badge/Pattern-Page%20Object%20Model-brightgreen)
![Tests Passing](https://img.shields.io/badge/Tests-Passing-success?logo=checkmarx\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js\&logoColor=white)

This project is a **Playwright test automation framework** built with **TypeScript** using the **Page Object Model (POM)** design pattern.
It contains reusable Page Object classes, test data, and structured test suites for different functionalities of the [TutorialsNinja Demo site](https://tutorialsninja.com/demo/).

---

## 📂 Project Structure

```
PLAYWRIGHT-POM-TASKS
│── PageObjects/               # Page Object classes
│   ├── addToCart.ts
│   ├── ChangePasswordPage.ts
│   ├── CurrencyPage.ts
│   ├── LoginPage.ts
│   ├── MenuPage.ts
│   ├── SearchPage.ts
│
│── tests/                     # Test specifications
│   ├── addToCart.spec.ts
│   ├── changePassword.spec.ts
│   ├── currency.spec.ts
│   ├── login.spec.ts
│   ├── menu.spec.ts
│   ├── search.spec.ts
│
│── testData/                  # Test data files
│   ├── invalidCreds.json
│   ├── validCreds.json
│
│── utils/                     # Utility functions/constants
│   ├── constants.ts
│
│── playwright.config.ts       # Playwright test configuration
│── package.json
│── package-lock.json
│── .gitignore
```

---

## ⚙️ Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/<your-username>/playwright-pom-tasks.git
   cd playwright-pom-tasks
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## ▶️ Running Tests

* Run all tests:

  ```bash
  npx playwright test
  ```

* Run tests in headed mode:

  ```bash
  npx playwright test --headed
  ```

* Run a specific test file:

  ```bash
  npx playwright test tests/addToCart.spec.ts
  ```

* Run with UI mode:

  ```bash
  npx playwright test --ui
  ```

---

## 🧪 Key Features

* **Page Object Model (POM)** for reusable test actions.
* **TypeScript** for better type safety and maintainability.
* **Data-driven tests** using JSON files for credentials and scenarios.
* **Clean separation** between test logic and UI selectors.
* **Playwright Test Runner** with built-in parallel execution and HTML reports.

---

## 📊 Test Reports

After running tests, you can view the **HTML report**:

```bash
npx playwright show-report
```

This will open the latest test report in your browser.

---

## ✅ Example Test Flow

For example, the **Change Password test**:

1. Logs in with valid credentials.
2. Changes the password.
3. Logs out and verifies login with the new password.
4. Resets the password back to the original.

---

## 🚀 Future Enhancements

* Add **API tests** using Playwright’s request context.
* Integrate with **CI/CD pipelines** (GitHub Actions, GitLab CI, or Jenkins).
* Add **environment configs** for staging/production.
* Enhance **reporting** with Allure or custom dashboards.

---

## 📌 Requirements

* Node.js **v18+**
* Playwright **latest**
* TypeScript **5+**

---

## 📜 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute it with proper attribution.
See the [LICENSE](LICENSE) file for details.

---


