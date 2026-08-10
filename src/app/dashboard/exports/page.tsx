import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { ExportsTable } from "@/components/dashboard/ExportsTable";
import { getExportsForUser } from "@/lib/exports-data";
import { toExportRow } from "@/lib/statement-mappers";

export default async function ExportsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const exportRows = await getExportsForUser(userId);
  const rows = exportRows.map(toExportRow);

  return (
    <>
      <DashboardTopBar title="Exports" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <p className="text-sm text-gray-500">
            Go to a{" "}
            <Link
              href="/dashboard/statements"
              className="font-medium text-brand-500 hover:text-brand-600"
            >
              statement
            </Link>{" "}
            to create an export
          </p>
        </div>

        <ExportsTable exports={rows} />
      </div>
    </>
  );
}