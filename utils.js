/// создание тега с заданными классами
export function createTagWithClassNames(tag, ...classNames){
  const element = document.createElement(tag);
  classNames.forEach(className => {
    element.classList.add(className);
  })
  return element;
}

/// первичная инициализация связки label-input
function initInputLabel(id, type, labelText, inputClasses, labelClasses){
  const input = createTagWithClassNames('input', inputClasses);
  const label = createTagWithClassNames('label', labelClasses);
  const span = document.createElement('span');
    
  const textNode = document.createTextNode("");
  textNode["nodeValue"]=labelText;
  span.append(textNode);

  input.setAttribute('type', type);
  input.setAttribute('id', id);
  label.setAttribute('for', id);
  return [label, input, span]
}

/// создание инпута для ввода чисел
export function createNumberInput(id, labelText){
  const [label, input, span] = initInputLabel(id, 'text', labelText, 'valueInput', 'labelInput');
  input.setAttribute('inputmode', 'numeric')
  label.append(input, span);
  return [input, label];
}

/// создание переключателя
export function createSwitch(id, labelText){
    const [label, input, span] = initInputLabel(id, 'checkbox', labelText, 'switchInput', 'labelInput');
    const slider = createTagWithClassNames('span', ['slider']);
    label.append(input, slider, span);
    return [input, label];
}

/// подсчет вхождений определенного символа в строку
export function symCount(str, searchSym){
  let count = 0;
  for(const sym of str){
    if(sym===searchSym){
      count++;
    }
  }
  return count;
}