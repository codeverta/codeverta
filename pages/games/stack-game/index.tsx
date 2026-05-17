import React from "react";

const content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>STACK — Arcade</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0f;
  --surface:rgba(255,255,255,0.04);
  --border:rgba(255,255,255,0.08);
  --text:#f0eeff;
  --muted:#8884a8;
  --accent:#c8b8ff;
  --accent2:#ff9de2;
  --accent3:#7affd4;
  --danger:#ff6b6b;
}
html,body{width:100%;height:100%;overflow:hidden;background:var(--bg);font-family:'Inter',sans-serif;color:var(--text);}
#phaser-container{position:fixed;inset:0;z-index:1;}
#phaser-container canvas{display:block;width:100%!important;height:100%!important;}
#ui-root{position:fixed;inset:0;z-index:10;pointer-events:none;display:flex;flex-direction:column;}
.ui-layer{pointer-events:all;}

/* HUD */
#hud{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:flex-start;padding:20px 24px;pointer-events:none;}
.hud-block{display:flex;flex-direction:column;align-items:center;}
.hud-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;color:var(--muted);text-transform:uppercase;margin-bottom:2px;}
.hud-value{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--text);line-height:1;}
.hud-value.accent{color:var(--accent);}
.combo-badge{background:linear-gradient(135deg,#c8b8ff22,#ff9de222);border:1px solid var(--accent);border-radius:20px;padding:4px 14px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;color:var(--accent);letter-spacing:0.1em;opacity:0;transition:opacity 0.3s;margin-top:6px;}
.combo-badge.visible{opacity:1;}

/* Screens */
.screen{position:fixed;inset:0;z-index:30;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background:rgba(10,10,15,0.92);backdrop-filter:blur(20px);}
.screen.hidden{display:none;}

/* Menu */
.game-logo{font-family:'Syne',sans-serif;font-size:clamp(56px,14vw,96px);font-weight:800;letter-spacing:-0.03em;line-height:0.9;text-align:center;margin-bottom:8px;}
.game-logo span{display:block;}
.game-logo .line1{color:var(--text);}
.game-logo .line2{background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.tagline{font-family:'DM Mono',monospace;font-size:12px;color:var(--muted);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:48px;text-align:center;}

.btn{
  font-family:'Syne',sans-serif;font-size:16px;font-weight:700;
  padding:16px 40px;border-radius:100px;border:none;cursor:pointer;
  transition:transform 0.15s,box-shadow 0.15s,opacity 0.15s;
  letter-spacing:0.02em;
}
.btn:active{transform:scale(0.96);}
.btn-primary{
  background:linear-gradient(135deg,#c8b8ff,#9d8fff);
  color:#1a1530;
  box-shadow:0 0 40px rgba(200,184,255,0.3);
}
.btn-primary:hover{box-shadow:0 0 60px rgba(200,184,255,0.5);transform:translateY(-1px);}
.btn-secondary{
  background:var(--surface);
  color:var(--text);
  border:1px solid var(--border);
}
.btn-secondary:hover{background:rgba(255,255,255,0.08);}
.btn-icon{
  background:var(--surface);
  color:var(--muted);
  border:1px solid var(--border);
  border-radius:50%;
  width:44px;height:44px;
  padding:0;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
}

.best-score-display{
  font-family:'DM Mono',monospace;
  font-size:13px;color:var(--muted);
  margin-bottom:32px;
  text-align:center;
}
.best-score-display strong{color:var(--accent);font-weight:500;}

/* Game Over */
.go-score{font-family:'Syne',sans-serif;font-size:clamp(72px,20vw,120px);font-weight:800;line-height:1;text-align:center;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px;}
.go-label{font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);letter-spacing:0.2em;text-transform:uppercase;text-align:center;margin-bottom:4px;}
.go-best{font-family:'DM Mono',monospace;font-size:13px;color:var(--accent3);text-align:center;margin-bottom:40px;}
.go-stats{display:flex;gap:32px;margin-bottom:40px;}
.go-stat{text-align:center;}
.go-stat-val{font-family:'Syne',sans-serif;font-size:24px;font-weight:700;color:var(--text);}
.go-stat-lbl{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;margin-top:2px;}
.new-best-badge{
  background:linear-gradient(135deg,var(--accent3)22,var(--accent3)11);
  border:1px solid var(--accent3);
  border-radius:20px;padding:6px 16px;
  font-family:'DM Mono',monospace;font-size:11px;color:var(--accent3);
  letter-spacing:0.1em;margin-bottom:16px;
  animation:pulse 2s ease-in-out infinite;
}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}

/* Pause */
.pause-title{font-family:'Syne',sans-serif;font-size:42px;font-weight:800;text-align:center;margin-bottom:8px;color:var(--text);}
.pause-sub{font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);letter-spacing:0.2em;text-align:center;margin-bottom:40px;}

/* Settings panel */
.settings-section{width:100%;max-width:320px;margin-bottom:24px;}
.settings-label{font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:12px;}
.toggle-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);}
.toggle-row-label{font-size:14px;color:var(--text);}
.toggle{position:relative;width:44px;height:24px;}
.toggle input{opacity:0;width:0;height:0;}
.toggle-slider{position:absolute;inset:0;background:rgba(255,255,255,0.1);border-radius:12px;transition:0.3s;cursor:pointer;}
.toggle-slider::before{content:'';position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:0.3s;}
.toggle input:checked+.toggle-slider{background:var(--accent);}
.toggle input:checked+.toggle-slider::before{transform:translateX(20px);}
.volume-row{display:flex;align-items:center;gap:12px;padding:10px 0;}
.volume-row label{font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);min-width:60px;}
.volume-row input[type=range]{flex:1;accent-color:var(--accent);}

/* Floating score text */
.float-score{
  position:fixed;
  font-family:'Syne',sans-serif;font-size:22px;font-weight:800;
  pointer-events:none;z-index:50;
  animation:floatUp 1.2s ease-out forwards;
}
.float-score.perfect{color:var(--accent3);font-size:28px;}
.float-score.normal{color:var(--accent);}
@keyframes floatUp{
  0%{opacity:1;transform:translateY(0) scale(1);}
  80%{opacity:1;}
  100%{opacity:0;transform:translateY(-80px) scale(0.7);}
}

/* Perfect flash */
.perfect-flash{
  position:fixed;inset:0;z-index:25;
  background:radial-gradient(circle,rgba(122,255,212,0.15),transparent 70%);
  pointer-events:none;
  opacity:0;
  animation:flashIn 0.6s ease-out forwards;
}
@keyframes flashIn{0%{opacity:1}100%{opacity:0}}

/* Streak counter */
#streak-display{
  position:fixed;bottom:40px;left:50%;transform:translateX(-50%);
  z-index:20;pointer-events:none;
  font-family:'Syne',sans-serif;font-size:14px;font-weight:700;
  color:var(--accent3);letter-spacing:0.05em;
  opacity:0;transition:opacity 0.3s;
}

/* Decorative ring on menu */
.deco-ring{
  position:absolute;
  border-radius:50%;
  border:1px solid rgba(200,184,255,0.1);
  animation:spin linear infinite;
  pointer-events:none;
}
@keyframes spin{to{transform:rotate(360deg)}}

/* Buttons row */
.btn-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;}

/* Transitions */
.screen{transition:opacity 0.3s ease;}
.screen.fade-out{opacity:0;}

/* Mobile tap hint */
#tap-hint{
  position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
  z-index:20;pointer-events:none;
  font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.2em;
  color:rgba(255,255,255,0.25);text-transform:uppercase;
  animation:blink 2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:0.3}50%{opacity:1}}
</style>
</head>
<body>

<div id="phaser-container"></div>

<!-- HUD -->
<div id="hud" class="hidden">
  <div class="hud-block">
    <div class="hud-label">Score</div>
    <div class="hud-value" id="hud-score">0</div>
    <div class="combo-badge" id="combo-badge">× 1 COMBO</div>
  </div>
  <div style="display:flex;gap:12px;align-items:flex-start;pointer-events:all;">
    <button class="btn btn-icon" id="pause-btn" title="Pause">⏸</button>
    <button class="btn btn-icon" id="mute-btn" title="Mute">🔊</button>
  </div>
  <div class="hud-block">
    <div class="hud-label">Best</div>
    <div class="hud-value accent" id="hud-best">0</div>
  </div>
</div>

<div id="streak-display"></div>
<div id="tap-hint" class="hidden">TAP TO PLACE</div>

<!-- Main Menu -->
<div class="screen" id="screen-menu">
  <div class="deco-ring" style="width:600px;height:600px;top:50%;left:50%;margin:-300px 0 0 -300px;animation-duration:40s;"></div>
  <div class="deco-ring" style="width:400px;height:400px;top:50%;left:50%;margin:-200px 0 0 -200px;animation-duration:25s;animation-direction:reverse;"></div>
  <div class="deco-ring" style="width:250px;height:250px;top:50%;left:50%;margin:-125px 0 0 -125px;animation-duration:15s;"></div>
  
  <div class="game-logo">
    <span class="line1">STACK</span>
    <span class="line2">UP</span>
  </div>
  <div class="tagline">Precision · Rhythm · Infinite</div>
  <div class="best-score-display" id="menu-best">Best: <strong>0</strong></div>
  <div class="btn-row">
    <button class="btn btn-primary" id="btn-play">Play</button>
    <button class="btn btn-secondary" id="btn-settings-menu">Settings</button>
  </div>
</div>

<!-- Pause Menu -->
<div class="screen hidden" id="screen-pause">
  <div class="pause-title">Paused</div>
  <div class="pause-sub">Take a breath</div>
  <div class="btn-row" style="flex-direction:column;gap:12px;width:100%;max-width:280px;">
    <button class="btn btn-primary" style="width:100%" id="btn-resume">Resume</button>
    <button class="btn btn-secondary" style="width:100%" id="btn-restart-pause">Restart</button>
    <button class="btn btn-secondary" style="width:100%" id="btn-menu-pause">Main Menu</button>
  </div>
</div>

<!-- Game Over -->
<div class="screen hidden" id="screen-gameover">
  <div class="go-label">Score</div>
  <div class="go-score" id="go-score">0</div>
  <div class="go-best" id="go-best"></div>
  <div class="go-stats">
    <div class="go-stat">
      <div class="go-stat-val" id="go-height">0</div>
      <div class="go-stat-lbl">Height</div>
    </div>
    <div class="go-stat">
      <div class="go-stat-val" id="go-perfects">0</div>
      <div class="go-stat-lbl">Perfects</div>
    </div>
    <div class="go-stat">
      <div class="go-stat-val" id="go-maxcombo">0</div>
      <div class="go-stat-lbl">Max Combo</div>
    </div>
  </div>
  <div class="btn-row" style="flex-direction:column;gap:12px;width:100%;max-width:280px;">
    <button class="btn btn-primary" style="width:100%" id="btn-restart">Play Again</button>
    <button class="btn btn-secondary" style="width:100%" id="btn-menu-go">Main Menu</button>
  </div>
</div>

<!-- Settings Screen -->
<div class="screen hidden" id="screen-settings">
  <div class="pause-title">Settings</div>
  <div class="pause-sub">AudioManager & Display</div>
  <div class="settings-section">
    <div class="settings-label">AudioManager</div>
    <div class="toggle-row">
      <span class="toggle-row-label">Sound Effects</span>
      <label class="toggle"><input type="checkbox" id="sfx-toggle" checked><span class="toggle-slider"></span></label>
    </div>
    <div class="toggle-row">
      <span class="toggle-row-label">Music</span>
      <label class="toggle"><input type="checkbox" id="music-toggle" checked><span class="toggle-slider"></span></label>
    </div>
    <div class="volume-row">
      <label>Volume</label>
      <input type="range" min="0" max="100" value="70" id="volume-slider">
    </div>
  </div>
  <div class="settings-section">
    <div class="settings-label">Display</div>
    <div class="toggle-row">
      <span class="toggle-row-label">Particles</span>
      <label class="toggle"><input type="checkbox" id="particles-toggle" checked><span class="toggle-slider"></span></label>
    </div>
    <div class="toggle-row">
      <span class="toggle-row-label">Screen Shake</span>
      <label class="toggle"><input type="checkbox" id="shake-toggle" checked><span class="toggle-slider"></span></label>
    </div>
  </div>
  <button class="btn btn-primary" id="btn-settings-back">Done</button>
</div>

<script>
// ==========================================
// GAME STATE & SETTINGS
// ==========================================
const SaveKey = {
  BEST: 'stackup_best',
  SETTINGS: 'stackup_settings'
};

const Settings = {
  sfx: true, music: true, volume: 0.7, particles: true, shake: true,
  load() {
    try {
      const s = JSON.parse(localStorage.getItem(SaveKey.SETTINGS) || '{}');
      Object.assign(this, s);
    } catch(e){}
  },
  save() {
    try { localStorage.setItem(SaveKey.SETTINGS, JSON.stringify({
      sfx:this.sfx, music:this.music, volume:this.volume,
      particles:this.particles, shake:this.shake
    })); } catch(e){}
  }
};
Settings.load();

let bestScore = parseInt(localStorage.getItem(SaveKey.BEST) || '0');
let gameState = { score: 0, combo: 0, maxCombo: 0, perfects: 0, height: 0, isPlaying: false };

function saveBest(s) {
  if (s > bestScore) { bestScore = s; localStorage.setItem(SaveKey.BEST, s); return true; }
  return false;
}

// ==========================================
// UI HELPERS
// ==========================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
function hideScreen(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
function updateHUD() {
  document.getElementById('hud-score').textContent = gameState.score;
  document.getElementById('hud-best').textContent = bestScore;
  const badge = document.getElementById('combo-badge');
  if (gameState.combo >= 2) {
    badge.textContent = '× ' + gameState.combo + ' COMBO';
    badge.classList.add('visible');
  } else { badge.classList.remove('visible'); }
}
function showHUD(v) {
  document.getElementById('hud').classList.toggle('hidden', !v);
  document.getElementById('tap-hint').classList.toggle('hidden', !v);
  document.getElementById('streak-display').style.opacity = v ? '' : '0';
}
function showFloatScore(x, y, text, isPerfect) {
  const el = document.createElement('div');
  el.className = 'float-score ' + (isPerfect ? 'perfect' : 'normal');
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
function triggerPerfectFlash() {
  const el = document.createElement('div');
  el.className = 'perfect-flash';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}
function updateStreakDisplay(combo) {
  const el = document.getElementById('streak-display');
  if (combo >= 3) {
    el.textContent = '🔥 ' + combo + ' PERFECT STREAK';
    el.style.opacity = '1';
  } else { el.style.opacity = '0'; }
}

// ==========================================
// AUDIO MANAGER (Web AudioManager API)
// ==========================================
const AudioManager = {
  ctx: null,
  notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],
  noteIdx: 0,
  gainNode: null,
  musicGain: null,
  musicOscillators: [],
  init() {
    try {
      this.ctx = new (window.AudioManagerContext || window.webkitAudioManagerContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = Settings.volume;
      this.gainNode.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = Settings.music ? Settings.volume * 0.12 : 0;
      this.musicGain.connect(this.ctx.destination);
    } catch(e) { this.ctx = null; }
  },
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  playTone(freq, type='sine', duration=0.15, vol=0.3) {
    if (!this.ctx || !Settings.sfx) return;
    try {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.setValueAtTime(vol * Settings.volume, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(g); g.connect(this.gainNode);
      osc.start(); osc.stop(this.ctx.currentTime + duration);
    } catch(e){}
  },
  playPlace(noteIdx) {
    const freq = this.notes[Math.min(noteIdx, this.notes.length-1)];
    this.playTone(freq, 'sine', 0.2, 0.4);
    this.playTone(freq * 2, 'sine', 0.1, 0.1);
  },
  playPerfect() {
    const freq = this.notes[Math.min(this.noteIdx, this.notes.length-1)];
    this.playTone(freq, 'sine', 0.25, 0.5);
    this.playTone(freq * 1.5, 'sine', 0.2, 0.3);
    this.playTone(freq * 2, 'triangle', 0.15, 0.2);
  },
  playFall() {
    this.playTone(120, 'sawtooth', 0.3, 0.2);
    this.playTone(80, 'square', 0.2, 0.1);
  },
  playMiss() {
    this.playTone(180, 'sawtooth', 0.4, 0.4);
    this.playTone(90, 'sawtooth', 0.3, 0.3);
  },
  playCombo(combo) {
    const baseFreq = 400 + combo * 60;
    this.playTone(baseFreq, 'sine', 0.3, 0.5);
    setTimeout(() => this.playTone(baseFreq * 1.25, 'sine', 0.2, 0.3), 80);
  },
  startMusic() {
    if (!this.ctx || !Settings.music) return;
    this.stopMusic();
    const chord = [130.81, 164.81, 196.00, 246.94];
    const pattern = [0,2,1,3,2,1,0,3];
    let step = 0;
    const playStep = () => {
      if (!this.ctx) return;
      const freq = chord[pattern[step % pattern.length]];
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.001, this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(g); g.connect(this.musicGain);
      osc.start(); osc.stop(this.ctx.currentTime + 0.8);
      step++;
      this._musicTimer = setTimeout(playStep, 400);
    };
    playStep();
  },
  stopMusic() {
    clearTimeout(this._musicTimer);
    this._musicTimer = null;
  },
  setVolume(v) {
    Settings.volume = v;
    if (this.gainNode) this.gainNode.gain.value = v;
    if (this.musicGain) this.musicGain.gain.value = Settings.music ? v * 0.12 : 0;
  },
  setMusicEnabled(v) {
    Settings.music = v;
    if (this.musicGain) this.musicGain.gain.value = v ? Settings.volume * 0.12 : 0;
    if (v) this.startMusic(); else this.stopMusic();
  }
};

// ==========================================
// PHASER GAME
// ==========================================
const BLOCK_HEIGHT = 28;
const BLOCK_INIT_W = 260;
const PERFECT_THRESHOLD = 6;
const PERFECT_RESTORE = 12;

let game = null;
let gameScene = null;

class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  create() {
    this.W = this.scale.width;
    this.H = this.scale.height;

    // State
    this.blocks = [];
    this.currentBlock = null;
    this.fallingPieces = [];
    this.stackY = this.H - 100;
    this.blockW = BLOCK_INIT_W;
    this.speed = 180;
    this.dir = 1;
    this.layer = 0;
    this.waitingForInput = false;
    this.gameOver = false;
    this.paused = false;
    this.noteIdx = 0;
    this.cameraTargetY = 0;
    this.shakePower = 0;
    this.particlesEnabled = Settings.particles;

    // Graphics layers
    this.bgGraphics = this.add.graphics();
    this.shadowGraphics = this.add.graphics();
    this.blockGraphics = this.add.graphics();
    this.effectsGraphics = this.add.graphics();
    this.particleGraphics = this.add.graphics();
    this.particles = [];

    // Camera world
    this.worldContainer = this.add.container(0, 0);

    // Color palette
    this.palette = [
      0xc8b8ff, 0xb8a4ff, 0xa890ff, 0xff9de2, 0xffb3ec,
      0x7affd4, 0x5ef0c0, 0x44ddaa, 0xffd97d, 0xffeba3,
      0xff9de2, 0xc8b8ff, 0x7affd4, 0xffd97d, 0xa890ff,
    ];

    // Draw background
    this.drawBackground();

    // Place base block
    this.placeBaseBlock();
    this.spawnBlock();

    // Input
    this.input.on('pointerdown', this.onTap, this);
    this.input.keyboard.on('keydown-SPACE', this.onTap, this);
    this.input.keyboard.on('keydown-P', this.togglePause, this);

    this.cameraOffsetY = 0;

    // Render initially
    this.redrawAll();

    gameScene = this;
  }

  getColor(layer) {
    return this.palette[layer % this.palette.length];
  }

  drawBackground() {
    const g = this.bgGraphics;
    g.clear();
    const progress = Math.min(this.layer / 80, 1);

    // Sky gradient simulation
    const topR = Phaser.Math.Linear(10, 5, progress);
    const topG = Phaser.Math.Linear(10, 8, progress);
    const topB = Phaser.Math.Linear(15, 25, progress);
    const botR = Phaser.Math.Linear(15, 10, progress);
    const botG = Phaser.Math.Linear(8, 5, progress);
    const botB = Phaser.Math.Linear(25, 40, progress);

    for (let y = 0; y < this.H; y += 4) {
      const t = y / this.H;
      const r = Math.floor(Phaser.Math.Linear(topR, botR, t));
      const gg2 = Math.floor(Phaser.Math.Linear(topG, botG, t));
      const b = Math.floor(Phaser.Math.Linear(topB, botB, t));
      g.fillStyle((r << 16) | (gg2 << 8) | b, 1);
      g.fillRect(0, y, this.W, 4);
    }

    // Floating BG particles
    if (!this._bgParticles || this._bgParticles.length === 0) {
      this._bgParticles = Array.from({length: 30}, () => ({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        alpha: Math.random() * 0.15 + 0.03
      }));
    }
    this._bgParticles.forEach(p => {
      g.fillStyle(0xc8b8ff, p.alpha);
      g.fillCircle(p.x, p.y, p.r);
    });
  }

  placeBaseBlock() {
    const x = (this.W - this.blockW) / 2;
    const y = this.stackY;
    this.blocks.push({ x, y, w: this.blockW, layer: 0, color: this.getColor(0) });
  }

  spawnBlock() {
    if (this.gameOver) return;
    const top = this.blocks[this.blocks.length - 1];
    const y = top.y - BLOCK_HEIGHT;
    const startX = this.dir > 0 ? -this.blockW - 20 : this.W + 20;
    this.currentBlock = {
      x: startX,
      y: y,
      w: this.blockW,
      layer: this.layer + 1,
      color: this.getColor(this.layer + 1),
      vx: this.speed * this.dir
    };
    this.waitingForInput = true;
  }

  onTap() {
    if (this.paused || this.gameOver || !this.waitingForInput) return;
    AudioManager.resume();
    this.placeBlock();
  }

  placeBlock() {
    this.waitingForInput = false;
    const top = this.blocks[this.blocks.length - 1];
    const curr = this.currentBlock;

    const leftOverlap = Math.max(curr.x, top.x);
    const rightOverlap = Math.min(curr.x + curr.w, top.x + top.w);
    const overlap = rightOverlap - leftOverlap;

    if (overlap <= 0) {
      this.triggerMiss();
      return;
    }

    const delta = curr.x - top.x;
    const isPerfect = Math.abs(delta) <= PERFECT_THRESHOLD;

    if (isPerfect) {
      // Perfect placement - snap to top
      const restoredW = Math.min(curr.w + PERFECT_RESTORE, BLOCK_INIT_W);
      const restoredX = top.x + (top.w - restoredW) / 2;
      this.blocks.push({ x: restoredX, y: curr.y, w: restoredW, layer: curr.layer, color: curr.color });
      this.blockW = restoredW;
      this.triggerPerfect(curr.x + curr.w / 2, curr.y);
    } else {
      // Cut block
      const newBlock = { x: leftOverlap, y: curr.y, w: overlap, layer: curr.layer, color: curr.color };
      this.blocks.push(newBlock);
      this.blockW = overlap;

      // Falling piece
      if (delta > 0) {
        this.spawnFallingPiece(curr.x, curr.y, leftOverlap - curr.x, BLOCK_HEIGHT, curr.color, 1);
      } else {
        this.spawnFallingPiece(rightOverlap, curr.y, curr.x + curr.w - rightOverlap, BLOCK_HEIGHT, curr.color, -1);
      }

      gameState.combo = 0;
      document.getElementById('combo-badge').classList.remove('visible');
      updateStreakDisplay(0);
      AudioManager.playPlace(this.noteIdx % AudioManager.notes.length);
      if (Settings.shake) this.shakePower = 3;
    }

    this.layer++;
    this.noteIdx = Math.min(this.noteIdx + 1, AudioManager.notes.length - 1);
    gameState.score += isPerfect ? (10 + gameState.combo * 5) : (5 + Math.floor(overlap / 20));
    gameState.height = this.layer;

    updateHUD();
    this.updateSpeed();
    this.dir *= -1;

    // Show float text
    const screenX = this.W / 2;
    const screenY = (curr.y - this.cameraOffsetY) - 40;
    if (isPerfect) {
      showFloatScore(screenX - 50, screenY, 'PERFECT! +' + (10 + gameState.combo * 5), true);
    } else {
      showFloatScore(screenX - 30, screenY, '+' + (5 + Math.floor(overlap / 20)), false);
    }

    this.currentBlock = null;
    this.redrawAll();

    // Move camera up
    if (this.layer > 4) {
      this.cameraTargetY = (this.layer - 4) * BLOCK_HEIGHT;
    }

    setTimeout(() => { if (!this.gameOver) this.spawnBlock(); }, 80);
  }

  triggerPerfect(cx, cy) {
    gameState.combo++;
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
    gameState.perfects++;
    triggerPerfectFlash();
    AudioManager.playPerfect();
    if (gameState.combo >= 2) AudioManager.playCombo(gameState.combo);
    updateStreakDisplay(gameState.combo);
    if (Settings.particles) this.spawnPerfectParticles(cx, cy - this.cameraOffsetY);
    if (Settings.shake) this.shakePower = 6;
  }

  triggerMiss() {
    this.gameOver = true;
    AudioManager.playMiss();
    if (Settings.shake) this.shakePower = 15;

    // Drop current block as falling piece
    if (this.currentBlock) {
      this.spawnFallingPiece(
        this.currentBlock.x, this.currentBlock.y,
        this.currentBlock.w, BLOCK_HEIGHT,
        this.currentBlock.color, 0, 200
      );
      this.currentBlock = null;
    }

    setTimeout(() => this.endGame(), 800);
  }

  endGame() {
    const isNew = saveBest(gameState.score);
    showHUD(false);
    showScreen('screen-gameover');
    document.getElementById('go-score').textContent = gameState.score;
    document.getElementById('go-height').textContent = gameState.height;
    document.getElementById('go-perfects').textContent = gameState.perfects;
    document.getElementById('go-maxcombo').textContent = gameState.maxCombo;

    let bestEl = document.getElementById('go-best');
    if (isNew) {
      bestEl.textContent = '✨ New Best Score!';
    } else {
      bestEl.textContent = 'Best: ' + bestScore;
    }
    document.getElementById('menu-best').innerHTML = 'Best: <strong>' + bestScore + '</strong>';
    AudioManager.stopMusic();
  }

  spawnFallingPiece(x, y, w, h, color, spinDir, vy0 = 0) {
    AudioManager.playFall();
    this.fallingPieces.push({
      x, y: y - this.cameraOffsetY, w, h, color,
      vy: vy0 || 30, vx: (Math.random() - 0.5) * 60,
      spin: 0, spinV: (Math.random() - 0.5) * 6 * (spinDir || 1),
      alpha: 1, life: 1
    });
  }

  spawnPerfectParticles(cx, cy) {
    const colors = [0x7affd4, 0xc8b8ff, 0xff9de2, 0xffd97d];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 80 + Math.random() * 120;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        r: 2 + Math.random() * 4,
        color: colors[i % colors.length],
        alpha: 1, life: 1,
        gravity: 150
      });
    }
  }

  updateSpeed() {
    this.speed = Math.min(180 + this.layer * 2.5, 420);
  }

  togglePause() {
    if (this.gameOver) return;
    this.paused = !this.paused;
    if (this.paused) {
      showScreen('screen-pause');
      showHUD(false);
    } else {
      hideScreen('screen-pause');
      showHUD(true);
    }
  }

  redrawAll() {
    this.drawBackground();
    this.drawBlocks();
  }

  drawBlocks() {
    const g = this.blockGraphics;
    const sg = this.shadowGraphics;
    g.clear(); sg.clear();

    const camY = this.cameraOffsetY;
    const startIdx = Math.max(0, this.blocks.length - 30);

    for (let i = startIdx; i < this.blocks.length; i++) {
      const b = this.blocks[i];
      const screenY = b.y - camY;
      if (screenY > this.H + 50 || screenY < -100) continue;

      const color = b.color;
      const darken = Phaser.Display.Color.IntegerToColor(color);
      darken.darken(25);
      const darkColor = Phaser.Display.Color.GetColor(darken.red, darken.green, darken.blue);

      // Shadow
      sg.fillStyle(0x000000, 0.15);
      sg.fillRoundedRect(b.x + 4, screenY + 4, b.w, BLOCK_HEIGHT, 3);

      // Top face (main)
      g.fillStyle(color, 1);
      g.fillRoundedRect(b.x, screenY, b.w, BLOCK_HEIGHT, 3);

      // Highlight
      g.fillStyle(0xffffff, 0.12);
      g.fillRoundedRect(b.x + 3, screenY + 2, b.w - 6, 6, 2);

      // Side bottom shadow
      g.fillStyle(darkColor, 0.8);
      g.fillRoundedRect(b.x, screenY + BLOCK_HEIGHT - 5, b.w, 5, { bl: 3, br: 3, tl: 0, tr: 0 });
    }

    // Current moving block
    if (this.currentBlock) {
      const c = this.currentBlock;
      const screenY = c.y - camY;
      const color = c.color;

      sg.fillStyle(0x000000, 0.1);
      sg.fillRoundedRect(c.x + 4, screenY + 4, c.w, BLOCK_HEIGHT, 3);

      g.fillStyle(color, 1);
      g.fillRoundedRect(c.x, screenY, c.w, BLOCK_HEIGHT, 3);

      g.fillStyle(0xffffff, 0.15);
      g.fillRoundedRect(c.x + 3, screenY + 2, c.w - 6, 6, 2);
    }
  }

  drawParticles() {
    const g = this.particleGraphics;
    g.clear();

    // Falling pieces
    this.fallingPieces.forEach(p => {
      if (p.alpha <= 0) return;
      g.fillStyle(p.color, p.alpha);
      // Simple rectangle (rotated by drawing offset)
      g.fillRoundedRect(p.x - p.w/2 + p.w/2, p.y, p.w, p.h, 2);
    });

    // Particles
    this.particles.forEach(p => {
      if (p.alpha <= 0) return;
      g.fillStyle(p.color, p.alpha);
      g.fillCircle(p.x, p.y, p.r);
    });
  }

  update(time, delta) {
    if (this.paused || this.gameOver) {
      this.drawParticles();
      return;
    }

    const dt = delta / 1000;

    // Camera lerp
    this.cameraOffsetY = Phaser.Math.Linear(this.cameraOffsetY, this.cameraTargetY, dt * 6);

    // Screen shake
    if (this.shakePower > 0.1) {
      this.cameras.main.setScroll(
        (Math.random() - 0.5) * this.shakePower,
        (Math.random() - 0.5) * this.shakePower
      );
      this.shakePower *= 0.75;
    } else {
      this.shakePower = 0;
      this.cameras.main.setScroll(0, 0);
    }

    // Move current block
    if (this.currentBlock && this.waitingForInput) {
      this.currentBlock.x += this.currentBlock.vx * dt;
      if (this.currentBlock.x > this.W + 20) { this.currentBlock.vx = -this.speed; }
      if (this.currentBlock.x + this.currentBlock.w < -20) { this.currentBlock.vx = this.speed; }
    }

    // Update falling pieces
    this.fallingPieces = this.fallingPieces.filter(p => p.alpha > 0.01);
    this.fallingPieces.forEach(p => {
      p.vy += 400 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.spin += p.spinV * dt;
      p.alpha -= dt * 1.5;
      p.life -= dt;
    });

    // Update particles
    this.particles = this.particles.filter(p => p.alpha > 0.01);
    this.particles.forEach(p => {
      p.vy += (p.gravity || 200) * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= dt * 2;
      p.r *= 0.99;
    });

    // BG particles drift
    if (this._bgParticles) {
      this._bgParticles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -5) p.y = this.H + 5;
      });
    }

    // Redraw
    this.drawBackground();
    this.drawBlocks();
    this.drawParticles();
  }
}

function startGame() {
  // Reset state
  gameState = { score: 0, combo: 0, maxCombo: 0, perfects: 0, height: 0, isPlaying: true };
  updateHUD();
  showScreen(null);
  showHUD(true);

  if (game) {
    game.destroy(true);
    game = null;
    gameScene = null;
  }

  const w = window.innerWidth;
  const h = window.innerHeight;

  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: w,
    height: h,
    backgroundColor: '#0a0a0f',
    parent: 'phaser-container',
    scene: [GameScene],
    physics: { default: 'arcade' },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: { antialias: true, roundPixels: false }
  });

  AudioManager.resume();
  AudioManager.startMusic();
}

function goToMenu() {
  if (game) { game.destroy(true); game = null; gameScene = null; }
  AudioManager.stopMusic();
  showHUD(false);
  showScreen('screen-menu');
  document.getElementById('menu-best').innerHTML = 'Best: <strong>' + bestScore + '</strong>';
}

// ==========================================
// BUTTON HANDLERS
// ==========================================
document.getElementById('btn-play').onclick = () => { AudioManager.init(); startGame(); };
document.getElementById('btn-settings-menu').onclick = () => { showScreen('screen-settings'); };
document.getElementById('btn-settings-back').onclick = () => { Settings.save(); showScreen('screen-menu'); };
document.getElementById('btn-restart').onclick = () => startGame();
document.getElementById('btn-menu-go').onclick = () => goToMenu();
document.getElementById('btn-resume').onclick = () => { if (gameScene) gameScene.togglePause(); };
document.getElementById('btn-restart-pause').onclick = () => startGame();
document.getElementById('btn-menu-pause').onclick = () => goToMenu();

document.getElementById('pause-btn').onclick = () => { if (gameScene) gameScene.togglePause(); };
document.getElementById('mute-btn').onclick = function() {
  Settings.sfx = !Settings.sfx;
  Settings.save();
  this.textContent = Settings.sfx ? '🔊' : '🔇';
  document.getElementById('sfx-toggle').checked = Settings.sfx;
};

// Settings controls
document.getElementById('sfx-toggle').onchange = function() {
  Settings.sfx = this.checked;
  document.getElementById('mute-btn').textContent = Settings.sfx ? '🔊' : '🔇';
};
document.getElementById('music-toggle').onchange = function() {
  AudioManager.setMusicEnabled(this.checked);
};
document.getElementById('volume-slider').oninput = function() {
  AudioManager.setVolume(this.value / 100);
};
document.getElementById('particles-toggle').onchange = function() {
  Settings.particles = this.checked;
  if (gameScene) gameScene.particlesEnabled = this.checked;
};
document.getElementById('shake-toggle').onchange = function() {
  Settings.shake = this.checked;
};

// Init settings UI
document.getElementById('sfx-toggle').checked = Settings.sfx;
document.getElementById('music-toggle').checked = Settings.music;
document.getElementById('particles-toggle').checked = Settings.particles;
document.getElementById('shake-toggle').checked = Settings.shake;
document.getElementById('volume-slider').value = Settings.volume * 100;

// Start on menu
showScreen('screen-menu');
document.getElementById('menu-best').innerHTML = 'Best: <strong>' + bestScore + '</strong>';

// Keyboard shortcuts on menu
document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'Enter') {
    const menuEl = document.getElementById('screen-menu');
    if (!menuEl.classList.contains('hidden')) {
      AudioManager.init();
      startGame();
    }
  }
});

// Prevent scroll
document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
</script>
</body>
</html>`;

function StackGame() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    ></div>
  );
}

export default StackGame;
