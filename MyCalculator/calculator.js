
const display = document.getElementById('display');
let curr_input = '0';
let prev_input = '';
let op = null;
let exp = '';

const btns = document.querySelectorAll('.btn');
btns.forEach(btn1 =>{
    btn1.addEventListener('click',()=>{
        const type = btn1.dataset.type;
        if(type === 'clear'){
            clear();
        }
        else if(type === 'delete'){
            deleteNum();
        }
        else if(type === 'operator'){
            operator(btn1.dataset.value);
        }
        else if(type === 'number'){
            number(btn1.dataset.value);
        }
        else if(type === 'equals'){
            res();
        }
        else if(type === 'decimal'){
            decimal();
        }
    });
});

const number = (num) =>{
    if(curr_input === '0'){
        curr_input = num;
    }
    else{
        curr_input += num;
    }
    if (prev_input !== '' && op !== null) {
        exp = `${prev_input} ${op} ${curr_input}`;
    } else {
        exp = curr_input; 
    }
    update(exp);
}

const operator = (action) =>{
    if(curr_input === '')
        return;
    if(prev_input === ''){
        prev_input = curr_input;
        curr_input = '';
    }
    op = action;
    exp = `${prev_input} ${op}`;
    update(exp);
}

const update = (val) =>{
    display.textContent = val;
}
const clear = () =>{
    curr_input = '0';
    prev_input = '';
    op = null;
    exp = '';
    update(curr_input);
}

const deleteNum = () =>{
    curr_input = curr_input.slice(0, -1);
    if(curr_input === ''){
        curr_input = '0';
    }
    update(curr_input);
}

const res = () =>{
    if(prev_input === '' || curr_input === ''){
        return;
    }
    let res;
    if (op === '+') {
        res = parseFloat(prev_input) + parseFloat(curr_input);
      } else if (op === '-') {
        res = parseFloat(prev_input) - parseFloat(curr_input);
      } else if (op === '*') {
        res = parseFloat(prev_input) * parseFloat(curr_input);
      } else if (op === '/') {
        if (parseFloat(curr_input) === 0) {
          res = 'Error'; 
        } else {
          res = parseFloat(prev_input) / parseFloat(curr_input);
        }
      }

      curr_input = res.toString();
      prev_input = '';
      op = null;
      update(curr_input);
}

const decimal = () =>{
    if(!curr_input.includes('.')){
        curr_input += '.';
        update(curr_input);
    }
}