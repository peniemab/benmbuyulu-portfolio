import { removeSubscriberAction } from "@/app/atelier/(espace)/newsletter/actions";
import { CopyEmailsButton } from "@/components/studio/CopyEmailsButton";
import { DeleteButton } from "@/components/studio/DeleteButton";
import { StudioSection } from "@/components/studio/StudioSection";
import { getLocale } from "@/i18n/get-dictionary";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/studio-guard";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  await requireStudio();
  const [copy, locale, subscribers] = await Promise.all([
    getAtelierCopy(),
    getLocale(),
    prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, createdAt: true },
    }),
  ]);
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <StudioSection title={copy.newsletter.label} help={copy.newsletter.help}>
      <p className="font-label-caps text-label-caps text-on-surface-variant">
        {copy.newsletter.count}
      </p>
      <p className="mt-1 font-headline-md text-headline-md text-primary">{subscribers.length}</p>

      {subscribers.length === 0 ? (
        <p className="mt-8 border border-dashed border-outline-variant px-6 py-12 font-body-lg text-body-lg text-on-surface-variant">
          {copy.newsletter.empty}
        </p>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-3">
            <CopyEmailsButton
              emails={subscribers.map((s) => s.email)}
              label={copy.newsletter.copyAll}
              copiedLabel={copy.newsletter.copied}
            />
            <a
              href="/atelier/newsletter/export"
              download
              className="inline-flex cursor-pointer items-center justify-center border border-primary px-7 py-3.5 text-center font-label-caps text-label-caps text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              {copy.newsletter.download}
            </a>
          </div>
          <ul className="mt-8 divide-y divide-outline-variant border-y border-outline-variant">
            {subscribers.map((subscriber) => (
              <li key={subscriber.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-body-md text-body-md text-primary">
                    {subscriber.email}
                  </p>
                  <p className="font-body-md text-[0.9rem] text-on-surface-variant">
                    {copy.newsletter.subscribedOn} {date.format(subscriber.createdAt)}
                  </p>
                </div>
                <form action={removeSubscriberAction} className="[&>div]:pt-0">
                  <DeleteButton
                    action={removeSubscriberAction}
                    id={subscriber.id}
                    label={copy.newsletter.remove}
                    confirmMessage={copy.newsletter.removeConfirm}
                  />
                </form>
              </li>
            ))}
          </ul>
        </>
      )}
    </StudioSection>
  );
}
