function togglePassword(element) {
  const passwordInput = element.previousElementSibling;
  const newType = passwordInput.type === "password" ? "text" : "password";
  const newIcon = element.classList.contains("fa-eye")
    ? "fa-eye-slash"
    : "fa-eye";
  const oldIcon = element.classList.contains("fa-eye")
    ? "fa-eye"
    : "fa-eye-slash";

  passwordInput.type = newType;
  element.classList.replace(oldIcon, newIcon);
}

function toggleBothPasswords(element) {
  // ค้นหา 2 ลด์
  const passwordField = document.querySelector(
    ".password-field:not(.confirm-password)"
  );
  const confirmPasswordField = document.querySelector(".confirm-password");

  if (!passwordField || !confirmPasswordField) return;

  // ค้นหา input ของ 2 ลด์
  const passwordInput = passwordField.querySelector("input");
  const confirmInput = confirmPasswordField.querySelector("input");
  const confirmToggle = confirmPasswordField.querySelector(".password-toggle");

  // กำหนดประเภทใหม่ (text / password)
  const newType = confirmInput.type === "password" ? "text" : "password";

  // เปลี่ยนประเภทของ 2 ลด์
  passwordInput.type = newType;
  confirmInput.type = newType;

  // ไอคอน
  const newIcon = newType === "text" ? "fa-eye-slash" : "fa-eye";
  const oldIcon = newType === "text" ? "fa-eye" : "fa-eye-slash";

  confirmToggle.classList.replace(oldIcon, newIcon);
}

function updatePasswordRequirements(password) {
  const requirements = {
    "length-check": password.length >= 8,
    "letter-check": /[A-Za-z]/.test(password),
    "number-check": /\d/.test(password),
    "special-check": /[@$!%*#?&]/.test(password),
  };

  Object.entries(requirements).forEach(([id, isValid]) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle("valid", isValid);
    }
  });
}

function validateInput(input) {
  const formGroup = input.closest(".form-group");
  const validationIcon = formGroup.querySelector(".validation-icon");
  const errorElement = formGroup.querySelector(".error-message");

  // Reset states
  if (validationIcon) {
    validationIcon.classList.remove("show");
  }
  formGroup.classList.remove("has-error", "valid");
  if (errorElement) errorElement.style.display = "none";

  // If empty, hide validation mark and return
  if (!input.value.trim()) {
    if (validationIcon) {
      validationIcon.classList.remove("show");
    }
    return;
  }

  switch (input.name) {
    case "username":
      if (/^[A-Za-z0-9]{3,}$/.test(input.value)) {
        validationIcon.classList.add("show");
        formGroup.classList.add("valid");
      } else {
        showError(
          "username-error",
          "Username must contain only English letters and numbers (min 3 characters)"
        );
      }
      break;

    case "email":
      if (
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input.value)
      ) {
        validationIcon.classList.add("show");
        formGroup.classList.add("valid");
      } else {
        showError("email-error", "Please enter a valid email address");
      }
      break;

    case "password":
      const hasUpperCase = /[A-Z]/.test(input.value);
      const hasLowerCase = /[a-z]/.test(input.value);
      const hasSpecial = /[!@#$%^&*]/.test(input.value);
      const hasMinLength = input.value.length >= 8;

      if (hasUpperCase && hasLowerCase && hasSpecial && hasMinLength) {
        validationIcon.classList.add("show");
        formGroup.classList.add("valid");
      } else {
        showError(
          "password-error",
          "Please set password according to requirements below"
        );
      }
      updatePasswordRequirements(input.value);
      break;

    case "confirmPassword":
      const password = document.querySelector('input[name="password"]').value;
      if (input.value && input.value === password) {
        validationIcon.classList.add("show");
        formGroup.classList.add("valid");
      } else {
        showError("confirm-password-error", "Passwords do not match");
      }
      break;
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  const formGroup = errorElement.closest(".form-group");

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    formGroup.classList.add("has-error");
  }
}

function validatePasswords() {
  const form = document.getElementById("registerForm");
  const password = form.querySelector('input[name="password"]').value;
  const confirmPassword = form.querySelector(
    'input[name="confirmPassword"]'
  ).value;
  const errorElement = document.getElementById("confirm-password-error");
  const formGroup = errorElement.closest(".form-group");
  const validationIcon = formGroup.querySelector(".validation-icon");

  if (confirmPassword && password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match";
    errorElement.style.display = "block";
    formGroup.classList.add("has-error");
    formGroup.classList.remove("valid");
    if (validationIcon) validationIcon.classList.remove("show");
    return false;
  } else if (confirmPassword) {
    errorElement.style.display = "none";
    formGroup.classList.remove("has-error");
    formGroup.classList.add("valid");
    if (validationIcon) validationIcon.classList.add("show");
    return true;
  }
  return password === confirmPassword;
}

function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.querySelector('input[name="email"]').value;
  const password = form.querySelector('input[name="password"]').value;

  if (email && password) {
    // ทดสอบโดยไม่เชื่อมต่อกับ backend
    alert("Login successful! (Test mode)");
    window.location.href = "message_board.html";

    /* เก็บไว้ใช้เมื่อต้องการเชื่อมต่อกับ backend 3่ะ
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login) {
          window.location.href = "message_board.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during login!");
      });
    */
  }
}

function handleRegister(event) {
  event.preventDefault();

  const form = document.getElementById("registerForm");
  const username = form.querySelector('input[name="username"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const password = form.querySelector('input[name="password"]').value;

  // ตรวจสอบข้อมูลต่างๆ
  const isUsernameValid = /^[A-Za-z0-9]{3,}$/.test(username);
  const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[@$!%*#?&]/.test(password);
  const doPasswordsMatch = validatePasswords();

  if (isUsernameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {
    // ทดสอบโดยไม่เชื่อมต่อกับ backend
    alert("Registration successful! (Test mode)");
    window.location.href = "message_board.html";

    /* เก็บไว้ใช้เมื่อต้องการเชื่อมต่อกับ backend <|im_start|>่ะ
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          window.location.href = "message_board.html";
        } else {
          alert(data.message || "Registration failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during registration!");
      });
    */
  } else {
    // แสดงข้อความข้อ<|im_start|>่ะพลาดเฉพาะเจาะจง
    if (!isUsernameValid) {
      showError(
        "username-error",
        "Username must be at least 3 characters and contain only letters and numbers"
      );
    }
    if (!isEmailValid) {
      showError("email-error", "Please enter a valid email address");
    }
    if (!isPasswordValid) {
      showError(
        "password-error",
        "Password must be at least 8 characters and include letters, numbers, and special characters"
      );
    }
    if (!doPasswordsMatch) {
      showError("confirm-password-error", "Passwords do not match");
    }
  }
}

function handleInputIcon(icon) {
  const input = icon.nextElementSibling;
  if (input) {
    input.focus();
  }
}

// Initialize validation
window.onload = function () {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
  });

  // Add specific listener for confirm password
  const confirmPasswordInput = document.querySelector(
    'input[name="confirmPassword"]'
  );
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", validatePasswords);
  }

  // Add form submit handler
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
};

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // ใช้ bcrypt ในการเข้า

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.status(200).json({ success: true, message: "Registration successful" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ login: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ login: false, message: "User not found" });
    }

    const user = results[0];

    // ตรวจสอบผ่าน
    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ login: true, message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ login: false, message: "Invalid password" });
    }
  });
});
