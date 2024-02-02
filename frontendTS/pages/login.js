import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform any client-side validation if needed

    // Call the signIn function to initiate the authentication process
    await signIn('credentials', { ...credentials, redirect: false });

    // The user will be redirected if authentication is successful
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          username:
          <input
            type="text"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div>
        {/* Google Sign In Button */}
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    </div>
  );
}