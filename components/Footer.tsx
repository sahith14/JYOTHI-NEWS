export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Jyothi News. All rights reserved.</p>
        <p className="text-sm mt-2">Telangana's Accountability Tracker</p>
      </div>
    </footer>
  );
}
