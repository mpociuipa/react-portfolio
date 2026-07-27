import personSchema from "../schema/personSchema";
import websiteSchema from "../schema/websiteSchema";
import organizationSchema from "../schema/organizationSchema";
import portfolioSchema from "../schema/portfolioSchema";

const Schema = () => {

  const schemas = [
    personSchema,
    websiteSchema,
    organizationSchema,
    ...portfolioSchema
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
};

export default Schema;