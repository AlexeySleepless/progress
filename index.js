import './ProgressBar/ProgressBar.js';
import { createSwitch, createTagWithClassNames, createNumberInput, symCount } from './utils.js';

const content = document.querySelector('.content');
const progressBar = createTagWithClassNames('progress-bar','progressBar');
content.append(progressBar);

const inputWrap = document.querySelector('.inputsWrap');

const valueElems = createNumberInput('value', 'Value');
const [input, valueRoot] = valueElems;

const animateElems = createSwitch('anim', 'Animate');
const [animateCheckBox, animRoot] = animateElems;

const hideElems = createSwitch('hide', 'Hide');
const [hideCheckBox, hideRoot] = hideElems;

const elems = [valueRoot, animRoot, hideRoot];
elems.forEach(elem => {
    inputWrap.append(elem)
});


///инициализация слушателей событий
input.addEventListener('change', e => {
    const percents = +e.target.value;
    progressBar.setAttribute('value', percents);
});

input.addEventListener('input', e => {
    const value = e.target.value;
    if(!value.length){
        return;
    }
    if(value.at(-1) === '.' && symCount(value, '.') <= 1){
        return;
    }
    const num = +value||0;
    let result = num;
    if(num < 0){
        result = 0;
    }
    if(num > 100){
        result = 100;
    }
    input.value = result;
});

animateCheckBox.addEventListener('change', e => {
    const checked = e.target.checked;
    progressBar.setAttribute('animate', checked);
});

hideCheckBox.addEventListener('change', e => {
    const checked = e.target.checked;
    progressBar.setAttribute('hide', checked);
});
