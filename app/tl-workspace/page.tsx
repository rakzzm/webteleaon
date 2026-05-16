import type { Metadata } from "next";
import { TLWorkspacePortal } from "@/components/sections/TLWorkspacePortal";

export const metadata: Metadata = {
  title: "TL WorkSpace",
  description: "Private Teleaon employee CRM workspace login."
};

export default function TLWorkspacePage() {
  return (
    <main>
      <TLWorkspacePortal />
    </main>
  );
}
