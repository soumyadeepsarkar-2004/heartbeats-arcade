var fs = require('fs');
var h = fs.readFileSync('index.html', 'utf8');
var c = fs.readFileSync('styles.css', 'utf8');

var classes = ['player-dock','cover-art','cover-label','cover-heart','cover-name','track-details','now-playing-row','now-playing-text','playerTitle','playerArtist','player-controls','play-button','play-icon','pause-icon','skip-button','track-progress','equalizer','modal-layer','modal','modal-header','modal-overline','close-button','level-grid','level-card','card-top','card-symbol','card-state','map-meta','map-footer','tiny-cassette','reset-link','game-modal','game-close','game-meta','game-main','game-visual','game-copy','game-symbol','soundtrack-card','soundtrack-controls','soundtrack-button','prompt-card','prompt-number','choice-list','choice','choice-letter','lock-button','game-note','win-modal','confetti','win-icon','win-actions','unlocked-track','mini-cover','mini-play','room-modal','room-heading','room-live-dot','room-id','room-intro','room-stage','room-layout','listening-panel','diary-panel','panel-label','copy-room','embed-wrap','embed-loading','embed-overlay','embed-button','embed-caption','starter-row','starter-pick','sync-row','sync-button','diary-list','diary-empty','diary-entry','entry-mark','entry-info','entry-badge','playlist-form','url-input-row','playlist-options','mood-row','mood-options','mood-status','filter-chip','diary-filters','room-note','toast','source-badge','top-index','brand','ambient-status','live-dot','status-divider','heart-symbol','room-button','sound-toggle','sound-icon','mute-icon','sound-label','hero','hero-copy','hero-actions','primary-button','text-button','button-icon','button-arrow','tape-sticker','eyebrow','top-actions','icon-button'];

var missing = classes.filter(cls => !h.includes('class="' + cls) && !h.includes("'" + cls + "'") && !h.includes(' class="' + cls + '"') && !h.includes(' class="' + cls + ' ') && !h.includes('"' + cls + '"') && !c.includes('.' + cls));
// More precise check
var htmlClassAttrs = h.match(/class="([^"]*)"/g) || [];
var allHtmlClasses = new Set();
htmlClassAttrs.forEach(function(attr) {
  attr.match(/class="([^"]*)"/)[1].split(' ').forEach(function(c) { if (c) allHtmlClasses.add(c); });
});

var missingClasses = classes.filter(cls => !allHtmlClasses.has(cls));
var missingCss = classes.filter(cls => !c.includes('.' + cls));

console.log('Classes missing from HTML:', missingClasses);
console.log('Classes missing from CSS:', missingCss);
