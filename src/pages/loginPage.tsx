import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data: user, error: queryError } = await supabase
        .from("User")
        .select("*")
        .eq("username", username)
        .single();

      if (queryError || !user) {
        setError("Invalid username or password");
        return;
      }

      const isPasswordValid = bcrypt.compareSync(
        password,
        user.hashed_password
      );
      if (!isPasswordValid) {
        setError("Invalid username or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/chat");
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#059669",
            padding: "1.5rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              color: "#d1fae5",
              marginTop: "0.5rem",
              marginBottom: 0,
            }}
          >
            Sign in to continue to your account
          </p>
        </div>

        <div style={{ padding: "2rem" }}>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#059669";
                  e.target.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#059669";
                  e.target.style.boxShadow = "0 0 0 3px rgba(5, 150, 105, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div
                style={{
                  color: "#ef4444",
                  backgroundColor: "#fee2e2",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                backgroundColor: isLoading ? "#6ee7b7" : "#059669",
                color: "white",
                fontWeight: "500",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              onMouseOver={(e) =>
                !isLoading &&
                (e.currentTarget.style.backgroundColor = "#047857")
              }
              onMouseOut={(e) =>
                !isLoading &&
                (e.currentTarget.style.backgroundColor = "#059669")
              }
            >
              {isLoading ? (
                <>
                  <svg
                    style={{
                      animation: "spin 1s linear infinite",
                      width: "1.25rem",
                      height: "1.25rem",
                    }}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      style={{ opacity: 0.25 }}
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      style={{ opacity: 0.75 }}
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#059669",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
