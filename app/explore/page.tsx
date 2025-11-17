interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Fungsi untuk mengambil data
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ExplorePage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Explore Posts</h1>
      <p className="mb-4">Data ini diambil dari API publik JSONPlaceholder.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-6 shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2 capitalize">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))
        ) : (
          <p>Gagal memuat postingan atau tidak ada postingan.</p>
        )}
      </div>
    </main>
  );
}