import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { StatementDropzone } from "@/components/dashboard/StatementDropzone";
import { UploadTipsCard } from "@/components/dashboard/UploadTipsCard";

export default function UploadStatementPage() {
  return (
    <>
      <DashboardTopBar title="Upload Statement" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <StatementDropzone />
        <UploadTipsCard />
      </div>
    </>
  );
}
