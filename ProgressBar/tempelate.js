const fullLineClassName = "fullLine"
const progressLineClassName = "progressLine";
const blockClassName = 'progress';
const animClassName = 'progressLine-rotate';
const hideLineClassName = 'progressLine-hide';
const hideBlockClassName = 'progress-hide';

///геометрические характеристики окружностей
const strokeWidth = 8;
const radius = 50;
const diametr = radius * 2;
const fullLength = 2 * Math.PI * (radius - strokeWidth);
const x = radius;
const y = radius;

/// создание и заполнение шаблона
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host{
            --progressLine-color: #005bff;
            --fullLine-color: rgba(0, 48, 120, .039);
            width: 100px;
            height: 100px;
            display: block;
        }
        .${blockClassName}{
            width: 100%;
            height: 100%;
        }
        .${hideBlockClassName}{
            display:none;
        }
        .${fullLineClassName}, .${progressLineClassName}{
            fill: transparent;
        }
        .${fullLineClassName}{
            stroke: var(--fullLine-color);
        }
        .${progressLineClassName}{
            transform-origin: center;
            transform: rotate(-90deg);
            stroke: var(--progressLine-color);
        }
        
        .${hideLineClassName}{
            opacity: 0;
        }
        .${animClassName}{
          animation-name: rotation;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes rotation {
          0%{
            transform: rotate(-90deg);
          }
          100%{
            transform: rotate(270deg);
          }

        }
    </style>
    <svg class='${blockClassName}' viewBox="0 0 ${diametr} ${diametr}">
            <circle 
                cx="${x}"
                cy="${y}"
                r="${radius - strokeWidth}" 
                stroke-width="${strokeWidth}" 
                class="${fullLineClassName}"
            >
            </circle>
            <circle
                cx="${x}"
                cy="${y}"
                r="${radius - strokeWidth}" 
                stroke-width="${strokeWidth}"
                class="${progressLineClassName} ${hideLineClassName}"
                stroke-dasharray = "${fullLength}"
                stroke-dashoffset = "${fullLength}"
            >
            </circle>
    </svg>
`;

export { 
    template, 
    progressLineClassName, 
    animClassName, 
    hideLineClassName, 
    fullLength, 
    hideBlockClassName 
}