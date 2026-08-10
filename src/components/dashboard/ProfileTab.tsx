import { UserProfile } from "@clerk/nextjs";

export function ProfileTab() {
  return (
    <div className="rounded-xl border border-gray-200 shadow-card">
      <UserProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full shadow-none border-none",
            navbar: "hidden",
            navbarMobileMenuButton: "hidden",
            headerTitle: "text-lg font-semibold text-gray-900",
            headerSubtitle: "text-sm text-gray-500",
            profileSection__profile: "border-gray-100",
            formButtonPrimary:
              "bg-gray-900 hover:bg-gray-800 text-sm font-medium normal-case",
          },
        }}
      />
    </div>
  );
}