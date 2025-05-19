
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type AuthView = "signin" | "signup" | "forgot-password";

const Auth = () => {
  const { user, signIn, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [view, setView] = useState<AuthView>("signin");
  
  // If user is already authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      });
      setView("signin");
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">WovenElegance</h1>
          {view === "signin" && <p className="mt-2 text-gray-600">Sign in to your account</p>}
          {view === "signup" && <p className="mt-2 text-gray-600">Create a new account</p>}
          {view === "forgot-password" && <p className="mt-2 text-gray-600">Reset your password</p>}
        </div>

        <form onSubmit={
          view === "signin" 
            ? handleSignIn 
            : view === "signup" 
              ? handleSignUp 
              : handleResetPassword
        } className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {view !== "forgot-password" && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {view === "signin" && (
            <div className="text-sm text-right">
              <button
                type="button"
                onClick={() => setView("forgot-password")}
                className="text-wrap-burgundy hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-wrap-burgundy hover:bg-wrap-burgundy/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : 
              view === "signin" 
                ? "Sign In" 
                : view === "signup" 
                  ? "Sign Up" 
                  : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {view === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signup")}
                className="text-wrap-burgundy hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signin")}
                className="text-wrap-burgundy hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
