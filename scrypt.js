

let view = {
  showArray:  (text) => {
    const array = JSON.parse(localStorage.getItem("array"));

    if (array) {
    array.map((el, indexEl) => 
      {
        let container = document.getElementById('container');
        let div = document.createElement('div')
        div.id =  `div${indexEl}`;
        let item = document.createElement('div')
        let flag = false;
        div.className =  'itemList';
        item.id =  `${indexEl}`;
        div.onclick = () => model.checkItem(item.id)
        let data = document.createElement('p')
        data.id =  `text${indexEl}`;
        let index = document.createElement('span')
        let imageDelete = document.createElement('img')
        imageDelete.id = `visibleImageDelete${indexEl}`
        imageDelete.className = 'visibleImageDelete';
        let imageEdit = document.createElement('img')
        imageEdit.id = `visibleImageEdit${indexEl}`;
        imageEdit.className = 'visibleImageEdit';
        let imageOk = document.createElement('img')
        imageOk.id = `visibleImageOk${indexEl}`;
        imageOk.className = 'invisible';
        let imageCancel = document.createElement('img')
        imageCancel.id = `visibleImageCancel${indexEl}`;
        imageCancel.className = 'invisible';
        const id = el.id;
        imageDelete.onclick = () => model.deleteItem(item.id);
        imageDelete.src = './img/delete.png'
        imageEdit.onclick = () => model.editItem(data.id, div.id, imageEdit.id, imageDelete.id, imageOk.id, imageCancel.id  );
        imageEdit.src = './img/edit.png'
        imageCancel.onclick = () => model.cancel({text: indexEl, id: item.id }, div.id, imageEdit.id, imageDelete.id, imageOk.id, imageCancel.id );
        imageCancel.src = './img/cancel.png'
        imageOk.onclick = () => model.save({text: indexEl, id: item.id }, div.id, imageEdit.id, imageDelete.id , imageOk.id, imageCancel.id );
        imageOk.src = './img/ok.png'
        data.innerHTML = el.text;
        index.innerHTML = indexEl;
        container.appendChild(div);
        div.appendChild(index);
        div.appendChild(data);
        item.appendChild(div);
        item.appendChild(imageOk);
        item.appendChild(imageCancel);
        item.appendChild(imageDelete);
        item.appendChild(imageEdit);
        container.appendChild(item);
      }
    )
    }
   
  },

  showText:  (text) => {
    const array = JSON.parse(localStorage.getItem("array"));

    if (array) {
    
        let container = document.getElementById('container');
        let div = document.createElement('div')
        div.id =  `div${array.length - 1}`;
        let item = document.createElement('div')
        let flag = false;
        div.className = 'itemList';
        item.className = 'itemList';
        item.id =  `${array.length - 1}`;
        div.onclick = () => model.checkItem(item.id)
        let data = document.createElement('p')
        data.id =  `text${array.length - 1}`;
        let index = document.createElement('span')
        let imageDelete = document.createElement('img')
        imageDelete.id = `visibleImageDelete${array.length - 1}`;
        imageDelete.className = 'visibleImageDelete';
        let imageEdit = document.createElement('img')
        imageEdit.id = `visibleImageEdit${array.length - 1}` ;;
        imageEdit.className = 'visibleImageEdit' ;
        let imageOk = document.createElement('img')
        imageOk.id = `visibleImageOk${array.length - 1}`;
        imageOk.className = 'invisible';
        let imageCancel = document.createElement('img')
        imageCancel.id = `visibleImageCancel${array.length - 1}`;
        imageCancel.className = 'invisible';
        imageDelete.onclick = () => model.deleteItem(item.id);
        imageDelete.src = './img/delete.png'
        imageEdit.onclick = () => model.editItem(data.id, div.id, imageEdit.id, imageDelete.id, imageOk.id, imageCancel.id );
        imageEdit.src = './img/edit.png'
        imageCancel.onclick = () => model.cancel({text: array[array.length - 1].text, id: item.id }, div.id, imageEdit.id, imageDelete.id, imageOk.id, imageCancel.id );
        imageCancel.src = './img/cancel.png'
        imageOk.onclick = () => model.save({text: array[array.length - 1].text, id: item.id }, div.id, imageEdit.id, imageDelete.id , imageOk.id, imageCancel.id );
        imageOk.src = './img/ok.png'
        data.innerHTML = array[array.length - 1].text;
        index.innerHTML = array.length - 1;
        container.appendChild(div);
        div.appendChild(index);
        div.appendChild(data);
        item.appendChild(div);
        item.appendChild(imageDelete);
        item.appendChild(imageEdit);
        item.appendChild(imageOk);
        item.appendChild(imageCancel);
        container.appendChild(item);
     
    }
   
  }
  
};

let model = {
  textChange: '',

  changeText: (text) => {
    let array = JSON.parse(localStorage.getItem("array"));
    if (array) {
      if (array.length < 10 || array === undefined) {
        
          let item = document.getElementById('text')
          array.push({id: array.length ,text, flag: false})
          localStorage.setItem("array", JSON.stringify(array));
          view.showText(text)
          item.value = ''
       
      } else {
        alert('Максимум созданных задач не более 10')
      }
    } else {
        let item = document.getElementById('text') ;
        localStorage.setItem('array', JSON.stringify([{id: 0,text, flag: false}])) ;
        view.showText(text) ;
        item.value = '' ;
    }

  },

  checkItem: (index) => {
    let array = JSON.parse(localStorage.getItem("array"));
    array[index].flag = !array[index].flag ;
    localStorage.setItem('array', JSON.stringify(array));
    let item = document.getElementById(`${index}`); 
    let itemClass = item.className; 
    item.className = `${itemClass === 'itemList' ? 'itemList onClick' : 'itemList'}`;
  },

  deleteItem: (id) => {
    let item = document.getElementById(`${id}`); 
    let array = JSON.parse(localStorage.getItem("array"));
    const index = array.findIndex(el => el.id === Number(id));
    array.splice(index,1);
    localStorage.setItem("array", JSON.stringify(array));
    item.remove();
    
  },

  editItem: (text, block, imageEdit, imageDelete, imageOk, imageCancel ) => {
    let item = document.getElementById(`${text}`); 
    let div = document.getElementById(`${block}`); 
    let edit = document.getElementById(`${imageEdit}`);
    let deleteItem = document.getElementById(`${imageDelete}`);
    let Ok = document.getElementById(`${imageOk}`);
    let Cancel = document.getElementById(`${imageCancel}`);
    let input = document.createElement('input');
    input.id = 'input';
    input.value = item.textContent;
    edit.className = 'invisible';
    deleteItem.className = 'invisible';
    Ok.className = 'visible';
    Cancel.className = 'visible';
    item.remove();
    div.appendChild(input);
    
  },

  cancel: (text, block, imageEdit, imageDelete, imageOk, imageCancel ) => {
    console.log('text',text)
    let item = document.createElement('p') 
    item.id =  `text${text.id}`;
    item.innerHTML = text.text;
    let div = document.getElementById(`${block}`); 
    let edit = document.getElementById(`${imageEdit}`);
    let deleteItem = document.getElementById(`${imageDelete}`);
    let Ok = document.getElementById(`${imageOk}`);
    let Cancel = document.getElementById(`${imageCancel}`);
    let input = document.getElementById('input');
    edit.className = 'visible';
    deleteItem.className = 'visible';
    Ok.className = 'invisible';
    Cancel.className = 'invisible';
    input.remove();
    div.appendChild(item);
    
  },

  save: (text, block, imageEdit, imageDelete, imageOk, imageCancel ) => {
    let array = JSON.parse(localStorage.getItem("array"));
    let item = document.createElement('p') ;
    item.id =  `text${text.id}`;
    let div = document.getElementById(`${block}`); 
    let edit = document.getElementById(`${imageEdit}`);
    let deleteItem = document.getElementById(`${imageDelete}`);
    let Ok = document.getElementById(`${imageOk}`);
    let Cancel = document.getElementById(`${imageCancel}`);
    let input = document.getElementById('input');
    const index = array.findIndex(el => el.id === Number(text.id));
    array[index].text = input.value;
    localStorage.setItem("array", JSON.stringify(array));
    item.innerHTML = input.value;
    edit.className = 'visible';
    deleteItem.className = 'visible';
    Ok.className = 'invisible';
    Cancel.className = 'invisible';
    input.remove();
    div.appendChild(item);
  },

  checkingCheck: () => {
    let array = JSON.parse(localStorage.getItem("array"));
    if (array) {
      array.map((el, index) => {
        const item = document.getElementById(`${index}`); 
        item.className = `${el.flag ? 'itemList onClick' : 'itemList'}`;
      })
    }
  },

  testCreateItem: () => {
    model.changeText('test')
  }
  
};

let controller = {

    handleChangeText: (text) => {
      if (text) {
      model.changeText(text);
      } else {
        alert('Необходимо ввести текст');
      }
    }
};

(function() {

    var app = {

      init: () => { 
        app.main();
        app.eventData();
      },

      main: () => { 
        view.showArray();
        model.checkingCheck();
        model.testCreateItem();
      },

      eventData: () => { 
        let text = document.getElementById('text');
        text.onchange = (e) => controller.handleChangeText(e.target.value);
        
      }
    };
    app.init();

  }());