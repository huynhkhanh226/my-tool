import SearchForm from "@/components/forms/SearchForm";

export default function Page() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Tạo User</h1>
      <SearchForm />
    </div>
  );
}
