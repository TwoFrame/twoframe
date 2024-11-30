import Navbar from '@/app/components/navbar';

export default function Landing() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <Navbar />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">twoframe</h1>
          <p className="py-6">
            Keep up with tournaments for your favorite games.
          </p>
          <a href="/tournaments/search">
            <button className="btn btn-primary">Discover</button>
          </a>
        </div>
      </div>
    </div>
  );
}
