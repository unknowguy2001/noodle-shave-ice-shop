import Navbar from "@/app/components/navbar";
import Card from "@/app/components/card";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Card />
      <div className="text-center">
        <button className="btn btn-primary">ยืนยันออเดอร์</button>
      </div>
    </main>
  );
}
