const contents: Record<string, string> = {
  Welcome: "Welcome",
  "Hi,": "Hi,",
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
  Next: "Next",
  "Already have an account?": "Already have an account?",
  "Please check your email to get verify link.": "Please check your email to get verify link.",
  "Verify your email": "Verify your email",
  "We just sent a 6-digit code to": "We just sent a 6-digit code to",
  "Please enter the verification code below.": "Please enter the verification code below.",
  "Didn't receive an email? Check your spam folder": "Didn't receive an email? Check your spam folder",
  "or resend code in": "or resend code in",
  Success: "Success",
  "Verification complete": "Verification complete",
  "Your mail has been verified.": "Your mail has been verified.",
  "You can now sign in using the new account.": "You can now sign in using the new account.",
  "Sign up not success": "Sign up not success",
  "Forgot your password?": "Forgot your password?",
  "Enter your registered email below":"Enter your registered email below",
  "to receive the password reset instructions.":"to receive the password reset instructions.",
  "Send":"Send",
  "email sent!":"email sent!",
  "Please check your inbox and click": "Please check your inbox and click",
  "the included link to reset your password.":"the included link to reset your password.",
  "Didn't receive an email?": "Didn't receive an email?",
  "Check your spam folder or": "Check your spam folder or",
  "contact us": "contact us",
  "Not ready": "Not ready",
  "Waiting a seconds ...": "Waiting a seconds ...",
  "Reset Password": "Reset Password",
  "Your new password must be different from three previous passwords.": "Your new password must be different from three previous passwords.",
  "Confirm password": "Confirm password",
  "Reset password": "Reset password"
};

export function $tsl(key: string) {
  const str = contents[key];
  if (!str) console.warn("Missing content", key);
  return str || key;
}
