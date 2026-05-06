import {
  FolderOpen,
  Cpu,
  Users,
  Activity,
} from "lucide-react";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { getUser } from "@/actions";
import { getProjects } from "@/actions/get-projects";

const cards = [
  {
    label: "Total Projects",
    value: "—",
    dynamic: true,
    change: 12,
    icon: FolderOpen,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    label: "Components Generated",
    value: "1,284",
    change: 23,
    icon: Cpu,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
  {
    label: "Active Users",
    value: "48",
    change: -4,
    icon: Users,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    label: "API Calls",
    value: "9,310",
    change: 18,
    icon: Activity,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

const recentActivity = [
  { action: "Generated", target: "PricingTable component", time: "2 min ago" },
  { action: "Edited", target: "HeroSection component", time: "15 min ago" },
  { action: "Created", target: "Design #72491", time: "1 hr ago" },
  { action: "Generated", target: "ContactForm component", time: "3 hr ago" },
  { action: "Created", target: "Design #51023", time: "Yesterday" },
];

export default async function DashboardPage() {
  const [user, projects] = await Promise.all([getUser(), getProjects()]);

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Welcome back{user?.email ? `, ${user.email}` : ""}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {cards.map((card) => (
          <AnalyticsCard
            key={card.label}
            label={card.label}
            value={card.dynamic ? String(projects.length) : card.value}
            change={card.change}
            icon={card.icon}
            iconColor={card.iconColor}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-900">Recent Activity</h2>
          </div>
          <ul className="divide-y divide-neutral-100">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <span className="text-sm text-neutral-700">
                    <span className="font-medium">{item.action}</span>{" "}
                    {item.target}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 shrink-0 ml-4">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          <div className="px-5 py-4 border-b border-neutral-100">
            <h2 className="text-sm font-semibold text-neutral-900">Your Projects</h2>
          </div>
          {projects.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-neutral-500">No projects yet.</p>
              <a
                href="/"
                className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Start generating →
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {projects.slice(0, 5).map((project) => (
                <li key={project.id}>
                  <a
                    href={`/${project.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-neutral-800 truncate">
                      {project.name}
                    </span>
                    <span className="text-xs text-neutral-400 shrink-0 ml-4">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
