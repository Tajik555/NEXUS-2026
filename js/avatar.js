/**
 * NEXUS 2026 - AI Avatar Module
 * Canvas-based 3D avatar animation
 */

class AIAvatar {
    constructor(canvasId) {
        this.canvas = $(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.time = 0;
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.time += 0.05;

        // Draw avatar head
        this.drawHead();
        // Draw avatar eyes
        this.drawEyes();
        // Draw avatar mouth
        this.drawMouth();
        // Draw data points
        this.drawDataPoints();
    };

    drawHead() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        // Head circle
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        this.ctx.fill();

        // Head border
        this.ctx.strokeStyle = '#00d9ff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Head glow
        this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 55 + Math.sin(this.time) * 3, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawEyes() {
        const centerX = this.width / 2;
        const centerY = this.height / 2 - 15;

        // Left eye
        this.ctx.fillStyle = '#ff006e';
        const leftEyeX = centerX - 15;
        this.ctx.beginPath();
        this.ctx.arc(leftEyeX, centerY, 4 + Math.sin(this.time) * 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Right eye
        const rightEyeX = centerX + 15;
        this.ctx.beginPath();
        this.ctx.arc(rightEyeX, centerY, 4 + Math.sin(this.time) * 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Eye glow
        this.ctx.strokeStyle = 'rgba(255, 0, 110, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(leftEyeX, centerY, 6 + Math.sin(this.time) * 2, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(rightEyeX, centerY, 6 + Math.sin(this.time) * 2, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawMouth() {
        const centerX = this.width / 2;
        const centerY = this.height / 2 + 20;

        this.ctx.strokeStyle = '#b300ff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 10, 0, Math.PI);
        this.ctx.stroke();
    }

    drawDataPoints() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + this.time * 0.05;
            const x = centerX + Math.cos(angle) * 70;
            const y = centerY + Math.sin(angle) * 70;

            // Particle
            this.ctx.fillStyle = `rgba(0, 217, 255, ${0.3 + Math.sin(this.time + i) * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Line to center
            this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 + Math.sin(this.time + i) * 0.2})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
}

// Initialize avatar
let avatarInstance = null;
document.addEventListener('DOMContentLoaded', () => {
    avatarInstance = new AIAvatar($('#canvas-avatar'));
    log('AI Avatar initialized', 'success');
});