export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-lg text-gray-600 mb-8">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Kembali ke Halaman Utama
      </a>
    </div>
  );
}