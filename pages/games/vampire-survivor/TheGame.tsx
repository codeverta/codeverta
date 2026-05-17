"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// CONSTANTS
// ============================================================
const GAME_W = 800;
const GAME_H = 600;
const WORLD_SIZE = 4000;
const TILE_SIZE = 64;

const COLORS = {
  player: 0x00ffff,
  zombie: 0xff4444,
  fast: 0xff8800,
  tank: 0x8800ff,
  ranged: 0xffff00,
  elite: 0xff00ff,
  xp: 0x44ff88,
  projectile: 0x00ffff,
  orbit: 0xffaa00,
  lightning: 0xffffff,
  explosion: 0xff6600,
  piercing: 0x00ff88,
  common: "#6b7280",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#f59e0b",
};

const ENEMY_TYPES = {
  zombie: {
    hp: 30,
    speed: 60,
    xp: 5,
    size: 14,
    color: COLORS.zombie,
    damage: 10,
    score: 10,
  },
  fast: {
    hp: 15,
    speed: 130,
    xp: 8,
    size: 10,
    color: COLORS.fast,
    damage: 8,
    score: 15,
  },
  tank: {
    hp: 150,
    speed: 35,
    xp: 20,
    size: 20,
    color: COLORS.tank,
    damage: 15,
    score: 25,
  },
  ranged: {
    hp: 25,
    speed: 50,
    xp: 12,
    size: 12,
    color: COLORS.ranged,
    damage: 12,
    score: 20,
  },
  elite: {
    hp: 300,
    speed: 75,
    xp: 50,
    size: 18,
    color: COLORS.elite,
    damage: 20,
    score: 50,
  },
};

const UPGRADES_POOL = [
  {
    id: "dmg1",
    name: "Power Surge",
    desc: "+25% damage to all weapons",
    rarity: "common",
    stat: "damage",
    value: 0.25,
    icon: "⚡",
  },
  {
    id: "spd1",
    name: "Quick Hands",
    desc: "+20% attack speed",
    rarity: "common",
    stat: "attackSpeed",
    value: 0.2,
    icon: "🌀",
  },
  {
    id: "mv1",
    name: "Fleet Foot",
    desc: "+15% movement speed",
    rarity: "common",
    stat: "moveSpeed",
    value: 0.15,
    icon: "💨",
  },
  {
    id: "hp1",
    name: "Iron Skin",
    desc: "+50 max HP",
    rarity: "common",
    stat: "maxHp",
    value: 50,
    icon: "❤️",
  },
  {
    id: "crit1",
    name: "Sharp Edge",
    desc: "+10% crit chance",
    rarity: "rare",
    stat: "critChance",
    value: 0.1,
    icon: "🎯",
  },
  {
    id: "pick1",
    name: "Magnetism",
    desc: "+80px pickup radius",
    rarity: "rare",
    stat: "pickupRadius",
    value: 80,
    icon: "🧲",
  },
  {
    id: "proj1",
    name: "Multishot",
    desc: "+1 projectile count",
    rarity: "rare",
    stat: "projectileCount",
    value: 1,
    icon: "✨",
  },
  {
    id: "dmg2",
    name: "War God",
    desc: "+50% damage to all weapons",
    rarity: "epic",
    stat: "damage",
    value: 0.5,
    icon: "⚔️",
  },
  {
    id: "arm1",
    name: "Plate Mail",
    desc: "+8 armor",
    rarity: "epic",
    stat: "armor",
    value: 8,
    icon: "🛡️",
  },
  {
    id: "spd2",
    name: "Berserker",
    desc: "+40% attack speed",
    rarity: "epic",
    stat: "attackSpeed",
    value: 0.4,
    icon: "🔥",
  },
  {
    id: "dmg3",
    name: "Godslayer",
    desc: "+100% damage",
    rarity: "legendary",
    stat: "damage",
    value: 1.0,
    icon: "💥",
  },
  {
    id: "mv2",
    name: "Sonic Dash",
    desc: "+50% movement speed",
    rarity: "legendary",
    stat: "moveSpeed",
    value: 0.5,
    icon: "⚡",
  },
];

const RARITY_WEIGHT = { common: 60, rare: 25, epic: 12, legendary: 3 };

// ============================================================
// ZUSTAND-LIKE STORE (simple reactive store without dependency)
// ============================================================
function createStore(init) {
  let state = init;
  const listeners = new Set();
  return {
    getState: () => state,
    setState: (partial) => {
      state =
        typeof partial === "function"
          ? partial(state)
          : { ...state, ...partial };
      listeners.forEach((l) => l(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const gameStore = createStore({
  phase: "menu", // menu | playing | paused | levelup | gameover
  hp: 100,
  maxHp: 100,
  xp: 0,
  xpToNext: 100,
  level: 1,
  kills: 0,
  time: 0,
  score: 0,
  highScore:
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("vs_highscore") || "0")
      : 0,
  pendingUpgrades: [],
  stats: {
    damage: 1.0,
    attackSpeed: 1.0,
    moveSpeed: 1.0,
    maxHp: 100,
    critChance: 0.05,
    pickupRadius: 100,
    projectileCount: 1,
    armor: 0,
  },
  settings: {
    musicVol: 0.5,
    sfxVol: 0.7,
    screenshake: true,
    showFps: false,
  },
});

function useStore(selector) {
  const [val, setVal] = useState(() => selector(gameStore.getState()));
  useEffect(() => {
    const unsub = gameStore.subscribe((s) => setVal(selector(s)));
    return unsub;
  }, []);
  return val;
}

// ============================================================
// PHASER GAME CLASS
// ============================================================
let phaserGame = null;

function createPhaserGame(mountEl, onReady) {
  if (typeof window.Phaser === "undefined") return null;
  const Phaser = window.Phaser;

  // ---- BOOT SCENE ----
  class BootScene extends Phaser.Scene {
    constructor() {
      super("Boot");
    }
    preload() {
      // Generate all graphics procedurally
    }
    create() {
      this.scene.start("Game");
    }
  }

  // ---- MAIN GAME SCENE ----
  class GameScene extends Phaser.Scene {
    constructor() {
      super("Game");
    }

    create() {
      this.store = gameStore;
      const s = this.store.getState();

      // Camera bounds
      this.cameras.main.setBounds(
        -WORLD_SIZE / 2,
        -WORLD_SIZE / 2,
        WORLD_SIZE,
        WORLD_SIZE
      );

      // Background grid
      this.createBackground();

      // Groups
      this.enemyGroup = this.physics.add.group();
      this.projectileGroup = this.physics.add.group();
      this.xpGroup = this.physics.add.group();
      this.particleGroup = this.add.group();
      this.damageTextGroup = this.add.group();
      this.orbitGroup = this.add.group();

      // Player
      this.createPlayer();

      // Camera follow
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      this.cameras.main.setZoom(1.1);

      // Weapons
      this.weapons = {
        projectile: { cooldown: 0, baseCd: 800, level: 1 },
        orbit: { cooldown: 0, baseCd: 0, orbs: [], angle: 0 },
        lightning: { cooldown: 0, baseCd: 3000, level: 1 },
        explosion: { cooldown: 0, baseCd: 5000, level: 1 },
        piercing: { cooldown: 0, baseCd: 2000, level: 1 },
      };

      // Timers
      this.gameTimer = 0;
      this.spawnTimer = 0;
      this.spawnInterval = 1500;
      this.waveTimer = 0;
      this.waveLevel = 0;

      // Inputs
      this.cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up2: Phaser.Input.Keyboard.KeyCodes.UP,
        down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
        left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        pause: Phaser.Input.Keyboard.KeyCodes.ESC,
      });
      this.input.keyboard.on("keydown-ESC", () => this.togglePause());

      // Mobile joystick
      this.joystick = { active: false, startX: 0, startY: 0, dx: 0, dy: 0 };
      this.input.on("pointerdown", (p) => this.onPointerDown(p));
      this.input.on("pointermove", (p) => this.onPointerMove(p));
      this.input.on("pointerup", () => {
        this.joystick.active = false;
        this.joystick.dx = 0;
        this.joystick.dy = 0;
      });

      // Orbit orbs
      for (let i = 0; i < 3; i++) {
        const orb = this.add.circle(0, 0, 8, COLORS.orbit, 1);
        this.orbitGroup.add(orb);
        this.weapons.orbit.orbs.push({
          sprite: orb,
          angle: (i / 3) * Math.PI * 2,
        });
      }

      // Colliders
      this.physics.add.overlap(
        this.player,
        this.enemyGroup,
        this.onPlayerHitEnemy,
        null,
        this
      );
      this.physics.add.overlap(
        this.projectileGroup,
        this.enemyGroup,
        this.onProjectileHitEnemy,
        null,
        this
      );
      this.physics.add.overlap(
        this.player,
        this.xpGroup,
        this.onXpPickup,
        null,
        this
      );

      // Store subscription — handle phase changes
      this.storeUnsub = this.store.subscribe((s) => {
        if (s.phase === "playing" && this.scene.isPaused()) this.scene.resume();
        if (s.phase === "paused" && !this.scene.isPaused()) this.scene.pause();
      });

      // Screen shake ref
      this.shakeIntensity = 0;

      // Reset store
      this.store.setState({
        phase: "playing",
        hp: 100,
        maxHp: 100,
        xp: 0,
        xpToNext: 100,
        level: 1,
        kills: 0,
        time: 0,
        score: 0,
        stats: {
          damage: 1.0,
          attackSpeed: 1.0,
          moveSpeed: 1.0,
          maxHp: 100,
          critChance: 0.05,
          pickupRadius: 100,
          projectileCount: 1,
          armor: 0,
        },
      });

      this.playerHp = 100;
      this.playerMaxHp = 100;
      this.invulnTimer = 0;

      onReady && onReady();
    }

    createBackground() {
      const g = this.add.graphics();
      // Dark base
      g.fillStyle(0x0a0a14, 1);
      g.fillRect(-WORLD_SIZE / 2, -WORLD_SIZE / 2, WORLD_SIZE, WORLD_SIZE);
      // Grid lines
      g.lineStyle(1, 0x1a1a2e, 0.8);
      for (let x = -WORLD_SIZE / 2; x <= WORLD_SIZE / 2; x += TILE_SIZE) {
        g.moveTo(x, -WORLD_SIZE / 2);
        g.lineTo(x, WORLD_SIZE / 2);
      }
      for (let y = -WORLD_SIZE / 2; y <= WORLD_SIZE / 2; y += TILE_SIZE) {
        g.moveTo(-WORLD_SIZE / 2, y);
        g.lineTo(WORLD_SIZE / 2, y);
      }
      g.strokePath();
      // Occasional glow dots
      for (let i = 0; i < 200; i++) {
        const x = Phaser.Math.Between(-WORLD_SIZE / 2, WORLD_SIZE / 2);
        const y = Phaser.Math.Between(-WORLD_SIZE / 2, WORLD_SIZE / 2);
        g.fillStyle(0x222244, 0.5);
        g.fillCircle(x, y, Phaser.Math.Between(1, 3));
      }
    }

    createPlayer() {
      // Player body
      const g = this.add.graphics();
      g.fillStyle(COLORS.player, 1);
      g.fillCircle(0, 0, 14);
      g.fillStyle(0xffffff, 0.9);
      g.fillCircle(0, -5, 5);
      const tex = g.generateTexture("player", 32, 32);
      g.destroy();

      this.player = this.physics.add.sprite(0, 0, "player");
      this.player.setCircle(14, 2, 2);
      this.player.setCollideWorldBounds(false);
      this.player.setDepth(10);

      // Glow effect
      this.playerGlow = this.add.circle(0, 0, 22, COLORS.player, 0.15);
      this.playerGlow.setDepth(9);
    }

    onPointerDown(p) {
      if (p.y > GAME_H * 0.7) {
        this.joystick.active = true;
        this.joystick.startX = p.x;
        this.joystick.startY = p.y;
      }
    }

    onPointerMove(p) {
      if (!this.joystick.active) return;
      const dx = p.x - this.joystick.startX;
      const dy = p.y - this.joystick.startY;
      const len = Math.sqrt(dx * dx + dy * dy);
      const maxR = 50;
      if (len > 0) {
        this.joystick.dx =
          ((dx / Math.max(len, maxR)) * Math.min(len, maxR)) / maxR;
        this.joystick.dy =
          ((dy / Math.max(len, maxR)) * Math.min(len, maxR)) / maxR;
      }
    }

    togglePause() {
      const { phase } = this.store.getState();
      if (phase === "playing") this.store.setState({ phase: "paused" });
      else if (phase === "paused") this.store.setState({ phase: "playing" });
    }

    update(time, delta) {
      const state = this.store.getState();
      if (state.phase !== "playing") return;

      const dt = delta / 1000;
      this.gameTimer += delta;
      this.waveTimer += delta;

      // Update HUD time
      if (
        Math.floor(this.gameTimer / 1000) >
        Math.floor((this.gameTimer - delta) / 1000)
      ) {
        this.store.setState({ time: Math.floor(this.gameTimer / 1000) });
      }

      // Move player
      this.updatePlayer(dt, state);

      // Weapons
      this.updateWeapons(delta, state);

      // Orbit orbs
      this.updateOrbit(dt, state);

      // Enemies
      this.updateEnemies(dt, state);

      // Spawn
      this.spawnTimer += delta;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnEnemies(state);
        // Ramp difficulty
        if (this.spawnInterval > 400) this.spawnInterval -= 5;
      }

      // Wave scaling
      if (this.waveTimer >= 30000) {
        this.waveTimer = 0;
        this.waveLevel++;
        this.spawnInterval = Math.max(350, this.spawnInterval - 100);
      }

      // Invuln
      if (this.invulnTimer > 0) this.invulnTimer -= delta;

      // Player glow
      this.playerGlow.setPosition(this.player.x, this.player.y);

      // XP magnet
      this.updateXpMagnet(state);

      // Projectile cleanup
      this.projectileGroup.getChildren().forEach((p) => {
        if (
          p.active &&
          (Math.abs(p.x - this.player.x) > 900 ||
            Math.abs(p.y - this.player.y) > 900)
        ) {
          p.destroy();
        }
      });

      // Damage text
      this.damageTextGroup.getChildren().forEach((t) => {
        if (!t.active) return;
        t.y -= 1;
        t.alpha -= 0.012;
        if (t.alpha <= 0) t.destroy();
      });

      // Screen shake decay
      if (this.shakeIntensity > 0 && state.settings.screenshake) {
        this.shakeIntensity -= delta * 0.003;
        if (this.shakeIntensity <= 0) this.shakeIntensity = 0;
      }
    }

    updatePlayer(dt, state) {
      const cur = this.cursors;
      const joy = this.joystick;
      let vx = 0,
        vy = 0;

      if (cur.left.isDown || cur.left2.isDown) vx -= 1;
      if (cur.right.isDown || cur.right2.isDown) vx += 1;
      if (cur.up.isDown || cur.up2.isDown) vy -= 1;
      if (cur.down.isDown || cur.down2.isDown) vy += 1;
      if (joy.active) {
        vx += joy.dx;
        vy += joy.dy;
      }

      const len = Math.sqrt(vx * vx + vy * vy);
      if (len > 0) {
        vx /= len;
        vy /= len;
      }

      const spd = 160 * state.stats.moveSpeed;
      this.player.setVelocity(vx * spd, vy * spd);

      // Pulse glow
      const t = Date.now() * 0.003;
      this.playerGlow.setAlpha(0.1 + Math.sin(t) * 0.05);
    }

    updateWeapons(delta, state) {
      const wp = this.weapons;

      // Projectile weapon
      wp.projectile.cooldown -= delta;
      const projCd = wp.projectile.baseCd / state.stats.attackSpeed;
      if (wp.projectile.cooldown <= 0) {
        wp.projectile.cooldown = projCd;
        this.fireProjectile(state);
      }

      // Lightning
      wp.lightning.cooldown -= delta;
      const lightCd = wp.lightning.baseCd / state.stats.attackSpeed;
      if (wp.lightning.cooldown <= 0 && state.level >= 3) {
        wp.lightning.cooldown = lightCd;
        this.fireLightning(state);
      }

      // Explosion
      wp.explosion.cooldown -= delta;
      const explCd = wp.explosion.baseCd / state.stats.attackSpeed;
      if (wp.explosion.cooldown <= 0 && state.level >= 5) {
        wp.explosion.cooldown = explCd;
        this.fireExplosion(state);
      }

      // Piercing
      wp.piercing.cooldown -= delta;
      const pierceCd = wp.piercing.baseCd / state.stats.attackSpeed;
      if (wp.piercing.cooldown <= 0 && state.level >= 7) {
        wp.piercing.cooldown = pierceCd;
        this.firePiercing(state);
      }
    }

    getNearestEnemy() {
      let nearest = null,
        minDist = Infinity;
      this.enemyGroup.getChildren().forEach((e) => {
        if (!e.active) return;
        const d = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          e.x,
          e.y
        );
        if (d < minDist) {
          minDist = d;
          nearest = e;
        }
      });
      return nearest;
    }

    fireProjectile(state) {
      const target = this.getNearestEnemy();
      const count = state.stats.projectileCount;
      const spread = count > 1 ? 20 : 0;
      const baseAngle = target
        ? Phaser.Math.Angle.Between(
            this.player.x,
            this.player.y,
            target.x,
            target.y
          )
        : -Math.PI / 2;

      for (let i = 0; i < count; i++) {
        const angle =
          baseAngle + (i - (count - 1) / 2) * Phaser.Math.DegToRad(spread);
        const proj = this.add.circle(
          this.player.x,
          this.player.y,
          6,
          COLORS.projectile,
          1
        );
        this.physics.add.existing(proj);
        proj.body.setCircle(6);
        proj.damage = 20 * state.stats.damage;
        proj.piercing = false;
        proj.hits = 1;
        const spd = 420;
        proj.body.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
        proj.setDepth(8);
        this.projectileGroup.add(proj);
        // Trail effect
        this.time.addEvent({
          delay: 50,
          callback: () =>
            this.addParticle(proj.x, proj.y, COLORS.projectile, 4, 300),
        });
      }
    }

    firePiercing(state) {
      const target = this.getNearestEnemy();
      const angle = target
        ? Phaser.Math.Angle.Between(
            this.player.x,
            this.player.y,
            target.x,
            target.y
          )
        : -Math.PI / 2;
      const proj = this.add.rectangle(
        this.player.x,
        this.player.y,
        24,
        6,
        COLORS.piercing,
        1
      );
      this.physics.add.existing(proj);
      proj.damage = 35 * state.stats.damage;
      proj.piercing = true;
      proj.hits = 10;
      const spd = 500;
      proj.body.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
      proj.setRotation(angle);
      proj.setDepth(8);
      this.projectileGroup.add(proj);
    }

    fireLightning(state) {
      // Strike 3 random enemies
      const enemies = this.enemyGroup.getChildren().filter((e) => e.active);
      const targets = Phaser.Utils.Array.Shuffle([...enemies]).slice(0, 3);
      targets.forEach((e) => {
        this.spawnLightningEffect(this.player.x, this.player.y, e.x, e.y);
        this.damageEnemy(e, 45 * state.stats.damage, state);
      });
    }

    spawnLightningEffect(x1, y1, x2, y2) {
      const g = this.add.graphics();
      g.lineStyle(3, COLORS.lightning, 1);
      // Jagged line
      const steps = 8;
      let px = x1,
        py = y1;
      g.moveTo(px, py);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const nx = x1 + (x2 - x1) * t + Phaser.Math.Between(-15, 15);
        const ny = y1 + (y2 - y1) * t + Phaser.Math.Between(-15, 15);
        g.lineTo(nx, ny);
        px = nx;
        py = ny;
      }
      g.strokePath();
      g.setDepth(15);
      this.tweens.add({
        targets: g,
        alpha: 0,
        duration: 300,
        onComplete: () => g.destroy(),
      });
    }

    fireExplosion(state) {
      // Explode at player position
      const cx = this.player.x + Phaser.Math.Between(-80, 80);
      const cy = this.player.y + Phaser.Math.Between(-80, 80);
      this.createExplosion(cx, cy, state);
    }

    createExplosion(cx, cy, state) {
      const radius = 100;
      // Visual
      const circle = this.add.circle(cx, cy, 10, COLORS.explosion, 0.8);
      circle.setDepth(12);
      this.tweens.add({
        targets: circle,
        scaleX: radius / 10,
        scaleY: radius / 10,
        alpha: 0,
        duration: 400,
        ease: "Power2",
        onComplete: () => circle.destroy(),
      });
      // Particles
      for (let i = 0; i < 12; i++)
        this.addParticle(cx, cy, COLORS.explosion, 8, 500);

      // Damage enemies in radius
      this.enemyGroup.getChildren().forEach((e) => {
        if (!e.active) return;
        const d = Phaser.Math.Distance.Between(cx, cy, e.x, e.y);
        if (d < radius) this.damageEnemy(e, 60 * state.stats.damage, state);
      });

      this.triggerShake(6);
    }

    updateOrbit(dt, state) {
      const orbs = this.weapons.orbit.orbs;
      const baseSpeed = 2.5 * state.stats.attackSpeed;
      this.weapons.orbit.angle += dt * baseSpeed;

      const r = 70;
      orbs.forEach((orb, i) => {
        const a = this.weapons.orbit.angle + (i / orbs.length) * Math.PI * 2;
        orb.sprite.setPosition(
          this.player.x + Math.cos(a) * r,
          this.player.y + Math.sin(a) * r
        );
        orb.sprite.setDepth(9);

        // Check collision with enemies
        this.enemyGroup.getChildren().forEach((e) => {
          if (!e.active) return;
          const d = Phaser.Math.Distance.Between(
            orb.sprite.x,
            orb.sprite.y,
            e.x,
            e.y
          );
          if (d < 20) {
            const dmg = 15 * state.stats.damage;
            this.damageEnemy(e, dmg, state);
          }
        });
      });
    }

    updateEnemies(dt, state) {
      const enemies = this.enemyGroup.getChildren();
      const px = this.player.x,
        py = this.player.y;

      enemies.forEach((e, idx) => {
        if (!e.active) return;

        // Chase player
        const angle = Math.atan2(py - e.y, px - e.x);
        const spd = e.speed;

        // Separation
        let sepX = 0,
          sepY = 0;
        enemies.forEach((other, i) => {
          if (i === idx || !other.active) return;
          const d = Phaser.Math.Distance.Between(e.x, e.y, other.x, other.y);
          if (d < 30 && d > 0) {
            sepX += (e.x - other.x) / d;
            sepY += (e.y - other.y) / d;
          }
        });

        const vx = Math.cos(angle) * spd + sepX * 20;
        const vy = Math.sin(angle) * spd + sepY * 20;
        e.body.setVelocity(vx, vy);

        // Ranged enemy shoots
        if (e.type === "ranged") {
          e.shootTimer = (e.shootTimer || 0) - dt * 1000;
          if (e.shootTimer <= 0) {
            e.shootTimer = 2500;
            this.spawnEnemyProjectile(e, state);
          }
        }

        // Flash recovery
        if (e.flashTimer > 0) {
          e.flashTimer -= dt * 1000;
          if (e.flashTimer <= 0) {
            e.setFillStyle(e.baseColor);
            e.flashTimer = 0;
          }
        }
      });
    }

    spawnEnemyProjectile(enemy, state) {
      const angle = Math.atan2(
        this.player.y - enemy.y,
        this.player.x - enemy.x
      );
      const proj = this.add.circle(enemy.x, enemy.y, 5, 0xffff44, 1);
      this.physics.add.existing(proj);
      proj.body.setCircle(5);
      proj.isEnemy = true;
      proj.damage = 12;
      const spd = 200;
      proj.body.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
      proj.setDepth(7);

      // Collide with player
      this.physics.add.overlap(proj, this.player, () => {
        if (this.invulnTimer > 0) return;
        this.hitPlayer(proj.damage, state);
        proj.destroy();
      });

      this.time.addEvent({
        delay: 3000,
        callback: () => {
          if (proj.active) proj.destroy();
        },
      });
    }

    spawnEnemies(state) {
      const count = Math.floor(2 + this.waveLevel * 0.5 + Math.random() * 2);
      const types = ["zombie", "fast", "zombie", "zombie"];
      if (state.time > 60) types.push("tank");
      if (state.time > 120) types.push("ranged");
      if (state.time > 180) types.push("elite");

      for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const def = ENEMY_TYPES[type];

        // Spawn outside viewport
        const angle = Math.random() * Math.PI * 2;
        const dist = 500 + Math.random() * 200;
        const x = this.player.x + Math.cos(angle) * dist;
        const y = this.player.y + Math.sin(angle) * dist;

        // HP scaling
        const hpScale = 1 + (state.time / 60) * 0.15;

        const e = this.add.circle(x, y, def.size, def.color, 1);
        this.physics.add.existing(e);
        e.body.setCircle(def.size, 0, 0);
        e.hp = def.hp * hpScale;
        e.maxHp = e.hp;
        e.speed = def.speed * (1 + this.waveLevel * 0.03);
        e.damage = def.damage;
        e.xpVal = def.xp;
        e.score = def.score;
        e.type = type;
        e.baseColor = def.color;
        e.flashTimer = 0;
        e.setDepth(6);

        // HP bar
        const hpBar = this.add.rectangle(
          x,
          y - def.size - 6,
          24,
          3,
          0x00ff44,
          1
        );
        hpBar.setDepth(7);
        e.hpBar = hpBar;

        this.enemyGroup.add(e);
      }
    }

    updateXpMagnet(state) {
      const radius = state.stats.pickupRadius;
      this.xpGroup.getChildren().forEach((xp) => {
        if (!xp.active) return;
        const d = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          xp.x,
          xp.y
        );
        if (d < radius) {
          const angle = Math.atan2(this.player.y - xp.y, this.player.x - xp.x);
          const spd = Math.min(300, 150 + (radius - d) * 2);
          xp.body.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
        }
        // Update position
        xp.hpBar && xp.hpBar.setPosition(xp.x, xp.y);
      });
    }

    onPlayerHitEnemy(player, enemy) {
      if (this.invulnTimer > 0) return;
      this.hitPlayer(enemy.damage, this.store.getState());
    }

    hitPlayer(dmg, state) {
      const armor = state.stats.armor;
      const actual = Math.max(1, dmg - armor);
      this.invulnTimer = 800;
      this.playerHp = Math.max(0, this.playerHp - actual);
      this.store.setState({ hp: this.playerHp });

      // Flash player
      this.tweens.add({
        targets: this.player,
        alpha: 0.3,
        duration: 100,
        yoyo: true,
        repeat: 2,
      });

      this.triggerShake(5);
      this.addParticle(this.player.x, this.player.y, 0xff0000, 8, 400);

      if (this.playerHp <= 0) this.gameOver();
    }

    onProjectileHitEnemy(projectile, enemy) {
      if (!projectile.active || !enemy.active) return;
      const state = this.store.getState();
      this.damageEnemy(enemy, projectile.damage, state);

      if (projectile.piercing) {
        projectile.hits--;
        if (projectile.hits <= 0) projectile.destroy();
      } else {
        projectile.destroy();
      }
    }

    damageEnemy(enemy, baseDmg, state) {
      if (!enemy.active) return;
      const isCrit = Math.random() < state.stats.critChance;
      const dmg = isCrit ? baseDmg * 2.5 : baseDmg;
      enemy.hp -= dmg;

      // Flash
      enemy.setFillStyle(0xffffff);
      enemy.flashTimer = 120;

      // Knockback
      const angle = Math.atan2(
        enemy.y - this.player.y,
        enemy.x - this.player.x
      );
      enemy.body.setVelocity(Math.cos(angle) * 120, Math.sin(angle) * 120);

      // HP bar update
      if (enemy.hpBar) {
        const ratio = Math.max(0, enemy.hp / enemy.maxHp);
        enemy.hpBar.setSize(24 * ratio, 3);
        enemy.hpBar.setPosition(
          enemy.x - 12 + (24 * ratio) / 2,
          enemy.y - enemy.displayHeight / 2 - 6
        );
      }

      // Damage text
      this.spawnDamageText(enemy.x, enemy.y, Math.round(dmg), isCrit);

      // Hit particle
      for (let i = 0; i < 3; i++)
        this.addParticle(
          enemy.x,
          enemy.y,
          isCrit ? 0xffd700 : 0xffffff,
          4,
          250
        );

      if (enemy.hp <= 0) this.killEnemy(enemy, state);
    }

    killEnemy(enemy, state) {
      const x = enemy.x,
        y = enemy.y;
      const xpVal = enemy.xpVal;
      const score = enemy.score;

      // Death particles
      for (let i = 0; i < 8; i++)
        this.addParticle(x, y, enemy.baseColor, 6, 600);
      enemy.hpBar && enemy.hpBar.destroy();
      enemy.destroy();

      // XP gem
      this.spawnXpGem(x, y, xpVal);

      // Update store
      const s = this.store.getState();
      const newKills = s.kills + 1;
      const newScore = s.score + score;
      this.store.setState({ kills: newKills, score: newScore });

      this.triggerShake(2);
      this.addXp(xpVal, state);
    }

    spawnXpGem(x, y, val) {
      const gem = this.add.circle(x, y, 6, COLORS.xp, 1);
      this.physics.add.existing(gem);
      gem.body.setCircle(6);
      gem.xpVal = val;
      gem.setDepth(5);
      // Bounce effect
      gem.body.setVelocity(
        Phaser.Math.Between(-60, 60),
        Phaser.Math.Between(-80, -20)
      );
      gem.body.setGravityY(120);
      this.xpGroup.add(gem);
    }

    onXpPickup(player, gem) {
      if (!gem.active) return;
      const val = gem.xpVal;
      gem.destroy();
      this.addParticle(gem.x, gem.y, COLORS.xp, 5, 300);
    }

    addXp(val, state) {
      const s = this.store.getState();
      let xp = s.xp + val;
      let xpToNext = s.xpToNext;
      let level = s.level;

      while (xp >= xpToNext) {
        xp -= xpToNext;
        level++;
        xpToNext = Math.floor(100 * Math.pow(1.25, level - 1));
        this.triggerLevelUp(level);
      }

      this.store.setState({ xp, xpToNext, level });
    }

    triggerLevelUp(level) {
      // Pick 3 upgrades
      const upgrades = this.pickUpgrades(3);
      this.store.setState({ phase: "levelup", pendingUpgrades: upgrades });
      // Resume after selection is handled by React
    }

    pickUpgrades(count) {
      // Weighted random
      const pool = [...UPGRADES_POOL];
      const result = [];
      const totalWeight = Object.values(RARITY_WEIGHT).reduce(
        (a, b) => a + b,
        0
      );

      for (let i = 0; i < count && pool.length > 0; i++) {
        let r = Math.random() * totalWeight;
        let picked = null;
        for (const upgrade of pool) {
          r -= RARITY_WEIGHT[upgrade.rarity];
          if (r <= 0) {
            picked = upgrade;
            break;
          }
        }
        if (!picked) picked = pool[0];
        result.push(picked);
        pool.splice(pool.indexOf(picked), 1);
      }
      return result;
    }

    applyUpgrade(upgrade) {
      const s = this.store.getState();
      const stats = { ...s.stats };

      if (upgrade.stat === "maxHp") {
        stats.maxHp += upgrade.value;
        this.playerMaxHp = stats.maxHp;
        this.playerHp = Math.min(this.playerHp + upgrade.value, stats.maxHp);
        this.store.setState({ stats, maxHp: stats.maxHp, hp: this.playerHp });
      } else if (
        upgrade.stat === "damage" ||
        upgrade.stat === "attackSpeed" ||
        upgrade.stat === "moveSpeed"
      ) {
        stats[upgrade.stat] = parseFloat(
          (stats[upgrade.stat] * (1 + upgrade.value)).toFixed(3)
        );
        this.store.setState({ stats });
      } else {
        stats[upgrade.stat] = parseFloat(
          (stats[upgrade.stat] + upgrade.value).toFixed(3)
        );
        this.store.setState({ stats });
      }

      this.store.setState({ phase: "playing" });
    }

    spawnDamageText(x, y, dmg, isCrit) {
      const txt = this.add.text(
        x + Phaser.Math.Between(-15, 15),
        y - 20,
        isCrit ? `⚡${dmg}!` : `${dmg}`,
        {
          fontSize: isCrit ? "18px" : "14px",
          fontFamily: "monospace",
          color: isCrit ? "#ffd700" : "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        }
      );
      txt.setDepth(20);
      this.damageTextGroup.add(txt);
    }

    addParticle(x, y, color, size, lifetime) {
      const p = this.add.circle(
        x + Phaser.Math.Between(-10, 10),
        y + Phaser.Math.Between(-10, 10),
        size,
        color,
        1
      );
      p.setDepth(11);
      const angle = Math.random() * Math.PI * 2;
      const spd = Phaser.Math.Between(40, 120);
      this.tweens.add({
        targets: p,
        x: p.x + Math.cos(angle) * spd,
        y: p.y + Math.sin(angle) * spd,
        alpha: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        duration: lifetime,
        ease: "Power2",
        onComplete: () => p.destroy(),
      });
    }

    triggerShake(intensity) {
      const s = this.store.getState();
      if (!s.settings.screenshake) return;
      this.cameras.main.shake(150, intensity * 0.001);
    }

    gameOver() {
      const s = this.store.getState();
      const hs = Math.max(s.score, s.highScore);
      localStorage.setItem("vs_highscore", hs);
      this.store.setState({ phase: "gameover", highScore: hs });

      // Destroy all orbs
      this.weapons.orbit.orbs.forEach((o) => o.sprite.destroy());
    }

    shutdown() {
      this.storeUnsub && this.storeUnsub();
    }
  }

  // ---- CONFIG ----
  const config = {
    type: Phaser.AUTO,
    width: GAME_W,
    height: GAME_H,
    parent: mountEl,
    backgroundColor: "#0a0a14",
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 0 }, debug: false },
    },
    scene: [BootScene, GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };

  return new Phaser.Game(config);
}

// ============================================================
// REACT COMPONENTS
// ============================================================

function MainMenu({ onPlay }) {
  const highScore = useStore((s) => s.highScore);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at center, #0f0f2e 0%, #050510 100%)",
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
        zIndex: 100,
      }}
    >
      {/* Stars */}
      <StarField />

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: 8,
            color: "#4488ff",
            textTransform: "uppercase",
            marginBottom: 12,
            opacity: 0.8,
          }}
        >
          ◆ SURVIVE THE NIGHT ◆
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            background:
              "linear-gradient(135deg, #00ffff 0%, #0088ff 50%, #aa00ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
            marginBottom: 8,
            filter: "drop-shadow(0 0 30px rgba(0,200,255,0.5))",
          }}
        >
          NEON
          <br />
          SURVIVORS
        </div>
        <div
          style={{
            color: "#4488ff",
            fontSize: 13,
            letterSpacing: 3,
            opacity: 0.7,
          }}
        >
          v1.0.0 — ARCADE EDITION
        </div>
      </div>

      {/* High score */}
      {highScore > 0 && (
        <div
          style={{
            color: "#ffaa00",
            fontSize: 14,
            letterSpacing: 2,
            marginBottom: 32,
            opacity: 0.9,
            border: "1px solid rgba(255,170,0,0.3)",
            padding: "8px 24px",
            borderRadius: 4,
          }}
        >
          ★ BEST: {highScore.toLocaleString()}
        </div>
      )}

      {/* Play button */}
      <button
        onClick={onPlay}
        style={{
          padding: "16px 64px",
          fontSize: 20,
          fontFamily: "inherit",
          fontWeight: "bold",
          letterSpacing: 4,
          color: "#00ffff",
          background: "transparent",
          border: `2px solid #00ffff`,
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: pulse
            ? "0 0 30px rgba(0,255,255,0.6), inset 0 0 20px rgba(0,255,255,0.1)"
            : "0 0 10px rgba(0,255,255,0.2)",
          transform: pulse ? "scale(1.03)" : "scale(1)",
          marginBottom: 20,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(0,255,255,0.1)";
          e.target.style.boxShadow =
            "0 0 40px rgba(0,255,255,0.8), inset 0 0 30px rgba(0,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.boxShadow = "0 0 10px rgba(0,255,255,0.2)";
        }}
      >
        ▶ PLAY
      </button>

      {/* Controls hint */}
      <div
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 12,
          letterSpacing: 2,
          textAlign: "center",
          lineHeight: 1.8,
          marginTop: 16,
        }}
      >
        WASD / ARROW KEYS TO MOVE
        <br />
        WEAPONS FIRE AUTOMATICALLY
        <br />
        ESC TO PAUSE
      </div>
    </div>
  );
}

function StarField() {
  const stars = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 3,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            opacity: s.opacity,
            animation: `twinkle 2s ${s.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`@keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.8; } }`}</style>
    </div>
  );
}

function HUD() {
  const hp = useStore((s) => s.hp);
  const maxHp = useStore((s) => s.maxHp);
  const xp = useStore((s) => s.xp);
  const xpToNext = useStore((s) => s.xpToNext);
  const level = useStore((s) => s.level);
  const kills = useStore((s) => s.kills);
  const time = useStore((s) => s.time);
  const score = useStore((s) => s.score);

  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  const hpPct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const xpPct = Math.max(0, Math.min(100, (xp / xpToNext) * 100));

  const hpColor = hpPct > 50 ? "#00ff88" : hpPct > 25 ? "#ffaa00" : "#ff4444";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "'Courier New', monospace",
        zIndex: 50,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        }}
      >
        {/* HP Bar */}
        <div style={{ flex: 1, maxWidth: 200 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <span style={{ color: "#ff6688", fontSize: 10, letterSpacing: 1 }}>
              ❤ HP
            </span>
            <span style={{ color: hpColor, fontSize: 10 }}>
              {Math.ceil(hp)}/{maxHp}
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${hpPct}%`,
                background: `linear-gradient(to right, ${hpColor}88, ${hpColor})`,
                borderRadius: 4,
                transition: "width 0.15s, background 0.5s",
                boxShadow: `0 0 8px ${hpColor}88`,
              }}
            />
          </div>
        </div>

        {/* Timer */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 2,
            minWidth: 60,
            textAlign: "center",
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
          }}
        >
          {mins}:{secs}
        </div>

        {/* Score */}
        <div style={{ textAlign: "right", minWidth: 80 }}>
          <div style={{ color: "#ffaa00", fontSize: 10, letterSpacing: 1 }}>
            SCORE
          </div>
          <div style={{ color: "#ffcc44", fontSize: 14, fontWeight: "bold" }}>
            {score.toLocaleString()}
          </div>
        </div>
      </div>

      {/* XP Bar — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 0 0 0",
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          paddingBottom: 8,
        }}
      >
        <div
          style={{
            height: 5,
            background: "rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${xpPct}%`,
              background: "linear-gradient(to right, #44ff88, #00ffcc)",
              transition: "width 0.3s",
              boxShadow: "0 0 10px rgba(68,255,136,0.8)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 16px 2px",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#44ff88", fontSize: 11, letterSpacing: 1 }}>
              LVL {level}
            </span>
            <span style={{ color: "rgba(68,255,136,0.5)", fontSize: 10 }}>
              {xp}/{xpToNext} XP
            </span>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            ☠ {kills.toLocaleString()} KILLS
          </span>
        </div>
      </div>

      {/* Level badge */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(68,255,136,0.3)",
            borderRadius: 3,
            padding: "2px 10px",
            color: "#44ff88",
            fontSize: 11,
            letterSpacing: 2,
          }}
        >
          ◆ LV.{level}
        </div>
      </div>
    </div>
  );
}

const RARITY_STYLES = {
  common: {
    border: "#6b7280",
    glow: "rgba(107,114,128,0.4)",
    label: "COMMON",
    bg: "rgba(107,114,128,0.08)",
  },
  rare: {
    border: "#3b82f6",
    glow: "rgba(59,130,246,0.5)",
    label: "RARE",
    bg: "rgba(59,130,246,0.1)",
  },
  epic: {
    border: "#a855f7",
    glow: "rgba(168,85,247,0.6)",
    label: "EPIC",
    bg: "rgba(168,85,247,0.12)",
  },
  legendary: {
    border: "#f59e0b",
    glow: "rgba(245,158,11,0.7)",
    label: "LEGENDARY",
    bg: "rgba(245,158,11,0.15)",
  },
};

function LevelUpScreen({ gameRef }) {
  const upgrades = useStore((s) => s.pendingUpgrades);
  const level = useStore((s) => s.level);
  const [selected, setSelected] = useState(null);

  const handleSelect = (upgrade) => {
    setSelected(upgrade.id);
    setTimeout(() => {
      gameRef.current?.scene?.getScene("Game")?.applyUpgrade(upgrade);
      setSelected(null);
    }, 200);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,8,0.88)",
        fontFamily: "'Courier New', monospace",
        zIndex: 80,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            fontSize: 11,
            color: "#44ff88",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 8,
            opacity: 0.8,
          }}
        >
          ◆ LEVEL UP ◆
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#ffffff",
            textShadow: "0 0 30px rgba(68,255,136,0.6)",
            marginBottom: 4,
          }}
        >
          LEVEL {level}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            letterSpacing: 2,
          }}
        >
          CHOOSE AN UPGRADE
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 16px",
          maxWidth: 780,
        }}
      >
        {upgrades.map((upg) => {
          const rs = RARITY_STYLES[upg.rarity];
          const isSelected = selected === upg.id;
          return (
            <button
              key={upg.id}
              onClick={() => handleSelect(upg)}
              style={{
                width: 200,
                minHeight: 220,
                background: isSelected ? rs.bg : `rgba(5,5,20,0.9)`,
                border: `2px solid ${rs.border}`,
                borderRadius: 8,
                cursor: "pointer",
                padding: "20px 16px",
                textAlign: "center",
                transition: "all 0.18s",
                boxShadow: isSelected
                  ? `0 0 30px ${rs.glow}, 0 0 60px ${rs.glow}`
                  : `0 0 12px ${rs.glow}`,
                transform: isSelected ? "scale(1.06)" : "scale(1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                fontFamily: "'Courier New', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.04) translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 40px ${rs.glow}, 0 0 20px ${rs.glow}`;
                e.currentTarget.style.background = rs.bg;
              }}
              onMouseLeave={(e) => {
                if (selected !== upg.id) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = `0 0 12px ${rs.glow}`;
                  e.currentTarget.style.background = "rgba(5,5,20,0.9)";
                }
              }}
            >
              {/* Rarity badge */}
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: rs.border,
                  border: `1px solid ${rs.border}`,
                  padding: "2px 8px",
                  borderRadius: 2,
                  opacity: 0.9,
                }}
              >
                {rs.label}
              </div>

              {/* Icon */}
              <div style={{ fontSize: 40, lineHeight: 1 }}>{upg.icon}</div>

              {/* Name */}
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {upg.name}
              </div>

              {/* Desc */}
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {upg.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PauseMenu({ onResume }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,10,0.85)",
        fontFamily: "'Courier New', monospace",
        zIndex: 70,
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 11,
            color: "#4488ff",
            letterSpacing: 6,
            marginBottom: 12,
          }}
        >
          ◆ PAUSED ◆
        </div>
        <div style={{ fontSize: 42, color: "#ffffff", fontWeight: "bold" }}>
          GAME PAUSED
        </div>
      </div>
      <MenuButton onClick={onResume} color="#00ffff">
        ▶ RESUME
      </MenuButton>
      <MenuButton
        onClick={() => gameStore.setState({ phase: "menu" })}
        color="#ff4466"
        style={{ marginTop: 12 }}
      >
        ✕ QUIT
      </MenuButton>
      <div
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 11,
          marginTop: 24,
          letterSpacing: 2,
        }}
      >
        ESC TO RESUME
      </div>
    </div>
  );
}

function GameOverScreen() {
  const score = useStore((s) => s.score);
  const highScore = useStore((s) => s.highScore);
  const kills = useStore((s) => s.kills);
  const level = useStore((s) => s.level);
  const time = useStore((s) => s.time);
  const isNew = score >= highScore && score > 0;

  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at center, #1a0010 0%, #050510 100%)",
        fontFamily: "'Courier New', monospace",
        zIndex: 100,
      }}
    >
      <StarField />

      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#ff2244",
            textShadow:
              "0 0 40px rgba(255,34,68,0.8), 0 0 80px rgba(255,34,68,0.4)",
            marginBottom: 8,
          }}
        >
          YOU DIED
        </div>

        {isNew && (
          <div
            style={{
              color: "#ffaa00",
              fontSize: 14,
              letterSpacing: 4,
              marginBottom: 24,
              animation: "pulse 1s infinite",
            }}
          >
            ★ NEW HIGH SCORE! ★
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            margin: "32px auto",
            maxWidth: 360,
          }}
        >
          {[
            { label: "SCORE", val: score.toLocaleString(), color: "#ffcc44" },
            { label: "KILLS", val: kills.toLocaleString(), color: "#ff6688" },
            { label: "LEVEL", val: level, color: "#44ff88" },
            { label: "TIME", val: `${mins}:${secs}`, color: "#4488ff" },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6,
                padding: "14px 20px",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 10,
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ color, fontSize: 22, fontWeight: "bold" }}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {highScore > 0 && (
          <div
            style={{
              color: "rgba(255,170,0,0.6)",
              fontSize: 12,
              marginBottom: 32,
            }}
          >
            ★ BEST: {highScore.toLocaleString()}
          </div>
        )}

        <MenuButton
          onClick={() => gameStore.setState({ phase: "menu" })}
          color="#00ffff"
        >
          ▶ PLAY AGAIN
        </MenuButton>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

function MenuButton({ onClick, color = "#00ffff", children, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "12px 48px",
        fontSize: 16,
        fontFamily: "'Courier New', monospace",
        fontWeight: "bold",
        letterSpacing: 3,
        color,
        background: hover ? `${color}18` : "transparent",
        border: `2px solid ${color}`,
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: hover ? `0 0 20px ${color}66` : "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function MobileJoystick() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 40,
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.15)",
        background: "rgba(0,0,0,0.2)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 55,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function TheGame() {
  const phase = useStore((s) => s.phase);
  const mountRef = useRef(null);
  const gameRef = useRef(null);
  const [phaserReady, setPhaserReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window);
  }, []);

  // Load Phaser
  useEffect(() => {
    if (typeof window.Phaser !== "undefined") {
      setPhaserReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js";
    script.onload = () => setPhaserReady(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const startGame = useCallback(() => {
    if (!phaserReady || !mountRef.current) return;
    if (phaserGame) {
      phaserGame.destroy(true);
      phaserGame = null;
    }
    gameRef.current = createPhaserGame(mountRef.current, () => {});
    phaserGame = gameRef.current;
  }, [phaserReady]);

  const handlePlay = () => {
    gameStore.setState({ phase: "playing" });
    startGame();
  };

  const handleResume = () => {
    gameStore.setState({ phase: "playing" });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaserGame) {
        phaserGame.destroy(true);
        phaserGame = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#050510",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Phaser canvas mount */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* React UI overlays */}
      {phase === "menu" && <MainMenu onPlay={handlePlay} />}
      {(phase === "playing" || phase === "levelup" || phase === "paused") && (
        <HUD />
      )}
      {phase === "levelup" && <LevelUpScreen gameRef={gameRef} />}
      {phase === "paused" && <PauseMenu onResume={handleResume} />}
      {phase === "gameover" && <GameOverScreen />}
      {isMobile && phase === "playing" && <MobileJoystick />}

      {/* Loading state */}
      {!phaserReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050510",
            color: "#00ffff",
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: 4,
            zIndex: 200,
          }}
        >
          LOADING ENGINE...
        </div>
      )}
    </div>
  );
}
