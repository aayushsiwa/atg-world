import { useEffect, useState } from "react";
import {
    auth,
    updateUserProfile,
    updateUserEmail,
    onAuthStateChanged,
} from "../../../firebase";

export const EditProfile: React.FC = () => {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setDisplayName(user.displayName || "");
                setEmail(user.email || "");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleUpdateProfile = async () => {
        if (!user) return;

        try {
            // Update profile in Firebase Auth
            await updateUserProfile(user, displayName);

            // Update email in Firebase Auth
            if (email !== user.email) {
                await updateUserEmail(user, email);
            }

            setSuccess("Profile updated successfully!");
            setError("");
        } catch (err) {
            setError(
                `Failed to update profile. Please try again: ${
                    (err as Error).message
                }`
            );
            setSuccess("");
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label
                        htmlFor="displayName"
                        className="text-sm font-medium"
                    >
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    onClick={handleUpdateProfile}
                    className="p-2 bg-blue-600 text-white rounded"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
};
