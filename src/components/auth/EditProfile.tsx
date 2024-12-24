import { useEffect, useState } from "react";
import { auth, storage } from "../../../firebase"; // Ensure these are correctly imported
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const EditProfile: React.FC = () => {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profilePicture, setProfilePicture] = useState(user?.photoURL || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleUpdateProfile = async () => {
        if (!user) return;

        try {
            // Update user profile
            await updateProfile(user, {
                displayName,
                photoURL: profilePicture,
            });

            setSuccess("Profile updated successfully!");
            setError("");
        } catch (err) {
            setError(
                `Failed to update profile. Please try again.${
                    (err as Error).message
                }`
            );
            setSuccess("");
        }
    };

    const handleProfilePictureChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const storageRef = ref(storage, `profile-photos/${user?.uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            setIsUploading(true);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                    // Optional: Track upload progress here if needed
                },
                (error) => {
                    setError(
                        `Failed to upload profile picture.${error.message}`
                    );
                    setIsUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setProfilePicture(downloadURL);
                        setIsUploading(false);
                        setSuccess("Profile picture uploaded successfully!");
                    } catch (err) {
                        setError(
                            `Failed to fetch profile picture URL.${
                                (err as Error).message
                            }`
                        );
                        setIsUploading(false);
                    }
                }
            );
        }
    };

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setEmail(user.email || "");
            setProfilePicture(user.photoURL || "");
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label
                        htmlFor="profilePicture"
                        className="text-sm font-medium"
                    >
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="mt-2"
                    />
                    {isUploading && (
                        <p className="text-blue-500 text-sm mt-2">
                            Uploading...
                        </p>
                    )}
                    {profilePicture && (
                        <img
                            src={profilePicture}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full mt-4 object-cover"
                        />
                    )}
                </div>

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
                        className="mt-2 p-2 border rounded-md"
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
                        className="mt-2 p-2 border rounded-md"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {success && (
                <p className="text-green-500 text-sm mt-4">{success}</p>
            )}

            <button
                onClick={handleUpdateProfile}
                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Save Changes"}
            </button>
        </div>
    );
};
