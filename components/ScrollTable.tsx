"use client";

import React, { useEffect, useRef, useState } from "react";

type User = {
  id: number;
  name: string;
};

export default function SmartFilterInfiniteScroll() {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const [rawData, setRawData] = useState<User[]>([]); // toàn bộ dữ liệu gốc
  const [filteredData, setFilteredData] = useState<User[]>([]); // kết quả search
  const [displayData, setDisplayData] = useState<User[]>([]); // phần đang hiển thị
  const [filter, setFilter] = useState("");
  const [loadIndex, setLoadIndex] = useState(10); // số record đã load

  // Fake dataset 200 user
  useEffect(() => {
    const fullData: User[] = Array.from({ length: 200 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRawData(fullData);
    setFilteredData(fullData); // ban đầu chưa filter
    setDisplayData(fullData.slice(0, 10));
  }, []);

  // Khi filter thay đổi → lọc lại trên rawData
  useEffect(() => {
    const result = rawData.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredData(result);
    setDisplayData(result.slice(0, 10)); // reset về 10 dòng đầu
    setLoadIndex(10); // reset vị trí load
  }, [filter, rawData]);

  // Scroll load tiếp 10 record từ filteredData
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
      if (!atBottom) return;

      // còn dữ liệu chưa load trong filteredData
      if (loadIndex < filteredData.length) {
        const nextIndex = loadIndex + 10;
        setDisplayData(filteredData.slice(0, nextIndex));
        setLoadIndex(nextIndex);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadIndex, filteredData]);

  return (
    <div className="max-w-xl mx-auto space-y-3">
      {/* Search box */}
      <input
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="border rounded-lg overflow-hidden">
        <div ref={bodyRef} className="max-h-64 overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 border-b text-left">ID</th>
                <th className="px-4 py-2 border-b text-left">Name</th>
              </tr>
            </thead>

            <tbody>
              {displayData.map((item, idx) => (
                <tr key={`${item.id}-${idx}`} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border-b">{item.id}</td>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                </tr>
              ))}

              {/* Hết dữ liệu */}
              {displayData.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-gray-500">
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-2 text-center text-gray-500 text-sm">
          {loadIndex >= filteredData.length ? "Hết dữ liệu" : "Đang tải thêm…"}
        </div>
      </div>
    </div>
  );
}
