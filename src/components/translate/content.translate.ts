const contents: Record<string, string> = {
  Welcome: "Welcome",
  "Enter your email and password to sign in.":
    "Enter your email and password to sign in.",
  "Enter your email": "Enter your email",
  "Enter your password": "Enter your password",
  "Forgot password?": "Forgot password?",
  "Sign In": "Sign In",
  "Don’t have an account?": "Don’t have an account?",
  "Sign Up": "Sign Up",
  Features: "Features",
  Pricing: "Pricing",
  Contact: "Contact",
  "Open main menu": "Open main menu",
  Info: "Info",
  "Try again": "Try again",
  "OR Sign up with": "OR Sign up with",
  Google: "Google",
  "Looks like": "Looks like",
  "you are new!": "you are new!",
  "Please enter your email address to sign up.":
    "Please enter your email address to sign up.",
  "Please enter your password": "Please enter your password to sign up.",
  "Re enter your password": "Re enter your password",
  Next: "Next",
  "Already have an account?": "Already have an account?",
  "Please check your email to get verify link.": "Please check your email to get verify link.",
  "Verify your email": "Verify your email",
  "We just sent a 6-digit code to": "We just sent a 6-digit code to",
  "Please enter the verification code below.": "Please enter the verification code below.",
  "Didn't receive an email? Check your spam folder": "Didn't receive an email? Check your spam folder",
  "or resend code in": "or resend code in"
};

export function $tsl(key: string) {
  const str = contents[key];
  if (!str) console.warn("Missing content", key);
  return str || key;
}
