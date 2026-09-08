import { pursuits } from "@/data/beyond";

// Card grounds cycle chrome -> sea -> deep, the principle-card cycle from the
// brand book. Deep inverts the ink; the tokens are set in CSS.
const TONES = ["chrome", "sea", "deep"];

export default function Beyond() {
  return (
    <section id="beyond" className="beyond">
      <div className="wrap">
        <h2 className="cv__title">Beyond the code</h2>
        <div className="beyond__intro">
          <p>
            I grew up on Cozumel, an island off the Caribbean coast of Mexico.
            The beaches are the kind people cross oceans to see, and I had them
            as a backyard. It is known as the sports island, and it lives up to
            it. Most of what I do for fun started there.
          </p>
          <p>
            I trained as a high-performance athlete for 15 years. It taught me
            how to work toward a goal for years at a time. It also taught me
            that the goal is rarely what you remember afterwards. The training
            is. I still think about work that way.
          </p>
          <p>
            Work is not the whole of life, and neither are the people you meet
            through it. I am a self-declared home barista, and I love making
            coffee for people when they come over. I build small personal
            projects with AI, mostly to see what happens. I play padel on a team
            in Madrid. And every so often I go out to look at the stars. I have
            loved science since before any of this. For a while I even ran a
            science outreach project.
          </p>
        </div>

        <ul className="beyond__grid">
          {pursuits.map((pursuit, i) => (
            <li
              key={pursuit.id}
              className={`bcard bcard--${TONES[i % TONES.length]}`}
            >
              {pursuit.photo && (
                <div className="bcard__shot">
                  <img src={pursuit.photo} alt={pursuit.alt} loading="lazy" />
                </div>
              )}
              <div className="bcard__body">
                <h3>{pursuit.title}</h3>
                <p>{pursuit.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
