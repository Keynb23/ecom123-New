import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../lib/firebaseConfig'; // Import from your config

// Component for user registration
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Handles user registration
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      setEmail('');
      setPassword('');
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Register;