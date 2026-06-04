import { PODIUM_POINTS, PODIUM_TRIPLE_MULTIPLIER, POINTS_EXACT_SCORE, POINTS_CORRECT_OUTCOME, GROUP_STAGE_END_DATE, WILD_CARD_MULTIPLIER } from '../utils/worldCupData.js';

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
              <span className="rules-podium-sub-icon">{'\u270F\uFE0F'}</span>
              <div>
                <strong className="rules-podium-sub-title">Change</strong>
                <p className="rules-podium-sub-text">Revise your podium picks once after the group stage ends ({gsd}).</p>
              </div>
            </div>
            <div className="rules-podium-sub rules-podium-sub--stick">
              <span className="rules-podium-sub-icon">{'\uD83D\uDCCC'}</span>
              <div>
                <strong className="rules-podium-sub-title">Stick</strong>
                <p className="rules-podium-sub-text">Keep unchanged for the {PODIUM_TRIPLE_MULTIPLIER}\u00D7 bonus!</p>
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

      <div className="rules-secondary-grid">
        <div className="rules-secondary-card panel">
          <div className="rules-secondary-header">
            <span className="rules-secondary-icon">{'\uD83D\uDCCB'}</span>
            <h4 className="rules-secondary-title">Leaderboard</h4>
          </div>
          <div className="rules-secondary-body">
            <p><strong>Total Score</strong> = match prediction points + podium points</p>
            <p><strong>Tiebreaker:</strong> Podium points decide the winner.</p>
          </div>
        </div>

        <div className="rules-secondary-card panel">
          <div className="rules-secondary-header">
            <span className="rules-secondary-icon">{'\uD83C\uDFF4'}</span>
            <h4 className="rules-secondary-title">Teams & Groups</h4>
          </div>
          <div className="rules-secondary-body">
            <p><strong>48 teams</strong> in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to Round of 32.</p>
            <p>FIFA world rankings shown on each team card.</p>
          </div>
        </div>

        <div className="rules-secondary-card panel">
          <div className="rules-secondary-header">
            <span className="rules-secondary-icon">{'\uD83E\uDD1D'}</span>
            <h4 className="rules-secondary-title">Leagues</h4>
          </div>
          <div className="rules-secondary-body">
            <p><strong>Master League:</strong> Auto-enrolled &mdash; compete against everyone.</p>
            <p><strong>Private Leagues:</strong> Create with friends via invite link or join code.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
