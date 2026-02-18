import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';

interface UserAttributes {
    email?: string;
    filteredCountryList?: string[];
    emailVerified?: boolean;
    userId?: string
}

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<UserAttributes>({});
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                const attributes = await fetchUserAttributes();
                const user = await getCurrentUser()

                console.log(JSON.stringify(attributes, null, 2))
                setUser({
                    email: attributes.email,
                    filteredCountryList: attributes['custom:filteredCountryList']?.split(","),
                    emailVerified: attributes['email_verified']?.toLowerCase() === "true",
                    userId: user.userId
                });

            } catch (error) {
                console.error(error);
            }
        };

        loadUser();
    }, []);


    return (
        <div>
            <div>
                <h2>Dashboard</h2>
                <p>Email: {user.email}</p>
                <p>Filtered Country List: {user.filteredCountryList}</p>
                <p>Email Verified: {user.emailVerified ? "true" : "false"}</p>
                <p>User ID: {user.userId}</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
