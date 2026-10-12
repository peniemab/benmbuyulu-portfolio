import { revokeInvitationAction } from "@/app/atelier/(espace)/acces/actions";
import { InviteForm } from "@/components/studio/InviteForm";
import { StudioSection } from "@/components/studio/StudioSection";
import { AtelierButton } from "@/components/studio/ui";
import { getLocale } from "@/i18n/get-dictionary";
import { getAtelierCopy } from "@/lib/atelier-copy";
import { getSessionUserId, requireStudio } from "@/lib/studio-guard";
import { listPendingInvitations, listUsers } from "@/lib/user";

export const dynamic = "force-dynamic";

export default async function AccessPage() {
  await requireStudio();
  const [copy, locale, users, invitations, me] = await Promise.all([
    getAtelierCopy(),
    getLocale(),
    listUsers(),
    listPendingInvitations(),
    getSessionUserId(),
  ]);
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
  });

  return (
    <StudioSection title={copy.access.label} help={copy.access.help}>
      <section>
        <h2 className="font-label-caps text-label-caps text-on-surface-variant">
          {copy.access.people}
        </h2>
        <ul className="mt-3 divide-y divide-outline-variant border-y border-outline-variant">
          {users.map((user) => (
            <li key={user.id} className="py-3">
              <p className="font-body-md text-body-md text-primary">
                {user.name}
                {user.id === me ? (
                  <span className="text-on-surface-variant"> ({copy.access.you})</span>
                ) : null}
              </p>
              <p className="font-body-md text-[0.9rem] text-on-surface-variant">{user.email}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant">
          {copy.access.invite}
        </h2>
        <div className="mt-4">
          <InviteForm copy={copy} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant">
          {copy.access.pending}
        </h2>
        {invitations.length === 0 ? (
          <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
            {copy.access.noPending}
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-outline-variant border-y border-outline-variant">
            {invitations.map((invitation) => (
              <li key={invitation.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-body-md text-body-md text-primary">
                    {invitation.email}
                  </p>
                  <p className="font-body-md text-[0.9rem] text-on-surface-variant">
                    {copy.access.expires} {date.format(invitation.expiresAt)}
                  </p>
                </div>
                <form action={revokeInvitationAction}>
                  <input type="hidden" name="id" value={invitation.id} />
                  <AtelierButton type="submit" variant="danger" size="sm">
                    {copy.access.revoke}
                  </AtelierButton>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </StudioSection>
  );
}
