const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "Mantas Počiuipa Portfolio",

  url: "https://react-portfolio-steel-ten.vercel.app",

  description:
    "Professional portfolio showcasing React, AI, Desktop Software, Android Applications and 3D Games.",

  inLanguage: "en",

  author: {
    "@type": "Person",
    name: "Mantas Počiuipa"
  },

  potentialAction: {
    "@type": "SearchAction",

    target:
      "https://react-portfolio-steel-ten.vercel.app/?search={search_term_string}",

    "query-input":
      "required name=search_term_string"
  }
};

export default websiteSchema;