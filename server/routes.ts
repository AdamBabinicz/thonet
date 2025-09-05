
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enhanced image placeholder endpoint with Thonet-themed comic-style illustrations
  app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    const { theme = 'chair' } = req.query;
    
    let svg = '';
    
    switch (theme) {
      case 'chair':
        svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#DEB887;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
              </linearGradient>
              <pattern id="woodPattern" patternUnits="userSpaceOnUse" width="4" height="20">
                <rect width="4" height="20" fill="#D2B48C"/>
                <line x1="0" y1="0" x2="0" y2="20" stroke="#8B4513" stroke-width="0.5"/>
              </pattern>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="#F5F5DC"/>
            
            <!-- Comic book style border -->
            <rect x="5" y="5" width="${parseInt(width)-10}" height="${parseInt(height)-10}" 
                  fill="none" stroke="#2C3E50" stroke-width="4" stroke-dasharray="8,4"/>
            
            <!-- Chair seat (curved) -->
            <ellipse cx="${parseInt(width)/2}" cy="${parseInt(height)*0.45}" rx="60" ry="25" 
                     fill="url(#woodGradient)" stroke="#654321" stroke-width="3"/>
            
            <!-- Chair back (curved bentwood style) -->
            <path d="M ${parseInt(width)/2-50} ${parseInt(height)*0.25} 
                     Q ${parseInt(width)/2} ${parseInt(height)*0.15} 
                     ${parseInt(width)/2+50} ${parseInt(height)*0.25}
                     Q ${parseInt(width)/2+45} ${parseInt(height)*0.4}
                     ${parseInt(width)/2+40} ${parseInt(height)*0.45}
                     L ${parseInt(width)/2-40} ${parseInt(height)*0.45}
                     Q ${parseInt(width)/2-45} ${parseInt(height)*0.4}
                     ${parseInt(width)/2-50} ${parseInt(height)*0.25}" 
                  fill="url(#woodPattern)" stroke="#654321" stroke-width="3"/>
            
            <!-- Front legs -->
            <rect x="${parseInt(width)/2-45}" y="${parseInt(height)*0.5}" width="8" height="80" 
                  fill="url(#woodGradient)" stroke="#654321" stroke-width="2" rx="4"/>
            <rect x="${parseInt(width)/2+37}" y="${parseInt(height)*0.5}" width="8" height="80" 
                  fill="url(#woodGradient)" stroke="#654321" stroke-width="2" rx="4"/>
            
            <!-- Back legs -->
            <rect x="${parseInt(width)/2-35}" y="${parseInt(height)*0.3}" width="8" height="100" 
                  fill="url(#woodGradient)" stroke="#654321" stroke-width="2" rx="4"/>
            <rect x="${parseInt(width)/2+27}" y="${parseInt(height)*0.3}" width="8" height="100" 
                  fill="url(#woodGradient)" stroke="#654321" stroke-width="2" rx="4"/>
            
            <!-- Comic style "POW" effect -->
            <circle cx="${parseInt(width)*0.85}" cy="${parseInt(height)*0.2}" r="25" 
                    fill="#FFD700" stroke="#FF6B35" stroke-width="3"/>
            <text x="${parseInt(width)*0.85}" y="${parseInt(height)*0.25}" text-anchor="middle" 
                  font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#FF6B35">
              Nr.14
            </text>
            
            <!-- Title -->
            <text x="50%" y="90%" text-anchor="middle" 
                  font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#2C3E50">
              KRZESŁO THONET
            </text>
          </svg>
        `;
        break;
        
      case 'workshop':
        svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="steamGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style="stop-color:#E0E0E0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#F0F8FF;stop-opacity:0.3" />
              </linearGradient>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="#F4E4BC"/>
            
            <!-- Comic border -->
            <rect x="5" y="5" width="${parseInt(width)-10}" height="${parseInt(height)-10}" 
                  fill="none" stroke="#8B4513" stroke-width="4" stroke-dasharray="10,5"/>
            
            <!-- Workshop table -->
            <rect x="20" y="${parseInt(height)*0.6}" width="${parseInt(width)-40}" height="15" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <rect x="25" y="${parseInt(height)*0.75}" width="8" height="40" 
                  fill="#8B4513" stroke="#654321" stroke-width="1"/>
            <rect x="${parseInt(width)-33}" y="${parseInt(height)*0.75}" width="8" height="40" 
                  fill="#8B4513" stroke="#654321" stroke-width="1"/>
            
            <!-- Steam bending apparatus -->
            <rect x="${parseInt(width)*0.3}" y="${parseInt(height)*0.3}" width="40" height="60" 
                  fill="#708090" stroke="#2F4F4F" stroke-width="3" rx="5"/>
            
            <!-- Steam effects -->
            <ellipse cx="${parseInt(width)*0.32}" cy="${parseInt(height)*0.25}" rx="8" ry="15" 
                     fill="url(#steamGradient)"/>
            <ellipse cx="${parseInt(width)*0.38}" cy="${parseInt(height)*0.2}" rx="6" ry="12" 
                     fill="url(#steamGradient)"/>
            <ellipse cx="${parseInt(width)*0.44}" cy="${parseInt(height)*0.15}" rx="4" ry="8" 
                     fill="url(#steamGradient)"/>
            
            <!-- Wood piece being bent -->
            <path d="M ${parseInt(width)*0.5} ${parseInt(height)*0.45} 
                     Q ${parseInt(width)*0.65} ${parseInt(height)*0.35} 
                     ${parseInt(width)*0.75} ${parseInt(height)*0.55}" 
                  fill="none" stroke="#DEB887" stroke-width="6" stroke-linecap="round"/>
            
            <!-- Tools -->
            <rect x="${parseInt(width)*0.15}" y="${parseInt(height)*0.5}" width="25" height="4" 
                  fill="#C0C0C0" stroke="#808080" stroke-width="1"/>
            <rect x="${parseInt(width)*0.12}" y="${parseInt(height)*0.52}" width="8" height="8" 
                  fill="#8B4513" stroke="#654321" stroke-width="1"/>
            
            <!-- Comic bubble -->
            <ellipse cx="${parseInt(width)*0.8}" cy="${parseInt(height)*0.3}" rx="35" ry="25" 
                     fill="#FFFACD" stroke="#DAA520" stroke-width="3"/>
            <text x="${parseInt(width)*0.8}" y="${parseInt(height)*0.32}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#8B4513">
              PARA!
            </text>
            
            <!-- Title -->
            <text x="50%" y="95%" text-anchor="middle" 
                  font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#8B4513">
              WARSZTAT THONET
            </text>
          </svg>
        `;
        break;
        
      case 'portrait':
        svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="faceGradient" cx="50%" cy="40%" r="50%">
                <stop offset="0%" style="stop-color:#FDBCB4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E8A788;stop-opacity:1" />
              </radialGradient>
            </defs>
            
            <!-- Background with period pattern -->
            <rect width="100%" height="100%" fill="#F5E6D3"/>
            
            <!-- Ornate frame -->
            <rect x="10" y="10" width="${parseInt(width)-20}" height="${parseInt(height)-20}" 
                  fill="none" stroke="#DAA520" stroke-width="6"/>
            <rect x="15" y="15" width="${parseInt(width)-30}" height="${parseInt(height)-30}" 
                  fill="none" stroke="#B8860B" stroke-width="2"/>
            
            <!-- Head shape -->
            <ellipse cx="${parseInt(width)/2}" cy="${parseInt(height)*0.4}" rx="45" ry="55" 
                     fill="url(#faceGradient)" stroke="#D2B48C" stroke-width="2"/>
            
            <!-- Hair -->
            <path d="M ${parseInt(width)/2-45} ${parseInt(height)*0.3} 
                     Q ${parseInt(width)/2} ${parseInt(height)*0.2} 
                     ${parseInt(width)/2+45} ${parseInt(height)*0.3}
                     Q ${parseInt(width)/2+40} ${parseInt(height)*0.4}
                     ${parseInt(width)/2+35} ${parseInt(height)*0.5}
                     L ${parseInt(width)/2-35} ${parseInt(height)*0.5}
                     Q ${parseInt(width)/2-40} ${parseInt(height)*0.4}
                     ${parseInt(width)/2-45} ${parseInt(height)*0.3}" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            
            <!-- Eyes -->
            <ellipse cx="${parseInt(width)/2-15}" cy="${parseInt(height)*0.38}" rx="4" ry="6" fill="#000"/>
            <ellipse cx="${parseInt(width)/2+15}" cy="${parseInt(height)*0.38}" rx="4" ry="6" fill="#000"/>
            
            <!-- Nose -->
            <path d="M ${parseInt(width)/2} ${parseInt(height)*0.42} 
                     L ${parseInt(width)/2-3} ${parseInt(height)*0.46} 
                     L ${parseInt(width)/2+3} ${parseInt(height)*0.46} Z" 
                  fill="#D2B48C" stroke="#C4A484" stroke-width="1"/>
            
            <!-- Mouth -->
            <path d="M ${parseInt(width)/2-8} ${parseInt(height)*0.5} 
                     Q ${parseInt(width)/2} ${parseInt(height)*0.52} 
                     ${parseInt(width)/2+8} ${parseInt(height)*0.5}" 
                  fill="none" stroke="#8B4513" stroke-width="2" stroke-linecap="round"/>
            
            <!-- Period clothing -->
            <rect x="${parseInt(width)/2-35}" y="${parseInt(height)*0.65}" width="70" height="60" 
                  fill="#2F4F4F" stroke="#1C1C1C" stroke-width="2"/>
            <rect x="${parseInt(width)/2-30}" y="${parseInt(height)*0.7}" width="60" height="8" 
                  fill="#FFFACD" stroke="#DAA520" stroke-width="1"/>
            
            <!-- Comic style name banner -->
            <rect x="${parseInt(width)*0.1}" y="${parseInt(height)*0.85}" width="${parseInt(width)*0.8}" height="25" 
                  fill="#FFD700" stroke="#DAA520" stroke-width="3" rx="5"/>
            <text x="50%" y="${parseInt(height)*0.89}" text-anchor="middle" 
                  font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#8B4513">
              MICHAEL THONET
            </text>
            <text x="50%" y="${parseInt(height)*0.94}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="10" fill="#654321">
              1796-1871
            </text>
          </svg>
        `;
        break;
        
      case 'process':
        svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#FF4500;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF6347;stop-opacity:1" />
              </linearGradient>
            </defs>
            
            <!-- Background -->
            <rect width="100%" height="100%" fill="#FFF8DC"/>
            
            <!-- Comic border -->
            <rect x="8" y="8" width="${parseInt(width)-16}" height="${parseInt(height)-16}" 
                  fill="none" stroke="#CD853F" stroke-width="5" stroke-dasharray="12,6"/>
            
            <!-- Step 1: Raw wood -->
            <rect x="20" y="${parseInt(height)*0.2}" width="40" height="8" 
                  fill="#DEB887" stroke="#8B4513" stroke-width="2" rx="4"/>
            <text x="40" y="${parseInt(height)*0.35}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="8" fill="#8B4513">DREWNO</text>
            
            <!-- Arrow 1 -->
            <path d="M 65 ${parseInt(height)*0.24} L 85 ${parseInt(height)*0.24}" 
                  stroke="#2F4F4F" stroke-width="3" marker-end="url(#arrowhead)"/>
            
            <!-- Step 2: Steam chamber -->
            <rect x="90" y="${parseInt(height)*0.15}" width="25" height="20" 
                  fill="#708090" stroke="#2F4F4F" stroke-width="2" rx="3"/>
            
            <!-- Steam -->
            <circle cx="95" cy="${parseInt(height)*0.1}" r="3" fill="#E0E0E0" opacity="0.7"/>
            <circle cx="105" cy="${parseInt(height)*0.08}" r="2" fill="#E0E0E0" opacity="0.5"/>
            <circle cx="110" cy="${parseInt(height)*0.05}" r="1.5" fill="#E0E0E0" opacity="0.3"/>
            
            <text x="102" y="${parseInt(height)*0.4}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="8" fill="#2F4F4F">PARA</text>
            
            <!-- Arrow 2 -->
            <path d="M 120 ${parseInt(height)*0.24} L 140 ${parseInt(height)*0.24}" 
                  stroke="#2F4F4F" stroke-width="3"/>
            
            <!-- Step 3: Bending process -->
            <circle cx="155" cy="${parseInt(height)*0.24}" r="15" 
                    fill="none" stroke="#B8860B" stroke-width="4"/>
            <path d="M 145 ${parseInt(height)*0.24} 
                     Q 155 ${parseInt(height)*0.14} 
                     165 ${parseInt(height)*0.24}" 
                  fill="none" stroke="#DEB887" stroke-width="6" stroke-linecap="round"/>
            
            <text x="155" y="${parseInt(height)*0.4}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="8" fill="#8B4513">GIĘCIE</text>
            
            <!-- Arrow 3 -->
            <path d="M 175 ${parseInt(height)*0.24} L 195 ${parseInt(height)*0.24}" 
                  stroke="#2F4F4F" stroke-width="3"/>
            
            <!-- Step 4: Final curved piece -->
            <path d="M 200 ${parseInt(height)*0.3} 
                     Q 215 ${parseInt(height)*0.15} 
                     230 ${parseInt(height)*0.3}" 
                  fill="none" stroke="#CD853F" stroke-width="8" stroke-linecap="round"/>
            
            <text x="215" y="${parseInt(height)*0.4}" text-anchor="middle" 
                  font-family="Arial, sans-serif" font-size="8" fill="#8B4513">GOTOWE</text>
            
            <!-- Heat waves -->
            <path d="M 95 ${parseInt(height)*0.5} Q 100 ${parseInt(height)*0.45} 105 ${parseInt(height)*0.5}" 
                  fill="none" stroke="url(#heatGradient)" stroke-width="2"/>
            <path d="M 100 ${parseInt(height)*0.55} Q 105 ${parseInt(height)*0.5} 110 ${parseInt(height)*0.55}" 
                  fill="none" stroke="url(#heatGradient)" stroke-width="2"/>
            
            <!-- Title -->
            <text x="50%" y="85%" text-anchor="middle" 
                  font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#8B4513">
              PROCES GIĘCIA DREWNA
            </text>
            
            <!-- Add arrowhead marker -->
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#2F4F4F"/>
              </marker>
            </defs>
          </svg>
        `;
        break;
        
      default:
        // Default fallback
        svg = `
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="comic" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="#f0f8ff"/>
                <circle cx="10" cy="10" r="2" fill="#4169e1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#comic)"/>
            <rect x="10" y="10" width="${parseInt(width)-20}" height="${parseInt(height)-20}" 
                  fill="none" stroke="#2c3e50" stroke-width="3" stroke-dasharray="10,5"/>
            <text x="50%" y="50%" text-anchor="middle" dy="0.3em" 
                  font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#2c3e50">
              THONET ${width}x${height}
            </text>
            <text x="50%" y="60%" text-anchor="middle" dy="0.3em" 
                  font-family="Arial, sans-serif" font-size="12" fill="#7f8c8d">
              Comic Style Placeholder
            </text>
          </svg>
        `;
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}
