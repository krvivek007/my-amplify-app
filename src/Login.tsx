import { useState, useEffect } from 'react';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signIn({
                username: email,
                password: password
            });

            navigate('/dashboard');
        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getCurrentUser()
            .then(() => navigate('/dashboard'))
            .catch(() => { });
    }, []);

    return (
        <div>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
