import Link from "next/link";

const adminManager = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-center text-xl font-bold">หน้าการจัดการ</h2>
      <div className="grid grid-cols-2 items-center mt-3 gap-4">
        <Link href="/admin/topping" className="btn btn-warning btn-sm">
          เพิ่มท็อปปิ้ง
        </Link>
        <Link href="/admin/topping/edit" className="btn btn-warning btn-sm">
          จัดการท็อปปิ้ง
        </Link>
        <Link href="/admin/menu" className="btn btn-warning btn-sm">
          เพิ่มเมนู
        </Link>
        <Link href="/admin/menu/edit" className="btn btn-warning btn-sm">
          จัดการเมนูเมนู
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/admin/dashboard" className="btn btn-sm btn-error">
          ย้อนกลับ
        </Link>
      </div>
    </div>
  );
};

export default adminManager;
