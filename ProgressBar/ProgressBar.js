import { 
    animClassName, 
    fullLength, 
    hideBlockClassName, 
    hideLineClassName, 
    progressLineClassName, 
    template 
} from "./tempelate.js";

/// атрибуты кастомного элемента
const valueAttr= 'value';
const animateAttr = 'animate';
const hideAttr = 'hide';
const attibutes = [valueAttr, animateAttr, hideAttr];

/// кастомный элемент
class ProgressBar extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({ mode:'open' });
        const layout = template.content.cloneNode(true);
        shadowRoot.append(layout)
    }

    /// отрисовка элемента при новом value
    renderValue(newValue){
        let value = +newValue || 0;
        const circleLine = this.shadowRoot.querySelector(`svg .${progressLineClassName}`);
        if(value <= 0){
            circleLine.classList.add(hideLineClassName);
            return;
        }
        if(value > 100){
            value = 100
        }
        circleLine.classList.remove(hideLineClassName);
        const offset = fullLength - (value / 100) * fullLength;
        circleLine.setAttribute("stroke-dashoffset", offset);
    }

    /// отрисовка элемента при новом animate
    renderAnimate(newValue){
        const circleLine = this.shadowRoot.querySelector(`svg .${progressLineClassName}`);
        if(newValue==="true"){
            circleLine.classList.add(animClassName)
        }else{
            circleLine.classList.remove(animClassName)
        }
    }

    /// отрисовка элемента при новом hide
    renderHide(newValue){
        const progressBlock = this.shadowRoot.querySelector(`svg`);
        if(newValue==="true"){
            progressBlock.classList.add(hideBlockClassName)
        }else{
            progressBlock.classList.remove(hideBlockClassName)
        }
    }

    /// объект соответствий атрибутов и функций, который должны выполнится при их изменении
    parity = {
        [valueAttr]: (value)=>{
            this.renderValue(value)
        },
        [animateAttr]: (value)=>{
            this.renderAnimate(value)
        },
        [hideAttr]: (value)=>{
            this.renderHide(value)
        },
    }

    /// отрисовка элемента при изменении какого-либо атрибута
    render(name, newValue){
        const renderFn = this.parity[name];
        if(!renderFn){
            return;
        }
        renderFn(newValue);
    }

    /// получение атрибутов, измененения которых надо отслеживать
    static get observedAttributes(){
        return attibutes;
    }

    /// реакция на изменение отслеживаемых атбитутов
    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue===newValue){
            return 
        }
        this.render(name, newValue);
    }
}

customElements.define('progress-bar', ProgressBar)

export { ProgressBar }