import Link from "next/link";
import { Upload } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { StatementsTable } from "@/components/dashboard/StatementsTable";
import { getStatementsForUser } from "@/lib/statements-data";
import { toStatementRow } from "@/lib/statement-mappers";

export default async function StatementsPage() {


  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const statements = await getStatementsForUser(userId);
  const rows = statements.map(toStatementRow);

  return (
    <>
      <DashboardTopBar title="Statements" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-end">
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Upload className="h-4 w-4" />
            Upload Statement
          </Link>
        </div>

        <StatementsTable statements={rows} />
      </div>
    </>
  );
}