export default function Header() {
  return (
    <header className="
      fixed top-0 left-0 lg:left-64 right-0
      h-header z-30
      bg-white/80 backdrop-blur
      border-b border-gray-200
      flex items-center justify-between
      px-6 md:px-10
    ">
      <nav className="hidden sm:flex items-center gap-8 text-sm">
        <a className="hover:text-black text-gray-700" href="#">Overview</a>
        <a className="hover:text-black text-gray-700" href="#">Research</a>
        <a className="hover:text-black text-gray-700" href="#">Updates</a>
        <a className="hover:text-black text-gray-700" href="#">Docs</a>
      </nav>

      <button className="px-4 py-2 rounded-full border border-gray-300 hover:bg-black hover:text-white transition text-sm">
        Sign in
      </button>
    </header>
  );
}
