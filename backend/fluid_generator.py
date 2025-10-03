import torch
import numpy as np
from PIL import Image
import io
import base64
import math
from typing import Tuple

class FluidDynamicsGenerator:
    """
    Advanced fluid dynamics gradient generator using PyTorch tensors
    for real-time AI/scientific aesthetic backgrounds
    """
    
    def __init__(self, width: int = 1920, height: int = 1080):
        self.width = width
        self.height = height
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # Create normalized coordinate grids
        self.x = torch.linspace(-2, 2, width, device=self.device).unsqueeze(0).repeat(height, 1)
        self.y = torch.linspace(-1.5, 1.5, height, device=self.device).unsqueeze(1).repeat(1, width)
        
        # Distance from center for radial effects
        self.r = torch.sqrt(self.x**2 + self.y**2)
        
        # Define color palette for cloud/AI theme
        self.base_colors = {
            'cyan': torch.tensor([0, 255, 209], dtype=torch.float32, device=self.device) / 255.0,
            'blue': torch.tensor([0, 85, 255], dtype=torch.float32, device=self.device) / 255.0,
            'teal': torch.tensor([0, 255, 170], dtype=torch.float32, device=self.device) / 255.0,
            'dark_blue': torch.tensor([0, 100, 150], dtype=torch.float32, device=self.device) / 255.0,
            'black': torch.tensor([0, 0, 0], dtype=torch.float32, device=self.device)
        }
    
    def generate_velocity_field(self, t: float) -> Tuple[torch.Tensor, torch.Tensor]:
        """Generate fluid velocity field using tensor operations"""
        # Create complex flow patterns
        vx = torch.sin(2 * self.x + 0.5 * t) * torch.cos(1.5 * self.y - 0.3 * t)
        vy = torch.cos(1.8 * self.x - 0.4 * t) * torch.sin(2.2 * self.y + 0.6 * t)
        
        # Add spiral components
        theta = torch.atan2(self.y, self.x)
        spiral_strength = 0.3 * torch.exp(-self.r * 0.5)
        vx += spiral_strength * torch.cos(theta + t * 0.5)
        vy += spiral_strength * torch.sin(theta + t * 0.5)
        
        return vx, vy
    
    def generate_density_field(self, t: float) -> torch.Tensor:
        """Generate density field for color mixing"""
        # Multi-scale Perlin-like noise
        density = torch.zeros_like(self.x, device=self.device)
        
        # Large scale patterns
        density += 0.4 * torch.sin(1.2 * self.x + 0.8 * t) * torch.cos(0.9 * self.y - 0.6 * t)
        
        # Medium scale turbulence
        density += 0.3 * torch.sin(3.1 * self.x - 1.2 * t) * torch.cos(2.8 * self.y + 0.9 * t)
        
        # Fine scale details
        density += 0.2 * torch.sin(6.2 * self.x + 1.5 * t) * torch.cos(5.5 * self.y - 1.1 * t)
        
        # Radial gradient overlay
        radial_factor = torch.exp(-self.r * 0.8)
        density = density * radial_factor + 0.1 * radial_factor
        
        return density
    
    def apply_fluid_advection(self, field: torch.Tensor, vx: torch.Tensor, vy: torch.Tensor, dt: float = 0.01) -> torch.Tensor:
        """Apply fluid advection using tensor operations"""
        # Simple Eulerian advection
        # This is a simplified version - full fluid simulation would use more sophisticated methods
        
        # Create shifted coordinates
        x_shifted = torch.clamp(self.x - vx * dt, -2, 2)
        y_shifted = torch.clamp(self.y - vy * dt, -1.5, 1.5)
        
        # Simple interpolation (bilinear would be more accurate)
        return field + 0.1 * (torch.sin(x_shifted * 3) * torch.cos(y_shifted * 2))
    
    def generate_fluid_frame(self, t: float, color_scheme: str = 'ai_theme') -> Image.Image:
        """Generate a single fluid dynamics frame"""
        
        # Generate velocity field
        vx, vy = self.generate_velocity_field(t)
        
        # Generate density field
        density = self.generate_density_field(t)
        
        # Apply fluid advection
        density = self.apply_fluid_advection(density, vx, vy)
        
        # Create color channels based on AI/Cloud theme
        if color_scheme == 'ai_theme':
            # Cyan-green primary channel
            r_channel = 0.1 + 0.3 * torch.sigmoid(density + torch.sin(self.x * 2 + t * 0.7))
            g_channel = 0.4 + 0.4 * torch.sigmoid(density * 1.5 + torch.cos(self.y * 1.8 - t * 0.5))
            b_channel = 0.3 + 0.5 * torch.sigmoid(density * 0.8 + torch.sin(self.r + t * 0.3))
            
            # Add cyan-green accent
            cyan_mask = torch.sigmoid(density * 2 - 0.5)
            r_channel = r_channel * (1 - cyan_mask * 0.8)
            g_channel = torch.clamp(g_channel + cyan_mask * 0.4, 0, 1)
            b_channel = torch.clamp(b_channel + cyan_mask * 0.6, 0, 1)
        
        # Combine channels
        rgb = torch.stack([r_channel, g_channel, b_channel], dim=2)
        
        # Convert to image
        rgb_np = (torch.clamp(rgb, 0, 1) * 255).byte().cpu().numpy()
        
        return Image.fromarray(rgb_np)
    
    def generate_frame_base64(self, t: float, format: str = 'PNG') -> str:
        """Generate frame and return as base64 string for web use"""
        img = self.generate_fluid_frame(t)
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format=format, quality=85 if format == 'JPEG' else None)
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return f"data:image/{format.lower()};base64,{img_str}"
    
    def generate_animation_frames(self, num_frames: int = 60, duration: float = 4.0) -> list:
        """Generate multiple frames for smooth animation"""
        frames = []
        dt = duration / num_frames
        
        for i in range(num_frames):
            t = i * dt
            frame = self.generate_fluid_frame(t)
            frames.append(frame)
        
        return frames
    
    def save_animated_gif(self, filename: str, num_frames: int = 60, duration: float = 4.0, frame_duration: int = 67):
        """Save as animated GIF for web use"""
        frames = self.generate_animation_frames(num_frames, duration)
        
        frames[0].save(
            filename,
            save_all=True,
            append_images=frames[1:],
            duration=frame_duration,
            loop=0,
            optimize=True
        )

# Test the generator
if __name__ == "__main__":
    generator = FluidDynamicsGenerator(800, 600)
    
    # Generate a test frame
    test_frame = generator.generate_fluid_frame(0.0)
    test_frame.save("/app/backend/static/test_fluid.png")
    
    print("✅ Fluid dynamics generator created successfully!")