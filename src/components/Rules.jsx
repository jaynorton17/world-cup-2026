import { PODIUM_POINTS, POINTS_EXACT_SCORE, POINTS_CORRECT_OUTCOME, GROUP_STAGE_END_DATE, WILD_CARD_MULTIPLIER } from '../utils/worldCupData.js';

const gsd = GROUP_STAGE_END_DATE.split('T')[0];

export default function Rules() {
  return (
    <section className="panel rules-panel">
      <div className="rules-header">
        <span className="rules-header-icon">{'\uD83D\uDCD6'}</span>
        <h2 className="rules-header-title">Rules & Scoring</h2>
        <p className="rules-header-subtitle">Everything you need to know about how the prediction game works.</p>
      </div>

      <div className="rules-hero-grid">
        <div className="rules-hero-card rules-hero-card--match">
          <div className="rules-hero-icon">{'\uD83C\uDFB2'}</div>
          <h3 className="rules-hero-title">Match Predictions</h3>
          <div className="rules-hero-items">
            <div className="rules-hero-item">
              <div className="rules-hero-points">+{POINTS_EXACT_SCORE}</div>
              <div className="rules-hero-detail">
                <strong>Exact Score</strong>
                <span>5 base + 1 per goal (e.g. 3-2 = 10pts)</span>
              </div>
            </div>
            <div className="rules-hero-item">
              <div className="rules-hero-points">+{POINTS_CORRECT_OUTCOME}</div>
              <div className="rules-hero-detail">
                <strong>Correct Outcome</strong>
                <span>Predict winner/draw but wrong score</span>
              </div>
            </div>
            <div className="rules-hero-item">
              <div className="rules-hero-points rules-hero-points--zero">+0</div>
              <div className="rules-hero-detail">
                <strong>Wrong</strong>
                <span>Missed both score and outcome</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rules-hero-card rules-hero-card--podium">
          <div className="rules-hero-icon">{'\uD83C\uDFC6'}</div>
          <h3 className="rules-hero-title">Podium Prediction</h3>
          <div className="rules-hero-items">
            <div className="rules-hero-item">
              <div className="rules-hero-points">+{PODIUM_POINTS.first}</div>
              <div className="rules-hero-detail">
                <strong>Winner</strong>
                <span>Pick the champion</span>
              </div>
            </div>
            <div className="rules-hero-item">
              <div className="rules-hero-points">+{PODIUM_POINTS.second}</div>
              <div className="rules-hero-detail">
                <strong>Runner Up</strong>
                <span>Pick the runner-up</span>
              </div>
            </div>
            <div className="rules-hero-item">
              <div className="rules-hero-points">+{PODIUM_POINTS.third}</div>
              <div className="rules-hero-detail">
                <strong>3rd Place</strong>
                <span>Pick the third-place finisher</span>
              </div>
            </div>
          </div>
          <div className="rules-podium-split">
            <div className="rules-podium-sub rules-podium-sub--change">
              <span className="rules-podium-sub-icon">{'\uD83D\uDD12'}</span>
              <div>
                <strong className="rules-podium-sub-title">Lock on Submit</strong>
                <p className="rules-podium-sub-text">Your picks lock immediately when you submit them — no editing later.</p>
              </div>
            </div>
            <div className="rules-podium-sub rules-podium-sub--stick">
              <span className="rules-podium-sub-icon">{'\uD83C\uDFC6'}</span>
              <div>
                <strong className="rules-podium-sub-title">Fixed Points</strong>
                <p className="rules-podium-sub-text">Points are awarded at the end of the World Cup: {PODIUM_POINTS.first} / {PODIUM_POINTS.second} / {PODIUM_POINTS.third}.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rules-hero-card rules-hero-card--wildcard">
          <div className="rules-hero-icon">{'\uD83C\uDFB2'}</div>
          <h3 className="rules-hero-title">Wild Card &mdash; Use It or Lose It</h3>
          <div className="rules-hero-items">
            <div className="rules-hero-item">
              <div className="rules-hero-points">{'\u00D7'}{WILD_CARD_MULTIPLIER}</div>
              <div className="rules-hero-detail">
                <strong>One Day Per Round</strong>
                <span>Pick one matchday each round &mdash; all your points on that day are multiplied by {WILD_CARD_MULTIPLIER}!</span>
              </div>
            </div>
            <div className="rules-hero-item">
              <div className="rules-hero-points rules-hero-points--zero">&mdash;</div>
              <div className="rules-hero-detail">
                <strong>Use It or Lose It</strong>
                <span>If you don't activate your Wild Card in a round, it doesn't carry over.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
