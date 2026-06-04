# New session - 2026-06-04T00:17:35.117Z

**Session ID:** ses_17001e673ffeK2racoONq63r9M
**Created:** 04/06/2026, 01:17:35
**Updated:** 04/06/2026, 18:22:41

---

## User

---

## Assistant (Plan · DeepSeek V4 Flash Free · 11.7s)

_Thinking:_

The user is saying "Continue if you have next steps, or stop and ask for clarification if you are unsure how to proceed." Since I'm in plan mode, I should not make any edits. I've already identified the issue - it's a caching problem on the deployed site. The code is correct.

Let me think about what next steps I can propose:

1. The diagnosis is complete - the deployed code is correct (confirmed the HTML, JS, and CSS all contain the new code).
2. The user needs to verify they're on the deployed URL, not localhost.
3. The user needs to do a hard refresh in an incognito window.

Since I can't make changes in plan mode, I should present this to the user and ask them to try these steps, or ask if they want me to proceed with any code changes when they're ready.

Actually, let me think if there's anything else I can do from a code perspective. The user said "THEY ARE ON TOP OF EACH OTHER" - which suggests the cards are overlapping. With my new code using `wc-grid-2col` display: grid, this shouldn't happen. But maybe there's a CSS issue I haven't considered.

Let me look at the CSS more carefully. The `wc-grid-2col` has `display: grid; grid-template-columns: 1fr 1fr; gap: 8px;`. This should create a clean 2-column grid.

The `wc-match-card` has `display: flex; flex-direction: column;` which is fine.

Wait - let me check if there's any other CSS that might be interfering. Maybe there's a parent container that's using flexbox and the grid isn't being respected.

Let me check the WorldCupPanel component's container structure. But I already read it and the structure is:
1. Group buttons at top
2. Match type tabs
3. For group stage: `.wc-grid-2col` with `.wc-match-card` children
4. For knockout: legacy `.wc-match-row` styles

Actually, I need to look more carefully at the JSX structure. Let me check if there's a wrapper div around the grid that might have conflicting display properties.

But wait - I'm in plan mode, I should read files, not edit them. Let me check if there's a potential issue.

Actually, the user's original complaint was about the OLD layout (group cards). After my changes, the layout should be completely different. If the user is still seeing the OLD layout, it's because the old code is being loaded, not because of a CSS issue with the new code.

So my plan is:
1. Diagnose caching issue (done)
2. Propose solutions to user

Let me present this clearly to the user.

I've fully diagnosed the issue. The deployed code **is correct** — the live `index.html` references the new hashed JS/CSS, and both files contain `wc-grid-2col`. The only explanation is your browser is loading a cached version of the old page.

**Next steps (pick one):**

1. **Quick test** — Open a **private/incognito window** and navigate to `https://worldcup2026-92e25.web.app`. That bypasses all cached data and will show the new layout.

2. **Hard refresh** — On the deployed page, open DevTools (F12), check **Disable cache** in the Network tab, then Ctrl+F5 (Windows) / Cmd+Shift+R (Mac).

3. **If neither works** — You might be looking at `http://localhost:5173` (the dev server) instead of the deployed URL. Check your address bar.

If you confirm the issue persists even in incognito, I'll dig deeper into the JSX structure to look for runtime errors. Otherwise, this is purely a cache problem and the code is ready to go.

---

## User

they are still on top of each other! even in incognito mode. 

---

## Assistant (Plan · DeepSeek V4 Flash Free · 11.9s)

_Thinking:_

The user says it's still happening even in incognito mode. So the deployed code IS correct but they still see the old layout. Since incognito bypasses browser cache, and the CDN is serving the new HTML, this means the code must actually have a bug that I'm not seeing.

Let me re-read the JSX more carefully. The user says "they are on top of each other" - meaning the group cards are overlapping. But wait, with my new code, there are NO group cards anymore. So either:
1. My code changes didn't actually take effect (but the built JS has `wc-grid-2col`)
2. There's a rendering issue with the new cards (they look "on top of each other" because they have no visible separation)
3. The user is describing a different part of the page

Wait - the user might be describing the KNOCKOUT stage, not the group stage! I kept the legacy `wc-match-row` styles for the knockout stage. Maybe those rows are overlapping?

Or maybe the user is looking at the match detail panel (when you select a match), not the match list?

Let me re-read the full WorldCupPanel.jsx code carefully. I need to understand the entire component structure.

Actually, I'm in plan mode - I can't make edits. But I can read files and investigate. Let me re-read the component to understand the full rendering.

Actually, maybe the issue is simpler. Let me read what the user wrote earlier in the conversation. The user said "Matches still not sorted" and "THEY ARE ON TOP OF EACH OTHER" - this was in reference to the OLD layout where there were group cards with country names (S. Korea, Canada, USA, etc.) stacked on top of each other.

Now, with the new code, the old group cards should be completely gone and replaced by the 2-column grid. But the user still sees the overlapping issue.

Maybe there's a CSS issue where the cards ARE rendering but without proper spacing between them in the grid. Let me look at the CSS more carefully.

`wc-grid-2col` has `gap: 8px;` which should work fine.

Wait, let me think about this differently. What if the deployed HTML is correct but there's a JavaScript RUNTIME error that prevents the new code from executing? If there's a JS error in the component, React might fail to render entirely, but that doesn't explain how the user would see the OLD layout.

Unless... there's a JavaScript error that causes the component to fall back to a different rendering path, or causes React to not update the DOM properly.

Actually, I need to read the actual file and trace through the logic more carefully. Let me read the entire component.

Actually, I know what might be happening. Let me check if there's an issue with the `useState` or `useEffect` for the active match. If the active match state causes a re-render issue...

Or wait - let me check if maybe there's a problem with how the INACTIVE league functions. The user might be using a PREVIOUSLY created league that was built with the old code. But no, that doesn't make sense - the component rendering is client-side only.

Let me re-read the full component file.

OK, the code is deployed correctly but still broken. There must be a runtime issue. Let me trace through the exact rendering logic.

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 60,
  "offset": 620
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
620:                   {getDisplayName(uid)} ({last?.[uid] || 0})
621:                 </span>
622:               );
623:             })}
624:           </div>
625:         </div>
626:       )}
627: 
628:       {filter === 'all' && (
629:         <div className="wc-stage-bar">
630:           {stageProgress.map((s) => (
631:             <div key={s.stage} className="wc-stage-bar-segment" title={`${s.label}: ${s.scored}/${s.total}`}>
632:               <div className="wc-stage-bar-fill" style={{ width: `${s.total > 0 ? (s.scored / s.total) * 100 : 0}%` }} />
633:             </div>
634:           ))}
635:         </div>
636:       )}
637: 
638:       {[1, 2, 3].map((day) => {
639:         if (filter !== 'all' && filter !== `round${day}`) return null;
640:         const dayMatches = grouped.group.filter((m) => m.matchday === day && isSearchMatch(m));
641:         if (dayMatches.length === 0) return null;
642:         return (
643:           <div key={day} className="wc-round-section">
644:             <div className="wc-round-title">Round {day}</div>
645:             <div className="wc-grid-2col">
646:               {dayMatches.map((m) => (
647:                 <div key={m.matchKey} className={`wc-match-card${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-card--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
648:                   <div className="wc-match-card-teams">
649:                     <FlagImg team={m.homeTeam} />
650:                     <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
651:                     {m.actual?.homeScore != null ? (
652:                       <span className="wc-inline-score wc-inline-score--actual">
653:                         {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
654:                       </span>
655:                     ) : m.predictions?.[user?.uid] ? (
656:                       <span className="wc-inline-score">
657:                         {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
658:                       </span>
659:                     ) : (
660:                       <span className="wc-vs">vs</span>
661:                     )}
662:                     <FlagImg team={m.awayTeam} />
663:                     <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
664:                   </div>
665:                   <div className="wc-match-card-meta">
666:                     <span className="wc-match-card-venue">{'\uD83C\uDFDF\uFE0F'} {m.venue}</span>
667:                     <span className="wc-match-card-date">{'\uD83D\uDCC5'} {formatMatchKickoff(m.matchDate)}</span>
668:                   </div>
669:                   <div className="wc-match-card-countdown">
670:                     <TileCountdown matchDate={m.matchDate} />
671:                   </div>
672:                 </div>
673:               ))}
674:             </div>
675:           </div>
676:         );
677:       })}
678:  
679:        {filter === 'all' && (

(Showing lines 620-679 of 793. Use offset=680 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 4.9s)

_Thinking:_

The code looks correct. But wait - let me check lines 679 onwards. The knockout stage starts after this. Let me also check the very beginning of this section to see if `filter === 'all'` condition surrounds the group stage and knockout stage sections.

The `filter === 'all'` check at line 638 says `if (filter !== 'all' && filter !== `round${day}`) return null;` — so the group matches show when filter is 'all' OR the specific round.

But wait, what if `filter` is not 'all'? Let me read the filter state...

Also, I need to check lines 679-793 to see the knockout section.

And I need to check if there are leftover renders from the OLD code that could still be producing group cards.

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 120,
  "offset": 679
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
679:        {filter === 'all' && (
680:         <div className="wc-knockout-section">
681:           <h3 className="wc-section-title">{'\uD83C\uDFC6'} Knockout Stage</h3>
682:           {['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'].map((stage) => {
683:             const stageMatches = grouped[stage];
684:             if (!stageMatches || stageMatches.length === 0) return null;
685:             const isBracket = stage === 'quarterFinal' || stage === 'semiFinal' || stage === 'final' || stage === 'thirdPlace';
686:             return (
687:               <div key={stage} className={`wc-stage-group ${isBracket ? 'wc-stage-bracket' : ''}`}>
688:                 <h4 className="wc-stage-title">{STAGE_LABELS[stage]}</h4>
689:                 <div className={`wc-stage-matches ${isBracket ? 'wc-bracket-grid' : ''}`}>
690:                   {stageMatches.filter(isSearchMatch).map((m) => (
691:                     <div key={m.matchKey} className={`wc-match-row ${isBracket ? 'wc-match-row--bracket' : ''}${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-row--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
692:                       <span className="wc-match-status">{matchStatusIcon(m)}</span>
693:                       <span className="wc-match-teams">
694:                         <FlagImg team={m.homeTeam} />
695:                         <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
696:                         {m.actual?.homeScore != null ? (
697:                           <span className="wc-inline-score wc-inline-score--actual">
698:                             {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
699:                           </span>
700:                         ) : m.predictions?.[user?.uid] ? (
701:                           <span className="wc-inline-score">
702:                             {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
703:                           </span>
704:                         ) : (
705:                           <span className="wc-vs">vs</span>
706:                         )}
707:                         <FlagImg team={m.awayTeam} />
708:                         <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
709:                       </span>
710:                       <span className="wc-match-points">
711:                         {m.actual?.homeScore != null && sortedUserUids.map((uid) => {
712:                           const pts = m.points?.[uid];
713:                           return pts != null ? pointsBadge(pts, isExactScore(m.predictions?.[uid], m.actual)) : null;
714:                         })}
715:                       </span>
716:                       <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
717:                     </div>
718:                   ))}
719:                 </div>
720:               </div>
721:             );
722:           })}
723:         </div>
724:       )}
725: 
726:       <footer className="wc-footer">
727:         <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--exact" /> Exact (5 + 1 per goal)</span>
728:         <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--outcome" /> Outcome {POINTS_CORRECT_OUTCOME}pts</span>
729:         <span className="wc-legend"><span className="wc-legend-dot wc-legend-dot--wrong" /> Wrong {POINTS_WRONG}pts</span>
730:       </footer>
731: 
732:       {selectedMatch && createPortal(
733:         <div className="modal-backdrop" role="presentation" onClick={closeModal}>
734:           <div className="panel modal-panel wc-modal" role="dialog" aria-modal="true" aria-label="Match details" onClick={(e) => e.stopPropagation()}>
735:             <MatchDetailModal
736:               match={selectedMatch}
737:               user={user}
738:               userDoc={userDoc}
739:               firestore={firestore}
740:               isAdmin={isAdmin}
741:               matches={matches}
742:               sortedUserUids={sortedUserUids}
743:               getDisplayName={getDisplayName}
744:               getUserColor={getUserColor}
745:               onSubmitPrediction={submitPrediction}
746:               onSubmitActual={submitActual}
747:               onUpdateTeams={updateTeams}
748:               onClose={closeModal}
749:             />
750:           </div>
751:         </div>,
752:         document.body
753:       )}
754:     </section>
755:   );
756: }
757: 
758: function TileCountdown({ matchDate }) {
759:   const [now, setNow] = useState(Date.now());
760:   useEffect(() => {
761:     const id = setInterval(() => setNow(Date.now()), 1000);
762:     return () => clearInterval(id);
763:   }, []);
764:   const diff = new Date(matchDate).getTime() - now;
765:   if (diff <= 0) return <span className="wc-tile-countdown wc-tile-countdown--live">LIVE</span>;
766:   const d = Math.floor(diff / 86400000);
767:   const h = Math.floor((diff % 86400000) / 3600000);
768:   const m = Math.floor((diff % 3600000) / 60000);
769:   const s = Math.floor((diff % 60000) / 1000);
770:   let parts = [];
771:   if (d > 0) parts.push(d + 'd');
772:   parts.push(h + 'h', m + 'm', s + 's');
773:   return <span className="wc-tile-countdown">{parts.join(' ')}</span>;
774: }
775: 
776: function shortTeam(name) {
777:   if (name === 'Bosnia and Herzegovina') return 'Bosnia';
778:   if (name === "C\u00F4te d'Ivoire") return "C\u00F4te d'Ivoire";
779:   if (name === 'Korea Republic') return 'S. Korea';
780:   if (name === 'IR Iran') return 'Iran';
781:   if (name === 'Cabo Verde') return 'C. Verde';
782:   if (name === 'Congo DR') return 'Congo';
783:   if (name === 'Saudi Arabia') return 'Saudi Ar.';
784:   if (name === 'Netherlands') return 'Netherlands';
785:   if (name === 'Switzerland') return 'Switzerland';
786:   if (name === 'Czechia') return 'Czechia';
787:   if (name === 'T\u00FCrkiye') return 'T\u00FCrkiye';
788:   if (name === 'New Zealand') return 'N. Zealand';
789:   if (name.length > 9) return name.slice(0, 8) + '\u2026';
790:   return name;
791: }
792: 
793: 

(End of file - total 793 lines)
</content>
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "wc-group-card|wc-groups-grid|group-div|standings",
  "include": "WorldCupPanel.jsx"
}
```

**Output:**
```
No files found
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 6.4s)

_Thinking:_

OK, so there are absolutely ZERO references to `wc-group-card`, `wc-groups-grid`, `group-div`, or `standings` in WorldCupPanel.jsx. The old code is completely gone.

Now let me think more carefully. The user says "they are still on top of each other" even in incognito. Let me re-examine what "on top of each other" means in the context of the NEW code.

With the new code, the group matches render as cards in a 2-column grid. The cards are small, compact. Maybe they're just very close together and the user thinks the gap is too small? Or maybe the grid `gap: 8px` is too tight?

Wait, but the user's original complaint included a diagram with S. Korea, Canada, USA cards with "Crowd Predictions" boxes. That's the OLD layout. If the NEW code is deployed, they shouldn't see any of that.

Unless... the issue is something completely different. Let me think about what "on top of each other" could mean in the current code.

Hold on. What if there's an ISSUE with how the data is grouped? The code uses `grouped.group.filter(...)` for matches in a group called "group". But in the new expanded 48-team World Cup, what are the group names? Let me check the data structure.

Actually, let me look at the top of the component to understand how `grouped` is structured:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 120,
  "offset": 1
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
1: import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
2: import { createPortal } from 'react-dom';
3: import {
4:   collection,
5:   doc,
6:   onSnapshot,
7:   writeBatch,
8:   updateDoc,
9:   serverTimestamp,
10: } from 'firebase/firestore';
11: import {
12:   WORLD_CUP_2026_MATCHES,
13:   STAGE_LABELS,
14:   STAGE_ORDER,
15:   GROUP_NAMES,
16:   getCurrentRound,
17:   calculateMatchPoints,
18:   isExactScore,
19:   isMatchDeadlinePassed,
20:   isMatchPast,
21:   getFlagUrl,
22:   formatMatchKickoff,
23:   POINTS_CORRECT_OUTCOME,
24:   POINTS_WRONG,
25: } from '../utils/worldCupData.js';
26: import { autoFetchResults } from '../utils/worldCupApi.js';
27: import { getTeamData } from '../utils/teamData.js';
28: import MatchDetailModal from './MatchDetailModal.jsx';
29: 
30: const SCORE_EMPTY = { homeScore: null, awayScore: null };
31: const USER_COLORS = ['#5bc0ff', '#ff7eb3', '#3ddc84', '#f0c040', '#c084fc', '#fb923c', '#f97316', '#22d3ee'];
32: 
33: const deriveOutcome = (h, a) => {
34:   if (h == null || a == null) return null;
35:   return h > a ? 'home' : h < a ? 'away' : 'draw';
36: };
37: 
38: const formatDate = (iso) => {
39:   const d = new Date(iso);
40:   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
41: };
42: 
43: function FlagImg({ team, size = 24 }) {
44:   const url = getFlagUrl(team);
45:   if (!url) return <span className="wc-flag-placeholder" />;
46:   return (
47:     <img
48:       className="wc-flag"
49:       src={url}
50:       alt={team}
51:       width={size}
52:       height={size * 0.75}
53:       loading="lazy"
54:     />
55:   );
56: }
57: 
58: function seedWorldCupMatches(firestore) {
59:   if (!firestore) return;
60:   const batch = writeBatch(firestore);
61:   WORLD_CUP_2026_MATCHES.forEach((match) => {
62:     const ref = doc(firestore, 'worldCupPredictions', match.matchKey);
63:     batch.set(ref, {
64:       ...match,
65:       predictions: {},
66:       actual: SCORE_EMPTY,
67:       actualSetAt: null,
68:       points: {},
69:       status: 'open',
70:       updatedAt: serverTimestamp(),
71:     }, { merge: true });
72:   });
73:   batch.commit().catch((err) => console.warn('World Cup seed failed', err));
74: }
75: 
76: export default function WorldCupPanel({ user, firestore, userDoc }) {
77:   const [matchDocs, setMatchDocs] = useState([]);
78:   const [usersMap, setUsersMap] = useState({});
79:   const [dbReady, setDbReady] = useState(false);
80:   const [modalMatchKey, setModalMatchKey] = useState(null);
81:   const [filter, setFilter] = useState(() => {
82:     const r = getCurrentRound();
83:     return r ? `round${r.round}` : 'all';
84:   });
85:   const [searchQuery, setSearchQuery] = useState('');
86:   const [isFetching, setIsFetching] = useState(false);
87:   const [fetchStatus, setFetchStatus] = useState(null);
88: 
89:   const seededRef = useRef(false);
90: 
91:   useEffect(() => {
92:     if (!firestore) { setDbReady(true); return; }
93:     const unsub = onSnapshot(collection(firestore, 'worldCupPredictions'), (snap) => {
94:       const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
95:       setMatchDocs(docs);
96:       setDbReady(true);
97:       if (docs.length === 0 && !seededRef.current) {
98:         seededRef.current = true;
99:         seedWorldCupMatches(firestore);
100:       }
101:     }, (err) => { console.warn('WC snapshot error', err); setDbReady(true); });
102:     return unsub;
103:   }, [firestore]);
104: 
105:   useEffect(() => {
106:     if (!firestore) return;
107:     const unsub = onSnapshot(collection(firestore, 'users'), (snap) => {
108:       const map = {};
109:       snap.docs.forEach((d) => { map[d.id] = d.data(); });
110:       setUsersMap(map);
111:     }, (err) => console.warn('Users snapshot error', err));
112:     return unsub;
113:   }, [firestore]);
114: 
115:   const isAdmin = user && usersMap[user.uid]?.role === 'admin';
116: 
117:   const wcActivatedDay = useMemo(() => {
118:     const round = getCurrentRound();
119:     if (!round || !userDoc) return null;
120:     const wc = userDoc.wildCards?.['round' + round.round];

(Showing lines 1-120 of 793. Use offset=121 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 2.8s)

_Thinking:_

Let me continue reading to see the `grouped` logic and understand how matches are organized:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 120,
  "offset": 121
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
121:     return wc?.day || null;
122:   }, [userDoc]);
123: 
124:   const sortedUserUids = useMemo(() => {
125:     return Object.keys(usersMap).sort((a, b) => {
126:       const nA = usersMap[a]?.displayName || usersMap[a]?.email || (a === user?.uid && user?.displayName) || a;
127:       const nB = usersMap[b]?.displayName || usersMap[b]?.email || (b === user?.uid && user?.displayName) || b;
128:       return nA.localeCompare(nB);
129:     });
130:   }, [usersMap]);
131: 
132:   const getDisplayName = useCallback((uid) => {
133:     return usersMap[uid]?.displayName || usersMap[uid]?.email || (uid === user?.uid && user?.displayName) || uid.slice(0, 6);
134:   }, [usersMap, user]);
135: 
136:   const getUserColor = useCallback((uid) => {
137:     const idx = sortedUserUids.indexOf(uid);
138:     return USER_COLORS[Math.max(0, idx) % USER_COLORS.length];
139:   }, [sortedUserUids]);
140: 
141:   const matches = useMemo(() => {
142:     const map = {};
143:     matchDocs.forEach((d) => { map[d.matchKey] = d; });
144:     return WORLD_CUP_2026_MATCHES.map((m) => {
145:       const doc = map[m.matchKey] || {};
146:       return {
147:         ...m,
148:         ...doc,
149:         id: doc.id || m.matchKey,
150:         predictions: doc.predictions || {},
151:         actual: doc.actual || SCORE_EMPTY,
152:         points: doc.points || {},
153:       };
154:     });
155:   }, [matchDocs]);
156: 
157:   const predictedCount = useMemo(
158:     () => matches.filter((m) => m.stage === 'group' && m.predictions?.[user?.uid]?.homeScore != null).length,
159:     [matches, user],
160:   );
161: 
162:   const unpredicted = useMemo(
163:     () => matches.filter((m) =>
164:       m.stage === 'group' &&
165:       !isMatchDeadlinePassed(m.matchDate) &&
166:       m.actual?.homeScore == null &&
167:       m.predictions?.[user?.uid]?.homeScore == null
168:     ).length,
169:     [matches, user],
170:   );
171: 
172:   const stageProgress = useMemo(() => {
173:     return STAGE_ORDER.map((stage) => {
174:       const stageMatches = matches.filter((m) => m.stage === stage);
175:       const total = stageMatches.length;
176:       const scored = stageMatches.filter((m) => m.actual?.homeScore != null).length;
177:       return { stage, label: STAGE_LABELS[stage], total, scored };
178:     });
179:   }, [matches]);
180: 
181:   const groupStandings = useMemo(() => {
182:     const result = {};
183:     GROUP_NAMES.forEach((g) => {
184:       const groupMatches = matches.filter((m) => m.groupName === g);
185:       const teams = {};
186:       groupMatches.forEach((m) => {
187:         const h = m.homeTeam, aw = m.awayTeam;
188:         if (!teams[h]) teams[h] = { team: h, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
189:         if (!teams[aw]) teams[aw] = { team: aw, pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
190:         if (m.actual?.homeScore == null) return;
191:         const sh = Number(m.actual.homeScore), sa = Number(m.actual.awayScore);
192:         teams[h].pld++; teams[aw].pld++;
193:         teams[h].gf += sh; teams[h].ga += sa;
194:         teams[aw].gf += sa; teams[aw].ga += sh;
195:         if (sh > sa) { teams[h].w++; teams[h].pts += 3; teams[aw].l++; }
196:         else if (sh < sa) { teams[aw].w++; teams[aw].pts += 3; teams[h].l++; }
197:         else { teams[h].d++; teams[h].pts++; teams[aw].d++; teams[aw].pts++; }
198:       });
199:       const list = Object.values(teams).map((t) => ({ ...t, gd: t.gf - t.ga }));
200:       list.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));
201:       result[g] = list;
202:     });
203:     return result;
204:   }, [matches]);
205: 
206:   const pointTrend = useMemo(() => {
207:     const scored = matches
208:       .filter((m) => m.actual?.homeScore != null)
209:       .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
210:     const totals = {};
211:     sortedUserUids.forEach((uid) => { totals[uid] = 0; });
212:     return scored.map((m) => {
213:       Object.entries(m.points || {}).forEach(([uid, p]) => {
214:         if (totals[uid] !== undefined) totals[uid] += Number(p || 0);
215:       });
216:       return { ...totals };
217:     });
218:   }, [matches, sortedUserUids]);
219: 
220:   const selectedMatch = useMemo(
221:     () => matches.find((m) => m.matchKey === modalMatchKey) || null,
222:     [matches, modalMatchKey],
223:   );
224: 
225:   const nextMatch = useMemo(() => {
226:     const upcoming = matches
227:       .filter((m) => {
228:         if (isMatchDeadlinePassed(m.matchDate)) return false;
229:         if (m.actual?.homeScore != null) return false;
230:         const pred = m.predictions?.[user?.uid];
231:         return pred?.homeScore == null;
232:       })
233:       .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
234:     return upcoming[0] || null;
235:   }, [matches, user]);
236: 
237:   const nextKickoff = useMemo(() => {
238:     const upcoming = matches
239:       .filter((m) => {
240:         if (isMatchPast(m.matchDate)) return false;

(Showing lines 121-240 of 793. Use offset=241 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 2.6s)

_Thinking:_

I see the `groupStandings` function at line 181, but it's just a useMemo, not rendered anywhere. Let me search for where it's used:

**Tool: grep**

**Input:**
```json
{
  "pattern": "groupStandings",
  "include": "WorldCupPanel.jsx"
}
```

**Output:**
```
Found 1 matches
C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx:
  Line 181:   const groupStandings = useMemo(() => {

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 5.2s)

_Thinking:_

`groupStandings` is defined but never used. That's fine - it's just a leftover, not causing any issues.

Now let me think about what "on top of each other" could mean in the NEW layout. Let me look at the knockout section more carefully. The knockout stage uses `wc-match-row` which is a grid layout. Maybe THAT is broken?

Let me look at the knockout section CSS:

```
.wc-match-row {
  display: grid;
  grid-template-columns: 20px 1fr auto auto;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px 14px;
  margin: 0 0 4px;
  ...
}
```

Wait, but those are list items in the knockout stage, and they're inside `wc-stage-matches` which is a regular div. For `.wc-match-row--bracket`, the grid template is the same (`20px 1fr auto auto`). For non-bracket matches, it uses the default `wc-match-row`.

Actually, what if the issue is in the knockout section? Let me look at `.wc-stage-matches` CSS:

**Tool: grep**

**Input:**
```json
{
  "include": "*.css",
  "pattern": "wc-stage-matches|wc-stage-group|wc-knockout-section|wc-bracket-grid"
}
```

**Output:**
```
Found 4 matches
C:\Users\jayno\Projects\world-cup-2026\dist\assets\index-Bdm0sPsP.css:
  Line 1: :root{color:#f7fbff;background:#06142b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box;letter-spacing:0}html,body{min-width:320px;min-height:100%;margin:0;background:#06142b}body{min-height:100vh;overflow-x:hidden}button,input,textarea,select{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.52}.app{position:relative;isolation:isolate;min-height:100vh;padding:16px;background:radial-gradient(circle at 18% 10%,rgba(33,234,255,.26),transparent 22%),radial-gradient(circle at 82% 8%,rgba(0,132,255,.24),transparent 24%),radial-gradient(circle at 50% 100%,rgba(0,92,255,.22),transparent 36%),linear-gradient(180deg,rgba(255,255,255,.08),transparent 26%),linear-gradient(180deg,#0a2347,#0a2f64 28%,#0a1f47 58%,#06142b);overflow:hidden}.panel{background:linear-gradient(135deg,#06142bf2,#0a2850eb);border:1px solid rgba(255,255,255,.08);border-radius:16px}.lobby-panel{padding:12px 16px 20px}.modal-backdrop{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#01040ab3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:fadeIn .15s ease-out}.modal-panel{max-width:440px;width:calc(100% - 32px);max-height:90vh;overflow-y:auto;padding:20px}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.auth-screen{min-height:100svh;padding:clamp(12px,2vw,24px);display:grid;place-items:center;background:radial-gradient(circle at 18% 18%,rgba(33,234,255,.22),transparent 24%),radial-gradient(circle at 82% 76%,rgba(0,132,255,.2),transparent 24%),linear-gradient(120deg,#030c1c9e,#030c1cc7),#081d3f}.auth-card{width:min(560px,100%);padding:16px 0}.auth-card h1{margin:0 0 2px;font-size:1.2rem;font-weight:700;text-align:center;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.auth-card p{margin:0 0 12px;text-align:center;color:#8a...

C:\Users\jayno\Projects\world-cup-2026\src\styles.css:
  Line 1009: .wc-knockout-section { margin-top: 8px; }

  Line 1019: .wc-stage-group { margin-bottom: 12px; }

  Line 1029: .wc-stage-matches {

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 2.6s)

_Thinking:_

Let me read these styles:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 50,
  "offset": 1009
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
1009: .wc-knockout-section { margin-top: 8px; }
1010: 
1011: .wc-section-title {
1012:   font-size: 1.1rem;
1013:   font-weight: 700;
1014:   margin: 14px 0 8px;
1015:   padding-bottom: 6px;
1016:   border-bottom: 1px solid rgba(255, 255, 255, 0.08);
1017: }
1018: 
1019: .wc-stage-group { margin-bottom: 12px; }
1020: 
1021: .wc-stage-title {
1022:   font-size: 0.82rem;
1023:   font-weight: 600;
1024:   margin: 8px 0 4px;
1025:   color: #8fcbff;
1026:   letter-spacing: 0.04em;
1027: }
1028: 
1029: .wc-stage-matches {
1030:   display: flex;
1031:   flex-direction: column;
1032: }
1033: 
1034: .wc-match-row--bracket {
1035:   grid-template-columns: 20px 1fr auto auto;
1036: }
1037: 
1038: .wc-badge {
1039:   display: inline-block;
1040:   padding: 0 5px;
1041:   border-radius: 3px;
1042:   font-size: 0.6rem;
1043:   font-weight: 700;
1044:   line-height: 1.5;
1045: }
1046: 
1047: .wc-badge--exact {
1048:   background: rgba(61, 220, 132, 0.25);
1049:   color: #3ddc84;
1050: }
1051: 
1052: .wc-badge--outcome {
1053:   background: rgba(24, 200, 255, 0.2);
1054:   color: #18c8ff;
1055: }
1056: 
1057: .wc-badge--wrong {
1058:   background: rgba(255, 80, 80, 0.15);

(Showing lines 1009-1058 of 7367. Use offset=1059 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

I see `.wc-stage-matches { display: flex; flex-direction: column; }` which wraps the knockout match rows properly. The knockout section looks fine.

Now let me look at the JavaScript more carefully. Maybe the issue is that there's an unhandled error that prevents the new JSX from executing. Let me check the match data structure.

Actually, I just realized something. The user might be talking about the MATCH MODAL, not the main panel. When they click on a match, the MatchDetailModal opens. Maybe THAT's what's showing elements "on top of each other"?

Or wait - maybe the issue is in how the `group.group` thing works. Let me look at how `grouped` is computed:

Actually, I didn't read the `grouped` computation yet. Let me check:

**Tool: grep**

**Input:**
```json
{
  "include": "WorldCupPanel.jsx",
  "pattern": "grouped"
}
```

**Output:**
```
Found 3 matches
C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx:
  Line 384:   const grouped = useMemo(() => {

  Line 640:         const dayMatches = grouped.group.filter((m) => m.matchday === day && isSearchMatch(m));

  Line 683:             const stageMatches = grouped[stage];

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 2.7s)

_Thinking:_

`grouped.group` - so the group matches are under `grouped.group`. Let me check if the `group` key exists:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 50,
  "offset": 384
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
384:   const grouped = useMemo(() => {
385:     const groups = {};
386:     STAGE_ORDER.forEach((stage) => { groups[stage] = []; });
387:     matches.forEach((m) => { if (groups[m.stage]) groups[m.stage].push(m); });
388:     Object.keys(groups).forEach((stage) => {
389:       if (stage === 'group') {
390:         groups[stage].sort((a, b) => {
391:           const ga = a.groupName || '';
392:           const gb = b.groupName || '';
393:           if (ga !== gb) return ga.localeCompare(gb);
394:           return (a.matchday || 0) - (b.matchday || 0);
395:         });
396:       } else {
397:         groups[stage].sort((a, b) => (a.matchNumber || 0) - (b.matchNumber || 0));
398:       }
399:     });
400:     return groups;
401:   }, [matches]);
402: 
403:   if (!dbReady) {
404:     return <section className="panel lobby-panel wc-panel"><p className="wc-loading">Loading World Cup...</p></section>;
405:   }
406: 
407:   const outcomeLabel = (h, a) => {
408:     const o = deriveOutcome(h, a);
409:     if (o === 'home') return 'Home Win';
410:     if (o === 'away') return 'Away Win';
411:     if (o === 'draw') return 'Draw';
412:     return '';
413:   };
414: 
415:   const pointsBadge = (pts, isExact) => {
416:     if (isExact) return <span className="wc-badge wc-badge--exact" title="Exact score">+{pts}</span>;
417:     if (pts === POINTS_CORRECT_OUTCOME) return <span className="wc-badge wc-badge--outcome" title="Correct outcome">+2</span>;
418:     if (pts === 0) return <span className="wc-badge wc-badge--wrong" title="Wrong">0</span>;
419:     return null;
420:   };
421: 
422:   const matchStatusIcon = (m) => {
423:     if (m.actual?.homeScore != null) return '\uD83D\uDCCA';
424:     if (isMatchDeadlinePassed(m.matchDate)) return '\uD83D\uDD12';
425:     return '\u23F3';
426:   };
427: 
428:   const isSearchMatch = (m) => {
429:     if (searchQuery.trim().length < 2) return true;
430:     const q = searchQuery.trim().toLowerCase();
431:     return m.homeTeam.toLowerCase().includes(q) || m.awayTeam.toLowerCase().includes(q);
432:   };
433: 

(Showing lines 384-433 of 793. Use offset=434 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 3.9s)

_Thinking:_

The `grouped` is computed properly. It groups by `STAGE_ORDER` which includes `'group'` as a stage. The groups are sorted by groupName then matchday.

Now let me look at the tournament structure. For the 2026 World Cup, the group stage has matches organized by matchdays (1, 2, 3) within each group. The current code iterates days 1, 2, 3 and shows all group matches for that day.

Actually, I just realized that the `STAGE_ORDER` might not include 'group' as a key. Let me check:

**Tool: grep**

**Input:**
```json
{
  "include": "worldCupData.js",
  "pattern": "STAGE_ORDER"
}
```

**Output:**
```
Found 1 matches
C:\Users\jayno\Projects\world-cup-2026\src\utils\worldCupData.js:
  Line 156: export const STAGE_ORDER = ['group','roundOf32','roundOf16','quarterFinal','semiFinal','thirdPlace','final'];

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 8.0s)

_Thinking:_

Good - `'group'` IS in the `STAGE_ORDER`, so `grouped.group` will exist as an array.

The code at line 638-677 iterates over days 1, 2, 3 and filters `grouped.group` matches by `matchday`. This looks correct.

Wait, now I need to consider: with 48 teams and 12 groups for the 2026 World Cup, do matches still only have matchdays 1, 2, 3? Each group has 3 matchdays (each team plays 3 group matches). So for 12 groups, there are 36 group matches per matchday, 108 total. The matchday should still be 1, 2, 3. 

OK, I'm stuck trying to understand the bug from reading code. Let me try a different approach. Let me actually try to build and run the app to see what happens. But wait - I'm in plan mode, I can only read.

Let me fetch the actual deployed page to see if there's a JS error visible:

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\.local\\share\\opencode\\tool-output\\tool_e937681ad00169ykmq3HJzEOYZ\" -Pattern \"wc-grid-2col\" -SimpleMatch 2>&1",
  "description": "Check deployed CSS for grid-2col"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e937af34e001HBLl6yV69QJWVk

10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-groups-grid{grid-template-columns:1fr}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-card{padding:8px}.wc-group-title{font-size:.75rem}.wc-standings-table{font-size:.65rem}.wc-standings-table 
th,.wc-standings-table td{padding:3px 4px}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;mi
n-height:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-don
ut-wrap svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 11.4s)

_Thinking:_

The deployed CSS contains `wc-grid-2col` (I can see it in the output). But the output is truncated. Let me specifically search for the grid-2col part.

Actually, I just noticed something weird in the output. Let me look again... there's a line that mentions `wc-groups-grid` in the media query section! Look:

```
@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predictions{padding:8px 10px}.wc-groups-grid{grid-template-columns:1fr}.wc-match-row{grid-template-columns:12px 1fr auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50px}.wc-group-card{padding:8px}.wc-group-title{font-size:.75rem}.wc-standings-table{font-size:.65rem}.wc-standings-table th,.wc-standings-table td{padding:3px 4px}...
```

There's `wc-groups-grid`, `wc-group-card`, `wc-standings-table` in the OLD CSS that I didn't remove! These are styles that reference the old layout classes. Even though the JSX no longer uses these classes, the CSS file still contains them in a media query. But that shouldn't affect anything since the classes aren't used in the JSX anymore.

Wait, but the important thing is: these OLD class names are in the deployed CSS. The JS doesn't use them, so they're just dead CSS. Not a problem.

OK, I'm really stuck. Let me try to reproduce the issue by building and serving the app locally. Oh wait, I'm in plan mode. But I can try...

Actually, let me try to build the app and look at the built output to verify everything is correct:

Let me investigate the actual runtime behavior. I'll check whether there could be a JS error at runtime by looking at the built JS:

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-BDuFWgmG.js\" -Pattern \"wc-grid-2col\" -SimpleMatch 2>&1",
  "description": "Confirm built JS has new class"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e937b1fe0001lpXLinVcQuL6Oy

,h.jsx("span",{children:"Missed both score and outcome"})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-he
ro-card--podium",children:[h.jsx("div",{className:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-t
itle",children:"Podium Prediction"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rule
s-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.first]}),h.jsxs("div",{className:"r
ules-hero-detail",children:[h.jsx("strong",{children:"Winner"}),h.jsx("span",{children:"Pick the champion"})]})]}),h.js
xs("div",{className:"rules-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.second]}),
h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Runner 
Up"}),h.jsx("span",{children:"Pick the runner-up"})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("d
iv",{className:"rules-hero-points",children:["+",cn.third]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.js
x("strong",{children:"3rd Place"}),h.jsx("span",{children:"Pick the third-place 
finisher"})]})]})]}),h.jsxs("div",{className:"rules-podium-split",children:[h.jsxs("div",{className:"rules-podium-sub r
ules-podium-sub--change",children:[h.jsx("span",{className:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{childr
en:[h.jsx("strong",{className:"rules-podium-sub-title",children:"Change"}),h.jsxs("p",{className:"rules-podium-sub-text
",children:["Revise your podium picks once after the group stage ends 
(",R4,")."]})]})]}),h.jsxs("div",{className:"rules-podium-sub rules-podium-sub--stick",children:[h.jsx("span",{classNam
e:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{children:[h.jsx("strong",{className:"rules-podium-sub-title",ch
ildren:"Stick"}),h.jsxs("p",{className:"rules-podium-sub-text",children:["Keep unchanged for the ",kc,"\\u00D7 
bonus!"]})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-hero-card--wildcard",children:[h.jsx("div",{class
Name:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-title",children:"Wild Card - Use It or Lose It
"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("di
v",{className:"rules-hero-points",children:["�",is]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("stro
ng",{children:"One Day Per Round"}),h.jsxs("span",{children:["Pick one matchday each round - all your points on that 
day are multiplied by 
",is,"!"]})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsx("div",{className:"rules-hero-points rules-h
ero-points--zero",children:"-"}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Use 
It or Lose It"}),h.jsx("span",{children:"If you don't activate your Wild Card in a round, it doesn't carry over."})]})]
})]})]})]}),h.jsxs("div",{className:"rules-secondary-grid",children:[h.jsxs("div",{className:"rules-secondary-card pane
l",children:[h.jsxs("div",{className:"rules-secondary-header",children:[h.jsx("span",{className:"rules-secondary-icon",
children:"??"}),h.jsx("h4",{className:"rules-secondary-title",children:"Leaderboard"})]}),h.jsxs("div",{className:"rule
s-secondary-body",children:[h.jsxs("p",{children:[h.jsx("strong",{children:"Total Score"})," = match prediction points 
+ podium points"]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Tiebreaker:"})," Podium points decide the 
winner."]})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-seconda
ry-header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-second
ary-title",children:"Teams & Groups"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children
:[h.jsx("strong",{children:"48 teams"})," in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to 
Round of 32."]}),h.jsx("p",{children:"FIFA world rankings shown on each team 
card."})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-secondary-
header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-secondary
-title",children:"Leagues"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children:[h.jsx("s
trong",{children:"Master League:"})," Auto-enrolled - compete against 
everyone."]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Private Leagues:"})," Create with friends via invite 
link or join code."]})]})]})]})]})}function Ql(n){return n==="Bosnia and Herzegovina"?"Bosnia":n==="C�te 
d'Ivoire"?"C�te d'Ivoire":n==="Korea Republic"?"S. Korea":n==="IR Iran"?"Iran":n==="Cabo Verde"?"C. Verde":n==="Congo 
DR"?"Congo":n==="Saudi Arabia"?"Saudi Ar.":n==="Netherlands"?"Netherlands":n==="Switzerland"?"Switzerland":n==="Czechia
"?"Czechia":n==="T�rkiye"?"T�rkiye":n==="New Zealand"?"N. Zealand":n.length>9?n.slice(0,8)+".":n}const 
dN=n=>n.actual?.homeScore!=null?"??":Ha(n.matchDate)?"??":"?";function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.
jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,he
ight:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}class D4 
extends S.Component{constructor(e){super(e),this.state={hasError:!1}}static 
getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("MyPredictions 
crashed:",e,t)}render(){return this.state.hasError?h.jsxs("div",{className:"my-predictions",style:{padding:32,textAlign
:"center"},children:[h.jsx("p",{style:{color:"#ff6b6b",fontSize:"1.1rem"},children:"Something went wrong loading your 
predictions."}),h.jsx("p",{style:{color:"#8aa0c0",fontSize:"0.85rem"},children:"Please try refreshing the 
page."})]}):this.props.children}}function k4(n){return h.jsx(D4,{children:h.jsx(j4,{...n})})}function j4({user:n,firest
ore:e,userDoc:t,onOpenWildCard:s}){const[i,l]=S.useState([]),[c,d]=S.useState(!1),[p,y]=S.useState(null),[_,w]=S.useSta
te({}),[b,R]=S.useState(null),[P,O]=S.useState(""),[j,L]=S.useState({}),[B,q]=S.useState(null),[le,ue]=S.useState(!1),[
pe,k]=S.useState(!1),[I,A]=S.useState({});S.useEffect(()=>!e||!n?void 
0:Lt(nt(e,"users",n.uid),G=>{y(G.data()||{})},G=>console.warn("UserDoc snapshot 
error",G)),[e,n]),S.useEffect(()=>e?Lt(xt(e,"users"),G=>{const 
W={};G.docs.forEach(ve=>{W[ve.id]=ve.data()}),A(W)},G=>console.warn("UsersMap snapshot error",G)):void 0,[e]),S.useEffe
ct(()=>e?Lt(xt(e,"worldCupPredictions"),G=>{l(G.docs.map(W=>({id:W.id,...W.data()}))),d(!0)},G=>{console.warn("MyPredic
tions snapshot error",G),d(!0)}):void 0,[e]);const U=S.useMemo(()=>{const D={};return 
i.forEach(G=>{D[G.matchKey]=G}),Ir.map(G=>{const W=D[G.matchKey]||{};return{...G,...W,id:W.id||G.matchKey,predictions:W
.predictions||{},actual:W.actual||{homeScore:null,awayScore:null},points:W.points||{}}})},[i]),V=S.useMemo(()=>n?U.filt
er(D=>D.predictions?.[n.uid]?.homeScore!=null).sort((D,G)=>{const W=["group","roundOf32","roundOf16","quarterFinal","se
miFinal","thirdPlace","final"],ve=W.indexOf(D.stage),we=W.indexOf(G.stage);return 
ve!==we?ve-we:(D.matchNumber||0)-(G.matchNumber||0)}):[],[U,n]),[F,M]=S.useState(()=>{const D=os();return D?`round${D.r
ound}`:"all"}),Te=S.useMemo(()=>V.filter(D=>D.stage==="group"),[V]),Ie=S.useMemo(()=>V.filter(D=>D.stage!=="group"),[V]
),X=S.useMemo(()=>p??t,[p,t]),ge=S.useMemo(()=>{const D=os();if(!D||!X)return null;const G="round"+D.round;return 
X.wildCards?.[G]?null:{round:D.round,label:D.label}},[X]),Ee=S.useMemo(()=>{const D=os();if(!D||!X)return null;const 
G="round"+D.round,W=X.wildCards?.[G];return 
W?{round:D.round,label:D.label,day:W.day}:null},[X]),je=!!os(),[$,C]=S.useState("");S.useEffect(()=>{const 
D=()=>{const W=new Date(f0).getTime()-Date.now();if(W<=0){C("");return}const 
ve=Math.floor(W/864e5),we=Math.floor(W%864e5/36e5),be=Math.floor(W%36e5/6e4),Re=Math.floor(W%6e4/1e3);C(`${ve}d ${we}h 
${be}m ${Re}s`)};D();const G=setInterval(D,1e3);return()=>clearInterval(G)},[]);const H=S.useMemo(()=>{const D=Object.e
ntries(I).filter(([ve])=>ve!==n?.uid&&I[ve]?.podiumPrediction),G={first:{},second:{},third:{}};D.forEach(([,ve])=>{cons
t we=ve.podiumPrediction.final||ve.podiumPrediction;we.first&&(G.first[we.first]=(G.first[we.first]||0)+1),we.second&&(
G.second[we.second]=(G.second[we.second]||0)+1),we.third&&(G.third[we.third]=(G.third[we.third]||0)+1)});const W=(ve,we
=3)=>Object.entries(ve).sort((be,Re)=>Re[1]-be[1]).slice(0,we);return{totalOthers:D.length,topFirst:W(G.first),topSecon
d:W(G.second),topThird:W(G.third)}},[I,n]),oe=p?.podiumPrediction,ye=oe?oe.final||oe:null,Pe=!!oe?.final,De=Pe&&oe.init
ial&&oe.final&&oe.initial.first===oe.final.first&&oe.initial.second===oe.final.second&&oe.initial.third===oe.final.thir
d,Ve=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)&&D.actual?.homeScore==null).sort((D,G)=>new 
Date(D.matchDate)-new Date(G.matchDate))[0]||null,[U]),Je=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)
&&D.actual?.homeScore==null&&D.predictions?.[n?.uid]?.homeScore==null).sort((D,G)=>new Date(D.matchDate)-new Date(G.mat
chDate)).slice(0,9),[U,n]),Qe=S.useMemo(()=>U.find(D=>D.matchKey===B)||null,[U,B]),zt=S.useCallback(async(D,G,W)=>{if(!
e||!n)return;const ve=nt(e,"worldCupPredictions",D);await bn(ve,{[`predictions.${n.uid}`]:{homeScore:Number(G),awayScor
e:Number(W)},updatedAt:Vn()}).catch(we=>console.warn("Prediction save 
failed",we))},[e,n]),tn=S.useCallback(async(D,G,W)=>{R(D),O(""),await zt(D,G,W),R(null),w(ve=>{const we={...ve};return 
delete we[D],we})},[zt]);if(S.useEffect(()=>{if(Je.length===0)return;const D=()=>{const 
W=Date.now(),ve={};Je.forEach(we=>{const Re=LR(we.matchDate).getTime()-W;if(Re<=0)ve[we.matchKey]="Deadline 
passed";else{const $e=Math.floor(Re/864e5),mt=Math.floor(Re%864e5/36e5),dn=Math.floor(Re%36e5/6e4),Ft=Math.floor(Re%6e4
/1e3);$e>0?ve[we.matchKey]=`${$e}d ${mt}h ${dn}m ${Ft}s`:mt>0?ve[we.matchKey]=`${mt}h ${dn}m 
${Ft}s`:ve[we.matchKey]=`${dn}m ${Ft}s`}}),L(ve)};D();const 
G=setInterval(D,1e3);return()=>clearInterval(G)},[Je]),!c)return h.jsx("div",{className:"my-predictions",children:h.jsx
("div",{className:"my-predictions-empty",children:"Loading..."})});const Q=Ve?A_(Ve.venue):null;return h.jsxs("div",{cl
assName:"my-predictions",children:[Je.length>0&&h.jsxs("div",{className:"my-pred-hero",children:[h.jsxs("div",{classNam
e:"my-pred-hero-title",children:["?"," Quick 
Predict"]}),h.jsx("div",{className:"my-pred-hero-grid",children:Je.map(D=>{const 
G=_[D.matchKey]||{home:"0",away:"0"},W=b===D.matchKey,ve=A_(D.venue);return h.jsxs("div",{className:"my-pred-hero-game"
,children:[h.jsxs("div",{className:"my-pred-hero-game-row",children:[h.jsxs("div",{className:"my-pred-hero-game-team",c
hildren:[h.jsx(Ka,{team:D.homeTeam,size:24}),h.jsx("span",{className:"my-pred-hero-game-name",children:D.homeTeam})]}),
h.jsxs("div",{className:"my-pred-hero-game-score-wrap",children:[h.jsx("input",{type:"number",min:"0",max:"20",classNam
e:"my-pred-hero-game-input",value:G.home,onChange:we=>w(be=>({...be,[D.matchKey]:{...be[D.matchKey],home:we.target.valu
e,away:be[D.matchKey]?.away??"0"}})),disabled:W}),h.jsx("span",{className:"my-pred-hero-game-colon",children:":"}),h.js
x("input",{type:"number",min:"0",max:"20",className:"my-pred-hero-game-input",value:G.away,onChange:we=>w(be=>({...be,[
D.matchKey]:{...be[D.matchKey],home:be[D.matchKey]?.home??"0",away:we.target.value}})),disabled:W})]}),h.jsxs("div",{cl
assName:"my-pred-hero-game-team my-pred-hero-game-team--right",children:[h.jsx(Ka,{team:D.awayTeam,size:24}),h.jsx("spa
n",{className:"my-pred-hero-game-name",children:D.awayTeam})]})]}),h.jsxs("div",{className:"my-pred-hero-game-footer",c
hildren:[h.jsxs("span",{className:"my-pred-hero-game-venue",children:["???"," ",ve?.stadium,", 
",ve?.city]}),h.jsxs("span",{className:"my-pred-hero-game-kickoff",children:["?"," 
",Os(D.matchDate)]}),h.jsxs("span",{className:"my-pred-hero-game-deadline",children:["?"," ",j[D.matchKey]||"..."]})]})
,h.jsxs("button",{type:"button",className:"my-pred-hero-game-confirm",onClick:()=>tn(D.matchKey,G.home,G.away),disabled
:W,children:[W?"?":"?"," Confirm"]})]},D.matchKey)})})]}),h.jsxs("div",{className:"my-pred-top-row",children:[h.jsx("di
v",{className:"my-pred-col",children:je&&ge?h.jsxs("div",{className:"my-pred-wc-tile",children:[h.jsx("button",{type:"b
utton",className:"my-pred-wc-info-btn",onClick:()=>ue(!0),children:"What's 
this?"}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:s,children:["?"," Activate 
Now"]})]}):je&&Ee?h.jsxs("div",{className:"my-pred-wc-tile my-pred-wc-tile--activated",children:[h.jsxs("div",{classNam
e:"my-pred-wc-tile-content",children:[h.jsxs("div",{className:"my-pred-wc-tile-header",children:["??"," Wild Card 
Active"]}),h.jsxs("div",{className:"my-pred-wc-tile-sub",children:["Round ",Ee.round," 
(",Ee.label,")"]}),h.jsx("div",{className:"my-pred-wc-tile-day",children:new Date(Ee.day+"T00:00:00Z").toLocaleDateStri
ng("en-US",{weekday:"short",month:"short",day:"numeric"})}),h.jsxs("div",{className:"my-pred-wc-tile-badge",children:["
�",is," 
Active"]})]}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:()=>k(!0),children:["?"," 
Redeemed"]})]}):h.jsx("div",{className:"my-pred-wc-tile my-pred-wc-tile--hidden"})}),h.jsx("div",{className:"my-pred-co
l",children:Ve?h.jsxs("button",{type:"button",className:"my-pred-next-card",onClick:()=>q(Ve.matchKey),children:[h.jsxs
("div",{className:"my-pred-next-badge",children:["?"," NEXT MATCH"]}),h.jsxs("div",{className:"my-pred-next-teams",chil
dren:[h.jsx(Ka,{team:Ve.homeTeam,size:40}),h.jsxs("div",{className:"my-pred-next-team",children:[h.jsx("span",{classNam
e:"my-pred-next-name",children:Ve.homeTeam}),h.jsxs("span",{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.home
Team).fifaRank]})]}),h.jsx("span",{className:"my-pred-next-vs",children:"vs"}),h.jsxs("div",{className:"my-pred-next-te
am my-pred-next-team--away",children:[h.jsx("span",{className:"my-pred-next-name",children:Ve.awayTeam}),h.jsxs("span",
{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.awayTeam).fifaRank]})]}),h.jsx(Ka,{team:Ve.awayTeam,size:40})]}
),h.jsxs("div",{className:"my-pred-next-venue",children:["???"," ",Q?.stadium,", 
",Q?.city]}),h.jsxs("div",{className:"my-pred-next-kickoff",children:["?"," 
",Os(Ve.matchDate)]}),h.jsxs("div",{className:"my-pred-next-countdown",children:["?"," ",j[Ve.matchKey]||"-"]}),h.jsxs(
"div",{className:"my-pred-next-prediction",children:[h.jsx("span",{className:"my-pred-next-pred-label",children:"YOUR P
REDICTION"}),Ve.predictions?.[n.uid]?h.jsxs("div",{className:"my-pred-next-pred-score-row",children:[h.jsx(Ka,{team:Ve.
homeTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve.predictions[n.uid].homeScore}),h.jsx("
span",{className:"my-pred-next-pred-colon",children:":"}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve
.predictions[n.uid].awayScore}),h.jsx(Ka,{team:Ve.awayTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-btn",ch
ildren:"Edit"})]}):h.jsxs("span",{className:"my-pred-next-pred-btn my-pred-next-pred-btn--primary",children:["?"," 
Predict this match"]})]})]}):h.jsx("div",{className:"my-pred-next-card 
my-pred-next-card--empty",children:h.jsxs("div",{className:"my-pred-next-empty",children:["?"," All matches 
complete!"]})})}),h.jsx("div",{className:"my-pred-col",children:ye?h.jsxs("div",{className:"my-pred-podium-card my-pred
-podium-card--extended",children:[h.jsxs("div",{className:"my-pred-podium-header",children:[h.jsxs("span",{className:"m
y-pred-podium-title",children:["??"," My Podium 
Picks"]}),$&&h.jsxs("span",{className:"my-pred-podium-lock",children:["??"," Locks ",$]})]}),h.jsx("div",{className:"my
-pred-podium-rows",children:[{key:"first",icon:"??",team:ye.first||oe?.first||oe?.initial?.first,pts:cn.first},{key:"se
cond",icon:"??",team:ye.second||oe?.second||oe?.initial?.second,pts:cn.second},{key:"third",icon:"??",team:ye.third||oe
?.third||oe?.initial?.third,pts:cn.third}].map(D=>h.jsxs("div",{className:"my-pred-podium-row",children:[h.jsx("span",{
className:"my-pred-podium-icon",children:D.icon}),h.jsx("span",{className:"my-pred-podium-team",children:D.team||"-"}),
h.jsxs("span",{className:"my-pred-podium-pts",children:["+",De?D.pts*kc:D.pts," 
pts"]})]},D.key))}),h.jsx("div",{className:"my-pred-podium-note",children:Pe?`Final picks locked${De?" - triple points 
active!":""}`:"Initial picks set - you can update after group stage"}),H.totalOthers>0&&h.jsxs("div",{className:"my-pre
d-others-section",children:[h.jsxs("div",{className:"my-pred-others-count",children:["??"," ",H.totalOthers," other 
player",H.totalOthers===1?"":"s"," submitted 
picks"]}),h.jsxs("div",{className:"my-pred-others-table",children:[h.jsxs("div",{className:"my-pred-others-row my-pred-
others-row--header",children:[h.jsx("span",{className:"my-pred-others-pos",children:"??"}),h.jsx("span",{className:"my-
pred-others-team",children:"Most picked"}),h.jsx("span",{className:"my-pred-others-count-col",children:"Picks"})]}),H.t
opFirst.map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos
",children:"1st"}),h.jsx("span",{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-c
ount-col",children:G})]},D)),H.topSecond.slice(0,1).map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:
[h.jsx("span",{className:"my-pred-others-pos",children:"2nd"}),h.jsx("span",{className:"my-pred-others-team",children:D
}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D)),H.topThird.slice(0,1).map(([D,G])=>h.jsxs("div
",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos",children:"3rd"}),h.jsx("span",
{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D))]})]
})]}):h.jsx("div",{className:"my-pred-podium-card 
my-pred-podium-card--empty",children:h.jsxs("div",{className:"my-pred-podium-empty",children:["??"," Set your podium 
picks from the Dashboard"]})})})]}),V.length===0?h.jsx("div",{className:"my-predictions-empty",children:"You haven't 
made any predictions yet."}):h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"my-predictions-heading",children:"My P
redictions"}),h.jsx("div",{className:"wc-filter-row",style:{marginBottom:12},children:h.jsx("div",{className:"wc-filter
-pills",children:[{value:"round1",label:"Round 1"},{value:"round2",label:"Round 2"},{value:"round3",label:"Round 
3"},{value:"all",label:"All Fixtures"}].map(D=>h.jsx("button",{type:"button",className:`wc-filter-btn 
${F===D.value?"is-active":""}`,onClick:()=>M(D.value),children:D.label},D.value))})}),Te.length>0&&(()=>{const 
D=[...new Set(Te.map(W=>W.matchDate.split("T")[0]))].sort(),G=F==="all"?D:D.filter(W=>Te.some(ve=>ve.matchDate.startsWi
th(W)&&ve.matchday===parseInt(F.replace("round",""))));return G.length===0?null:G.map(W=>{const 
ve=Te.filter(be=>be.matchDate.startsWith(W)),we=Ee?.day===W;return h.jsxs("div",{className:`my-pred-date-section${we?" 
my-pred-date-section--wildcard":""}`,children:[h.jsxs("div",{className:"my-pred-date-header",children:[h.jsx("span",{cl
assName:"my-pred-date-label",children:new Date(W+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short
",day:"numeric"})}),we&&h.jsxs("span",{className:"my-pred-date-badge",children:["?"," Wild 
Card"]})]}),h.jsx("div",{className:"my-pred-date-matches",children:ve.map(be=>{const 
Re=be.predictions[n.uid],$e=be.actual;return h.jsxs("div",{className:`wc-match-row${we?" wc-match-row--wc-highlight":""
}`,role:"button",tabIndex:0,onClick:()=>q(be.matchKey),onKeyDown:mt=>mt.key==="Enter"&&q(be.matchKey),children:[h.jsx("
span",{className:"wc-match-status",children:dN(be)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team
:be.homeTeam}),h.jsx("span",{className:"wc-team-name",children:Ql(be.homeTeam)}),$e?.homeScore!=null?h.jsxs("span",{cla
ssName:"wc-inline-score wc-inline-score--actual",children:[$e.homeScore," ","-"," 
",$e.awayScore]}):Re?h.jsxs("span",{className:"wc-inline-score",children:[Re.homeScore," ","-"," ",Re.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:be.awayTeam}),h.jsx("span",{className:"wc-team-name",childre
n:Ql(be.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:$e?.homeScore!=null&&be.points?.[n.uid]!=null
&&h.jsxs("span",{className:"my-pred-pts",children:["+",be.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",ch
ildren:Os(be.matchDate)})]},be.matchKey)})})]},W)})})(),F==="all"&&Ie.length>0&&h.jsxs("div",{className:"wc-knockout-se
ction",children:[h.jsxs("h3",{className:"wc-section-title",children:["??"," Knockout 
Stage"]}),["roundOf32","roundOf16","quarterFinal","semiFinal","thirdPlace","final"].map(D=>{const 
G=Ie.filter(W=>W.stage===D);return G.length===0?null:h.jsxs("div",{className:"wc-stage-group",children:[h.jsx("h4",{cla
ssName:"wc-stage-title",children:b_[D]}),h.jsx("div",{className:"wc-stage-matches",children:G.map(W=>{const 
ve=W.predictions[n.uid],we=W.actual;return h.jsxs("div",{className:"wc-match-row",role:"button",tabIndex:0,onClick:()=>
q(W.matchKey),onKeyDown:be=>be.key==="Enter"&&q(W.matchKey),children:[h.jsx("span",{className:"wc-match-status",childre
n:dN(W)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:W.homeTeam}),h.jsx("span",{className:"wc-t
eam-name",children:Ql(W.homeTeam)}),we?.homeScore!=null?h.jsxs("span",{className:"wc-inline-score 
wc-inline-score--actual",children:[we.homeScore," ","-"," 
",we.awayScore]}):ve?h.jsxs("span",{className:"wc-inline-score",children:[ve.homeScore," ","-"," ",ve.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:W.awayTeam}),h.jsx("span",{className:"wc-team-name",children
:Ql(W.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:we?.homeScore!=null&&W.points?.[n.uid]!=null&&h
.jsxs("span",{className:"my-pred-pts",children:["+",W.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",childr
en:Os(W.matchDate)})]},W.matchKey)})})]},D)})]})]}),Qe&&jo.createPortal(h.jsx("div",{className:"modal-backdrop",role:"p
resentation",onClick:()=>q(null),children:h.jsx("div",{className:"panel modal-panel 
wc-modal",role:"dialog","aria-modal":"true","aria-label":"Match details",onClick:D=>D.stopPropagation(),children:h.jsx(
BR,{match:Qe,user:n,userDoc:t,firestore:e,isAdmin:!1,matches:U,sortedUserUids:[],getDisplayName:()=>"",getUserColor:()=
>"",onSubmitPrediction:zt,onSubmitActual:()=>{},onUpdateTeams:()=>{},onClose:()=>q(null)})})}),document.body),pe&&Ee&&j
o.createPortal(h.jsx("div",{className:"modal-backdrop",role:"presentation",onClick:()=>k(!1),children:h.jsxs("div",{cla
ssName:"panel modal-panel wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card fixtures",onClick:D=
>D.stopPropagation(),children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-m
odal-title",children:["?"," Wild Card - ",new Date(Ee.day+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",mon
th:"short",day:"numeric"})]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>k(!1),children:"
?"})]}),h.jsx("div",{className:"wc-fixtures-body",children:Ir.filter(D=>D.matchDate.startsWith(Ee.day)).map(D=>h.jsxs("
div",{className:"wc-match-row wc-match-row--wc-highlight",role:"button",tabIndex:0,onClick:()=>{k(!1),q(D.matchKey)},on
KeyDown:G=>{G.key==="Enter"&&(k(!1),q(D.matchKey))},children:[h.jsx("span",{className:"wc-match-status",children:"?"}),
h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:D.homeTeam}),h.jsx("span",{className:"wc-team-name",
children:Ql(D.homeTeam)}),h.jsx("span",{className:"wc-vs",children:"vs"}),h.jsx("span",{className:"wc-team-name",childr
en:Ql(D.awayTeam)}),h.jsx(Ka,{team:D.awayTeam})]}),h.jsx("span",{className:"wc-match-date",children:Os(D.matchDate)})]}
,D.matchKey))}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium-skip-bt
n",onClick:()=>k(!1),children:"Close"})})]})}),document.body),le&&jo.createPortal(h.jsx("div",{className:"modal-backdro
p",role:"presentation",onClick:()=>ue(!1),children:h.jsxs("div",{className:"panel modal-panel 
wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card info",onClick:D=>D.stopPropagation(),children:
[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," 
Wild Card - �",is," Points"]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>ue(!1),children
:"?"})]}),h.jsxs("div",{className:"wc-info-body",children:[h.jsxs("p",{className:"wc-info-p",children:["Choose 
",h.jsx("strong",{children:"one day"})," in the current round. Every match you predict on that day earns 
",h.jsxs("strong",{children:["�",is]})," the normal 
points!"]}),h.jsx("p",{className:"wc-info-p",children:h.jsx("strong",{children:"Normal scoring (before 
multiplier):"})}),h.jsxs("ul",{className:"wc-info-list",children:[h.jsxs("li",{children:["Exact score  
",h.jsx("strong",{children:"5 pts"})," + ",h.jsx("strong",{children:"1 pt"})," per goal scored in the 
match"]}),h.jsxs("li",{children:["0-0 draw  ",h.jsx("strong",{children:"6 pts"})," (5 + 1 for 
nil-nil)"]}),h.jsxs("li",{children:["Correct outcome (not exact)  ",h.jsx("strong",{children:"2 
pts"})]}),h.jsxs("li",{children:["Wrong  ",h.jsx("strong",{children:"0 
pts"})]})]}),h.jsxs("p",{className:"wc-info-p",children:["On your Wild Card day, ",h.jsx("strong",{children:"all"})," 
of these are multiplied by ",h.jsxs("strong",{children:["�",is]}),". Pick the day with the fixtures you're most 
confident about!"]})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium
-skip-btn",onClick:()=>ue(!1),children:"Got it"})})]})}),document.body)]})}function 
P4({user:n,firestore:e,userDoc:t,onOpenPodium:s}){const i=n?.email||"",l=n?.uid||"",c=n?.displayName||n?.email||"",[d,p
]=S.useState(!1),[y,_]=S.useState(""),[w,b]=S.useState(!1),[R,P]=S.useState(""),[O,j]=S.useState(!1),L=S.useRef(null);S
.useEffect(()=>{d&&L.current&&L.current.focus()},[d]);const 
B=()=>{_(n?.displayName||""),P(""),j(!1),p(!0)},q=async()=>{P(""),j(!1);const 
A=y.trim(),U=PR(A);if(!U.valid){P(U.error);return}b(!0);try{const 
V=wr(xt(e,"users"),ic("displayName","==",A));if((await Di(V)).docs.some(Te=>Te.id!==n.uid)){P("That name is already 
taken"),b(!1);return}await zi(nt(e,"users",n.uid),{displayName:A},{merge:!0});try{pr?.currentUser&&await 
J_(pr.currentUser,{displayName:A})}catch(Te){console.warn("Auth profile update failed 
(non-critical):",Te)}j(!0),p(!1),setTimeout(()=>j(!1),2e3)}catch(V){console.error("Display name save 
error:",V),P("Failed to save. Try again.")}finally{b(!1)}},le=()=>{p(!1),P("")},ue=t?.podiumPrediction,pe=ue?ue.final||
ue:null,I=!!ue?.final&&ue.initial&&ue.final&&ue.initial.first===ue.final.first&&ue.initial.second===ue.final.second&&ue
.initial.third===ue.final.third;return h.jsxs("div",{className:"wc-panel",style:{maxWidth:500,margin:"0 
auto"},children:[h.jsxs("h2",{className:"wc-panel-title",children:["??"," My Profile"]}),h.jsxs("div",{className:"profi
le-info",children:[h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",ch
ildren:"Display Name"}),h.jsx("div",{className:"profile-info-value",children:d?h.jsxs("div",{className:"sidebar-name-ed
it",style:{justifyContent:"flex-start"},children:[h.jsx("input",{ref:L,className:"sidebar-name-input",value:y,onChange:
A=>_(A.target.value),onKeyDown:A=>{A.key==="Enter"&&q(),A.key==="Escape"&&le()},maxLength:20,placeholder:"Display 
name"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--save",onClick:q,disabled:w||!y.trim
(),children:w?"...":"V"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--cancel",onClick:l
e,children:"?"}),R&&h.jsx("span",{className:"sidebar-name-error",children:R})]}):h.jsxs("span",{className:"profile-name
-display",onClick:B,children:[c,O?" V":" ??"]})})]}),h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",
{className:"profile-info-label",children:"Email"}),h.jsx("span",{className:"profile-info-value",children:i})]}),h.jsxs(
"div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",children:"User ID"}),h.jsx("
span",{className:"profile-info-value",style:{fontSize:"0.7rem",opacity:.6},children:l})]})]}),h.jsx("hr",{className:"pr
ofile-divider"}),h.jsx("h3",{className:"wc-panel-title",style:{fontSize:"1rem"},children:"Podium Picks"}),pe?h.jsxs("di
v",{className:"dash-podium-mini",style:{marginTop:8},children:[[{key:"first",icon:"??",team:pe.first,pts:cn.first},{key
:"second",icon:"??",team:pe.second,pts:cn.second},{key:"third",icon:"??",team:pe.third,pts:cn.third}].map(A=>h.jsxs("di
v",{className:"dash-podium-mini-row",children:[h.jsx("span",{className:"dash-podium-mini-medal",children:A.icon}),h.jsx
("span",{className:"dash-podium-mini-team",children:A.team}),h.jsx("span",{className:"dash-podium-mini-pts",children:I?
A.pts*kc:A.pts})]},A.key)),h.jsx("button",{type:"button",className:"wc-btn 
wc-btn--small",style:{marginTop:8},onClick:s,children:"Update 
Picks"})]}):h.jsxs("div",{style:{textAlign:"center",padding:"20px 
0"},children:[h.jsx("p",{style:{color:"#8aa0c0",marginBottom:12},children:"No podium picks set 
yet."}),h.jsx("button",{type:"button",className:"wc-btn",onClick:s,children:"Set Podium Picks"})]})]})}const 
M4="modulepreload",V4=function(n){return"/"+n},fN={},O4=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let 
y=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"reject
ed",reason:b}))))};var c=y;document.getElementsByTagName("link");const 
d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=y(t.map(_=>{if(_=V4(_),_ 
in fN)return;fN[_]=!0;const 
w=_.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${b}`))return;const R=docu
ment.createElement("link");if(R.rel=w?"stylesheet":M4,w||(R.as="script"),R.crossOrigin="",R.href=_,p&&R.setAttribute("n
once",p),document.head.appendChild(R),w)return new 
Promise((P,O)=>{R.addEventListener("load",P),R.addEventListener("error",()=>O(new Error(`Unable to preload CSS for 
${_}`)))})}))}function l(d){const p=new 
Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return 
i.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return e().catch(l)})};function 
R_({team:n,size:e=18}){const t=Kn(n);return t?h.jsx("img",{className:"podium-flag",src:t,alt:n,width:e,height:e*.75,loa
ding:"lazy"}):h.jsx("span",{className:"podium-flag-placeholder"})}function 
L4({value:n,onChange:e,teams:t,placeholder:s}){const[i,l]=S.useState(!1),c=S.useRef(null);return 
S.useEffect(()=>{const d=p=>{c.current&&!c.current.contains(p.target)&&l(!1)};return document.addEventListener("mousedo
wn",d),()=>document.removeEventListener("mousedown",d)},[]),h.jsxs("div",{className:"podium-dropdown",ref:c,children:[h
.jsxs("button",{type:"button",className:"podium-dropdown-trigger",onClick:()=>l(!i),children:[n?h.jsx(R_,{team:n,size:1
8}):h.jsx("span",{className:"podium-dropdown-placeholder-flag"}),h.jsx("span",{className:"podium-dropdown-label",childr
en:n||s}),h.jsx("span",{className:"podium-dropdown-arrow",children:i?"":""})]}),i&&h.jsx("div",{className:"podium-dro
pdown-menu",children:t.map(d=>h.jsxs("div",{className:`podium-dropdown-option${d===n?" is-selected":""}`,onClick:()=>{e
(d),l(!1)},children:[h.jsx(R_,{team:d,size:16}),h.jsx("span",{children:d})]},d))})]})}const 
mN=[{key:"first",label:"Winner",icon:"??",desc:"1st 
Place",pts:cn.first},{key:"second",label:"Runner-up",icon:"??",desc:"2nd 
Place",pts:cn.second},{key:"third",label:"Third Place",icon:"??",desc:"3rd Place",pts:cn.third}];function 
U4({user:n,firestore:e,existingPrediction:t,groupStageOver:s,onSave:i,onDismiss:l,userDoc:c}){const d=t?.initial?.first
||t?.first||"",p=t?.initial?.second||t?.second||"",y=t?.initial?.third||t?.third||"",w=t?.final||t?.finalizedAt?t.final
:{first:d,second:p,third:y},[b,R]=S.useState(w?.first||""),[P,O]=S.useState(w?.second||""),[j,L]=S.useState(w?.third||"
"),[B,q]=S.useState(!1),[le,ue]=S.useState(""),[pe,k]=S.useState(!1),I=S.useRef(new Date(f0).getTime()),A=()=>{const 
D=I.current-Date.now();return D<=0?null:{days:Math.floor(D/864e5),hours:Math.floor(D/36e5%24),minutes:Math.floor(D/6e4%
60),seconds:Math.floor(D/1e3%60)}},[U,V]=S.useState(A);S.useEffect(()=>{const D=setInterval(()=>V(A()),1e3);return()=>c
learInterval(D)},[]);const[F,M]=S.useState(!1),[Te,Ie]=S.useState(""),[X,ge]=S.useState(!1),[Ee,je]=S.useState(""),[$,C
]=S.useState(!1),H=S.useRef(null);S.useEffect(()=>{F&&H.current&&H.current.focus()},[F]);const oe=s&&t,ye=d&&b===d&&P==
=p&&j===y,Pe=D=>Om.filter(G=>!(G===b&&D!=="first"||G===P&&D!=="second"||G===j&&D!=="third")),De=async()=>{if(ue(""),!b|
|!P||!j){ue("Please select a team for all three podium positions.");return}if(b===P||b===j||P===j){ue("All three 
selections must be different teams.");return}q(!0);try{const D=nt(e,"users",n.uid),G=c||t||{},W={...G,first:b,second:P,
third:j,updatedAt:Vn()};oe?(W.initial=G.initial||{first:b,second:P,third:j},W.final={first:b,second:P,third:j},W.finali
zedAt=Vn()):(W.initial=G.initial||{first:b,second:P,third:j},G.createdAt||(W.createdAt=Vn())),await 
zi(D,{podiumPrediction:W},{merge:!0}),k(!0),setTimeout(()=>{i({first:b,second:P,third:j})},800)}catch(D){ue("Failed to 
save. Please try again."),console.warn("Podium save error",D)}finally{q(!1)}},Ve=cn.first+cn.second+cn.third,Je=Ve*kc,Q
e=b&&P&&j&&!B&&!pe,zt=()=>{Ie(n?.displayName||""),je(""),C(!1),M(!0)},tn=async()=>{je(""),C(!1);const 
D=Te.trim(),G=PR(D);if(!G.valid){je(G.error);return}ge(!0);try{const{collection:W,getDocs:ve,query:we,where:be}=await 
O4(async()=>{const{collection:dn,getDocs:Ft,query:Bt,where:fn}=await Promise.resolve().then(()=>YL);return{collection:d
n,getDocs:Ft,query:Bt,where:fn}},[]),Re=we(W(e,"users"),be("displayName","==",D));if((await 
ve(Re)).docs.some(dn=>dn.id!==n.uid)){je("That name is already taken"),ge(!1);return}await 
zi(nt(e,"users",n.uid),{displayName:D},{merge:!0}),pr?.currentUser&&await 
J_(pr.currentUser,{displayName:D}),C(!0),M(!1),setTimeout(()=>C(!1),2e3)}catch{je("Failed to save. Try 
again.")}finally{ge(!1)}},Q=()=>{M(!1),je("")};return 
jo.createPortal(h.jsx("div",{className:"podium-backdrop",role:"presentation",onClick:pe?l:void 
0,children:h.jsx("div",{className:"panel podium-modal",role:"dialog","aria-modal":"true","aria-label":"Podium predictio
n",onClick:D=>D.stopPropagation(),children:pe?h.jsxs("div",{className:"podium-saved",children:[h.jsx("span",{className:
"podium-saved-icon",children:oe?"?":"??"}),h.jsx("h2",{className:"podium-saved-title",children:oe?"Final Picks 
Saved!":"Picks Locked"}),h.jsx("p",{className:"podium-saved-text",children:oe?`Your final podium predictions are 
locked in.${ye?" Keeping the same three - triple points eligible!":""}`:"Your first, second, and third place picks are 
now locked and cannot be changed until the group stage 
ends."}),h.jsx("div",{className:"podium-saved-picks",children:mN.map(D=>{const 
G=D.key==="first"?b:D.key==="second"?P:j;return h.jsxs("div",{className:"podium-saved-row",children:[h.jsx("span",{chil
dren:D.icon}),h.jsx(R_,{team:G,size:22}),h.jsx("span",{children:G}),h.jsxs("span",{className:"podium-saved-pts",childre
n:["+",D.pts," pts"]})]},D.key)})}),h.jsx("div",{className:"podium-saved-name",children:h.jsxs("div",{className:"podium
-name-editor",children:[F?h.jsxs("div",{className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podi
um-name-input",value:Te,onChange:D=>Ie(D.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLe
ngth:20,placeholder:"Your display name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--sav
e",onClick:tn,disabled:X||!Te.trim(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn po
dium-name-btn--cancel",onClick:Q,children:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("
span",{className:"podium-name-label",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",c
lassName:"podium-name-edit-btn",onClick:zt,title:"Edit display 
name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Saved"]})]}),Ee&&h.jsx("div",{cla
ssName:"podium-name-error",children:Ee})]})}),h.jsx("button",{type:"button",className:"podium-continue-btn",onClick:l,c
hildren:"Continue"})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2
",{className:"podium-modal-title",children:["??"," Your Podium Prediction"]}),h.jsx("button",{type:"button",className:"
podium-modal-close",onClick:l,children:"?"})]}),h.jsx("div",{className:"podium-info",children:oe?h.jsxs("p",{className:
"podium-info-text",children:["The group stage is over! Lock in your ",h.jsx("strong",{children:"final"})," podium 
picks.",ye?" You kept the same three teams - if they match the actual results you get <strong>triple 
points</strong>!":" If you keep the same picks you had before and they're correct, you get <strong>triple 
points</strong>."]}):h.jsxs("p",{className:"podium-info-text",children:["Pick who will finish 
",h.jsx("strong",{children:"1st, 2nd, and 3rd"}),". Points: winner ",h.jsxs("strong",{children:["+",cn.first]}),", 
runner-up ",h.jsxs("strong",{children:["+",cn.second]}),", third ",h.jsxs("strong",{children:["+",cn.third]}),". Keep 
the same picks after the group stage and get ",h.jsxs("strong",{children:["�",kc]})," (up to ",Je," pts!)."]})}),h.jsx(
"div",{className:"podium-name-section",children:h.jsxs("div",{className:"podium-name-editor",children:[F?h.jsxs("div",{
className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podium-name-input",value:Te,onChange:D=>Ie(D
.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLength:20,placeholder:"Your display 
name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--save",onClick:tn,disabled:X||!Te.trim
(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--cancel",onClick:Q,c
hildren:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("span",{className:"podium-name-labe
l",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",className:"podium-name-edit-btn",on
Click:zt,title:"Edit display name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Save
d"]})]}),Ee&&h.jsx("div",{className:"podium-name-error",children:Ee})]})}),h.jsx("div",{className:"podium-picks",childr
en:mN.map(D=>{const G=D.key==="first"?b:D.key==="second"?P:j,W=D.key==="first"?R:D.key==="second"?O:L;return h.jsxs("di
v",{className:"podium-pick-row",children:[h.jsxs("div",{className:"podium-pick-label",children:[h.jsx("span",{className
:"podium-pick-icon",children:D.icon}),h.jsxs("div",{children:[h.jsx("span",{className:"podium-pick-title",children:D.la
bel}),h.jsxs("span",{className:"podium-pick-desc",children:[D.desc," - ",D.pts," 
pts"]})]})]}),h.jsx(L4,{value:G,onChange:W,teams:Pe(D.key).sort((ve,we)=>ve.localeCompare(we)),placeholder:"-- Select 
team --"})]},D.key)})}),h.jsxs("div",{className:"podium-points-summary",children:[h.jsxs("span",{children:["Max if 
correct: ",h.jsxs("strong",{children:["+",Ve," 
pts"]})]}),h.jsxs("span",{className:"podium-points-triple",children:["Triple if kept: 
",h.jsxs("strong",{children:["+",Je," 
pts"]})]})]}),h.jsx("div",{className:"podium-deadline",children:U?h.jsxs("span",{children:["?"," Locks Jun 10, 11:59 
PM BST \\u00B7 Closes in ",U.days>0?U.days+"d ":"",U.hours,"h ",U.minutes,"m 
",U.seconds,"s"]}):h.jsxs("span",{children:["??"," Podium locked"]})}),le&&h.jsx("div",{className:"podium-error",childr
en:le}),h.jsxs("div",{className:"podium-footer",children:[h.jsx("button",{type:"button",className:"podium-skip-btn",onC
lick:l,children:t?"Cancel":"Skip for now"}),h.jsx("button",{type:"button",className:"podium-save-btn",onClick:De,disabl
ed:!Qe,children:B?"Saving...":oe?"Lock in Final Picks":"Save Prediction"})]})]})})}),document.body)}function 
z4({user:n,firestore:e,onClose:t,onActivate:s}){const 
i=os(),l=i?bi.findIndex(B=>B.round===i.round):-1,c=l>=0?OR(l).filter(B=>new Date(B+"T23:59:59Z").getTime()>Date.now()):
[],[d,p]=S.useState(!1),[y,_]=S.useState(!1),[w,b]=S.useState(null),[R,P]=S.useState(""),O=Ir.filter(B=>B.stage==="grou
p");if(!i||c.length===0)return null;const j=async()=>{if(w){P(""),p(!0);try{await 
bn(nt(e,"users",n.uid),{["wildCards.round"+i.round]:{day:w,activatedAt:new 
Date().toISOString()}}),s&&s(i.round,w)}catch(B){console.error("WildCard activation error:",B),P("Failed to activate 
Wild Card. Please try again."),p(!1)}}},L=w?O.filter(B=>B.matchDate.startsWith(w)):[];return 
jo.createPortal(h.jsx("div",{className:"wc-modal-backdrop",onClick:t,children:h.jsx("div",{className:"panel wc-modal wc
-modal-wildcard",onClick:B=>B.stopPropagation(),children:h.jsx("div",{className:"wc-wildcard-card",children:h.jsxs("div
",{className:`wc-wildcard-card-inner${y?" wc-wildcard-card-flipped":""}`,children:[h.jsxs("div",{className:"wc-wildcard
-card-front",style:{backgroundImage:"url(/assets/wildcard.jpg)"},children:[h.jsx("div",{className:"wc-wildcard-card-fro
nt-overlay"}),h.jsxs("div",{className:"wc-wildcard-card-front-content",children:[h.jsx("div",{className:"wc-wildcard-st
amp",children:"?"}),h.jsx("h2",{className:"wc-wildcard-title",children:"WILD 
CARD"}),h.jsxs("div",{className:"wc-wildcard-subtitle",children:["Round 
",i.round]}),h.jsxs("div",{className:"wc-wildcard-multiplier",children:["x",is," 
POINTS"]}),h.jsxs("button",{type:"button",className:"wc-wildcard-flip-btn",onClick:()=>_(!0),children:["??"," 
Reveal"]}),h.jsx("button",{type:"button",className:"wc-wildcard-skip-btn",onClick:t,children:"Skip for now"})]})]}),h.j
sx("div",{className:"wc-wildcard-card-back",children:w?h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-mod
al-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Confirm Wild Card"]}),h.jsx("button",{
type:"button",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-confirm-b
ody",children:[h.jsx("div",{className:"wc-wildcard-confirm-date",children:new Date(w+"T00:00:00Z").toLocaleDateString("
en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}),h.jsx("div",{className:"wc-wildcard-confirm-games"
,children:L.map(B=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(B.homeTeam)&&h.jsx("img",{src:Kn(B.homeT
eam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.homeTeam}),h.j
sx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.awa
yTeam}),Kn(B.awayTeam)&&h.jsx("img",{src:Kn(B.awayTeam),alt:"",className:"wc-wildcard-day-flag"})]},B.matchKey))}),h.js
xs("div",{className:"wc-wildcard-confirm-note",children:["All points from your predictions on this day will be 
multiplied by ",h.jsxs("strong",{children:["�",is]}),"!"]}),R&&h.jsx("div",{className:"wc-save-error",children:R}),h.js
xs("div",{className:"wc-wildcard-confirm-actions",children:[h.jsx("button",{type:"button",className:"wc-wildcard-confir
m-btn",onClick:j,disabled:d,children:d?"Activating...":"? Confirm"}),h.jsx("button",{type:"button",className:"podium-sk
ip-btn",onClick:t,children:"Cancel"})]})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-heade
r",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Pick Your Day"]}),h.jsx("button",{type:"button
",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-pick-body",children:[
h.jsxs("p",{style:{color:"#b0c8e0",fontSize:"0.8rem",margin:"0 0 12px",lineHeight:1.5},children:["Choose one day in 
",h.jsxs("strong",{children:["Round ",i.round," (",i.label,")"]})," to get ",h.jsxs("strong",{children:["�",is]})," 
points on every match prediction you make that 
day."]}),h.jsx("div",{className:"wc-wildcard-days-list",children:c.map(B=>{const 
q=O.filter(le=>le.matchDate.startsWith(B));return 
h.jsxs("div",{className:"wc-wildcard-day-block",children:[h.jsx("div",{className:"wc-wildcard-day-header",children:new 
Date(B+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),q.length>0?h.jsx("div"
,{className:"wc-wildcard-day-games",children:q.map(le=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(le.h
omeTeam)&&h.jsx("img",{src:Kn(le.homeTeam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildca
rd-day-team",children:le.homeTeam}),h.jsx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{classNam
e:"wc-wildcard-day-team",children:le.awayTeam}),Kn(le.awayTeam)&&h.jsx("img",{src:Kn(le.awayTeam),alt:"",className:"wc-
wildcard-day-flag"})]},le.matchKey))}):h.jsx("div",{className:"wc-wildcard-day-no-games",children:"No group 
matches"}),h.jsxs("button",{type:"button",className:"wc-wildcard-select-btn",onClick:()=>b(B),children:["?"," Select 
this date"]})]},B)})})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podi
um-skip-btn",onClick:t,children:"Skip"})})]})})]})})})}),document.body)}function F4(){const[n,e]=S.useState(null),[t,s]
=S.useState(!0),[i,l]=S.useState(null),[c,d]=S.useState(!1),[p,y]=S.useState(!1),[_,w]=S.useState(!1),[b,R]=S.useState(
null),[P,O]=S.useState(""),[j,L]=S.useState(null),B=S.useRef(!1),q=S.useRef(0),le=S.useRef(!1);S.useEffect(()=>{const 
F=new URLSearchParams(window.location.search).get("join");F&&R(F)},[]),S.useEffect(()=>{if(!pr){s(!1);return}return 
Kj(pr,F=>{e(F),s(!1)})},[]),S.useEffect(()=>{if(!b||!n||!Wt)return;(async()=>{const 
F=wr(xt(Wt,"leagues"),ic("joinCode","==",b)),M=await Di(F);if(M.empty)O("Invalid or expired join code");else{const 
Te=M.docs[0].id,Ie=M.docs[0].data(),X=Ie.name;if(Ie.joinDeadline&&new 
Date(Ie.joinDeadline).getTime()<Date.now()){O("This league's entry period has 
closed"),R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3);return}await 
bn(nt(Wt,"users",n.uid),{leagueIds:sc(Te)}),O(`Joined league: ${X}`),Ie.type==="paid"&&((await c0(nt(Wt,"users",n.uid))
).data()?.stakesAcknowledged?.[Te]||L({id:Te,name:Ie.name,stake:Ie.stake||0,hostFeePercent:Ie.hostFeePercent||0,prizeSp
lits:Ie.prizeSplits||[]}))}R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3
)})()},[b,n,Wt]),S.useEffect(()=>{if(!Wt||!n){l(null),d(!1),y(!1),w(!1);return}return 
Lt(nt(Wt,"users",n.uid),F=>{const M=F.data()||{};l(M),d(!0);const Te=M.podiumPrediction,Ie=Date.now()>=new 
Date(f0).getTime(),X=Date.now()>=new Date(S_).getTime();!Te?.initial&&!Ie&&!Te?.dismissedAt?Date.now()-q.current>3e3&&y
(!0):X&&!Te?.final&&Date.now()-q.current>3e3&&y(!0);const ge=os(),Ee=ge?"round"+ge.round:null,je=Ee&&M.wildCards?.[Ee],
$=le.current||sessionStorage.getItem("wc_dismissed")===Ee;ge&&!je&&!$&&w(!0)})},[Wt,n]);const 
ue=V=>e(V),pe=async()=>{pr&&(await Hj(pr),e(null))},k=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1)},[]),I
=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1),Wt&&n&&i?.podiumPrediction?.dismissedAt==null&&bn(nt(Wt,"us
ers",n.uid),{"podiumPrediction.dismissedAt":Vn()}).catch(()=>{})},[Wt,n,i]);if(t)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading..."})})});if(!jR)return 
h.jsx("div",{className:"auth-screen",children:h.jsxs("div",{className:"panel 
auth-card",children:[h.jsx("h1",{children:"FWC26 
Predictor"}),h.jsx("p",{style:{marginTop:12,color:"#ff6060",textAlign:"center"},children:"Firebase is not 
configured."})]})});if(!n)return h.jsx(ZL,{firebaseAuth:pr,firestore:Wt,onAuth:ue});if(!c)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading profile..."})})});const 
A=Date.now()>=new Date(S_).getTime(),U=i?.podiumPrediction||null;return h.jsxs("div",{className:"app app--with-sidebar"
,children:[h.jsx(t4,{onLogout:pe,user:n}),P&&h.jsx("div",{className:"join-notification",children:P}),h.jsx("main",{clas
sName:"app-main",children:h.jsxs(RD,{children:[h.jsx(Aa,{path:"/",element:h.jsx(c4,{user:n,firestore:Wt,onOpenPodium:()
=>y(!0)})}),h.jsx(Aa,{path:"/matches",element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})}),h.jsx(Aa,{path:"/my-predictio
ns",element:h.jsx(k4,{user:n,firestore:Wt,userDoc:i,onOpenWildCard:()=>{sessionStorage.removeItem("wc_dismissed"),w(!0)
}})}),h.jsx(Aa,{path:"/teams",element:h.jsx(_4,{})}),h.jsx(Aa,{path:"/teams/:teamName",element:h.jsx(v4,{firestore:Wt})
}),h.jsx(Aa,{path:"/leaderboard",element:h.jsx(w4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/groups",element:h.jsx(b4,{f
irestore:Wt})}),h.jsx(Aa,{path:"/leagues",element:h.jsx(S4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/leagues/:leagueId"
,element:h.jsx(x4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/rules",element:h.jsx(C4,{})}),h.jsx(Aa,{path:"/profile",ele
ment:h.jsx(P4,{user:n,firestore:Wt,userDoc:i,onOpenPodium:()=>y(!0)})}),h.jsx(Aa,{path:"*",element:h.jsx(xD,{to:"/",rep
lace:!0})})]})}),p&&h.jsx(U4,{user:n,firestore:Wt,userDoc:i,existingPrediction:U,groupStageOver:A,onSave:k,onDismiss:I}
),_&&h.jsx(z4,{user:n,firestore:Wt,onClose:()=>{le.current=!0,sessionStorage.setItem("wc_dismissed",os()?"round"+os().r
ound:"done"),w(!1)},onActivate:(V,F)=>{le.current=!0,sessionStorage.setItem("wc_dismissed","round"+V),w(!1),l(M=>({...M
||{},wildCards:{...M?.wildCards||{},["round"+V]:{day:F,activatedAt:new Date().toISOString()}}}))}}),j&&h.jsx(p0,{league
:j,user:n,firestore:Wt,onConfirm:()=>L(null),onClose:()=>L(null)})]})}C1.createRoot(document.getElementById("root")).re
nder(h.jsx(S1.StrictMode,{children:h.jsx(ZD,{children:h.jsx(F4,{})})}));



```

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-BDuFWgmG.js\" -Pattern \"wc-group-card\" -SimpleMatch 2>&1",
  "description": "Check if old class is in built JS"
}
```

**Output:**
```
(no output)
```

---

## User

Refactor WorldCupPanel.jsx to fix the secondary match card layouts so that teams display horizontally side-by-side on a single line instead of stacked vertically on top of each other.

Update the following segments within the rendering loop:

1. Horizontal Team Rows (wc-match-card-teams):
- Locate the 'wc-match-card-teams' div container wrapper inside the loop. 
- Apply standard inline Flexbox properties (e.g., dynamic Tailwind classes 'flex flex-row items-center justify-between w-full gap-2') so that the Home FlagImg, Home Team Name, inline score/vs text element, Away Team Name, and Away FlagImg align straight across from left to right on a single horizontal axis.

2. Component Reordering inside the Card:
- Ensure the inner elements within 'wc-match-card-teams' strictly execute in this exact left-to-right markup order:
  * Home FlagImg
  * Home Team text element (shortTeam(m.homeTeam))
  * Score Badge / VS text container
  * Away Team text element (shortTeam(m.awayTeam))
  * Away FlagImg

3. Multi-Column Card Layout Grid (wc-grid-2col):
- Ensure that the parent container 'wc-grid-2col' wraps individual cards using a responsive grid system (e.g., 'grid grid-cols-1 md:grid-cols-2 gap-4 w-full'). This will allow the cards themselves to sit side-by-side as distinct columns across the dashboard page layout. 

---

## Assistant (Plan · DeepSeek V4 Flash Free · 17.9s)

_Thinking:_

The user is asking me to refactor the WorldCupPanel.jsx to fix the match card layout. They're describing what sounds like the current code is showing teams stacked vertically instead of horizontally. But looking at the code I already read, the `wc-match-card-teams` div already uses `display: flex; align-items: center; gap: 4px;` with the elements in the correct order (Home FlagImg, Home Team, Score/VS, Away Team, Away FlagImg).

The user mentions "Tailwind classes" like `flex flex-row items-center justify-between w-full gap-2` but this project doesn't use Tailwind - it uses custom CSS classes. I should note that.

Let me re-read the exact rendering code at lines 648-664 to understand the current state:

```jsx
<div className="wc-match-card-teams">
  <FlagImg team={m.homeTeam} />
  <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
  {m.actual?.homeScore != null ? (
    <span className="wc-inline-score wc-inline-score--actual">
      {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
    </span>
  ) : m.predictions?.[user?.uid] ? (
    <span className="wc-inline-score">
      {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
    </span>
  ) : (
    <span className="wc-vs">vs</span>
  )}
  <FlagImg team={m.awayTeam} />
  <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
</div>
```

The order is: Home Flag, Home Name, Score, Away Name, Away Flag.

Wait, the user says the order should be: Home Flag, Home Name, Score, Away Name, Away Flag. But looking at the current code, the order is: Home Flag, Home Name, Score, Away Flag, Away Name. That's the problem!

Look at lines 648-664 again:
1. Home FlagImg
2. Team name (home)
3. Score/VS
4. Away FlagImg ← This is before away name!
5. Team name (away)

The user wants:
1. Home FlagImg
2. Home Team text
3. Score/VS
4. Away Team text
5. Away FlagImg

So the FlagImg and name order are swapped for the away team! The away flag comes before the away name, but the user wants it after. This could be causing the vertical stacking if the flags are large and the names wrap.

Actually wait, let me re-read. The user says:
"The inner elements within 'wc-match-card-teams' strictly execute in this exact left-to-right markup order: Home FlagImg, Home Team text element, Score Badge / VS text container, Away Team text element (shortTeam(m.awayTeam)), Away FlagImg"

Current order is: Home FlagImg, Home Team name, Score, Away FlagImg, Away Team name.

So the Fix is: Move the Away FlagImg AFTER the Away Team name.

The CSS already has `display: flex; align-items: center; gap: 4px;` which should work horizontally. But maybe the flag images are too large, causing wrapping. The FlagImg component defaults to `size=24`. That should be fine.

But there's also the user's request about the grid: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full" - they want Tailwind-like classes. Since we use custom CSS, I should just ensure the CSS is correct.

Currently, the CSS `wc-grid-2col` is:
```css
.wc-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
```

The user wants `gap-4` (which in Tailwind = 16px). Currently it's 8px. And they want `grid-cols-1` on small screens, `md:grid-cols-2` on medium+.

Currently, `wc-grid-2col` is always 2 columns. At 640px breakpoint, there's a media query that sets `grid-template-columns: 1fr` for `wc-groups-grid` (old class). But `wc-grid-2col` isn't in that media query.

So the user wants responsive behavior: 1 column on small screens, 2 columns on larger screens.

Let me plan the changes:

1. **Fix element order in `wc-match-card-teams`**: Move `FlagImg team={m.awayTeam}` after `shortTeam(m.awayTeam)`
2. **Make `wc-grid-2col` responsive**: 1 column on small screens, 2 columns on medium+ screens
3. **Ensure CSS is correct for horizontal layout**: The existing CSS already handles this, but the element order fix is key

Let me also check if there are any other issues with the card layout that could cause "on top of each other" appearance.

Wait, I should also check what the wc-team-name CSS class looks like:

I can see the bug now. The `wc-match-card-teams` div has the away **FlagImg before** the away team name, instead of after it. This breaks the horizontal flow.

Current element order at `src/components/WorldCupPanel.jsx:648-664`:
```
FlagImg(home) → TeamName(home) → Score/VS → FlagImg(away) → TeamName(away)
```

Required element order:
```
FlagImg(home) → TeamName(home) → Score/VS → TeamName(away) → FlagImg(away)
```

Also, `wc-grid-2col` should be responsive: 1 column on narrow screens, 2 on wider ones.

Here's the plan:

**1. Fix component order** in `WorldCupPanel.jsx:662-663` — move `<FlagImg team={m.awayTeam} />` after `<span className="wc-team-name">{shortTeam(m.awayTeam)}</span>`

**2. Make `wc-grid-2col` responsive** in `styles.css:822-826`:
```css
.wc-grid-2col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
@media (min-width: 500px) {
  .wc-grid-2col {
    grid-template-columns: 1fr 1fr;
  }
}
```

**3. Verify `wc-match-card-teams` CSS** already has `display: flex; align-items: center; gap: 4px` (it does at line 854-861), so no CSS change needed there.

That's it — just 2 edits: one element swap in the JSX, and a responsive grid tweak in CSS. Ready to proceed?

---

## User

ok

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.3s)

_Thinking:_

The user confirmed. Let me make the two changes:

1. Reorder elements in WorldCupPanel.jsx - move away FlagImg after away team name
2. Make wc-grid-2col responsive - 1 column on small screens, 2 on wider ones

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "oldString": "                    ) : (\n                      <span className=\"wc-vs\">vs</span>\n                    )}\n                    <FlagImg team={m.awayTeam} />\n                    <span className=\"wc-team-name\">{shortTeam(m.awayTeam)}</span>",
  "newString": "                    ) : (\n                      <span className=\"wc-vs\">vs</span>\n                    )}\n                    <span className=\"wc-team-name\">{shortTeam(m.awayTeam)}</span>\n                    <FlagImg team={m.awayTeam} />"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": ".wc-grid-2col {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}",
  "newString": ".wc-grid-2col {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 8px;\n}\n@media (min-width: 500px) {\n  .wc-grid-2col {\n    grid-template-columns: 1fr 1fr;\n  }\n}"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.6s)

_Thinking:_

Both edits applied. Now verify by building to make sure no syntax errors, then deploy.

**Tool: bash**

**Input:**
```json
{
  "command": "npm run build 2>&1",
  "description": "Build to verify changes",
  "timeout": 60000,
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026"
}
```

**Output:**
```

> world-cup-2026@1.0.0 build
> vite build

[33mYou are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.[39m
[36mvite v7.3.5 [32mbuilding client environment for production...[36m[39m
transforming...
[32m✓[39m 80 modules transformed.
[33m[plugin vite:reporter] 
(!) C:/Users/jayno/Projects/world-cup-2026/node_modules/firebase/firestore/dist/esm/index.esm.js is dynamically imported by C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx but also statically imported by C:/Users/jayno/Projects/world-cup-2026/src/App.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/AuthPage.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Dashboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/GroupStandings.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Leaderboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeagueDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeaguesList.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MatchDetailModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyPredictions.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyProfile.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/StakesAcknowledgmentModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/TeamDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WildCardModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WorldCupPanel.jsx, C:/Users/jayno/Projects/world-cup-2026/src/lib/firebase.js, C:/Users/jayno/Projects/world-cup-2026/src/utils/worldCupApi.js, dynamic import will not move module into another chunk.
[39m
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.74 kB[22m[1m[22m[2m │ gzip:   0.37 kB[22m
[33m
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.[39m
[2mdist/[22m[35massets/index-D3N9rM8v.css  [39m[1m[2m100.18 kB[22m[1m[22m[2m │ gzip:  16.72 kB[22m
[2mdist/[22m[36massets/index-19rDVJwF.js   [39m[1m[33m882.87 kB[39m[22m[2m │ gzip: 258.31 kB[22m
[32m✓ built in 4.33s[39m

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 14.6s)

_Thinking:_

Build successful. Now deploy to Firebase.

**Tool: bash**

**Input:**
```json
{
  "command": "firebase deploy --only hosting 2>&1",
  "description": "Deploy to Firebase",
  "timeout": 60000,
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026"
}
```

**Output:**
```
(node:7100) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

[1m[37m===[39m Deploying to 'worldcup2026-92e25'...[22m

[36m[1mi [22m[39m deploying [1mhosting[22m
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m beginning deploy...
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m found 65 files in [1mdist[22m
[36m[1mi  hosting:[22m[39m upload complete
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m file upload complete
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m finalizing version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m version finalized
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m releasing new version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m release complete

[32m[1m+ [22m[39m [1m[4mDeploy complete![24m[22m

[1mProject Console:[22m https://console.firebase.google.com/project/worldcup2026-92e25/overview
[1mHosting URL:[22m https://worldcup2026-92e25.web.app

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.5s)

Deployed. Two changes made:

1. **Element order fixed** (`WorldCupPanel.jsx:662-663`) — away `FlagImg` now comes **after** away team name: `FlagImg(home) → TeamName(home) → Score/VS → TeamName(away) → FlagImg(away)`

2. **Grid made responsive** (`styles.css:822-832`) — `wc-grid-2col` now shows 1 column on narrow screens (<500px), 2 columns on wider screens

Try the live site in an incognito window: `https://worldcup2026-92e25.web.app`

---

## User

nopestill not done

---

## Assistant (Build · DeepSeek V4 Flash Free · 27.0s)

_Thinking:_

The user says it's still not working. Let me think about what "still not done" means. The issues I fixed were:
1. Element order inside the card (away FlagImg after away team name)
2. Responsive grid (1 col on small screens, 2 on wider)

But the user's original complaint was about elements being "on top of each other." Let me re-read their exact complaint from earlier:

"They are still on top of each other! even in incognito mode."

And then they gave me a specific refactoring request with instructions about:
1. Horizontal team rows using flexbox
2. Component reordering (which I did)
3. Multi-column card layout grid

But they're saying still not done. So the layout is still broken.

Let me think about what could still be wrong. Let me look at the actual built HTML to see what's on the page now, or let me re-examine the CSS and JSX more carefully.

Actually, the user's complaint about "on top of each other" was initially about the OLD layout (with group cards). But now with the NEW code (wc-match-card), what exactly is "on top of each other"?

Let me think about what the wc-match-card looks like:
- wc-match-card-teams: `display: flex; align-items: center; gap: 4px; font-size: 0.78rem;` - This should display items horizontally.
- wc-match-card-meta: `display: flex; align-items: center; gap: 10px; font-size: 0.65rem;` - should be horizontal
- wc-match-card-countdown: simple text

Wait, the issue might be that the cards themselves are very transparent and have no visible gap between them, making them look like they're stacked on top of each other. Let me check the card styling more carefully.

Actually, I need to look at this from the user's perspective. They said "they are on top of each other" - this could mean:
1. The cards overlap vertically (no spacing)
2. The elements within each card are stacked vertically instead of horizontally

Let me check the CSS for `wc-match-card-teams` more carefully. It has `display: flex` with `align-items: center` and `gap: 4px`. But wait - what about `flex-wrap`? By default, `flex-wrap: nowrap` so items should stay on one line. But if the content is too wide, items might overflow or wrap.

Actually, looking at the content of `wc-match-card-teams`:
- FlagImg (24px wide)
- Team name (shortTeam) - could be long
- Score text ("2 – 2" or "vs")
- Team name (shortTeam) - could be long
- FlagImg (24px wide)

With `font-size: 0.78rem` and `gap: 4px`, and the card having `padding: 10px 12px`, the available width for the card's content would be something like card width - 24px (padding).

On a narrow screen like mobile (where the user might be viewing), if the grid is 2 columns, each card is quite narrow. The team names might be too long and push things around.

But wait - I just made the grid 1 column on screens < 500px. So on a phone, each card should be full width. That should give plenty of space.

Hmm, let me think differently. Maybe the issue is that the cards have poor visual separation. The border is `1px solid rgba(255, 255, 255, 0.07)` which is extremely subtle. The cards might visually blend together making it look like everything is stacked on top of each other.

Or maybe the issue is that within the `wc-match-card-teams` flex container, the items ARE horizontal but they look wrong because the flag images have a specific width/height and the text elements are wrapping.

Actually, I just realized - I need to actually SEE what's happening on the page. Let me try to open the page or at least test it more carefully.

But wait, let me re-read the user's last instruction. They said:

"Refactor WorldCupPanel.jsx to fix the secondary match card layouts so that teams display horizontally side-by-side on a single line instead of stacked vertically on top of each other."

And then they gave specific instructions about:
1. Horizontal team rows - "flex flex-row items-center justify-between w-full gap-2"
2. Element reordering
3. Multi-column grid - "grid grid-cols-1 md:grid-cols-2 gap-4 w-full"

The user specifically mentioned Tailwind-like class names! But this project uses CSS classes, not Tailwind. So the user was describing what the CSS should achieve, and I applied equivalent CSS.

But maybe I missed something. Let me look at the user's instructions again:

"Apply standard inline Flexbox properties (e.g., dynamic Tailwind classes 'flex flex-row items-center justify-between w-full gap-2')"

The user said `justify-between` - this would push the home team to the far left and away team to the far right, with the score in the middle. My CSS doesn't have `justify-content: space-between`. Let me check...

My CSS for `wc-match-card-teams`:
```
.wc-match-card-teams {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8f0f8;
}
```

This uses `gap: 4px` but no `justify-content`. So items just naturally flow left-to-right with small gaps. If the user wants `justify-between`, that would spread the items across the full width.

But that's a relatively minor visual change - it wouldn't fix the "on top of each other" issue.

Let me think about what "on top of each other" really means. Maybe the cards themselves are working fine, but the knockout stage still uses the old `wc-match-row` layout which might look broken.

Wait, let me re-read the user's conversation from the beginning. The user said "Matches still not sorted" and "THEY ARE ON TOP OF EACH OTHER" with a diagram showing S. Korea, Canada, USA cards stacked. This was in the OLD code with group cards.

Now, with my new code, the group cards are replaced with compact match cards. But maybe the new cards also look like they're "on top of each other" because:
1. The grid gap is too small (8px)
2. The cards don't have enough visual separation
3. OR there's a different rendering issue

Actually, let me reconsider the problem completely. What if the issue is that the parent container is not properly sizing the cards? Or what if the issue is that the card content overflows and wraps, making the teams appear on separate lines?

Let me look at this more carefully. The `wc-match-card-teams` has:
```
display: flex;
align-items: center;
gap: 4px;
```

With `flex-wrap` defaulting to `nowrap`, all items should stay on one line. But if the total width exceeds the card width, the browser might overflow. With `overflow: hidden` or not set on the card, items could overflow visually.

The card has `padding: 10px 12px` and `display: flex; flex-direction: column; gap: 4px;`. The `wc-match-card-teams` is a child with `display: flex; flex-direction: row` (default). This should work.

But wait - what about the team names? `shortTeam` only shortens a few specific names (like "Bosnia and Herzegovina" → "Bosnia") and names longer than 9 characters (truncated to 8 + ellipsis). Most team names are shorter than 9 chars, so they won't be truncated. Names like "Argentina", "Brazil", "England" are all under 9 chars.

Hmm, but with the new format (48 teams), there are longer names. Let me check what teams exist...

Actually, this doesn't matter. The user is saying it's STILL not working. I need to take a different approach. Let me look at the actual rendered page.

Wait, I know what the issue might be! Let me check if the `wc-match-card-teams` flex container has `flex-direction: row` or if it defaults to `column` somehow.

Looking at my CSS again:
```
.wc-match-card-teams {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8f0f8;
}
```

`display: flex` defaults to `flex-direction: row`. So items should be horizontal. Unless something else overrides this...

Actually, I wonder if there's a global CSS rule that sets `flex-direction: column` on all flex containers or something like that. Let me check if there are any conflicting styles.

Actually, let me just look at the actual page source from the deployed site. Let me check what the HTML renders. But the site is a SPA, so I can't see the rendered HTML from a fetch.

Let me try a different approach - let me actually test by running the app locally to see what happens.

Wait, actually let me try serving the dist folder locally and checking:

Let me actually test locally to see what's happening.

**Tool: bash**

**Input:**
```json
{
  "command": "Get-ChildItem -LiteralPath \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\" 2>&1",
  "description": "Check built assets"
}
```

**Output:**
```


    Directory: C:\Users\jayno\Projects\world-cup-2026\dist\assets


Mode                 LastWriteTime         Length Name                                                                 
----                 -------------         ------ ----                                                                 
-a----        04/06/2026     17:34         882874 index-19rDVJwF.js                                                    
-a----        04/06/2026     17:34         100184 index-D3N9rM8v.css                                                   
-a----        04/06/2026     05:16         169075 wildcard.jpg                                                         



```

**Tool: grep**

**Input:**
```json
{
  "pattern": "wc-grid-2col|wc-match-card-teams",
  "include": "*.js",
  "path": "C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets"
}
```

**Output:**
```
Found 1 matches
C:\Users\jayno\Projects\world-cup-2026\dist\assets\index-19rDVJwF.js:
  Line 34: `+n.stack),e}class rR{constructor(){this._progressObserver={},this._taskCompletionResolver=new On,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,s){this._progressObserver={next:e,error:t,complete:s}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}const U6=-1;class Vt extends rd{constructor(e,t,s,i){super(e,t,s,i),this.type="firestore",this._queue=new KS,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new KS(e),this._firestoreClient=void 0,await e}}}function z6(n,e,t){t||(t=jh);const s=$h(n,"firestore");if(s.isInitialized(t)){const i=s.getImmediate({identifier:t}),l=s.getOptions(t);if(ms(l,e))return i;throw new de(ne.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new de(ne.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<mI)throw new de(ne.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");retur...
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.7s)

_Thinking:_

Let me look at what "not done" means specifically. The user wants "teams display horizontally side-by-side on a single line instead of stacked vertically." They want `justify-between` to push the teams to opposite ends of the card.

Let me also check the actual built JS to see the wc-match-card-teams content.

Actually, let me take a step back and look at the full card structure more carefully. Maybe the issue is that the `wc-match-card` is `display: flex; flex-direction: column` which makes ALL its children stack vertically. Then `wc-match-card-teams` is one of those children and it has `display: flex` with default `flex-direction: row`. So the teams should be horizontal.

But wait - maybe the issue is that `wc-match-card-teams` doesn't have `justify-content: space-between`. The user explicitly mentioned `justify-between`. If the team name + flag + score are all bunched together without spreading out, it could look wrong.

Actually, maybe the real problem is something I haven't considered. Let me look at the actual styles in `wc-match-card-teams` more carefully. The elements within it are:
- FlagImg - renders an `<img>` with width and height, or a placeholder span
- span.wc-team-name - text
- span.wc-inline-score or span.wc-vs - score text
- span.wc-team-name - text  
- FlagImg - renders an `<img>` or placeholder

All are inline or inline-block elements within a flex container. This should definitely display horizontally.

Let me just add `justify-content: space-between` to make it look better, and also make sure `flex-wrap: nowrap` is explicit.

Actually wait - could there be an issue with the FlagImg component? Let me look at it:

```jsx
function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="wc-flag-placeholder" />;
  return (
    <img
      className="wc-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
    />
  );
}
```

The `getFlagUrl` function uses a different base URL for the new build. Let me check what it does... Actually, let me check worldCupData.js:

**Tool: grep**

**Input:**
```json
{
  "include": "worldCupData.js",
  "pattern": "getFlagUrl|getFlagSrc"
}
```

**Output:**
```
Found 1 matches
C:\Users\jayno\Projects\world-cup-2026\src\utils\worldCupData.js:
  Line 401: export function getFlagUrl(teamName) {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.8s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\utils\\worldCupData.js",
  "offset": 401,
  "limit": 15
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\utils\worldCupData.js</path>
<type>file</type>
<content>
401: export function getFlagUrl(teamName) {
402:   const code = TEAM_FLAG_CODES[teamName];
403:   return code ? `https://flagcdn.com/24x18/${code}.png` : null;
404: }

(End of file - total 404 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 10.0s)

_Thinking:_

OK so the flag URLs come from flagcdn.com. If the images fail to load (e.g., if the CDN is blocked), the placeholder is shown. But that shouldn't cause layout issues.

Let me think about this differently. The user says "still not done." They want:
1. Teams side-by-side horizontally (which my code does via `display: flex`) - BUT maybe the issue is that the cards ARE working but the user considers the layout still broken because the cards don't look right visually.

Let me look at the whole picture. What if the real issue is that the `wc-match-card-teams` doesn't have `justify-content: space-between`? With the current `gap: 4px`, all items are bunched in the center-left of the card. The user wants teams at opposite ends with the score in the middle.

Let me just add `justify-content: space-between` to `wc-match-card-teams`. The user specifically mentioned this.

Also, let me also consider that the user said "grid grid-cols-1 md:grid-cols-2 gap-4 w-full" - which means the grid should be 1 column on small screens and 2 on medium+. I made it 1 column below 500px and 2 columns above 500px. That's the responsive behavior.

Let me just make the fixes and see if it addresses the issue. The key changes:
1. `justify-content: space-between` on `wc-match-card-teams`
2. Maybe increase `gap` on the grid
3. Make sure the cards have better visual separation

Let me also look at the full wc-match-card more carefully to see if there's a wrapping issue.

Actually, I just realized something crucial. Let me look at the `wc-match-card` container more carefully:

```
.wc-match-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
```

This is fine. The card has `flex-direction: column` with small gap between children.

```
.wc-match-card-teams {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8f0f8;
}
```

This has `display: flex` which defaults to `flex-direction: row`. Children should be horizontal.

Wait... but `gap: 4px` is very tight. With the flags (24px wide) + team names + score, it might look cramped. Adding `justify-content: space-between` will spread things out.

Let me also check - is there a `wc-flag` CSS class that has `display: block` or something?

Actually, let me just check:

**Tool: grep**

**Input:**
```json
{
  "include": "*.css",
  "pattern": "\\.wc-flag\\b"
}
```

**Output:**
```
Found 14 matches
C:\Users\jayno\Projects\world-cup-2026\dist\assets\index-D3N9rM8v.css:
  Line 1: :root{color:#f7fbff;background:#06142b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-synthesis:none;text-rendering:optimizeLegibility}*{box-sizing:border-box;letter-spacing:0}html,body{min-width:320px;min-height:100%;margin:0;background:#06142b}body{min-height:100vh;overflow-x:hidden}button,input,textarea,select{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.52}.app{position:relative;isolation:isolate;min-height:100vh;padding:16px;background:radial-gradient(circle at 18% 10%,rgba(33,234,255,.26),transparent 22%),radial-gradient(circle at 82% 8%,rgba(0,132,255,.24),transparent 24%),radial-gradient(circle at 50% 100%,rgba(0,92,255,.22),transparent 36%),linear-gradient(180deg,rgba(255,255,255,.08),transparent 26%),linear-gradient(180deg,#0a2347,#0a2f64 28%,#0a1f47 58%,#06142b);overflow:hidden}.panel{background:linear-gradient(135deg,#06142bf2,#0a2850eb);border:1px solid rgba(255,255,255,.08);border-radius:16px}.lobby-panel{padding:12px 16px 20px}.modal-backdrop{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#01040ab3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:fadeIn .15s ease-out}.modal-panel{max-width:440px;width:calc(100% - 32px);max-height:90vh;overflow-y:auto;padding:20px}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.auth-screen{min-height:100svh;padding:clamp(12px,2vw,24px);display:grid;place-items:center;background:radial-gradient(circle at 18% 18%,rgba(33,234,255,.22),transparent 24%),radial-gradient(circle at 82% 76%,rgba(0,132,255,.2),transparent 24%),linear-gradient(120deg,#030c1c9e,#030c1cc7),#081d3f}.auth-card{width:min(560px,100%);padding:16px 0}.auth-card h1{margin:0 0 2px;font-size:1.2rem;font-weight:700;text-align:center;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.auth-card p{margin:0 0 12px;text-align:center;color:#8a...

C:\Users\jayno\Projects\world-cup-2026\src\styles.css:
  Line 956: .wc-flag {

  Line 962: .wc-flag-placeholder {

  Line 5568: .wc-flag-circle-wrap {

  Line 5578: .wc-flag-circle {

  Line 5585: .wc-flag-circle-placeholder {

  Line 5988:   .wc-flag-circle-wrap,

  Line 5989:   .wc-flag-circle-placeholder {

  Line 6025:   .wc-flag-circle-wrap,

  Line 6026:   .wc-flag-circle-placeholder {

  Line 6936:   .wc-flag-circle-wrap,

  Line 6937:   .wc-flag-circle-placeholder {

  Line 7054:   .wc-flag-circle-wrap,

  Line 7055:   .wc-flag-circle-placeholder {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.2s)

_Thinking:_

Let me look at the `.wc-flag` and `.wc-flag-placeholder` CSS:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 15,
  "offset": 956
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
956: .wc-flag {
957:   flex: 0 0 auto;
958:   border-radius: 2px;
959:   display: block;
960: }
961: 
962: .wc-flag-placeholder {
963:   width: 24px;
964:   height: 18px;
965:   display: inline-block;
966:   background: rgba(255, 255, 255, 0.06);
967:   border-radius: 2px;
968: }
969: 
970: .wc-team-name {

(Showing lines 956-970 of 7372. Use offset=971 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.2s)

_Thinking:_

`.wc-flag` has `display: block` and `flex: 0 0 auto`. The flag images have explicit `width` and `height` from the component's JSX attributes. The placeholder has fixed width/height.

`.wc-team-name`:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 10,
  "offset": 970
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
970: .wc-team-name {
971:   white-space: nowrap;
972:   overflow: hidden;
973:   text-overflow: ellipsis;
974:   max-width: 70px;
975:   font-size: 0.7rem;
976: }
977: 
978: .wc-vs {
979:   opacity: 0.35;

(Showing lines 970-979 of 7372. Use offset=980 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.3s)

_Thinking:_

`.wc-team-name` has `max-width: 70px` and `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`. So team names will be truncated at 70px, which is good.

`.wc-vs`:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 10,
  "offset": 978
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
978: .wc-vs {
979:   opacity: 0.35;
980:   font-size: 0.6rem;
981:   margin: 0 1px;
982: }
983: 
984: .wc-inline-score {
985:   font-weight: 700;
986:   color: #f0c040;
987:   font-size: 0.78rem;

(Showing lines 978-987 of 7372. Use offset=988 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 15.2s)

_Thinking:_

OK, so the CSS for everything looks correct. All elements should display horizontally. But the user keeps saying it's not working.

Let me think hard about what "on top of each other" could mean. Maybe the user is seeing the cards rendered correctly but considers them too compact/close together. Or maybe the issue is with mobile layout where the screen is very narrow.

Actually, I just had an idea. Let me look at the `FlagImg` in the built version of the new code. In the built JS, `FlagImg` for the `wc-match-card-teams` section uses `size=24`:

```jsx
<FlagImg team={m.homeTeam} />
```

The default `size` is 24. But in the BUILT code, `Ka` (FlagImg equivalent) should also use `size=24`.

Wait - let me check the built JS more carefully. I saw in the truncated output that `Ka` (the FlagImg in the built code) uses `{team:n,size:e=20}`. So the default size is 20 pixels, not 24! But the `wc-flag-placeholder` has `width: 24px` and `height: 18px`. If the image size is 20x15 but the placeholder is 24x18, there might be a mismatch but it's minor.

Actually, looking at my earlier grep output, `Ka` has `size:e=20` which means the default image size is 20px wide. But the `wc-flag-placeholder` CSS has `width: 24px` and `height: 18px`. This is a small inconsistency but shouldn't cause "on top of each other" issues.

OK I think I'm overthinking this. Let me just look at the element inspector on the live page. But I can't do that programmatically.

Let me try a different approach entirely. Let me look at what the user ACTUALLY sees. Maybe I should add `justify-content: space-between` to spread the teams across the card width, and increase the gap and padding to give better visual separation.

Actually, you know what - let me check one more thing. Is it possible that the old code's CSS for `wc-groups-grid` and related classes is overriding the new code? In the deployed CSS, those old classes still exist. But since the JSX no longer renders elements with those classes, they shouldn't match anything.

But what about the media query I saw earlier?
```
@media(max-width:640px){
  .wc-groups-grid{grid-template-columns:1fr}
  ...
  .wc-group-card{padding:8px}
  ...
  .wc-standings-table{font-size:.65rem}
  ...
}
```

These only apply to `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table` - none of which are used in my new code. So they're irrelevant.

OK wait, I need to take a fresh approach. Let me try to actually load the built page locally and check the rendered HTML structure.

Actually, I can try to use `npx vite preview` to serve the built files locally and then inspect them. But that requires me to understand the HTML structure from the built output.

Let me look at the full built JS to see how the WorldCupPanel renders. Let me search for `wc-grid-2col` in the built JS.

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-grid-2col\" -SimpleMatch -Context 0,5 2>&1",
  "description": "Check built JS for grid-2col context"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93804878001qdVPDBeWzQOUO0

,h.jsx("span",{children:"Missed both score and outcome"})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-he
ro-card--podium",children:[h.jsx("div",{className:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-t
itle",children:"Podium Prediction"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rule
s-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.first]}),h.jsxs("div",{className:"r
ules-hero-detail",children:[h.jsx("strong",{children:"Winner"}),h.jsx("span",{children:"Pick the champion"})]})]}),h.js
xs("div",{className:"rules-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.second]}),
h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Runner 
Up"}),h.jsx("span",{children:"Pick the runner-up"})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("d
iv",{className:"rules-hero-points",children:["+",cn.third]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.js
x("strong",{children:"3rd Place"}),h.jsx("span",{children:"Pick the third-place 
finisher"})]})]})]}),h.jsxs("div",{className:"rules-podium-split",children:[h.jsxs("div",{className:"rules-podium-sub r
ules-podium-sub--change",children:[h.jsx("span",{className:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{childr
en:[h.jsx("strong",{className:"rules-podium-sub-title",children:"Change"}),h.jsxs("p",{className:"rules-podium-sub-text
",children:["Revise your podium picks once after the group stage ends 
(",R4,")."]})]})]}),h.jsxs("div",{className:"rules-podium-sub rules-podium-sub--stick",children:[h.jsx("span",{classNam
e:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{children:[h.jsx("strong",{className:"rules-podium-sub-title",ch
ildren:"Stick"}),h.jsxs("p",{className:"rules-podium-sub-text",children:["Keep unchanged for the ",kc,"\\u00D7 
bonus!"]})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-hero-card--wildcard",children:[h.jsx("div",{class
Name:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-title",children:"Wild Card - Use It or Lose It
"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("di
v",{className:"rules-hero-points",children:["�",is]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("stro
ng",{children:"One Day Per Round"}),h.jsxs("span",{children:["Pick one matchday each round - all your points on that 
day are multiplied by 
",is,"!"]})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsx("div",{className:"rules-hero-points rules-h
ero-points--zero",children:"-"}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Use 
It or Lose It"}),h.jsx("span",{children:"If you don't activate your Wild Card in a round, it doesn't carry over."})]})]
})]})]})]}),h.jsxs("div",{className:"rules-secondary-grid",children:[h.jsxs("div",{className:"rules-secondary-card pane
l",children:[h.jsxs("div",{className:"rules-secondary-header",children:[h.jsx("span",{className:"rules-secondary-icon",
children:"??"}),h.jsx("h4",{className:"rules-secondary-title",children:"Leaderboard"})]}),h.jsxs("div",{className:"rule
s-secondary-body",children:[h.jsxs("p",{children:[h.jsx("strong",{children:"Total Score"})," = match prediction points 
+ podium points"]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Tiebreaker:"})," Podium points decide the 
winner."]})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-seconda
ry-header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-second
ary-title",children:"Teams & Groups"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children
:[h.jsx("strong",{children:"48 teams"})," in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to 
Round of 32."]}),h.jsx("p",{children:"FIFA world rankings shown on each team 
card."})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-secondary-
header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-secondary
-title",children:"Leagues"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children:[h.jsx("s
trong",{children:"Master League:"})," Auto-enrolled - compete against 
everyone."]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Private Leagues:"})," Create with friends via invite 
link or join code."]})]})]})]})]})}function Ql(n){return n==="Bosnia and Herzegovina"?"Bosnia":n==="C�te 
d'Ivoire"?"C�te d'Ivoire":n==="Korea Republic"?"S. Korea":n==="IR Iran"?"Iran":n==="Cabo Verde"?"C. Verde":n==="Congo 
DR"?"Congo":n==="Saudi Arabia"?"Saudi Ar.":n==="Netherlands"?"Netherlands":n==="Switzerland"?"Switzerland":n==="Czechia
"?"Czechia":n==="T�rkiye"?"T�rkiye":n==="New Zealand"?"N. Zealand":n.length>9?n.slice(0,8)+".":n}const 
dN=n=>n.actual?.homeScore!=null?"??":Ha(n.matchDate)?"??":"?";function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.
jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,he
ight:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}class D4 
extends S.Component{constructor(e){super(e),this.state={hasError:!1}}static 
getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("MyPredictions 
crashed:",e,t)}render(){return this.state.hasError?h.jsxs("div",{className:"my-predictions",style:{padding:32,textAlign
:"center"},children:[h.jsx("p",{style:{color:"#ff6b6b",fontSize:"1.1rem"},children:"Something went wrong loading your 
predictions."}),h.jsx("p",{style:{color:"#8aa0c0",fontSize:"0.85rem"},children:"Please try refreshing the 
page."})]}):this.props.children}}function k4(n){return h.jsx(D4,{children:h.jsx(j4,{...n})})}function j4({user:n,firest
ore:e,userDoc:t,onOpenWildCard:s}){const[i,l]=S.useState([]),[c,d]=S.useState(!1),[p,y]=S.useState(null),[_,w]=S.useSta
te({}),[b,R]=S.useState(null),[P,O]=S.useState(""),[j,L]=S.useState({}),[B,q]=S.useState(null),[le,ue]=S.useState(!1),[
pe,k]=S.useState(!1),[I,A]=S.useState({});S.useEffect(()=>!e||!n?void 
0:Lt(nt(e,"users",n.uid),G=>{y(G.data()||{})},G=>console.warn("UserDoc snapshot 
error",G)),[e,n]),S.useEffect(()=>e?Lt(xt(e,"users"),G=>{const 
W={};G.docs.forEach(ve=>{W[ve.id]=ve.data()}),A(W)},G=>console.warn("UsersMap snapshot error",G)):void 0,[e]),S.useEffe
ct(()=>e?Lt(xt(e,"worldCupPredictions"),G=>{l(G.docs.map(W=>({id:W.id,...W.data()}))),d(!0)},G=>{console.warn("MyPredic
tions snapshot error",G),d(!0)}):void 0,[e]);const U=S.useMemo(()=>{const D={};return 
i.forEach(G=>{D[G.matchKey]=G}),Ir.map(G=>{const W=D[G.matchKey]||{};return{...G,...W,id:W.id||G.matchKey,predictions:W
.predictions||{},actual:W.actual||{homeScore:null,awayScore:null},points:W.points||{}}})},[i]),V=S.useMemo(()=>n?U.filt
er(D=>D.predictions?.[n.uid]?.homeScore!=null).sort((D,G)=>{const W=["group","roundOf32","roundOf16","quarterFinal","se
miFinal","thirdPlace","final"],ve=W.indexOf(D.stage),we=W.indexOf(G.stage);return 
ve!==we?ve-we:(D.matchNumber||0)-(G.matchNumber||0)}):[],[U,n]),[F,M]=S.useState(()=>{const D=os();return D?`round${D.r
ound}`:"all"}),Te=S.useMemo(()=>V.filter(D=>D.stage==="group"),[V]),Ie=S.useMemo(()=>V.filter(D=>D.stage!=="group"),[V]
),X=S.useMemo(()=>p??t,[p,t]),ge=S.useMemo(()=>{const D=os();if(!D||!X)return null;const G="round"+D.round;return 
X.wildCards?.[G]?null:{round:D.round,label:D.label}},[X]),Ee=S.useMemo(()=>{const D=os();if(!D||!X)return null;const 
G="round"+D.round,W=X.wildCards?.[G];return 
W?{round:D.round,label:D.label,day:W.day}:null},[X]),je=!!os(),[$,C]=S.useState("");S.useEffect(()=>{const 
D=()=>{const W=new Date(f0).getTime()-Date.now();if(W<=0){C("");return}const 
ve=Math.floor(W/864e5),we=Math.floor(W%864e5/36e5),be=Math.floor(W%36e5/6e4),Re=Math.floor(W%6e4/1e3);C(`${ve}d ${we}h 
${be}m ${Re}s`)};D();const G=setInterval(D,1e3);return()=>clearInterval(G)},[]);const H=S.useMemo(()=>{const D=Object.e
ntries(I).filter(([ve])=>ve!==n?.uid&&I[ve]?.podiumPrediction),G={first:{},second:{},third:{}};D.forEach(([,ve])=>{cons
t we=ve.podiumPrediction.final||ve.podiumPrediction;we.first&&(G.first[we.first]=(G.first[we.first]||0)+1),we.second&&(
G.second[we.second]=(G.second[we.second]||0)+1),we.third&&(G.third[we.third]=(G.third[we.third]||0)+1)});const W=(ve,we
=3)=>Object.entries(ve).sort((be,Re)=>Re[1]-be[1]).slice(0,we);return{totalOthers:D.length,topFirst:W(G.first),topSecon
d:W(G.second),topThird:W(G.third)}},[I,n]),oe=p?.podiumPrediction,ye=oe?oe.final||oe:null,Pe=!!oe?.final,De=Pe&&oe.init
ial&&oe.final&&oe.initial.first===oe.final.first&&oe.initial.second===oe.final.second&&oe.initial.third===oe.final.thir
d,Ve=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)&&D.actual?.homeScore==null).sort((D,G)=>new 
Date(D.matchDate)-new Date(G.matchDate))[0]||null,[U]),Je=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)
&&D.actual?.homeScore==null&&D.predictions?.[n?.uid]?.homeScore==null).sort((D,G)=>new Date(D.matchDate)-new Date(G.mat
chDate)).slice(0,9),[U,n]),Qe=S.useMemo(()=>U.find(D=>D.matchKey===B)||null,[U,B]),zt=S.useCallback(async(D,G,W)=>{if(!
e||!n)return;const ve=nt(e,"worldCupPredictions",D);await bn(ve,{[`predictions.${n.uid}`]:{homeScore:Number(G),awayScor
e:Number(W)},updatedAt:Vn()}).catch(we=>console.warn("Prediction save 
failed",we))},[e,n]),tn=S.useCallback(async(D,G,W)=>{R(D),O(""),await zt(D,G,W),R(null),w(ve=>{const we={...ve};return 
delete we[D],we})},[zt]);if(S.useEffect(()=>{if(Je.length===0)return;const D=()=>{const 
W=Date.now(),ve={};Je.forEach(we=>{const Re=LR(we.matchDate).getTime()-W;if(Re<=0)ve[we.matchKey]="Deadline 
passed";else{const $e=Math.floor(Re/864e5),mt=Math.floor(Re%864e5/36e5),dn=Math.floor(Re%36e5/6e4),Ft=Math.floor(Re%6e4
/1e3);$e>0?ve[we.matchKey]=`${$e}d ${mt}h ${dn}m ${Ft}s`:mt>0?ve[we.matchKey]=`${mt}h ${dn}m 
${Ft}s`:ve[we.matchKey]=`${dn}m ${Ft}s`}}),L(ve)};D();const 
G=setInterval(D,1e3);return()=>clearInterval(G)},[Je]),!c)return h.jsx("div",{className:"my-predictions",children:h.jsx
("div",{className:"my-predictions-empty",children:"Loading..."})});const Q=Ve?A_(Ve.venue):null;return h.jsxs("div",{cl
assName:"my-predictions",children:[Je.length>0&&h.jsxs("div",{className:"my-pred-hero",children:[h.jsxs("div",{classNam
e:"my-pred-hero-title",children:["?"," Quick 
Predict"]}),h.jsx("div",{className:"my-pred-hero-grid",children:Je.map(D=>{const 
G=_[D.matchKey]||{home:"0",away:"0"},W=b===D.matchKey,ve=A_(D.venue);return h.jsxs("div",{className:"my-pred-hero-game"
,children:[h.jsxs("div",{className:"my-pred-hero-game-row",children:[h.jsxs("div",{className:"my-pred-hero-game-team",c
hildren:[h.jsx(Ka,{team:D.homeTeam,size:24}),h.jsx("span",{className:"my-pred-hero-game-name",children:D.homeTeam})]}),
h.jsxs("div",{className:"my-pred-hero-game-score-wrap",children:[h.jsx("input",{type:"number",min:"0",max:"20",classNam
e:"my-pred-hero-game-input",value:G.home,onChange:we=>w(be=>({...be,[D.matchKey]:{...be[D.matchKey],home:we.target.valu
e,away:be[D.matchKey]?.away??"0"}})),disabled:W}),h.jsx("span",{className:"my-pred-hero-game-colon",children:":"}),h.js
x("input",{type:"number",min:"0",max:"20",className:"my-pred-hero-game-input",value:G.away,onChange:we=>w(be=>({...be,[
D.matchKey]:{...be[D.matchKey],home:be[D.matchKey]?.home??"0",away:we.target.value}})),disabled:W})]}),h.jsxs("div",{cl
assName:"my-pred-hero-game-team my-pred-hero-game-team--right",children:[h.jsx(Ka,{team:D.awayTeam,size:24}),h.jsx("spa
n",{className:"my-pred-hero-game-name",children:D.awayTeam})]})]}),h.jsxs("div",{className:"my-pred-hero-game-footer",c
hildren:[h.jsxs("span",{className:"my-pred-hero-game-venue",children:["???"," ",ve?.stadium,", 
",ve?.city]}),h.jsxs("span",{className:"my-pred-hero-game-kickoff",children:["?"," 
",Os(D.matchDate)]}),h.jsxs("span",{className:"my-pred-hero-game-deadline",children:["?"," ",j[D.matchKey]||"..."]})]})
,h.jsxs("button",{type:"button",className:"my-pred-hero-game-confirm",onClick:()=>tn(D.matchKey,G.home,G.away),disabled
:W,children:[W?"?":"?"," Confirm"]})]},D.matchKey)})})]}),h.jsxs("div",{className:"my-pred-top-row",children:[h.jsx("di
v",{className:"my-pred-col",children:je&&ge?h.jsxs("div",{className:"my-pred-wc-tile",children:[h.jsx("button",{type:"b
utton",className:"my-pred-wc-info-btn",onClick:()=>ue(!0),children:"What's 
this?"}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:s,children:["?"," Activate 
Now"]})]}):je&&Ee?h.jsxs("div",{className:"my-pred-wc-tile my-pred-wc-tile--activated",children:[h.jsxs("div",{classNam
e:"my-pred-wc-tile-content",children:[h.jsxs("div",{className:"my-pred-wc-tile-header",children:["??"," Wild Card 
Active"]}),h.jsxs("div",{className:"my-pred-wc-tile-sub",children:["Round ",Ee.round," 
(",Ee.label,")"]}),h.jsx("div",{className:"my-pred-wc-tile-day",children:new Date(Ee.day+"T00:00:00Z").toLocaleDateStri
ng("en-US",{weekday:"short",month:"short",day:"numeric"})}),h.jsxs("div",{className:"my-pred-wc-tile-badge",children:["
�",is," 
Active"]})]}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:()=>k(!0),children:["?"," 
Redeemed"]})]}):h.jsx("div",{className:"my-pred-wc-tile my-pred-wc-tile--hidden"})}),h.jsx("div",{className:"my-pred-co
l",children:Ve?h.jsxs("button",{type:"button",className:"my-pred-next-card",onClick:()=>q(Ve.matchKey),children:[h.jsxs
("div",{className:"my-pred-next-badge",children:["?"," NEXT MATCH"]}),h.jsxs("div",{className:"my-pred-next-teams",chil
dren:[h.jsx(Ka,{team:Ve.homeTeam,size:40}),h.jsxs("div",{className:"my-pred-next-team",children:[h.jsx("span",{classNam
e:"my-pred-next-name",children:Ve.homeTeam}),h.jsxs("span",{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.home
Team).fifaRank]})]}),h.jsx("span",{className:"my-pred-next-vs",children:"vs"}),h.jsxs("div",{className:"my-pred-next-te
am my-pred-next-team--away",children:[h.jsx("span",{className:"my-pred-next-name",children:Ve.awayTeam}),h.jsxs("span",
{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.awayTeam).fifaRank]})]}),h.jsx(Ka,{team:Ve.awayTeam,size:40})]}
),h.jsxs("div",{className:"my-pred-next-venue",children:["???"," ",Q?.stadium,", 
",Q?.city]}),h.jsxs("div",{className:"my-pred-next-kickoff",children:["?"," 
",Os(Ve.matchDate)]}),h.jsxs("div",{className:"my-pred-next-countdown",children:["?"," ",j[Ve.matchKey]||"-"]}),h.jsxs(
"div",{className:"my-pred-next-prediction",children:[h.jsx("span",{className:"my-pred-next-pred-label",children:"YOUR P
REDICTION"}),Ve.predictions?.[n.uid]?h.jsxs("div",{className:"my-pred-next-pred-score-row",children:[h.jsx(Ka,{team:Ve.
homeTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve.predictions[n.uid].homeScore}),h.jsx("
span",{className:"my-pred-next-pred-colon",children:":"}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve
.predictions[n.uid].awayScore}),h.jsx(Ka,{team:Ve.awayTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-btn",ch
ildren:"Edit"})]}):h.jsxs("span",{className:"my-pred-next-pred-btn my-pred-next-pred-btn--primary",children:["?"," 
Predict this match"]})]})]}):h.jsx("div",{className:"my-pred-next-card 
my-pred-next-card--empty",children:h.jsxs("div",{className:"my-pred-next-empty",children:["?"," All matches 
complete!"]})})}),h.jsx("div",{className:"my-pred-col",children:ye?h.jsxs("div",{className:"my-pred-podium-card my-pred
-podium-card--extended",children:[h.jsxs("div",{className:"my-pred-podium-header",children:[h.jsxs("span",{className:"m
y-pred-podium-title",children:["??"," My Podium 
Picks"]}),$&&h.jsxs("span",{className:"my-pred-podium-lock",children:["??"," Locks ",$]})]}),h.jsx("div",{className:"my
-pred-podium-rows",children:[{key:"first",icon:"??",team:ye.first||oe?.first||oe?.initial?.first,pts:cn.first},{key:"se
cond",icon:"??",team:ye.second||oe?.second||oe?.initial?.second,pts:cn.second},{key:"third",icon:"??",team:ye.third||oe
?.third||oe?.initial?.third,pts:cn.third}].map(D=>h.jsxs("div",{className:"my-pred-podium-row",children:[h.jsx("span",{
className:"my-pred-podium-icon",children:D.icon}),h.jsx("span",{className:"my-pred-podium-team",children:D.team||"-"}),
h.jsxs("span",{className:"my-pred-podium-pts",children:["+",De?D.pts*kc:D.pts," 
pts"]})]},D.key))}),h.jsx("div",{className:"my-pred-podium-note",children:Pe?`Final picks locked${De?" - triple points 
active!":""}`:"Initial picks set - you can update after group stage"}),H.totalOthers>0&&h.jsxs("div",{className:"my-pre
d-others-section",children:[h.jsxs("div",{className:"my-pred-others-count",children:["??"," ",H.totalOthers," other 
player",H.totalOthers===1?"":"s"," submitted 
picks"]}),h.jsxs("div",{className:"my-pred-others-table",children:[h.jsxs("div",{className:"my-pred-others-row my-pred-
others-row--header",children:[h.jsx("span",{className:"my-pred-others-pos",children:"??"}),h.jsx("span",{className:"my-
pred-others-team",children:"Most picked"}),h.jsx("span",{className:"my-pred-others-count-col",children:"Picks"})]}),H.t
opFirst.map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos
",children:"1st"}),h.jsx("span",{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-c
ount-col",children:G})]},D)),H.topSecond.slice(0,1).map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:
[h.jsx("span",{className:"my-pred-others-pos",children:"2nd"}),h.jsx("span",{className:"my-pred-others-team",children:D
}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D)),H.topThird.slice(0,1).map(([D,G])=>h.jsxs("div
",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos",children:"3rd"}),h.jsx("span",
{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D))]})]
})]}):h.jsx("div",{className:"my-pred-podium-card 
my-pred-podium-card--empty",children:h.jsxs("div",{className:"my-pred-podium-empty",children:["??"," Set your podium 
picks from the Dashboard"]})})})]}),V.length===0?h.jsx("div",{className:"my-predictions-empty",children:"You haven't 
made any predictions yet."}):h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"my-predictions-heading",children:"My P
redictions"}),h.jsx("div",{className:"wc-filter-row",style:{marginBottom:12},children:h.jsx("div",{className:"wc-filter
-pills",children:[{value:"round1",label:"Round 1"},{value:"round2",label:"Round 2"},{value:"round3",label:"Round 
3"},{value:"all",label:"All Fixtures"}].map(D=>h.jsx("button",{type:"button",className:`wc-filter-btn 
${F===D.value?"is-active":""}`,onClick:()=>M(D.value),children:D.label},D.value))})}),Te.length>0&&(()=>{const 
D=[...new Set(Te.map(W=>W.matchDate.split("T")[0]))].sort(),G=F==="all"?D:D.filter(W=>Te.some(ve=>ve.matchDate.startsWi
th(W)&&ve.matchday===parseInt(F.replace("round",""))));return G.length===0?null:G.map(W=>{const 
ve=Te.filter(be=>be.matchDate.startsWith(W)),we=Ee?.day===W;return h.jsxs("div",{className:`my-pred-date-section${we?" 
my-pred-date-section--wildcard":""}`,children:[h.jsxs("div",{className:"my-pred-date-header",children:[h.jsx("span",{cl
assName:"my-pred-date-label",children:new Date(W+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short
",day:"numeric"})}),we&&h.jsxs("span",{className:"my-pred-date-badge",children:["?"," Wild 
Card"]})]}),h.jsx("div",{className:"my-pred-date-matches",children:ve.map(be=>{const 
Re=be.predictions[n.uid],$e=be.actual;return h.jsxs("div",{className:`wc-match-row${we?" wc-match-row--wc-highlight":""
}`,role:"button",tabIndex:0,onClick:()=>q(be.matchKey),onKeyDown:mt=>mt.key==="Enter"&&q(be.matchKey),children:[h.jsx("
span",{className:"wc-match-status",children:dN(be)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team
:be.homeTeam}),h.jsx("span",{className:"wc-team-name",children:Ql(be.homeTeam)}),$e?.homeScore!=null?h.jsxs("span",{cla
ssName:"wc-inline-score wc-inline-score--actual",children:[$e.homeScore," ","-"," 
",$e.awayScore]}):Re?h.jsxs("span",{className:"wc-inline-score",children:[Re.homeScore," ","-"," ",Re.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:be.awayTeam}),h.jsx("span",{className:"wc-team-name",childre
n:Ql(be.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:$e?.homeScore!=null&&be.points?.[n.uid]!=null
&&h.jsxs("span",{className:"my-pred-pts",children:["+",be.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",ch
ildren:Os(be.matchDate)})]},be.matchKey)})})]},W)})})(),F==="all"&&Ie.length>0&&h.jsxs("div",{className:"wc-knockout-se
ction",children:[h.jsxs("h3",{className:"wc-section-title",children:["??"," Knockout 
Stage"]}),["roundOf32","roundOf16","quarterFinal","semiFinal","thirdPlace","final"].map(D=>{const 
G=Ie.filter(W=>W.stage===D);return G.length===0?null:h.jsxs("div",{className:"wc-stage-group",children:[h.jsx("h4",{cla
ssName:"wc-stage-title",children:b_[D]}),h.jsx("div",{className:"wc-stage-matches",children:G.map(W=>{const 
ve=W.predictions[n.uid],we=W.actual;return h.jsxs("div",{className:"wc-match-row",role:"button",tabIndex:0,onClick:()=>
q(W.matchKey),onKeyDown:be=>be.key==="Enter"&&q(W.matchKey),children:[h.jsx("span",{className:"wc-match-status",childre
n:dN(W)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:W.homeTeam}),h.jsx("span",{className:"wc-t
eam-name",children:Ql(W.homeTeam)}),we?.homeScore!=null?h.jsxs("span",{className:"wc-inline-score 
wc-inline-score--actual",children:[we.homeScore," ","-"," 
",we.awayScore]}):ve?h.jsxs("span",{className:"wc-inline-score",children:[ve.homeScore," ","-"," ",ve.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:W.awayTeam}),h.jsx("span",{className:"wc-team-name",children
:Ql(W.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:we?.homeScore!=null&&W.points?.[n.uid]!=null&&h
.jsxs("span",{className:"my-pred-pts",children:["+",W.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",childr
en:Os(W.matchDate)})]},W.matchKey)})})]},D)})]})]}),Qe&&jo.createPortal(h.jsx("div",{className:"modal-backdrop",role:"p
resentation",onClick:()=>q(null),children:h.jsx("div",{className:"panel modal-panel 
wc-modal",role:"dialog","aria-modal":"true","aria-label":"Match details",onClick:D=>D.stopPropagation(),children:h.jsx(
BR,{match:Qe,user:n,userDoc:t,firestore:e,isAdmin:!1,matches:U,sortedUserUids:[],getDisplayName:()=>"",getUserColor:()=
>"",onSubmitPrediction:zt,onSubmitActual:()=>{},onUpdateTeams:()=>{},onClose:()=>q(null)})})}),document.body),pe&&Ee&&j
o.createPortal(h.jsx("div",{className:"modal-backdrop",role:"presentation",onClick:()=>k(!1),children:h.jsxs("div",{cla
ssName:"panel modal-panel wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card fixtures",onClick:D=
>D.stopPropagation(),children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-m
odal-title",children:["?"," Wild Card - ",new Date(Ee.day+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",mon
th:"short",day:"numeric"})]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>k(!1),children:"
?"})]}),h.jsx("div",{className:"wc-fixtures-body",children:Ir.filter(D=>D.matchDate.startsWith(Ee.day)).map(D=>h.jsxs("
div",{className:"wc-match-row wc-match-row--wc-highlight",role:"button",tabIndex:0,onClick:()=>{k(!1),q(D.matchKey)},on
KeyDown:G=>{G.key==="Enter"&&(k(!1),q(D.matchKey))},children:[h.jsx("span",{className:"wc-match-status",children:"?"}),
h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:D.homeTeam}),h.jsx("span",{className:"wc-team-name",
children:Ql(D.homeTeam)}),h.jsx("span",{className:"wc-vs",children:"vs"}),h.jsx("span",{className:"wc-team-name",childr
en:Ql(D.awayTeam)}),h.jsx(Ka,{team:D.awayTeam})]}),h.jsx("span",{className:"wc-match-date",children:Os(D.matchDate)})]}
,D.matchKey))}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium-skip-bt
n",onClick:()=>k(!1),children:"Close"})})]})}),document.body),le&&jo.createPortal(h.jsx("div",{className:"modal-backdro
p",role:"presentation",onClick:()=>ue(!1),children:h.jsxs("div",{className:"panel modal-panel 
wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card info",onClick:D=>D.stopPropagation(),children:
[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," 
Wild Card - �",is," Points"]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>ue(!1),children
:"?"})]}),h.jsxs("div",{className:"wc-info-body",children:[h.jsxs("p",{className:"wc-info-p",children:["Choose 
",h.jsx("strong",{children:"one day"})," in the current round. Every match you predict on that day earns 
",h.jsxs("strong",{children:["�",is]})," the normal 
points!"]}),h.jsx("p",{className:"wc-info-p",children:h.jsx("strong",{children:"Normal scoring (before 
multiplier):"})}),h.jsxs("ul",{className:"wc-info-list",children:[h.jsxs("li",{children:["Exact score  
",h.jsx("strong",{children:"5 pts"})," + ",h.jsx("strong",{children:"1 pt"})," per goal scored in the 
match"]}),h.jsxs("li",{children:["0-0 draw  ",h.jsx("strong",{children:"6 pts"})," (5 + 1 for 
nil-nil)"]}),h.jsxs("li",{children:["Correct outcome (not exact)  ",h.jsx("strong",{children:"2 
pts"})]}),h.jsxs("li",{children:["Wrong  ",h.jsx("strong",{children:"0 
pts"})]})]}),h.jsxs("p",{className:"wc-info-p",children:["On your Wild Card day, ",h.jsx("strong",{children:"all"})," 
of these are multiplied by ",h.jsxs("strong",{children:["�",is]}),". Pick the day with the fixtures you're most 
confident about!"]})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium
-skip-btn",onClick:()=>ue(!1),children:"Got it"})})]})}),document.body)]})}function 
P4({user:n,firestore:e,userDoc:t,onOpenPodium:s}){const i=n?.email||"",l=n?.uid||"",c=n?.displayName||n?.email||"",[d,p
]=S.useState(!1),[y,_]=S.useState(""),[w,b]=S.useState(!1),[R,P]=S.useState(""),[O,j]=S.useState(!1),L=S.useRef(null);S
.useEffect(()=>{d&&L.current&&L.current.focus()},[d]);const 
B=()=>{_(n?.displayName||""),P(""),j(!1),p(!0)},q=async()=>{P(""),j(!1);const 
A=y.trim(),U=PR(A);if(!U.valid){P(U.error);return}b(!0);try{const 
V=wr(xt(e,"users"),ic("displayName","==",A));if((await Di(V)).docs.some(Te=>Te.id!==n.uid)){P("That name is already 
taken"),b(!1);return}await zi(nt(e,"users",n.uid),{displayName:A},{merge:!0});try{pr?.currentUser&&await 
J_(pr.currentUser,{displayName:A})}catch(Te){console.warn("Auth profile update failed 
(non-critical):",Te)}j(!0),p(!1),setTimeout(()=>j(!1),2e3)}catch(V){console.error("Display name save 
error:",V),P("Failed to save. Try again.")}finally{b(!1)}},le=()=>{p(!1),P("")},ue=t?.podiumPrediction,pe=ue?ue.final||
ue:null,I=!!ue?.final&&ue.initial&&ue.final&&ue.initial.first===ue.final.first&&ue.initial.second===ue.final.second&&ue
.initial.third===ue.final.third;return h.jsxs("div",{className:"wc-panel",style:{maxWidth:500,margin:"0 
auto"},children:[h.jsxs("h2",{className:"wc-panel-title",children:["??"," My Profile"]}),h.jsxs("div",{className:"profi
le-info",children:[h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",ch
ildren:"Display Name"}),h.jsx("div",{className:"profile-info-value",children:d?h.jsxs("div",{className:"sidebar-name-ed
it",style:{justifyContent:"flex-start"},children:[h.jsx("input",{ref:L,className:"sidebar-name-input",value:y,onChange:
A=>_(A.target.value),onKeyDown:A=>{A.key==="Enter"&&q(),A.key==="Escape"&&le()},maxLength:20,placeholder:"Display 
name"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--save",onClick:q,disabled:w||!y.trim
(),children:w?"...":"V"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--cancel",onClick:l
e,children:"?"}),R&&h.jsx("span",{className:"sidebar-name-error",children:R})]}):h.jsxs("span",{className:"profile-name
-display",onClick:B,children:[c,O?" V":" ??"]})})]}),h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",
{className:"profile-info-label",children:"Email"}),h.jsx("span",{className:"profile-info-value",children:i})]}),h.jsxs(
"div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",children:"User ID"}),h.jsx("
span",{className:"profile-info-value",style:{fontSize:"0.7rem",opacity:.6},children:l})]})]}),h.jsx("hr",{className:"pr
ofile-divider"}),h.jsx("h3",{className:"wc-panel-title",style:{fontSize:"1rem"},children:"Podium Picks"}),pe?h.jsxs("di
v",{className:"dash-podium-mini",style:{marginTop:8},children:[[{key:"first",icon:"??",team:pe.first,pts:cn.first},{key
:"second",icon:"??",team:pe.second,pts:cn.second},{key:"third",icon:"??",team:pe.third,pts:cn.third}].map(A=>h.jsxs("di
v",{className:"dash-podium-mini-row",children:[h.jsx("span",{className:"dash-podium-mini-medal",children:A.icon}),h.jsx
("span",{className:"dash-podium-mini-team",children:A.team}),h.jsx("span",{className:"dash-podium-mini-pts",children:I?
A.pts*kc:A.pts})]},A.key)),h.jsx("button",{type:"button",className:"wc-btn 
wc-btn--small",style:{marginTop:8},onClick:s,children:"Update 
Picks"})]}):h.jsxs("div",{style:{textAlign:"center",padding:"20px 
0"},children:[h.jsx("p",{style:{color:"#8aa0c0",marginBottom:12},children:"No podium picks set 
yet."}),h.jsx("button",{type:"button",className:"wc-btn",onClick:s,children:"Set Podium Picks"})]})]})}const 
M4="modulepreload",V4=function(n){return"/"+n},fN={},O4=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let 
y=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"reject
ed",reason:b}))))};var c=y;document.getElementsByTagName("link");const 
d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=y(t.map(_=>{if(_=V4(_),_ 
in fN)return;fN[_]=!0;const 
w=_.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${b}`))return;const R=docu
ment.createElement("link");if(R.rel=w?"stylesheet":M4,w||(R.as="script"),R.crossOrigin="",R.href=_,p&&R.setAttribute("n
once",p),document.head.appendChild(R),w)return new 
Promise((P,O)=>{R.addEventListener("load",P),R.addEventListener("error",()=>O(new Error(`Unable to preload CSS for 
${_}`)))})}))}function l(d){const p=new 
Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return 
i.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return e().catch(l)})};function 
R_({team:n,size:e=18}){const t=Kn(n);return t?h.jsx("img",{className:"podium-flag",src:t,alt:n,width:e,height:e*.75,loa
ding:"lazy"}):h.jsx("span",{className:"podium-flag-placeholder"})}function 
L4({value:n,onChange:e,teams:t,placeholder:s}){const[i,l]=S.useState(!1),c=S.useRef(null);return 
S.useEffect(()=>{const d=p=>{c.current&&!c.current.contains(p.target)&&l(!1)};return document.addEventListener("mousedo
wn",d),()=>document.removeEventListener("mousedown",d)},[]),h.jsxs("div",{className:"podium-dropdown",ref:c,children:[h
.jsxs("button",{type:"button",className:"podium-dropdown-trigger",onClick:()=>l(!i),children:[n?h.jsx(R_,{team:n,size:1
8}):h.jsx("span",{className:"podium-dropdown-placeholder-flag"}),h.jsx("span",{className:"podium-dropdown-label",childr
en:n||s}),h.jsx("span",{className:"podium-dropdown-arrow",children:i?"":""})]}),i&&h.jsx("div",{className:"podium-dro
pdown-menu",children:t.map(d=>h.jsxs("div",{className:`podium-dropdown-option${d===n?" is-selected":""}`,onClick:()=>{e
(d),l(!1)},children:[h.jsx(R_,{team:d,size:16}),h.jsx("span",{children:d})]},d))})]})}const 
mN=[{key:"first",label:"Winner",icon:"??",desc:"1st 
Place",pts:cn.first},{key:"second",label:"Runner-up",icon:"??",desc:"2nd 
Place",pts:cn.second},{key:"third",label:"Third Place",icon:"??",desc:"3rd Place",pts:cn.third}];function 
U4({user:n,firestore:e,existingPrediction:t,groupStageOver:s,onSave:i,onDismiss:l,userDoc:c}){const d=t?.initial?.first
||t?.first||"",p=t?.initial?.second||t?.second||"",y=t?.initial?.third||t?.third||"",w=t?.final||t?.finalizedAt?t.final
:{first:d,second:p,third:y},[b,R]=S.useState(w?.first||""),[P,O]=S.useState(w?.second||""),[j,L]=S.useState(w?.third||"
"),[B,q]=S.useState(!1),[le,ue]=S.useState(""),[pe,k]=S.useState(!1),I=S.useRef(new Date(f0).getTime()),A=()=>{const 
D=I.current-Date.now();return D<=0?null:{days:Math.floor(D/864e5),hours:Math.floor(D/36e5%24),minutes:Math.floor(D/6e4%
60),seconds:Math.floor(D/1e3%60)}},[U,V]=S.useState(A);S.useEffect(()=>{const D=setInterval(()=>V(A()),1e3);return()=>c
learInterval(D)},[]);const[F,M]=S.useState(!1),[Te,Ie]=S.useState(""),[X,ge]=S.useState(!1),[Ee,je]=S.useState(""),[$,C
]=S.useState(!1),H=S.useRef(null);S.useEffect(()=>{F&&H.current&&H.current.focus()},[F]);const oe=s&&t,ye=d&&b===d&&P==
=p&&j===y,Pe=D=>Om.filter(G=>!(G===b&&D!=="first"||G===P&&D!=="second"||G===j&&D!=="third")),De=async()=>{if(ue(""),!b|
|!P||!j){ue("Please select a team for all three podium positions.");return}if(b===P||b===j||P===j){ue("All three 
selections must be different teams.");return}q(!0);try{const D=nt(e,"users",n.uid),G=c||t||{},W={...G,first:b,second:P,
third:j,updatedAt:Vn()};oe?(W.initial=G.initial||{first:b,second:P,third:j},W.final={first:b,second:P,third:j},W.finali
zedAt=Vn()):(W.initial=G.initial||{first:b,second:P,third:j},G.createdAt||(W.createdAt=Vn())),await 
zi(D,{podiumPrediction:W},{merge:!0}),k(!0),setTimeout(()=>{i({first:b,second:P,third:j})},800)}catch(D){ue("Failed to 
save. Please try again."),console.warn("Podium save error",D)}finally{q(!1)}},Ve=cn.first+cn.second+cn.third,Je=Ve*kc,Q
e=b&&P&&j&&!B&&!pe,zt=()=>{Ie(n?.displayName||""),je(""),C(!1),M(!0)},tn=async()=>{je(""),C(!1);const 
D=Te.trim(),G=PR(D);if(!G.valid){je(G.error);return}ge(!0);try{const{collection:W,getDocs:ve,query:we,where:be}=await 
O4(async()=>{const{collection:dn,getDocs:Ft,query:Bt,where:fn}=await Promise.resolve().then(()=>YL);return{collection:d
n,getDocs:Ft,query:Bt,where:fn}},[]),Re=we(W(e,"users"),be("displayName","==",D));if((await 
ve(Re)).docs.some(dn=>dn.id!==n.uid)){je("That name is already taken"),ge(!1);return}await 
zi(nt(e,"users",n.uid),{displayName:D},{merge:!0}),pr?.currentUser&&await 
J_(pr.currentUser,{displayName:D}),C(!0),M(!1),setTimeout(()=>C(!1),2e3)}catch{je("Failed to save. Try 
again.")}finally{ge(!1)}},Q=()=>{M(!1),je("")};return 
jo.createPortal(h.jsx("div",{className:"podium-backdrop",role:"presentation",onClick:pe?l:void 
0,children:h.jsx("div",{className:"panel podium-modal",role:"dialog","aria-modal":"true","aria-label":"Podium predictio
n",onClick:D=>D.stopPropagation(),children:pe?h.jsxs("div",{className:"podium-saved",children:[h.jsx("span",{className:
"podium-saved-icon",children:oe?"?":"??"}),h.jsx("h2",{className:"podium-saved-title",children:oe?"Final Picks 
Saved!":"Picks Locked"}),h.jsx("p",{className:"podium-saved-text",children:oe?`Your final podium predictions are 
locked in.${ye?" Keeping the same three - triple points eligible!":""}`:"Your first, second, and third place picks are 
now locked and cannot be changed until the group stage 
ends."}),h.jsx("div",{className:"podium-saved-picks",children:mN.map(D=>{const 
G=D.key==="first"?b:D.key==="second"?P:j;return h.jsxs("div",{className:"podium-saved-row",children:[h.jsx("span",{chil
dren:D.icon}),h.jsx(R_,{team:G,size:22}),h.jsx("span",{children:G}),h.jsxs("span",{className:"podium-saved-pts",childre
n:["+",D.pts," pts"]})]},D.key)})}),h.jsx("div",{className:"podium-saved-name",children:h.jsxs("div",{className:"podium
-name-editor",children:[F?h.jsxs("div",{className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podi
um-name-input",value:Te,onChange:D=>Ie(D.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLe
ngth:20,placeholder:"Your display name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--sav
e",onClick:tn,disabled:X||!Te.trim(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn po
dium-name-btn--cancel",onClick:Q,children:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("
span",{className:"podium-name-label",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",c
lassName:"podium-name-edit-btn",onClick:zt,title:"Edit display 
name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Saved"]})]}),Ee&&h.jsx("div",{cla
ssName:"podium-name-error",children:Ee})]})}),h.jsx("button",{type:"button",className:"podium-continue-btn",onClick:l,c
hildren:"Continue"})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2
",{className:"podium-modal-title",children:["??"," Your Podium Prediction"]}),h.jsx("button",{type:"button",className:"
podium-modal-close",onClick:l,children:"?"})]}),h.jsx("div",{className:"podium-info",children:oe?h.jsxs("p",{className:
"podium-info-text",children:["The group stage is over! Lock in your ",h.jsx("strong",{children:"final"})," podium 
picks.",ye?" You kept the same three teams - if they match the actual results you get <strong>triple 
points</strong>!":" If you keep the same picks you had before and they're correct, you get <strong>triple 
points</strong>."]}):h.jsxs("p",{className:"podium-info-text",children:["Pick who will finish 
",h.jsx("strong",{children:"1st, 2nd, and 3rd"}),". Points: winner ",h.jsxs("strong",{children:["+",cn.first]}),", 
runner-up ",h.jsxs("strong",{children:["+",cn.second]}),", third ",h.jsxs("strong",{children:["+",cn.third]}),". Keep 
the same picks after the group stage and get ",h.jsxs("strong",{children:["�",kc]})," (up to ",Je," pts!)."]})}),h.jsx(
"div",{className:"podium-name-section",children:h.jsxs("div",{className:"podium-name-editor",children:[F?h.jsxs("div",{
className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podium-name-input",value:Te,onChange:D=>Ie(D
.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLength:20,placeholder:"Your display 
name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--save",onClick:tn,disabled:X||!Te.trim
(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--cancel",onClick:Q,c
hildren:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("span",{className:"podium-name-labe
l",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",className:"podium-name-edit-btn",on
Click:zt,title:"Edit display name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Save
d"]})]}),Ee&&h.jsx("div",{className:"podium-name-error",children:Ee})]})}),h.jsx("div",{className:"podium-picks",childr
en:mN.map(D=>{const G=D.key==="first"?b:D.key==="second"?P:j,W=D.key==="first"?R:D.key==="second"?O:L;return h.jsxs("di
v",{className:"podium-pick-row",children:[h.jsxs("div",{className:"podium-pick-label",children:[h.jsx("span",{className
:"podium-pick-icon",children:D.icon}),h.jsxs("div",{children:[h.jsx("span",{className:"podium-pick-title",children:D.la
bel}),h.jsxs("span",{className:"podium-pick-desc",children:[D.desc," - ",D.pts," 
pts"]})]})]}),h.jsx(L4,{value:G,onChange:W,teams:Pe(D.key).sort((ve,we)=>ve.localeCompare(we)),placeholder:"-- Select 
team --"})]},D.key)})}),h.jsxs("div",{className:"podium-points-summary",children:[h.jsxs("span",{children:["Max if 
correct: ",h.jsxs("strong",{children:["+",Ve," 
pts"]})]}),h.jsxs("span",{className:"podium-points-triple",children:["Triple if kept: 
",h.jsxs("strong",{children:["+",Je," 
pts"]})]})]}),h.jsx("div",{className:"podium-deadline",children:U?h.jsxs("span",{children:["?"," Locks Jun 10, 11:59 
PM BST \\u00B7 Closes in ",U.days>0?U.days+"d ":"",U.hours,"h ",U.minutes,"m 
",U.seconds,"s"]}):h.jsxs("span",{children:["??"," Podium locked"]})}),le&&h.jsx("div",{className:"podium-error",childr
en:le}),h.jsxs("div",{className:"podium-footer",children:[h.jsx("button",{type:"button",className:"podium-skip-btn",onC
lick:l,children:t?"Cancel":"Skip for now"}),h.jsx("button",{type:"button",className:"podium-save-btn",onClick:De,disabl
ed:!Qe,children:B?"Saving...":oe?"Lock in Final Picks":"Save Prediction"})]})]})})}),document.body)}function 
z4({user:n,firestore:e,onClose:t,onActivate:s}){const 
i=os(),l=i?bi.findIndex(B=>B.round===i.round):-1,c=l>=0?OR(l).filter(B=>new Date(B+"T23:59:59Z").getTime()>Date.now()):
[],[d,p]=S.useState(!1),[y,_]=S.useState(!1),[w,b]=S.useState(null),[R,P]=S.useState(""),O=Ir.filter(B=>B.stage==="grou
p");if(!i||c.length===0)return null;const j=async()=>{if(w){P(""),p(!0);try{await 
bn(nt(e,"users",n.uid),{["wildCards.round"+i.round]:{day:w,activatedAt:new 
Date().toISOString()}}),s&&s(i.round,w)}catch(B){console.error("WildCard activation error:",B),P("Failed to activate 
Wild Card. Please try again."),p(!1)}}},L=w?O.filter(B=>B.matchDate.startsWith(w)):[];return 
jo.createPortal(h.jsx("div",{className:"wc-modal-backdrop",onClick:t,children:h.jsx("div",{className:"panel wc-modal wc
-modal-wildcard",onClick:B=>B.stopPropagation(),children:h.jsx("div",{className:"wc-wildcard-card",children:h.jsxs("div
",{className:`wc-wildcard-card-inner${y?" wc-wildcard-card-flipped":""}`,children:[h.jsxs("div",{className:"wc-wildcard
-card-front",style:{backgroundImage:"url(/assets/wildcard.jpg)"},children:[h.jsx("div",{className:"wc-wildcard-card-fro
nt-overlay"}),h.jsxs("div",{className:"wc-wildcard-card-front-content",children:[h.jsx("div",{className:"wc-wildcard-st
amp",children:"?"}),h.jsx("h2",{className:"wc-wildcard-title",children:"WILD 
CARD"}),h.jsxs("div",{className:"wc-wildcard-subtitle",children:["Round 
",i.round]}),h.jsxs("div",{className:"wc-wildcard-multiplier",children:["x",is," 
POINTS"]}),h.jsxs("button",{type:"button",className:"wc-wildcard-flip-btn",onClick:()=>_(!0),children:["??"," 
Reveal"]}),h.jsx("button",{type:"button",className:"wc-wildcard-skip-btn",onClick:t,children:"Skip for now"})]})]}),h.j
sx("div",{className:"wc-wildcard-card-back",children:w?h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-mod
al-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Confirm Wild Card"]}),h.jsx("button",{
type:"button",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-confirm-b
ody",children:[h.jsx("div",{className:"wc-wildcard-confirm-date",children:new Date(w+"T00:00:00Z").toLocaleDateString("
en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}),h.jsx("div",{className:"wc-wildcard-confirm-games"
,children:L.map(B=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(B.homeTeam)&&h.jsx("img",{src:Kn(B.homeT
eam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.homeTeam}),h.j
sx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.awa
yTeam}),Kn(B.awayTeam)&&h.jsx("img",{src:Kn(B.awayTeam),alt:"",className:"wc-wildcard-day-flag"})]},B.matchKey))}),h.js
xs("div",{className:"wc-wildcard-confirm-note",children:["All points from your predictions on this day will be 
multiplied by ",h.jsxs("strong",{children:["�",is]}),"!"]}),R&&h.jsx("div",{className:"wc-save-error",children:R}),h.js
xs("div",{className:"wc-wildcard-confirm-actions",children:[h.jsx("button",{type:"button",className:"wc-wildcard-confir
m-btn",onClick:j,disabled:d,children:d?"Activating...":"? Confirm"}),h.jsx("button",{type:"button",className:"podium-sk
ip-btn",onClick:t,children:"Cancel"})]})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-heade
r",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Pick Your Day"]}),h.jsx("button",{type:"button
",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-pick-body",children:[
h.jsxs("p",{style:{color:"#b0c8e0",fontSize:"0.8rem",margin:"0 0 12px",lineHeight:1.5},children:["Choose one day in 
",h.jsxs("strong",{children:["Round ",i.round," (",i.label,")"]})," to get ",h.jsxs("strong",{children:["�",is]})," 
points on every match prediction you make that 
day."]}),h.jsx("div",{className:"wc-wildcard-days-list",children:c.map(B=>{const 
q=O.filter(le=>le.matchDate.startsWith(B));return 
h.jsxs("div",{className:"wc-wildcard-day-block",children:[h.jsx("div",{className:"wc-wildcard-day-header",children:new 
Date(B+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),q.length>0?h.jsx("div"
,{className:"wc-wildcard-day-games",children:q.map(le=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(le.h
omeTeam)&&h.jsx("img",{src:Kn(le.homeTeam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildca
rd-day-team",children:le.homeTeam}),h.jsx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{classNam
e:"wc-wildcard-day-team",children:le.awayTeam}),Kn(le.awayTeam)&&h.jsx("img",{src:Kn(le.awayTeam),alt:"",className:"wc-
wildcard-day-flag"})]},le.matchKey))}):h.jsx("div",{className:"wc-wildcard-day-no-games",children:"No group 
matches"}),h.jsxs("button",{type:"button",className:"wc-wildcard-select-btn",onClick:()=>b(B),children:["?"," Select 
this date"]})]},B)})})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podi
um-skip-btn",onClick:t,children:"Skip"})})]})})]})})})}),document.body)}function F4(){const[n,e]=S.useState(null),[t,s]
=S.useState(!0),[i,l]=S.useState(null),[c,d]=S.useState(!1),[p,y]=S.useState(!1),[_,w]=S.useState(!1),[b,R]=S.useState(
null),[P,O]=S.useState(""),[j,L]=S.useState(null),B=S.useRef(!1),q=S.useRef(0),le=S.useRef(!1);S.useEffect(()=>{const 
F=new URLSearchParams(window.location.search).get("join");F&&R(F)},[]),S.useEffect(()=>{if(!pr){s(!1);return}return 
Kj(pr,F=>{e(F),s(!1)})},[]),S.useEffect(()=>{if(!b||!n||!Wt)return;(async()=>{const 
F=wr(xt(Wt,"leagues"),ic("joinCode","==",b)),M=await Di(F);if(M.empty)O("Invalid or expired join code");else{const 
Te=M.docs[0].id,Ie=M.docs[0].data(),X=Ie.name;if(Ie.joinDeadline&&new 
Date(Ie.joinDeadline).getTime()<Date.now()){O("This league's entry period has 
closed"),R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3);return}await 
bn(nt(Wt,"users",n.uid),{leagueIds:sc(Te)}),O(`Joined league: ${X}`),Ie.type==="paid"&&((await c0(nt(Wt,"users",n.uid))
).data()?.stakesAcknowledged?.[Te]||L({id:Te,name:Ie.name,stake:Ie.stake||0,hostFeePercent:Ie.hostFeePercent||0,prizeSp
lits:Ie.prizeSplits||[]}))}R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3
)})()},[b,n,Wt]),S.useEffect(()=>{if(!Wt||!n){l(null),d(!1),y(!1),w(!1);return}return 
Lt(nt(Wt,"users",n.uid),F=>{const M=F.data()||{};l(M),d(!0);const Te=M.podiumPrediction,Ie=Date.now()>=new 
Date(f0).getTime(),X=Date.now()>=new Date(S_).getTime();!Te?.initial&&!Ie&&!Te?.dismissedAt?Date.now()-q.current>3e3&&y
(!0):X&&!Te?.final&&Date.now()-q.current>3e3&&y(!0);const ge=os(),Ee=ge?"round"+ge.round:null,je=Ee&&M.wildCards?.[Ee],
$=le.current||sessionStorage.getItem("wc_dismissed")===Ee;ge&&!je&&!$&&w(!0)})},[Wt,n]);const 
ue=V=>e(V),pe=async()=>{pr&&(await Hj(pr),e(null))},k=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1)},[]),I
=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1),Wt&&n&&i?.podiumPrediction?.dismissedAt==null&&bn(nt(Wt,"us
ers",n.uid),{"podiumPrediction.dismissedAt":Vn()}).catch(()=>{})},[Wt,n,i]);if(t)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading..."})})});if(!jR)return 
h.jsx("div",{className:"auth-screen",children:h.jsxs("div",{className:"panel 
auth-card",children:[h.jsx("h1",{children:"FWC26 
Predictor"}),h.jsx("p",{style:{marginTop:12,color:"#ff6060",textAlign:"center"},children:"Firebase is not 
configured."})]})});if(!n)return h.jsx(ZL,{firebaseAuth:pr,firestore:Wt,onAuth:ue});if(!c)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading profile..."})})});const 
A=Date.now()>=new Date(S_).getTime(),U=i?.podiumPrediction||null;return h.jsxs("div",{className:"app app--with-sidebar"
,children:[h.jsx(t4,{onLogout:pe,user:n}),P&&h.jsx("div",{className:"join-notification",children:P}),h.jsx("main",{clas
sName:"app-main",children:h.jsxs(RD,{children:[h.jsx(Aa,{path:"/",element:h.jsx(c4,{user:n,firestore:Wt,onOpenPodium:()
=>y(!0)})}),h.jsx(Aa,{path:"/matches",element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})}),h.jsx(Aa,{path:"/my-predictio
ns",element:h.jsx(k4,{user:n,firestore:Wt,userDoc:i,onOpenWildCard:()=>{sessionStorage.removeItem("wc_dismissed"),w(!0)
}})}),h.jsx(Aa,{path:"/teams",element:h.jsx(_4,{})}),h.jsx(Aa,{path:"/teams/:teamName",element:h.jsx(v4,{firestore:Wt})
}),h.jsx(Aa,{path:"/leaderboard",element:h.jsx(w4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/groups",element:h.jsx(b4,{f
irestore:Wt})}),h.jsx(Aa,{path:"/leagues",element:h.jsx(S4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/leagues/:leagueId"
,element:h.jsx(x4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/rules",element:h.jsx(C4,{})}),h.jsx(Aa,{path:"/profile",ele
ment:h.jsx(P4,{user:n,firestore:Wt,userDoc:i,onOpenPodium:()=>y(!0)})}),h.jsx(Aa,{path:"*",element:h.jsx(xD,{to:"/",rep
lace:!0})})]})}),p&&h.jsx(U4,{user:n,firestore:Wt,userDoc:i,existingPrediction:U,groupStageOver:A,onSave:k,onDismiss:I}
),_&&h.jsx(z4,{user:n,firestore:Wt,onClose:()=>{le.current=!0,sessionStorage.setItem("wc_dismissed",os()?"round"+os().r
ound:"done"),w(!1)},onActivate:(V,F)=>{le.current=!0,sessionStorage.setItem("wc_dismissed","round"+V),w(!1),l(M=>({...M
||{},wildCards:{...M?.wildCards||{},["round"+V]:{day:F,activatedAt:new Date().toISOString()}}}))}}),j&&h.jsx(p0,{league
:j,user:n,firestore:Wt,onConfirm:()=>L(null),onClose:()=>L(null)})]})}C1.createRoot(document.getElementById("root")).re
nder(h.jsx(S1.StrictMode,{children:h.jsx(ZD,{children:h.jsx(F4,{})})}));



```

---

## Assistant (Build · DeepSeek V4 Flash Free · 9.1s)

_Thinking:_

OK, I've read the full built output but it's mostly just the content of the entire JS file. Let me search specifically for the WorldCupPanel component within the built JS.

Let me look for a specific pattern - the `wc-grid-2col` rendering in the built JS:

From what I can see in the truncated output (first hit), there's no `wc-grid-2col` visible in the first match. Let me check the second match's output file more carefully:

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-grid-2col\" -SimpleMatch 2>&1 | Select-Object -First 1",
  "description": "Check for wc-grid-2col in built JS"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93806aac001LT3errxXbvJLC9

,h.jsx("span",{children:"Missed both score and outcome"})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-he
ro-card--podium",children:[h.jsx("div",{className:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-t
itle",children:"Podium Prediction"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rule
s-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.first]}),h.jsxs("div",{className:"r
ules-hero-detail",children:[h.jsx("strong",{children:"Winner"}),h.jsx("span",{children:"Pick the champion"})]})]}),h.js
xs("div",{className:"rules-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.second]}),
h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Runner 
Up"}),h.jsx("span",{children:"Pick the runner-up"})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("d
iv",{className:"rules-hero-points",children:["+",cn.third]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.js
x("strong",{children:"3rd Place"}),h.jsx("span",{children:"Pick the third-place 
finisher"})]})]})]}),h.jsxs("div",{className:"rules-podium-split",children:[h.jsxs("div",{className:"rules-podium-sub r
ules-podium-sub--change",children:[h.jsx("span",{className:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{childr
en:[h.jsx("strong",{className:"rules-podium-sub-title",children:"Change"}),h.jsxs("p",{className:"rules-podium-sub-text
",children:["Revise your podium picks once after the group stage ends 
(",R4,")."]})]})]}),h.jsxs("div",{className:"rules-podium-sub rules-podium-sub--stick",children:[h.jsx("span",{classNam
e:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{children:[h.jsx("strong",{className:"rules-podium-sub-title",ch
ildren:"Stick"}),h.jsxs("p",{className:"rules-podium-sub-text",children:["Keep unchanged for the ",kc,"\\u00D7 
bonus!"]})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-hero-card--wildcard",children:[h.jsx("div",{class
Name:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-title",children:"Wild Card - Use It or Lose It
"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("di
v",{className:"rules-hero-points",children:["�",is]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("stro
ng",{children:"One Day Per Round"}),h.jsxs("span",{children:["Pick one matchday each round - all your points on that 
day are multiplied by 
",is,"!"]})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsx("div",{className:"rules-hero-points rules-h
ero-points--zero",children:"-"}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Use 
It or Lose It"}),h.jsx("span",{children:"If you don't activate your Wild Card in a round, it doesn't carry over."})]})]
})]})]})]}),h.jsxs("div",{className:"rules-secondary-grid",children:[h.jsxs("div",{className:"rules-secondary-card pane
l",children:[h.jsxs("div",{className:"rules-secondary-header",children:[h.jsx("span",{className:"rules-secondary-icon",
children:"??"}),h.jsx("h4",{className:"rules-secondary-title",children:"Leaderboard"})]}),h.jsxs("div",{className:"rule
s-secondary-body",children:[h.jsxs("p",{children:[h.jsx("strong",{children:"Total Score"})," = match prediction points 
+ podium points"]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Tiebreaker:"})," Podium points decide the 
winner."]})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-seconda
ry-header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-second
ary-title",children:"Teams & Groups"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children
:[h.jsx("strong",{children:"48 teams"})," in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to 
Round of 32."]}),h.jsx("p",{children:"FIFA world rankings shown on each team 
card."})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-secondary-
header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-secondary
-title",children:"Leagues"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children:[h.jsx("s
trong",{children:"Master League:"})," Auto-enrolled - compete against 
everyone."]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Private Leagues:"})," Create with friends via invite 
link or join code."]})]})]})]})]})}function Ql(n){return n==="Bosnia and Herzegovina"?"Bosnia":n==="C�te 
d'Ivoire"?"C�te d'Ivoire":n==="Korea Republic"?"S. Korea":n==="IR Iran"?"Iran":n==="Cabo Verde"?"C. Verde":n==="Congo 
DR"?"Congo":n==="Saudi Arabia"?"Saudi Ar.":n==="Netherlands"?"Netherlands":n==="Switzerland"?"Switzerland":n==="Czechia
"?"Czechia":n==="T�rkiye"?"T�rkiye":n==="New Zealand"?"N. Zealand":n.length>9?n.slice(0,8)+".":n}const 
dN=n=>n.actual?.homeScore!=null?"??":Ha(n.matchDate)?"??":"?";function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.
jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,he
ight:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}class D4 
extends S.Component{constructor(e){super(e),this.state={hasError:!1}}static 
getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("MyPredictions 
crashed:",e,t)}render(){return this.state.hasError?h.jsxs("div",{className:"my-predictions",style:{padding:32,textAlign
:"center"},children:[h.jsx("p",{style:{color:"#ff6b6b",fontSize:"1.1rem"},children:"Something went wrong loading your 
predictions."}),h.jsx("p",{style:{color:"#8aa0c0",fontSize:"0.85rem"},children:"Please try refreshing the 
page."})]}):this.props.children}}function k4(n){return h.jsx(D4,{children:h.jsx(j4,{...n})})}function j4({user:n,firest
ore:e,userDoc:t,onOpenWildCard:s}){const[i,l]=S.useState([]),[c,d]=S.useState(!1),[p,y]=S.useState(null),[_,w]=S.useSta
te({}),[b,R]=S.useState(null),[P,O]=S.useState(""),[j,L]=S.useState({}),[B,q]=S.useState(null),[le,ue]=S.useState(!1),[
pe,k]=S.useState(!1),[I,A]=S.useState({});S.useEffect(()=>!e||!n?void 
0:Lt(nt(e,"users",n.uid),G=>{y(G.data()||{})},G=>console.warn("UserDoc snapshot 
error",G)),[e,n]),S.useEffect(()=>e?Lt(xt(e,"users"),G=>{const 
W={};G.docs.forEach(ve=>{W[ve.id]=ve.data()}),A(W)},G=>console.warn("UsersMap snapshot error",G)):void 0,[e]),S.useEffe
ct(()=>e?Lt(xt(e,"worldCupPredictions"),G=>{l(G.docs.map(W=>({id:W.id,...W.data()}))),d(!0)},G=>{console.warn("MyPredic
tions snapshot error",G),d(!0)}):void 0,[e]);const U=S.useMemo(()=>{const D={};return 
i.forEach(G=>{D[G.matchKey]=G}),Ir.map(G=>{const W=D[G.matchKey]||{};return{...G,...W,id:W.id||G.matchKey,predictions:W
.predictions||{},actual:W.actual||{homeScore:null,awayScore:null},points:W.points||{}}})},[i]),V=S.useMemo(()=>n?U.filt
er(D=>D.predictions?.[n.uid]?.homeScore!=null).sort((D,G)=>{const W=["group","roundOf32","roundOf16","quarterFinal","se
miFinal","thirdPlace","final"],ve=W.indexOf(D.stage),we=W.indexOf(G.stage);return 
ve!==we?ve-we:(D.matchNumber||0)-(G.matchNumber||0)}):[],[U,n]),[F,M]=S.useState(()=>{const D=os();return D?`round${D.r
ound}`:"all"}),Te=S.useMemo(()=>V.filter(D=>D.stage==="group"),[V]),Ie=S.useMemo(()=>V.filter(D=>D.stage!=="group"),[V]
),X=S.useMemo(()=>p??t,[p,t]),ge=S.useMemo(()=>{const D=os();if(!D||!X)return null;const G="round"+D.round;return 
X.wildCards?.[G]?null:{round:D.round,label:D.label}},[X]),Ee=S.useMemo(()=>{const D=os();if(!D||!X)return null;const 
G="round"+D.round,W=X.wildCards?.[G];return 
W?{round:D.round,label:D.label,day:W.day}:null},[X]),je=!!os(),[$,C]=S.useState("");S.useEffect(()=>{const 
D=()=>{const W=new Date(f0).getTime()-Date.now();if(W<=0){C("");return}const 
ve=Math.floor(W/864e5),we=Math.floor(W%864e5/36e5),be=Math.floor(W%36e5/6e4),Re=Math.floor(W%6e4/1e3);C(`${ve}d ${we}h 
${be}m ${Re}s`)};D();const G=setInterval(D,1e3);return()=>clearInterval(G)},[]);const H=S.useMemo(()=>{const D=Object.e
ntries(I).filter(([ve])=>ve!==n?.uid&&I[ve]?.podiumPrediction),G={first:{},second:{},third:{}};D.forEach(([,ve])=>{cons
t we=ve.podiumPrediction.final||ve.podiumPrediction;we.first&&(G.first[we.first]=(G.first[we.first]||0)+1),we.second&&(
G.second[we.second]=(G.second[we.second]||0)+1),we.third&&(G.third[we.third]=(G.third[we.third]||0)+1)});const W=(ve,we
=3)=>Object.entries(ve).sort((be,Re)=>Re[1]-be[1]).slice(0,we);return{totalOthers:D.length,topFirst:W(G.first),topSecon
d:W(G.second),topThird:W(G.third)}},[I,n]),oe=p?.podiumPrediction,ye=oe?oe.final||oe:null,Pe=!!oe?.final,De=Pe&&oe.init
ial&&oe.final&&oe.initial.first===oe.final.first&&oe.initial.second===oe.final.second&&oe.initial.third===oe.final.thir
d,Ve=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)&&D.actual?.homeScore==null).sort((D,G)=>new 
Date(D.matchDate)-new Date(G.matchDate))[0]||null,[U]),Je=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)
&&D.actual?.homeScore==null&&D.predictions?.[n?.uid]?.homeScore==null).sort((D,G)=>new Date(D.matchDate)-new Date(G.mat
chDate)).slice(0,9),[U,n]),Qe=S.useMemo(()=>U.find(D=>D.matchKey===B)||null,[U,B]),zt=S.useCallback(async(D,G,W)=>{if(!
e||!n)return;const ve=nt(e,"worldCupPredictions",D);await bn(ve,{[`predictions.${n.uid}`]:{homeScore:Number(G),awayScor
e:Number(W)},updatedAt:Vn()}).catch(we=>console.warn("Prediction save 
failed",we))},[e,n]),tn=S.useCallback(async(D,G,W)=>{R(D),O(""),await zt(D,G,W),R(null),w(ve=>{const we={...ve};return 
delete we[D],we})},[zt]);if(S.useEffect(()=>{if(Je.length===0)return;const D=()=>{const 
W=Date.now(),ve={};Je.forEach(we=>{const Re=LR(we.matchDate).getTime()-W;if(Re<=0)ve[we.matchKey]="Deadline 
passed";else{const $e=Math.floor(Re/864e5),mt=Math.floor(Re%864e5/36e5),dn=Math.floor(Re%36e5/6e4),Ft=Math.floor(Re%6e4
/1e3);$e>0?ve[we.matchKey]=`${$e}d ${mt}h ${dn}m ${Ft}s`:mt>0?ve[we.matchKey]=`${mt}h ${dn}m 
${Ft}s`:ve[we.matchKey]=`${dn}m ${Ft}s`}}),L(ve)};D();const 
G=setInterval(D,1e3);return()=>clearInterval(G)},[Je]),!c)return h.jsx("div",{className:"my-predictions",children:h.jsx
("div",{className:"my-predictions-empty",children:"Loading..."})});const Q=Ve?A_(Ve.venue):null;return h.jsxs("div",{cl
assName:"my-predictions",children:[Je.length>0&&h.jsxs("div",{className:"my-pred-hero",children:[h.jsxs("div",{classNam
e:"my-pred-hero-title",children:["?"," Quick 
Predict"]}),h.jsx("div",{className:"my-pred-hero-grid",children:Je.map(D=>{const 
G=_[D.matchKey]||{home:"0",away:"0"},W=b===D.matchKey,ve=A_(D.venue);return h.jsxs("div",{className:"my-pred-hero-game"
,children:[h.jsxs("div",{className:"my-pred-hero-game-row",children:[h.jsxs("div",{className:"my-pred-hero-game-team",c
hildren:[h.jsx(Ka,{team:D.homeTeam,size:24}),h.jsx("span",{className:"my-pred-hero-game-name",children:D.homeTeam})]}),
h.jsxs("div",{className:"my-pred-hero-game-score-wrap",children:[h.jsx("input",{type:"number",min:"0",max:"20",classNam
e:"my-pred-hero-game-input",value:G.home,onChange:we=>w(be=>({...be,[D.matchKey]:{...be[D.matchKey],home:we.target.valu
e,away:be[D.matchKey]?.away??"0"}})),disabled:W}),h.jsx("span",{className:"my-pred-hero-game-colon",children:":"}),h.js
x("input",{type:"number",min:"0",max:"20",className:"my-pred-hero-game-input",value:G.away,onChange:we=>w(be=>({...be,[
D.matchKey]:{...be[D.matchKey],home:be[D.matchKey]?.home??"0",away:we.target.value}})),disabled:W})]}),h.jsxs("div",{cl
assName:"my-pred-hero-game-team my-pred-hero-game-team--right",children:[h.jsx(Ka,{team:D.awayTeam,size:24}),h.jsx("spa
n",{className:"my-pred-hero-game-name",children:D.awayTeam})]})]}),h.jsxs("div",{className:"my-pred-hero-game-footer",c
hildren:[h.jsxs("span",{className:"my-pred-hero-game-venue",children:["???"," ",ve?.stadium,", 
",ve?.city]}),h.jsxs("span",{className:"my-pred-hero-game-kickoff",children:["?"," 
",Os(D.matchDate)]}),h.jsxs("span",{className:"my-pred-hero-game-deadline",children:["?"," ",j[D.matchKey]||"..."]})]})
,h.jsxs("button",{type:"button",className:"my-pred-hero-game-confirm",onClick:()=>tn(D.matchKey,G.home,G.away),disabled
:W,children:[W?"?":"?"," Confirm"]})]},D.matchKey)})})]}),h.jsxs("div",{className:"my-pred-top-row",children:[h.jsx("di
v",{className:"my-pred-col",children:je&&ge?h.jsxs("div",{className:"my-pred-wc-tile",children:[h.jsx("button",{type:"b
utton",className:"my-pred-wc-info-btn",onClick:()=>ue(!0),children:"What's 
this?"}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:s,children:["?"," Activate 
Now"]})]}):je&&Ee?h.jsxs("div",{className:"my-pred-wc-tile my-pred-wc-tile--activated",children:[h.jsxs("div",{classNam
e:"my-pred-wc-tile-content",children:[h.jsxs("div",{className:"my-pred-wc-tile-header",children:["??"," Wild Card 
Active"]}),h.jsxs("div",{className:"my-pred-wc-tile-sub",children:["Round ",Ee.round," 
(",Ee.label,")"]}),h.jsx("div",{className:"my-pred-wc-tile-day",children:new Date(Ee.day+"T00:00:00Z").toLocaleDateStri
ng("en-US",{weekday:"short",month:"short",day:"numeric"})}),h.jsxs("div",{className:"my-pred-wc-tile-badge",children:["
�",is," 
Active"]})]}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:()=>k(!0),children:["?"," 
Redeemed"]})]}):h.jsx("div",{className:"my-pred-wc-tile my-pred-wc-tile--hidden"})}),h.jsx("div",{className:"my-pred-co
l",children:Ve?h.jsxs("button",{type:"button",className:"my-pred-next-card",onClick:()=>q(Ve.matchKey),children:[h.jsxs
("div",{className:"my-pred-next-badge",children:["?"," NEXT MATCH"]}),h.jsxs("div",{className:"my-pred-next-teams",chil
dren:[h.jsx(Ka,{team:Ve.homeTeam,size:40}),h.jsxs("div",{className:"my-pred-next-team",children:[h.jsx("span",{classNam
e:"my-pred-next-name",children:Ve.homeTeam}),h.jsxs("span",{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.home
Team).fifaRank]})]}),h.jsx("span",{className:"my-pred-next-vs",children:"vs"}),h.jsxs("div",{className:"my-pred-next-te
am my-pred-next-team--away",children:[h.jsx("span",{className:"my-pred-next-name",children:Ve.awayTeam}),h.jsxs("span",
{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.awayTeam).fifaRank]})]}),h.jsx(Ka,{team:Ve.awayTeam,size:40})]}
),h.jsxs("div",{className:"my-pred-next-venue",children:["???"," ",Q?.stadium,", 
",Q?.city]}),h.jsxs("div",{className:"my-pred-next-kickoff",children:["?"," 
",Os(Ve.matchDate)]}),h.jsxs("div",{className:"my-pred-next-countdown",children:["?"," ",j[Ve.matchKey]||"-"]}),h.jsxs(
"div",{className:"my-pred-next-prediction",children:[h.jsx("span",{className:"my-pred-next-pred-label",children:"YOUR P
REDICTION"}),Ve.predictions?.[n.uid]?h.jsxs("div",{className:"my-pred-next-pred-score-row",children:[h.jsx(Ka,{team:Ve.
homeTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve.predictions[n.uid].homeScore}),h.jsx("
span",{className:"my-pred-next-pred-colon",children:":"}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve
.predictions[n.uid].awayScore}),h.jsx(Ka,{team:Ve.awayTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-btn",ch
ildren:"Edit"})]}):h.jsxs("span",{className:"my-pred-next-pred-btn my-pred-next-pred-btn--primary",children:["?"," 
Predict this match"]})]})]}):h.jsx("div",{className:"my-pred-next-card 
my-pred-next-card--empty",children:h.jsxs("div",{className:"my-pred-next-empty",children:["?"," All matches 
complete!"]})})}),h.jsx("div",{className:"my-pred-col",children:ye?h.jsxs("div",{className:"my-pred-podium-card my-pred
-podium-card--extended",children:[h.jsxs("div",{className:"my-pred-podium-header",children:[h.jsxs("span",{className:"m
y-pred-podium-title",children:["??"," My Podium 
Picks"]}),$&&h.jsxs("span",{className:"my-pred-podium-lock",children:["??"," Locks ",$]})]}),h.jsx("div",{className:"my
-pred-podium-rows",children:[{key:"first",icon:"??",team:ye.first||oe?.first||oe?.initial?.first,pts:cn.first},{key:"se
cond",icon:"??",team:ye.second||oe?.second||oe?.initial?.second,pts:cn.second},{key:"third",icon:"??",team:ye.third||oe
?.third||oe?.initial?.third,pts:cn.third}].map(D=>h.jsxs("div",{className:"my-pred-podium-row",children:[h.jsx("span",{
className:"my-pred-podium-icon",children:D.icon}),h.jsx("span",{className:"my-pred-podium-team",children:D.team||"-"}),
h.jsxs("span",{className:"my-pred-podium-pts",children:["+",De?D.pts*kc:D.pts," 
pts"]})]},D.key))}),h.jsx("div",{className:"my-pred-podium-note",children:Pe?`Final picks locked${De?" - triple points 
active!":""}`:"Initial picks set - you can update after group stage"}),H.totalOthers>0&&h.jsxs("div",{className:"my-pre
d-others-section",children:[h.jsxs("div",{className:"my-pred-others-count",children:["??"," ",H.totalOthers," other 
player",H.totalOthers===1?"":"s"," submitted 
picks"]}),h.jsxs("div",{className:"my-pred-others-table",children:[h.jsxs("div",{className:"my-pred-others-row my-pred-
others-row--header",children:[h.jsx("span",{className:"my-pred-others-pos",children:"??"}),h.jsx("span",{className:"my-
pred-others-team",children:"Most picked"}),h.jsx("span",{className:"my-pred-others-count-col",children:"Picks"})]}),H.t
opFirst.map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos
",children:"1st"}),h.jsx("span",{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-c
ount-col",children:G})]},D)),H.topSecond.slice(0,1).map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:
[h.jsx("span",{className:"my-pred-others-pos",children:"2nd"}),h.jsx("span",{className:"my-pred-others-team",children:D
}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D)),H.topThird.slice(0,1).map(([D,G])=>h.jsxs("div
",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos",children:"3rd"}),h.jsx("span",
{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D))]})]
})]}):h.jsx("div",{className:"my-pred-podium-card 
my-pred-podium-card--empty",children:h.jsxs("div",{className:"my-pred-podium-empty",children:["??"," Set your podium 
picks from the Dashboard"]})})})]}),V.length===0?h.jsx("div",{className:"my-predictions-empty",children:"You haven't 
made any predictions yet."}):h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"my-predictions-heading",children:"My P
redictions"}),h.jsx("div",{className:"wc-filter-row",style:{marginBottom:12},children:h.jsx("div",{className:"wc-filter
-pills",children:[{value:"round1",label:"Round 1"},{value:"round2",label:"Round 2"},{value:"round3",label:"Round 
3"},{value:"all",label:"All Fixtures"}].map(D=>h.jsx("button",{type:"button",className:`wc-filter-btn 
${F===D.value?"is-active":""}`,onClick:()=>M(D.value),children:D.label},D.value))})}),Te.length>0&&(()=>{const 
D=[...new Set(Te.map(W=>W.matchDate.split("T")[0]))].sort(),G=F==="all"?D:D.filter(W=>Te.some(ve=>ve.matchDate.startsWi
th(W)&&ve.matchday===parseInt(F.replace("round",""))));return G.length===0?null:G.map(W=>{const 
ve=Te.filter(be=>be.matchDate.startsWith(W)),we=Ee?.day===W;return h.jsxs("div",{className:`my-pred-date-section${we?" 
my-pred-date-section--wildcard":""}`,children:[h.jsxs("div",{className:"my-pred-date-header",children:[h.jsx("span",{cl
assName:"my-pred-date-label",children:new Date(W+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short
",day:"numeric"})}),we&&h.jsxs("span",{className:"my-pred-date-badge",children:["?"," Wild 
Card"]})]}),h.jsx("div",{className:"my-pred-date-matches",children:ve.map(be=>{const 
Re=be.predictions[n.uid],$e=be.actual;return h.jsxs("div",{className:`wc-match-row${we?" wc-match-row--wc-highlight":""
}`,role:"button",tabIndex:0,onClick:()=>q(be.matchKey),onKeyDown:mt=>mt.key==="Enter"&&q(be.matchKey),children:[h.jsx("
span",{className:"wc-match-status",children:dN(be)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team
:be.homeTeam}),h.jsx("span",{className:"wc-team-name",children:Ql(be.homeTeam)}),$e?.homeScore!=null?h.jsxs("span",{cla
ssName:"wc-inline-score wc-inline-score--actual",children:[$e.homeScore," ","-"," 
",$e.awayScore]}):Re?h.jsxs("span",{className:"wc-inline-score",children:[Re.homeScore," ","-"," ",Re.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:be.awayTeam}),h.jsx("span",{className:"wc-team-name",childre
n:Ql(be.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:$e?.homeScore!=null&&be.points?.[n.uid]!=null
&&h.jsxs("span",{className:"my-pred-pts",children:["+",be.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",ch
ildren:Os(be.matchDate)})]},be.matchKey)})})]},W)})})(),F==="all"&&Ie.length>0&&h.jsxs("div",{className:"wc-knockout-se
ction",children:[h.jsxs("h3",{className:"wc-section-title",children:["??"," Knockout 
Stage"]}),["roundOf32","roundOf16","quarterFinal","semiFinal","thirdPlace","final"].map(D=>{const 
G=Ie.filter(W=>W.stage===D);return G.length===0?null:h.jsxs("div",{className:"wc-stage-group",children:[h.jsx("h4",{cla
ssName:"wc-stage-title",children:b_[D]}),h.jsx("div",{className:"wc-stage-matches",children:G.map(W=>{const 
ve=W.predictions[n.uid],we=W.actual;return h.jsxs("div",{className:"wc-match-row",role:"button",tabIndex:0,onClick:()=>
q(W.matchKey),onKeyDown:be=>be.key==="Enter"&&q(W.matchKey),children:[h.jsx("span",{className:"wc-match-status",childre
n:dN(W)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:W.homeTeam}),h.jsx("span",{className:"wc-t
eam-name",children:Ql(W.homeTeam)}),we?.homeScore!=null?h.jsxs("span",{className:"wc-inline-score 
wc-inline-score--actual",children:[we.homeScore," ","-"," 
",we.awayScore]}):ve?h.jsxs("span",{className:"wc-inline-score",children:[ve.homeScore," ","-"," ",ve.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:W.awayTeam}),h.jsx("span",{className:"wc-team-name",children
:Ql(W.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:we?.homeScore!=null&&W.points?.[n.uid]!=null&&h
.jsxs("span",{className:"my-pred-pts",children:["+",W.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",childr
en:Os(W.matchDate)})]},W.matchKey)})})]},D)})]})]}),Qe&&jo.createPortal(h.jsx("div",{className:"modal-backdrop",role:"p
resentation",onClick:()=>q(null),children:h.jsx("div",{className:"panel modal-panel 
wc-modal",role:"dialog","aria-modal":"true","aria-label":"Match details",onClick:D=>D.stopPropagation(),children:h.jsx(
BR,{match:Qe,user:n,userDoc:t,firestore:e,isAdmin:!1,matches:U,sortedUserUids:[],getDisplayName:()=>"",getUserColor:()=
>"",onSubmitPrediction:zt,onSubmitActual:()=>{},onUpdateTeams:()=>{},onClose:()=>q(null)})})}),document.body),pe&&Ee&&j
o.createPortal(h.jsx("div",{className:"modal-backdrop",role:"presentation",onClick:()=>k(!1),children:h.jsxs("div",{cla
ssName:"panel modal-panel wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card fixtures",onClick:D=
>D.stopPropagation(),children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-m
odal-title",children:["?"," Wild Card - ",new Date(Ee.day+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",mon
th:"short",day:"numeric"})]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>k(!1),children:"
?"})]}),h.jsx("div",{className:"wc-fixtures-body",children:Ir.filter(D=>D.matchDate.startsWith(Ee.day)).map(D=>h.jsxs("
div",{className:"wc-match-row wc-match-row--wc-highlight",role:"button",tabIndex:0,onClick:()=>{k(!1),q(D.matchKey)},on
KeyDown:G=>{G.key==="Enter"&&(k(!1),q(D.matchKey))},children:[h.jsx("span",{className:"wc-match-status",children:"?"}),
h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:D.homeTeam}),h.jsx("span",{className:"wc-team-name",
children:Ql(D.homeTeam)}),h.jsx("span",{className:"wc-vs",children:"vs"}),h.jsx("span",{className:"wc-team-name",childr
en:Ql(D.awayTeam)}),h.jsx(Ka,{team:D.awayTeam})]}),h.jsx("span",{className:"wc-match-date",children:Os(D.matchDate)})]}
,D.matchKey))}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium-skip-bt
n",onClick:()=>k(!1),children:"Close"})})]})}),document.body),le&&jo.createPortal(h.jsx("div",{className:"modal-backdro
p",role:"presentation",onClick:()=>ue(!1),children:h.jsxs("div",{className:"panel modal-panel 
wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card info",onClick:D=>D.stopPropagation(),children:
[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," 
Wild Card - �",is," Points"]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>ue(!1),children
:"?"})]}),h.jsxs("div",{className:"wc-info-body",children:[h.jsxs("p",{className:"wc-info-p",children:["Choose 
",h.jsx("strong",{children:"one day"})," in the current round. Every match you predict on that day earns 
",h.jsxs("strong",{children:["�",is]})," the normal 
points!"]}),h.jsx("p",{className:"wc-info-p",children:h.jsx("strong",{children:"Normal scoring (before 
multiplier):"})}),h.jsxs("ul",{className:"wc-info-list",children:[h.jsxs("li",{children:["Exact score  
",h.jsx("strong",{children:"5 pts"})," + ",h.jsx("strong",{children:"1 pt"})," per goal scored in the 
match"]}),h.jsxs("li",{children:["0-0 draw  ",h.jsx("strong",{children:"6 pts"})," (5 + 1 for 
nil-nil)"]}),h.jsxs("li",{children:["Correct outcome (not exact)  ",h.jsx("strong",{children:"2 
pts"})]}),h.jsxs("li",{children:["Wrong  ",h.jsx("strong",{children:"0 
pts"})]})]}),h.jsxs("p",{className:"wc-info-p",children:["On your Wild Card day, ",h.jsx("strong",{children:"all"})," 
of these are multiplied by ",h.jsxs("strong",{children:["�",is]}),". Pick the day with the fixtures you're most 
confident about!"]})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium
-skip-btn",onClick:()=>ue(!1),children:"Got it"})})]})}),document.body)]})}function 
P4({user:n,firestore:e,userDoc:t,onOpenPodium:s}){const i=n?.email||"",l=n?.uid||"",c=n?.displayName||n?.email||"",[d,p
]=S.useState(!1),[y,_]=S.useState(""),[w,b]=S.useState(!1),[R,P]=S.useState(""),[O,j]=S.useState(!1),L=S.useRef(null);S
.useEffect(()=>{d&&L.current&&L.current.focus()},[d]);const 
B=()=>{_(n?.displayName||""),P(""),j(!1),p(!0)},q=async()=>{P(""),j(!1);const 
A=y.trim(),U=PR(A);if(!U.valid){P(U.error);return}b(!0);try{const 
V=wr(xt(e,"users"),ic("displayName","==",A));if((await Di(V)).docs.some(Te=>Te.id!==n.uid)){P("That name is already 
taken"),b(!1);return}await zi(nt(e,"users",n.uid),{displayName:A},{merge:!0});try{pr?.currentUser&&await 
J_(pr.currentUser,{displayName:A})}catch(Te){console.warn("Auth profile update failed 
(non-critical):",Te)}j(!0),p(!1),setTimeout(()=>j(!1),2e3)}catch(V){console.error("Display name save 
error:",V),P("Failed to save. Try again.")}finally{b(!1)}},le=()=>{p(!1),P("")},ue=t?.podiumPrediction,pe=ue?ue.final||
ue:null,I=!!ue?.final&&ue.initial&&ue.final&&ue.initial.first===ue.final.first&&ue.initial.second===ue.final.second&&ue
.initial.third===ue.final.third;return h.jsxs("div",{className:"wc-panel",style:{maxWidth:500,margin:"0 
auto"},children:[h.jsxs("h2",{className:"wc-panel-title",children:["??"," My Profile"]}),h.jsxs("div",{className:"profi
le-info",children:[h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",ch
ildren:"Display Name"}),h.jsx("div",{className:"profile-info-value",children:d?h.jsxs("div",{className:"sidebar-name-ed
it",style:{justifyContent:"flex-start"},children:[h.jsx("input",{ref:L,className:"sidebar-name-input",value:y,onChange:
A=>_(A.target.value),onKeyDown:A=>{A.key==="Enter"&&q(),A.key==="Escape"&&le()},maxLength:20,placeholder:"Display 
name"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--save",onClick:q,disabled:w||!y.trim
(),children:w?"...":"V"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--cancel",onClick:l
e,children:"?"}),R&&h.jsx("span",{className:"sidebar-name-error",children:R})]}):h.jsxs("span",{className:"profile-name
-display",onClick:B,children:[c,O?" V":" ??"]})})]}),h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",
{className:"profile-info-label",children:"Email"}),h.jsx("span",{className:"profile-info-value",children:i})]}),h.jsxs(
"div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",children:"User ID"}),h.jsx("
span",{className:"profile-info-value",style:{fontSize:"0.7rem",opacity:.6},children:l})]})]}),h.jsx("hr",{className:"pr
ofile-divider"}),h.jsx("h3",{className:"wc-panel-title",style:{fontSize:"1rem"},children:"Podium Picks"}),pe?h.jsxs("di
v",{className:"dash-podium-mini",style:{marginTop:8},children:[[{key:"first",icon:"??",team:pe.first,pts:cn.first},{key
:"second",icon:"??",team:pe.second,pts:cn.second},{key:"third",icon:"??",team:pe.third,pts:cn.third}].map(A=>h.jsxs("di
v",{className:"dash-podium-mini-row",children:[h.jsx("span",{className:"dash-podium-mini-medal",children:A.icon}),h.jsx
("span",{className:"dash-podium-mini-team",children:A.team}),h.jsx("span",{className:"dash-podium-mini-pts",children:I?
A.pts*kc:A.pts})]},A.key)),h.jsx("button",{type:"button",className:"wc-btn 
wc-btn--small",style:{marginTop:8},onClick:s,children:"Update 
Picks"})]}):h.jsxs("div",{style:{textAlign:"center",padding:"20px 
0"},children:[h.jsx("p",{style:{color:"#8aa0c0",marginBottom:12},children:"No podium picks set 
yet."}),h.jsx("button",{type:"button",className:"wc-btn",onClick:s,children:"Set Podium Picks"})]})]})}const 
M4="modulepreload",V4=function(n){return"/"+n},fN={},O4=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let 
y=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"reject
ed",reason:b}))))};var c=y;document.getElementsByTagName("link");const 
d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=y(t.map(_=>{if(_=V4(_),_ 
in fN)return;fN[_]=!0;const 
w=_.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${b}`))return;const R=docu
ment.createElement("link");if(R.rel=w?"stylesheet":M4,w||(R.as="script"),R.crossOrigin="",R.href=_,p&&R.setAttribute("n
once",p),document.head.appendChild(R),w)return new 
Promise((P,O)=>{R.addEventListener("load",P),R.addEventListener("error",()=>O(new Error(`Unable to preload CSS for 
${_}`)))})}))}function l(d){const p=new 
Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return 
i.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return e().catch(l)})};function 
R_({team:n,size:e=18}){const t=Kn(n);return t?h.jsx("img",{className:"podium-flag",src:t,alt:n,width:e,height:e*.75,loa
ding:"lazy"}):h.jsx("span",{className:"podium-flag-placeholder"})}function 
L4({value:n,onChange:e,teams:t,placeholder:s}){const[i,l]=S.useState(!1),c=S.useRef(null);return 
S.useEffect(()=>{const d=p=>{c.current&&!c.current.contains(p.target)&&l(!1)};return document.addEventListener("mousedo
wn",d),()=>document.removeEventListener("mousedown",d)},[]),h.jsxs("div",{className:"podium-dropdown",ref:c,children:[h
.jsxs("button",{type:"button",className:"podium-dropdown-trigger",onClick:()=>l(!i),children:[n?h.jsx(R_,{team:n,size:1
8}):h.jsx("span",{className:"podium-dropdown-placeholder-flag"}),h.jsx("span",{className:"podium-dropdown-label",childr
en:n||s}),h.jsx("span",{className:"podium-dropdown-arrow",children:i?"":""})]}),i&&h.jsx("div",{className:"podium-dro
pdown-menu",children:t.map(d=>h.jsxs("div",{className:`podium-dropdown-option${d===n?" is-selected":""}`,onClick:()=>{e
(d),l(!1)},children:[h.jsx(R_,{team:d,size:16}),h.jsx("span",{children:d})]},d))})]})}const 
mN=[{key:"first",label:"Winner",icon:"??",desc:"1st 
Place",pts:cn.first},{key:"second",label:"Runner-up",icon:"??",desc:"2nd 
Place",pts:cn.second},{key:"third",label:"Third Place",icon:"??",desc:"3rd Place",pts:cn.third}];function 
U4({user:n,firestore:e,existingPrediction:t,groupStageOver:s,onSave:i,onDismiss:l,userDoc:c}){const d=t?.initial?.first
||t?.first||"",p=t?.initial?.second||t?.second||"",y=t?.initial?.third||t?.third||"",w=t?.final||t?.finalizedAt?t.final
:{first:d,second:p,third:y},[b,R]=S.useState(w?.first||""),[P,O]=S.useState(w?.second||""),[j,L]=S.useState(w?.third||"
"),[B,q]=S.useState(!1),[le,ue]=S.useState(""),[pe,k]=S.useState(!1),I=S.useRef(new Date(f0).getTime()),A=()=>{const 
D=I.current-Date.now();return D<=0?null:{days:Math.floor(D/864e5),hours:Math.floor(D/36e5%24),minutes:Math.floor(D/6e4%
60),seconds:Math.floor(D/1e3%60)}},[U,V]=S.useState(A);S.useEffect(()=>{const D=setInterval(()=>V(A()),1e3);return()=>c
learInterval(D)},[]);const[F,M]=S.useState(!1),[Te,Ie]=S.useState(""),[X,ge]=S.useState(!1),[Ee,je]=S.useState(""),[$,C
]=S.useState(!1),H=S.useRef(null);S.useEffect(()=>{F&&H.current&&H.current.focus()},[F]);const oe=s&&t,ye=d&&b===d&&P==
=p&&j===y,Pe=D=>Om.filter(G=>!(G===b&&D!=="first"||G===P&&D!=="second"||G===j&&D!=="third")),De=async()=>{if(ue(""),!b|
|!P||!j){ue("Please select a team for all three podium positions.");return}if(b===P||b===j||P===j){ue("All three 
selections must be different teams.");return}q(!0);try{const D=nt(e,"users",n.uid),G=c||t||{},W={...G,first:b,second:P,
third:j,updatedAt:Vn()};oe?(W.initial=G.initial||{first:b,second:P,third:j},W.final={first:b,second:P,third:j},W.finali
zedAt=Vn()):(W.initial=G.initial||{first:b,second:P,third:j},G.createdAt||(W.createdAt=Vn())),await 
zi(D,{podiumPrediction:W},{merge:!0}),k(!0),setTimeout(()=>{i({first:b,second:P,third:j})},800)}catch(D){ue("Failed to 
save. Please try again."),console.warn("Podium save error",D)}finally{q(!1)}},Ve=cn.first+cn.second+cn.third,Je=Ve*kc,Q
e=b&&P&&j&&!B&&!pe,zt=()=>{Ie(n?.displayName||""),je(""),C(!1),M(!0)},tn=async()=>{je(""),C(!1);const 
D=Te.trim(),G=PR(D);if(!G.valid){je(G.error);return}ge(!0);try{const{collection:W,getDocs:ve,query:we,where:be}=await 
O4(async()=>{const{collection:dn,getDocs:Ft,query:Bt,where:fn}=await Promise.resolve().then(()=>YL);return{collection:d
n,getDocs:Ft,query:Bt,where:fn}},[]),Re=we(W(e,"users"),be("displayName","==",D));if((await 
ve(Re)).docs.some(dn=>dn.id!==n.uid)){je("That name is already taken"),ge(!1);return}await 
zi(nt(e,"users",n.uid),{displayName:D},{merge:!0}),pr?.currentUser&&await 
J_(pr.currentUser,{displayName:D}),C(!0),M(!1),setTimeout(()=>C(!1),2e3)}catch{je("Failed to save. Try 
again.")}finally{ge(!1)}},Q=()=>{M(!1),je("")};return 
jo.createPortal(h.jsx("div",{className:"podium-backdrop",role:"presentation",onClick:pe?l:void 
0,children:h.jsx("div",{className:"panel podium-modal",role:"dialog","aria-modal":"true","aria-label":"Podium predictio
n",onClick:D=>D.stopPropagation(),children:pe?h.jsxs("div",{className:"podium-saved",children:[h.jsx("span",{className:
"podium-saved-icon",children:oe?"?":"??"}),h.jsx("h2",{className:"podium-saved-title",children:oe?"Final Picks 
Saved!":"Picks Locked"}),h.jsx("p",{className:"podium-saved-text",children:oe?`Your final podium predictions are 
locked in.${ye?" Keeping the same three - triple points eligible!":""}`:"Your first, second, and third place picks are 
now locked and cannot be changed until the group stage 
ends."}),h.jsx("div",{className:"podium-saved-picks",children:mN.map(D=>{const 
G=D.key==="first"?b:D.key==="second"?P:j;return h.jsxs("div",{className:"podium-saved-row",children:[h.jsx("span",{chil
dren:D.icon}),h.jsx(R_,{team:G,size:22}),h.jsx("span",{children:G}),h.jsxs("span",{className:"podium-saved-pts",childre
n:["+",D.pts," pts"]})]},D.key)})}),h.jsx("div",{className:"podium-saved-name",children:h.jsxs("div",{className:"podium
-name-editor",children:[F?h.jsxs("div",{className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podi
um-name-input",value:Te,onChange:D=>Ie(D.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLe
ngth:20,placeholder:"Your display name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--sav
e",onClick:tn,disabled:X||!Te.trim(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn po
dium-name-btn--cancel",onClick:Q,children:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("
span",{className:"podium-name-label",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",c
lassName:"podium-name-edit-btn",onClick:zt,title:"Edit display 
name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Saved"]})]}),Ee&&h.jsx("div",{cla
ssName:"podium-name-error",children:Ee})]})}),h.jsx("button",{type:"button",className:"podium-continue-btn",onClick:l,c
hildren:"Continue"})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2
",{className:"podium-modal-title",children:["??"," Your Podium Prediction"]}),h.jsx("button",{type:"button",className:"
podium-modal-close",onClick:l,children:"?"})]}),h.jsx("div",{className:"podium-info",children:oe?h.jsxs("p",{className:
"podium-info-text",children:["The group stage is over! Lock in your ",h.jsx("strong",{children:"final"})," podium 
picks.",ye?" You kept the same three teams - if they match the actual results you get <strong>triple 
points</strong>!":" If you keep the same picks you had before and they're correct, you get <strong>triple 
points</strong>."]}):h.jsxs("p",{className:"podium-info-text",children:["Pick who will finish 
",h.jsx("strong",{children:"1st, 2nd, and 3rd"}),". Points: winner ",h.jsxs("strong",{children:["+",cn.first]}),", 
runner-up ",h.jsxs("strong",{children:["+",cn.second]}),", third ",h.jsxs("strong",{children:["+",cn.third]}),". Keep 
the same picks after the group stage and get ",h.jsxs("strong",{children:["�",kc]})," (up to ",Je," pts!)."]})}),h.jsx(
"div",{className:"podium-name-section",children:h.jsxs("div",{className:"podium-name-editor",children:[F?h.jsxs("div",{
className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podium-name-input",value:Te,onChange:D=>Ie(D
.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLength:20,placeholder:"Your display 
name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--save",onClick:tn,disabled:X||!Te.trim
(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--cancel",onClick:Q,c
hildren:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("span",{className:"podium-name-labe
l",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",className:"podium-name-edit-btn",on
Click:zt,title:"Edit display name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Save
d"]})]}),Ee&&h.jsx("div",{className:"podium-name-error",children:Ee})]})}),h.jsx("div",{className:"podium-picks",childr
en:mN.map(D=>{const G=D.key==="first"?b:D.key==="second"?P:j,W=D.key==="first"?R:D.key==="second"?O:L;return h.jsxs("di
v",{className:"podium-pick-row",children:[h.jsxs("div",{className:"podium-pick-label",children:[h.jsx("span",{className
:"podium-pick-icon",children:D.icon}),h.jsxs("div",{children:[h.jsx("span",{className:"podium-pick-title",children:D.la
bel}),h.jsxs("span",{className:"podium-pick-desc",children:[D.desc," - ",D.pts," 
pts"]})]})]}),h.jsx(L4,{value:G,onChange:W,teams:Pe(D.key).sort((ve,we)=>ve.localeCompare(we)),placeholder:"-- Select 
team --"})]},D.key)})}),h.jsxs("div",{className:"podium-points-summary",children:[h.jsxs("span",{children:["Max if 
correct: ",h.jsxs("strong",{children:["+",Ve," 
pts"]})]}),h.jsxs("span",{className:"podium-points-triple",children:["Triple if kept: 
",h.jsxs("strong",{children:["+",Je," 
pts"]})]})]}),h.jsx("div",{className:"podium-deadline",children:U?h.jsxs("span",{children:["?"," Locks Jun 10, 11:59 
PM BST \\u00B7 Closes in ",U.days>0?U.days+"d ":"",U.hours,"h ",U.minutes,"m 
",U.seconds,"s"]}):h.jsxs("span",{children:["??"," Podium locked"]})}),le&&h.jsx("div",{className:"podium-error",childr
en:le}),h.jsxs("div",{className:"podium-footer",children:[h.jsx("button",{type:"button",className:"podium-skip-btn",onC
lick:l,children:t?"Cancel":"Skip for now"}),h.jsx("button",{type:"button",className:"podium-save-btn",onClick:De,disabl
ed:!Qe,children:B?"Saving...":oe?"Lock in Final Picks":"Save Prediction"})]})]})})}),document.body)}function 
z4({user:n,firestore:e,onClose:t,onActivate:s}){const 
i=os(),l=i?bi.findIndex(B=>B.round===i.round):-1,c=l>=0?OR(l).filter(B=>new Date(B+"T23:59:59Z").getTime()>Date.now()):
[],[d,p]=S.useState(!1),[y,_]=S.useState(!1),[w,b]=S.useState(null),[R,P]=S.useState(""),O=Ir.filter(B=>B.stage==="grou
p");if(!i||c.length===0)return null;const j=async()=>{if(w){P(""),p(!0);try{await 
bn(nt(e,"users",n.uid),{["wildCards.round"+i.round]:{day:w,activatedAt:new 
Date().toISOString()}}),s&&s(i.round,w)}catch(B){console.error("WildCard activation error:",B),P("Failed to activate 
Wild Card. Please try again."),p(!1)}}},L=w?O.filter(B=>B.matchDate.startsWith(w)):[];return 
jo.createPortal(h.jsx("div",{className:"wc-modal-backdrop",onClick:t,children:h.jsx("div",{className:"panel wc-modal wc
-modal-wildcard",onClick:B=>B.stopPropagation(),children:h.jsx("div",{className:"wc-wildcard-card",children:h.jsxs("div
",{className:`wc-wildcard-card-inner${y?" wc-wildcard-card-flipped":""}`,children:[h.jsxs("div",{className:"wc-wildcard
-card-front",style:{backgroundImage:"url(/assets/wildcard.jpg)"},children:[h.jsx("div",{className:"wc-wildcard-card-fro
nt-overlay"}),h.jsxs("div",{className:"wc-wildcard-card-front-content",children:[h.jsx("div",{className:"wc-wildcard-st
amp",children:"?"}),h.jsx("h2",{className:"wc-wildcard-title",children:"WILD 
CARD"}),h.jsxs("div",{className:"wc-wildcard-subtitle",children:["Round 
",i.round]}),h.jsxs("div",{className:"wc-wildcard-multiplier",children:["x",is," 
POINTS"]}),h.jsxs("button",{type:"button",className:"wc-wildcard-flip-btn",onClick:()=>_(!0),children:["??"," 
Reveal"]}),h.jsx("button",{type:"button",className:"wc-wildcard-skip-btn",onClick:t,children:"Skip for now"})]})]}),h.j
sx("div",{className:"wc-wildcard-card-back",children:w?h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-mod
al-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Confirm Wild Card"]}),h.jsx("button",{
type:"button",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-confirm-b
ody",children:[h.jsx("div",{className:"wc-wildcard-confirm-date",children:new Date(w+"T00:00:00Z").toLocaleDateString("
en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}),h.jsx("div",{className:"wc-wildcard-confirm-games"
,children:L.map(B=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(B.homeTeam)&&h.jsx("img",{src:Kn(B.homeT
eam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.homeTeam}),h.j
sx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.awa
yTeam}),Kn(B.awayTeam)&&h.jsx("img",{src:Kn(B.awayTeam),alt:"",className:"wc-wildcard-day-flag"})]},B.matchKey))}),h.js
xs("div",{className:"wc-wildcard-confirm-note",children:["All points from your predictions on this day will be 
multiplied by ",h.jsxs("strong",{children:["�",is]}),"!"]}),R&&h.jsx("div",{className:"wc-save-error",children:R}),h.js
xs("div",{className:"wc-wildcard-confirm-actions",children:[h.jsx("button",{type:"button",className:"wc-wildcard-confir
m-btn",onClick:j,disabled:d,children:d?"Activating...":"? Confirm"}),h.jsx("button",{type:"button",className:"podium-sk
ip-btn",onClick:t,children:"Cancel"})]})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-heade
r",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Pick Your Day"]}),h.jsx("button",{type:"button
",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-pick-body",children:[
h.jsxs("p",{style:{color:"#b0c8e0",fontSize:"0.8rem",margin:"0 0 12px",lineHeight:1.5},children:["Choose one day in 
",h.jsxs("strong",{children:["Round ",i.round," (",i.label,")"]})," to get ",h.jsxs("strong",{children:["�",is]})," 
points on every match prediction you make that 
day."]}),h.jsx("div",{className:"wc-wildcard-days-list",children:c.map(B=>{const 
q=O.filter(le=>le.matchDate.startsWith(B));return 
h.jsxs("div",{className:"wc-wildcard-day-block",children:[h.jsx("div",{className:"wc-wildcard-day-header",children:new 
Date(B+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),q.length>0?h.jsx("div"
,{className:"wc-wildcard-day-games",children:q.map(le=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(le.h
omeTeam)&&h.jsx("img",{src:Kn(le.homeTeam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildca
rd-day-team",children:le.homeTeam}),h.jsx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{classNam
e:"wc-wildcard-day-team",children:le.awayTeam}),Kn(le.awayTeam)&&h.jsx("img",{src:Kn(le.awayTeam),alt:"",className:"wc-
wildcard-day-flag"})]},le.matchKey))}):h.jsx("div",{className:"wc-wildcard-day-no-games",children:"No group 
matches"}),h.jsxs("button",{type:"button",className:"wc-wildcard-select-btn",onClick:()=>b(B),children:["?"," Select 
this date"]})]},B)})})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podi
um-skip-btn",onClick:t,children:"Skip"})})]})})]})})})}),document.body)}function F4(){const[n,e]=S.useState(null),[t,s]
=S.useState(!0),[i,l]=S.useState(null),[c,d]=S.useState(!1),[p,y]=S.useState(!1),[_,w]=S.useState(!1),[b,R]=S.useState(
null),[P,O]=S.useState(""),[j,L]=S.useState(null),B=S.useRef(!1),q=S.useRef(0),le=S.useRef(!1);S.useEffect(()=>{const 
F=new URLSearchParams(window.location.search).get("join");F&&R(F)},[]),S.useEffect(()=>{if(!pr){s(!1);return}return 
Kj(pr,F=>{e(F),s(!1)})},[]),S.useEffect(()=>{if(!b||!n||!Wt)return;(async()=>{const 
F=wr(xt(Wt,"leagues"),ic("joinCode","==",b)),M=await Di(F);if(M.empty)O("Invalid or expired join code");else{const 
Te=M.docs[0].id,Ie=M.docs[0].data(),X=Ie.name;if(Ie.joinDeadline&&new 
Date(Ie.joinDeadline).getTime()<Date.now()){O("This league's entry period has 
closed"),R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3);return}await 
bn(nt(Wt,"users",n.uid),{leagueIds:sc(Te)}),O(`Joined league: ${X}`),Ie.type==="paid"&&((await c0(nt(Wt,"users",n.uid))
).data()?.stakesAcknowledged?.[Te]||L({id:Te,name:Ie.name,stake:Ie.stake||0,hostFeePercent:Ie.hostFeePercent||0,prizeSp
lits:Ie.prizeSplits||[]}))}R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3
)})()},[b,n,Wt]),S.useEffect(()=>{if(!Wt||!n){l(null),d(!1),y(!1),w(!1);return}return 
Lt(nt(Wt,"users",n.uid),F=>{const M=F.data()||{};l(M),d(!0);const Te=M.podiumPrediction,Ie=Date.now()>=new 
Date(f0).getTime(),X=Date.now()>=new Date(S_).getTime();!Te?.initial&&!Ie&&!Te?.dismissedAt?Date.now()-q.current>3e3&&y
(!0):X&&!Te?.final&&Date.now()-q.current>3e3&&y(!0);const ge=os(),Ee=ge?"round"+ge.round:null,je=Ee&&M.wildCards?.[Ee],
$=le.current||sessionStorage.getItem("wc_dismissed")===Ee;ge&&!je&&!$&&w(!0)})},[Wt,n]);const 
ue=V=>e(V),pe=async()=>{pr&&(await Hj(pr),e(null))},k=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1)},[]),I
=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1),Wt&&n&&i?.podiumPrediction?.dismissedAt==null&&bn(nt(Wt,"us
ers",n.uid),{"podiumPrediction.dismissedAt":Vn()}).catch(()=>{})},[Wt,n,i]);if(t)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading..."})})});if(!jR)return 
h.jsx("div",{className:"auth-screen",children:h.jsxs("div",{className:"panel 
auth-card",children:[h.jsx("h1",{children:"FWC26 
Predictor"}),h.jsx("p",{style:{marginTop:12,color:"#ff6060",textAlign:"center"},children:"Firebase is not 
configured."})]})});if(!n)return h.jsx(ZL,{firebaseAuth:pr,firestore:Wt,onAuth:ue});if(!c)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading profile..."})})});const 
A=Date.now()>=new Date(S_).getTime(),U=i?.podiumPrediction||null;return h.jsxs("div",{className:"app app--with-sidebar"
,children:[h.jsx(t4,{onLogout:pe,user:n}),P&&h.jsx("div",{className:"join-notification",children:P}),h.jsx("main",{clas
sName:"app-main",children:h.jsxs(RD,{children:[h.jsx(Aa,{path:"/",element:h.jsx(c4,{user:n,firestore:Wt,onOpenPodium:()
=>y(!0)})}),h.jsx(Aa,{path:"/matches",element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})}),h.jsx(Aa,{path:"/my-predictio
ns",element:h.jsx(k4,{user:n,firestore:Wt,userDoc:i,onOpenWildCard:()=>{sessionStorage.removeItem("wc_dismissed"),w(!0)
}})}),h.jsx(Aa,{path:"/teams",element:h.jsx(_4,{})}),h.jsx(Aa,{path:"/teams/:teamName",element:h.jsx(v4,{firestore:Wt})
}),h.jsx(Aa,{path:"/leaderboard",element:h.jsx(w4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/groups",element:h.jsx(b4,{f
irestore:Wt})}),h.jsx(Aa,{path:"/leagues",element:h.jsx(S4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/leagues/:leagueId"
,element:h.jsx(x4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/rules",element:h.jsx(C4,{})}),h.jsx(Aa,{path:"/profile",ele
ment:h.jsx(P4,{user:n,firestore:Wt,userDoc:i,onOpenPodium:()=>y(!0)})}),h.jsx(Aa,{path:"*",element:h.jsx(xD,{to:"/",rep
lace:!0})})]})}),p&&h.jsx(U4,{user:n,firestore:Wt,userDoc:i,existingPrediction:U,groupStageOver:A,onSave:k,onDismiss:I}
),_&&h.jsx(z4,{user:n,firestore:Wt,onClose:()=>{le.current=!0,sessionStorage.setItem("wc_dismissed",os()?"round"+os().r
ound:"done"),w(!1)},onActivate:(V,F)=>{le.current=!0,sessionStorage.setItem("wc_dismissed","round"+V),w(!1),l(M=>({...M
||{},wildCards:{...M?.wildCards||{},["round"+V]:{day:F,activatedAt:new Date().toISOString()}}}))}}),j&&h.jsx(p0,{league
:j,user:n,firestore:Wt,onConfirm:()=>L(null),onClose:()=>L(null)})]})}C1.createRoot(document.getElementById("root")).re
nder(h.jsx(S1.StrictMode,{children:h.jsx(ZD,{children:h.jsx(F4,{})})}));



```

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-match-card-teams\" -SimpleMatch 2>&1 | Select-Object -First 1",
  "description": "Check for card-teams in built JS"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93806c2c001jboJbnmQjMSMo0

,h.jsx("span",{children:"Missed both score and outcome"})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-he
ro-card--podium",children:[h.jsx("div",{className:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-t
itle",children:"Podium Prediction"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rule
s-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.first]}),h.jsxs("div",{className:"r
ules-hero-detail",children:[h.jsx("strong",{children:"Winner"}),h.jsx("span",{children:"Pick the champion"})]})]}),h.js
xs("div",{className:"rules-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.second]}),
h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Runner 
Up"}),h.jsx("span",{children:"Pick the runner-up"})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("d
iv",{className:"rules-hero-points",children:["+",cn.third]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.js
x("strong",{children:"3rd Place"}),h.jsx("span",{children:"Pick the third-place 
finisher"})]})]})]}),h.jsxs("div",{className:"rules-podium-split",children:[h.jsxs("div",{className:"rules-podium-sub r
ules-podium-sub--change",children:[h.jsx("span",{className:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{childr
en:[h.jsx("strong",{className:"rules-podium-sub-title",children:"Change"}),h.jsxs("p",{className:"rules-podium-sub-text
",children:["Revise your podium picks once after the group stage ends 
(",R4,")."]})]})]}),h.jsxs("div",{className:"rules-podium-sub rules-podium-sub--stick",children:[h.jsx("span",{classNam
e:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{children:[h.jsx("strong",{className:"rules-podium-sub-title",ch
ildren:"Stick"}),h.jsxs("p",{className:"rules-podium-sub-text",children:["Keep unchanged for the ",kc,"\\u00D7 
bonus!"]})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-hero-card--wildcard",children:[h.jsx("div",{class
Name:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-title",children:"Wild Card - Use It or Lose It
"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("di
v",{className:"rules-hero-points",children:["�",is]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("stro
ng",{children:"One Day Per Round"}),h.jsxs("span",{children:["Pick one matchday each round - all your points on that 
day are multiplied by 
",is,"!"]})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsx("div",{className:"rules-hero-points rules-h
ero-points--zero",children:"-"}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Use 
It or Lose It"}),h.jsx("span",{children:"If you don't activate your Wild Card in a round, it doesn't carry over."})]})]
})]})]})]}),h.jsxs("div",{className:"rules-secondary-grid",children:[h.jsxs("div",{className:"rules-secondary-card pane
l",children:[h.jsxs("div",{className:"rules-secondary-header",children:[h.jsx("span",{className:"rules-secondary-icon",
children:"??"}),h.jsx("h4",{className:"rules-secondary-title",children:"Leaderboard"})]}),h.jsxs("div",{className:"rule
s-secondary-body",children:[h.jsxs("p",{children:[h.jsx("strong",{children:"Total Score"})," = match prediction points 
+ podium points"]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Tiebreaker:"})," Podium points decide the 
winner."]})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-seconda
ry-header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-second
ary-title",children:"Teams & Groups"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children
:[h.jsx("strong",{children:"48 teams"})," in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to 
Round of 32."]}),h.jsx("p",{children:"FIFA world rankings shown on each team 
card."})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-secondary-
header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-secondary
-title",children:"Leagues"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children:[h.jsx("s
trong",{children:"Master League:"})," Auto-enrolled - compete against 
everyone."]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Private Leagues:"})," Create with friends via invite 
link or join code."]})]})]})]})]})}function Ql(n){return n==="Bosnia and Herzegovina"?"Bosnia":n==="C�te 
d'Ivoire"?"C�te d'Ivoire":n==="Korea Republic"?"S. Korea":n==="IR Iran"?"Iran":n==="Cabo Verde"?"C. Verde":n==="Congo 
DR"?"Congo":n==="Saudi Arabia"?"Saudi Ar.":n==="Netherlands"?"Netherlands":n==="Switzerland"?"Switzerland":n==="Czechia
"?"Czechia":n==="T�rkiye"?"T�rkiye":n==="New Zealand"?"N. Zealand":n.length>9?n.slice(0,8)+".":n}const 
dN=n=>n.actual?.homeScore!=null?"??":Ha(n.matchDate)?"??":"?";function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.
jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,he
ight:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}class D4 
extends S.Component{constructor(e){super(e),this.state={hasError:!1}}static 
getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("MyPredictions 
crashed:",e,t)}render(){return this.state.hasError?h.jsxs("div",{className:"my-predictions",style:{padding:32,textAlign
:"center"},children:[h.jsx("p",{style:{color:"#ff6b6b",fontSize:"1.1rem"},children:"Something went wrong loading your 
predictions."}),h.jsx("p",{style:{color:"#8aa0c0",fontSize:"0.85rem"},children:"Please try refreshing the 
page."})]}):this.props.children}}function k4(n){return h.jsx(D4,{children:h.jsx(j4,{...n})})}function j4({user:n,firest
ore:e,userDoc:t,onOpenWildCard:s}){const[i,l]=S.useState([]),[c,d]=S.useState(!1),[p,y]=S.useState(null),[_,w]=S.useSta
te({}),[b,R]=S.useState(null),[P,O]=S.useState(""),[j,L]=S.useState({}),[B,q]=S.useState(null),[le,ue]=S.useState(!1),[
pe,k]=S.useState(!1),[I,A]=S.useState({});S.useEffect(()=>!e||!n?void 
0:Lt(nt(e,"users",n.uid),G=>{y(G.data()||{})},G=>console.warn("UserDoc snapshot 
error",G)),[e,n]),S.useEffect(()=>e?Lt(xt(e,"users"),G=>{const 
W={};G.docs.forEach(ve=>{W[ve.id]=ve.data()}),A(W)},G=>console.warn("UsersMap snapshot error",G)):void 0,[e]),S.useEffe
ct(()=>e?Lt(xt(e,"worldCupPredictions"),G=>{l(G.docs.map(W=>({id:W.id,...W.data()}))),d(!0)},G=>{console.warn("MyPredic
tions snapshot error",G),d(!0)}):void 0,[e]);const U=S.useMemo(()=>{const D={};return 
i.forEach(G=>{D[G.matchKey]=G}),Ir.map(G=>{const W=D[G.matchKey]||{};return{...G,...W,id:W.id||G.matchKey,predictions:W
.predictions||{},actual:W.actual||{homeScore:null,awayScore:null},points:W.points||{}}})},[i]),V=S.useMemo(()=>n?U.filt
er(D=>D.predictions?.[n.uid]?.homeScore!=null).sort((D,G)=>{const W=["group","roundOf32","roundOf16","quarterFinal","se
miFinal","thirdPlace","final"],ve=W.indexOf(D.stage),we=W.indexOf(G.stage);return 
ve!==we?ve-we:(D.matchNumber||0)-(G.matchNumber||0)}):[],[U,n]),[F,M]=S.useState(()=>{const D=os();return D?`round${D.r
ound}`:"all"}),Te=S.useMemo(()=>V.filter(D=>D.stage==="group"),[V]),Ie=S.useMemo(()=>V.filter(D=>D.stage!=="group"),[V]
),X=S.useMemo(()=>p??t,[p,t]),ge=S.useMemo(()=>{const D=os();if(!D||!X)return null;const G="round"+D.round;return 
X.wildCards?.[G]?null:{round:D.round,label:D.label}},[X]),Ee=S.useMemo(()=>{const D=os();if(!D||!X)return null;const 
G="round"+D.round,W=X.wildCards?.[G];return 
W?{round:D.round,label:D.label,day:W.day}:null},[X]),je=!!os(),[$,C]=S.useState("");S.useEffect(()=>{const 
D=()=>{const W=new Date(f0).getTime()-Date.now();if(W<=0){C("");return}const 
ve=Math.floor(W/864e5),we=Math.floor(W%864e5/36e5),be=Math.floor(W%36e5/6e4),Re=Math.floor(W%6e4/1e3);C(`${ve}d ${we}h 
${be}m ${Re}s`)};D();const G=setInterval(D,1e3);return()=>clearInterval(G)},[]);const H=S.useMemo(()=>{const D=Object.e
ntries(I).filter(([ve])=>ve!==n?.uid&&I[ve]?.podiumPrediction),G={first:{},second:{},third:{}};D.forEach(([,ve])=>{cons
t we=ve.podiumPrediction.final||ve.podiumPrediction;we.first&&(G.first[we.first]=(G.first[we.first]||0)+1),we.second&&(
G.second[we.second]=(G.second[we.second]||0)+1),we.third&&(G.third[we.third]=(G.third[we.third]||0)+1)});const W=(ve,we
=3)=>Object.entries(ve).sort((be,Re)=>Re[1]-be[1]).slice(0,we);return{totalOthers:D.length,topFirst:W(G.first),topSecon
d:W(G.second),topThird:W(G.third)}},[I,n]),oe=p?.podiumPrediction,ye=oe?oe.final||oe:null,Pe=!!oe?.final,De=Pe&&oe.init
ial&&oe.final&&oe.initial.first===oe.final.first&&oe.initial.second===oe.final.second&&oe.initial.third===oe.final.thir
d,Ve=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)&&D.actual?.homeScore==null).sort((D,G)=>new 
Date(D.matchDate)-new Date(G.matchDate))[0]||null,[U]),Je=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)
&&D.actual?.homeScore==null&&D.predictions?.[n?.uid]?.homeScore==null).sort((D,G)=>new Date(D.matchDate)-new Date(G.mat
chDate)).slice(0,9),[U,n]),Qe=S.useMemo(()=>U.find(D=>D.matchKey===B)||null,[U,B]),zt=S.useCallback(async(D,G,W)=>{if(!
e||!n)return;const ve=nt(e,"worldCupPredictions",D);await bn(ve,{[`predictions.${n.uid}`]:{homeScore:Number(G),awayScor
e:Number(W)},updatedAt:Vn()}).catch(we=>console.warn("Prediction save 
failed",we))},[e,n]),tn=S.useCallback(async(D,G,W)=>{R(D),O(""),await zt(D,G,W),R(null),w(ve=>{const we={...ve};return 
delete we[D],we})},[zt]);if(S.useEffect(()=>{if(Je.length===0)return;const D=()=>{const 
W=Date.now(),ve={};Je.forEach(we=>{const Re=LR(we.matchDate).getTime()-W;if(Re<=0)ve[we.matchKey]="Deadline 
passed";else{const $e=Math.floor(Re/864e5),mt=Math.floor(Re%864e5/36e5),dn=Math.floor(Re%36e5/6e4),Ft=Math.floor(Re%6e4
/1e3);$e>0?ve[we.matchKey]=`${$e}d ${mt}h ${dn}m ${Ft}s`:mt>0?ve[we.matchKey]=`${mt}h ${dn}m 
${Ft}s`:ve[we.matchKey]=`${dn}m ${Ft}s`}}),L(ve)};D();const 
G=setInterval(D,1e3);return()=>clearInterval(G)},[Je]),!c)return h.jsx("div",{className:"my-predictions",children:h.jsx
("div",{className:"my-predictions-empty",children:"Loading..."})});const Q=Ve?A_(Ve.venue):null;return h.jsxs("div",{cl
assName:"my-predictions",children:[Je.length>0&&h.jsxs("div",{className:"my-pred-hero",children:[h.jsxs("div",{classNam
e:"my-pred-hero-title",children:["?"," Quick 
Predict"]}),h.jsx("div",{className:"my-pred-hero-grid",children:Je.map(D=>{const 
G=_[D.matchKey]||{home:"0",away:"0"},W=b===D.matchKey,ve=A_(D.venue);return h.jsxs("div",{className:"my-pred-hero-game"
,children:[h.jsxs("div",{className:"my-pred-hero-game-row",children:[h.jsxs("div",{className:"my-pred-hero-game-team",c
hildren:[h.jsx(Ka,{team:D.homeTeam,size:24}),h.jsx("span",{className:"my-pred-hero-game-name",children:D.homeTeam})]}),
h.jsxs("div",{className:"my-pred-hero-game-score-wrap",children:[h.jsx("input",{type:"number",min:"0",max:"20",classNam
e:"my-pred-hero-game-input",value:G.home,onChange:we=>w(be=>({...be,[D.matchKey]:{...be[D.matchKey],home:we.target.valu
e,away:be[D.matchKey]?.away??"0"}})),disabled:W}),h.jsx("span",{className:"my-pred-hero-game-colon",children:":"}),h.js
x("input",{type:"number",min:"0",max:"20",className:"my-pred-hero-game-input",value:G.away,onChange:we=>w(be=>({...be,[
D.matchKey]:{...be[D.matchKey],home:be[D.matchKey]?.home??"0",away:we.target.value}})),disabled:W})]}),h.jsxs("div",{cl
assName:"my-pred-hero-game-team my-pred-hero-game-team--right",children:[h.jsx(Ka,{team:D.awayTeam,size:24}),h.jsx("spa
n",{className:"my-pred-hero-game-name",children:D.awayTeam})]})]}),h.jsxs("div",{className:"my-pred-hero-game-footer",c
hildren:[h.jsxs("span",{className:"my-pred-hero-game-venue",children:["???"," ",ve?.stadium,", 
",ve?.city]}),h.jsxs("span",{className:"my-pred-hero-game-kickoff",children:["?"," 
",Os(D.matchDate)]}),h.jsxs("span",{className:"my-pred-hero-game-deadline",children:["?"," ",j[D.matchKey]||"..."]})]})
,h.jsxs("button",{type:"button",className:"my-pred-hero-game-confirm",onClick:()=>tn(D.matchKey,G.home,G.away),disabled
:W,children:[W?"?":"?"," Confirm"]})]},D.matchKey)})})]}),h.jsxs("div",{className:"my-pred-top-row",children:[h.jsx("di
v",{className:"my-pred-col",children:je&&ge?h.jsxs("div",{className:"my-pred-wc-tile",children:[h.jsx("button",{type:"b
utton",className:"my-pred-wc-info-btn",onClick:()=>ue(!0),children:"What's 
this?"}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:s,children:["?"," Activate 
Now"]})]}):je&&Ee?h.jsxs("div",{className:"my-pred-wc-tile my-pred-wc-tile--activated",children:[h.jsxs("div",{classNam
e:"my-pred-wc-tile-content",children:[h.jsxs("div",{className:"my-pred-wc-tile-header",children:["??"," Wild Card 
Active"]}),h.jsxs("div",{className:"my-pred-wc-tile-sub",children:["Round ",Ee.round," 
(",Ee.label,")"]}),h.jsx("div",{className:"my-pred-wc-tile-day",children:new Date(Ee.day+"T00:00:00Z").toLocaleDateStri
ng("en-US",{weekday:"short",month:"short",day:"numeric"})}),h.jsxs("div",{className:"my-pred-wc-tile-badge",children:["
�",is," 
Active"]})]}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:()=>k(!0),children:["?"," 
Redeemed"]})]}):h.jsx("div",{className:"my-pred-wc-tile my-pred-wc-tile--hidden"})}),h.jsx("div",{className:"my-pred-co
l",children:Ve?h.jsxs("button",{type:"button",className:"my-pred-next-card",onClick:()=>q(Ve.matchKey),children:[h.jsxs
("div",{className:"my-pred-next-badge",children:["?"," NEXT MATCH"]}),h.jsxs("div",{className:"my-pred-next-teams",chil
dren:[h.jsx(Ka,{team:Ve.homeTeam,size:40}),h.jsxs("div",{className:"my-pred-next-team",children:[h.jsx("span",{classNam
e:"my-pred-next-name",children:Ve.homeTeam}),h.jsxs("span",{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.home
Team).fifaRank]})]}),h.jsx("span",{className:"my-pred-next-vs",children:"vs"}),h.jsxs("div",{className:"my-pred-next-te
am my-pred-next-team--away",children:[h.jsx("span",{className:"my-pred-next-name",children:Ve.awayTeam}),h.jsxs("span",
{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.awayTeam).fifaRank]})]}),h.jsx(Ka,{team:Ve.awayTeam,size:40})]}
),h.jsxs("div",{className:"my-pred-next-venue",children:["???"," ",Q?.stadium,", 
",Q?.city]}),h.jsxs("div",{className:"my-pred-next-kickoff",children:["?"," 
",Os(Ve.matchDate)]}),h.jsxs("div",{className:"my-pred-next-countdown",children:["?"," ",j[Ve.matchKey]||"-"]}),h.jsxs(
"div",{className:"my-pred-next-prediction",children:[h.jsx("span",{className:"my-pred-next-pred-label",children:"YOUR P
REDICTION"}),Ve.predictions?.[n.uid]?h.jsxs("div",{className:"my-pred-next-pred-score-row",children:[h.jsx(Ka,{team:Ve.
homeTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve.predictions[n.uid].homeScore}),h.jsx("
span",{className:"my-pred-next-pred-colon",children:":"}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve
.predictions[n.uid].awayScore}),h.jsx(Ka,{team:Ve.awayTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-btn",ch
ildren:"Edit"})]}):h.jsxs("span",{className:"my-pred-next-pred-btn my-pred-next-pred-btn--primary",children:["?"," 
Predict this match"]})]})]}):h.jsx("div",{className:"my-pred-next-card 
my-pred-next-card--empty",children:h.jsxs("div",{className:"my-pred-next-empty",children:["?"," All matches 
complete!"]})})}),h.jsx("div",{className:"my-pred-col",children:ye?h.jsxs("div",{className:"my-pred-podium-card my-pred
-podium-card--extended",children:[h.jsxs("div",{className:"my-pred-podium-header",children:[h.jsxs("span",{className:"m
y-pred-podium-title",children:["??"," My Podium 
Picks"]}),$&&h.jsxs("span",{className:"my-pred-podium-lock",children:["??"," Locks ",$]})]}),h.jsx("div",{className:"my
-pred-podium-rows",children:[{key:"first",icon:"??",team:ye.first||oe?.first||oe?.initial?.first,pts:cn.first},{key:"se
cond",icon:"??",team:ye.second||oe?.second||oe?.initial?.second,pts:cn.second},{key:"third",icon:"??",team:ye.third||oe
?.third||oe?.initial?.third,pts:cn.third}].map(D=>h.jsxs("div",{className:"my-pred-podium-row",children:[h.jsx("span",{
className:"my-pred-podium-icon",children:D.icon}),h.jsx("span",{className:"my-pred-podium-team",children:D.team||"-"}),
h.jsxs("span",{className:"my-pred-podium-pts",children:["+",De?D.pts*kc:D.pts," 
pts"]})]},D.key))}),h.jsx("div",{className:"my-pred-podium-note",children:Pe?`Final picks locked${De?" - triple points 
active!":""}`:"Initial picks set - you can update after group stage"}),H.totalOthers>0&&h.jsxs("div",{className:"my-pre
d-others-section",children:[h.jsxs("div",{className:"my-pred-others-count",children:["??"," ",H.totalOthers," other 
player",H.totalOthers===1?"":"s"," submitted 
picks"]}),h.jsxs("div",{className:"my-pred-others-table",children:[h.jsxs("div",{className:"my-pred-others-row my-pred-
others-row--header",children:[h.jsx("span",{className:"my-pred-others-pos",children:"??"}),h.jsx("span",{className:"my-
pred-others-team",children:"Most picked"}),h.jsx("span",{className:"my-pred-others-count-col",children:"Picks"})]}),H.t
opFirst.map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos
",children:"1st"}),h.jsx("span",{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-c
ount-col",children:G})]},D)),H.topSecond.slice(0,1).map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:
[h.jsx("span",{className:"my-pred-others-pos",children:"2nd"}),h.jsx("span",{className:"my-pred-others-team",children:D
}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D)),H.topThird.slice(0,1).map(([D,G])=>h.jsxs("div
",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos",children:"3rd"}),h.jsx("span",
{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D))]})]
})]}):h.jsx("div",{className:"my-pred-podium-card 
my-pred-podium-card--empty",children:h.jsxs("div",{className:"my-pred-podium-empty",children:["??"," Set your podium 
picks from the Dashboard"]})})})]}),V.length===0?h.jsx("div",{className:"my-predictions-empty",children:"You haven't 
made any predictions yet."}):h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"my-predictions-heading",children:"My P
redictions"}),h.jsx("div",{className:"wc-filter-row",style:{marginBottom:12},children:h.jsx("div",{className:"wc-filter
-pills",children:[{value:"round1",label:"Round 1"},{value:"round2",label:"Round 2"},{value:"round3",label:"Round 
3"},{value:"all",label:"All Fixtures"}].map(D=>h.jsx("button",{type:"button",className:`wc-filter-btn 
${F===D.value?"is-active":""}`,onClick:()=>M(D.value),children:D.label},D.value))})}),Te.length>0&&(()=>{const 
D=[...new Set(Te.map(W=>W.matchDate.split("T")[0]))].sort(),G=F==="all"?D:D.filter(W=>Te.some(ve=>ve.matchDate.startsWi
th(W)&&ve.matchday===parseInt(F.replace("round",""))));return G.length===0?null:G.map(W=>{const 
ve=Te.filter(be=>be.matchDate.startsWith(W)),we=Ee?.day===W;return h.jsxs("div",{className:`my-pred-date-section${we?" 
my-pred-date-section--wildcard":""}`,children:[h.jsxs("div",{className:"my-pred-date-header",children:[h.jsx("span",{cl
assName:"my-pred-date-label",children:new Date(W+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short
",day:"numeric"})}),we&&h.jsxs("span",{className:"my-pred-date-badge",children:["?"," Wild 
Card"]})]}),h.jsx("div",{className:"my-pred-date-matches",children:ve.map(be=>{const 
Re=be.predictions[n.uid],$e=be.actual;return h.jsxs("div",{className:`wc-match-row${we?" wc-match-row--wc-highlight":""
}`,role:"button",tabIndex:0,onClick:()=>q(be.matchKey),onKeyDown:mt=>mt.key==="Enter"&&q(be.matchKey),children:[h.jsx("
span",{className:"wc-match-status",children:dN(be)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team
:be.homeTeam}),h.jsx("span",{className:"wc-team-name",children:Ql(be.homeTeam)}),$e?.homeScore!=null?h.jsxs("span",{cla
ssName:"wc-inline-score wc-inline-score--actual",children:[$e.homeScore," ","-"," 
",$e.awayScore]}):Re?h.jsxs("span",{className:"wc-inline-score",children:[Re.homeScore," ","-"," ",Re.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:be.awayTeam}),h.jsx("span",{className:"wc-team-name",childre
n:Ql(be.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:$e?.homeScore!=null&&be.points?.[n.uid]!=null
&&h.jsxs("span",{className:"my-pred-pts",children:["+",be.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",ch
ildren:Os(be.matchDate)})]},be.matchKey)})})]},W)})})(),F==="all"&&Ie.length>0&&h.jsxs("div",{className:"wc-knockout-se
ction",children:[h.jsxs("h3",{className:"wc-section-title",children:["??"," Knockout 
Stage"]}),["roundOf32","roundOf16","quarterFinal","semiFinal","thirdPlace","final"].map(D=>{const 
G=Ie.filter(W=>W.stage===D);return G.length===0?null:h.jsxs("div",{className:"wc-stage-group",children:[h.jsx("h4",{cla
ssName:"wc-stage-title",children:b_[D]}),h.jsx("div",{className:"wc-stage-matches",children:G.map(W=>{const 
ve=W.predictions[n.uid],we=W.actual;return h.jsxs("div",{className:"wc-match-row",role:"button",tabIndex:0,onClick:()=>
q(W.matchKey),onKeyDown:be=>be.key==="Enter"&&q(W.matchKey),children:[h.jsx("span",{className:"wc-match-status",childre
n:dN(W)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:W.homeTeam}),h.jsx("span",{className:"wc-t
eam-name",children:Ql(W.homeTeam)}),we?.homeScore!=null?h.jsxs("span",{className:"wc-inline-score 
wc-inline-score--actual",children:[we.homeScore," ","-"," 
",we.awayScore]}):ve?h.jsxs("span",{className:"wc-inline-score",children:[ve.homeScore," ","-"," ",ve.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:W.awayTeam}),h.jsx("span",{className:"wc-team-name",children
:Ql(W.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:we?.homeScore!=null&&W.points?.[n.uid]!=null&&h
.jsxs("span",{className:"my-pred-pts",children:["+",W.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",childr
en:Os(W.matchDate)})]},W.matchKey)})})]},D)})]})]}),Qe&&jo.createPortal(h.jsx("div",{className:"modal-backdrop",role:"p
resentation",onClick:()=>q(null),children:h.jsx("div",{className:"panel modal-panel 
wc-modal",role:"dialog","aria-modal":"true","aria-label":"Match details",onClick:D=>D.stopPropagation(),children:h.jsx(
BR,{match:Qe,user:n,userDoc:t,firestore:e,isAdmin:!1,matches:U,sortedUserUids:[],getDisplayName:()=>"",getUserColor:()=
>"",onSubmitPrediction:zt,onSubmitActual:()=>{},onUpdateTeams:()=>{},onClose:()=>q(null)})})}),document.body),pe&&Ee&&j
o.createPortal(h.jsx("div",{className:"modal-backdrop",role:"presentation",onClick:()=>k(!1),children:h.jsxs("div",{cla
ssName:"panel modal-panel wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card fixtures",onClick:D=
>D.stopPropagation(),children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-m
odal-title",children:["?"," Wild Card - ",new Date(Ee.day+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",mon
th:"short",day:"numeric"})]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>k(!1),children:"
?"})]}),h.jsx("div",{className:"wc-fixtures-body",children:Ir.filter(D=>D.matchDate.startsWith(Ee.day)).map(D=>h.jsxs("
div",{className:"wc-match-row wc-match-row--wc-highlight",role:"button",tabIndex:0,onClick:()=>{k(!1),q(D.matchKey)},on
KeyDown:G=>{G.key==="Enter"&&(k(!1),q(D.matchKey))},children:[h.jsx("span",{className:"wc-match-status",children:"?"}),
h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:D.homeTeam}),h.jsx("span",{className:"wc-team-name",
children:Ql(D.homeTeam)}),h.jsx("span",{className:"wc-vs",children:"vs"}),h.jsx("span",{className:"wc-team-name",childr
en:Ql(D.awayTeam)}),h.jsx(Ka,{team:D.awayTeam})]}),h.jsx("span",{className:"wc-match-date",children:Os(D.matchDate)})]}
,D.matchKey))}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium-skip-bt
n",onClick:()=>k(!1),children:"Close"})})]})}),document.body),le&&jo.createPortal(h.jsx("div",{className:"modal-backdro
p",role:"presentation",onClick:()=>ue(!1),children:h.jsxs("div",{className:"panel modal-panel 
wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card info",onClick:D=>D.stopPropagation(),children:
[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," 
Wild Card - �",is," Points"]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>ue(!1),children
:"?"})]}),h.jsxs("div",{className:"wc-info-body",children:[h.jsxs("p",{className:"wc-info-p",children:["Choose 
",h.jsx("strong",{children:"one day"})," in the current round. Every match you predict on that day earns 
",h.jsxs("strong",{children:["�",is]})," the normal 
points!"]}),h.jsx("p",{className:"wc-info-p",children:h.jsx("strong",{children:"Normal scoring (before 
multiplier):"})}),h.jsxs("ul",{className:"wc-info-list",children:[h.jsxs("li",{children:["Exact score  
",h.jsx("strong",{children:"5 pts"})," + ",h.jsx("strong",{children:"1 pt"})," per goal scored in the 
match"]}),h.jsxs("li",{children:["0-0 draw  ",h.jsx("strong",{children:"6 pts"})," (5 + 1 for 
nil-nil)"]}),h.jsxs("li",{children:["Correct outcome (not exact)  ",h.jsx("strong",{children:"2 
pts"})]}),h.jsxs("li",{children:["Wrong  ",h.jsx("strong",{children:"0 
pts"})]})]}),h.jsxs("p",{className:"wc-info-p",children:["On your Wild Card day, ",h.jsx("strong",{children:"all"})," 
of these are multiplied by ",h.jsxs("strong",{children:["�",is]}),". Pick the day with the fixtures you're most 
confident about!"]})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium
-skip-btn",onClick:()=>ue(!1),children:"Got it"})})]})}),document.body)]})}function 
P4({user:n,firestore:e,userDoc:t,onOpenPodium:s}){const i=n?.email||"",l=n?.uid||"",c=n?.displayName||n?.email||"",[d,p
]=S.useState(!1),[y,_]=S.useState(""),[w,b]=S.useState(!1),[R,P]=S.useState(""),[O,j]=S.useState(!1),L=S.useRef(null);S
.useEffect(()=>{d&&L.current&&L.current.focus()},[d]);const 
B=()=>{_(n?.displayName||""),P(""),j(!1),p(!0)},q=async()=>{P(""),j(!1);const 
A=y.trim(),U=PR(A);if(!U.valid){P(U.error);return}b(!0);try{const 
V=wr(xt(e,"users"),ic("displayName","==",A));if((await Di(V)).docs.some(Te=>Te.id!==n.uid)){P("That name is already 
taken"),b(!1);return}await zi(nt(e,"users",n.uid),{displayName:A},{merge:!0});try{pr?.currentUser&&await 
J_(pr.currentUser,{displayName:A})}catch(Te){console.warn("Auth profile update failed 
(non-critical):",Te)}j(!0),p(!1),setTimeout(()=>j(!1),2e3)}catch(V){console.error("Display name save 
error:",V),P("Failed to save. Try again.")}finally{b(!1)}},le=()=>{p(!1),P("")},ue=t?.podiumPrediction,pe=ue?ue.final||
ue:null,I=!!ue?.final&&ue.initial&&ue.final&&ue.initial.first===ue.final.first&&ue.initial.second===ue.final.second&&ue
.initial.third===ue.final.third;return h.jsxs("div",{className:"wc-panel",style:{maxWidth:500,margin:"0 
auto"},children:[h.jsxs("h2",{className:"wc-panel-title",children:["??"," My Profile"]}),h.jsxs("div",{className:"profi
le-info",children:[h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",ch
ildren:"Display Name"}),h.jsx("div",{className:"profile-info-value",children:d?h.jsxs("div",{className:"sidebar-name-ed
it",style:{justifyContent:"flex-start"},children:[h.jsx("input",{ref:L,className:"sidebar-name-input",value:y,onChange:
A=>_(A.target.value),onKeyDown:A=>{A.key==="Enter"&&q(),A.key==="Escape"&&le()},maxLength:20,placeholder:"Display 
name"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--save",onClick:q,disabled:w||!y.trim
(),children:w?"...":"V"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--cancel",onClick:l
e,children:"?"}),R&&h.jsx("span",{className:"sidebar-name-error",children:R})]}):h.jsxs("span",{className:"profile-name
-display",onClick:B,children:[c,O?" V":" ??"]})})]}),h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",
{className:"profile-info-label",children:"Email"}),h.jsx("span",{className:"profile-info-value",children:i})]}),h.jsxs(
"div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",children:"User ID"}),h.jsx("
span",{className:"profile-info-value",style:{fontSize:"0.7rem",opacity:.6},children:l})]})]}),h.jsx("hr",{className:"pr
ofile-divider"}),h.jsx("h3",{className:"wc-panel-title",style:{fontSize:"1rem"},children:"Podium Picks"}),pe?h.jsxs("di
v",{className:"dash-podium-mini",style:{marginTop:8},children:[[{key:"first",icon:"??",team:pe.first,pts:cn.first},{key
:"second",icon:"??",team:pe.second,pts:cn.second},{key:"third",icon:"??",team:pe.third,pts:cn.third}].map(A=>h.jsxs("di
v",{className:"dash-podium-mini-row",children:[h.jsx("span",{className:"dash-podium-mini-medal",children:A.icon}),h.jsx
("span",{className:"dash-podium-mini-team",children:A.team}),h.jsx("span",{className:"dash-podium-mini-pts",children:I?
A.pts*kc:A.pts})]},A.key)),h.jsx("button",{type:"button",className:"wc-btn 
wc-btn--small",style:{marginTop:8},onClick:s,children:"Update 
Picks"})]}):h.jsxs("div",{style:{textAlign:"center",padding:"20px 
0"},children:[h.jsx("p",{style:{color:"#8aa0c0",marginBottom:12},children:"No podium picks set 
yet."}),h.jsx("button",{type:"button",className:"wc-btn",onClick:s,children:"Set Podium Picks"})]})]})}const 
M4="modulepreload",V4=function(n){return"/"+n},fN={},O4=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let 
y=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"reject
ed",reason:b}))))};var c=y;document.getElementsByTagName("link");const 
d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=y(t.map(_=>{if(_=V4(_),_ 
in fN)return;fN[_]=!0;const 
w=_.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${b}`))return;const R=docu
ment.createElement("link");if(R.rel=w?"stylesheet":M4,w||(R.as="script"),R.crossOrigin="",R.href=_,p&&R.setAttribute("n
once",p),document.head.appendChild(R),w)return new 
Promise((P,O)=>{R.addEventListener("load",P),R.addEventListener("error",()=>O(new Error(`Unable to preload CSS for 
${_}`)))})}))}function l(d){const p=new 
Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return 
i.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return e().catch(l)})};function 
R_({team:n,size:e=18}){const t=Kn(n);return t?h.jsx("img",{className:"podium-flag",src:t,alt:n,width:e,height:e*.75,loa
ding:"lazy"}):h.jsx("span",{className:"podium-flag-placeholder"})}function 
L4({value:n,onChange:e,teams:t,placeholder:s}){const[i,l]=S.useState(!1),c=S.useRef(null);return 
S.useEffect(()=>{const d=p=>{c.current&&!c.current.contains(p.target)&&l(!1)};return document.addEventListener("mousedo
wn",d),()=>document.removeEventListener("mousedown",d)},[]),h.jsxs("div",{className:"podium-dropdown",ref:c,children:[h
.jsxs("button",{type:"button",className:"podium-dropdown-trigger",onClick:()=>l(!i),children:[n?h.jsx(R_,{team:n,size:1
8}):h.jsx("span",{className:"podium-dropdown-placeholder-flag"}),h.jsx("span",{className:"podium-dropdown-label",childr
en:n||s}),h.jsx("span",{className:"podium-dropdown-arrow",children:i?"":""})]}),i&&h.jsx("div",{className:"podium-dro
pdown-menu",children:t.map(d=>h.jsxs("div",{className:`podium-dropdown-option${d===n?" is-selected":""}`,onClick:()=>{e
(d),l(!1)},children:[h.jsx(R_,{team:d,size:16}),h.jsx("span",{children:d})]},d))})]})}const 
mN=[{key:"first",label:"Winner",icon:"??",desc:"1st 
Place",pts:cn.first},{key:"second",label:"Runner-up",icon:"??",desc:"2nd 
Place",pts:cn.second},{key:"third",label:"Third Place",icon:"??",desc:"3rd Place",pts:cn.third}];function 
U4({user:n,firestore:e,existingPrediction:t,groupStageOver:s,onSave:i,onDismiss:l,userDoc:c}){const d=t?.initial?.first
||t?.first||"",p=t?.initial?.second||t?.second||"",y=t?.initial?.third||t?.third||"",w=t?.final||t?.finalizedAt?t.final
:{first:d,second:p,third:y},[b,R]=S.useState(w?.first||""),[P,O]=S.useState(w?.second||""),[j,L]=S.useState(w?.third||"
"),[B,q]=S.useState(!1),[le,ue]=S.useState(""),[pe,k]=S.useState(!1),I=S.useRef(new Date(f0).getTime()),A=()=>{const 
D=I.current-Date.now();return D<=0?null:{days:Math.floor(D/864e5),hours:Math.floor(D/36e5%24),minutes:Math.floor(D/6e4%
60),seconds:Math.floor(D/1e3%60)}},[U,V]=S.useState(A);S.useEffect(()=>{const D=setInterval(()=>V(A()),1e3);return()=>c
learInterval(D)},[]);const[F,M]=S.useState(!1),[Te,Ie]=S.useState(""),[X,ge]=S.useState(!1),[Ee,je]=S.useState(""),[$,C
]=S.useState(!1),H=S.useRef(null);S.useEffect(()=>{F&&H.current&&H.current.focus()},[F]);const oe=s&&t,ye=d&&b===d&&P==
=p&&j===y,Pe=D=>Om.filter(G=>!(G===b&&D!=="first"||G===P&&D!=="second"||G===j&&D!=="third")),De=async()=>{if(ue(""),!b|
|!P||!j){ue("Please select a team for all three podium positions.");return}if(b===P||b===j||P===j){ue("All three 
selections must be different teams.");return}q(!0);try{const D=nt(e,"users",n.uid),G=c||t||{},W={...G,first:b,second:P,
third:j,updatedAt:Vn()};oe?(W.initial=G.initial||{first:b,second:P,third:j},W.final={first:b,second:P,third:j},W.finali
zedAt=Vn()):(W.initial=G.initial||{first:b,second:P,third:j},G.createdAt||(W.createdAt=Vn())),await 
zi(D,{podiumPrediction:W},{merge:!0}),k(!0),setTimeout(()=>{i({first:b,second:P,third:j})},800)}catch(D){ue("Failed to 
save. Please try again."),console.warn("Podium save error",D)}finally{q(!1)}},Ve=cn.first+cn.second+cn.third,Je=Ve*kc,Q
e=b&&P&&j&&!B&&!pe,zt=()=>{Ie(n?.displayName||""),je(""),C(!1),M(!0)},tn=async()=>{je(""),C(!1);const 
D=Te.trim(),G=PR(D);if(!G.valid){je(G.error);return}ge(!0);try{const{collection:W,getDocs:ve,query:we,where:be}=await 
O4(async()=>{const{collection:dn,getDocs:Ft,query:Bt,where:fn}=await Promise.resolve().then(()=>YL);return{collection:d
n,getDocs:Ft,query:Bt,where:fn}},[]),Re=we(W(e,"users"),be("displayName","==",D));if((await 
ve(Re)).docs.some(dn=>dn.id!==n.uid)){je("That name is already taken"),ge(!1);return}await 
zi(nt(e,"users",n.uid),{displayName:D},{merge:!0}),pr?.currentUser&&await 
J_(pr.currentUser,{displayName:D}),C(!0),M(!1),setTimeout(()=>C(!1),2e3)}catch{je("Failed to save. Try 
again.")}finally{ge(!1)}},Q=()=>{M(!1),je("")};return 
jo.createPortal(h.jsx("div",{className:"podium-backdrop",role:"presentation",onClick:pe?l:void 
0,children:h.jsx("div",{className:"panel podium-modal",role:"dialog","aria-modal":"true","aria-label":"Podium predictio
n",onClick:D=>D.stopPropagation(),children:pe?h.jsxs("div",{className:"podium-saved",children:[h.jsx("span",{className:
"podium-saved-icon",children:oe?"?":"??"}),h.jsx("h2",{className:"podium-saved-title",children:oe?"Final Picks 
Saved!":"Picks Locked"}),h.jsx("p",{className:"podium-saved-text",children:oe?`Your final podium predictions are 
locked in.${ye?" Keeping the same three - triple points eligible!":""}`:"Your first, second, and third place picks are 
now locked and cannot be changed until the group stage 
ends."}),h.jsx("div",{className:"podium-saved-picks",children:mN.map(D=>{const 
G=D.key==="first"?b:D.key==="second"?P:j;return h.jsxs("div",{className:"podium-saved-row",children:[h.jsx("span",{chil
dren:D.icon}),h.jsx(R_,{team:G,size:22}),h.jsx("span",{children:G}),h.jsxs("span",{className:"podium-saved-pts",childre
n:["+",D.pts," pts"]})]},D.key)})}),h.jsx("div",{className:"podium-saved-name",children:h.jsxs("div",{className:"podium
-name-editor",children:[F?h.jsxs("div",{className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podi
um-name-input",value:Te,onChange:D=>Ie(D.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLe
ngth:20,placeholder:"Your display name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--sav
e",onClick:tn,disabled:X||!Te.trim(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn po
dium-name-btn--cancel",onClick:Q,children:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("
span",{className:"podium-name-label",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",c
lassName:"podium-name-edit-btn",onClick:zt,title:"Edit display 
name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Saved"]})]}),Ee&&h.jsx("div",{cla
ssName:"podium-name-error",children:Ee})]})}),h.jsx("button",{type:"button",className:"podium-continue-btn",onClick:l,c
hildren:"Continue"})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2
",{className:"podium-modal-title",children:["??"," Your Podium Prediction"]}),h.jsx("button",{type:"button",className:"
podium-modal-close",onClick:l,children:"?"})]}),h.jsx("div",{className:"podium-info",children:oe?h.jsxs("p",{className:
"podium-info-text",children:["The group stage is over! Lock in your ",h.jsx("strong",{children:"final"})," podium 
picks.",ye?" You kept the same three teams - if they match the actual results you get <strong>triple 
points</strong>!":" If you keep the same picks you had before and they're correct, you get <strong>triple 
points</strong>."]}):h.jsxs("p",{className:"podium-info-text",children:["Pick who will finish 
",h.jsx("strong",{children:"1st, 2nd, and 3rd"}),". Points: winner ",h.jsxs("strong",{children:["+",cn.first]}),", 
runner-up ",h.jsxs("strong",{children:["+",cn.second]}),", third ",h.jsxs("strong",{children:["+",cn.third]}),". Keep 
the same picks after the group stage and get ",h.jsxs("strong",{children:["�",kc]})," (up to ",Je," pts!)."]})}),h.jsx(
"div",{className:"podium-name-section",children:h.jsxs("div",{className:"podium-name-editor",children:[F?h.jsxs("div",{
className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podium-name-input",value:Te,onChange:D=>Ie(D
.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLength:20,placeholder:"Your display 
name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--save",onClick:tn,disabled:X||!Te.trim
(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--cancel",onClick:Q,c
hildren:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("span",{className:"podium-name-labe
l",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",className:"podium-name-edit-btn",on
Click:zt,title:"Edit display name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Save
d"]})]}),Ee&&h.jsx("div",{className:"podium-name-error",children:Ee})]})}),h.jsx("div",{className:"podium-picks",childr
en:mN.map(D=>{const G=D.key==="first"?b:D.key==="second"?P:j,W=D.key==="first"?R:D.key==="second"?O:L;return h.jsxs("di
v",{className:"podium-pick-row",children:[h.jsxs("div",{className:"podium-pick-label",children:[h.jsx("span",{className
:"podium-pick-icon",children:D.icon}),h.jsxs("div",{children:[h.jsx("span",{className:"podium-pick-title",children:D.la
bel}),h.jsxs("span",{className:"podium-pick-desc",children:[D.desc," - ",D.pts," 
pts"]})]})]}),h.jsx(L4,{value:G,onChange:W,teams:Pe(D.key).sort((ve,we)=>ve.localeCompare(we)),placeholder:"-- Select 
team --"})]},D.key)})}),h.jsxs("div",{className:"podium-points-summary",children:[h.jsxs("span",{children:["Max if 
correct: ",h.jsxs("strong",{children:["+",Ve," 
pts"]})]}),h.jsxs("span",{className:"podium-points-triple",children:["Triple if kept: 
",h.jsxs("strong",{children:["+",Je," 
pts"]})]})]}),h.jsx("div",{className:"podium-deadline",children:U?h.jsxs("span",{children:["?"," Locks Jun 10, 11:59 
PM BST \\u00B7 Closes in ",U.days>0?U.days+"d ":"",U.hours,"h ",U.minutes,"m 
",U.seconds,"s"]}):h.jsxs("span",{children:["??"," Podium locked"]})}),le&&h.jsx("div",{className:"podium-error",childr
en:le}),h.jsxs("div",{className:"podium-footer",children:[h.jsx("button",{type:"button",className:"podium-skip-btn",onC
lick:l,children:t?"Cancel":"Skip for now"}),h.jsx("button",{type:"button",className:"podium-save-btn",onClick:De,disabl
ed:!Qe,children:B?"Saving...":oe?"Lock in Final Picks":"Save Prediction"})]})]})})}),document.body)}function 
z4({user:n,firestore:e,onClose:t,onActivate:s}){const 
i=os(),l=i?bi.findIndex(B=>B.round===i.round):-1,c=l>=0?OR(l).filter(B=>new Date(B+"T23:59:59Z").getTime()>Date.now()):
[],[d,p]=S.useState(!1),[y,_]=S.useState(!1),[w,b]=S.useState(null),[R,P]=S.useState(""),O=Ir.filter(B=>B.stage==="grou
p");if(!i||c.length===0)return null;const j=async()=>{if(w){P(""),p(!0);try{await 
bn(nt(e,"users",n.uid),{["wildCards.round"+i.round]:{day:w,activatedAt:new 
Date().toISOString()}}),s&&s(i.round,w)}catch(B){console.error("WildCard activation error:",B),P("Failed to activate 
Wild Card. Please try again."),p(!1)}}},L=w?O.filter(B=>B.matchDate.startsWith(w)):[];return 
jo.createPortal(h.jsx("div",{className:"wc-modal-backdrop",onClick:t,children:h.jsx("div",{className:"panel wc-modal wc
-modal-wildcard",onClick:B=>B.stopPropagation(),children:h.jsx("div",{className:"wc-wildcard-card",children:h.jsxs("div
",{className:`wc-wildcard-card-inner${y?" wc-wildcard-card-flipped":""}`,children:[h.jsxs("div",{className:"wc-wildcard
-card-front",style:{backgroundImage:"url(/assets/wildcard.jpg)"},children:[h.jsx("div",{className:"wc-wildcard-card-fro
nt-overlay"}),h.jsxs("div",{className:"wc-wildcard-card-front-content",children:[h.jsx("div",{className:"wc-wildcard-st
amp",children:"?"}),h.jsx("h2",{className:"wc-wildcard-title",children:"WILD 
CARD"}),h.jsxs("div",{className:"wc-wildcard-subtitle",children:["Round 
",i.round]}),h.jsxs("div",{className:"wc-wildcard-multiplier",children:["x",is," 
POINTS"]}),h.jsxs("button",{type:"button",className:"wc-wildcard-flip-btn",onClick:()=>_(!0),children:["??"," 
Reveal"]}),h.jsx("button",{type:"button",className:"wc-wildcard-skip-btn",onClick:t,children:"Skip for now"})]})]}),h.j
sx("div",{className:"wc-wildcard-card-back",children:w?h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-mod
al-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Confirm Wild Card"]}),h.jsx("button",{
type:"button",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-confirm-b
ody",children:[h.jsx("div",{className:"wc-wildcard-confirm-date",children:new Date(w+"T00:00:00Z").toLocaleDateString("
en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}),h.jsx("div",{className:"wc-wildcard-confirm-games"
,children:L.map(B=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(B.homeTeam)&&h.jsx("img",{src:Kn(B.homeT
eam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.homeTeam}),h.j
sx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.awa
yTeam}),Kn(B.awayTeam)&&h.jsx("img",{src:Kn(B.awayTeam),alt:"",className:"wc-wildcard-day-flag"})]},B.matchKey))}),h.js
xs("div",{className:"wc-wildcard-confirm-note",children:["All points from your predictions on this day will be 
multiplied by ",h.jsxs("strong",{children:["�",is]}),"!"]}),R&&h.jsx("div",{className:"wc-save-error",children:R}),h.js
xs("div",{className:"wc-wildcard-confirm-actions",children:[h.jsx("button",{type:"button",className:"wc-wildcard-confir
m-btn",onClick:j,disabled:d,children:d?"Activating...":"? Confirm"}),h.jsx("button",{type:"button",className:"podium-sk
ip-btn",onClick:t,children:"Cancel"})]})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-heade
r",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Pick Your Day"]}),h.jsx("button",{type:"button
",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-pick-body",children:[
h.jsxs("p",{style:{color:"#b0c8e0",fontSize:"0.8rem",margin:"0 0 12px",lineHeight:1.5},children:["Choose one day in 
",h.jsxs("strong",{children:["Round ",i.round," (",i.label,")"]})," to get ",h.jsxs("strong",{children:["�",is]})," 
points on every match prediction you make that 
day."]}),h.jsx("div",{className:"wc-wildcard-days-list",children:c.map(B=>{const 
q=O.filter(le=>le.matchDate.startsWith(B));return 
h.jsxs("div",{className:"wc-wildcard-day-block",children:[h.jsx("div",{className:"wc-wildcard-day-header",children:new 
Date(B+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),q.length>0?h.jsx("div"
,{className:"wc-wildcard-day-games",children:q.map(le=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(le.h
omeTeam)&&h.jsx("img",{src:Kn(le.homeTeam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildca
rd-day-team",children:le.homeTeam}),h.jsx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{classNam
e:"wc-wildcard-day-team",children:le.awayTeam}),Kn(le.awayTeam)&&h.jsx("img",{src:Kn(le.awayTeam),alt:"",className:"wc-
wildcard-day-flag"})]},le.matchKey))}):h.jsx("div",{className:"wc-wildcard-day-no-games",children:"No group 
matches"}),h.jsxs("button",{type:"button",className:"wc-wildcard-select-btn",onClick:()=>b(B),children:["?"," Select 
this date"]})]},B)})})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podi
um-skip-btn",onClick:t,children:"Skip"})})]})})]})})})}),document.body)}function F4(){const[n,e]=S.useState(null),[t,s]
=S.useState(!0),[i,l]=S.useState(null),[c,d]=S.useState(!1),[p,y]=S.useState(!1),[_,w]=S.useState(!1),[b,R]=S.useState(
null),[P,O]=S.useState(""),[j,L]=S.useState(null),B=S.useRef(!1),q=S.useRef(0),le=S.useRef(!1);S.useEffect(()=>{const 
F=new URLSearchParams(window.location.search).get("join");F&&R(F)},[]),S.useEffect(()=>{if(!pr){s(!1);return}return 
Kj(pr,F=>{e(F),s(!1)})},[]),S.useEffect(()=>{if(!b||!n||!Wt)return;(async()=>{const 
F=wr(xt(Wt,"leagues"),ic("joinCode","==",b)),M=await Di(F);if(M.empty)O("Invalid or expired join code");else{const 
Te=M.docs[0].id,Ie=M.docs[0].data(),X=Ie.name;if(Ie.joinDeadline&&new 
Date(Ie.joinDeadline).getTime()<Date.now()){O("This league's entry period has 
closed"),R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3);return}await 
bn(nt(Wt,"users",n.uid),{leagueIds:sc(Te)}),O(`Joined league: ${X}`),Ie.type==="paid"&&((await c0(nt(Wt,"users",n.uid))
).data()?.stakesAcknowledged?.[Te]||L({id:Te,name:Ie.name,stake:Ie.stake||0,hostFeePercent:Ie.hostFeePercent||0,prizeSp
lits:Ie.prizeSplits||[]}))}R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3
)})()},[b,n,Wt]),S.useEffect(()=>{if(!Wt||!n){l(null),d(!1),y(!1),w(!1);return}return 
Lt(nt(Wt,"users",n.uid),F=>{const M=F.data()||{};l(M),d(!0);const Te=M.podiumPrediction,Ie=Date.now()>=new 
Date(f0).getTime(),X=Date.now()>=new Date(S_).getTime();!Te?.initial&&!Ie&&!Te?.dismissedAt?Date.now()-q.current>3e3&&y
(!0):X&&!Te?.final&&Date.now()-q.current>3e3&&y(!0);const ge=os(),Ee=ge?"round"+ge.round:null,je=Ee&&M.wildCards?.[Ee],
$=le.current||sessionStorage.getItem("wc_dismissed")===Ee;ge&&!je&&!$&&w(!0)})},[Wt,n]);const 
ue=V=>e(V),pe=async()=>{pr&&(await Hj(pr),e(null))},k=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1)},[]),I
=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1),Wt&&n&&i?.podiumPrediction?.dismissedAt==null&&bn(nt(Wt,"us
ers",n.uid),{"podiumPrediction.dismissedAt":Vn()}).catch(()=>{})},[Wt,n,i]);if(t)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading..."})})});if(!jR)return 
h.jsx("div",{className:"auth-screen",children:h.jsxs("div",{className:"panel 
auth-card",children:[h.jsx("h1",{children:"FWC26 
Predictor"}),h.jsx("p",{style:{marginTop:12,color:"#ff6060",textAlign:"center"},children:"Firebase is not 
configured."})]})});if(!n)return h.jsx(ZL,{firebaseAuth:pr,firestore:Wt,onAuth:ue});if(!c)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading profile..."})})});const 
A=Date.now()>=new Date(S_).getTime(),U=i?.podiumPrediction||null;return h.jsxs("div",{className:"app app--with-sidebar"
,children:[h.jsx(t4,{onLogout:pe,user:n}),P&&h.jsx("div",{className:"join-notification",children:P}),h.jsx("main",{clas
sName:"app-main",children:h.jsxs(RD,{children:[h.jsx(Aa,{path:"/",element:h.jsx(c4,{user:n,firestore:Wt,onOpenPodium:()
=>y(!0)})}),h.jsx(Aa,{path:"/matches",element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})}),h.jsx(Aa,{path:"/my-predictio
ns",element:h.jsx(k4,{user:n,firestore:Wt,userDoc:i,onOpenWildCard:()=>{sessionStorage.removeItem("wc_dismissed"),w(!0)
}})}),h.jsx(Aa,{path:"/teams",element:h.jsx(_4,{})}),h.jsx(Aa,{path:"/teams/:teamName",element:h.jsx(v4,{firestore:Wt})
}),h.jsx(Aa,{path:"/leaderboard",element:h.jsx(w4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/groups",element:h.jsx(b4,{f
irestore:Wt})}),h.jsx(Aa,{path:"/leagues",element:h.jsx(S4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/leagues/:leagueId"
,element:h.jsx(x4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/rules",element:h.jsx(C4,{})}),h.jsx(Aa,{path:"/profile",ele
ment:h.jsx(P4,{user:n,firestore:Wt,userDoc:i,onOpenPodium:()=>y(!0)})}),h.jsx(Aa,{path:"*",element:h.jsx(xD,{to:"/",rep
lace:!0})})]})}),p&&h.jsx(U4,{user:n,firestore:Wt,userDoc:i,existingPrediction:U,groupStageOver:A,onSave:k,onDismiss:I}
),_&&h.jsx(z4,{user:n,firestore:Wt,onClose:()=>{le.current=!0,sessionStorage.setItem("wc_dismissed",os()?"round"+os().r
ound:"done"),w(!1)},onActivate:(V,F)=>{le.current=!0,sessionStorage.setItem("wc_dismissed","round"+V),w(!1),l(M=>({...M
||{},wildCards:{...M?.wildCards||{},["round"+V]:{day:F,activatedAt:new Date().toISOString()}}}))}}),j&&h.jsx(p0,{league
:j,user:n,firestore:Wt,onConfirm:()=>L(null),onClose:()=>L(null)})]})}C1.createRoot(document.getElementById("root")).re
nder(h.jsx(S1.StrictMode,{children:h.jsx(ZD,{children:h.jsx(F4,{})})}));



```

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-group-card\" -SimpleMatch 2>&1 | Select-Object -First 1",
  "description": "Check if old class still exists in built JS"
}
```

**Output:**
```
(no output)
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2102.3s)

_Thinking:_

OK, so:
1. `wc-grid-2col` IS in the built JS ✓
2. `wc-match-card-teams` IS in the built JS ✓
3. `wc-group-card` is NOT in the built JS (no output means no match) ✓

So the code is definitely correctly built and deployed. The old group cards are completely gone.

But the user is saying it's STILL not working. Let me think about what else could be wrong.

Wait, I just realized something. The user's instruction mentioned "flex flex-row items-center justify-between w-full gap-2" - they specifically wanted `justify-between`. My CSS only has `gap: 4px` and no `justify-content: space-between`.

Maybe the issue is that without `justify-content: space-between`, the teams and score are all bunched in the center-left of the card, making them look like they're in a single blob. Adding `space-between` would push home team to left, score to center, away team to right - giving a cleaner horizontal layout.

Let me also re-read the user's instruction about the grid: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full" - they want `gap-4` which is a larger gap (1rem = 16px, which is bigger than my 8px).

And the cards need `w-full` to fill the grid cell.

Also, let me look at whether `justify-content: space-between` would actually work here. The flex container has 5 children: homeFlag, homeName, score, awayName, awayFlag. With `justify-content: space-between`, the space between each adjacent pair would be equal, pushing the first item to the left and last item to the right. But the user probably wants home team on the left and away team on the right with the score in the middle. 

For that, a better approach might be:
```
display: flex;
justify-content: space-between;
align-items: center;
```

This would push homeFlag + homeName to the far left, score to the center, and awayName + awayFlag to the far right.

Actually, no. `justify-content: space-between` with 5 flex items would distribute them as:
Left | space | item2 | space | item3 | space | item4 | space | Right

Which is not what we want. We want:
Home Flag + Home Name | space | Score | space | Away Name + Away Flag

For this to work with `space-between`, we'd need 3 logical groups. But we have 5 elements.

Let me think about this differently. The user wants the teams to appear side-by-side horizontally. The current CSS already does this with `display: flex` (row). 

Maybe the issue is simply visual - the elements are too close together. Adding a bit more `gap` and ensuring the team names are properly styled should fix this.

Actually, you know what - I think the user's real complaint might not have been fixed by the previous changes. Let me look at this from scratch.

The user said "Refactor WorldCupPanel.jsx to fix the secondary match card layouts so that teams display horizontally side-by-side on a single line instead of stacked vertically on top of each other."

"Stacked vertically" means each element is on its own line/row. For this to happen with `display: flex`, something must be forcing a column layout or wrapping.

Wait, could it be that `display: flex` is being overridden by something? Or maybe the card's parent is too narrow?

Actually, I just thought of something. What if the issue is that the wc-match-card has `display: flex; flex-direction: column` making the children stack vertically, and within that, `wc-match-card-teams` has `display: flex` which makes its children go horizontal. But what if the cards themselves are too narrow?

OK, let me just try the simplest approach: add `justify-content: space-between` and increase the gap on the grid. Let me also look at whether the `wc-match-card-teams` needs anything else.

Actually, I think the BIGGEST issue is that `wc-match-card-teams` doesn't have `width: 100%`. When it's inside a `flex-direction: column` parent, a flex child might not stretch to full width. Let me check...

A flex child in a `column` flex container has its cross-axis (horizontal) size determined by its content by default. So `wc-match-card-teams` would only be as wide as its content, not the full card width. This means the teams would be bunched in the center of the card.

If I add `width: 100%` to `wc-match-card-teams`, it would stretch to fill the card width, and then with `justify-content: space-between`, the teams would spread across the card.

Let me make these CSS changes:

1. `.wc-match-card-teams` - add `justify-content: space-between` and `width: 100%`
2. `.wc-grid-2col` - increase gap to 12px and ensure cards fill width
3. Increase card padding slightly for better visual spacing

Let me also add the grid gap change (12px instead of 8px) and maybe increase card padding.

Wait, but I already made the grid responsive. Let me refine it more.

Actually, let me think about what exact CSS will make the teams "display horizontally side-by-side on a single line instead of stacked vertically":

```css
.wc-match-card-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
}
```

With `width: 100%` and `justify-content: space-between`:
- HomeFlag(24px) + HomeName → left side
- Score/VS → middle (roughly)
- AwayName + AwayFlag(24px) → right side

Wait, `justify-content: space-between` distributes space evenly BETWEEN items, not just pushing first to left and last to right when there are 5 items. With 5 items:
```
[HomeFlag] [HomeName] [Score/VS] [AwayName] [AwayFlag]
```
space-between would put equal space between each pair, so:
```
[HomeFlag]---[HomeName]---[Score/VS]---[AwayName]---[AwayFlag]
```

That's not ideal. The user probably wants:
```
[HomeFlag HomeName] ------------ [Score/VS] ------------ [AwayName AwayFlag]
```

For this, we'd need to wrap homeFlag+homeName and awayName+awayFlag in their own containers. But the user's JSX doesn't have those wrappers.

Alternatively, we could use:
```css
.wc-match-card-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
```

This would put:
[HomeFlag] ↔ [HomeName] ↔ [Score] ↔ [AwayName] ↔ [AwayFlag]

With the flags being 24px wide and team names being roughly 40-60px, the result would spread pretty well across the card. The score/VS would end up roughly in the middle.

Actually, for a cleaner look, let me use two wrappers or just go with what works. The user will see the improvement when elements are spread across the card rather than bunched in one corner.

I think the best approach is:
1. Add `width: 100%` and `justify-content: space-between` to `wc-match-card-teams`
2. Increase the grid gap
3. Make sure `wc-match-card-meta` also has `width: 100%` and `justify-content: space-between`

Let me do this.

Let me look at the full rendered layout to understand the real problem. I'll serve the built site locally:

**Tool: bash**

**Input:**
```json
{
  "command": "Start-Process -NoNewWindow powershell -ArgumentList '-NoExit','-Command',\"Set-Location 'C:\\Users\\jayno\\Projects\\world-cup-2026'; npx vite preview --port 4173\" 2>&1",
  "description": "Start local preview server"
}
```

**Error:**
```
Tool execution aborted
```

---

## User

still  not doing it. Right at the start of this chat, it was working, now it is not. I would like you to look at the revisions

---

## User

still  not doing it. Right at the start of this chat, it was working, now it is not. I would like you to look at the revisions

---

## Assistant (Plan · DeepSeek V4 Flash Free · 20.1s)

_Thinking:_

The user is saying that at the start of the chat, the layout was working, but now it's not. They want me to look at the revisions.

Let me think about this. At the start of the chat, the original code had:
- Group cards with standings, crowd predictions, etc.
- A different layout

Then I made changes to remove those and replace with compact 2-column grid cards. The user says it was working at the start (the original layout) but now it's not (my new layout is broken).

So the issue is that my new code is broken. The user wants to go back to the original working code's approach, or fix my broken implementation.

Let me look at the revisions / git history to see what changed. But wait, the working directory is not a git repo. Let me check if there's any version control...

Actually, the user said "look at the revisions" - maybe they have a `dist/` backup or there's a git history I missed. Let me check for git.

Actually, let me re-read the conversation. The user's original layout was with group cards. They said "Matches still not sorted" and showed elements on top of each other. So even the original layout had problems. But they're saying it WAS working at the start of the chat.

Hmm, maybe the user is referring to the fact that the app used to display something reasonable (the full group card layout with standings etc.), and now with my changes, it's broken (overlapping elements).

Let me reconsider. The user wants me to look at what revisions/changes I've made and figure out what went wrong. Since we don't have git, I should compare the current state of the files with what they were before my changes.

But I don't have the original file contents. I only know what I changed. Let me think about what I changed in WorldCupPanel.jsx:

1. First (before the conversation I can see): Changed match rows from `<button>` to `<div role="button">`
2. Replaced the entire group stage rendering from group cards + standings to the compact 2-column grid of match cards
3. Reordered elements within the card (moved away FlagImg after away team name)

And in styles.css:
1. Added `.wc-grid-2col`, `.wc-match-card`, `.wc-match-card-teams`, `.wc-match-card-meta`, `.wc-match-card-venue`, `.wc-match-card-date`, `.wc-match-card-countdown` styles
2. Made the grid responsive (1 col < 500px, 2 col >= 500px)

The user says "it was working" at the start of the chat - they saw group cards which were functional but had overlap issues. Now my changes might have introduced a different, worse problem.

Wait, but the user's latest command was specifically about fixing the layout so "teams display horizontally side-by-side on a single line instead of stacked vertically." So they acknowledge the new card layout exists, but the team elements within the card are stacked vertically instead of horizontally.

If the teams are stacked vertically, that means `display: flex` on `wc-match-card-teams` is not being applied, or it's being overridden. Or the `wc-match-card-teams` class isn't being applied to the container.

Let me look at the built JS to see if the className is correct. Actually, I confirmed it is - `wc-match-card-teams` appears in the built JS.

But wait - what if there's a CSS specificity issue? What if the `wc-match-card-teams` selector is being overridden by another CSS rule?

Let me check... `wc-match-card-teams` is only defined in my CSS. No other selectors should override `display: flex`.

Unless... the FlagImg component's `display: block` is causing issues? No, a block element inside a flex container behaves as a flex item.

OK, I think the issue might be something completely different. Let me re-read the whole component to see if there's an error in the JSX that I introduced.

Wait, actually I need to look at this from a plan perspective. The user asked me to look at the revisions. I should figure out what went wrong and propose a fix. Let me think about what could cause elements to stack vertically instead of horizontally.

One possibility: if `wc-match-card-teams` has `flex-direction: column` instead of `flex-direction: row`. But my CSS doesn't set `flex-direction`, so it defaults to `row`. Unless there's a global rule...

Let me check if there's a global `* { flex-direction: column }` or something similar. No, the `* { box-sizing: border-box; letter-spacing: 0 }` exists but doesn't set flex-direction.

Another possibility: the `wc-match-card` has `display: flex; flex-direction: column`. Its children (wc-match-card-teams, wc-match-card-meta, wc-match-card-countdown) stack vertically within the card. But WITHIN `wc-match-card-teams`, the flex direction is row (default).

OK, let me just think about what the ultimate plan should be. The user wants:
1. Teams display horizontally side-by-side on a single line
2. Proper reordering (home flag, home name, score, away name, away flag)
3. A responsive grid

My current code should do all of this. The fact that it doesn't suggests something is fundamentally wrong.

Wait - I just had an idea. What if the `wc-match-card-teams` div is not actually rendering? What if there's a JavaScript error that prevents the new JSX from executing, and instead, the old layout is shown?

But I confirmed `wc-group-card` is NOT in the built JS. The old code is completely gone. So if the code runs, it should show the new cards. Unless a JS error crashes the entire component, showing a blank page.

The user didn't say the page is blank. They said elements are "on top of each other."

OK, I need to focus. Let me read the current state of the file to see what it looks like now, and compare with the original intent.

Actually, I'm in plan mode - I can read files. Let me read the current state of the WorldCupPanel.jsx and styles.css to understand exactly what code is there now.

You're right, I need to step back and look at the full picture. Let me read the current state of the files to understand exactly what's there.

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 100,
  "offset": 620
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
620:                   {getDisplayName(uid)} ({last?.[uid] || 0})
621:                 </span>
622:               );
623:             })}
624:           </div>
625:         </div>
626:       )}
627: 
628:       {filter === 'all' && (
629:         <div className="wc-stage-bar">
630:           {stageProgress.map((s) => (
631:             <div key={s.stage} className="wc-stage-bar-segment" title={`${s.label}: ${s.scored}/${s.total}`}>
632:               <div className="wc-stage-bar-fill" style={{ width: `${s.total > 0 ? (s.scored / s.total) * 100 : 0}%` }} />
633:             </div>
634:           ))}
635:         </div>
636:       )}
637: 
638:       {[1, 2, 3].map((day) => {
639:         if (filter !== 'all' && filter !== `round${day}`) return null;
640:         const dayMatches = grouped.group.filter((m) => m.matchday === day && isSearchMatch(m));
641:         if (dayMatches.length === 0) return null;
642:         return (
643:           <div key={day} className="wc-round-section">
644:             <div className="wc-round-title">Round {day}</div>
645:             <div className="wc-grid-2col">
646:               {dayMatches.map((m) => (
647:                 <div key={m.matchKey} className={`wc-match-card${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-card--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
648:                   <div className="wc-match-card-teams">
649:                     <FlagImg team={m.homeTeam} />
650:                     <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
651:                     {m.actual?.homeScore != null ? (
652:                       <span className="wc-inline-score wc-inline-score--actual">
653:                         {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
654:                       </span>
655:                     ) : m.predictions?.[user?.uid] ? (
656:                       <span className="wc-inline-score">
657:                         {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
658:                       </span>
659:                     ) : (
660:                       <span className="wc-vs">vs</span>
661:                     )}
662:                     <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
663:                     <FlagImg team={m.awayTeam} />
664:                   </div>
665:                   <div className="wc-match-card-meta">
666:                     <span className="wc-match-card-venue">{'\uD83C\uDFDF\uFE0F'} {m.venue}</span>
667:                     <span className="wc-match-card-date">{'\uD83D\uDCC5'} {formatMatchKickoff(m.matchDate)}</span>
668:                   </div>
669:                   <div className="wc-match-card-countdown">
670:                     <TileCountdown matchDate={m.matchDate} />
671:                   </div>
672:                 </div>
673:               ))}
674:             </div>
675:           </div>
676:         );
677:       })}
678:  
679:        {filter === 'all' && (
680:         <div className="wc-knockout-section">
681:           <h3 className="wc-section-title">{'\uD83C\uDFC6'} Knockout Stage</h3>
682:           {['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'].map((stage) => {
683:             const stageMatches = grouped[stage];
684:             if (!stageMatches || stageMatches.length === 0) return null;
685:             const isBracket = stage === 'quarterFinal' || stage === 'semiFinal' || stage === 'final' || stage === 'thirdPlace';
686:             return (
687:               <div key={stage} className={`wc-stage-group ${isBracket ? 'wc-stage-bracket' : ''}`}>
688:                 <h4 className="wc-stage-title">{STAGE_LABELS[stage]}</h4>
689:                 <div className={`wc-stage-matches ${isBracket ? 'wc-bracket-grid' : ''}`}>
690:                   {stageMatches.filter(isSearchMatch).map((m) => (
691:                     <div key={m.matchKey} className={`wc-match-row ${isBracket ? 'wc-match-row--bracket' : ''}${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-row--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
692:                       <span className="wc-match-status">{matchStatusIcon(m)}</span>
693:                       <span className="wc-match-teams">
694:                         <FlagImg team={m.homeTeam} />
695:                         <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
696:                         {m.actual?.homeScore != null ? (
697:                           <span className="wc-inline-score wc-inline-score--actual">
698:                             {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
699:                           </span>
700:                         ) : m.predictions?.[user?.uid] ? (
701:                           <span className="wc-inline-score">
702:                             {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
703:                           </span>
704:                         ) : (
705:                           <span className="wc-vs">vs</span>
706:                         )}
707:                         <FlagImg team={m.awayTeam} />
708:                         <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
709:                       </span>
710:                       <span className="wc-match-points">
711:                         {m.actual?.homeScore != null && sortedUserUids.map((uid) => {
712:                           const pts = m.points?.[uid];
713:                           return pts != null ? pointsBadge(pts, isExactScore(m.predictions?.[uid], m.actual)) : null;
714:                         })}
715:                       </span>
716:                       <span className="wc-match-date">{formatMatchKickoff(m.matchDate)}</span>
717:                     </div>
718:                   ))}
719:                 </div>

(Showing lines 620-719 of 793. Use offset=720 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 90,
  "offset": 822
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
822: .wc-grid-2col {
823:   display: grid;
824:   grid-template-columns: 1fr;
825:   gap: 8px;
826: }
827: @media (min-width: 500px) {
828:   .wc-grid-2col {
829:     grid-template-columns: 1fr 1fr;
830:   }
831: }
832: 
833: .wc-match-card {
834:   display: flex;
835:   flex-direction: column;
836:   gap: 4px;
837:   padding: 10px 12px;
838:   border: 1px solid rgba(255, 255, 255, 0.07);
839:   border-radius: 10px;
840:   background: rgba(255, 255, 255, 0.03);
841:   cursor: pointer;
842:   transition: border-color 0.15s, background 0.15s;
843: }
844: 
845: .wc-match-card:hover {
846:   border-color: rgba(24, 200, 255, 0.25);
847:   background: rgba(255, 255, 255, 0.06);
848: }
849: 
850: .wc-match-card--wc-highlight {
851:   border-color: #00ff66;
852:   background: rgba(0, 255, 102, 0.04);
853: }
854: 
855: .wc-match-card--wc-highlight:hover {
856:   background: rgba(0, 255, 102, 0.09);
857: }
858: 
859: .wc-match-card-teams {
860:   display: flex;
861:   align-items: center;
862:   gap: 4px;
863:   font-size: 0.78rem;
864:   font-weight: 600;
865:   color: #e8f0f8;
866: }
867: 
868: .wc-match-card-meta {
869:   display: flex;
870:   align-items: center;
871:   gap: 10px;
872:   font-size: 0.65rem;
873:   opacity: 0.55;
874: }
875: 
876: .wc-match-card-venue {
877:   white-space: nowrap;
878:   overflow: hidden;
879:   text-overflow: ellipsis;
880: }
881: 
882: .wc-match-card-date {
883:   white-space: nowrap;
884: }
885: 
886: .wc-match-card-countdown {
887:   font-size: 0.62rem;
888:   opacity: 0.7;
889: }
890: 
891: /* legacy row styles (used by knockout stage) */
892: .wc-match-row {
893:   display: grid;
894:   grid-template-columns: 20px 1fr auto auto;
895:   gap: 8px;
896:   align-items: center;
897:   width: 100%;
898:   padding: 8px 14px;
899:   margin: 0 0 4px;
900:   border: none;
901:   border-radius: 0;
902:   background: transparent;
903:   -webkit-appearance: none;
904:   appearance: none;
905:   color: #d0dcee;
906:   font-size: 0.72rem;
907:   text-align: left;
908:   cursor: pointer;
909:   transition: background 0.12s;
910: }
911: 

(Showing lines 822-911 of 7372. Use offset=912 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 16.2s)

_Thinking:_

OK, now I'm looking at the code carefully. The `wc-match-card-teams` has `display: flex` which should make children display in a row. The children are:
1. `FlagImg { team: m.homeTeam }` - renders an img with `width={24}` or a placeholder span
2. `span.wc-team-name` - text
3. `span.wc-inline-score` or `span.wc-vs` - score text
4. `span.wc-team-name` - text
5. `FlagImg { team: m.awayTeam }` - renders an img with `width={24}` or a placeholder span

These are all inline or inline-block level elements (img is inline, span is inline, but the img has `display: block` from `.wc-flag`).

Wait. The `.wc-flag` has `display: block`. Inside a flex container, a block-level child becomes a flex item. So this should work fine.

But hold on - the FlagImg component now renders differently in the BUILT code vs the source. In the source, FlagImg uses a `<img>` tag with class `wc-flag`. But in the built JS, the `Ka` function (which is the compiled FlagImg for the WorldCupPanel) does NOT use className `wc-flag`. Let me check:

```javascript
function Ka({team:n,size:e=20}){
  const t=Kn(n);
  return t?h.jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,height:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})
}
```

This `Ka` function does NOT use `wc-flag` className. It uses inline styles! And the span fallback also uses inline styles instead of `wc-flag-placeholder` className.

Wait - this is for MyPredictions, not WorldCupPanel. The FlagImg in WorldCupPanel should still use the component from the source code which has `className="wc-flag"` or `className="wc-flag-placeholder"`.

Actually, wait. In the WorldCupPanel, the FlagImg component is defined within the same file:

```jsx
function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="wc-flag-placeholder" />;
  return (
    <img
      className="wc-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
    />
  );
}
```

This should be compiled into the same chunk. Let me look for it in the built JS.

Hmm, actually, looking at the built JS output more carefully, I see this:

```javascript
function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,height:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}
```

But this is `Ka`, not the FlagImg from WorldCupPanel. Looking at the context, `Ka` has `size:e=20` default. The FlagImg in WorldCupPanel has `size=24` default. These are different components, compiled at different points.

Wait, I notice that `Ka` is used in the MyPredictions section (preceded by `function k4` which is the MyPredictions wrapper). So `Ka` is the MyPredictions FlagImg. The WorldCupPanel's FlagImg would be compiled separately.

OK, let me search for the WorldCupPanel's FlagImg in the built JS. It should use className "wc-flag". Let me check...

Actually, I think I need to look at what `g4` function is - that's the WorldCupPanel in the built code (it's referenced in the router: `element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})`).

The WorldCupPanel component `g4` should contain the FlagImg definition. Let me search for "wc-flag" in the built JS to see if it's there.

But actually, none of this matters for the layout issue. The FlagImg renders an `<img>` or a `<span>`, both of which are valid flex children. The fact that they use inline styles or classNames doesn't affect flex layout.

OK, I need to think about this completely differently. Let me consider that the REAL problem might be much simpler than I think.

What if the user is looking at the WRONG part of the page? What if the WC match cards ARE rendering correctly, but there's ANOTHER section on the page that's overlapping or broken?

Or what if the user is seeing the MyPredictions page instead of the WorldCupPanel?

Actually, wait. The user's original complaint included a diagram with "S. Korea, Canada, USA" in cards showing grouping with standings and crowd predictions. That's the group card layout from the original code. If there are NO MORE group cards in the code, the user CANNOT be seeing them. Unless the built HTML is not being served.

Let me verify one more time that the LIVE site is serving the new code:

Actually, we already confirmed this multiple times. The live site's index.html has the new hashed files, and those files contain wc-grid-2col and NOT wc-group-card.

Wait, I just realized something. Let me search for ANY reference to the old group-related class names in the built JS. If there are NONE, then the user is definitely seeing the new layout, and the issue is the new layout itself being broken.

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-group-card|wc-groups-grid|wc-standings\" -SimpleMatch -Quiet 2>&1",
  "description": "Triple check no old code in built JS"
}
```

**Output:**
```
False

```

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-D3N9rM8v.css\" -Pattern \"wc-group-card|wc-groups-grid|wc-standings\" -SimpleMatch -Quiet 2>&1",
  "description": "Check deployed CSS for old classes"
}
```

**Output:**
```
False

```

---

## User

to me it looks like the width of the area that Texas allowed has been pulled in could you have a look and see if that could be a culprit 

---

## Assistant (Plan · DeepSeek V4 Flash Free · 11.1s)

_Thinking:_

The user is saying that the width of the area that "Texas allowed" has been pulled in - they're referencing the `wc-round-section` or some parent container having a constrained width. "Texas allowed" is likely a garbled/autocorrected phrase - maybe "the text is allowed" or "the width that's allocated"?

Actually, I think the user might be saying "the width of the area that [something] has allowed has been pulled in" - meaning the container width is too narrow, causing content to stack vertically.

Wait, re-reading: "the width of the area that Texas allowed has been pulled in" - could this be "the width of the area that the text allows has been pulled in"? Or "the width of the area that exceeds allowed has been pulled in"?

More likely: "the width of the area that the CSS allows has been pulled in" - meaning a parent container has `width: auto` or is being constrained by something, making the wc-match-card-teams unable to fit in a row.

Let me think about what could cause the cards/teams to have a pulled-in/narrow width.

In the CSS, `wc-match-card` has `padding: 10px 12px` which is fine. The grid `wc-grid-2col` with `grid-template-columns: 1fr` should make each card fill the full width of the grid column.

But what about the `wc-round-section`? Let me check if that has any width constraints.

Actually, let me look at the parent container structure. The cards are rendered inside:
- `wc-round-section` > `wc-grid-2col` > `wc-match-card` > `wc-match-card-teams`

If `wc-round-section` has a max-width or if there are padding constraints on the panel, the cards could be too narrow.

Let me look at `wc-round-section` and `wc-panel` or the parent panel.

Also, the user's mention of "Texas allowed" - I bet they're saying "the width that the text allows has been pulled in." Meaning the flex container `wc-match-card-teams` is only as wide as its content because it doesn't have `width: 100%`. Since it's a flex child of `wc-match-card` (which is `flex-direction: column`), the default cross-axis alignment is `stretch`, so it should stretch to full width... unless there's something preventing that.

Actually wait - `align-items: stretch` is the default for flex containers. So in `wc-match-card` (flex-direction: column), the cross-axis is horizontal, meaning children should stretch to fill the width. So `wc-match-card-teams` should already be full width.

But the user says the width is "pulled in" - maybe the card itself is too narrow, or there's a max-width somewhere.

Let me read the parent CSS to understand any constraints.

Actually, I realize I'm in plan mode - I can only read and plan. Let me investigate the parent containers.

Let me look at the `wc-round-section` and see if there's any width constraints:

Let me investigate the parent container widths — that could indeed be the issue.

**Tool: grep**

**Input:**
```json
{
  "include": "styles.css",
  "pattern": "\\.wc-round-section|\\.wc-panel|\\.wc-section|max-width.*\\d",
  "path": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src"
}
```

**Output:**
```
Found 58 matches
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:
  Line 66:   max-width: 440px;

  Line 266:   max-width: 1400px;

  Line 271: .wc-panel {

  Line 359:   max-width: 320px;

  Line 695: @media (max-width: 800px) {

  Line 701: @media (max-width: 520px) {

  Line 778: .wc-round-section {

  Line 974:   max-width: 70px;

  Line 1016: .wc-section-title {

  Line 1105:   max-width: 440px;

  Line 1745: @media (max-width: 700px) {

  Line 1759: @media (max-width: 500px) {

  Line 1760:   .wc-team-name { max-width: 50px; }

  Line 1870:   max-width: calc(100vw - 56px);

  Line 1989:   max-width: 120px;

  Line 2061:   max-width: calc(100vw - 200px);

  Line 2092: @media (max-width: 1000px) {

  Line 2493: @media (max-width: 900px) {

  Line 2541:   max-width: 70px;

  Line 2582:   max-width: 80px;

  Line 2866:   max-width: 80px;

  Line 2887:   max-width: 200px;

  Line 3077:   max-width: 200px;

  Line 3283:   max-width: 300px;

  Line 3299:   max-width: 140px;

  Line 3516:   max-width: 480px;

  Line 3614:   max-width: 220px;

  Line 3782:   max-width: 320px;

  Line 3897:   max-width: 220px;

  Line 3969: @media (max-width: 768px) {

  Line 4006:     max-width: calc(100vw - 56px);

  Line 4759:   max-width: 180px;

  Line 4792:   max-width: 120px;

  Line 4881:   max-width: 420px;

  Line 4998:   max-width: 90px;

  Line 5152:   max-width: 180px;

  Line 5435: @media (max-width: 500px) {

  Line 5486:   max-width: 480px;

  Line 5565:   max-width: 160px;

  Line 5982: @media (max-width: 700px) {

  Line 5984:     max-width: calc(100% - 16px);

  Line 6024: @media (max-width: 500px) {

  Line 6197:   max-width: 100%;

  Line 6285: @media (max-width: 640px) {

  Line 6296: @media (max-width: 1024px) {

  Line 6300: @media (max-width: 700px) {

  Line 6550:   max-width: 420px;

  Line 6865:   max-width: 320px;

  Line 6921: @media (max-width: 700px) {

  Line 6923:     max-width: 80px;

  Line 6929:     max-width: calc(100% - 12px);

  Line 6967: @media (max-width: 640px) {

  Line 6971:   .wc-panel,

  Line 6989:     max-width: 50px;

  Line 7049: @media (max-width: 700px) {

  Line 7083:     max-width: 70px;

  Line 7125:   max-width: 440px;

  Line 7358: @media (max-width: 700px) {

```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 50,
  "offset": 434
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
434:   return (
435:     <section className="panel lobby-panel wc-panel" aria-label="World Cup 2026">
436:       <header className="wc-header">
437:         <div className="wc-title-row">
438:             <h2 className="wc-title">{'\uD83C\uDF0D'} World Cup 2026</h2>
439:         </div>
440:       </header>
441: 
442:       {nextKickoff && (
443:         <div className="wc-hero">
444:           <div className="wc-hero-teams">
445:             <FlagImg team={nextKickoff.homeTeam} size={56} />
446:             <div className="wc-hero-team">
447:               <span className="wc-hero-team-name">{nextKickoff.homeTeam}</span>
448:               <span className="wc-hero-rank">FIFA #{getTeamData(nextKickoff.homeTeam).fifaRank}</span>
449:             </div>
450:             <span className="wc-hero-vs">vs</span>
451:             <div className="wc-hero-team wc-hero-team--away">
452:               <span className="wc-hero-team-name">{nextKickoff.awayTeam}</span>
453:               <span className="wc-hero-rank">FIFA #{getTeamData(nextKickoff.awayTeam).fifaRank}</span>
454:             </div>
455:             <FlagImg team={nextKickoff.awayTeam} size={56} />
456:           </div>
457:           <div className="wc-hero-venue">{'\uD83C\uDFDF\uFE0F'} {nextKickoff.venue}</div>
458:           <div className="wc-hero-kickoff">{'\u26BD'} {formatMatchKickoff(nextKickoff.matchDate)}</div>
459:           <div className="wc-hero-countdown">{'\u23F0'} {countdown || '\u2014'}</div>
460:           <div className="wc-hero-prediction">
461:             <span className="wc-hero-pred-label">YOUR PREDICTION</span>
462:             {user && nextKickoff.predictions?.[user.uid] ? (
463:               <div className="wc-hero-pred-score-row">
464:                 <FlagImg team={nextKickoff.homeTeam} size={16} />
465:                 <span className="wc-hero-pred-score">
466:                   {nextKickoff.predictions[user.uid].homeScore} : {nextKickoff.predictions[user.uid].awayScore}
467:                 </span>
468:                 <FlagImg team={nextKickoff.awayTeam} size={16} />
469:               </div>
470:             ) : (
471:               <button type="button" className="wc-hero-pred-btn wc-hero-pred-btn--primary" onClick={() => openModal(nextKickoff.matchKey)}>
472:                 {'\u26A1'} Predict this match
473:               </button>
474:             )}
475:           </div>
476:         </div>
477:       )}
478: 
479:       <div className="wc-tiles-row">
480:         {[0, 1, 2].map((i) => (
481:           <div key={i} className={'wc-tile' + (upcomingMatches[i] ? ' wc-tile--upcoming' : ' wc-tile--placeholder')}>
482:             {upcomingMatches[i] ? (
483:               <button type="button" className="wc-tile-inner" onClick={() => openModal(upcomingMatches[i].matchKey)}>

(Showing lines 434-483 of 793. Use offset=484 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 6.9s)

_Thinking:_

Now I see important information:

1. `.wc-panel` at line 271 - let me check its styles
2. `.wc-round-section` at line 778 - let me check its styles
3. `.wc-section-title` at line 1016 - let me check
4. Line 1760: There's a media query `@media (max-width: 500px) { .wc-team-name { max-width: 50px; } }` - this is the old media query that applies max-width to `.wc-team-name`

And importantly, line 6971:
```
@media (max-width: 640px) {
  .wc-panel,
  ...
  .wc-match-team-name{max-width:50px}
  ...
```

These are the existing media queries that might affect `wc-match-card-teams` elements indirectly.

Let me check `wc-panel` styles at line 271 and `wc-round-section` at line 778:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 20,
  "offset": 266
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
266:   max-width: 1400px;
267:   margin-inline: auto;
268:   width: 100%;
269: }
270: 
271: .wc-panel {
272:   padding: 12px 16px 20px;
273:   background: linear-gradient(135deg, rgba(6, 20, 43, 0.95), rgba(10, 40, 80, 0.92));
274:   border: 1px solid rgba(255, 255, 255, 0.08);
275:   border-radius: 16px;
276: }
277: 
278: .wc-header { margin-bottom: 16px; }
279: 
280: /* ===== Hero Section ===== */
281: .wc-hero {
282:   display: flex;
283:   flex-direction: column;
284:   align-items: center;
285:   gap: 12px;

(Showing lines 266-285 of 7372. Use offset=286 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 15,
  "offset": 775
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
775:   color: #8aa0c0;
776: }
777: 
778: .wc-round-section {
779:   margin-bottom: 28px;
780: }
781: 
782: .wc-round-title {
783:   font-size: 0.85rem;
784:   font-weight: 800;
785:   letter-spacing: 0.14em;
786:   text-transform: uppercase;
787:   color: #8fcbff;
788:   margin: 0 0 10px 4px;
789: }

(Showing lines 775-789 of 7372. Use offset=790 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 50,
  "offset": 6960
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
6960:   .wc-save-pred-btn {
6961:     padding: 10px 20px;
6962:     min-height: 42px;
6963:     font-size: 0.82rem;
6964:   }
6965: }
6966: 
6967: @media (max-width: 640px) {
6968:   .app-main {
6969:     padding: 8px;
6970:   }
6971:   .wc-panel,
6972:   .panel.dash-panel,
6973:   .my-predictions {
6974:     padding: 8px 10px;
6975:   }
6976:   .wc-groups-grid {
6977:     grid-template-columns: 1fr;
6978:   }
6979:   .wc-match-row {
6980:     grid-template-columns: 12px 1fr auto;
6981:     font-size: 0.68rem;
6982:     padding: 4px 4px;
6983:     gap: 3px;
6984:   }
6985:   .wc-match-row .wc-match-status {
6986:     display: none;
6987:   }
6988:   .wc-match-team-name {
6989:     max-width: 50px;
6990:   }
6991:   .wc-group-card {
6992:     padding: 8px;
6993:   }
6994:   .wc-group-title {
6995:     font-size: 0.75rem;
6996:   }
6997:   .wc-standings-table {
6998:     font-size: 0.65rem;
6999:   }
7000:   .wc-standings-table th,
7001:   .wc-standings-table td {
7002:     padding: 3px 4px;
7003:   }
7004:   .wc-title {
7005:     font-size: 0.95rem;
7006:   }
7007:   .wc-filter-btn {
7008:     font-size: 0.65rem;
7009:     padding: 5px 8px;

(Showing lines 6960-7009 of 7372. Use offset=7010 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 10.5s)

_Thinking:_

Now I see the issue! Look at line 6976-6978:

```css
@media (max-width: 640px) {
  .wc-groups-grid {
    grid-template-columns: 1fr;
  }
```

These are the OLD styles. They still exist in the CSS. The `wc-groups-grid` class is no longer used in the JSX, so this won't affect anything.

But look at the media query at line 1760:
```css
@media (max-width: 500px) {
  .wc-team-name { max-width: 50px; }
}
```

This applies to `.wc-team-name` on screens <= 500px. This IS relevant because my cards use `.wc-team-name`. With max-width of 50px, the team names on small screens would be very narrow.

But the user's issue isn't about small screens - they said they're seeing elements on top of each other even on desktop.

Wait, I also see something important. Looking at `wc-panel` on small screens (line 6971-6974):
```css
@media (max-width: 640px) {
  .wc-panel {
    padding: 8px 10px;
  }
}
```

At <= 640px, the panel padding is reduced to 8px 10px. That's fine.

Now, let me think about what the user said: "the width of the area that Texas allowed has been pulled in" - I think they mean "the width of the area that the text allows has been pulled in." 

Actually, re-reading it again more carefully: "the width of the area that Texas allowed" - I think this might be "the width of the area that's allowed" with "Texas" being some garbled word. Or maybe "the width of the area that was allocated."

Hmm, but what if "Texas" is "text's" - "the width of the area that the text's allowed has been pulled in"? That doesn't make sense.

What if the user is saying "the width of the text area has been pulled in" - meaning the text container is too narrow?

Wait - maybe they're talking about the `wc-round-section` or `wc-panel` having a width that's too narrow. If the panel (`wc-panel`) has a specific `max-width` or `width`, it could constrain the cards.

Looking at `.wc-panel`:
```css
.wc-panel {
  padding: 12px 16px 20px;
  background: ...;
  border: 1px solid ...;
  border-radius: 16px;
}
```

There's no width constraint on `.wc-panel` itself. But the parent `.app-main` might have one.

Looking at line 2061: `.app-main { max-width: calc(100vw - 200px); }` - this is the main content area with a max-width of viewport minus sidebar width (200px). So on a 1920px screen, it's 1720px wide. On a 768px screen, it's 568px wide.

Actually, wait - line 4006 shows: `@media (max-width: 768px) { .app-main { max-width: calc(100vw - 56px); } }` - on smaller screens with collapsed sidebar, the main content area is only 56px less than viewport.

These widths should be plenty for the cards.

OK, I think I need to understand what the user actually means. Let me try a completely different approach. Maybe the cards ARE rendering correctly, but the user's browser is not actually loading the new code. 

Wait, I just realized something. Let me check: is there a service worker that might be caching the old app?

Let me check the dist/index.html to see:

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\index.html"
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\dist\index.html</path>
<type>file</type>
<content>
1: <!doctype html>
2: <html lang="en">
3:   <head>
4:     <meta charset="UTF-8" />
5:     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
6:     <meta name="theme-color" content="#06142b" />
7:     <meta name="application-name" content="World Cup 2026 Predictor" />
8:     <meta name="mobile-web-app-capable" content="yes" />
9:     <meta name="apple-mobile-web-app-capable" content="yes" />
10:     <meta name="apple-mobile-web-app-title" content="WC2026" />
11:     <title>FWC26 Predictor</title>
12:     <script type="module" crossorigin src="/assets/index-19rDVJwF.js"></script>
13:     <link rel="stylesheet" crossorigin href="/assets/index-D3N9rM8v.css">
14:   </head>
15:   <body>
16:     <div id="root"></div>
17:   </body>
18: </html>

(End of file - total 18 lines)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 6.9s)

_Thinking:_

OK so there's no service worker registration. Good.

Let me now try to actually SEE the page by running vite preview and opening it in my browser... but I can't automate a visual check.

Let me take one more approach - let me REALLY carefully review the `wc-match-card-teams` CSS to make sure there's no issue with the flex layout.

```css
.wc-match-card-teams {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8f0f8;
}
```

This should make children display horizontally. The default `flex-direction` is `row`. The default `flex-wrap` is `nowrap`. All children should be on one line.

But wait - the user mentioned the "width of the area that Texas allowed has been pulled in." If "Texas" was meant to be "text"...

OK, I think I finally understand. The user is saying that the container width is too narrow, so the flex items wrap to the next line. With `flex-wrap: nowrap` (default), they wouldn't wrap, but they would overflow. It could look like they're "on top of each other" if items overflow and overlap.

But there's no `overflow: visible` or `position: relative` on the card that would cause overlap. The default `overflow: visible` would just show the overflowing content outside the card boundaries.

Hmm, let me reconsider. What if `wc-match-card-teams` has `display: flex` but it's NOT being applied because of a CSS specificity issue? What if there's ANOTHER `.wc-match-card-teams` rule in the CSS that I haven't seen?

Let me search for all occurrences:

**Tool: grep**

**Input:**
```json
{
  "include": "*.css",
  "pattern": "wc-match-card-teams",
  "path": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src"
}
```

**Output:**
```
Found 1 matches
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:
  Line 859: .wc-match-card-teams {

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 24.9s)

_Thinking:_

Only one occurrence. So there's no rule overriding it.

Let me think about this from a completely different perspective. The user said "it was working" at the start of the conversation. The only thing that changed between "working" and "not working" is my code changes.

My changes:
1. Replaced the OLD group card JSX with new card JSX (lines 638-677)
2. Added new CSS classes (wc-grid-2col, wc-match-card, wc-match-card-teams, etc.)

The OLD code (before my changes) rendered the group section differently. If the app stopped working after my changes, then either:
- The new JSX has a bug
- The new CSS has a conflict or isn't applied
- The page is still serving the old version

Since we've confirmed the built JS/CSS has the new code, and the deployed HTML references the new files, options 1 or 2 are most likely.

Let me look at the JSX more carefully for syntax errors. I need to verify that the compiled JS matches what I expect.

Actually, wait. Let me look at the original code that was at lines 638-677 before my changes. Maybe the issue is that I removed or broke some state management or data flow.

Let me look at the full file from the beginning to check if there's any dependency I might have broken. Specifically, I need to look at the old code path for rendering group matches.

Actually, I don't have the original code. But let me check the compiled JS to see if the structure makes sense.

Actually, let me focus on what the user's latest hint means. They said "the width of the area that Texas allowed has been pulled in could you have a look and see if that could be a culprit"

I think they might be saying "the width of the text area has been pulled in" meaning the team name text container is too narrow, causing wrapping or truncation issues.

Or more specifically, maybe they're saying the card itself has `width: auto` and is only as wide as its content, not filling the grid cell. This could be because the grid column is not configured properly.

Let me check the `wc-grid-2col` CSS:
```css
.wc-grid-2col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
@media (min-width: 500px) {
  .wc-grid-2col {
    grid-template-columns: 1fr 1fr;
  }
}
```

`grid-template-columns: 1fr` means each column takes 1 fraction of the available space. With `gap: 8px`, the grid cells should be full width (minus panel padding). The cards inside these cells should stretch to fill the cell because grid items stretch by default (`align-items: stretch`).

Wait, but `wc-match-card` is `display: flex; flex-direction: column`. A flex item inside a grid cell should stretch to fill the cell by default (`align-items: stretch`).

Hmm, but what if there's no explicit `width: 100%` on the card? In a grid, item stretching happens via `align-items` (column axis) and `justify-items` (row axis). By default, `align-items: stretch` and `justify-items: stretch`. So the card should stretch to fill both axes.

OK, let me try something. What if the problem is that the cards look narrow because the content doesn't fill the card width? The `wc-match-card-teams` flex container has `gap: 4px` and no `justify-content`. So the 5 items are bunched together on the left side of the card, making it look like the card is narrow.

If I add `justify-content: space-between` and `width: 100%`, the items would spread across the full card width.

But the user said "on top of each other" which sounds like vertical stacking, not just bunched together. Hmm.

Let me just propose the plan I think will work:

1. Add `width: 100%` and `justify-content: space-between` to `wc-match-card-teams` - this spreads the teams across the card
2. Add `width: 100%` and `justify-content: space-between` to `wc-match-card-meta` - spreads venue/date across card
3. Increase grid gap to 12px
4. Increase card padding slightly

This should give better visual separation and prevent any appearance of "stacking."

Actually, wait. I just had a critical realization. Let me look at how FlagImg renders. In the WorldCupPanel.jsx:

```jsx
function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="wc-flag-placeholder" />;
  return (
    <img
      className="wc-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
    />
  );
}
```

The image has `width={size}` and `height={size * 0.75}`. With `size=24`, the image is 24x18. The `wc-flag` CSS has:
```css
.wc-flag {
  flex: 0 0 auto;
  border-radius: 2px;
  display: block;
}
```

`flex: 0 0 auto` means the flag doesn't grow or shrink, and its base size is its intrinsic size. This should be fine.

But wait - the `FlagImg` with `size=24` is DEFINED in the component. However, in the KNOCKOUT stage section (lines 693-708), the JSX also uses `FlagImg` but the knockout uses `.wc-match-row` with different layout. That's fine.

OK, I'm going in circles. Let me just present a clean plan to the user based on my analysis.

The key issues I can identify:
1. `wc-match-card-teams` needs `width: 100%` and `justify-content: space-between` to spread items
2. `wc-match-card-meta` needs `width: 100%` and `justify-content: space-between` to spread items
3. The card/grid spacing might need adjustment

But the user specifically mentioned "the width of the area that Texas allowed" - I think they see the cards are too narrow. The reason could be:
- The `wc-panel` has `padding: 12px 16px 20px` (16px on each side)
- The `app-main` has padding as well
- On smaller screens, the padding is reduced

Let me think about specific widths. On a 375px phone:
- The app has `padding: 16px` on each side
- Then at 640px media query, `app-main` padding is `8px`
- The panel padding is `8px 10px`
- So there's 8 + 8 + 10 + 10 = 36px of padding
- Available width for cards: 375 - 36 = 339px
- With 2-column grid (at >=500px, but phone is narrower), it's 1 column
- Each card: 339px wide (full width)

That should be enough. With `max-width: 70px` on `.wc-team-name`, each name gets 70px. Two names = 140px. Two flags = 48px. Score/vs = ~20px. Gap = 12px (3 gaps * 4px). Total: ~220px. Fits in 339px.

So on a phone, with 1 column, the cards should be wide enough. 

Unless... the user is talking about the card box being somehow narrower than the available width. That shouldn't happen with grid `1fr`.

Actually, maybe the user is using a different device or the sidebar is taking space. Let me check the `app-main` width constraint:

```css
@media (max-width: 768px) {
  .app-main {
    max-width: calc(100vw - 56px);
  }
}
```

On a 768px screen: 768 - 56 = 712px. The sidebar takes 56px. That's still plenty.

OK, I'll just make a plan that addresses the specific items the user asked for in their refactoring request:

1. Teams side by side: Ensure `wc-match-card-teams` uses `display: flex` with `width: 100%` and proper justification
2. Element order: Already fixed (home flag → home name → score → away name → away flag)
3. Responsive grid: 1 column on mobile, 2 on desktop

The likely root cause of "still not working" is that my previous CSS changes weren't sufficient - specifically the flex container wasn't filling the card width and items were bunched together.

Let me make a plan.

I think I understand now. You're saying the card's width is being constrained — pulled too narrow, so the flex items inside don't have room and look stacked. Let me verify the structure:

The `wc-match-card` sits inside a grid cell. The `wc-match-card-teams` is a flex child of that card. The problem is likely that `wc-match-card-teams` doesn't have `width: 100%` and `justify-content: space-between`, so its children stay bunched on the left, making the card look narrow.

**Plan:**

1. **`styles.css` — Expand `wc-match-card-teams`**  
   Add `width: 100%; justify-content: space-between;` so the teams stretch across the full card width instead of bunching left.

2. **`styles.css` — Expand `wc-match-card-meta`**  
   Add `width: 100%; justify-content: space-between;` so venue/date also spread across the card.

3. **`styles.css` — Increase grid gap**  
   Change `gap: 8px` → `gap: 12px` on `wc-grid-2col` for better visual separation.

4. **`styles.css` — Remove stale media-query rules**  
   There are leftover rules at `@media (max-width: 640px)` targeting `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table`, `.wc-match-team-name` — classes that no longer exist. These shouldn't affect anything, but let's clean them up to avoid confusion.

5. **Build + Deploy**

The core fix is #1: without `width: 100%` the flex container is only as wide as its content, so on any screen where the content is narrower than the card, things look "pulled in."

Ready to execute?

---

## User

Korea Republic
S. Korea
vs
Czechia
Czechia
🏟️ Estadio Guadalajara
⚽ 11 Jun, 1:00 am
6d 6h 43m 53s
Korea Republic
1 : 2
Czechia  that is literaly how its presented 

---

## Assistant (Plan · DeepSeek V4 Flash Free · 24.0s)

_Thinking:_

Now I can see the exact issue! The user showed me the actual rendered output:

```
Korea Republic
S. Korea
vs
Czechia
Czechia
🏟️ Estadio Guadalajara
⚽ 11 Jun, 1:00 am
6d 6h 43m 53s
Korea Republic
1 : 2
Czechia
```

So the problem is clear now. The elements ARE stacking vertically instead of horizontally. Let me analyze:

1. "Korea Republic" - this is the full team name (NOT `shortTeam` output, which would be "S. Korea")
2. "S. Korea" - this IS `shortTeam` output
3. "vs"
4. "Czechia" - this is the full team name
5. "Czechia" - this IS `shortTeam` output
6. Then the venue/date/countdown lines

Wait, that doesn't match what I'd expect. Let me re-read the output:

```
Korea Republic
S. Korea
vs
Czechia
Czechia
🏟️ Estadio Guadalajara
⚽ 11 Jun, 1:00 am
6d 6h 43m 53s
Korea Republic
1 : 2
Czechia
```

So there are TWO team name entries per team - one with the full name "Korea Republic" and one with "S. Korea" (shortTeam output). And then at the bottom there's another "Korea Republic 1 : 2 Czechia" line.

This doesn't look like my card layout at all. My card layout should be:
```
🏴󠁧󠁢󠁷󠁬󠁳󠁧 S. Korea vs Czechia 🇨🇿
🏟️ Estadio Guadalajara  📅 11 Jun, 1:00 am
6d 6h 43m 53s
```

Wait, this looks like the user is seeing both:
1. The `wc-match-card-teams` section (with FlagImg + shortTeam name + score/vs + shortTeam name + FlagImg)
2. AND separately, the individual elements also rendering

Actually, I think what the user is showing me is the rendered DOM structure, not visually how it appears. Let me re-read...

No, the user is showing me the actual visual output. Each element is on its own line. This means the elements within `wc-match-card-teams` ARE stacking vertically.

But why? The CSS has `display: flex` with default `flex-direction: row`. Unless... the flex direction is being overridden, OR the elements are not actually inside the flex container.

Wait! I just realized something critical. Look at the output again:

```
Korea Republic    <- This is NOT shortTeam output. shortTeam("Korea Republic") = "S. Korea"
S. Korea          <- This IS shortTeam output "S. Korea"
vs                <- The vs text
Czechia           <- Full name
Czechia           <- shortTeam("Czechia") = "Czechia" (no shortening needed)
```

So EVERYTHING is rendering TWICE! The full team name AND the short team name! That means there are duplicate elements.

Let me re-read my JSX at line 648-663:

```jsx
<div className="wc-match-card-teams">
  <FlagImg team={m.homeTeam} />
  <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
  {m.actual?.homeScore != null ? (
    <span className="wc-inline-score wc-inline-score--actual">
      {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
    </span>
  ) : m.predictions?.[user?.uid] ? (
    <span className="wc-inline-score">
      {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
    </span>
  ) : (
    <span className="wc-vs">vs</span>
  )}
  <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
  <FlagImg team={m.awayTeam} />
</div>
```

This renders: FlagImg, shortTeam(home), score/vs, shortTeam(away), FlagImg

My code should show on one line: `[flag] S. Korea vs Czechia [flag]`

But the user is showing: Korea Republic, S. Korea, vs, Czechia, Czechia

This means there's ANOTHER rendering happening OUTSIDE my `wc-match-card-teams`. There must be code I didn't remove or there's duplicate rendering.

Wait - "Korea Republic" appears BEFORE "S. Korea" in the output. That's the FULL name. Then "S. Korea" is the shortTeam version. Then "Czechia" appears twice.

This means there are TWO sets of team names being rendered. One from my code (the short names) and ANOTHER set from somewhere else.

But I completely replaced the old group card code with my new code. Unless there's ANOTHER section of the page that also renders match data...

Actually, let me look at the user's output more carefully:

```
Korea Republic          <- Could be from FlagImg alt text?
S. Korea                <- shortTeam(homeTeam)
vs                      <- vs text
Czechia                 <- Could be from FlagImg alt text?
Czechia                 <- shortTeam(awayTeam)
🏟️ Estadio Guadalajara  <- venue line
⚽ 11 Jun, 1:00 am       <- date line
6d 6h 43m 53s           <- countdown
Korea Republic          <- ?
1 : 2                   <- actual score
Czechia                 <- ?
```

Wait, the last three lines show "Korea Republic 1 : 2 Czechia" - this looks like the OLD knockout/match-row rendering. But this is for a group stage match...

OH WAIT. I think I understand now. The user is showing me TWO SEPARATE cards/rows:

1. First card/row: 
   - Korea Republic (team name without flag?)
   - S. Korea (team name)
   - vs
   - Czechia (team name without flag?)
   - Czechia (team name)

2. Second card/row:
   - 🏟️ Estadio Guadalajara
   - ⚽ 11 Jun, 1:00 am
   - 6d 6h 43m 53s

3. Third card/row:
   - Korea Republic 1 : 2 Czechia

OR maybe it's all one big card that's broken.

Hmm, I think the most likely explanation is that the user is looking at a **different section of the page** that also shows matches. Like the "My Predictions" page, or the Dashboard, or something else that wasn't changed.

Or wait - maybe the user is looking at the Dashboard (`/` route) which might show upcoming matches using a different component.

Actually, the user navigated to `/matches` in the app (the WorldCupPanel route). But maybe they're on the Dashboard page instead?

Let me think about this differently. The user's output shows elements that look like they're from the MyPredictions or Dashboard components, not from my WorldCupPanel code. For example, the MyPredictions component also renders match rows using `wc-match-row` class.

Actually wait, I see "🏟️ Estadio Guadalajara ⚽ 11 Jun, 1:00 am" - this looks like my `wc-match-card-meta` layout with venue emoji and date emoji. But the output shows each on its own line.

And "6d 6h 43m 53s" is from my `wc-match-card-countdown`.

So this IS my card. But the elements within `wc-match-card-teams` are on separate lines instead of one line.

The reason can only be:
1. The `display: flex` on `wc-match-card-teams` is NOT being applied
2. OR the flex direction is `column` instead of `row`
3. OR each element has `display: block` forcing a new line

Let me check if `display: block` on `.wc-flag` is causing issues... No, block-level elements inside a flex container become flex items and don't force new lines.

Let me check if there's a CSS rule that's overriding `display: flex` on `.wc-match-card-teams`. I already searched and found only one definition. But what about inherited CSS from parent?

Wait - `wc-match-card` has `display: flex; flex-direction: column`. Could this somehow affect the children? No, flex-direction only applies to direct children of the flex container. `wc-match-card-teams` is a child, and its own children are not affected by the parent's flex-direction.

OK, I'm going to look at this from a different angle. Let me see if maybe there's a stylesheet loading issue. Let me check the deployed CSS for `wc-match-card-teams`:

Now I see the problem clearly. The elements ARE stacking vertically. Let me check the actual deployed CSS to see if `wc-match-card-teams` has `display: flex`:

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-D3N9rM8v.css\" -Pattern \"wc-match-card-teams\" -SimpleMatch 2>&1 | Select-Object -First 1",
  "description": "Check deployed CSS for card-teams"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a3a987001vuuf0s9D0rBNuX

10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-groups-grid{grid-template-columns:1fr}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-card{padding:8px}.wc-group-title{font-size:.75rem}.wc-standings-table{font-size:.65rem}.wc-standings-table 
th,.wc-standings-table td{padding:3px 4px}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;mi
n-height:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-don
ut-wrap svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## User

the teams need to be on the same line

---

## Assistant (Plan · DeepSeek V4 Flash Free · 24.0s)

_Thinking:_

The user confirmed: "the teams need to be on the same line." They showed me the actual rendered output where each element is on its own line. This confirms the layout is broken and elements are stacking vertically instead of horizontally.

Now I need to figure out WHY the flex container isn't working. The CSS has `display: flex` on `wc-match-card-teams`, but the elements are still stacking vertically.

Wait - I just realized something. Looking at the user's output again:

```
Korea Republic    <- This appears FIRST
S. Korea          <- shortTeam output
vs
Czechia           <- This appears
Czechia           <- shortTeam output
```

There are TWO team name entries per team. This suggests that the `FlagImg` component is rendering the team name as text somewhere, OR there are duplicate elements being rendered.

Actually, let me re-examine the FlagImg component:

```jsx
function FlagImg({ team, size = 24 }) {
  const url = getFlagUrl(team);
  if (!url) return <span className="wc-flag-placeholder" />;
  return (
    <img
      className="wc-flag"
      src={url}
      alt={team}
      width={size}
      height={size * 0.75}
      loading="lazy"
    />
  );
}
```

This renders an `<img>` tag with `alt={team}`. The `alt` text would only show if the image fails to load. If the flagCDN images are failing (perhaps blocked or network issues), the alt text would be displayed.

Korea Republic - the `getFlagUrl("Korea Republic")` would look up `TEAM_FLAG_CODES["Korea Republic"]`. If the flag code exists but the image fails to load, the `<img>` would show the alt text "Korea Republic".

BUT, `.wc-flag` has `display: block`. Inside a flex container, `display: block` on an `<img>` shouldn't cause wrapping. However, if the image has `alt` text showing (because the image didn't load), and the CSS has `display: block`, the alt text would display as a block-level element, causing it to appear on its own line!

Wait, actually, even if the image doesn't load, the `<img>` element with `display: block` would still be in the flex container. The alt text would be rendered inside the img element. With `display: block`, the img element takes full width (or intrinsic size), which inside a flex container means it's a flex item.

But actually... `display: block` on an `<img>` with only `width={24}` and `height={18}` set via HTML attributes... The img would be 24x18 inline, but `display: block` makes it a block. Inside a flex container, this doesn't matter - flex items can be block-level.

Hmm, let me think about this differently. What if the issue is NOT with the `wc-match-card-teams` div, but rather with the HTML structure? 

Looking at the user's exact output:

```
Korea Republic
S. Korea
vs
Czechia
Czechia
🏟️ Estadio Guadalajara
⚽ 11 Jun, 1:00 am
6d 6h 43m 53s
Korea Republic
1 : 2
Czechia
```

Line 1: "Korea Republic" - This is the ALT TEXT from FlagImg component. The flag image failed to load, so the alt text shows.
Line 2: "S. Korea" - This is `shortTeam(m.homeTeam)` 
Line 3: "vs" - The vs text
Line 4: "Czechia" - This is the ALT TEXT from the away FlagImg
Line 5: "Czechia" - This is `shortTeam(m.awayTeam)`
Lines 6-7: venue and date
Line 8: countdown
Lines 9-11: "Korea Republic 1 : 2 Czechia" - This looks like a SEPARATE rendering!

So the FlagImg alt text IS showing because the flag images failed to load. But even so, the elements should be on one line within a flex container.

Unless the `display: flex` on `wc-match-card-teams` is NOT being applied. Let me check if there's a compilation issue or if the built CSS really contains the rule.

Wait, I searched the built CSS earlier and confirmed `wc-match-card-teams` is there. So the rule exists.

But there's another possibility: WHAT IF THE `wc-match-card-teams` div isn't even rendering? What if the JSX is producing different output than expected?

Let me look at the JSX again at lines 647-664:

```jsx
<div key={m.matchKey} className={`wc-match-card${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-card--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
  <div className="wc-match-card-teams">
    <FlagImg team={m.homeTeam} />
    <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
    {m.actual?.homeScore != null ? (
      <span className="wc-inline-score wc-inline-score--actual">
        {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
      </span>
    ) : m.predictions?.[user?.uid] ? (
      <span className="wc-inline-score">
        {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
      </span>
    ) : (
      <span className="wc-vs">vs</span>
    )}
    <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
    <FlagImg team={m.awayTeam} />
  </div>
  ...
```

Wait, this could be the issue! The `shortTeam("Korea Republic")` function:
```
if (name === 'Korea Republic') return 'S. Korea';
```

So the output for Korea Republic would be:
- FlagImg with alt="Korea Republic" (shows because image fails)
- span.wc-team-name: "S. Korea"
- span.wc-vs: "vs"  
- span.wc-team-name: "Czechia"
- FlagImg with alt="Czechia"

But in the user's output, "Korea Republic" comes BEFORE "S. Korea". The FlagImg RENDERS FIRST in the JSX. So the order is correct: FlagImg(korea republic alt text), then S. Korea text.

But the problem is EACH ELEMENT IS ON ITS OWN LINE. The flex container should put them all on one line.

UNLESS... maybe the elements are not in a flex container at all! What if my JSX editing left the `wc-match-card-teams` class off the div?

Let me re-read the current file to make sure the JSX has the correct className:

Looking at your output, I see two critical problems:

1. **Each element is on its own line** — the flex layout isn't working
2. **"Korea Republic" and "Czechia" appear from FlagImg `alt` text** — flags are failing to load (possibly blocked by flagcdn.com)

But the core issue is #1: `display: flex` on `wc-match-card-teams` isn't producing a horizontal row. Let me check the built JSX to see if the className is actually being applied:

**Tool: bash**

**Input:**
```json
{
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-19rDVJwF.js\" -Pattern \"wc-match-card-teams\" -SimpleMatch -Context 0,10 2>&1 | Select-Object -First 1",
  "description": "Find wc-match-card-teams in built JS"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a40705001A6ouZ9slBpD8kz

,h.jsx("span",{children:"Missed both score and outcome"})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-he
ro-card--podium",children:[h.jsx("div",{className:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-t
itle",children:"Podium Prediction"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rule
s-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.first]}),h.jsxs("div",{className:"r
ules-hero-detail",children:[h.jsx("strong",{children:"Winner"}),h.jsx("span",{children:"Pick the champion"})]})]}),h.js
xs("div",{className:"rules-hero-item",children:[h.jsxs("div",{className:"rules-hero-points",children:["+",cn.second]}),
h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Runner 
Up"}),h.jsx("span",{children:"Pick the runner-up"})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("d
iv",{className:"rules-hero-points",children:["+",cn.third]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.js
x("strong",{children:"3rd Place"}),h.jsx("span",{children:"Pick the third-place 
finisher"})]})]})]}),h.jsxs("div",{className:"rules-podium-split",children:[h.jsxs("div",{className:"rules-podium-sub r
ules-podium-sub--change",children:[h.jsx("span",{className:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{childr
en:[h.jsx("strong",{className:"rules-podium-sub-title",children:"Change"}),h.jsxs("p",{className:"rules-podium-sub-text
",children:["Revise your podium picks once after the group stage ends 
(",R4,")."]})]})]}),h.jsxs("div",{className:"rules-podium-sub rules-podium-sub--stick",children:[h.jsx("span",{classNam
e:"rules-podium-sub-icon",children:"??"}),h.jsxs("div",{children:[h.jsx("strong",{className:"rules-podium-sub-title",ch
ildren:"Stick"}),h.jsxs("p",{className:"rules-podium-sub-text",children:["Keep unchanged for the ",kc,"\\u00D7 
bonus!"]})]})]})]})]}),h.jsxs("div",{className:"rules-hero-card rules-hero-card--wildcard",children:[h.jsx("div",{class
Name:"rules-hero-icon",children:"??"}),h.jsx("h3",{className:"rules-hero-title",children:"Wild Card - Use It or Lose It
"}),h.jsxs("div",{className:"rules-hero-items",children:[h.jsxs("div",{className:"rules-hero-item",children:[h.jsxs("di
v",{className:"rules-hero-points",children:["�",is]}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("stro
ng",{children:"One Day Per Round"}),h.jsxs("span",{children:["Pick one matchday each round - all your points on that 
day are multiplied by 
",is,"!"]})]})]}),h.jsxs("div",{className:"rules-hero-item",children:[h.jsx("div",{className:"rules-hero-points rules-h
ero-points--zero",children:"-"}),h.jsxs("div",{className:"rules-hero-detail",children:[h.jsx("strong",{children:"Use 
It or Lose It"}),h.jsx("span",{children:"If you don't activate your Wild Card in a round, it doesn't carry over."})]})]
})]})]})]}),h.jsxs("div",{className:"rules-secondary-grid",children:[h.jsxs("div",{className:"rules-secondary-card pane
l",children:[h.jsxs("div",{className:"rules-secondary-header",children:[h.jsx("span",{className:"rules-secondary-icon",
children:"??"}),h.jsx("h4",{className:"rules-secondary-title",children:"Leaderboard"})]}),h.jsxs("div",{className:"rule
s-secondary-body",children:[h.jsxs("p",{children:[h.jsx("strong",{children:"Total Score"})," = match prediction points 
+ podium points"]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Tiebreaker:"})," Podium points decide the 
winner."]})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-seconda
ry-header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-second
ary-title",children:"Teams & Groups"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children
:[h.jsx("strong",{children:"48 teams"})," in 12 groups of 4. Top 2 per group + 8 best third-placed teams advance to 
Round of 32."]}),h.jsx("p",{children:"FIFA world rankings shown on each team 
card."})]})]}),h.jsxs("div",{className:"rules-secondary-card panel",children:[h.jsxs("div",{className:"rules-secondary-
header",children:[h.jsx("span",{className:"rules-secondary-icon",children:"??"}),h.jsx("h4",{className:"rules-secondary
-title",children:"Leagues"})]}),h.jsxs("div",{className:"rules-secondary-body",children:[h.jsxs("p",{children:[h.jsx("s
trong",{children:"Master League:"})," Auto-enrolled - compete against 
everyone."]}),h.jsxs("p",{children:[h.jsx("strong",{children:"Private Leagues:"})," Create with friends via invite 
link or join code."]})]})]})]})]})}function Ql(n){return n==="Bosnia and Herzegovina"?"Bosnia":n==="C�te 
d'Ivoire"?"C�te d'Ivoire":n==="Korea Republic"?"S. Korea":n==="IR Iran"?"Iran":n==="Cabo Verde"?"C. Verde":n==="Congo 
DR"?"Congo":n==="Saudi Arabia"?"Saudi Ar.":n==="Netherlands"?"Netherlands":n==="Switzerland"?"Switzerland":n==="Czechia
"?"Czechia":n==="T�rkiye"?"T�rkiye":n==="New Zealand"?"N. Zealand":n.length>9?n.slice(0,8)+".":n}const 
dN=n=>n.actual?.homeScore!=null?"??":Ha(n.matchDate)?"??":"?";function Ka({team:n,size:e=20}){const t=Kn(n);return t?h.
jsx("img",{src:t,alt:n,style:{width:e,height:e,borderRadius:3,verticalAlign:"middle"}}):h.jsx("span",{style:{width:e,he
ight:e,display:"inline-block",background:"rgba(255,255,255,0.06)",borderRadius:3,verticalAlign:"middle"}})}class D4 
extends S.Component{constructor(e){super(e),this.state={hasError:!1}}static 
getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("MyPredictions 
crashed:",e,t)}render(){return this.state.hasError?h.jsxs("div",{className:"my-predictions",style:{padding:32,textAlign
:"center"},children:[h.jsx("p",{style:{color:"#ff6b6b",fontSize:"1.1rem"},children:"Something went wrong loading your 
predictions."}),h.jsx("p",{style:{color:"#8aa0c0",fontSize:"0.85rem"},children:"Please try refreshing the 
page."})]}):this.props.children}}function k4(n){return h.jsx(D4,{children:h.jsx(j4,{...n})})}function j4({user:n,firest
ore:e,userDoc:t,onOpenWildCard:s}){const[i,l]=S.useState([]),[c,d]=S.useState(!1),[p,y]=S.useState(null),[_,w]=S.useSta
te({}),[b,R]=S.useState(null),[P,O]=S.useState(""),[j,L]=S.useState({}),[B,q]=S.useState(null),[le,ue]=S.useState(!1),[
pe,k]=S.useState(!1),[I,A]=S.useState({});S.useEffect(()=>!e||!n?void 
0:Lt(nt(e,"users",n.uid),G=>{y(G.data()||{})},G=>console.warn("UserDoc snapshot 
error",G)),[e,n]),S.useEffect(()=>e?Lt(xt(e,"users"),G=>{const 
W={};G.docs.forEach(ve=>{W[ve.id]=ve.data()}),A(W)},G=>console.warn("UsersMap snapshot error",G)):void 0,[e]),S.useEffe
ct(()=>e?Lt(xt(e,"worldCupPredictions"),G=>{l(G.docs.map(W=>({id:W.id,...W.data()}))),d(!0)},G=>{console.warn("MyPredic
tions snapshot error",G),d(!0)}):void 0,[e]);const U=S.useMemo(()=>{const D={};return 
i.forEach(G=>{D[G.matchKey]=G}),Ir.map(G=>{const W=D[G.matchKey]||{};return{...G,...W,id:W.id||G.matchKey,predictions:W
.predictions||{},actual:W.actual||{homeScore:null,awayScore:null},points:W.points||{}}})},[i]),V=S.useMemo(()=>n?U.filt
er(D=>D.predictions?.[n.uid]?.homeScore!=null).sort((D,G)=>{const W=["group","roundOf32","roundOf16","quarterFinal","se
miFinal","thirdPlace","final"],ve=W.indexOf(D.stage),we=W.indexOf(G.stage);return 
ve!==we?ve-we:(D.matchNumber||0)-(G.matchNumber||0)}):[],[U,n]),[F,M]=S.useState(()=>{const D=os();return D?`round${D.r
ound}`:"all"}),Te=S.useMemo(()=>V.filter(D=>D.stage==="group"),[V]),Ie=S.useMemo(()=>V.filter(D=>D.stage!=="group"),[V]
),X=S.useMemo(()=>p??t,[p,t]),ge=S.useMemo(()=>{const D=os();if(!D||!X)return null;const G="round"+D.round;return 
X.wildCards?.[G]?null:{round:D.round,label:D.label}},[X]),Ee=S.useMemo(()=>{const D=os();if(!D||!X)return null;const 
G="round"+D.round,W=X.wildCards?.[G];return 
W?{round:D.round,label:D.label,day:W.day}:null},[X]),je=!!os(),[$,C]=S.useState("");S.useEffect(()=>{const 
D=()=>{const W=new Date(f0).getTime()-Date.now();if(W<=0){C("");return}const 
ve=Math.floor(W/864e5),we=Math.floor(W%864e5/36e5),be=Math.floor(W%36e5/6e4),Re=Math.floor(W%6e4/1e3);C(`${ve}d ${we}h 
${be}m ${Re}s`)};D();const G=setInterval(D,1e3);return()=>clearInterval(G)},[]);const H=S.useMemo(()=>{const D=Object.e
ntries(I).filter(([ve])=>ve!==n?.uid&&I[ve]?.podiumPrediction),G={first:{},second:{},third:{}};D.forEach(([,ve])=>{cons
t we=ve.podiumPrediction.final||ve.podiumPrediction;we.first&&(G.first[we.first]=(G.first[we.first]||0)+1),we.second&&(
G.second[we.second]=(G.second[we.second]||0)+1),we.third&&(G.third[we.third]=(G.third[we.third]||0)+1)});const W=(ve,we
=3)=>Object.entries(ve).sort((be,Re)=>Re[1]-be[1]).slice(0,we);return{totalOthers:D.length,topFirst:W(G.first),topSecon
d:W(G.second),topThird:W(G.third)}},[I,n]),oe=p?.podiumPrediction,ye=oe?oe.final||oe:null,Pe=!!oe?.final,De=Pe&&oe.init
ial&&oe.final&&oe.initial.first===oe.final.first&&oe.initial.second===oe.final.second&&oe.initial.third===oe.final.thir
d,Ve=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)&&D.actual?.homeScore==null).sort((D,G)=>new 
Date(D.matchDate)-new Date(G.matchDate))[0]||null,[U]),Je=S.useMemo(()=>U.filter(D=>D.stage==="group"&&!Ha(D.matchDate)
&&D.actual?.homeScore==null&&D.predictions?.[n?.uid]?.homeScore==null).sort((D,G)=>new Date(D.matchDate)-new Date(G.mat
chDate)).slice(0,9),[U,n]),Qe=S.useMemo(()=>U.find(D=>D.matchKey===B)||null,[U,B]),zt=S.useCallback(async(D,G,W)=>{if(!
e||!n)return;const ve=nt(e,"worldCupPredictions",D);await bn(ve,{[`predictions.${n.uid}`]:{homeScore:Number(G),awayScor
e:Number(W)},updatedAt:Vn()}).catch(we=>console.warn("Prediction save 
failed",we))},[e,n]),tn=S.useCallback(async(D,G,W)=>{R(D),O(""),await zt(D,G,W),R(null),w(ve=>{const we={...ve};return 
delete we[D],we})},[zt]);if(S.useEffect(()=>{if(Je.length===0)return;const D=()=>{const 
W=Date.now(),ve={};Je.forEach(we=>{const Re=LR(we.matchDate).getTime()-W;if(Re<=0)ve[we.matchKey]="Deadline 
passed";else{const $e=Math.floor(Re/864e5),mt=Math.floor(Re%864e5/36e5),dn=Math.floor(Re%36e5/6e4),Ft=Math.floor(Re%6e4
/1e3);$e>0?ve[we.matchKey]=`${$e}d ${mt}h ${dn}m ${Ft}s`:mt>0?ve[we.matchKey]=`${mt}h ${dn}m 
${Ft}s`:ve[we.matchKey]=`${dn}m ${Ft}s`}}),L(ve)};D();const 
G=setInterval(D,1e3);return()=>clearInterval(G)},[Je]),!c)return h.jsx("div",{className:"my-predictions",children:h.jsx
("div",{className:"my-predictions-empty",children:"Loading..."})});const Q=Ve?A_(Ve.venue):null;return h.jsxs("div",{cl
assName:"my-predictions",children:[Je.length>0&&h.jsxs("div",{className:"my-pred-hero",children:[h.jsxs("div",{classNam
e:"my-pred-hero-title",children:["?"," Quick 
Predict"]}),h.jsx("div",{className:"my-pred-hero-grid",children:Je.map(D=>{const 
G=_[D.matchKey]||{home:"0",away:"0"},W=b===D.matchKey,ve=A_(D.venue);return h.jsxs("div",{className:"my-pred-hero-game"
,children:[h.jsxs("div",{className:"my-pred-hero-game-row",children:[h.jsxs("div",{className:"my-pred-hero-game-team",c
hildren:[h.jsx(Ka,{team:D.homeTeam,size:24}),h.jsx("span",{className:"my-pred-hero-game-name",children:D.homeTeam})]}),
h.jsxs("div",{className:"my-pred-hero-game-score-wrap",children:[h.jsx("input",{type:"number",min:"0",max:"20",classNam
e:"my-pred-hero-game-input",value:G.home,onChange:we=>w(be=>({...be,[D.matchKey]:{...be[D.matchKey],home:we.target.valu
e,away:be[D.matchKey]?.away??"0"}})),disabled:W}),h.jsx("span",{className:"my-pred-hero-game-colon",children:":"}),h.js
x("input",{type:"number",min:"0",max:"20",className:"my-pred-hero-game-input",value:G.away,onChange:we=>w(be=>({...be,[
D.matchKey]:{...be[D.matchKey],home:be[D.matchKey]?.home??"0",away:we.target.value}})),disabled:W})]}),h.jsxs("div",{cl
assName:"my-pred-hero-game-team my-pred-hero-game-team--right",children:[h.jsx(Ka,{team:D.awayTeam,size:24}),h.jsx("spa
n",{className:"my-pred-hero-game-name",children:D.awayTeam})]})]}),h.jsxs("div",{className:"my-pred-hero-game-footer",c
hildren:[h.jsxs("span",{className:"my-pred-hero-game-venue",children:["???"," ",ve?.stadium,", 
",ve?.city]}),h.jsxs("span",{className:"my-pred-hero-game-kickoff",children:["?"," 
",Os(D.matchDate)]}),h.jsxs("span",{className:"my-pred-hero-game-deadline",children:["?"," ",j[D.matchKey]||"..."]})]})
,h.jsxs("button",{type:"button",className:"my-pred-hero-game-confirm",onClick:()=>tn(D.matchKey,G.home,G.away),disabled
:W,children:[W?"?":"?"," Confirm"]})]},D.matchKey)})})]}),h.jsxs("div",{className:"my-pred-top-row",children:[h.jsx("di
v",{className:"my-pred-col",children:je&&ge?h.jsxs("div",{className:"my-pred-wc-tile",children:[h.jsx("button",{type:"b
utton",className:"my-pred-wc-info-btn",onClick:()=>ue(!0),children:"What's 
this?"}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:s,children:["?"," Activate 
Now"]})]}):je&&Ee?h.jsxs("div",{className:"my-pred-wc-tile my-pred-wc-tile--activated",children:[h.jsxs("div",{classNam
e:"my-pred-wc-tile-content",children:[h.jsxs("div",{className:"my-pred-wc-tile-header",children:["??"," Wild Card 
Active"]}),h.jsxs("div",{className:"my-pred-wc-tile-sub",children:["Round ",Ee.round," 
(",Ee.label,")"]}),h.jsx("div",{className:"my-pred-wc-tile-day",children:new Date(Ee.day+"T00:00:00Z").toLocaleDateStri
ng("en-US",{weekday:"short",month:"short",day:"numeric"})}),h.jsxs("div",{className:"my-pred-wc-tile-badge",children:["
�",is," 
Active"]})]}),h.jsxs("button",{type:"button",className:"my-pred-wc-activate-btn",onClick:()=>k(!0),children:["?"," 
Redeemed"]})]}):h.jsx("div",{className:"my-pred-wc-tile my-pred-wc-tile--hidden"})}),h.jsx("div",{className:"my-pred-co
l",children:Ve?h.jsxs("button",{type:"button",className:"my-pred-next-card",onClick:()=>q(Ve.matchKey),children:[h.jsxs
("div",{className:"my-pred-next-badge",children:["?"," NEXT MATCH"]}),h.jsxs("div",{className:"my-pred-next-teams",chil
dren:[h.jsx(Ka,{team:Ve.homeTeam,size:40}),h.jsxs("div",{className:"my-pred-next-team",children:[h.jsx("span",{classNam
e:"my-pred-next-name",children:Ve.homeTeam}),h.jsxs("span",{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.home
Team).fifaRank]})]}),h.jsx("span",{className:"my-pred-next-vs",children:"vs"}),h.jsxs("div",{className:"my-pred-next-te
am my-pred-next-team--away",children:[h.jsx("span",{className:"my-pred-next-name",children:Ve.awayTeam}),h.jsxs("span",
{className:"my-pred-next-rank",children:["FIFA #",ls(Ve.awayTeam).fifaRank]})]}),h.jsx(Ka,{team:Ve.awayTeam,size:40})]}
),h.jsxs("div",{className:"my-pred-next-venue",children:["???"," ",Q?.stadium,", 
",Q?.city]}),h.jsxs("div",{className:"my-pred-next-kickoff",children:["?"," 
",Os(Ve.matchDate)]}),h.jsxs("div",{className:"my-pred-next-countdown",children:["?"," ",j[Ve.matchKey]||"-"]}),h.jsxs(
"div",{className:"my-pred-next-prediction",children:[h.jsx("span",{className:"my-pred-next-pred-label",children:"YOUR P
REDICTION"}),Ve.predictions?.[n.uid]?h.jsxs("div",{className:"my-pred-next-pred-score-row",children:[h.jsx(Ka,{team:Ve.
homeTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve.predictions[n.uid].homeScore}),h.jsx("
span",{className:"my-pred-next-pred-colon",children:":"}),h.jsx("span",{className:"my-pred-next-pred-score",children:Ve
.predictions[n.uid].awayScore}),h.jsx(Ka,{team:Ve.awayTeam,size:16}),h.jsx("span",{className:"my-pred-next-pred-btn",ch
ildren:"Edit"})]}):h.jsxs("span",{className:"my-pred-next-pred-btn my-pred-next-pred-btn--primary",children:["?"," 
Predict this match"]})]})]}):h.jsx("div",{className:"my-pred-next-card 
my-pred-next-card--empty",children:h.jsxs("div",{className:"my-pred-next-empty",children:["?"," All matches 
complete!"]})})}),h.jsx("div",{className:"my-pred-col",children:ye?h.jsxs("div",{className:"my-pred-podium-card my-pred
-podium-card--extended",children:[h.jsxs("div",{className:"my-pred-podium-header",children:[h.jsxs("span",{className:"m
y-pred-podium-title",children:["??"," My Podium 
Picks"]}),$&&h.jsxs("span",{className:"my-pred-podium-lock",children:["??"," Locks ",$]})]}),h.jsx("div",{className:"my
-pred-podium-rows",children:[{key:"first",icon:"??",team:ye.first||oe?.first||oe?.initial?.first,pts:cn.first},{key:"se
cond",icon:"??",team:ye.second||oe?.second||oe?.initial?.second,pts:cn.second},{key:"third",icon:"??",team:ye.third||oe
?.third||oe?.initial?.third,pts:cn.third}].map(D=>h.jsxs("div",{className:"my-pred-podium-row",children:[h.jsx("span",{
className:"my-pred-podium-icon",children:D.icon}),h.jsx("span",{className:"my-pred-podium-team",children:D.team||"-"}),
h.jsxs("span",{className:"my-pred-podium-pts",children:["+",De?D.pts*kc:D.pts," 
pts"]})]},D.key))}),h.jsx("div",{className:"my-pred-podium-note",children:Pe?`Final picks locked${De?" - triple points 
active!":""}`:"Initial picks set - you can update after group stage"}),H.totalOthers>0&&h.jsxs("div",{className:"my-pre
d-others-section",children:[h.jsxs("div",{className:"my-pred-others-count",children:["??"," ",H.totalOthers," other 
player",H.totalOthers===1?"":"s"," submitted 
picks"]}),h.jsxs("div",{className:"my-pred-others-table",children:[h.jsxs("div",{className:"my-pred-others-row my-pred-
others-row--header",children:[h.jsx("span",{className:"my-pred-others-pos",children:"??"}),h.jsx("span",{className:"my-
pred-others-team",children:"Most picked"}),h.jsx("span",{className:"my-pred-others-count-col",children:"Picks"})]}),H.t
opFirst.map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos
",children:"1st"}),h.jsx("span",{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-c
ount-col",children:G})]},D)),H.topSecond.slice(0,1).map(([D,G])=>h.jsxs("div",{className:"my-pred-others-row",children:
[h.jsx("span",{className:"my-pred-others-pos",children:"2nd"}),h.jsx("span",{className:"my-pred-others-team",children:D
}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D)),H.topThird.slice(0,1).map(([D,G])=>h.jsxs("div
",{className:"my-pred-others-row",children:[h.jsx("span",{className:"my-pred-others-pos",children:"3rd"}),h.jsx("span",
{className:"my-pred-others-team",children:D}),h.jsx("span",{className:"my-pred-others-count-col",children:G})]},D))]})]
})]}):h.jsx("div",{className:"my-pred-podium-card 
my-pred-podium-card--empty",children:h.jsxs("div",{className:"my-pred-podium-empty",children:["??"," Set your podium 
picks from the Dashboard"]})})})]}),V.length===0?h.jsx("div",{className:"my-predictions-empty",children:"You haven't 
made any predictions yet."}):h.jsxs(h.Fragment,{children:[h.jsx("h2",{className:"my-predictions-heading",children:"My P
redictions"}),h.jsx("div",{className:"wc-filter-row",style:{marginBottom:12},children:h.jsx("div",{className:"wc-filter
-pills",children:[{value:"round1",label:"Round 1"},{value:"round2",label:"Round 2"},{value:"round3",label:"Round 
3"},{value:"all",label:"All Fixtures"}].map(D=>h.jsx("button",{type:"button",className:`wc-filter-btn 
${F===D.value?"is-active":""}`,onClick:()=>M(D.value),children:D.label},D.value))})}),Te.length>0&&(()=>{const 
D=[...new Set(Te.map(W=>W.matchDate.split("T")[0]))].sort(),G=F==="all"?D:D.filter(W=>Te.some(ve=>ve.matchDate.startsWi
th(W)&&ve.matchday===parseInt(F.replace("round",""))));return G.length===0?null:G.map(W=>{const 
ve=Te.filter(be=>be.matchDate.startsWith(W)),we=Ee?.day===W;return h.jsxs("div",{className:`my-pred-date-section${we?" 
my-pred-date-section--wildcard":""}`,children:[h.jsxs("div",{className:"my-pred-date-header",children:[h.jsx("span",{cl
assName:"my-pred-date-label",children:new Date(W+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short
",day:"numeric"})}),we&&h.jsxs("span",{className:"my-pred-date-badge",children:["?"," Wild 
Card"]})]}),h.jsx("div",{className:"my-pred-date-matches",children:ve.map(be=>{const 
Re=be.predictions[n.uid],$e=be.actual;return h.jsxs("div",{className:`wc-match-row${we?" wc-match-row--wc-highlight":""
}`,role:"button",tabIndex:0,onClick:()=>q(be.matchKey),onKeyDown:mt=>mt.key==="Enter"&&q(be.matchKey),children:[h.jsx("
span",{className:"wc-match-status",children:dN(be)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team
:be.homeTeam}),h.jsx("span",{className:"wc-team-name",children:Ql(be.homeTeam)}),$e?.homeScore!=null?h.jsxs("span",{cla
ssName:"wc-inline-score wc-inline-score--actual",children:[$e.homeScore," ","-"," 
",$e.awayScore]}):Re?h.jsxs("span",{className:"wc-inline-score",children:[Re.homeScore," ","-"," ",Re.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:be.awayTeam}),h.jsx("span",{className:"wc-team-name",childre
n:Ql(be.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:$e?.homeScore!=null&&be.points?.[n.uid]!=null
&&h.jsxs("span",{className:"my-pred-pts",children:["+",be.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",ch
ildren:Os(be.matchDate)})]},be.matchKey)})})]},W)})})(),F==="all"&&Ie.length>0&&h.jsxs("div",{className:"wc-knockout-se
ction",children:[h.jsxs("h3",{className:"wc-section-title",children:["??"," Knockout 
Stage"]}),["roundOf32","roundOf16","quarterFinal","semiFinal","thirdPlace","final"].map(D=>{const 
G=Ie.filter(W=>W.stage===D);return G.length===0?null:h.jsxs("div",{className:"wc-stage-group",children:[h.jsx("h4",{cla
ssName:"wc-stage-title",children:b_[D]}),h.jsx("div",{className:"wc-stage-matches",children:G.map(W=>{const 
ve=W.predictions[n.uid],we=W.actual;return h.jsxs("div",{className:"wc-match-row",role:"button",tabIndex:0,onClick:()=>
q(W.matchKey),onKeyDown:be=>be.key==="Enter"&&q(W.matchKey),children:[h.jsx("span",{className:"wc-match-status",childre
n:dN(W)}),h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:W.homeTeam}),h.jsx("span",{className:"wc-t
eam-name",children:Ql(W.homeTeam)}),we?.homeScore!=null?h.jsxs("span",{className:"wc-inline-score 
wc-inline-score--actual",children:[we.homeScore," ","-"," 
",we.awayScore]}):ve?h.jsxs("span",{className:"wc-inline-score",children:[ve.homeScore," ","-"," ",ve.awayScore]}):h.js
x("span",{className:"wc-vs",children:"vs"}),h.jsx(Ka,{team:W.awayTeam}),h.jsx("span",{className:"wc-team-name",children
:Ql(W.awayTeam)})]}),h.jsx("span",{className:"wc-match-points",children:we?.homeScore!=null&&W.points?.[n.uid]!=null&&h
.jsxs("span",{className:"my-pred-pts",children:["+",W.points[n.uid]]})}),h.jsx("span",{className:"wc-match-date",childr
en:Os(W.matchDate)})]},W.matchKey)})})]},D)})]})]}),Qe&&jo.createPortal(h.jsx("div",{className:"modal-backdrop",role:"p
resentation",onClick:()=>q(null),children:h.jsx("div",{className:"panel modal-panel 
wc-modal",role:"dialog","aria-modal":"true","aria-label":"Match details",onClick:D=>D.stopPropagation(),children:h.jsx(
BR,{match:Qe,user:n,userDoc:t,firestore:e,isAdmin:!1,matches:U,sortedUserUids:[],getDisplayName:()=>"",getUserColor:()=
>"",onSubmitPrediction:zt,onSubmitActual:()=>{},onUpdateTeams:()=>{},onClose:()=>q(null)})})}),document.body),pe&&Ee&&j
o.createPortal(h.jsx("div",{className:"modal-backdrop",role:"presentation",onClick:()=>k(!1),children:h.jsxs("div",{cla
ssName:"panel modal-panel wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card fixtures",onClick:D=
>D.stopPropagation(),children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-m
odal-title",children:["?"," Wild Card - ",new Date(Ee.day+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",mon
th:"short",day:"numeric"})]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>k(!1),children:"
?"})]}),h.jsx("div",{className:"wc-fixtures-body",children:Ir.filter(D=>D.matchDate.startsWith(Ee.day)).map(D=>h.jsxs("
div",{className:"wc-match-row wc-match-row--wc-highlight",role:"button",tabIndex:0,onClick:()=>{k(!1),q(D.matchKey)},on
KeyDown:G=>{G.key==="Enter"&&(k(!1),q(D.matchKey))},children:[h.jsx("span",{className:"wc-match-status",children:"?"}),
h.jsxs("span",{className:"wc-match-teams",children:[h.jsx(Ka,{team:D.homeTeam}),h.jsx("span",{className:"wc-team-name",
children:Ql(D.homeTeam)}),h.jsx("span",{className:"wc-vs",children:"vs"}),h.jsx("span",{className:"wc-team-name",childr
en:Ql(D.awayTeam)}),h.jsx(Ka,{team:D.awayTeam})]}),h.jsx("span",{className:"wc-match-date",children:Os(D.matchDate)})]}
,D.matchKey))}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium-skip-bt
n",onClick:()=>k(!1),children:"Close"})})]})}),document.body),le&&jo.createPortal(h.jsx("div",{className:"modal-backdro
p",role:"presentation",onClick:()=>ue(!1),children:h.jsxs("div",{className:"panel modal-panel 
wc-info-panel",role:"dialog","aria-modal":"true","aria-label":"Wild Card info",onClick:D=>D.stopPropagation(),children:
[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," 
Wild Card - �",is," Points"]}),h.jsx("button",{type:"button",className:"podium-modal-close",onClick:()=>ue(!1),children
:"?"})]}),h.jsxs("div",{className:"wc-info-body",children:[h.jsxs("p",{className:"wc-info-p",children:["Choose 
",h.jsx("strong",{children:"one day"})," in the current round. Every match you predict on that day earns 
",h.jsxs("strong",{children:["�",is]})," the normal 
points!"]}),h.jsx("p",{className:"wc-info-p",children:h.jsx("strong",{children:"Normal scoring (before 
multiplier):"})}),h.jsxs("ul",{className:"wc-info-list",children:[h.jsxs("li",{children:["Exact score  
",h.jsx("strong",{children:"5 pts"})," + ",h.jsx("strong",{children:"1 pt"})," per goal scored in the 
match"]}),h.jsxs("li",{children:["0-0 draw  ",h.jsx("strong",{children:"6 pts"})," (5 + 1 for 
nil-nil)"]}),h.jsxs("li",{children:["Correct outcome (not exact)  ",h.jsx("strong",{children:"2 
pts"})]}),h.jsxs("li",{children:["Wrong  ",h.jsx("strong",{children:"0 
pts"})]})]}),h.jsxs("p",{className:"wc-info-p",children:["On your Wild Card day, ",h.jsx("strong",{children:"all"})," 
of these are multiplied by ",h.jsxs("strong",{children:["�",is]}),". Pick the day with the fixtures you're most 
confident about!"]})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podium
-skip-btn",onClick:()=>ue(!1),children:"Got it"})})]})}),document.body)]})}function 
P4({user:n,firestore:e,userDoc:t,onOpenPodium:s}){const i=n?.email||"",l=n?.uid||"",c=n?.displayName||n?.email||"",[d,p
]=S.useState(!1),[y,_]=S.useState(""),[w,b]=S.useState(!1),[R,P]=S.useState(""),[O,j]=S.useState(!1),L=S.useRef(null);S
.useEffect(()=>{d&&L.current&&L.current.focus()},[d]);const 
B=()=>{_(n?.displayName||""),P(""),j(!1),p(!0)},q=async()=>{P(""),j(!1);const 
A=y.trim(),U=PR(A);if(!U.valid){P(U.error);return}b(!0);try{const 
V=wr(xt(e,"users"),ic("displayName","==",A));if((await Di(V)).docs.some(Te=>Te.id!==n.uid)){P("That name is already 
taken"),b(!1);return}await zi(nt(e,"users",n.uid),{displayName:A},{merge:!0});try{pr?.currentUser&&await 
J_(pr.currentUser,{displayName:A})}catch(Te){console.warn("Auth profile update failed 
(non-critical):",Te)}j(!0),p(!1),setTimeout(()=>j(!1),2e3)}catch(V){console.error("Display name save 
error:",V),P("Failed to save. Try again.")}finally{b(!1)}},le=()=>{p(!1),P("")},ue=t?.podiumPrediction,pe=ue?ue.final||
ue:null,I=!!ue?.final&&ue.initial&&ue.final&&ue.initial.first===ue.final.first&&ue.initial.second===ue.final.second&&ue
.initial.third===ue.final.third;return h.jsxs("div",{className:"wc-panel",style:{maxWidth:500,margin:"0 
auto"},children:[h.jsxs("h2",{className:"wc-panel-title",children:["??"," My Profile"]}),h.jsxs("div",{className:"profi
le-info",children:[h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",ch
ildren:"Display Name"}),h.jsx("div",{className:"profile-info-value",children:d?h.jsxs("div",{className:"sidebar-name-ed
it",style:{justifyContent:"flex-start"},children:[h.jsx("input",{ref:L,className:"sidebar-name-input",value:y,onChange:
A=>_(A.target.value),onKeyDown:A=>{A.key==="Enter"&&q(),A.key==="Escape"&&le()},maxLength:20,placeholder:"Display 
name"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--save",onClick:q,disabled:w||!y.trim
(),children:w?"...":"V"}),h.jsx("button",{type:"button",className:"sidebar-name-btn sidebar-name-btn--cancel",onClick:l
e,children:"?"}),R&&h.jsx("span",{className:"sidebar-name-error",children:R})]}):h.jsxs("span",{className:"profile-name
-display",onClick:B,children:[c,O?" V":" ??"]})})]}),h.jsxs("div",{className:"profile-info-row",children:[h.jsx("span",
{className:"profile-info-label",children:"Email"}),h.jsx("span",{className:"profile-info-value",children:i})]}),h.jsxs(
"div",{className:"profile-info-row",children:[h.jsx("span",{className:"profile-info-label",children:"User ID"}),h.jsx("
span",{className:"profile-info-value",style:{fontSize:"0.7rem",opacity:.6},children:l})]})]}),h.jsx("hr",{className:"pr
ofile-divider"}),h.jsx("h3",{className:"wc-panel-title",style:{fontSize:"1rem"},children:"Podium Picks"}),pe?h.jsxs("di
v",{className:"dash-podium-mini",style:{marginTop:8},children:[[{key:"first",icon:"??",team:pe.first,pts:cn.first},{key
:"second",icon:"??",team:pe.second,pts:cn.second},{key:"third",icon:"??",team:pe.third,pts:cn.third}].map(A=>h.jsxs("di
v",{className:"dash-podium-mini-row",children:[h.jsx("span",{className:"dash-podium-mini-medal",children:A.icon}),h.jsx
("span",{className:"dash-podium-mini-team",children:A.team}),h.jsx("span",{className:"dash-podium-mini-pts",children:I?
A.pts*kc:A.pts})]},A.key)),h.jsx("button",{type:"button",className:"wc-btn 
wc-btn--small",style:{marginTop:8},onClick:s,children:"Update 
Picks"})]}):h.jsxs("div",{style:{textAlign:"center",padding:"20px 
0"},children:[h.jsx("p",{style:{color:"#8aa0c0",marginBottom:12},children:"No podium picks set 
yet."}),h.jsx("button",{type:"button",className:"wc-btn",onClick:s,children:"Set Podium Picks"})]})]})}const 
M4="modulepreload",V4=function(n){return"/"+n},fN={},O4=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let 
y=function(_){return Promise.all(_.map(w=>Promise.resolve(w).then(b=>({status:"fulfilled",value:b}),b=>({status:"reject
ed",reason:b}))))};var c=y;document.getElementsByTagName("link");const 
d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");i=y(t.map(_=>{if(_=V4(_),_ 
in fN)return;fN[_]=!0;const 
w=_.endsWith(".css"),b=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${b}`))return;const R=docu
ment.createElement("link");if(R.rel=w?"stylesheet":M4,w||(R.as="script"),R.crossOrigin="",R.href=_,p&&R.setAttribute("n
once",p),document.head.appendChild(R),w)return new 
Promise((P,O)=>{R.addEventListener("load",P),R.addEventListener("error",()=>O(new Error(`Unable to preload CSS for 
${_}`)))})}))}function l(d){const p=new 
Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return 
i.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return e().catch(l)})};function 
R_({team:n,size:e=18}){const t=Kn(n);return t?h.jsx("img",{className:"podium-flag",src:t,alt:n,width:e,height:e*.75,loa
ding:"lazy"}):h.jsx("span",{className:"podium-flag-placeholder"})}function 
L4({value:n,onChange:e,teams:t,placeholder:s}){const[i,l]=S.useState(!1),c=S.useRef(null);return 
S.useEffect(()=>{const d=p=>{c.current&&!c.current.contains(p.target)&&l(!1)};return document.addEventListener("mousedo
wn",d),()=>document.removeEventListener("mousedown",d)},[]),h.jsxs("div",{className:"podium-dropdown",ref:c,children:[h
.jsxs("button",{type:"button",className:"podium-dropdown-trigger",onClick:()=>l(!i),children:[n?h.jsx(R_,{team:n,size:1
8}):h.jsx("span",{className:"podium-dropdown-placeholder-flag"}),h.jsx("span",{className:"podium-dropdown-label",childr
en:n||s}),h.jsx("span",{className:"podium-dropdown-arrow",children:i?"":""})]}),i&&h.jsx("div",{className:"podium-dro
pdown-menu",children:t.map(d=>h.jsxs("div",{className:`podium-dropdown-option${d===n?" is-selected":""}`,onClick:()=>{e
(d),l(!1)},children:[h.jsx(R_,{team:d,size:16}),h.jsx("span",{children:d})]},d))})]})}const 
mN=[{key:"first",label:"Winner",icon:"??",desc:"1st 
Place",pts:cn.first},{key:"second",label:"Runner-up",icon:"??",desc:"2nd 
Place",pts:cn.second},{key:"third",label:"Third Place",icon:"??",desc:"3rd Place",pts:cn.third}];function 
U4({user:n,firestore:e,existingPrediction:t,groupStageOver:s,onSave:i,onDismiss:l,userDoc:c}){const d=t?.initial?.first
||t?.first||"",p=t?.initial?.second||t?.second||"",y=t?.initial?.third||t?.third||"",w=t?.final||t?.finalizedAt?t.final
:{first:d,second:p,third:y},[b,R]=S.useState(w?.first||""),[P,O]=S.useState(w?.second||""),[j,L]=S.useState(w?.third||"
"),[B,q]=S.useState(!1),[le,ue]=S.useState(""),[pe,k]=S.useState(!1),I=S.useRef(new Date(f0).getTime()),A=()=>{const 
D=I.current-Date.now();return D<=0?null:{days:Math.floor(D/864e5),hours:Math.floor(D/36e5%24),minutes:Math.floor(D/6e4%
60),seconds:Math.floor(D/1e3%60)}},[U,V]=S.useState(A);S.useEffect(()=>{const D=setInterval(()=>V(A()),1e3);return()=>c
learInterval(D)},[]);const[F,M]=S.useState(!1),[Te,Ie]=S.useState(""),[X,ge]=S.useState(!1),[Ee,je]=S.useState(""),[$,C
]=S.useState(!1),H=S.useRef(null);S.useEffect(()=>{F&&H.current&&H.current.focus()},[F]);const oe=s&&t,ye=d&&b===d&&P==
=p&&j===y,Pe=D=>Om.filter(G=>!(G===b&&D!=="first"||G===P&&D!=="second"||G===j&&D!=="third")),De=async()=>{if(ue(""),!b|
|!P||!j){ue("Please select a team for all three podium positions.");return}if(b===P||b===j||P===j){ue("All three 
selections must be different teams.");return}q(!0);try{const D=nt(e,"users",n.uid),G=c||t||{},W={...G,first:b,second:P,
third:j,updatedAt:Vn()};oe?(W.initial=G.initial||{first:b,second:P,third:j},W.final={first:b,second:P,third:j},W.finali
zedAt=Vn()):(W.initial=G.initial||{first:b,second:P,third:j},G.createdAt||(W.createdAt=Vn())),await 
zi(D,{podiumPrediction:W},{merge:!0}),k(!0),setTimeout(()=>{i({first:b,second:P,third:j})},800)}catch(D){ue("Failed to 
save. Please try again."),console.warn("Podium save error",D)}finally{q(!1)}},Ve=cn.first+cn.second+cn.third,Je=Ve*kc,Q
e=b&&P&&j&&!B&&!pe,zt=()=>{Ie(n?.displayName||""),je(""),C(!1),M(!0)},tn=async()=>{je(""),C(!1);const 
D=Te.trim(),G=PR(D);if(!G.valid){je(G.error);return}ge(!0);try{const{collection:W,getDocs:ve,query:we,where:be}=await 
O4(async()=>{const{collection:dn,getDocs:Ft,query:Bt,where:fn}=await Promise.resolve().then(()=>YL);return{collection:d
n,getDocs:Ft,query:Bt,where:fn}},[]),Re=we(W(e,"users"),be("displayName","==",D));if((await 
ve(Re)).docs.some(dn=>dn.id!==n.uid)){je("That name is already taken"),ge(!1);return}await 
zi(nt(e,"users",n.uid),{displayName:D},{merge:!0}),pr?.currentUser&&await 
J_(pr.currentUser,{displayName:D}),C(!0),M(!1),setTimeout(()=>C(!1),2e3)}catch{je("Failed to save. Try 
again.")}finally{ge(!1)}},Q=()=>{M(!1),je("")};return 
jo.createPortal(h.jsx("div",{className:"podium-backdrop",role:"presentation",onClick:pe?l:void 
0,children:h.jsx("div",{className:"panel podium-modal",role:"dialog","aria-modal":"true","aria-label":"Podium predictio
n",onClick:D=>D.stopPropagation(),children:pe?h.jsxs("div",{className:"podium-saved",children:[h.jsx("span",{className:
"podium-saved-icon",children:oe?"?":"??"}),h.jsx("h2",{className:"podium-saved-title",children:oe?"Final Picks 
Saved!":"Picks Locked"}),h.jsx("p",{className:"podium-saved-text",children:oe?`Your final podium predictions are 
locked in.${ye?" Keeping the same three - triple points eligible!":""}`:"Your first, second, and third place picks are 
now locked and cannot be changed until the group stage 
ends."}),h.jsx("div",{className:"podium-saved-picks",children:mN.map(D=>{const 
G=D.key==="first"?b:D.key==="second"?P:j;return h.jsxs("div",{className:"podium-saved-row",children:[h.jsx("span",{chil
dren:D.icon}),h.jsx(R_,{team:G,size:22}),h.jsx("span",{children:G}),h.jsxs("span",{className:"podium-saved-pts",childre
n:["+",D.pts," pts"]})]},D.key)})}),h.jsx("div",{className:"podium-saved-name",children:h.jsxs("div",{className:"podium
-name-editor",children:[F?h.jsxs("div",{className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podi
um-name-input",value:Te,onChange:D=>Ie(D.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLe
ngth:20,placeholder:"Your display name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--sav
e",onClick:tn,disabled:X||!Te.trim(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn po
dium-name-btn--cancel",onClick:Q,children:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("
span",{className:"podium-name-label",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",c
lassName:"podium-name-edit-btn",onClick:zt,title:"Edit display 
name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Saved"]})]}),Ee&&h.jsx("div",{cla
ssName:"podium-name-error",children:Ee})]})}),h.jsx("button",{type:"button",className:"podium-continue-btn",onClick:l,c
hildren:"Continue"})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-header",children:[h.jsxs("h2
",{className:"podium-modal-title",children:["??"," Your Podium Prediction"]}),h.jsx("button",{type:"button",className:"
podium-modal-close",onClick:l,children:"?"})]}),h.jsx("div",{className:"podium-info",children:oe?h.jsxs("p",{className:
"podium-info-text",children:["The group stage is over! Lock in your ",h.jsx("strong",{children:"final"})," podium 
picks.",ye?" You kept the same three teams - if they match the actual results you get <strong>triple 
points</strong>!":" If you keep the same picks you had before and they're correct, you get <strong>triple 
points</strong>."]}):h.jsxs("p",{className:"podium-info-text",children:["Pick who will finish 
",h.jsx("strong",{children:"1st, 2nd, and 3rd"}),". Points: winner ",h.jsxs("strong",{children:["+",cn.first]}),", 
runner-up ",h.jsxs("strong",{children:["+",cn.second]}),", third ",h.jsxs("strong",{children:["+",cn.third]}),". Keep 
the same picks after the group stage and get ",h.jsxs("strong",{children:["�",kc]})," (up to ",Je," pts!)."]})}),h.jsx(
"div",{className:"podium-name-section",children:h.jsxs("div",{className:"podium-name-editor",children:[F?h.jsxs("div",{
className:"podium-name-edit-row",children:[h.jsx("input",{ref:H,className:"podium-name-input",value:Te,onChange:D=>Ie(D
.target.value),onKeyDown:D=>{D.key==="Enter"&&tn(),D.key==="Escape"&&Q()},maxLength:20,placeholder:"Your display 
name"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--save",onClick:tn,disabled:X||!Te.trim
(),children:X?"...":"V"}),h.jsx("button",{type:"button",className:"podium-name-btn podium-name-btn--cancel",onClick:Q,c
hildren:"?"})]}):h.jsxs("div",{className:"podium-name-display-row",children:[h.jsxs("span",{className:"podium-name-labe
l",children:["??"," ",Te||n?.displayName||"Player"]}),h.jsx("button",{type:"button",className:"podium-name-edit-btn",on
Click:zt,title:"Edit display name",children:"??"}),$&&h.jsxs("span",{className:"podium-name-saved",children:["V"," Save
d"]})]}),Ee&&h.jsx("div",{className:"podium-name-error",children:Ee})]})}),h.jsx("div",{className:"podium-picks",childr
en:mN.map(D=>{const G=D.key==="first"?b:D.key==="second"?P:j,W=D.key==="first"?R:D.key==="second"?O:L;return h.jsxs("di
v",{className:"podium-pick-row",children:[h.jsxs("div",{className:"podium-pick-label",children:[h.jsx("span",{className
:"podium-pick-icon",children:D.icon}),h.jsxs("div",{children:[h.jsx("span",{className:"podium-pick-title",children:D.la
bel}),h.jsxs("span",{className:"podium-pick-desc",children:[D.desc," - ",D.pts," 
pts"]})]})]}),h.jsx(L4,{value:G,onChange:W,teams:Pe(D.key).sort((ve,we)=>ve.localeCompare(we)),placeholder:"-- Select 
team --"})]},D.key)})}),h.jsxs("div",{className:"podium-points-summary",children:[h.jsxs("span",{children:["Max if 
correct: ",h.jsxs("strong",{children:["+",Ve," 
pts"]})]}),h.jsxs("span",{className:"podium-points-triple",children:["Triple if kept: 
",h.jsxs("strong",{children:["+",Je," 
pts"]})]})]}),h.jsx("div",{className:"podium-deadline",children:U?h.jsxs("span",{children:["?"," Locks Jun 10, 11:59 
PM BST \\u00B7 Closes in ",U.days>0?U.days+"d ":"",U.hours,"h ",U.minutes,"m 
",U.seconds,"s"]}):h.jsxs("span",{children:["??"," Podium locked"]})}),le&&h.jsx("div",{className:"podium-error",childr
en:le}),h.jsxs("div",{className:"podium-footer",children:[h.jsx("button",{type:"button",className:"podium-skip-btn",onC
lick:l,children:t?"Cancel":"Skip for now"}),h.jsx("button",{type:"button",className:"podium-save-btn",onClick:De,disabl
ed:!Qe,children:B?"Saving...":oe?"Lock in Final Picks":"Save Prediction"})]})]})})}),document.body)}function 
z4({user:n,firestore:e,onClose:t,onActivate:s}){const 
i=os(),l=i?bi.findIndex(B=>B.round===i.round):-1,c=l>=0?OR(l).filter(B=>new Date(B+"T23:59:59Z").getTime()>Date.now()):
[],[d,p]=S.useState(!1),[y,_]=S.useState(!1),[w,b]=S.useState(null),[R,P]=S.useState(""),O=Ir.filter(B=>B.stage==="grou
p");if(!i||c.length===0)return null;const j=async()=>{if(w){P(""),p(!0);try{await 
bn(nt(e,"users",n.uid),{["wildCards.round"+i.round]:{day:w,activatedAt:new 
Date().toISOString()}}),s&&s(i.round,w)}catch(B){console.error("WildCard activation error:",B),P("Failed to activate 
Wild Card. Please try again."),p(!1)}}},L=w?O.filter(B=>B.matchDate.startsWith(w)):[];return 
jo.createPortal(h.jsx("div",{className:"wc-modal-backdrop",onClick:t,children:h.jsx("div",{className:"panel wc-modal wc
-modal-wildcard",onClick:B=>B.stopPropagation(),children:h.jsx("div",{className:"wc-wildcard-card",children:h.jsxs("div
",{className:`wc-wildcard-card-inner${y?" wc-wildcard-card-flipped":""}`,children:[h.jsxs("div",{className:"wc-wildcard
-card-front",style:{backgroundImage:"url(/assets/wildcard.jpg)"},children:[h.jsx("div",{className:"wc-wildcard-card-fro
nt-overlay"}),h.jsxs("div",{className:"wc-wildcard-card-front-content",children:[h.jsx("div",{className:"wc-wildcard-st
amp",children:"?"}),h.jsx("h2",{className:"wc-wildcard-title",children:"WILD 
CARD"}),h.jsxs("div",{className:"wc-wildcard-subtitle",children:["Round 
",i.round]}),h.jsxs("div",{className:"wc-wildcard-multiplier",children:["x",is," 
POINTS"]}),h.jsxs("button",{type:"button",className:"wc-wildcard-flip-btn",onClick:()=>_(!0),children:["??"," 
Reveal"]}),h.jsx("button",{type:"button",className:"wc-wildcard-skip-btn",onClick:t,children:"Skip for now"})]})]}),h.j
sx("div",{className:"wc-wildcard-card-back",children:w?h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-mod
al-header",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Confirm Wild Card"]}),h.jsx("button",{
type:"button",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-confirm-b
ody",children:[h.jsx("div",{className:"wc-wildcard-confirm-date",children:new Date(w+"T00:00:00Z").toLocaleDateString("
en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}),h.jsx("div",{className:"wc-wildcard-confirm-games"
,children:L.map(B=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(B.homeTeam)&&h.jsx("img",{src:Kn(B.homeT
eam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.homeTeam}),h.j
sx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{className:"wc-wildcard-day-team",children:B.awa
yTeam}),Kn(B.awayTeam)&&h.jsx("img",{src:Kn(B.awayTeam),alt:"",className:"wc-wildcard-day-flag"})]},B.matchKey))}),h.js
xs("div",{className:"wc-wildcard-confirm-note",children:["All points from your predictions on this day will be 
multiplied by ",h.jsxs("strong",{children:["�",is]}),"!"]}),R&&h.jsx("div",{className:"wc-save-error",children:R}),h.js
xs("div",{className:"wc-wildcard-confirm-actions",children:[h.jsx("button",{type:"button",className:"wc-wildcard-confir
m-btn",onClick:j,disabled:d,children:d?"Activating...":"? Confirm"}),h.jsx("button",{type:"button",className:"podium-sk
ip-btn",onClick:t,children:"Cancel"})]})]})]}):h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"podium-modal-heade
r",children:[h.jsxs("h2",{className:"podium-modal-title",children:["?"," Pick Your Day"]}),h.jsx("button",{type:"button
",className:"podium-modal-close",onClick:t,children:"?"})]}),h.jsxs("div",{className:"wc-wildcard-pick-body",children:[
h.jsxs("p",{style:{color:"#b0c8e0",fontSize:"0.8rem",margin:"0 0 12px",lineHeight:1.5},children:["Choose one day in 
",h.jsxs("strong",{children:["Round ",i.round," (",i.label,")"]})," to get ",h.jsxs("strong",{children:["�",is]})," 
points on every match prediction you make that 
day."]}),h.jsx("div",{className:"wc-wildcard-days-list",children:c.map(B=>{const 
q=O.filter(le=>le.matchDate.startsWith(B));return 
h.jsxs("div",{className:"wc-wildcard-day-block",children:[h.jsx("div",{className:"wc-wildcard-day-header",children:new 
Date(B+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}),q.length>0?h.jsx("div"
,{className:"wc-wildcard-day-games",children:q.map(le=>h.jsxs("div",{className:"wc-wildcard-day-game",children:[Kn(le.h
omeTeam)&&h.jsx("img",{src:Kn(le.homeTeam),alt:"",className:"wc-wildcard-day-flag"}),h.jsx("span",{className:"wc-wildca
rd-day-team",children:le.homeTeam}),h.jsx("span",{className:"wc-wildcard-day-vs",children:"vs"}),h.jsx("span",{classNam
e:"wc-wildcard-day-team",children:le.awayTeam}),Kn(le.awayTeam)&&h.jsx("img",{src:Kn(le.awayTeam),alt:"",className:"wc-
wildcard-day-flag"})]},le.matchKey))}):h.jsx("div",{className:"wc-wildcard-day-no-games",children:"No group 
matches"}),h.jsxs("button",{type:"button",className:"wc-wildcard-select-btn",onClick:()=>b(B),children:["?"," Select 
this date"]})]},B)})})]}),h.jsx("div",{className:"podium-footer",children:h.jsx("button",{type:"button",className:"podi
um-skip-btn",onClick:t,children:"Skip"})})]})})]})})})}),document.body)}function F4(){const[n,e]=S.useState(null),[t,s]
=S.useState(!0),[i,l]=S.useState(null),[c,d]=S.useState(!1),[p,y]=S.useState(!1),[_,w]=S.useState(!1),[b,R]=S.useState(
null),[P,O]=S.useState(""),[j,L]=S.useState(null),B=S.useRef(!1),q=S.useRef(0),le=S.useRef(!1);S.useEffect(()=>{const 
F=new URLSearchParams(window.location.search).get("join");F&&R(F)},[]),S.useEffect(()=>{if(!pr){s(!1);return}return 
Kj(pr,F=>{e(F),s(!1)})},[]),S.useEffect(()=>{if(!b||!n||!Wt)return;(async()=>{const 
F=wr(xt(Wt,"leagues"),ic("joinCode","==",b)),M=await Di(F);if(M.empty)O("Invalid or expired join code");else{const 
Te=M.docs[0].id,Ie=M.docs[0].data(),X=Ie.name;if(Ie.joinDeadline&&new 
Date(Ie.joinDeadline).getTime()<Date.now()){O("This league's entry period has 
closed"),R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3);return}await 
bn(nt(Wt,"users",n.uid),{leagueIds:sc(Te)}),O(`Joined league: ${X}`),Ie.type==="paid"&&((await c0(nt(Wt,"users",n.uid))
).data()?.stakesAcknowledged?.[Te]||L({id:Te,name:Ie.name,stake:Ie.stake||0,hostFeePercent:Ie.hostFeePercent||0,prizeSp
lits:Ie.prizeSplits||[]}))}R(null),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>O(""),5e3
)})()},[b,n,Wt]),S.useEffect(()=>{if(!Wt||!n){l(null),d(!1),y(!1),w(!1);return}return 
Lt(nt(Wt,"users",n.uid),F=>{const M=F.data()||{};l(M),d(!0);const Te=M.podiumPrediction,Ie=Date.now()>=new 
Date(f0).getTime(),X=Date.now()>=new Date(S_).getTime();!Te?.initial&&!Ie&&!Te?.dismissedAt?Date.now()-q.current>3e3&&y
(!0):X&&!Te?.final&&Date.now()-q.current>3e3&&y(!0);const ge=os(),Ee=ge?"round"+ge.round:null,je=Ee&&M.wildCards?.[Ee],
$=le.current||sessionStorage.getItem("wc_dismissed")===Ee;ge&&!je&&!$&&w(!0)})},[Wt,n]);const 
ue=V=>e(V),pe=async()=>{pr&&(await Hj(pr),e(null))},k=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1)},[]),I
=S.useCallback(()=>{B.current=!0,q.current=Date.now(),y(!1),Wt&&n&&i?.podiumPrediction?.dismissedAt==null&&bn(nt(Wt,"us
ers",n.uid),{"podiumPrediction.dismissedAt":Vn()}).catch(()=>{})},[Wt,n,i]);if(t)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading..."})})});if(!jR)return 
h.jsx("div",{className:"auth-screen",children:h.jsxs("div",{className:"panel 
auth-card",children:[h.jsx("h1",{children:"FWC26 
Predictor"}),h.jsx("p",{style:{marginTop:12,color:"#ff6060",textAlign:"center"},children:"Firebase is not 
configured."})]})});if(!n)return h.jsx(ZL,{firebaseAuth:pr,firestore:Wt,onAuth:ue});if(!c)return 
h.jsx("div",{className:"auth-screen",children:h.jsx("div",{className:"panel 
auth-card",children:h.jsx("p",{style:{textAlign:"center",color:"#8aa0c0"},children:"Loading profile..."})})});const 
A=Date.now()>=new Date(S_).getTime(),U=i?.podiumPrediction||null;return h.jsxs("div",{className:"app app--with-sidebar"
,children:[h.jsx(t4,{onLogout:pe,user:n}),P&&h.jsx("div",{className:"join-notification",children:P}),h.jsx("main",{clas
sName:"app-main",children:h.jsxs(RD,{children:[h.jsx(Aa,{path:"/",element:h.jsx(c4,{user:n,firestore:Wt,onOpenPodium:()
=>y(!0)})}),h.jsx(Aa,{path:"/matches",element:h.jsx(g4,{user:n,firestore:Wt,userDoc:i})}),h.jsx(Aa,{path:"/my-predictio
ns",element:h.jsx(k4,{user:n,firestore:Wt,userDoc:i,onOpenWildCard:()=>{sessionStorage.removeItem("wc_dismissed"),w(!0)
}})}),h.jsx(Aa,{path:"/teams",element:h.jsx(_4,{})}),h.jsx(Aa,{path:"/teams/:teamName",element:h.jsx(v4,{firestore:Wt})
}),h.jsx(Aa,{path:"/leaderboard",element:h.jsx(w4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/groups",element:h.jsx(b4,{f
irestore:Wt})}),h.jsx(Aa,{path:"/leagues",element:h.jsx(S4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/leagues/:leagueId"
,element:h.jsx(x4,{user:n,firestore:Wt})}),h.jsx(Aa,{path:"/rules",element:h.jsx(C4,{})}),h.jsx(Aa,{path:"/profile",ele
ment:h.jsx(P4,{user:n,firestore:Wt,userDoc:i,onOpenPodium:()=>y(!0)})}),h.jsx(Aa,{path:"*",element:h.jsx(xD,{to:"/",rep
lace:!0})})]})}),p&&h.jsx(U4,{user:n,firestore:Wt,userDoc:i,existingPrediction:U,groupStageOver:A,onSave:k,onDismiss:I}
),_&&h.jsx(z4,{user:n,firestore:Wt,onClose:()=>{le.current=!0,sessionStorage.setItem("wc_dismissed",os()?"round"+os().r
ound:"done"),w(!1)},onActivate:(V,F)=>{le.current=!0,sessionStorage.setItem("wc_dismissed","round"+V),w(!1),l(M=>({...M
||{},wildCards:{...M?.wildCards||{},["round"+V]:{day:F,activatedAt:new Date().toISOString()}}}))}}),j&&h.jsx(p0,{league
:j,user:n,firestore:Wt,onConfirm:()=>L(null),onClose:()=>L(null)})]})}C1.createRoot(document.getElementById("root")).re
nder(h.jsx(S1.StrictMode,{children:h.jsx(ZD,{children:h.jsx(F4,{})})}));



```

---

## User

---

## Assistant (Compaction · DeepSeek V4 Flash Free · 14.0s)

## Goal
- Fix WorldCupPanel match card layout so teams display horizontally on a single line instead of stacking vertically

## Constraints & Preferences
- Teams must display side-by-side horizontally: `FlagImg(home) → TeamName(home) → Score/VS → TeamName(away) → FlagImg(away)`
- Cards should use a 2-column responsive grid (1 col on narrow, 2 on wider)
- No group cards, no standings tables, no FIFA rankings, no "Your Prediction" section in card grid
- Knockout stage should remain on legacy `wc-match-row` classes

## Progress
### Done
- Removed PayPal/hosting fee box from paid league creation, removed host fee row from `CalculatorPreview`
- Restructured WorldCupPanel group-stage rendering: replaced group cards / standings / crowd-predictions with `wc-grid-2col` grid of compact `wc-match-card` cards
- Each card: teams+score line (`wc-match-card-teams`), venue+date line (`wc-match-card-meta`), countdown line
- Fixed element order in card: moved away `FlagImg` after away team name
- Made `wc-grid-2col` responsive: 1 column < 500px, 2 columns ≥ 500px
- Built and deployed to Firebase; verified built JS/CSS contain `wc-grid-2col` and do NOT contain old `wc-group-card`, `wc-groups-grid`, or `wc-standings` strings
- Verified deployed HTML references new hashed JS/CSS files

### In Progress
- User reports teams still stacking vertically in the card instead of horizontally
- User shows rendered output: each element (flag alt-text, team name, vs, venue, date, countdown, score) appears on its own line
- FlagImg `alt` text ("Korea Republic", "Czechia") is visible — flagcdn.com images may be failing to load, but the layout is the core problem

### Blocked
- `wc-match-card-teams` has `display: flex` in CSS but elements still stack vertically — root cause unknown; possibly the class isn't being applied, or another rule overrides it
- User insists they cleared cache and used incognito, so browser caching is ruled out

## Key Decisions
- Match rows changed from `<button>` to `<div role="button">` (earlier accessibility fix)
- Group-stage grid changed from `wc-groups-grid` + `wc-group-card` to `wc-grid-2col` + `wc-match-card`
- Knockout stage kept on legacy `wc-match-row` classes to minimize scope
- User confirmed the exact rendered output, confirming the new code IS running but the flex layout is broken

## Next Steps
- Diagnose why `display: flex` on `.wc-match-card-teams` is not producing a horizontal row despite the CSS being present in the deployed build
- Add `width: 100%` and `justify-content: space-between` to `wc-match-card-teams` and `wc-match-card-meta`
- Increase grid gap and card padding for better visual separation
- Remove stale `@media (max-width: 640px)` rules targeting `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table` that no longer apply
- Rebuild and redeploy

## Critical Context
- User's exact rendered output (from live site, incognito):
  ```
  Korea Republic      <- FlagImg alt text (image failed to load)
  S. Korea            <- shortTeam(home)
  vs
  Czechia             <- FlagImg alt text (image failed to load)
  Czechia             <- shortTeam(away)
  🏟️ Estadio Guadalajara
  ⚽ 11 Jun, 1:00 am
  6d 6h 43m 53s
  Korea Republic 1 : 2 Czechia  <- separate rendering?
  ```
- This confirms the NEW code IS running (shortTeam names like "S. Korea" appear, meta section shows), but `wc-match-card-teams` is not laying out horizontally
- `wc-flag` has `display: block` — may cause alt text to occupy full line when image fails
- `wc-match-card-teams` CSS: `display: flex; align-items: center; gap: 4px;` — no `width: 100%` or `justify-content`
- Live deployed HTML: `https://worldcup2026-92e25.web.app`
- Built JS: `dist/assets/index-19rDVJwF.js`
- Built CSS: `dist/assets/index-D3N9rM8v.css`

## Relevant Files
- `src/components/WorldCupPanel.jsx`: lines 638-677 — group-stage card rendering; lines 648-666 — `wc-match-card-teams` inner elements
- `src/styles.css`: `.wc-match-card-teams` (line 859), `.wc-grid-2col` (line 822), `.wc-match-card` (line 833), `.wc-flag` (line 956), `.wc-team-name` (line 970) — all card styles
- `src/styles.css`: lines 6967-7010 — stale media query rules that no longer apply
- `dist/index.html`: references `index-19rDVJwF.js` and `index-D3N9rM8v.css`

---

## User

---

## Assistant (Plan · DeepSeek V4 Flash Free · 4.2s)

_Thinking:_

The user is asking me to continue if I have next steps, or stop and ask for clarification. Based on the conversation history, the core problem is that `.wc-match-card-teams` has `display: flex` in CSS but elements are still stacking vertically. Let me investigate the current state of the code to understand the issue better and then present a clear plan.

Let me read the relevant files to understand the current state.

Let me investigate the current state to understand why the flex layout isn't working.

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "offset": 820,
  "limit": 100
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
820: }
821: 
822: .wc-grid-2col {
823:   display: grid;
824:   grid-template-columns: 1fr;
825:   gap: 8px;
826: }
827: @media (min-width: 500px) {
828:   .wc-grid-2col {
829:     grid-template-columns: 1fr 1fr;
830:   }
831: }
832: 
833: .wc-match-card {
834:   display: flex;
835:   flex-direction: column;
836:   gap: 4px;
837:   padding: 10px 12px;
838:   border: 1px solid rgba(255, 255, 255, 0.07);
839:   border-radius: 10px;
840:   background: rgba(255, 255, 255, 0.03);
841:   cursor: pointer;
842:   transition: border-color 0.15s, background 0.15s;
843: }
844: 
845: .wc-match-card:hover {
846:   border-color: rgba(24, 200, 255, 0.25);
847:   background: rgba(255, 255, 255, 0.06);
848: }
849: 
850: .wc-match-card--wc-highlight {
851:   border-color: #00ff66;
852:   background: rgba(0, 255, 102, 0.04);
853: }
854: 
855: .wc-match-card--wc-highlight:hover {
856:   background: rgba(0, 255, 102, 0.09);
857: }
858: 
859: .wc-match-card-teams {
860:   display: flex;
861:   align-items: center;
862:   gap: 4px;
863:   font-size: 0.78rem;
864:   font-weight: 600;
865:   color: #e8f0f8;
866: }
867: 
868: .wc-match-card-meta {
869:   display: flex;
870:   align-items: center;
871:   gap: 10px;
872:   font-size: 0.65rem;
873:   opacity: 0.55;
874: }
875: 
876: .wc-match-card-venue {
877:   white-space: nowrap;
878:   overflow: hidden;
879:   text-overflow: ellipsis;
880: }
881: 
882: .wc-match-card-date {
883:   white-space: nowrap;
884: }
885: 
886: .wc-match-card-countdown {
887:   font-size: 0.62rem;
888:   opacity: 0.7;
889: }
890: 
891: /* legacy row styles (used by knockout stage) */
892: .wc-match-row {
893:   display: grid;
894:   grid-template-columns: 20px 1fr auto auto;
895:   gap: 8px;
896:   align-items: center;
897:   width: 100%;
898:   padding: 8px 14px;
899:   margin: 0 0 4px;
900:   border: none;
901:   border-radius: 0;
902:   background: transparent;
903:   -webkit-appearance: none;
904:   appearance: none;
905:   color: #d0dcee;
906:   font-size: 0.72rem;
907:   text-align: left;
908:   cursor: pointer;
909:   transition: background 0.12s;
910: }
911: 
912: .wc-match-row:last-child { margin-bottom: 0; }
913: 
914: .wc-match-row:hover { background: rgba(255, 255, 255, 0.05); }
915: 
916: .wc-match-row--wc-highlight {
917:   border-left: 3px solid #00ff66;
918:   background: rgba(0, 255, 102, 0.04);
919: }

(Showing lines 820-919 of 7372. Use offset=920 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "offset": 6900,
  "limit": 120
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
6900: 
6901: .my-pred-next-pred-btn {
6902:   padding: 6px 14px;
6903:   border: 1px solid rgba(61, 220, 132, 0.3);
6904:   border-radius: 8px;
6905:   background: rgba(61, 220, 132, 0.1);
6906:   color: #3ddc84;
6907:   font-size: 0.75rem;
6908:   font-weight: 600;
6909:   white-space: nowrap;
6910:   transition: background 0.12s;
6911: }
6912: 
6913: .my-pred-next-pred-btn--primary {
6914:   background: rgba(61, 220, 132, 0.15);
6915:   border-color: rgba(61, 220, 132, 0.4);
6916:   font-size: 0.82rem;
6917:   padding: 8px 20px;
6918:   display: inline-block;
6919: }
6920: 
6921: @media (max-width: 700px) {
6922:   .wc-immersive-team-name {
6923:     max-width: 80px;
6924:     overflow: hidden;
6925:     text-overflow: ellipsis;
6926:     white-space: nowrap;
6927:   }
6928:   .wc-modal-immersive {
6929:     max-width: calc(100% - 12px);
6930:     border-radius: 12px;
6931:   }
6932:   .wc-modal-immersive-content {
6933:     padding: 12px;
6934:     gap: 8px;
6935:   }
6936:   .wc-flag-circle-wrap,
6937:   .wc-flag-circle-placeholder {
6938:     width: 44px;
6939:     height: 44px;
6940:   }
6941:   .wc-flip-input {
6942:     width: 40px;
6943:     height: 44px;
6944:     font-size: 1.3rem;
6945:   }
6946:   .wc-flip-digit {
6947:     width: 32px;
6948:     height: 42px;
6949:     font-size: 1.3rem;
6950:   }
6951:   .wc-flip-colon {
6952:     font-size: 1.3rem;
6953:   }
6954:   .wc-immersive-location {
6955:     font-size: 0.65rem;
6956:     flex-wrap: wrap;
6957:     justify-content: center;
6958:     gap: 2px 4px;
6959:   }
6960:   .wc-save-pred-btn {
6961:     padding: 10px 20px;
6962:     min-height: 42px;
6963:     font-size: 0.82rem;
6964:   }
6965: }
6966: 
6967: @media (max-width: 640px) {
6968:   .app-main {
6969:     padding: 8px;
6970:   }
6971:   .wc-panel,
6972:   .panel.dash-panel,
6973:   .my-predictions {
6974:     padding: 8px 10px;
6975:   }
6976:   .wc-groups-grid {
6977:     grid-template-columns: 1fr;
6978:   }
6979:   .wc-match-row {
6980:     grid-template-columns: 12px 1fr auto;
6981:     font-size: 0.68rem;
6982:     padding: 4px 4px;
6983:     gap: 3px;
6984:   }
6985:   .wc-match-row .wc-match-status {
6986:     display: none;
6987:   }
6988:   .wc-match-team-name {
6989:     max-width: 50px;
6990:   }
6991:   .wc-group-card {
6992:     padding: 8px;
6993:   }
6994:   .wc-group-title {
6995:     font-size: 0.75rem;
6996:   }
6997:   .wc-standings-table {
6998:     font-size: 0.65rem;
6999:   }
7000:   .wc-standings-table th,
7001:   .wc-standings-table td {
7002:     padding: 3px 4px;
7003:   }
7004:   .wc-title {
7005:     font-size: 0.95rem;
7006:   }
7007:   .wc-filter-btn {
7008:     font-size: 0.65rem;
7009:     padding: 5px 8px;
7010:     min-height: 34px;
7011:   }
7012:   .wc-filter-row {
7013:     flex-wrap: wrap;
7014:     gap: 4px;
7015:   }
7016:   .dash-title {
7017:     font-size: 1rem;
7018:   }
7019:   .dash-metric-card {

(Showing lines 6900-7019 of 7372. Use offset=7020 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "offset": 630,
  "limit": 80
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
630:           {stageProgress.map((s) => (
631:             <div key={s.stage} className="wc-stage-bar-segment" title={`${s.label}: ${s.scored}/${s.total}`}>
632:               <div className="wc-stage-bar-fill" style={{ width: `${s.total > 0 ? (s.scored / s.total) * 100 : 0}%` }} />
633:             </div>
634:           ))}
635:         </div>
636:       )}
637: 
638:       {[1, 2, 3].map((day) => {
639:         if (filter !== 'all' && filter !== `round${day}`) return null;
640:         const dayMatches = grouped.group.filter((m) => m.matchday === day && isSearchMatch(m));
641:         if (dayMatches.length === 0) return null;
642:         return (
643:           <div key={day} className="wc-round-section">
644:             <div className="wc-round-title">Round {day}</div>
645:             <div className="wc-grid-2col">
646:               {dayMatches.map((m) => (
647:                 <div key={m.matchKey} className={`wc-match-card${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-card--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
648:                   <div className="wc-match-card-teams">
649:                     <FlagImg team={m.homeTeam} />
650:                     <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
651:                     {m.actual?.homeScore != null ? (
652:                       <span className="wc-inline-score wc-inline-score--actual">
653:                         {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
654:                       </span>
655:                     ) : m.predictions?.[user?.uid] ? (
656:                       <span className="wc-inline-score">
657:                         {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
658:                       </span>
659:                     ) : (
660:                       <span className="wc-vs">vs</span>
661:                     )}
662:                     <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
663:                     <FlagImg team={m.awayTeam} />
664:                   </div>
665:                   <div className="wc-match-card-meta">
666:                     <span className="wc-match-card-venue">{'\uD83C\uDFDF\uFE0F'} {m.venue}</span>
667:                     <span className="wc-match-card-date">{'\uD83D\uDCC5'} {formatMatchKickoff(m.matchDate)}</span>
668:                   </div>
669:                   <div className="wc-match-card-countdown">
670:                     <TileCountdown matchDate={m.matchDate} />
671:                   </div>
672:                 </div>
673:               ))}
674:             </div>
675:           </div>
676:         );
677:       })}
678:  
679:        {filter === 'all' && (
680:         <div className="wc-knockout-section">
681:           <h3 className="wc-section-title">{'\uD83C\uDFC6'} Knockout Stage</h3>
682:           {['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final'].map((stage) => {
683:             const stageMatches = grouped[stage];
684:             if (!stageMatches || stageMatches.length === 0) return null;
685:             const isBracket = stage === 'quarterFinal' || stage === 'semiFinal' || stage === 'final' || stage === 'thirdPlace';
686:             return (
687:               <div key={stage} className={`wc-stage-group ${isBracket ? 'wc-stage-bracket' : ''}`}>
688:                 <h4 className="wc-stage-title">{STAGE_LABELS[stage]}</h4>
689:                 <div className={`wc-stage-matches ${isBracket ? 'wc-bracket-grid' : ''}`}>
690:                   {stageMatches.filter(isSearchMatch).map((m) => (
691:                     <div key={m.matchKey} className={`wc-match-row ${isBracket ? 'wc-match-row--bracket' : ''}${wcActivatedDay && m.matchDate.startsWith(wcActivatedDay) ? ' wc-match-row--wc-highlight' : ''}`} role="button" tabIndex={0} onClick={() => openModal(m.matchKey)} onKeyDown={(e) => e.key === 'Enter' && openModal(m.matchKey)}>
692:                       <span className="wc-match-status">{matchStatusIcon(m)}</span>
693:                       <span className="wc-match-teams">
694:                         <FlagImg team={m.homeTeam} />
695:                         <span className="wc-team-name">{shortTeam(m.homeTeam)}</span>
696:                         {m.actual?.homeScore != null ? (
697:                           <span className="wc-inline-score wc-inline-score--actual">
698:                             {m.actual.homeScore} {'\u2013'} {m.actual.awayScore}
699:                           </span>
700:                         ) : m.predictions?.[user?.uid] ? (
701:                           <span className="wc-inline-score">
702:                             {m.predictions[user.uid].homeScore} {'\u2013'} {m.predictions[user.uid].awayScore}
703:                           </span>
704:                         ) : (
705:                           <span className="wc-vs">vs</span>
706:                         )}
707:                         <FlagImg team={m.awayTeam} />
708:                         <span className="wc-team-name">{shortTeam(m.awayTeam)}</span>
709:                       </span>

(Showing lines 630-709 of 793. Use offset=710 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 4.3s)

_Thinking:_

Let me look at the FlagImg component and the .wc-flag CSS to understand the layout issue.

The problem: `.wc-match-card-teams` has `display: flex; align-items: center; gap: 4px;` but elements are still stacking vertically. 

There could be several reasons:
1. The `.wc-flag` might have `display: block` which could cause issues
2. Some child elements might have `width: 100%` or other rules forcing them to full width
3. There could be flex-wrap causing wrapping
4. The `FlagImg` component might render something that breaks the flex layout

Let me check the FlagImg component and the .wc-flag CSS.

**Tool: read**

**Input:**
```json
{
  "offset": 950,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 40
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
950: .wc-match-status {
951:   font-size: 0.7rem;
952:   text-align: center;
953:   opacity: 0.6;
954: }
955: 
956: .wc-flag {
957:   flex: 0 0 auto;
958:   border-radius: 2px;
959:   display: block;
960: }
961: 
962: .wc-flag-placeholder {
963:   width: 24px;
964:   height: 18px;
965:   display: inline-block;
966:   background: rgba(255, 255, 255, 0.06);
967:   border-radius: 2px;
968: }
969: 
970: .wc-team-name {
971:   white-space: nowrap;
972:   overflow: hidden;
973:   text-overflow: ellipsis;
974:   max-width: 70px;
975:   font-size: 0.7rem;
976: }
977: 
978: .wc-vs {
979:   opacity: 0.35;
980:   font-size: 0.6rem;
981:   margin: 0 1px;
982: }
983: 
984: .wc-inline-score {
985:   font-weight: 700;
986:   color: #f0c040;
987:   font-size: 0.78rem;
988:   margin: 0 3px;
989:   white-space: nowrap;

(Showing lines 950-989 of 7372. Use offset=990 to continue.)
</content>
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "FlagImg",
  "include": "*.jsx"
}
```

**Output:**
```
Found 48 matches
C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx:
  Line 43: function FlagImg({ team, size = 24 }) {

  Line 445:             <FlagImg team={nextKickoff.homeTeam} size={56} />

  Line 455:             <FlagImg team={nextKickoff.awayTeam} size={56} />

  Line 464:                 <FlagImg team={nextKickoff.homeTeam} size={16} />

  Line 468:                 <FlagImg team={nextKickoff.awayTeam} size={16} />

  Line 486:                     <FlagImg team={upcomingMatches[i].homeTeam} size={24} />

  Line 491:                     <FlagImg team={upcomingMatches[i].awayTeam} size={24} />

  Line 505:                       <FlagImg team={upcomingMatches[i].homeTeam} size={14} />

  Line 507:                       <FlagImg team={upcomingMatches[i].awayTeam} size={14} />

  Line 529:                   <FlagImg team={crowdData.match.homeTeam} size={20} />

  Line 531:                   <FlagImg team={crowdData.match.awayTeam} size={20} />

  Line 649:                     <FlagImg team={m.homeTeam} />

  Line 663:                     <FlagImg team={m.awayTeam} />

  Line 694:                         <FlagImg team={m.homeTeam} />

  Line 707:                         <FlagImg team={m.awayTeam} />


C:\Users\jayno\Projects\world-cup-2026\src\components\MyPredictions.jsx:
  Line 41: function FlagImg({ team, size = 20 }) {

  Line 328:                       <FlagImg team={m.homeTeam} size={24} />

  Line 349:                       <FlagImg team={m.awayTeam} size={24} />

  Line 408:                 <FlagImg team={nextActualMatch.homeTeam} size={40} />

  Line 418:                 <FlagImg team={nextActualMatch.awayTeam} size={40} />

  Line 427:                     <FlagImg team={nextActualMatch.homeTeam} size={16} />

  Line 431:                     <FlagImg team={nextActualMatch.awayTeam} size={16} />

  Line 559:                             <FlagImg team={m.homeTeam} />

  Line 572:                             <FlagImg team={m.awayTeam} />

  Line 607:                                   <FlagImg team={m.homeTeam} />

  Line 620:                                   <FlagImg team={m.awayTeam} />

  Line 676:                     <FlagImg team={m.homeTeam} />

  Line 680:                     <FlagImg team={m.awayTeam} />


C:\Users\jayno\Projects\world-cup-2026\src\components\PodiumPredictionModal.jsx:
  Line 10: function FlagImg({ team, size = 18 }) {

  Line 29:         {value ? <FlagImg team={value} size={18} /> : <span className="podium-dropdown-placeholder-flag" />}

  Line 37:               <FlagImg team={t} size={16} />

  Line 218:                     <FlagImg team={val} size={22} />


C:\Users\jayno\Projects\world-cup-2026\src\components\Dashboard.jsx:
  Line 9: function FlagImg({ team, size = 20 }) {

  Line 307:                 <FlagImg team={nextActualMatch.homeTeam} size={32} />

  Line 309:                 <FlagImg team={nextActualMatch.awayTeam} size={32} />

  Line 426:                   <FlagImg team={m.homeTeam} size={14} />

  Line 436:                   <FlagImg team={m.awayTeam} size={14} />

  Line 461:                 <FlagImg team={m.homeTeam} size={16} />

  Line 464:                 <FlagImg team={m.awayTeam} size={16} />

  Line 478:                 <FlagImg team={m.homeTeam} size={16} />

  Line 481:                 <FlagImg team={m.awayTeam} size={16} />


C:\Users\jayno\Projects\world-cup-2026\src\components\GroupStandings.jsx:
  Line 5: function FlagImg({ team, size = 16 }) {

  Line 96:                       <FlagImg team={t.team} />


C:\Users\jayno\Projects\world-cup-2026\src\components\TeamDetail.jsx:
  Line 7: function FlagImg({ team, size = 24 }) {

  Line 71:         <FlagImg team={name} size={64} />

  Line 90:                 <FlagImg team={f.opponent} size={14} />


C:\Users\jayno\Projects\world-cup-2026\src\components\TeamsHub.jsx:
  Line 6: function FlagImg({ team, size = 24 }) {

  Line 62:                       <FlagImg team={name} size={36} />

```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 2.5s)

_Thinking:_

Now let me look at the FlagImg component in WorldCupPanel.jsx to see what it renders:

**Tool: read**

**Input:**
```json
{
  "offset": 43,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\components\\WorldCupPanel.jsx",
  "limit": 20
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\components\WorldCupPanel.jsx</path>
<type>file</type>
<content>
43: function FlagImg({ team, size = 24 }) {
44:   const url = getFlagUrl(team);
45:   if (!url) return <span className="wc-flag-placeholder" />;
46:   return (
47:     <img
48:       className="wc-flag"
49:       src={url}
50:       alt={team}
51:       width={size}
52:       height={size * 0.75}
53:       loading="lazy"
54:     />
55:   );
56: }
57: 
58: function seedWorldCupMatches(firestore) {
59:   if (!firestore) return;
60:   const batch = writeBatch(firestore);
61:   WORLD_CUP_2026_MATCHES.forEach((match) => {
62:     const ref = doc(firestore, 'worldCupPredictions', match.matchKey);

(Showing lines 43-62 of 793. Use offset=63 to continue.)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 35.0s)

_Thinking:_

Now I understand the problem clearly. Let me analyze:

1. `.wc-flag` has `display: block` — when the image fails to load (which the user reports — flagcdn.com images not loading), the `<img>` element still takes up space as a block-level element. Even if the image loads, the `display: block` means it will be treated as a block-level flex child, which could still cause layout issues in some cases.

Wait, actually in a flex container, `display: block` on children still works fine — flex items can be block-level and still flow horizontally. So that's not the issue.

Let me think more carefully. The user saw:
```
Korea Republic      <- FlagImg alt text (image failed to load)
S. Korea            <- shortTeam(home)
vs
Czechia             <- FlagImg alt text (image failed to load)
Czechia             <- shortTeam(away)
```

So the elements ARE rendering in the correct order. The issue is that they're stacking vertically instead of horizontally. 

Wait — if the image fails to load, the `<img>` element still exists in the DOM. The `alt` text is displayed. But with `display: block`, when the image fails, the alt text is shown as a block-level element, taking the full width. That's likely the issue!

When an `<img>` with `display: block` fails to load, the browser renders the alt text as a block-level element, which takes up the full width of the container, pushing subsequent elements to the next line.

The fix: Change `.wc-flag` from `display: block` to `display: inline-block` or remove the `display` property entirely. In a flex context, this shouldn't matter for layout normally, but the broken-image alt text rendering behavior differs between block and inline elements.

Actually, let me reconsider. If `.wc-flag` has `display: block` and the image fails to load, the alt text will be rendered as a block-level element, taking full width. This would push everything after it to the next line.

But wait — in a flex container, even block-level children are flex items and should flow horizontally. The `display: block` on the img shouldn't break the flex layout because flex items are always block-level in the main axis direction.

Hmm, but actually... the way alt text is rendered in a failed `<img>` is browser-specific. Some browsers render alt text as a pseudo-element or replaced element. When the image has `display: block` and fails to load, the alt text gets rendered as a block box which may force line breaks.

Let me look for other potential causes:
1. Maybe there's a `flex-wrap: wrap` somewhere that I'm not seeing
2. Maybe the `wc-team-name` has `max-width: 70px` and overflow/ellipsis behavior that's somehow causing wrapping
3. Maybe the gap is large enough that combined with the widths, it forces wrapping

Wait, actually, the real issue might be simpler. Let me look at the `wc-match-card` container — it has `display: flex; flex-direction: column`. That's fine for the card itself, but the `wc-match-card-teams` child should have `display: flex` with default `flex-direction: row`. That should work.

Let me check if there's any CSS that sets `flex-wrap: wrap` on `.wc-match-card-teams`...

Looking at the CSS for `.wc-match-card-teams`:
```css
.wc-match-card-teams {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #e8f0f8;
}
```

No `flex-wrap`. So by default `flex-wrap: nowrap`. This should keep everything on one line.

The problem must be the `display: block` on `.wc-flag` combined with the image failing to load. When the `<img>` fails with `display: block`, some browsers render the alt text as a block element that takes full width, forcing subsequent flex items to the next line.

The fix:
1. Change `.wc-flag` from `display: block` to `display: inline-block` or remove the explicit display
2. Or, add `flex-shrink: 0` to `.wc-flag` (actually it already has `flex: 0 0 auto` which implies no shrink)
3. Add `width: 100%` to `.wc-match-card-teams` to ensure it fills the card width
4. Add `justify-content: space-between` or `center` for better spacing

But actually, I think the root cause of the vertical stacking when images fail is the `display: block` on `.wc-flag`. When an `<img>` with `display: block` fails to load, the alt text is rendered as a block box, taking full width and breaking the flex row layout.

Let me also check if there could be another issue — maybe the deployed code doesn't match the source. But the user confirmed the new code is running (they see shortTeam names like "S. Korea" instead of "South Korea"), so the flex CSS must be there too.

Wait, one more thing — what browser is the user on? Some older browsers handle flexbox differently. But the user said they tried incognito and cleared cache, so it's not a stale file issue.

Actually, let me re-examine. If the img has `width={size}` (24px) and `height={size * 0.75}` (18px), and it fails to load, the browser might still reserve space for the img element. The `display: block` would cause the alt text to take up the full width of the container (the flex item), which could push other items down.

The fix should be:
1. Change `.wc-flag` to `display: inline-block` so alt text doesn't break layout when image fails
2. Add `width: 100%` to `.wc-match-card-teams` for safety
3. Add `justify-content: center` or `space-between` to `.wc-match-card-teams`
4. Increase gap and padding

Actually, even simpler: maybe the issue is just about `.wc-flag` having `display: block`. Let me think about what exactly happens in flex context...

In a flex container (`display: flex; flex-direction: row`), every child becomes a flex item. The flex item's `display` value matters for how its CONTENTS are laid out, but the item itself should flow along the main axis. So even with `display: block`, the `<img>` should still be a flex item flowing horizontally.

Unless... the `alt` text rendering creates an anononymous block box that takes the full width of the flex item, and since the img has no intrinsic size (because it failed to load), the flex item becomes as wide as the container.

Hmm, actually I think the issue might be more subtle. Let me consider: when an `<img>` with `display: block` fails to load, the browser creates a box for the alt text. This box has `display: block`, which means it takes the full available width of its containing block (the flex item that wraps the img). But since the img IS the flex item (not wrapped in any additional element), the img's box itself is the flex item. With `display: block`, when the image fails to load, the alt text is rendered as a block-level box within the img element, which could expand to fill the width.

Actually, I think the most practical approach would be:
1. Change `.wc-flag` from `display: block` to `display: inline-block` — this is the most likely fix when images fail to load
2. Add `width: 100%` to `.wc-match-card-teams` just to be safe
3. Add `justify-content: space-around` or `center` for better distribution
4. Increase gap from `4px` to `8px` for visual clarity

Let me formulate the plan.

Actually, I just realized I should also check whether the user already made some of these changes based on the "Next Steps" from the history. Let me re-check the current state of the CSS file.

Wait, the user said "continue if you have next steps" — they're in plan mode, asking me to plan before executing. So I should present a clear plan.

Let me think about the plan more carefully:

The core issue: `.wc-match-card-teams` has `display: flex` with `flex-direction: row` (default), but elements are stacking vertically.

Possible causes and fixes:
1. `.wc-flag` has `display: block` — when images fail to load, alt text renders as block, potentially taking full width → fix: change to `inline-block`
2. `.wc-match-card-teams` lacks `width: 100%` and `justify-content` → fix: add both
3. The card padding and gap are too small → could be improved but not the root cause

Plan:
1. In `src/styles.css`:
   a. Change `.wc-flag` display from `block` to `inline-block` (line 959)
   b. Add `width: 100%` to `.wc-match-card-teams` (line 859)
   c. Add `justify-content: space-around` or `center` to `.wc-match-card-teams`
   d. Increase gap from `4px` to `8px` for better visual spacing
   e. Increase `.wc-match-card` padding from `10px 12px` to e.g. `12px 16px`
   f. Increase `.wc-grid-2col` gap from `8px` to `12px`
   g. Remove stale `@media (max-width: 640px)` rules for `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table` (lines 6976-7003)
   h. Also remove `.wc-match-row` override in the same media query if we want knockout to remain responsive differently

Wait, I should be careful about the knockout `.wc-match-row` rules — the user said to keep knockout on legacy classes. The media query at line 6979 adjusts `.wc-match-row` for small screens. That's still relevant for knockout, so I should keep that.

But the `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table` rules are indeed stale since those classes are no longer used.

Let me also check: is the `.wc-flag` `display: block` the actual root cause? Let me think again...

In a modern browser with flexbox:
- A flex container's children are flex items
- Each flex item is a block-level box
- Alt text in a failed `<img>` with `display: block`...

Actually, when an `<img>` has `display: block` and the image source fails:
- The element still takes up space (unless it's zero-width/height)
- The alt text is rendered inside the image element
- With `display: block`, the alt text box takes the full width of the containing block
- But the containing block of the `<img>` in a flex context is... the `<img>` element itself is the flex item. So the `<img>` element's width as a flex item determines how wide its alt text box can be.

With flex defaults, the flex item (the `<img>`) would shrink to its minimum width. For a `<img>` with `width=24 height=18`, even if the image fails, the element has explicit dimensions. But if those dimensions are ignored when the image fails... it depends on the browser.

OK, I think I'm overthinking this. The practical fix is:
1. Change `.wc-flag` display to `inline-block`
2. Add `width: 100%` and `justify-content` to `.wc-match-card-teams`
3. Improve spacing

These are safe, incremental changes that should fix the issue regardless of the exact browser behavior.

Let me also add `flex-wrap: nowrap` explicitly to `.wc-match-card-teams` to be sure.

Now let me formulate the plan for the user.

Now I have a clear picture. Here's the plan:

## Diagnosis

The `.wc-match-card-teams` flex layout breaks because **`wc-flag` has `display: block`** (line 959). When flagcdn.com images fail to load (as the user reported), the alt text renders as a full-width block element inside the flex item, pushing subsequent flex children to the next line.

## Proposed Changes

### 1. `src/styles.css` — Fix flag image alt text not breaking layout

**Line 959**: Change `.wc-flag` from `display: block` to `display: inline-block` so alt text flows inline when the image is missing.

### 2. `src/styles.css` — Strengthen flex row layout

**Lines 859-866** (`.wc-match-card-teams`):
- Add `width: 100%` to ensure the flex row spans the full card
- Add `flex-wrap: nowrap` explicitly to prevent any wrapping
- Add `justify-content: space-around` for balanced horizontal distribution
- Increase `gap` from `4px` to `6px`

### 3. `src/styles.css` — Improve visual spacing

- **Line 837**: Increase `.wc-match-card` padding from `10px 12px` to `12px 16px`
- **Line 825**: Increase `.wc-grid-2col` gap from `8px` to `12px`
- **Line 871**: Increase `.wc-match-card-meta` gap from `10px` to `14px`

### 4. `src/styles.css` — Remove stale media query rules

**Lines 6976-7003**: Remove `@media (max-width: 640px)` rules for `.wc-groups-grid`, `.wc-group-card`, `.wc-standings-table` — these classes no longer exist. Keep the `.wc-match-row` override (line 6979) since knockout still uses it.

### 5. Rebuild and redeploy to Firebase

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "question": "Does this plan look good? Any adjustments you'd like before I proceed?",
      "header": "Proceed with plan?",
      "options": [
        {
          "label": "Yes, execute plan",
          "description": "Apply all changes, rebuild and redeploy"
        },
        {
          "label": "Adjust plan",
          "description": "I have suggestions or changes to the plan"
        }
      ]
    }
  ]
}
```

**Output:**
```
User has answered your questions: "Does this plan look good? Any adjustments you'd like before I proceed?"="Yes, execute plan". You can now continue with the user's answers in mind.
```

---

## Assistant (Plan · DeepSeek V4 Flash Free · 4.0s)

_Thinking:_

The user agreed to the plan. But the system reminder says I'm in PLAN MODE - strictly forbidden from making any edits or changes. I need to ask the user if they want me to switch to implementation mode, or if they want to execute the plan themselves.

Wait, the user said "Yes, execute plan" — they want me to proceed. But the system says I'm in plan mode and can't make edits. I should inform the user of this restriction and ask if they want me to proceed with implementation.

Actually, re-reading the system reminder: "Plan mode ACTIVE - you are in READ-ONLY phase. STRICTLY FORBIDDEN: ANY file edits, modifications, or system changes."

So I cannot make the changes now. I need to let the user know I'm ready to execute but can't in plan mode.

I have the plan ready and you've approved it. However, the system indicates I'm currently in **Plan Mode (read-only)** which prevents me from making edits. 

Could you switch me to implementation mode so I can apply the changes?

---

## User

go

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.5s)

_Thinking:_

The user said "go" and the system confirms I'm now in build mode. Let me execute the plan:

1. Fix `wc-flag` display: block → inline-block
2. Strengthen `wc-match-card-teams` flex layout (width: 100%, flex-wrap: nowrap, justify-content: space-around, gap: 6px)
3. Improve visual spacing (card padding, grid gap, meta gap)
4. Remove stale media query rules
5. Rebuild and redeploy

Let me start with the CSS edits.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Fix wc-flag display: block → inline-block",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Strengthen .wc-match-card-teams flex layout",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Improve visual spacing (card padding, grid gap, meta gap)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Rebuild and redeploy to Firebase",
      "status": "pending",
      "priority": "high"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Fix wc-flag display: block → inline-block",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Strengthen .wc-match-card-teams flex layout",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Improve visual spacing (card padding, grid gap, meta gap)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Rebuild and redeploy to Firebase",
    "status": "pending",
    "priority": "high"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.2s)

_Thinking:_

Let me now make all the CSS edits. I can do multiple edits in parallel since they don't overlap.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": ".wc-flag {\n  flex: 0 0 auto;\n  border-radius: 2px;\n  display: block;\n}",
  "newString": ".wc-flag {\n  flex: 0 0 auto;\n  border-radius: 2px;\n  display: inline-block;\n}"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

Now let me do the other edits in parallel.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": ".wc-match-card-teams {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #e8f0f8;\n}",
  "newString": ".wc-match-card-teams {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  gap: 6px;\n  width: 100%;\n  flex-wrap: nowrap;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #e8f0f8;\n}"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  padding: 10px 12px;",
  "newString": "  padding: 12px 16px;"
}
```

**Error:**
```
Found multiple matches for oldString. Provide more surrounding context to make the match unique.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  gap: 8px;\n}\n@media (min-width: 500px) {",
  "newString": "  gap: 12px;\n}\n@media (min-width: 500px) {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  gap: 10px;\n  font-size: 0.65rem;\n  opacity: 0.55;",
  "newString": "  gap: 14px;\n  font-size: 0.65rem;\n  opacity: 0.55;"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.9s)

_Thinking:_

The `padding: 10px 12px` edit failed because there are multiple matches. I need to provide more context to make the edit unique. Let me read the surrounding lines to target the right one.

**Tool: read**

**Input:**
```json
{
  "offset": 833,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 15
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
833: .wc-match-card {
834:   display: flex;
835:   flex-direction: column;
836:   gap: 4px;
837:   padding: 10px 12px;
838:   border: 1px solid rgba(255, 255, 255, 0.07);
839:   border-radius: 10px;
840:   background: rgba(255, 255, 255, 0.03);
841:   cursor: pointer;
842:   transition: border-color 0.15s, background 0.15s;
843: }
844: 
845: .wc-match-card:hover {
846:   border-color: rgba(24, 200, 255, 0.25);
847:   background: rgba(255, 255, 255, 0.06);

(Showing lines 833-847 of 7375. Use offset=848 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.1s)

_Thinking:_

OK, I need to target the `.wc-match-card` specific padding. Let me use more context.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": ".wc-match-card {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  padding: 10px 12px;",
  "newString": ".wc-match-card {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 12px 16px;"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.1s)

_Thinking:_

Good, and I also increased the gap from 4px to 6px for better visual spacing. Now let me update the todo and move on to removing the stale media query rules.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Fix wc-flag display: block → inline-block",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Strengthen .wc-match-card-teams flex layout",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Improve visual spacing (card padding, grid gap, meta gap)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Rebuild and redeploy to Firebase",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Fix wc-flag display: block → inline-block",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Strengthen .wc-match-card-teams flex layout",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Improve visual spacing (card padding, grid gap, meta gap)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
    "status": "in_progress",
    "priority": "medium"
  },
  {
    "content": "Rebuild and redeploy to Firebase",
    "status": "pending",
    "priority": "high"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.6s)

_Thinking:_

Now I need to remove the stale media query rules. Let me read the exact block again.

**Tool: read**

**Input:**
```json
{
  "offset": 6967,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 50
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
6967:   }
6968: }
6969: 
6970: @media (max-width: 640px) {
6971:   .app-main {
6972:     padding: 8px;
6973:   }
6974:   .wc-panel,
6975:   .panel.dash-panel,
6976:   .my-predictions {
6977:     padding: 8px 10px;
6978:   }
6979:   .wc-groups-grid {
6980:     grid-template-columns: 1fr;
6981:   }
6982:   .wc-match-row {
6983:     grid-template-columns: 12px 1fr auto;
6984:     font-size: 0.68rem;
6985:     padding: 4px 4px;
6986:     gap: 3px;
6987:   }
6988:   .wc-match-row .wc-match-status {
6989:     display: none;
6990:   }
6991:   .wc-match-team-name {
6992:     max-width: 50px;
6993:   }
6994:   .wc-group-card {
6995:     padding: 8px;
6996:   }
6997:   .wc-group-title {
6998:     font-size: 0.75rem;
6999:   }
7000:   .wc-standings-table {
7001:     font-size: 0.65rem;
7002:   }
7003:   .wc-standings-table th,
7004:   .wc-standings-table td {
7005:     padding: 3px 4px;
7006:   }
7007:   .wc-title {
7008:     font-size: 0.95rem;
7009:   }
7010:   .wc-filter-btn {
7011:     font-size: 0.65rem;
7012:     padding: 5px 8px;
7013:     min-height: 34px;
7014:   }
7015:   .wc-filter-row {
7016:     flex-wrap: wrap;

(Showing lines 6967-7016 of 7375. Use offset=7017 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

I need to remove the stale rules: `.wc-groups-grid` (6979-6981), `.wc-group-card` (6994-6996), `.wc-standings-table` (7000-7002), `.wc-standings-table th, td` (7003-7006). I'll keep `.wc-match-row` (6982-6990), `.wc-match-team-name` (6991-6993), `.wc-group-title` (6997-6999), and everything else.

Let me remove just the stale blocks.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-groups-grid {\n    grid-template-columns: 1fr;\n  }\n  .wc-match-row {",
  "newString": "  .wc-match-row {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-group-card {\n    padding: 8px;\n  }\n  .wc-group-title {",
  "newString": "  .wc-group-title {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-standings-table {\n    font-size: 0.65rem;\n  }\n  .wc-standings-table th,\n  .wc-standings-table td {\n    padding: 3px 4px;\n  }\n  .wc-title {",
  "newString": "  .wc-title {"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.7s)

_Thinking:_

Good. Now let me verify the media query looks clean by reading it.

**Tool: read**

**Input:**
```json
{
  "offset": 6963,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 40
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
6963:   .wc-save-pred-btn {
6964:     padding: 10px 20px;
6965:     min-height: 42px;
6966:     font-size: 0.82rem;
6967:   }
6968: }
6969: 
6970: @media (max-width: 640px) {
6971:   .app-main {
6972:     padding: 8px;
6973:   }
6974:   .wc-panel,
6975:   .panel.dash-panel,
6976:   .my-predictions {
6977:     padding: 8px 10px;
6978:   }
6979:   .wc-match-row {
6980:     grid-template-columns: 12px 1fr auto;
6981:     font-size: 0.68rem;
6982:     padding: 4px 4px;
6983:     gap: 3px;
6984:   }
6985:   .wc-match-row .wc-match-status {
6986:     display: none;
6987:   }
6988:   .wc-match-team-name {
6989:     max-width: 50px;
6990:   }
6991:   .wc-group-title {
6992:     font-size: 0.75rem;
6993:   }
6994:   .wc-title {
6995:     font-size: 0.95rem;
6996:   }
6997:   .wc-filter-btn {
6998:     font-size: 0.65rem;
6999:     padding: 5px 8px;
7000:     min-height: 34px;
7001:   }
7002:   .wc-filter-row {

(Showing lines 6963-7002 of 7362. Use offset=7003 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.4s)

_Thinking:_

The stale media query rules are removed cleanly. Now I need to rebuild and redeploy. Let me check what build system this project uses.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Fix wc-flag display: block → inline-block",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Strengthen .wc-match-card-teams flex layout",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Improve visual spacing (card padding, grid gap, meta gap)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Rebuild and redeploy to Firebase",
      "status": "in_progress"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Fix wc-flag display: block → inline-block",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Strengthen .wc-match-card-teams flex layout",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Improve visual spacing (card padding, grid gap, meta gap)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Rebuild and redeploy to Firebase",
    "status": "in_progress",
    "priority": "high"
  }
]
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\package.json"
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\package.json</path>
<type>file</type>
<content>
1: {
2:   "name": "world-cup-2026",
3:   "version": "1.0.0",
4:   "private": true,
5:   "type": "module",
6:   "scripts": {
7:     "start": "vite --host 0.0.0.0",
8:     "build": "vite build",
9:     "preview": "vite preview --host 0.0.0.0"
10:   },
11:   "dependencies": {
12:     "@vitejs/plugin-react": "^5.0.0",
13:     "firebase": "^12.12.1",
14:     "firebase-admin": "^13.10.0",
15:     "react": "^19.0.0",
16:     "react-dom": "^19.0.0",
17:     "react-router-dom": "^7.16.0",
18:     "vite": "^7.0.0"
19:   }
20: }

(End of file - total 20 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.5s)

_Thinking:_

Vite build. Let me run the build first, then deploy.

**Tool: bash**

**Input:**
```json
{
  "command": "npm run build",
  "description": "Build the project with Vite",
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026",
  "timeout": 60000
}
```

**Output:**
```

> world-cup-2026@1.0.0 build
> vite build

[33mYou are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.[39m
[36mvite v7.3.5 [32mbuilding client environment for production...[36m[39m
transforming...
[32m✓[39m 80 modules transformed.
[33m[plugin vite:reporter] 
(!) C:/Users/jayno/Projects/world-cup-2026/node_modules/firebase/firestore/dist/esm/index.esm.js is dynamically imported by C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx but also statically imported by C:/Users/jayno/Projects/world-cup-2026/src/App.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/AuthPage.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Dashboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/GroupStandings.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Leaderboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeagueDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeaguesList.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MatchDetailModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyPredictions.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyProfile.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/StakesAcknowledgmentModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/TeamDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WildCardModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WorldCupPanel.jsx, C:/Users/jayno/Projects/world-cup-2026/src/lib/firebase.js, C:/Users/jayno/Projects/world-cup-2026/src/utils/worldCupApi.js, dynamic import will not move module into another chunk.
[39m
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.74 kB[22m[1m[22m[2m │ gzip:   0.37 kB[22m
[33m
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.[39m
[2mdist/[22m[35massets/index-CZ62U5Tc.css  [39m[1m[2m100.08 kB[22m[1m[22m[2m │ gzip:  16.71 kB[22m
[2mdist/[22m[36massets/index-Bgl42PyD.js   [39m[1m[33m882.87 kB[39m[22m[2m │ gzip: 258.31 kB[22m
[32m✓ built in 4.68s[39m

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 16.2s)

_Thinking:_

Build succeeded. Now I need to deploy to Firebase. Let me check if Firebase CLI is available and deploy.

**Tool: bash**

**Input:**
```json
{
  "description": "Deploy to Firebase hosting",
  "command": "firebase deploy --only hosting",
  "timeout": 60000,
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026"
}
```

**Output:**
```
(node:27924) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

[1m[37m===[39m Deploying to 'worldcup2026-92e25'...[22m

[36m[1mi [22m[39m deploying [1mhosting[22m
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m beginning deploy...
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m found 65 files in [1mdist[22m
[36m[1mi  hosting:[22m[39m upload complete
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m file upload complete
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m finalizing version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m version finalized
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m releasing new version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m release complete

[32m[1m+ [22m[39m [1m[4mDeploy complete![24m[22m

[1mProject Console:[22m https://console.firebase.google.com/project/worldcup2026-92e25/overview
[1mHosting URL:[22m https://worldcup2026-92e25.web.app

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.8s)

_Thinking:_

Deploy succeeded. Now let me verify the deployed output contains our changes and doesn't contain the stale class references.

**Tool: webfetch**

**Input:**
```json
{
  "url": "https://worldcup2026-92e25.web.app",
  "format": "text"
}
```

**Output:**
```
FWC26 Predictor
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.9s)

_Thinking:_

The HTML is very minimal — it's a SPA. Let me fetch the index.html directly and check the JS and CSS file references.

**Tool: webfetch**

**Input:**
```json
{
  "format": "text",
  "url": "https://worldcup2026-92e25.web.app/index.html"
}
```

**Output:**
```
FWC26 Predictor
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 2.3s)

_Thinking:_

The HTML is minimal, just the app root. Let me check the built index.html locally to see what files are referenced.

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\index.html"
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\dist\index.html</path>
<type>file</type>
<content>
1: <!doctype html>
2: <html lang="en">
3:   <head>
4:     <meta charset="UTF-8" />
5:     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
6:     <meta name="theme-color" content="#06142b" />
7:     <meta name="application-name" content="World Cup 2026 Predictor" />
8:     <meta name="mobile-web-app-capable" content="yes" />
9:     <meta name="apple-mobile-web-app-capable" content="yes" />
10:     <meta name="apple-mobile-web-app-title" content="WC2026" />
11:     <title>FWC26 Predictor</title>
12:     <script type="module" crossorigin src="/assets/index-Bgl42PyD.js"></script>
13:     <link rel="stylesheet" crossorigin href="/assets/index-CZ62U5Tc.css">
14:   </head>
15:   <body>
16:     <div id="root"></div>
17:   </body>
18: </html>

(End of file - total 18 lines)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.7s)

_Thinking:_

The CSS is `index-CZ62U5Tc.css` and JS is `index-Bgl42PyD.js`. Both are new hashed filenames (different from the previous build `index-D3N9rM8v.css` and `index-19rDVJwF.js`), confirming a fresh deploy.

Let me verify the built CSS contains our key changes.

**Tool: bash**

**Input:**
```json
{
  "description": "Check built CSS for key classes",
  "command": "Select-String -Path \"dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"(wc-match-card-teams|wc-flag|wc-grid-2col|wc-groups-grid|wc-group-card|wc-standings-table)\""
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a625700013Ea9LJMzlr9sMS

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## Assistant (Build · DeepSeek V4 Flash Free · 6.2s)

_Thinking:_

The file is too large to read the full output. Let me use Select-String to specifically grep for the key selectors in the built CSS file.

**Tool: bash**

**Input:**
```json
{
  "description": "Search built CSS for key classes",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"\\.wc-match-card-teams|\\.wc-flag[{ ]|\\.wc-match-card-meta|\\.wc-grid-2col|\\.wc-group-card|\\.wc-standings-table\""
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a63dbb001aONjXuotGFAvpq

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## Assistant (Build · DeepSeek V4 Flash Free · 6.1s)

_Thinking:_

The output is still too long to read at once. Let me use ripgrep or a more targeted approach to verify the key selectors.

**Tool: bash**

**Input:**
```json
{
  "description": "Grep built CSS for key selectors",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"wc-match-card-teams|wc-flag[{ ]|wc-match-card-meta|wc-grid-2col|wc-groups-grid|wc-group-card|wc-standings-table\" -Context 0,2"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a65590001PrZgP5xL0YkuQZ

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.3s)

_Thinking:_

The output is too large and cut off. Let me try a different approach - just check if specific strings exist or not in the built CSS.

**Tool: bash**

**Input:**
```json
{
  "description": "Verify key selectors in built CSS",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"\\.wc-match-card-teams|\\.wc-flag\\.wc-\\w|\\.wc-group-card|\\.wc-standings-table|wc-groups-grid\" -SimpleMatch"
}
```

**Output:**
```
(no output)
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 7.8s)

_Thinking:_

-no output means no matches found. That seems surprising. Maybe the CSS minification removed the dots or combined selectors strangely. Let me search without the dot prefix.

**Tool: bash**

**Input:**
```json
{
  "description": "Check built CSS content for key strings",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"wc-match-card-teams\" -SimpleMatch"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a68018001lIMOLN9oK4RiBh

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

**Tool: bash**

**Input:**
```json
{
  "description": "Check for wc-grid-2col in built CSS",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"wc-grid-2col\" -SimpleMatch"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a6826a001UtkBlUYr2axlAy

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

**Tool: bash**

**Input:**
```json
{
  "description": "Check stale classes are NOT in built CSS",
  "command": "Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"wc-group-card\" -SimpleMatch; Select-String -Path \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\" -Pattern \"wc-standings-table\" -SimpleMatch"
}
```

**Output:**
```
...output truncated...

Full output saved to: C:\Users\jayno\.local\share\opencode\tool-output\tool_e93a68509001Rc1VfLJxH7dkK6

rgba(255,255,255,.12);border-radius:8px;box-shadow:0 8px 24px 
#0006}.podium-dropdown-option{display:flex;align-items:center;gap:8px;padding:6px 
10px;font-size:.78rem;cursor:pointer;transition:background .1s}.podium-dropdown-option:hover{background:#ffffff14}.podi
um-dropdown-option.is-selected{background:#3ddc841f;color:#3ddc84}.podium-dropdown-option:first-child{border-radius:8px
 8px 0 0}.podium-dropdown-option:last-child{border-radius:0 0 8px 8px}.podium-error{background:#ff50501f;border:1px 
solid rgba(255,80,80,.2);color:#ff6060;padding:8px 12px;border-radius:8px;font-size:.78rem;text-align:center;margin-bot
tom:12px}.podium-footer{display:flex;gap:10px;justify-content:flex-end}.podium-skip-btn{padding:8px 16px;border:1px 
solid rgba(255,255,255,.12);border-radius:8px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;cursor:pointer;transi
tion:all .12s}.podium-skip-btn:hover{background:#ffffff14}.podium-save-btn{padding:8px 20px;border:1px solid rgba(61,22
0,132,.3);border-radius:8px;background:#3ddc841f;color:#3ddc84;font-size:.82rem;font-weight:700;cursor:pointer;transiti
on:all .12s}.podium-save-btn:hover:not(:disabled){background:#3ddc8438}.podium-save-btn:disabled{opacity:.5;cursor:not-
allowed}.podium-flag{border-radius:2px;display:block}.podium-flag-placeholder{width:18px;height:13px;display:inline-blo
ck;background:#ffffff0f;border-radius:2px}.podium-saved{display:flex;flex-direction:column;align-items:center;padding:2
0px 0;text-align:center}.podium-saved-icon{font-size:2.5rem;margin-bottom:12px}.podium-saved-title{margin:0 0 
6px;font-size:1.2rem;font-weight:700;color:#3ddc84}.podium-saved-text{margin:0 0 16px;font-size:.82rem;color:#8aa0c0;ma
x-width:320px}.podium-saved-picks{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}.podium-saved-row{displ
ay:flex;align-items:center;gap:8px;padding:6px 
14px;background:#ffffff0a;border-radius:8px;font-size:.85rem;font-weight:600}.podium-continue-btn{padding:10px 
32px;border:1px solid rgba(61,220,132,.4);border-radius:8px;background:#3ddc8426;color:#3ddc84;font-size:.9rem;font-wei
ght:700;cursor:pointer;transition:all .12s}.podium-continue-btn:hover{background:#3ddc8440}.podium-points-summary{displ
ay:flex;gap:16px;justify-content:center;font-size:.78rem;color:#b0c4e0;margin-bottom:12px;padding:8px 12px;background:#
ffffff05;border-radius:8px}.podium-points-triple{color:#f0c040}.podium-deadline{text-align:center;padding:8px 
12px;font-size:.75rem;color:#ff6b6b;border-top:1px solid rgba(255,255,255,.06);margin-bottom:8px}.podium-saved-pts{font
-size:.72rem;font-weight:700;color:#3ddc84;margin-left:auto}.dash-name-card{margin-bottom:10px}.dash-name-editor{paddin
g:8px 10px 4px}.dash-name-display-row{display:flex;align-items:center;gap:6px}.dash-name-label{font-size:.82rem;font-we
ight:600}.dash-name-edit-btn{background:none;border:none;color:#8aa0c0;font-size:.78rem;cursor:pointer;padding:0;line-h
eight:1;transition:color .12s}.dash-name-edit-btn:hover{color:#18c8ff}.dash-name-saved{font-size:.68rem;color:#3ddc84;f
ont-weight:600}.dash-name-edit-row{display:flex;gap:6px;align-items:center}.dash-name-input{flex:1;max-width:220px;padd
ing:4px 10px;border:1px solid rgba(61,220,132,.4);border-radius:6px;background:#ffffff0f;color:#f0f4ff;font-size:.8rem;
outline:none}.dash-name-input:focus{border-color:#3ddc84b3}.dash-name-btn{padding:4px 
10px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .12s;border:1px solid rgba(255,255
,255,.15)}.dash-name-btn--save{background:#3ddc8426;border-color:#3ddc844d;color:#3ddc84}.dash-name-btn--save:hover:not
(:disabled){background:#3ddc8440}.dash-name-btn--save:disabled{opacity:.5;cursor:not-allowed}.dash-name-btn--cancel{bac
kground:#ff50501a;border-color:#ff505033;color:#ff6060}.dash-name-btn--cancel:hover{background:#ff505033}.dash-name-err
or{font-size:.68rem;color:#ff6060;margin-top:4px}.join-notification{position:fixed;top:12px;left:50%;transform:translat
e(-50%);z-index:10000;padding:8px 20px;border-radius:8px;background:#3ddc8426;border:1px solid 
rgba(61,220,132,.25);color:#3ddc84;font-size:.82rem;font-weight:600;animation:fadeIn .2s 
ease-out}@media(max-width:768px){.sidebar{width:56px;flex:0 0 56px}.sidebar-brand-text,.sidebar-link-label,.sidebar-use
r,.sidebar-logout{display:none}.sidebar-brand{justify-content:center;padding:8px 4px 
12px}.sidebar-brand-icon{font-size:1.2rem}.sidebar-link{justify-content:center;padding:8px 
4px}.sidebar-link-icon{width:auto;font-size:1.1rem}.sidebar-footer{display:flex;justify-content:center;padding:8px 
4px}.app-main{max-width:calc(100vw - 56px)}}.rules-header{text-align:center;margin-bottom:24px;padding:0 
8px}.rules-header-icon{font-size:2rem;display:block;margin-bottom:8px}.rules-header-title{margin:0 0 6px;font-size:1.3r
em;font-weight:700;background:linear-gradient(135deg,#3ddc84,#18c8ff);-webkit-background-clip:text;-webkit-text-fill-co
lor:transparent;background-clip:text}.rules-header-subtitle{margin:0;font-size:.82rem;color:#8aa0c0}.rules-grid{display
:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}.rules-card{padding:16px 18px}.rules-card-head
er{display:flex;align-items:center;gap:10px;margin-bottom:14px}.rules-card-icon{font-size:1.3rem}.rules-card-title{marg
in:0;font-size:.95rem;font-weight:700;color:#d0dcee}.rules-card-body{display:flex;flex-direction:column;gap:10px}.rules
-item{padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.05)}.rules-item:last-child{padding-bottom:0;border-
bottom:none}.rules-item-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.rules-item-label{fon
t-size:.82rem;font-weight:600;color:#e8f0f8}.rules-item-value{font-size:.78rem;font-weight:700;padding:2px 
10px;border-radius:999px;background:#3ddc841f;color:#3ddc84;white-space:nowrap}.rules-item-desc{margin:4px 0 
0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.podium-name-section{margin:8px 22px 
14px}.podium-saved-name{margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}.podium-name-editor
{display:flex;flex-direction:column;gap:6px}.podium-name-edit-row{display:flex;align-items:center;gap:6px}.podium-name-
input{flex:1;padding:6px 12px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#ffffff0f;color:#e8f0
f8;font-size:.8rem;outline:none;transition:border-color .15s}.podium-name-input:focus{border-color:#3ddc8480}.podium-na
me-input::placeholder{color:#8aa0c0}.podium-name-btn{width:30px;height:30px;border-radius:8px;border:none;font-size:.85
rem;display:grid;place-items:center;transition:background .12s}.podium-name-btn--save{background:#3ddc8433;color:#3ddc8
4}.podium-name-btn--save:hover:not(:disabled){background:#3ddc8459}.podium-name-btn--cancel{background:#ff505026;color:
#ff6060}.podium-name-btn--cancel:hover{background:#ff50504d}.podium-name-display-row{display:flex;align-items:center;ga
p:8px;justify-content:center}.podium-name-label{font-size:.82rem;color:#b8d0e8;font-weight:600}.podium-name-edit-btn{ba
ckground:none;border:none;color:#8aa0c0;font-size:.9rem;padding:2px;transition:color .12s}.podium-name-edit-btn:hover{c
olor:#18c8ff}.podium-name-saved{font-size:.7rem;color:#3ddc84;font-weight:600}.podium-name-error{font-size:.72rem;color
:#ff6060;text-align:center}.league-card--clickable{cursor:pointer;transition:border-color .12s,background .12s}.league-
card--clickable:hover{border-color:#3ddc8433;background:#ffffff0d}.league-detail-share{display:flex;gap:8px;margin-top:
10px}.league-detail-share .league-share-btn{flex:1;padding:7px 
12px;font-size:.75rem}.league-prize-locked{display:flex;align-items:center;gap:10px;padding:10px 
14px;margin-bottom:10px;background:#3ddc8414;border:1px solid rgba(61,220,132,.2);border-radius:8px}.league-prize-locke
d-icon{font-size:1.2rem}.league-prize-locked-text{font-size:.82rem;color:#e8f0f8;line-height:1.4}.league-detail-panel{p
adding:20px 24px}.league-detail-header{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}.league-detail-ba
ck{align-self:flex-start;padding:4px 12px;border:1px solid rgba(24,200,255,.25);border-radius:6px;background:#18c8ff14;
color:#18c8ff;font-size:.72rem;cursor:pointer;transition:background .12s}.league-detail-back:hover{background:#18c8ff2e
}.league-detail-title-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.league-detail-title{margin:0;font-si
ze:1.2rem;font-weight:700}.league-detail-actions{display:flex;gap:8px}.league-btn--edit{padding:4px 14px;border:1px 
solid rgba(24,200,255,.3);border-radius:6px;background:#18c8ff14;color:#18c8ff;font-size:.72rem;cursor:pointer;transiti
on:background .12s}.league-btn--edit:hover{background:#18c8ff2e}.league-btn--delete{padding:4px 14px;border:1px solid r
gba(255,80,80,.3);border-radius:6px;background:#ff505014;color:#ff6060;font-size:.72rem;cursor:pointer;transition:backg
round .12s}.league-btn--delete:hover{background:#ff50502e}.league-detail-info{display:flex;flex-direction:column;gap:8p
x;margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid rgba(255,255,255,.06)}.league
-detail-code-section{margin-bottom:14px}.league-detail-code-row{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#3ddc840f;border:1px solid rgba(61,220,132,.2);border-radius:10px;flex-wrap:wrap}.league-detail-code-la
bel{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#3ddc84}.league-detail-code-val
ue{font-size:1.1rem;font-weight:900;letter-spacing:.2em;color:#e8f0f8;font-family:Courier 
New,monospace;background:#0003;padding:2px 
10px;border-radius:4px}.league-detail-code-copy{margin-left:auto;padding:4px 12px;border:1px solid rgba(61,220,132,.3);
border-radius:20px;background:transparent;color:#3ddc84;font-size:.68rem;font-weight:600;cursor:pointer;white-space:now
rap;transition:background .12s}.league-detail-code-copy:hover{background:#3ddc841f}.league-detail-info-row{display:flex
;align-items:center;gap:10px;font-size:.8rem}.league-detail-info-label{color:#8aa0c0;min-width:60px}.league-detail-info
-value{color:#e8f0f8;font-weight:600}.league-detail-prizes{display:flex;flex-wrap:wrap;gap:6px}.league-detail-prize-tag
{padding:2px 8px;border-radius:4px;background:#3ddc841a;color:#3ddc84;font-size:.72rem;font-weight:600}.league-detail-p
ay-link{color:gold;text-decoration:underline;font-size:.82rem;transition:color .12s}.league-detail-pay-link:hover{color
:#fff}.league-detail-edit{margin-bottom:16px;padding:12px;background:#ffffff08;border-radius:8px;border:1px solid 
rgba(255,255,255,.06)}.league-edit-buttons{display:flex;gap:8px;margin-top:10px}.league-btn--cancel{padding:6px 
16px;border:1px solid rgba(255,255,255,.12);border-radius:6px;background:#ffffff0a;color:#b0c4e0;font-size:.78rem;curso
r:pointer;transition:background .12s}.league-btn--cancel:hover{background:#ffffff14}.league-delete-confirm{margin-botto
m:16px;padding:14px;background:#ff50500f;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.league-delete-text{margin:0 0 
10px;font-size:.8rem;color:#ff9090}.league-delete-buttons{display:flex;gap:8px}.league-btn--delete-confirm{padding:6px 
16px;border:1px solid rgba(255,80,80,.4);border-radius:6px;background:#ff505033;color:#ff6060;font-size:.78rem;font-wei
ght:600;cursor:pointer;transition:background .12s}.league-btn--delete-confirm:hover:not(:disabled){background:#ff505059
}.league-detail-section-title{font-size:.85rem;font-weight:700;margin:0 0 10px;color:#8fcbff;letter-spacing:.04em;text-
transform:uppercase}.league-detail-leaderboard{margin-top:16px}.league-detail-row{display:flex;align-items:center;gap:1
0px;padding:6px 10px;font-size:.78rem;border-bottom:1px solid rgba(255,255,255,.04)}.league-detail-row:last-child{borde
r-bottom:none}.league-detail-row--me{background:#3ddc840f;border-radius:4px}.league-detail-rank{width:28px;font-weight:
700;color:#18c8ff;font-size:.72rem}.league-detail-name{flex:1}.league-detail-pts{font-weight:600;color:#3ddc84;min-widt
h:50px;text-align:right}.league-detail-pay-label{display:flex;align-items:center;gap:4px;font-size:.68rem;color:#8aa0c0
;cursor:pointer}.league-detail-pay-check{cursor:pointer}.league-chat-toggle{display:flex;align-items:center;gap:8px;fon
t-size:.78rem;color:#b0c4e0;cursor:pointer}.league-chat-toggle input[type=checkbox]{accent-color:#3ddc84;width:16px;hei
ght:16px;cursor:pointer}.league-chat-section{margin-top:20px;border-top:1px solid rgba(255,255,255,.06);padding-top:16p
x}.league-chat-messages{max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px;backgro
und:#00000026;border-radius:8px;margin-bottom:8px}.league-chat-empty{text-align:center;color:#8aa0c0;font-size:.75rem;p
adding:16px 0}.league-chat-msg{display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:6px;background:
#ffffff08}.league-chat-msg--me{background:#3ddc840f}.league-chat-msg-author{font-size:.65rem;font-weight:700;letter-spa
cing:.02em}.league-chat-msg-text{font-size:.78rem;color:#e8f0f8;word-break:break-word}.league-chat-input-row{display:fl
ex;gap:6px}.league-chat-input{flex:1;padding:8px 10px;border:1px solid rgba(255,255,255,.1);border-radius:8px;backgroun
d:#0003;color:#e8f0f8;font-size:.78rem;outline:none}.league-chat-input:focus{border-color:#3ddc8466}.league-chat-send{p
adding:8px 14px;border:none;border-radius:8px;background:linear-gradient(135deg,#1a7aff,#5bc0ff);color:#fff;font-size:.
78rem;font-weight:700;cursor:pointer;transition:filter .12s}.league-chat-send:hover:not(:disabled){filter:brightness(1.
15)}.league-chat-send:disabled{opacity:.4;cursor:not-allowed}.league-card-badges{display:flex;gap:4px;flex-wrap:wrap}.l
eague-card-badge--official{background:#3ddc8426;color:#3ddc84}.league-card-badge--admin{background:#18c8ff1f;color:#18c
8ff}.league-card-badge--paid{background:#f0c0401a;color:#f0c040}.league-create-options{display:flex;gap:10px;flex-wrap:
wrap}.league-btn--fun{padding:10px 20px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;col
or:#3ddc84;font-size:.82rem;font-weight:600;cursor:pointer;transition:background 
.12s}.league-btn--fun:hover{background:#3ddc8433}.league-btn--stakes{padding:10px 20px;border:1px solid rgba(240,192,64
,.3);border-radius:8px;background:#f0c0401a;color:#f0c040;font-size:.82rem;font-weight:600;cursor:pointer;transition:ba
ckground .12s}.league-btn--stakes:hover{background:#f0c04033}.league-create-form,.league-stake-section{display:flex;fle
x-direction:column;gap:10px}.league-input--stake{max-width:180px}.league-prizes-section{display:flex;flex-direction:col
umn;gap:6px}.league-prizes-label{font-size:.75rem;font-weight:600;color:#8fcbff}.league-prize-row{display:flex;align-it
ems:center;gap:6px}.league-prize-check{cursor:pointer}.league-prize-label{font-size:.75rem;color:#b0c4e0;min-width:30px
;font-weight:600}.league-input--prize{max-width:120px}.league-prize-remove{width:24px;height:24px;border:1px solid rgba
(255,80,80,.2);border-radius:4px;background:#ff505014;color:#ff6060;font-size:.65rem;cursor:pointer;display:grid;place-
items:center;transition:background 
.12s}.league-prize-remove:hover{background:#ff505033}.league-btn--add-prize{align-self:flex-start;padding:4px 
12px;border:1px dashed rgba(24,200,255,.3);border-radius:6px;background:#18c8ff0a;color:#18c8ff;font-size:.7rem;cursor:
pointer;transition:background .12s}.league-btn--add-prize:hover{background:#18c8ff1f}.league-member-check{cursor:pointe
r;width:14px;height:14px;accent-color:#3ddc84}.sidebar-notif-row{padding:6px 12px;border-top:1px solid rgba(255,255,255
,.06);margin-bottom:4px}.sidebar-notif-link{display:flex;align-items:center;gap:6px;color:#8aa0c0;font-size:.72rem;text
-decoration:none;transition:color .12s}.sidebar-notif-link:hover{color:#18c8ff}.sidebar-notif-bell{font-size:.9rem}.sid
ebar-notif-count{background:#ff6060;color:#fff;font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:999px;min-
width:16px;text-align:center;line-height:1.3}.sidebar-notif-label{font-size:.7rem}.wc-modal-wildcard{max-width:420px}.w
c-wildcard-card{perspective:1000px}.wc-wildcard-card-inner{transition:transform .6s ease-in-out;transform-style:preserv
e-3d;position:relative}.wc-wildcard-card-flipped{transform:rotateY(180deg)}.wc-wildcard-card-front,.wc-wildcard-card-ba
ck{backface-visibility:hidden;-webkit-backface-visibility:hidden}.wc-wildcard-card-front{position:relative;background-s
ize:cover;background-position:center;border-radius:12px;overflow:hidden;min-height:300px}.wc-wildcard-card-front-overla
y{position:absolute;inset:0;background:#06142bb3;z-index:1}.wc-wildcard-card-back{position:absolute;top:0;left:0;width:
100%;min-height:300px;max-height:70vh;overflow-y:auto;transform:rotateY(180deg);background:linear-gradient(180deg,#0a1f
47,#0a2a5a 40%,#081d3f);border-radius:12px}.wc-wildcard-card-front-content{display:flex;flex-direction:column;align-ite
ms:center;padding:32px 20px;gap:8px;position:relative;z-index:2}.wc-wildcard-pick-body{padding:6px 20px 16px}.wc-wildca
rd-days-list{display:flex;flex-direction:column;gap:12px}.wc-wildcard-day-block{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.wc-wildcard-day-
header{font-size:.78rem;font-weight:700;color:#e8f0f8}.wc-wildcard-day-games{display:flex;flex-direction:column;gap:3px
;max-height:160px;overflow-y:auto}.wc-wildcard-day-game{display:flex;align-items:center;gap:5px;font-size:.72rem;color:
#b0c4e0;min-width:0}.wc-wildcard-day-flag{width:16px;height:12px;border-radius:2px;object-fit:cover;flex:0 0 16px}.wc-w
ildcard-day-team{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:90px;font-size:.72rem}.wc-wildcard
-day-vs{color:#ffffff4d;font-size:.65rem;flex:0 0 
auto}.wc-wildcard-day-no-games{font-size:.72rem;color:#8aa0c0;padding:4px 0}.wc-wildcard-select-btn{padding:7px 16px;bo
rder:none;border-radius:6px;background:linear-gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.72rem;font-weight:
800;cursor:pointer;transition:filter .12s;align-self:flex-start}.wc-wildcard-select-btn:hover{filter:brightness(1.15)}.
wc-wildcard-confirm-body{padding:16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:ce
nter}.wc-wildcard-confirm-date{font-size:1rem;font-weight:700;color:#f0c040}.wc-wildcard-confirm-games{display:flex;fle
x-direction:column;gap:4px;width:100%;max-height:200px;overflow-y:auto;padding:8px 12px;background:#00000026;border-rad
ius:8px}.wc-wildcard-confirm-note{font-size:.85rem;color:#b0c8e0;line-height:1.5}.wc-wildcard-confirm-actions{display:f
lex;gap:10px;margin-top:4px}.wc-wildcard-confirm-btn{padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#3ddc84,#18c8ff);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.
wc-wildcard-confirm-btn:hover:not(:disabled){filter:brightness(1.15)}.wc-wildcard-confirm-btn:disabled{opacity:.5;curso
r:not-allowed}.wc-wildcard-stamp{font-size:3rem;animation:wc-wildcard-pulse 1.5s ease-in-out infinite}@keyframes wc-wil
dcard-pulse{0%,to{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.7}}.wc-wildcard-title{font-size:1.6re
m;font-weight:900;letter-spacing:.12em;background:linear-gradient(135deg,#f0c040,#f80);-webkit-background-clip:text;-we
bkit-text-fill-color:transparent;background-clip:text;margin:0}.wc-wildcard-subtitle{font-size:.8rem;color:#b0c4e0;text
-transform:uppercase;letter-spacing:.06em}.wc-wildcard-multiplier{font-size:1.1rem;font-weight:800;color:#f0c040;letter
-spacing:.04em}.wc-wildcard-flip-btn{margin-top:12px;padding:10px 24px;border:none;border-radius:8px;background:linear-
gradient(135deg,#f0c040,#f80);color:#0a1f47;font-size:.85rem;font-weight:800;cursor:pointer;transition:filter .12s}.wc-
wildcard-flip-btn:hover{filter:brightness(1.15)}.league-card-edit-inline{display:flex;align-items:center;gap:4px;flex:1
}.league-input--inline{max-width:180px;font-size:.78rem;padding:3px 8px}.league-card-edit-icon{width:22px;height:22px;b
order:none;border-radius:4px;font-size:.65rem;display:grid;place-items:center;cursor:pointer;transition:background .12s
}.league-card-edit-icon--save{background:#3ddc8426;color:#3ddc84}.league-card-edit-icon--save:hover{background:#3ddc844
d}.league-card-edit-icon--cancel{background:#ff50501a;color:#ff6060}.league-card-edit-icon--cancel:hover{background:#ff
505040}.league-card-admin-actions{display:flex;gap:2px;margin-left:4px}.league-card-admin-btn{width:22px;height:22px;bo
rder:none;border-radius:4px;background:#ffffff0d;color:#8aa0c0;font-size:.65rem;display:grid;place-items:center;cursor:
pointer;transition:all .12s}.league-card-admin-btn:hover{background:#18c8ff26;color:#18c8ff}.league-card-admin-btn--del
ete:hover{background:#ff505026;color:#ff6060}.league-card-delete-confirm{padding:8px 
12px;background:#ff50500f;border-top:1px solid rgba(255,80,80,.1)}.league-card-delete-text{margin:0 0 6px;font-size:.72
rem;color:#ff9090}.league-card-delete-actions{display:flex;gap:6px}.league-input--textarea{resize:vertical;min-height:6
0px;font-family:inherit;font-size:.78rem;line-height:1.4;padding:8px 10px}.league-card-desc{padding:6px 12px 2px;font-s
ize:.72rem;color:#8aa0c0;line-height:1.4;white-space:pre-wrap;word-break:break-word}.league-section--free{border-left:3
px solid rgba(61,220,132,.2);padding-left:10px}.league-section--paid{border-left:3px solid 
rgba(240,192,64,.3);padding-left:10px}.league-card--free{background:#ffffff05;border:1px solid 
rgba(255,255,255,.06);transition:border-color 
.15s}.league-card--free:hover{border-color:#3ddc8426}.league-card--paid{background:#ffc83205;border:1px solid 
rgba(240,192,64,.1);transition:border-color .15s,box-shadow 
.15s}.league-card--paid:hover{border-color:#f0c04040;box-shadow:0 0 12px #f0c0400a}.league-card-meta-members,.league-ca
rd-meta-rank{display:flex;align-items:center;gap:4px}.league-detail-desc{padding:12px 
0;font-size:.82rem;color:#b0c4e0;line-height:1.5;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgb
a(255,255,255,.06);margin-bottom:12px}.league-prize-pct-sign{font-size:.78rem;color:#8aa0c0;min-width:14px}.league-calc
ulator{margin-top:10px;padding:10px 12px;border-radius:8px;background:#18c8ff0a;border:1px solid rgba(24,200,255,.1)}.l
eague-calculator-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#18c8ff;mar
gin-bottom:6px}.league-calculator-row{display:flex;justify-content:space-between;align-items:center;font-size:.75rem;pa
dding:2px 0;color:#b0c4e0}.league-calculator-row--fee{color:#ff9090}.league-calculator-row--pool{font-weight:700;color:
#e8f0f8;border-top:1px solid rgba(255,255,255,.06);padding-top:4px;margin-top:2px}.league-calculator-row--prize{color:#
f0c040;font-weight:600}.league-calculator-note{font-size:.65rem;color:#ffffff4d;margin-top:4px;font-style:italic}.rules
-panel{padding:20px 
24px}.rules-hero-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:20px}.rules-hero-card{padding:18px 
20px;border-radius:14px;border:1px solid rgba(255,255,255,.08)}.rules-hero-card--match{background:linear-gradient(135de
g,#3ddc8414,#3ddc8405);border-color:#3ddc8426}.rules-hero-card--podium{background:linear-gradient(135deg,#18c8ff14,#18c
8ff05);border-color:#18c8ff26}.rules-hero-card--wildcard{background:linear-gradient(135deg,#f0c04014,#f0c04005);border-
color:#f0c04026}.rules-hero-icon{font-size:1.8rem;margin-bottom:6px}.rules-hero-title{margin:0 0 
12px;font-size:1.1rem;font-weight:700}.rules-hero-card--match .rules-hero-title{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-title{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-title{color:#f0c040}.rules-hero-items{display:fl
ex;flex-direction:column;gap:8px}.rules-hero-item{display:flex;align-items:center;gap:12px;padding:8px 
12px;background:#ffffff08;border-radius:8px}.rules-podium-split{display:grid;grid-template-columns:1fr 1fr;gap:10px;mar
gin-top:12px}@media(max-width:500px){.rules-podium-split{grid-template-columns:1fr}}.rules-podium-sub{display:flex;alig
n-items:flex-start;gap:10px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.07)}.rules-podium-sub--c
hange{background:#18c8ff0f;border-color:#18c8ff26}.rules-podium-sub--stick{background:#f0c0400f;border-color:#f0c04026}
.rules-podium-sub-icon{font-size:1.2rem;flex-shrink:0;margin-top:1px}.rules-podium-sub-title{display:block;font-size:.8
5rem;font-weight:700;margin-bottom:2px}.rules-podium-sub--change 
.rules-podium-sub-title{color:#18c8ff}.rules-podium-sub--stick .rules-podium-sub-title{color:#f0c040}.rules-podium-sub-
text{margin:0;font-size:.74rem;color:#8aa0c0;line-height:1.4}.wc-modal-immersive{max-width:480px;width:calc(100% - 32px
);padding:0;overflow:hidden;position:relative;border-radius:16px}.wc-modal-immersive-bg{position:absolute;inset:0;backg
round-size:cover;background-position:center;background-repeat:no-repeat;z-index:0}.wc-modal-immersive-overlay{position:
absolute;inset:0;background:linear-gradient(180deg,#06142b26,#06142b59,#06142bbf 60%,#06142beb);z-index:1}.wc-modal-imm
ersive-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 20px 14px
;gap:10px}.wc-immersive-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border:none;border-radius:50
%;background:#00000073;color:#fff;font-size:1.15rem;cursor:pointer;display:grid;place-items:center;transition:backgroun
d .12s;z-index:3;line-height:1}.wc-immersive-close:hover{background:#fff3}.wc-immersive-teams{display:flex;align-items:
flex-start;justify-content:center;gap:12px;width:100%;padding-top:4px}.wc-immersive-team{display:flex;flex-direction:co
lumn;align-items:center;gap:4px;flex:1;max-width:160px}.wc-flag-circle-wrap{width:52px;height:52px;border-radius:50%;ov
erflow:hidden;background:#ffffff14;border:2px solid rgba(255,255,255,.2);flex:0 0 auto}.wc-flag-circle{width:100%;heigh
t:100%;object-fit:cover;display:block}.wc-flag-circle-placeholder{width:52px;height:52px;border-radius:50%;display:grid
;place-items:center;background:#ffffff0f;border:2px solid 
rgba(255,255,255,.12);font-size:1.2rem;color:#ffffff59;flex:0 0 auto}.wc-immersive-team-name{font-size:.82rem;font-weig
ht:700;color:#fff;text-align:center;line-height:1.2;text-shadow:0 1px 4px 
rgba(0,0,0,.6)}.wc-immersive-team-rank{font-size:.6rem;font-weight:600;color:#f0c040;text-shadow:0 1px 4px rgba(0,0,0,.
6)}.wc-immersive-team-form{display:flex;gap:3px}.wc-immersive-vs{font-size:.65rem;font-weight:700;color:#ffffff4d;paddi
ng-top:16px;flex:0 0 
auto;letter-spacing:.12em}.wc-immersive-scoreboard{display:flex;align-items:center;gap:6px;margin:2px 0}.wc-flip-digits
{display:flex;gap:2px}.wc-flip-digit{display:grid;place-items:center;width:34px;height:46px;background:#081228e0;border
:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:1.5rem;font-weight:800;color:#f0c040;font-family:Courier 
New,Consolas,monospace;line-height:1;text-shadow:0 0 6px 
rgba(240,192,64,.25)}.wc-flip-input{width:42px;height:46px;padding:0;border:1px solid rgba(240,192,64,.25);border-radiu
s:5px;background:#081228e0;color:#f0c040;font-size:1.5rem;font-weight:800;font-family:Courier 
New,Consolas,monospace;text-align:center;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:text
field;caret-color:#f0c040}.wc-flip-input::-webkit-inner-spin-button,.wc-flip-input::-webkit-outer-spin-button{-webkit-a
ppearance:none;margin:0}.wc-flip-input:focus{border-color:#f0c04099;box-shadow:0 0 10px 
#f0c04026}.wc-flip-colon{font-size:1.5rem;font-weight:800;color:#f0c04099;font-family:Courier New,Consolas,monospace;li
ne-height:1;width:12px;text-align:center}.wc-score-spinner{display:flex;align-items:center;gap:2px}.wc-score-arrows{dis
play:flex;flex-direction:column;gap:1px}.wc-score-arrow{width:18px;height:20px;border:1px solid rgba(240,192,64,.2);bor
der-radius:3px;background:#081228e0;color:#f0c040;font-size:.45rem;line-height:1;padding:0;cursor:pointer;display:grid;
place-items:center;transition:background .1s,border-color .1s}.wc-score-arrow:hover{background:#f0c04026;border-color:#
f0c04066}.wc-immersive-save-status{font-size:.62rem;font-weight:600;letter-spacing:.04em;text-shadow:0 1px 3px rgba(0,0
,0,.6)}.wc-immersive-save-status--saving{color:#ffffff73}.wc-immersive-save-status--saved{color:#3ddc84;animation:wcSav
edFade 2s ease-out forwards}.wc-immersive-kickoff{font-size:.7rem;color:#ffffff8c;text-align:center;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-immersive-location{display:flex;align-items:center;justify-content:center;gap:5px;width:100%;pad
ding:5px 12px;background:#0000004d;border:1px solid rgba(255,255,255,.06);border-radius:8px;font-size:.65rem;color:#fff
fffa6;flex-wrap:wrap;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.wc-location-divider{opacity:.3}.wc-im
mersive-footer{font-size:.6rem;font-weight:700;letter-spacing:.14em;color:#ffffff4d;text-align:center;text-transform:up
percase;padding-top:2px}.wc-save-pred-btn{display:inline-block;padding:8px 28px;border:1.5px solid #f0c040;border-radiu
s:6px;background:transparent;color:#f0c040;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:upperca
se;cursor:pointer;transition:background .15s,color .15s}.wc-save-pred-btn:hover:not(:disabled){background:#f0c040;color
:#06142b}.wc-save-pred-btn:disabled{opacity:.4;cursor:not-allowed}.wc-save-error{color:#ff6b6b;font-size:.75rem;margin-
top:6px;text-align:center}.wc-immersive-wildcard{width:100%;padding:6px 
0}.wc-wildcard-activated{font-size:.68rem;color:#f0c040;text-align:center;text-shadow:0 1px 3px 
rgba(0,0,0,.6)}.wc-wildcard-prompt{font-size:.65rem;color:#fff9;text-align:center;margin-bottom:4px;text-shadow:0 1px 
3px rgba(0,0,0,.6)}.wc-wildcard-days{display:flex;flex-wrap:wrap;gap:4px;justify-content:center}.wc-wildcard-day{paddin
g:3px 8px;border:1px solid rgba(240,192,64,.3);border-radius:4px;background:#f0c04014;color:#f0c040;font-size:.65rem;fo
nt-weight:600;cursor:pointer;transition:background .12s}.wc-wildcard-day:hover{background:#f0c04033}.wc-immersive-admin
-toggle{position:absolute;top:12px;right:48px;width:32px;height:32px;border:none;border-radius:50%;background:#00000073
;color:#ffffff80;font-size:.9rem;cursor:pointer;display:grid;place-items:center;transition:all .12s;z-index:3;line-heig
ht:1}.wc-immersive-admin-toggle:hover{background:#fff3;color:#fff}.wc-immersive-admin{position:relative;z-index:2;paddi
ng:12px 16px;border-top:1px solid 
rgba(255,255,255,.06);background:#06142bf0;display:flex;flex-direction:column;gap:10px}.wc-immersive-admin h4{margin:0;
font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#8aa0c0}.wc-immersive-admin-row{di
splay:flex;align-items:center;gap:6px;flex-wrap:wrap}.wc-immersive-others{position:relative;z-index:2;width:100%;paddin
g:10px 16px 12px;border-top:1px solid rgba(255,255,255,.05);background:#06142be6;display:flex;flex-direction:column;gap
:4px}.wc-immersive-others-title{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ff
ffff4d;margin-bottom:2px}.wc-immersive-others-row{display:flex;align-items:center;gap:8px;font-size:.72rem;padding:3px 
8px;border-radius:4px;background:#ffffff08}.wc-immersive-others-name{font-weight:600;min-width:0;overflow:hidden;text-o
verflow:ellipsis;white-space:nowrap}.wc-immersive-others-score{margin-left:auto;font-weight:700;font-family:Courier 
New,Consolas,monospace;color:#f0c040}.wc-immersive-others-pts{font-size:.62rem;font-weight:700;padding:1px 6px;border-r
adius:3px}.wc-immersive-others-pts--exact{background:#3ddc8433;color:#3ddc84}.wc-immersive-others-pts--outcome{backgrou
nd:#18c8ff26;color:#18c8ff}.wc-immersive-others-pts--wrong{background:#ff50501a;color:#ff6060}@media(max-width:700px){.
wc-modal-immersive{max-width:calc(100% - 16px);border-radius:12px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{widt
h:42px;height:42px}.wc-immersive-team-name{font-size:.72rem}.wc-flip-digit{width:30px;height:40px;font-size:1.3rem}.wc-
flip-input{width:36px;height:40px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-modal-immersive-content{padding:
12px 14px 10px;gap:8px}.wc-immersive-teams{gap:8px}}@media(max-width:500px){.wc-flag-circle-wrap,.wc-flag-circle-placeh
older{width:36px;height:36px}.wc-immersive-team-name{font-size:.65rem}.wc-immersive-team-rank{font-size:.55rem}.wc-flip
-digit{width:26px;height:36px;font-size:1.1rem}.wc-flip-input{width:32px;height:36px;font-size:1.1rem}.wc-flip-colon{fo
nt-size:1.1rem;width:8px}}.rules-hero-points{font-size:1.5rem;font-weight:800;min-width:60px;letter-spacing:-.02em}.rul
es-hero-card--match .rules-hero-points{color:#3ddc84}.rules-hero-card--podium 
.rules-hero-points{color:#18c8ff}.rules-hero-card--wildcard .rules-hero-points{color:#f0c040}.rules-hero-points--zero{c
olor:#8aa0c0!important;font-size:1.2rem}.rules-hero-points--triple{color:#f0c040!important}.rules-hero-detail{display:f
lex;flex-direction:column;gap:1px}.rules-hero-detail strong{font-size:.85rem;color:#e8f0f8}.rules-hero-detail span{font
-size:.72rem;color:#8aa0c0}.rules-secondary-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))
;gap:10px}.rules-secondary-card{padding:14px 16px}.rules-secondary-header{display:flex;align-items:center;gap:8px;margi
n-bottom:8px}.rules-secondary-icon{font-size:1.1rem}.rules-secondary-title{margin:0;font-size:.85rem;font-weight:700;co
lor:#8fcbff}.rules-secondary-body p{margin:0 0 
6px;font-size:.74rem;color:#b0c4e0;line-height:1.4}.rules-secondary-body p:last-child{margin-bottom:0}.my-pred-hero{wid
th:100%;background:linear-gradient(135deg,#3ddc8414,#3ddc8405);border:1px solid 
rgba(61,220,132,.18);border-radius:14px;padding:14px 16px;margin-bottom:14px}.my-pred-hero--empty{background:#ffffff08;
border-color:#ffffff0f}.my-pred-hero-title{font-size:.78rem;font-weight:700;letter-spacing:.04em;color:#3ddc84;margin-b
ottom:10px}.my-pred-hero--empty 
.my-pred-hero-title{color:#b0c4e0}.my-pred-hero-grid{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:10px}.my-pred-hero-game{background:#0000004d;border:1px solid 
rgba(255,255,255,.08);border-radius:12px;padding:14px 14px 12px;display:flex;flex-direction:column;gap:10px}.my-pred-he
ro-game-row{display:flex;align-items:center;gap:8px}.my-pred-hero-game-team{display:flex;flex-direction:row;align-items
:center;gap:5px;flex:1;min-width:0}.my-pred-hero-game-team--right{text-align:right}.my-pred-hero-game-name{font-size:.8
2rem;font-weight:600;color:#e8f0f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.my-pred-he
ro-game-score-wrap{display:flex;align-items:center;gap:4px;flex:0 0 
auto}.my-pred-hero-game-input{width:46px;height:36px;text-align:center;background:#ffffff14;border:1.5px solid rgba(255
,255,255,.15);border-radius:8px;color:#f0f4ff;font-size:1rem;font-weight:700;outline:none;transition:border-color 
.12s,background .12s;-moz-appearance:textfield}.my-pred-hero-game-input::-webkit-inner-spin-button,.my-pred-hero-game-i
nput::-webkit-outer-spin-button{opacity:1;height:26px}.my-pred-hero-game-input:focus{border-color:#3ddc84;background:#3
ddc841a}.my-pred-hero-game-colon{color:#8aa0c0;font-weight:800;font-size:1rem}.my-pred-hero-game-footer{display:flex;fl
ex-direction:column;align-items:center;gap:3px;font-size:.72rem;color:#8aa0c0}.my-pred-hero-game-venue,.my-pred-hero-ga
me-kickoff{font-weight:600;color:#d8e8f8}.my-pred-hero-game-deadline{font-weight:700;font-size:.75rem;color:#ff6b6b;fon
t-variant-numeric:tabular-nums;margin-top:2px}.my-pred-hero-game-confirm{width:100%;padding:8px 
0;background:#3ddc8426;border:1px solid rgba(61,220,132,.3);border-radius:8px;color:#3ddc84;font-size:.78rem;font-weigh
t:700;cursor:pointer;transition:background .12s;line-height:1}.my-pred-hero-game-confirm:hover:not(:disabled){backgroun
d:#3ddc844d}.my-pred-hero-game-confirm:disabled{opacity:.3;cursor:not-allowed}@media(max-width:640px){.my-pred-hero-gri
d{grid-template-columns:1fr 1fr}}.my-pred-top-row{display:grid;grid-template-columns:1fr 1fr 
1fr;gap:12px;margin-bottom:18px}@media(max-width:1024px){.my-pred-top-row{grid-template-columns:1fr 1fr}}@media(max-wid
th:700px){.my-pred-top-row{grid-template-columns:1fr}}.my-pred-col{display:flex;flex-direction:column;min-width:0}.my-p
red-col>.my-pred-podium-card,.my-pred-col>.my-pred-next-card{flex:1}.my-predictions{padding:12px 16px 20px;margin:0 
auto}.my-predictions-heading{margin:0 0 
20px;font-size:1.15rem;font-weight:700}.my-pred-podium-card{background:#ffffff08;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;padding:14px 16px;margin-bottom:14px}.my-pred-podium-title{font-size:.72rem;fo
nt-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fcbff;margin-bottom:8px}.my-pred-podium-rows{displa
y:flex;flex-direction:column;gap:6px}.my-pred-podium-row{display:flex;align-items:center;gap:8px}.my-pred-podium-icon{f
ont-size:1rem;flex:0 0 24px;text-align:center}.my-pred-podium-team{flex:1;font-size:.82rem;font-weight:600;color:#e8f0f
8}.my-pred-podium-pts{font-size:.72rem;color:#3ddc84;font-weight:700;white-space:nowrap}.my-pred-podium-note{font-size:
.68rem;color:#8aa0c0;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.05)}.my-pred-carousel{positi
on:relative;overflow:hidden;flex:1;display:flex;flex-direction:column}.my-pred-carousel-slides{display:flex;transition:
transform .3s ease;flex:1}.my-pred-carousel-slide{min-width:100%;display:flex;flex-direction:column}.my-pred-carousel-d
ots{display:flex;justify-content:center;gap:6px;margin-top:8px}.my-pred-carousel-dot{width:8px;height:8px;border-radius
:50%;border:1px solid rgba(255,255,255,.2);background:transparent;cursor:pointer;padding:0;transition:all .2s}.my-pred-
carousel-dot.is-active{background:#3ddc84;border-color:#3ddc84}.my-pred-wc-tile{position:relative;border-radius:16px;ov
erflow:hidden;min-height:200px;display:flex;flex:1;border:1px solid 
rgba(0,255,102,.2);background-image:url(/assets/wildcard.jpg);background-size:cover;background-position:center 15%}.my-
pred-wc-tile--hidden{border:none;background:transparent;min-height:0}.my-pred-wc-tile--activated{border-color:#00ff6659
;box-shadow:0 0 20px #00ff6614}.my-pred-wc-tile-content{display:flex;flex-direction:column;align-items:center;justify-c
ontent:center;gap:6px;padding:20px 16px 52px;text-align:center;width:100%;height:100%}.my-pred-wc-tile-header{font-size
:1rem;font-weight:800;color:#0f6;letter-spacing:.04em;text-shadow:0 2px 12px 
rgba(0,0,0,.7)}.my-pred-wc-tile-sub{font-size:.75rem;color:#e0f0e8;font-weight:600;text-shadow:0 2px 8px 
rgba(0,0,0,.7)}.my-pred-wc-tile-multiplier{font-size:1.6rem;font-weight:900;color:#0f6;text-shadow:0 2px 16px 
rgba(0,0,0,.8),0 0 20px rgba(0,255,102,.4);letter-spacing:.02em;margin:4px 
0}.my-pred-wc-tile-day{font-size:.82rem;font-weight:700;color:#0f6;margin:2px 0;text-shadow:0 2px 8px rgba(0,0,0,.7)}.m
y-pred-wc-tile-badge{font-size:.7rem;font-weight:700;color:#0a2e1a;background:#0f6;border-radius:999px;padding:2px 14px
;display:inline-block}.my-pred-wc-info-btn{position:absolute;bottom:10px;left:12px;background:#0000008c;border:1.5px 
solid #ffcc00;color:#fc0;font-size:.68rem;font-weight:700;cursor:pointer;padding:7px 
14px;border-radius:8px;transition:background .15s,box-shadow 
.15s}.my-pred-wc-info-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.my-pred-wc-activate-btn{position:absolute;bottom:10px;right:12px;background:#0000008c;border:1.5px solid 
#ffcc00;color:#fc0;border-radius:8px;padding:7px 
14px;font-size:.68rem;font-weight:700;cursor:pointer;transition:background .15s,box-shadow 
.15s;white-space:nowrap}.my-pred-wc-activate-btn:hover{background:#ffcc0026;box-shadow:0 0 16px 
#fc03}.wc-info-panel{max-width:420px}.wc-info-body{padding:8px 0 4px}.wc-fixtures-body{padding:8px 0 
4px;max-height:320px;overflow-y:auto}.wc-fixtures-body .wc-match-row{background:#00ff660a;border-left:3px solid 
#00ff66;border-radius:0;margin-bottom:2px}.wc-fixtures-body 
.wc-match-row:hover{background:#00ff661a}.wc-info-p{color:#c0d8e8;font-size:.82rem;line-height:1.6;margin:0 0 
10px}.wc-info-p strong{color:#e8f4ff}.wc-info-list{list-style:none;padding:0;margin:0 0 10px}.wc-info-list 
li{color:#b0c8e0;font-size:.78rem;padding:4px 0 4px 16px;position:relative;line-height:1.5}.wc-info-list li:before{cont
ent:"";position:absolute;left:0;top:11px;width:6px;height:6px;border-radius:50%;background:#0f6}.my-pred-podium-card--e
xtended{display:flex;flex-direction:column}.my-pred-podium-header{display:flex;align-items:center;justify-content:space
-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}.my-pred-podium-lock{font-size:.65rem;color:#ff6b6b;font-weight:600;f
ont-variant-numeric:tabular-nums;white-space:nowrap}.my-pred-others-section{margin-top:10px;padding-top:10px;border-top
:1px solid rgba(255,255,255,.06)}.my-pred-others-count{font-size:.7rem;color:#8ab0d0;font-weight:600;margin-bottom:6px}
.my-pred-others-table{display:flex;flex-direction:column;gap:3px}.my-pred-others-row{display:grid;grid-template-columns
:28px 1fr 36px;gap:6px;align-items:center;font-size:.7rem;padding:3px 6px;border-radius:4px;background:#ffffff05}.my-pr
ed-others-row--header{background:#ffffff0a;font-weight:700;color:#8fcbff;font-size:.65rem;text-transform:uppercase;lett
er-spacing:.04em}.my-pred-others-pos{color:#8aa0c0;font-weight:600}.my-pred-others-team{color:#d8e8f8;font-weight:600;w
hite-space:nowrap;overflow:hidden;text-overflow:ellipsis}.my-pred-others-count-col{color:#f0c040;font-weight:700;text-a
lign:right}.my-pred-date-section{margin-bottom:16px;border:1px solid 
rgba(255,255,255,.07);border-radius:12px;overflow:hidden;background:#ffffff05;transition:border-color .2s,box-shadow 
.2s}.my-pred-date-section--wildcard{border-color:#f0c04059;box-shadow:0 0 20px #f0c04014,inset 0 0 40px 
#f0c04008}.my-pred-date-header{display:flex;align-items:center;gap:10px;padding:10px 
14px;background:#ffffff0a;border-bottom:1px solid rgba(255,255,255,.06)}.my-pred-date-section--wildcard .my-pred-date-h
eader{background:#f0c0400f;border-bottom-color:#f0c04026}.my-pred-date-label{font-size:.82rem;font-weight:700;color:#d0
dcee;letter-spacing:.02em}.my-pred-date-badge{font-size:.65rem;font-weight:700;color:#f0c040;background:#f0c0401f;paddi
ng:2px 8px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase}.my-pred-date-matches{display:flex;flex-di
rection:column}.my-pred-date-matches .wc-match-row{border-radius:0;border-bottom:1px solid 
rgba(255,255,255,.04)}.my-pred-date-matches .wc-match-row:last-child{border-bottom:none}.my-pred-next-card{display:flex
;flex-direction:column;align-items:center;gap:12px;padding:20px 20px 
16px;background:linear-gradient(135deg,#143c7840,#0a23464d);border:1px solid rgba(255,255,255,.08);border-radius:16px;t
ext-align:center;flex:1;cursor:pointer;font:inherit;color:inherit;width:100%;transition:border-color .12s}.my-pred-next
-card:hover{border-color:#ffffff26}.my-pred-next-card--empty{min-height:200px;justify-content:center;cursor:default}.my
-pred-next-card--empty:hover{border-color:#ffffff14}.my-pred-next-empty{font-size:1rem;color:#3ddc84;font-weight:600}.m
y-pred-next-badge{font-size:.7rem;font-weight:800;letter-spacing:.16em;color:#8fcbff;text-transform:uppercase}.my-pred-
next-teams{display:flex;align-items:center;justify-content:center;gap:14px;width:100%}.my-pred-next-team{display:flex;f
lex-direction:column;align-items:flex-start;gap:2px}.my-pred-next-team--away{align-items:flex-end}.my-pred-next-name{fo
nt-size:1.1rem;font-weight:800;color:#f0f8ff;line-height:1.2}.my-pred-next-rank{font-size:.72rem;color:#6a90b0}.my-pred
-next-vs{font-size:.8rem;color:#3ddc84;font-weight:700;text-transform:uppercase;padding:0 4px}.my-pred-next-venue{font-
size:.78rem;color:#8ab0d0}.my-pred-next-kickoff{font-size:.82rem;color:#7ab8e0;font-weight:600}.my-pred-next-countdown{
font-size:1rem;font-weight:700;color:#ff6b6b;font-variant-numeric:tabular-nums;letter-spacing:.02em;padding:5px 
14px;background:#ff505014;border:1px solid 
rgba(255,80,80,.15);border-radius:8px}.my-pred-next-prediction{width:100%;max-width:320px;padding:10px 
14px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:10px}.my-pred-next-pred-label{display:bl
ock;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6a90b0;margin-bottom:6px}.my-p
red-next-pred-score-row{display:flex;align-items:center;justify-content:center;gap:8px}.my-pred-next-pred-colon{font-si
ze:1.1rem;font-weight:700;color:#5a7a90}.my-pred-next-pred-score{font-size:1.3rem;font-weight:800;color:#f0c040}.my-pre
d-next-pred-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:8px;background:#3ddc841a;color:#3dd
c84;font-size:.75rem;font-weight:600;white-space:nowrap;transition:background 
.12s}.my-pred-next-pred-btn--primary{background:#3ddc8426;border-color:#3ddc8466;font-size:.82rem;padding:8px 20px;disp
lay:inline-block}@media(max-width:700px){.wc-immersive-team-name{max-width:80px;overflow:hidden;text-overflow:ellipsis;
white-space:nowrap}.wc-modal-immersive{max-width:calc(100% - 12px);border-radius:12px}.wc-modal-immersive-content{paddi
ng:12px;gap:8px}.wc-flag-circle-wrap,.wc-flag-circle-placeholder{width:44px;height:44px}.wc-flip-input{width:40px;heigh
t:44px;font-size:1.3rem}.wc-flip-digit{width:32px;height:42px;font-size:1.3rem}.wc-flip-colon{font-size:1.3rem}.wc-imme
rsive-location{font-size:.65rem;flex-wrap:wrap;justify-content:center;gap:2px 4px}.wc-save-pred-btn{padding:10px 20px;m
in-height:42px;font-size:.82rem}}@media(max-width:640px){.app-main{padding:8px}.wc-panel,.panel.dash-panel,.my-predicti
ons{padding:8px 10px}.wc-match-row{grid-template-columns:12px 1fr 
auto;font-size:.68rem;padding:4px;gap:3px}.wc-match-row .wc-match-status{display:none}.wc-match-team-name{max-width:50p
x}.wc-group-title{font-size:.75rem}.wc-title{font-size:.95rem}.wc-filter-btn{font-size:.65rem;padding:5px 8px;min-heigh
t:34px}.wc-filter-row{flex-wrap:wrap;gap:4px}.dash-title{font-size:1rem}.dash-metric-card{padding:10px}.dash-donut-wrap
 svg{width:90px;height:90px}.dash-metric-teams 
img{width:26px}.dash-next-btn{padding:8px;font-size:.8rem;min-height:40px}.dash-mini-lb-row{padding:4px 
6px;font-size:.72rem}.dash-mini-lb-pos{width:20px;font-size:.65rem}.dash-upcoming-row,.dash-recent-row{padding:4px 
6px;font-size:.7rem}}@media(max-width:700px){.my-pred-donut-wrap svg{width:80px;height:80px}.wc-flag-circle-wrap,.wc-fl
ag-circle-placeholder{width:38px;height:38px}.wc-flip-input{width:36px;height:40px;font-size:1.15rem}.wc-flip-digit{wid
th:28px;height:38px;font-size:1.15rem}.wc-flip-colon{font-size:1.15rem}.wc-score-arrow{font-size:.55rem;padding:1px 
4px;min-height:20px}.wc-save-pred-btn{padding:8px 16px;min-height:40px;font-size:.78rem}.wc-immersive-team-name{max-wid
th:70px;font-size:.7rem}.wc-immersive-team-rank{font-size:.6rem}.wc-immersive-team-form{gap:2px}.wc-team-info-form-badg
e{font-size:.5rem;padding:1px 4px;min-width:16px}.wc-immersive-location{font-size:.6rem;flex-direction:column;gap:1px}.
wc-location-divider{display:none}.wc-immersive-footer{font-size:.68rem}.wc-immersive-others-title{font-size:.72rem}.wc-
immersive-others-row{font-size:.7rem;padding:4px 0}.dash-next-after{font-size:.68rem}.dash-countdown{font-size:.78rem}}
.stakes-ack-modal{max-width:440px;width:calc(100% - 32px);padding:0}.stakes-ack-body{padding:0 
20px}.stakes-ack-notice{color:#e8f0f8;font-size:.9rem;margin:0 0 14px;line-height:1.5}.stakes-ack-calculator{margin-bot
tom:16px}.stakes-ack-checkbox{display:flex;align-items:flex-start;gap:10px;padding:12px;margin-bottom:16px;background:#
ffc8320f;border:1px solid rgba(255,200,50,.15);border-radius:8px;cursor:pointer;transition:background 
.12s}.stakes-ack-checkbox:hover{background:#ffc8321a}.stakes-ack-checkbox 
input[type=checkbox]{margin-top:2px;flex-shrink:0;width:18px;height:18px;accent-color:#3ddc84}.stakes-ack-checkbox span
{font-size:.78rem;color:#c0d4e8;line-height:1.4}.stakes-ack-actions{display:flex;flex-direction:column;gap:8px;padding:
0 20px 20px}.stakes-ack-confirm-btn{padding:12px;border:none;border-radius:10px;background:#3ddc84;color:#030c1c;font-s
ize:.9rem;font-weight:700;cursor:pointer;transition:opacity .12s}.stakes-ack-confirm-btn:disabled{opacity:.4;cursor:def
ault}.stakes-ack-confirm-btn:hover:not(:disabled){opacity:.9}.stakes-ack-skip{background:none;border:none;color:#6a8090
;font-size:.78rem;cursor:pointer;text-align:center;padding:6px}.stakes-ack-skip:hover{color:#8aa0c0}.stakes-ack-banner{
display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:14px;background:#ffc83214;border:1px solid rgb
a(255,200,50,.15);border-radius:8px;font-size:.78rem;color:#e8f0f8}.stakes-ack-banner-text{flex:1;line-height:1.4}.stak
es-ack-banner-btn{padding:6px 14px;border:1px solid rgba(61,220,132,.3);border-radius:6px;background:#3ddc841f;color:#3
ddc84;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .12s}.stakes-ack-banner-
btn:hover{background:#3ddc8433}.league-share-row{display:flex;gap:8px;margin-top:10px}.league-share-btn{flex:1;display:
flex;align-items:center;justify-content:center;gap:6px;padding:8px 
12px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;text-decoration:none;transition:background 
.12s;border:1px solid rgba(255,255,255,.12);background:#ffffff0f;color:#e8f0f8}.league-share-btn:hover{background:#ffff
ff1f}.league-share-btn--whatsapp{background:#25d3661f;border-color:#25d36640;color:#25d366}.league-share-btn--whatsapp:
hover{background:#25d36633}.league-share-btn--link{background:#3ddc841a;border-color:#3ddc8433;color:#3ddc84}.league-sh
are-btn--link:hover{background:#3ddc842e}.auth-split{display:grid;grid-template-columns:1fr 
1fr;gap:0}.auth-panel{padding:12px}.auth-panel:first-child{border-right:1px solid 
rgba(255,255,255,.08)}.auth-panel-title{font-size:.78rem;font-weight:700;color:#e8f0f8;margin:0 0 
2px}.auth-panel-desc{font-size:.68rem;color:#6a8090;margin:0 0 10px}.auth-league-code{padding:6px 10px;border:1px 
solid rgba(255,200,50,.25);border-radius:8px;background:#ffc8320d;color:#f7fbff;font-size:.82rem;outline:none;text-alig
n:center;font-weight:700;letter-spacing:.12em;font-family:Courier New,monospace}.auth-league-code:focus{border-color:#3
ddc8480}.auth-league-code--filled{border-color:#3ddc844d;background:#3ddc840f}.auth-single-google{padding:4px 12px 8px}
@media(max-width:700px){.auth-split{grid-template-columns:1fr}.auth-panel:first-child{border-right:none;border-bottom:1
px solid rgba(255,255,255,.08)}.auth-panel{padding:12px}.auth-single-google{padding:4px 12px 8px}}



```

---

## Assistant (Build · DeepSeek V4 Flash Free · 9.1s)

_Thinking:_

The output is being truncated every time because the CSS file is huge and the terminal wraps lines. Let me use a different approach - directly use rg (ripgrep) which handles long lines better, or use a PowerShell approach with -NoEmphasis and -Raw output to a file.

Actually, the issue is that Select-String sends output to the console and it gets split on newlines. The CSS file has very long lines so the pattern match outputs the entire line. Let me just try `Select-String -SimpleMatch` with simpler patterns.

Let me try a completely different approach: use `rg` which is ripgrep.

**Tool: bash**

**Input:**
```json
{
  "description": "Use rg to check for key classes in built CSS",
  "command": "rg -o \"wc-match-card-teams\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
wc-match-card-teams

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.2s)

_Thinking:_

`wc-match-card-teams` is present. Let me check for the other classes.

**Tool: bash**

**Input:**
```json
{
  "description": "Check for stale classes in built CSS",
  "command": "rg -c \"wc-group-card\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-standings-table\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-grid-2col\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-match-card-meta\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
1
1
1

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 8.0s)

_Thinking:_

Interesting - `wc-group-card` has 1 match, `wc-standings-table` has 1 match, `wc-grid-2col` has 1 match. Wait, I removed those from the source CSS. Why are they still in the built output?

Oh wait, these might be match counts from other files or just the last lines of output. The `-c` flag just shows count, but the output format could be confusing me. Let me be more explicit.

Actually, looking at the output more carefully:
- `rg -c "wc-group-card"` → output shows `1` — this could be a match count from wc-fixtures-body or something
- `rg -c "wc-standings-table"` → output shows `1`
- `rg -c "wc-grid-2col"` → output shows `1`
- `rg -c "wc-match-card-meta"` → no output shown, so no matches

Wait, no, the output of `rg -c` is `filename:count`. Let me re-check.

Actually, the output is just `1` on separate lines. The `rg -c` format is supposed to show `filename:count` but since I'm using a single file, it might just show the count. But the output shows only 3 lines for 4 commands... Let me check more carefully.

Hmm, actually the first command returned `1`, second returned `1`, third returned `1`, fourth returned nothing (wc-match-card-meta has 0 matches?). But `wc-match-card-meta` is defined in our CSS... 

Wait, the CSS is minified so the selector might appear without the dot. Let me check with just the class name.

**Tool: bash**

**Input:**
```json
{
  "description": "Check for stale selectors in minified CSS",
  "command": "rg -c \"wc-group-card\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-standings-table\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-match-card-meta\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\"; rg -c \"wc-grid-2col\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
1
1
1

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

OK only 3 lines of output for 4 commands. Let me run these individually to see the actual results more clearly.

**Tool: bash**

**Input:**
```json
{
  "description": "Check wc-group-card individually",
  "command": "rg -c \"wc-group-card\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
1

```

**Tool: bash**

**Input:**
```json
{
  "description": "Check wc-standings-table individually",
  "command": "rg -c \"wc-standings-table\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
(no output)
```

**Tool: bash**

**Input:**
```json
{
  "description": "Check wc-match-card-meta individually",
  "command": "rg -c \"wc-match-card-meta\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
1

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.7s)

_Thinking:_

OK so:
- `wc-group-card`: 1 match — this could be from `.wc-group-card` but I removed it from the source. Maybe it's in the JS as a string? No, that's the built CSS. Let me check with `-o` to see the match.

Wait, `rg` with `-c` on a single file should show `filename:count`. But it's showing just the count. Maybe the `1` is from the third command and the first had no output (0 count). No, that doesn't make sense either.

Let me try again with explicit files.

**Tool: bash**

**Input:**
```json
{
  "description": "Find stale class references in CSS",
  "command": "rg -o \"wc-group-card\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
wc-group-card
wc-group-card

```

**Tool: bash**

**Input:**
```json
{
  "description": "Find wc-standings-table in CSS",
  "command": "rg -o \"wc-standings-table\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-CZ62U5Tc.css\""
}
```

**Output:**
```
(no output)
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.3s)

_Thinking:_

`wc-group-card` appears twice! Let me check if this is from the stale media query or from the `.wc-fixtures-body .wc-match-row` or somewhere else. But I removed the stale rules from the source. Let me check the source CSS for remaining references.

**Tool: bash**

**Input:**
```json
{
  "description": "Search source CSS for wc-group-card",
  "command": "rg -n \"wc-group-card\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css\""
}
```

**Output:**
```
797:.wc-group-card {
805:.wc-group-card:hover {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.5s)

_Thinking:_

There are still `.wc-group-card` and `.wc-group-card:hover` rules at line 797 and 805 of the source CSS. I only removed them from the media query block, but the base rules for `.wc-group-card` are still there. Let me read those lines to see what we're working with.

**Tool: read**

**Input:**
```json
{
  "offset": 795,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 25
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
795: }
796: 
797: .wc-group-card {
798:   background: rgba(255, 255, 255, 0.03);
799:   border: 1px solid rgba(255, 255, 255, 0.07);
800:   border-radius: 12px;
801:   overflow: hidden;
802:   transition: border-color 0.25s, box-shadow 0.25s;
803: }
804: 
805: .wc-group-card:hover {
806:   border-color: rgba(61, 220, 132, 0.3);
807:   box-shadow: 0 0 20px rgba(61, 220, 132, 0.08), 0 0 60px rgba(61, 220, 132, 0.04);
808: }
809: 
810: .wc-group-title {
811:   margin: 0;
812:   padding: 8px 14px;
813:   font-size: 0.78rem;
814:   font-weight: 700;
815:   letter-spacing: 0.1em;
816:   text-transform: uppercase;
817:   background: rgba(255, 255, 255, 0.04);
818:   border-bottom: 1px solid rgba(255, 255, 255, 0.06);
819:   color: #8fcbff;

(Showing lines 795-819 of 7362. Use offset=820 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.1s)

_Thinking:_

I should remove these stale group card styles as well as the `.wc-group-title` and `.wc-standings-table` etc if they're not used anymore. Let me check what other stale styles exist.

Actually, `.wc-group-title` is referenced in the media query (I kept it), and it was used for the group section titles. But it doesn't seem to be used in the new card layout either.

Let me also check if there are other stale group/standings styles.

**Tool: read**

**Input:**
```json
{
  "offset": 820,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 15
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
820: }
821: 
822: .wc-grid-2col {
823:   display: grid;
824:   grid-template-columns: 1fr;
825:   gap: 12px;
826: }
827: @media (min-width: 500px) {
828:   .wc-grid-2col {
829:     grid-template-columns: 1fr 1fr;
830:   }
831: }
832: 
833: .wc-match-card {
834:   display: flex;

(Showing lines 820-834 of 7362. Use offset=835 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.1s)

_Thinking:_

The `.wc-group-card`, `.wc-group-card:hover`, `.wc-group-title` are still in the CSS around lines 797-820. Let me also check for `.wc-standings-table` which is also stale.

**Tool: bash**

**Input:**
```json
{
  "description": "Find all stale group/standings classes",
  "command": "rg -n \"wc-group-card|wc-group-title|wc-standings-table|wc-groups-grid\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css\""
}
```

**Output:**
```
791:.wc-groups-grid {
797:.wc-group-card {
805:.wc-group-card:hover {
810:.wc-group-title {
1750:  .wc-groups-grid { grid-template-columns: 1fr; }
6991:  .wc-group-title {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

There are still several stale classes:
- Line 791: `.wc-groups-grid` - stale, not used
- Line 797: `.wc-group-card` - stale, not used  
- Line 805: `.wc-group-card:hover` - stale
- Line 810: `.wc-group-title` - still referenced in media query (line 6991). This is used for section title styling but might still be needed elsewhere
- Line 1750: `.wc-groups-grid` in a media query - stale

Let me check what's around line 791 and 1750 to understand the full blocks I need to remove.

**Tool: read**

**Input:**
```json
{
  "offset": 785,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 35
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
785:   letter-spacing: 0.14em;
786:   text-transform: uppercase;
787:   color: #8fcbff;
788:   margin: 0 0 10px 4px;
789: }
790: 
791: .wc-groups-grid {
792:   display: grid;
793:   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
794:   gap: 10px;
795: }
796: 
797: .wc-group-card {
798:   background: rgba(255, 255, 255, 0.03);
799:   border: 1px solid rgba(255, 255, 255, 0.07);
800:   border-radius: 12px;
801:   overflow: hidden;
802:   transition: border-color 0.25s, box-shadow 0.25s;
803: }
804: 
805: .wc-group-card:hover {
806:   border-color: rgba(61, 220, 132, 0.3);
807:   box-shadow: 0 0 20px rgba(61, 220, 132, 0.08), 0 0 60px rgba(61, 220, 132, 0.04);
808: }
809: 
810: .wc-group-title {
811:   margin: 0;
812:   padding: 8px 14px;
813:   font-size: 0.78rem;
814:   font-weight: 700;
815:   letter-spacing: 0.1em;
816:   text-transform: uppercase;
817:   background: rgba(255, 255, 255, 0.04);
818:   border-bottom: 1px solid rgba(255, 255, 255, 0.06);
819:   color: #8fcbff;

(Showing lines 785-819 of 7362. Use offset=820 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "offset": 1745,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 15
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
1745: 
1746: .wc-comment-input:focus { border-color: rgba(61, 220, 132, 0.5); }
1747: 
1748: @media (max-width: 700px) {
1749:   .wc-grid-2col { grid-template-columns: 1fr; }
1750:   .wc-groups-grid { grid-template-columns: 1fr; }
1751:   .wc-match-row {
1752:     grid-template-columns: 16px 1fr auto auto;
1753:     font-size: 0.68rem;
1754:     padding: 4px 6px;
1755:   }
1756:   .wc-match-date,
1757:   .wc-match-points { display: none; }
1758:   .wc-match-card-meta { flex-direction: column; align-items: flex-start; gap: 2px; }
1759:   .wc-title { font-size: 1.1rem; }

(Showing lines 1745-1759 of 7362. Use offset=1760 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.6s)

_Thinking:_

There's more in the media query at line 1750 with `.wc-groups-grid`. Also line 1758 has `.wc-match-card-meta { flex-direction: column; align-items: flex-start; gap: 2px; }` which would override our horizontal layout on small screens! That's likely the problem!

At line 1758, the media query `@media (max-width: 700px)` sets `.wc-match-card-meta` to `flex-direction: column` which would stack venue and date vertically. But `.wc-match-card-teams` doesn't seem to be affected there.

Wait, but the user's issue was with `.wc-match-card-teams` stacking vertically, not the meta section. Let me check if there's also a rule for `.wc-match-card-teams` in the media query.

**Tool: read**

**Input:**
```json
{
  "offset": 1748,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 25
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
1748: @media (max-width: 700px) {
1749:   .wc-grid-2col { grid-template-columns: 1fr; }
1750:   .wc-groups-grid { grid-template-columns: 1fr; }
1751:   .wc-match-row {
1752:     grid-template-columns: 16px 1fr auto auto;
1753:     font-size: 0.68rem;
1754:     padding: 4px 6px;
1755:   }
1756:   .wc-match-date,
1757:   .wc-match-points { display: none; }
1758:   .wc-match-card-meta { flex-direction: column; align-items: flex-start; gap: 2px; }
1759:   .wc-title { font-size: 1.1rem; }
1760: }
1761: 
1762: @media (max-width: 500px) {
1763:   .wc-team-name { max-width: 50px; }
1764: }
1765: 
1766: /* ===== SIDEBAR ===== */
1767: .app--with-sidebar {
1768:   display: flex;
1769:   min-height: 100vh;
1770:   padding: 0;
1771: }
1772: 

(Showing lines 1748-1772 of 7362. Use offset=1773 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 9.4s)

_Thinking:_

Found it! Line 1758:
```css
.wc-match-card-meta { flex-direction: column; align-items: flex-start; gap: 2px; }
```

This overrides the meta section to stack vertically on small screens. That's unrelated to the main issue but should be fixed too.

But more importantly, there's no override for `.wc-match-card-teams` in the media query, so the flex row layout should work for the teams line. So the flex layout for teams should still work even on small screens.

The user's issue was that teams are stacking vertically in the card. With our changes (`.wc-flag` display `inline-block`, added `width: 100%`, `justify-content: space-around`, `flex-wrap: nowrap`), the layout should now work.

However, line 1758 `.wc-match-card-meta { flex-direction: column; }` will make the venue/date line stack vertically on screens < 700px. I should fix this to just keep it horizontal.

Let me also remove the stale `.wc-groups-grid` rules at lines 791-795 and 1750, as well as `.wc-group-card` at 797-808.

Let me focus on the critical fixes first and also clean up the stale CSS.

Found the culprit at `src/styles.css:1758`: `.wc-match-card-meta` gets `flex-direction: column` on screens < 700px. Let me clean up the stale group card CSS and fix the meta override.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": ".wc-groups-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 10px;\n}\n\n.wc-group-card {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 12px;\n  overflow: hidden;\n  transition: border-color 0.25s, box-shadow 0.25s;\n}\n\n.wc-group-card:hover {\n  border-color: rgba(61, 220, 132, 0.3);\n  box-shadow: 0 0 20px rgba(61, 220, 132, 0.08), 0 0 60px rgba(61, 220, 132, 0.04);\n}\n\n.wc-group-title {",
  "newString": ".wc-group-title {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-grid-2col { grid-template-columns: 1fr; }\n  .wc-groups-grid { grid-template-columns: 1fr; }\n  .wc-match-row {",
  "newString": "  .wc-grid-2col { grid-template-columns: 1fr; }\n  .wc-match-row {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-match-card-meta { flex-direction: column; align-items: flex-start; gap: 2px; }",
  "newString": "  .wc-match-card-meta { flex-direction: row; gap: 6px; }"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.6s)

_Thinking:_

Good. Now I also need to check if `.wc-group-title` is still needed. Looking at the code:
- In WorldCupPanel.jsx, I don't see `.wc-group-title` being used in the group stage rendering. It was used for the old group cards.
- At line 6991 (now shifted), `.wc-group-title` is referenced in the `@media (max-width: 640px)` block.

Since `.wc-group-title` is no longer used in the JSX (the new code uses `.wc-round-title`), I should also remove it and its media query reference. But first let me check the JSX to confirm.

**Tool: bash**

**Input:**
```json
{
  "description": "Check if wc-group-title is used in JSX",
  "command": "rg -n \"wc-group-title\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\src\""
}
```

**Output:**
```
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:791:.wc-group-title {
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:6971:  .wc-group-title {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.2s)

_Thinking:_

`.wc-group-title` is only referenced in the CSS (the definition and the media query), not in any JSX. It was presumably used in the old group cards which are now removed. Let me remove both references as dead code.

But actually, `.wc-group-title` was also referenced in the `@media (max-width: 640px)` block at the old line 6991 (now 6971). I should remove it along with the stale rule. Let me also check if there are more references in any files.

Actually, let me search more broadly.

**Tool: bash**

**Input:**
```json
{
  "description": "Search all src files for wc-group-title",
  "command": "rg -n \"wc-group-title\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\src\" --type-add 'all:*' -t all"
}
```

**Output:**
```
rg: invalid definition (format is type:glob, e.g., html:*.html)

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.7s)

**Tool: bash**

**Input:**
```json
{
  "description": "Search all src files for wc-group-title",
  "command": "rg -n \"wc-group-title\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\src\""
}
```

**Output:**
```
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:791:.wc-group-title {
C:\Users\jayno\Projects\world-cup-2026\src\styles.css:6971:  .wc-group-title {

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.6s)

_Thinking:_

Only CSS references — no JSX/JS files use it. It's dead code. Let me remove both the definition and the media query reference.

**Tool: read**

**Input:**
```json
{
  "offset": 789,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 20
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
789: }
790: 
791: .wc-group-title {
792:   margin: 0;
793:   padding: 8px 14px;
794:   font-size: 0.78rem;
795:   font-weight: 700;
796:   letter-spacing: 0.1em;
797:   text-transform: uppercase;
798:   background: rgba(255, 255, 255, 0.04);
799:   border-bottom: 1px solid rgba(255, 255, 255, 0.06);
800:   color: #8fcbff;
801: }
802: 
803: .wc-grid-2col {
804:   display: grid;
805:   grid-template-columns: 1fr;
806:   gap: 12px;
807: }
808: @media (min-width: 500px) {

(Showing lines 789-808 of 7342. Use offset=809 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.0s)

_Thinking:_

Wait — I need to check if there's any more content between the previous removal and this. Let me look at what comes before line 791 now.

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "}\n\n.wc-group-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  background: rgba(255, 255, 255, 0.04);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  color: #8fcbff;\n}\n\n.wc-grid-2col {",
  "newString": "}\n\n.wc-grid-2col {"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.8s)

_Thinking:_

Now also remove the media query reference. Let me check the current state.

**Tool: read**

**Input:**
```json
{
  "offset": 6945,
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "limit": 30
}
```

**Output:**
```
<path>C:\Users\jayno\Projects\world-cup-2026\src\styles.css</path>
<type>file</type>
<content>
6945:     padding: 8px 10px;
6946:   }
6947:   .wc-match-row {
6948:     grid-template-columns: 12px 1fr auto;
6949:     font-size: 0.68rem;
6950:     padding: 4px 4px;
6951:     gap: 3px;
6952:   }
6953:   .wc-match-row .wc-match-status {
6954:     display: none;
6955:   }
6956:   .wc-match-team-name {
6957:     max-width: 50px;
6958:   }
6959:   .wc-group-title {
6960:     font-size: 0.75rem;
6961:   }
6962:   .wc-title {
6963:     font-size: 0.95rem;
6964:   }
6965:   .wc-filter-btn {
6966:     font-size: 0.65rem;
6967:     padding: 5px 8px;
6968:     min-height: 34px;
6969:   }
6970:   .wc-filter-row {
6971:     flex-wrap: wrap;
6972:     gap: 4px;
6973:   }
6974:   .dash-title {

(Showing lines 6945-6974 of 7330. Use offset=6975 to continue.)
</content>
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 3.1s)

**Tool: edit**

**Input:**
```json
{
  "filePath": "C:\\Users\\jayno\\Projects\\world-cup-2026\\src\\styles.css",
  "oldString": "  .wc-group-title {\n    font-size: 0.75rem;\n  }\n  .wc-title {",
  "newString": "  .wc-title {"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 10.5s)

_Thinking:_

Good. Now let me rebuild and redeploy.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Fix wc-flag display: block → inline-block",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Strengthen .wc-match-card-teams flex layout",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Improve visual spacing (card padding, grid gap, meta gap)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Fix wc-match-card-meta flex-direction override at 700px",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove dead .wc-group-card, .wc-groups-grid, .wc-group-title styles",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Rebuild and redeploy to Firebase",
      "status": "in_progress"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Fix wc-flag display: block → inline-block",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Strengthen .wc-match-card-teams flex layout",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Improve visual spacing (card padding, grid gap, meta gap)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Fix wc-match-card-meta flex-direction override at 700px",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove dead .wc-group-card, .wc-groups-grid, .wc-group-title styles",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Rebuild and redeploy to Firebase",
    "status": "in_progress",
    "priority": "high"
  }
]
```

**Tool: bash**

**Input:**
```json
{
  "description": "Rebuild with Vite",
  "command": "npm run build",
  "timeout": 60000,
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026"
}
```

**Output:**
```

> world-cup-2026@1.0.0 build
> vite build

[33mYou are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.[39m
[36mvite v7.3.5 [32mbuilding client environment for production...[36m[39m
transforming...
[32m✓[39m 80 modules transformed.
[33m[plugin vite:reporter] 
(!) C:/Users/jayno/Projects/world-cup-2026/node_modules/firebase/firestore/dist/esm/index.esm.js is dynamically imported by C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx but also statically imported by C:/Users/jayno/Projects/world-cup-2026/src/App.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/AuthPage.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Dashboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/GroupStandings.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/Leaderboard.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeagueDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/LeaguesList.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MatchDetailModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyPredictions.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/MyProfile.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/PodiumPredictionModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/StakesAcknowledgmentModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/TeamDetail.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WildCardModal.jsx, C:/Users/jayno/Projects/world-cup-2026/src/components/WorldCupPanel.jsx, C:/Users/jayno/Projects/world-cup-2026/src/lib/firebase.js, C:/Users/jayno/Projects/world-cup-2026/src/utils/worldCupApi.js, dynamic import will not move module into another chunk.
[39m
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.74 kB[22m[1m[22m[2m │ gzip:   0.37 kB[22m
[33m
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.[39m
[2mdist/[22m[35massets/index-BZ0J8gpo.css  [39m[1m[2m 99.46 kB[22m[1m[22m[2m │ gzip:  16.64 kB[22m
[2mdist/[22m[36massets/index-_yOWlB1A.js   [39m[1m[33m882.87 kB[39m[22m[2m │ gzip: 258.31 kB[22m
[32m✓ built in 4.68s[39m

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 16.6s)

_Thinking:_

Build succeeded. The CSS has new hash (BZ0J8gpo instead of CZ62U5Tc) and is slightly smaller (99.46 KB vs 100.08 KB) because we removed stale CSS. Let me deploy now.

**Tool: bash**

**Input:**
```json
{
  "description": "Deploy to Firebase hosting",
  "command": "firebase deploy --only hosting",
  "timeout": 60000,
  "workdir": "C:\\Users\\jayno\\Projects\\world-cup-2026"
}
```

**Output:**
```
(node:3944) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

[1m[37m===[39m Deploying to 'worldcup2026-92e25'...[22m

[36m[1mi [22m[39m deploying [1mhosting[22m
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m beginning deploy...
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m found 65 files in [1mdist[22m
[36m[1mi  hosting:[22m[39m uploading new files [0/2] ([1m[32m0%[39m[22m)
[36m[1mi  hosting:[22m[39m upload complete
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m file upload complete
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m finalizing version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m version finalized
[36m[1mi  hosting[worldcup2026-92e25]:[22m[39m releasing new version...
[32m[1m+  hosting[worldcup2026-92e25]:[22m[39m release complete

[32m[1m+ [22m[39m [1m[4mDeploy complete![24m[22m

[1mProject Console:[22m https://console.firebase.google.com/project/worldcup2026-92e25/overview
[1mHosting URL:[22m https://worldcup2026-92e25.web.app

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.3s)

_Thinking:_

Deploy complete. Now let me verify the built CSS has all the right changes.

**Tool: bash**

**Input:**
```json
{
  "description": "Verify key selectors in new built CSS",
  "command": "rg -c \"wc-match-card-teams\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-BZ0J8gpo.css\""
}
```

**Output:**
```
1

```

**Tool: bash**

**Input:**
```json
{
  "description": "Verify stale classes removed",
  "command": "rg -c \"wc-group-card|wc-standings-table|wc-groups-grid|wc-group-title\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-BZ0J8gpo.css\""
}
```

**Output:**
```
(no output)
```

**Tool: bash**

**Input:**
```json
{
  "description": "Check wc-flag display value in built CSS",
  "command": "rg -o \"\\.wc-flag\\{[^}]*\\}\" \"C:\\Users\\jayno\\Projects\\world-cup-2026\\dist\\assets\\index-BZ0J8gpo.css\""
}
```

**Output:**
```
.wc-flag{flex:0 0 auto;border-radius:2px;display:inline-block}

```

---

## Assistant (Build · DeepSeek V4 Flash Free · 4.7s)

_Thinking:_

All verified:
1. `wc-match-card-teams` is present (1 match) ✓
2. Stale classes `wc-group-card`, `wc-standings-table`, `wc-groups-grid`, `wc-group-title` are all gone (no output) ✓
3. `.wc-flag` has `display:inline-block` ✓

Let me mark the final todo as completed.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Fix wc-flag display: block → inline-block",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Strengthen .wc-match-card-teams flex layout",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Improve visual spacing (card padding, grid gap, meta gap)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Fix wc-match-card-meta flex-direction override at 700px",
      "status": "completed"
    },
    {
      "priority": "medium",
      "content": "Remove dead .wc-group-card, .wc-groups-grid, .wc-group-title styles",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Rebuild and redeploy to Firebase",
      "status": "completed"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Fix wc-flag display: block → inline-block",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Strengthen .wc-match-card-teams flex layout",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Improve visual spacing (card padding, grid gap, meta gap)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove stale media query rules (wc-groups-grid, wc-group-card, wc-standings-table)",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Fix wc-match-card-meta flex-direction override at 700px",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Remove dead .wc-group-card, .wc-groups-grid, .wc-group-title styles",
    "status": "completed",
    "priority": "medium"
  },
  {
    "content": "Rebuild and redeploy to Firebase",
    "status": "completed",
    "priority": "high"
  }
]
```

---

## Assistant (Build · DeepSeek V4 Flash Free · 5.3s)

_Thinking:_

All done. Let me summarize what was done.

All changes deployed to https://worldcup2026-92e25.web.app

**Changes made:**

1. **`.wc-flag`** — `display: block` → `inline-block` so alt text flows inline when images fail to load
2. **`.wc-match-card-teams`** — added `width: 100%`, `justify-content: space-around`, `flex-wrap: nowrap`
3. **`.wc-match-card`** — padding `10px 12px` → `12px 16px`, gap `4px` → `6px`
4. **`.wc-grid-2col`** — gap `8px` → `12px`
5. **`.wc-match-card-meta`** — gap `10px` → `14px`
6. **`@media (max-width: 700px)`** — removed `.wc-match-card-meta { flex-direction: column }` which was causing vertical stacking; now keeps horizontal `flex-direction: row`
7. **Removed dead CSS** — `.wc-group-card`, `.wc-groups-grid`, `.wc-group-title`, `.wc-standings-table` (definitions and all media query references)

---

