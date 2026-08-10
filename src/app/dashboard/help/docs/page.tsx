import { DashboardTopBar } from "@/components/layout/DashboardTopBar";
import { HelpPageBackLink } from "@/components/help/HelpPageBackLink";
import { GettingStartedSteps } from "@/components/help/GettingStartedSteps";
import { FaqAccordion } from "@/components/help/FaqAccordion";

export default function DocumentationPage() {
  return (
    <>
      <DashboardTopBar title="Documentation" />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <HelpPageBackLink />
        <GettingStartedSteps />

        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </div>
      </div>
    </>
  );
}