import type { Metadata } from "next";
import { LoginForm } from "@/components/studio/LoginForm";
import { isStudioPasswordConfigured } from "@/lib/studio-auth";

export const metadata: Metadata = {
  title: "Atelier",
  robots: { index: false, follow: false },
};

export default function AtelierLoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-surface px-margin-mobile">
      <div className="w-full max-w-sm">
        <p className="font-label-caps text-label-caps text-mustard">
          Ben Mbuyulu
        </p>
        <h1 className="mt-3 font-headline-md text-headline-md text-primary">
          Atelier
        </h1>
        <p className="mt-3 mb-8 font-body-md text-body-md text-on-surface-variant">
          C’est votre atelier. Les visiteurs du site ne le voient pas.
        </p>
        <LoginForm configured={isStudioPasswordConfigured()} />
      </div>
    </div>
  );
}
