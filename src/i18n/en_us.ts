const messages = {
  code: "en-US" as string,
  locale: "enUS",
  language: "English",
  menu: {
    home: "Home",
    about: "About",
    login: "Login",
    logout: "Logout",
    managers: {
      title: "Managers",
      signHistory: "Sign History"
    }
  },
  labels: {
    login: "Login",
    username: "Username",
    password: "Password",
    uid: "User ID",
    time: "Time",
    userAgent: "User Agent",
    total: "Total {total} records"
  },
  actions: {
    submit: "Submit",
    search: "Search"
  },
  invalid: {
    between: "Must be between {min} and {max} characters",
    required: "Please enter a valid infomation"
  },
  error: {
    code: "Error: {code}"
  },
  responseCode: {
    0: "Successful",
    4010: "Invalid username or password"
  }
};

export default messages;
