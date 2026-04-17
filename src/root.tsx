import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import fullData from "./data/data.json";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { baseUrl, title, description, language } = fullData.config.site;
  const { name, jobTitle, email, sameAs, knowsAbout } = fullData.person;
  const cvData = fullData.cv;
  
  let skills: string[] = [];
  if (Array.isArray(cvData.skills)) {
    skills = cvData.skills.flatMap(skill => skill.items);
  } else if (cvData.skills && 'technical' in cvData.skills) {
    skills = cvData.skills.technical;
  }
  
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": title,
      "description": description,
      "url": baseUrl,
      "inLanguage": language,
      "mainEntity": {
        "@type": "Person",
        "name": name,
        "jobTitle": jobTitle,
        "email": email,
        "description": description,
        "url": baseUrl,
        "sameAs": sameAs,
        "knowsAbout": knowsAbout,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cvData.personal.location || ""
        },
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": jobTitle,
            "skills": skills
          }
        ]
      },
      "publisher": {
        "@type": "Person",
        "name": name,
        "jobTitle": jobTitle,
        "email": email,
        "url": baseUrl,
        "sameAs": sameAs
      }
    }
  ];

  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        {typeof window === 'undefined' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
