"use client";

type Role = "admin" | "viewer";

const setRoleCookie = (role: Role) => {
  const secure = window.location.protocol === "https:";
  const cookie = [`role=${role}`, "path=/", "max-age=31536000", "sameSite=None"]
    .concat(secure ? ["Secure"] : [])
    .join("; ");

  document.cookie = cookie;
  localStorage.setItem("role", role);
};

export default function LoginPage() {
  const handleRoleSelect = (role: Role) => {
    setRoleCookie(role);
    window.location.assign("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Select a role to continue to the dashboard.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue as Admin
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("viewer")}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Continue as Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
