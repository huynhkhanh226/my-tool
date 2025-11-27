Redux Toolkit structure
/store
└── user/
├── index.ts # export slice + thunk + selectors
├── userSlice.ts # chứa slice chính
├── userThunks.ts # tách riêng async thunk
├── user.api.ts # gọi API trực tiếp
├── user.selectors.ts # chứa các selector
└── user.types.ts # define types (state, action type, ...)

store/
└── user/
├── index.ts # ✅ Export tất cả từ 1 file duy nhất
├── userSlice.ts # 🧠 Chứa state, reducers, extraReducers
├── userThunks.ts # 🚀 Chứa các async thunk (gọi API)
├── user.api.ts # 🌐 Gọi API raw (axios/fetch)
├── user.selectors.ts # 🔍 Selectors từ Redux state
└── user.types.ts # 📐 Define types, enums, interfaces

Module hóa rõ ràng theo domain-driven design

Tái sử dụng tốt, dễ maintain, mở rộng

Tách biệt UI ↔ Logic ↔ API

Dễ mock và viết test

Việc cần làm | Hướng dẫn
Bọc app bằng Provider | Tạo ReduxProvider, nhúng vào layout.tsx
Gọi API và hiển thị dữ liệu | Dùng dispatch(fetchUserProfile()) + useSelector
Viết hook riêng | useAppDispatch, useAppSelector giúp code gọn gàng hơn

src/
├── store/
│ ├── store.ts
│ ├── hooks.ts # ✅ useAppDispatch, useAppSelector
│ └── user/
│ ├── index.ts
│ ├── userSlice.ts
│ ├── userThunks.ts
│ ├── user.selectors.ts
│ ├── user.api.ts
│ ├── user.types.ts
│ └── useUser.ts # ✅ hook riêng cho user domain
├── hooks/
│ └── useDebounce.ts # 🔄 custom hook chung

Giải pháp | Ưu điểm | Nhược điểm
useState / useReducer | Nhẹ, đơn giản | Không chia sẻ giữa nhiều component dễ
useContext | Dùng được global | Khó scale, không rõ ràng logic
Redux Toolkit | Rõ ràng, mạnh mẽ, nhiều middleware | Hơi verbose nếu dùng cho việc đơn giản
Zustand | Nhẹ, dễ dùng, gọn hơn Redux | Không có middleware mạnh như Redux
TanStack Query / SWR | Tối ưu fetch & caching | Không phù hợp cho UI state thuần
Server Action (Next.js 14) | Dễ gọi API trực tiếp từ server | Còn mới, chưa phù hợp mọi loại app

Đặc điểm redux
Navigate bằng <Link> của Next.js ✅ Còn (vì không reload trang)
Dùng router.push() ✅ Còn
Refresh trình duyệt (F5) ❌ Mất
Đóng/mở lại trình duyệt ❌ Mất
Navigate sang domain khác rồi quay lại ❌ Mất

npm install redux-persist -> Khi F5 thì vẫn còn, dữ liệu lưu vào localStorage

useReducer -> sử dụng cho 1 component, tốt hơn useState
