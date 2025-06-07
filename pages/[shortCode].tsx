// pages/[shortCode].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust path to your firebase config
import { Link2, AlertCircle } from "lucide-react";

export default function RedirectPage() {
  const router = useRouter();
  const { shortCode } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (shortCode && typeof shortCode === "string") {
      handleRedirect(shortCode);
    }
  }, [shortCode]);

  const handleRedirect = async (code) => {
    try {
      // Query Firestore for the short code
      const q = query(collection(db, "urls"), where("shortCode", "==", code));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        const data = docData.data();

        // Increment click count
        try {
          await updateDoc(doc(db, "urls", docData.id), {
            clicks: increment(1),
          });
        } catch (updateError) {
          console.warn("Failed to update click count:", updateError);
        }

        // Add protocol if missing
        let redirectUrl = data.originalUrl;
        if (
          !redirectUrl.startsWith("http://") &&
          !redirectUrl.startsWith("https://")
        ) {
          redirectUrl = "https://" + redirectUrl;
        }

        // Redirect to original URL
        window.location.replace(redirectUrl);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error redirecting:", error);
      setError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Redirecting...</p>
          <p className="text-gray-500 text-sm mt-2">
            Taking you to your destination
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Link Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The short link you're looking for doesn't exist or may have been
              removed.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Link2 className="w-5 h-5 mr-2" />
                Create Short Link
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
