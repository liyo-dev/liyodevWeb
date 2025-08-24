import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-swipe-indicator',
  standalone: true,
  imports: [],
  template: `
    <div class="swipe-hand-indicator" #handIndicator>
      <span class="hand-icon">👉</span>
    </div>
  `,
  styles: [`
    @media (max-width: 768px) {
      .swipe-hand-indicator {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 15;
        pointer-events: none;
        display: block;
        opacity: 0;
      }
      
      .swipe-hand-indicator.show {
        animation: handSlideIn 1s ease-out 1s forwards, handSlideOut 1s ease-out 5s forwards;
      }
      
      .hand-icon {
        font-size: 2rem;
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
        animation: handPulse 2s ease-in-out infinite;
      }
      
      @keyframes handSlideIn {
        from {
          opacity: 0;
          transform: translateY(-50%) translateX(30px);
        }
        to {
          opacity: 0.6;
          transform: translateY(-50%) translateX(0);
        }
      }
      
      @keyframes handSlideOut {
        from {
          opacity: 0.6;
          transform: translateY(-50%) translateX(0);
        }
        to {
          opacity: 0;
          transform: translateY(-50%) translateX(-30px);
        }
      }
      
      @keyframes handPulse {
        0%, 100% {
          transform: scale(1) translateX(0);
        }
        25% {
          transform: scale(1.1) translateX(5px);
        }
        50% {
          transform: scale(1) translateX(10px);
        }
        75% {
          transform: scale(1.1) translateX(5px);
        }
      }
    }

    @media (min-width: 769px) {
      .swipe-hand-indicator {
        display: none;
      }
    }
  `]
})
export class SwipeIndicatorComponent implements OnInit, OnDestroy {
  private observer?: MutationObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Solo en móvil
    if (window.innerWidth <= 768) {
      this.setupPanelObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupPanelObserver() {
    // Buscar el panel padre que contiene este componente
    let parentPanel = this.elementRef.nativeElement.closest('.content-panel');
    
    if (parentPanel) {
      // Crear observer para detectar cuando el panel se activa
      this.observer = new MutationObserver(() => {
        const isActive = parentPanel.classList.contains('active');
        const handElement = this.elementRef.nativeElement.querySelector('.swipe-hand-indicator');
        
        if (isActive && handElement) {
          // Resetear animación y mostrar
          handElement.classList.remove('show');
          void handElement.offsetWidth; // Forzar reflow
          handElement.classList.add('show');
        }
      });

      // Observar cambios en las clases del panel padre
      this.observer.observe(parentPanel, {
        attributes: true,
        attributeFilter: ['class']
      });

      // Verificar estado inicial
      if (parentPanel.classList.contains('active')) {
        setTimeout(() => {
          const handElement = this.elementRef.nativeElement.querySelector('.swipe-hand-indicator');
          if (handElement) {
            handElement.classList.add('show');
          }
        }, 100);
      }
    }
  }
}
