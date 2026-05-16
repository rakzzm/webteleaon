import type { Metadata } from "next";
import { StartBuildingPortal } from "@/components/sections/StartBuildingPortal";

export const metadata: Metadata = {
  title: "Start Building",
  description: "Sign in to choose a Teleaon product platform workspace."
};

export default function StartBuildingPage() {
  return (
    <main>
      <StartBuildingPortal />
    </main>
  );
}
