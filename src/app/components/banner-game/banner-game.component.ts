import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-banner-game',
  imports: [CommonModule],
  templateUrl: './banner-game.component.html',
  styleUrls: ['./banner-game.component.css']
})
export class BannerGameComponent {
  capsuleY = 50;
  gravity = 1;
  jumpStrength = 15;
  velocity = 0;
  gameOver = false;
  score = 0;
  obstacles: { x: number }[] = [];
  gameInterval: any;
  baseSpeed = 5;

  energy = 100;
  maxEnergy = 100;
  energyDrain = 10;
  energyRegen = 5;
  isRecharging = false;
  isOnGround = false;
  regenInterval: any; // 🔹 Guardamos el intervalo de regeneración

  jumpSound = new Audio('/assets/sounds/jump.mp3');
  gameOverSound = new Audio('/assets/sounds/gameover.mp3');

  constructor() {
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.gameOver = false;
    this.capsuleY = 50;
    this.velocity = 0;
    this.obstacles = [];
    this.energy = this.maxEnergy;
    this.isRecharging = false;
    this.isOnGround = false;

    if (this.regenInterval) clearInterval(this.regenInterval); // 🔹 Limpiar intervalo previo
    this.gameInterval = setInterval(() => this.updateGame(), 30);
    this.spawnObstacle();
  }

  updateGame() {
    if (this.gameOver) return;
  
    // Aplicar gravedad
    this.velocity -= this.gravity;
    this.capsuleY += this.velocity;
  
    // Limitar la posición de la cápsula en el techo
    if (this.capsuleY <= 0) {
      this.capsuleY = 0;
      this.velocity = 0;
      if (!this.isOnGround) { 
        this.isOnGround = true;
        this.startRecharge();
      }
    } else {
      this.isOnGround = false;
    }
  
    // Detectar si la cápsula ha tocado el suelo
    if (this.capsuleY >= 150) {
      this.capsuleY = 150;
      this.velocity = 0;
    }
  
    // Mover obstáculos y verificar colisiones
    let speedMultiplier = 1 + this.score * 0.02;
    let currentSpeed = this.baseSpeed * speedMultiplier;
  
    this.obstacles.forEach((obstacle, index) => {
      obstacle.x -= currentSpeed;
      if (obstacle.x < -20) {
        this.obstacles.splice(index, 1);
        this.score++;
      }
      if (this.checkCollision(obstacle.x)) {
        this.endGame();
      }
    });
  }

  startRecharge() {
    if (!this.isRecharging) {
      this.isRecharging = true;

      // 🔹 Asegurar que no haya múltiples intervalos
      if (this.regenInterval) clearInterval(this.regenInterval);

      this.regenInterval = setInterval(() => {
        if (!this.isOnGround || this.gameOver) { 
          clearInterval(this.regenInterval);
          this.isRecharging = false;
        } else if (this.energy < this.maxEnergy) {
          this.energy += this.energyRegen;
          if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
            clearInterval(this.regenInterval);
            this.isRecharging = false;
          }
        }
      }, 100);
    }
  }

  jump() {
    if (!this.gameOver && this.energy > 0) {
      this.jumpSound.play();
      this.velocity = this.jumpStrength;
      this.energy -= this.energyDrain;
      if (this.energy < 0) this.energy = 0;

      this.isRecharging = false;

      // 🔹 Interrumpimos la recarga si la cápsula salta
      if (this.regenInterval) {
        clearInterval(this.regenInterval);
        this.isRecharging = false;
      }
    } else if (this.gameOver) {
      this.startGame();
    }
  }

  spawnObstacle() {
    if (this.gameOver) return;

    const gameWidth = document.querySelector('.game-container')?.clientWidth || 600;
    this.obstacles.push({ x: gameWidth });

    let nextSpawnTime = 1000 + Math.random() * 1500;
    setTimeout(() => this.spawnObstacle(), nextSpawnTime);
  }

  checkCollision(obstacleX: number): boolean {
    return obstacleX < 50 && obstacleX > 20 && this.capsuleY < 20;
  }

  endGame() {
    this.gameOver = true;
    this.gameOverSound.play();
    clearInterval(this.gameInterval);

    if (this.regenInterval) clearInterval(this.regenInterval); // 🔹 Detener regeneración si el juego termina
  }

  @HostListener('window:keydown.space', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.jump();
  }
}