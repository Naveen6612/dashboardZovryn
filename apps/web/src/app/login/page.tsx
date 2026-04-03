"use client";

import { useRole } from "@/context/RoleContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setRole } = useRole();
  const router = useRouter();

  const handleLogin = (role: "admin" | "viewer") => {
    setRole(role);
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl border w-80 space-y-4">
        <h2 className="text-lg font-semibold text-center">Login</h2>

        <button
          onClick={() => handleLogin("admin")}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login as Admin
        </button>

        <button
          onClick={() => handleLogin("viewer")}
          className="w-full border py-2 rounded"
        >
          Login as Viewer
        </button>
      </div>
    </div>
  );
}
