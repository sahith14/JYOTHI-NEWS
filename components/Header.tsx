import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">Jyothi News</Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/categories" className="hover:text-primary transition">Categories</Link>
          <Link href="/about" className="hover:text-primary transition">About</Link>
        </nav>
      </div>
    </header>
  );
}
