// app/dashboard/layout.tsx
import DashboardLayout from "@/app/layouts/adminlayout";


export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
        <DashboardLayout>
          <main className="">{children}</main>
        </DashboardLayout>
    </div>
  );
}