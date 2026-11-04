import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';
import { CONTACT } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const metadata = { title: 'Confidentialité — EasyClub' };

function Bloc({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="border-t border-white/10 py-6 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-lg font-semibold">{titre}</h3>
      <div className="text-mute space-y-1.5 leading-relaxed">{children}</div>
    </div>
  );
}

/** Ce que fait réellement ce site : ni compte, ni formulaire, ni traceur ; un cookie de langue, posé à la demande. */
export default function ConfidentialitePage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section title="Confidentialité">
          <div className="max-w-3xl">
            <Bloc titre="Responsable du traitement">
              <p>
                JLM GROUP SAS, éditrice d’EasyClub (voir les{' '}
                <Link className="underline underline-offset-4" href="/legal/mentions-legales">
                  mentions légales
                </Link>
                ).
              </p>
            </Bloc>
            <Bloc titre="Ce que ce site collecte">
              <p>
                Ce site ne comporte ni compte, ni formulaire, ni mesure d’audience, ni traceur
                publicitaire.
              </p>
              <p>
                La langue s’affiche d’après le pays de votre connexion, que notre hébergeur
                Cloudflare indique à chaque visite ; nous ne le conservons pas.
              </p>
              <p>
                Un seul cookie, <code>NEXT_LOCALE</code>, est déposé, et seulement si vous changez
                de langue avec le sélecteur : il garde ce choix un an.
              </p>
            </Bloc>
            <Bloc titre="Hébergement">
              <p>
                Cloudflare traite les données techniques de connexion (adresse IP, journaux) pour
                servir et protéger le site.
              </p>
            </Bloc>
            <Bloc titre="Quand vous nous écrivez">
              <p>
                Si vous nous écrivez ou nous appelez, vos coordonnées servent uniquement à vous
                répondre et à organiser une démo. Elles ne sont ni revendues ni cédées.
              </p>
            </Bloc>
            <Bloc titre="Vos droits">
              <p>
                Accès, rectification, effacement, opposition :{' '}
                <a className="underline underline-offset-4" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                . Vous pouvez aussi saisir la CNIL (cnil.fr).
              </p>
            </Bloc>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
