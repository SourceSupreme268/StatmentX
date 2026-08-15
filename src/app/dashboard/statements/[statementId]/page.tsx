import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { StatementBreadcrumb } from "@/components/dashboard/StatementBreadcrumb";
import { TransactionSummaryCards } from "@/components/dashboard/TransactionSummaryCards";
import { StatementTransactionsSection } from "@/components/dashboard/StatementTransactionsSection";
import { getStatementWithTransactions } from "@/lib/statements-data";
import { toTransactionRow } from "@/lib/statement-mappers";
import { summarizeTransactions } from "@/lib/transactions";

interface StatementDetailPageProps {
  params: Promise<{ statementId: string }>;
}

export default async function StatementDetailPage({
  params,
}: StatementDetailPageProps) {
  const { statementId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const statement = await getStatementWithTransactions(statementId, userId);
  const transactionsForStatement = statement
    ? statement.transactions.map(toTransactionRow)
    : [];
  const summary = summarizeTransactions(transactionsForStatement);

  return (
    <>
      <DashboardTopBar title="Transactions" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <StatementBreadcrumb fileName={statement?.fileName ?? "Statement"} />

        {statement ? (
          <>
            {statement.status === "processing" && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                This statement is still processing — transactions will appear
                once extraction completes.
              </div>
            )}
            {statement.status === "failed" && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                Something went wrong processing this statement.
                {statement.errorMessage && (
                  <span className="block text-xs text-red-600">
                    {statement.errorMessage}
                  </span>
                )}
              </div>
            )}

            <TransactionSummaryCards summary={summary} />
            <StatementTransactionsSection
              transactions={transactionsForStatement}
              statementId={statementId}
            />
          </>
        ) : (
          <div className="rounded-xl border border-gray-200 py-16 text-center shadow-card">
            <p className="text-sm font-medium text-gray-700">
              Statement not found
            </p>
            <p className="mt-1 text-xs text-gray-400">
              This statement may have been removed, or hasn&apos;t been
              processed yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
}