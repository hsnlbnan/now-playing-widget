"use client";

export default function Login() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = String(form.get("user") || "").trim();
    if (!user) return;
    window.location.href = `/api/auth/login?user=${encodeURIComponent(user)}`;
  }
  return (
    <div className="min-h-dvh grid place-items-center p-6">
      <form onSubmit={onSubmit} className="flex gap-3 items-center">
        <input
          name="user"
          placeholder="Spotify user id (e.g. 11141488580)"
          className="border rounded px-3 py-2 min-w-[280px]"
        />
        <button className="bg-[#1DB954] text-white rounded px-4 py-2">
          Login with Spotify
        </button>
      </form>
    </div>
  );
}

