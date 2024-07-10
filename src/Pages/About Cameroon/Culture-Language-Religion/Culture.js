import {
  cultureInfo,
  languageInfo,
  religionInfo,
} from "../../../Components/Data/data";

export default function Culture() {
  return (
    <div className="mt-10 mx-20 px-20">
      <div className="mb-8">
        {/* CULTURE SECTION */}

        <h1 className="text-gray-800 text-4xl font-medium">
          Cultures
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-xl my-4">
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
            <h2 className="text-gray-800 text-3xl font-medium my-4">
              {index + 1}. {group.people}
            </h2>
            {group.language && (
              <p className="text-xl">
                <strong className="text-gray-800">Language:</strong>{" "}
                {group.language}
              </p>
            )}
            {group.location && (
              <p className="text-xl">
                <strong className="text-gray-800">Location:</strong>{" "}
                {group.location}
              </p>
            )}
            {group.culture && (
              <p className="text-xl">
                <strong className="text-gray-800">Culture:</strong>{" "}
                {group.culture}
              </p>
            )}
            {group.children?.map((child, childIndex) => (
              <div key={childIndex} style={{ marginLeft: "20px" }}>
                <h3 className="text-gray-800 text-2xl font-medium my-2">
                  {index + 1}.{childIndex + 1} {child.people}
                </h3>
                <p className="text-xl">
                  <strong className="text-gray-800">Language:</strong>{" "}
                  {child.language}
                </p>
                <p className="text-xl">
                  <strong className="text-gray-800">Location:</strong>{" "}
                  {child.location}
                </p>
                <p className="text-xl">
                  <strong className="text-gray-800">Culture:</strong>{" "}
                  {child.culture}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* LANGUAGE SECTION */}

      <div className="mb-8">
        <h1 className="text-gray-800 text-4xl my-8 font-medium">
          Languages
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-gray-900 text-xl">
          Cameroon is often referred to as a linguistic and cultural crossroads
          due to its immense linguistic diversity. The country is home to over
          250 languages, reflecting its complex ethnic composition.
        </p>

        <p className="text-gray-900 text-xl">Nation Languages:</p>
      </div>

      <div>
        {languageInfo.map((category, index) => (
          <div key={index}>
            <h2 className="text-gray-800 text-3xl font-medium my-4">
              {index + 1}. {category.category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            {category.languages.map((lang, langIndex) => (
              <div key={lang.language}>
                <h3 className="text-gray-800 text-2xl font-medium my-2">
                  {index + 1}.{langIndex + 1} {lang.language}
                </h3>
                <p className="text-xl">
                  <strong className="text-gray-800">Usage:</strong>{" "}
                  {lang.usage || lang.context}
                </p>
                {lang.historicalContext && (
                  <p className="text-xl">
                    <strong className="text-gray-800">
                      Historical Context:
                    </strong>{" "}
                    {lang.historicalContext}
                  </p>
                )}
                {lang.significance && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Significance:</strong>{" "}
                    {lang.significance}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* RELIGION SECTION */}

      <div className="mb-8">
        <h1 className="text-gray-800 text-4xl my-8 font-medium">
          Religions
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-xl">
          Cameroon is religiously diverse, with Christianity and Islam being the
          predominant faiths. Traditional African religions also play a
          significant role in the spiritual and cultural lives of many
          communities.
        </p>
      </div>

      <div>
        {religionInfo.map((category, index) => (
          <div key={index}>
            <h2 className="text-gray-800 text-3xl font-medium my-4">
              {index + 1}. {category.category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            {category.faiths.map((faith, faithIndex) => (
              <div key={faith.faith}>
                <h3 className="text-gray-800 my-2 font-medium text-2xl">
                  {index + 1}.{faithIndex + 1} {faith.faith}
                </h3>
                <p className="text-xl">
                  <strong className="text-gray-800">Influence:</strong>{" "}
                  {faith.influence || faith.context}
                </p>
                {faith.domination && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Domination:</strong>{" "}
                    {faith.domination}
                  </p>
                )}
                {faith.growth && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Growth:</strong>{" "}
                    {faith.growth}
                  </p>
                )}
                {faith.characteristics && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Characteristics:</strong>{" "}
                    {faith.characteristics}
                  </p>
                )}
                {faith.adherent && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Adherent:</strong>{" "}
                    {faith.adherent}
                  </p>
                )}
                {faith.practices && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Practices:</strong>{" "}
                    {faith.practices}
                  </p>
                )}
                {faith.groups && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Groups:</strong>{" "}
                    {faith.groups}
                  </p>
                )}
                {faith.role && (
                  <p className="text-xl">
                    <strong className="text-gray-800">Role:</strong>{" "}
                    {faith.role}
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
