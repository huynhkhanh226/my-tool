export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-header px-6 md:px-10 lg:ml-64">
      <div className="max-w-4xl mx-auto space-y-40">{children}</div>
    </div>
  );
}
