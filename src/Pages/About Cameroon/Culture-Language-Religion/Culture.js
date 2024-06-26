import CardComponent from "../../../Components/Card";
import {
  cultureInfo,
  languageInfo,
  religionInfo,
} from "../../../Components/Data/data";

export default function Culture() {
  return (
    <div className="mt-10 mx-20 px-20">
      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl font-medium">
          Culture
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-gray-900 text-lg">
          Cameroon, often referred to as "Africa in miniature," is a country
          with a rich tapestry of cultures, languages, and traditions. The
          cultural diversity of Cameroon is shaped by its various ethnic groups,
          each contributing unique customs and practices. Here is an overview of
          some of the major cultural groups in Cameroon:
        </p>
      </div>

      <div>
        {cultureInfo.map((group, index) => (
          <div key={index}>
            <h2>
              {index + 1}. {group.people}
            </h2>
            {group.language && (
              <p>
                <strong>Language:</strong> {group.language}
              </p>
            )}
            {group.location && (
              <p>
                <strong>Location:</strong> {group.location}
              </p>
            )}
            {group.culture && (
              <p>
                <strong>Culture:</strong> {group.culture}
              </p>
            )}
            {group.children &&
              group.children.map((child, childIndex) => (
                <div key={childIndex} style={{ marginLeft: "20px" }}>
                  <h3>
                    {index + 1}.{childIndex + 1} {child.people}
                  </h3>
                  <p>
                    <strong>Language:</strong> {child.language}
                  </p>
                  <p>
                    <strong>Location:</strong> {child.location}
                  </p>
                  <p>
                    <strong>Culture:</strong> {child.culture}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl font-medium">
          Languages
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-gray-900 text-lg">
          Cameroon is often referred to as a linguistic and cultural crossroads
          due to its immense linguistic diversity. The country is home to over
          250 languages, reflecting its complex ethnic composition.
        </p>

        <p className="text-gray-900 text-lg">Nation Languages:</p>
      </div>

      <div>
        {languageInfo.map((category, index) => (
          <div key={index}>
            <h2>
              {index + 1}. {category.category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            {category.languages.map((lang, langIndex) => (
              <div key={lang.language}>
                <h3>
                  {index + 1}.{langIndex + 1} {lang.language}
                </h3>
                <p>
                  <strong>Usage:</strong> {lang.usage || lang.context}
                </p>
                {lang.historicalContext && (
                  <p>
                    <strong>Historical Context:</strong>{" "}
                    {lang.historicalContext}
                  </p>
                )}
                {lang.significance && (
                  <p>
                    <strong>Significance:</strong> {lang.significance}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl font-medium">
          Religions
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-gray-900 text-lg">
          Cameroon is religiously diverse, with Christianity and Islam being the
          predominant faiths. Traditional African religions also play a
          significant role in the spiritual and cultural lives of many
          communities.
        </p>
      </div>

      <div>
        {religionInfo.map((category, index) => (
          <div key={index}>
            <h2>
              {index + 1}. {category.category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            {category.faiths.map((faith, faithIndex) => (
              <div key={faith.faith}>
                <h3>
                  {index + 1}.{faithIndex + 1} {faith.faith}
                </h3>
                <p>
                  <strong>Influence:</strong> {faith.influence || faith.context}
                </p>
                {faith.domination && (
                  <p>
                    <strong>Domination:</strong> {faith.domination}
                  </p>
                )}
                {faith.growth && (
                  <p>
                    <strong>Growth:</strong> {faith.growth}
                  </p>
                )}
                {faith.characteristics && (
                  <p>
                    <strong>Characteristics:</strong> {faith.characteristics}
                  </p>
                )}
                {faith.adherent && (
                  <p>
                    <strong>Adherent:</strong> {faith.adherent}
                  </p>
                )}
                {faith.practices && (
                  <p>
                    <strong>Practices:</strong> {faith.practices}
                  </p>
                )}
                {faith.groups && (
                  <p>
                    <strong>Groups:</strong> {faith.groups}
                  </p>
                )}
                {faith.role && (
                  <p>
                    <strong>Role:</strong> {faith.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
