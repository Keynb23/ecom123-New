import { useState, useEffect, type FormEvent } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../lib/firebaseConfig'; 

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      setUser(null);
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Login to your account</p>
      {user ? (
        <div className="login-form">
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;