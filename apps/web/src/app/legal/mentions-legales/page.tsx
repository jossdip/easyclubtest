import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const metadata = { title: 'Mentions légales — EasyClub' };

// Informations publiées au registre national des entreprises.
const SOCIETE = {
  raisonSociale: 'JLM GROUP',
  forme: 'société par actions simplifiée (SAS)',
  capital: null as string | null,
  siege: '27 avenue Jean Médecin, 06000 Nice, France',
  rcs: 'RCS Nice 104 188 578',
  siret: '104 188 578 00017',
  email: 'contact@easyclub.fr',
  telephone: null as string | null,
  directeurPublication: 'le Président de JLM GROUP',
};

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="border-border border-t py-6 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-lg font-semibold">{titre}</h3>
      <div className="text-foreground/80 space-y-1.5 leading-relaxed">{children}</div>
    </div>
  );
}

export default function MentionsLegalesPage(): React.JSX.Element {
  const s = SOCIETE;
  return (
    <>
      <Nav />
      <main>
        <Section title="Mentions légales">
          <div className="max-w-3xl">
            <Bloc titre="Éditeur du site">
              <p>
                EasyClub est le nom commercial de <strong>{s.raisonSociale}</strong>, {s.forme}
                {s.capital ? ` au capital de ${s.capital}` : ''}.
              </p>
              <p>Siège social : {s.siege}</p>
              <p>
                {s.rcs} — SIRET {s.siret}
              </p>
              <p>
                Contact :{' '}
                <a className="underline underline-offset-4" href={`mailto:${s.email}`}>
                  {s.email}
                </a>
                {s.telephone ? ` — ${s.telephone}` : ''}
              </p>
              <p>Directeur de la publication : {s.directeurPublication}</p>
            </Bloc>
            <Bloc titre="Hébergement">
              <p>Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis</p>
            </Bloc>
            <Bloc titre="Propriété intellectuelle">
              <p>
                La marque EasyClub, les contenus, visuels et logiciels présentés sur ce site sont la
                propriété de {s.raisonSociale}. Toute reproduction sans autorisation écrite
                préalable est interdite.
              </p>
            </Bloc>
            <Bloc titre="Données personnelles">
              <p>
                Le traitement des données collectées sur ce site est décrit dans notre{' '}
                <Link className="underline underline-offset-4" href="/legal/confidentialite">
                  politique de confidentialité
                </Link>
                .
              </p>
            </Bloc>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
