import { redirect } from "next/navigation";
import { getUser } from "@/actions";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-neutral-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
