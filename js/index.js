// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;




// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);



/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    // console.log(i)
    var newFruit = document.createElement("li");
    newFruit.className = "fruit__item";

    switch (fruits[i].color) {
      case 'фиолетовый':
        newFruit.className = newFruit.className + ' fruit_violet';
        break
      case 'зеленый':
        newFruit.className = newFruit.className + ' fruit_green';
        break
      case 'розово-красный':
        newFruit.className = newFruit.className + ' fruit_carmazin';
        break
      case 'желтый':
        newFruit.className = newFruit.className + ' fruit_yellow';
        break
      case 'светло-коричневый':
        newFruit.className = newFruit.className + ' fruit_lightbrown';
        break      
    }

    fruitsList.insertBefore(newFruit, null);

    let newFruitInfo = document.createElement("div");
    newFruitInfo.className = "fruit__info";
    newFruit.insertBefore(newFruitInfo, null);

    let frInd = document.createElement("div");
    frInd.innerHTML = 'index: ' + String(i);

    let frKind = document.createElement("div");
    frKind.innerHTML = 'kind: ' + fruits[i].kind;

    let frColor = document.createElement("div");
    frColor.innerHTML = 'color: ' + fruits[i].color;

    let frWeight = document.createElement("div");
    frWeight.innerHTML = 'weight (кг): ' + fruits[i].weight;

    newFruitInfo.insertBefore(frInd, null);
    newFruitInfo.insertBefore(frKind, null);
    newFruitInfo.insertBefore(frColor, null);
    newFruitInfo.insertBefore(frWeight, null);


  }
};

// первая отрисовка карточек
// display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function deepEqual(obj1, obj2) {
  // return JSON.parse(JSON.stringify(obj1))===JSON.parse(JSON.stringify(obj2));
  return JSON.stringify(obj1) == JSON.stringify(obj2);
};

// перемешивание массива
const shuffleFruits = () => {

  let result = [];
  let index = getRandomInt(0, fruits.length);
  let iniFruits = Object.assign([], fruits);



  // // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    index = getRandomInt(0, fruits.length - 1);
    result.push(fruits[index]);
    fruits.splice(index, 1);
  }
  // // // //   // TODO: допишите функцию перемешивания массива

  // // //   // Подсказка: находим случайный элемент из fruits, используя getRandomInt
  // // //   // вырезаем его из fruits и вставляем в result.
  // // //   // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
  // // //   // (массив fruits будет уменьшатся, а result заполняться)
  // // }

  fruits = result;

  if (deepEqual(fruits, iniFruits)) {
    alert('Перемешивание не сработало =(');
  }
  // console.log(fruits)

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {

  fruits = JSON.parse(fruitsJSON);

  let minWeight = parseInt(document.getElementsByClassName('minweight__input')[0].value)
  let maxWeight = parseInt(document.getElementsByClassName('maxweight__input')[0].value)



  let result = fruits.filter((item) => {
    let curWeight = item.weight;
    return curWeight >= minWeight && curWeight <= maxWeight
    // TODO: допишите функцию
  });

  fruits = result;

  console.log('filterFruits');

};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

// let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortKind = 'quickSort';
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return a.color.localeCompare(b.color);

};

const sortAPI = {
  bubbleSort(arr, comparation) {

    // console.log('bubbleSort')
    // TODO: допишите функцию сортировки пузырьком

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < (arr.length - i - 1); j++) {
        if (comparationColor(arr[j], arr[j + 1]) != 1) {

          // console.log(i + ' ' + j);

          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }

    fruits = arr;
  },



  quickSort(arr, comparation) {

    function runQuickSort(arr) {
      if (arr.length < 2) return arr;
      let min = 1;
      let max = arr.length - 1;
      let rand = Math.floor(min + Math.random() * (max + 1 - min));
      let pivot = arr[rand];
      const left = [];
      const right = [];
      arr.splice(arr.indexOf(pivot), 1);
      arr = [pivot].concat(arr);
      for (let i = 1; i < arr.length; i++) {
        if (comparationColor( pivot, arr[i]) != 1) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return runQuickSort(left).concat(pivot, runQuickSort(right));
    }

    fruits = runQuickSort(arr);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {

    // console.log(fruits);

    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.innerHTML = sortTime;
    sortKindLabel.innerHTML = sortKind;
    // console.log(sortTime);
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
    console.log('Change from bubbleSort to quickSort');
  } else {
    sortKind = 'bubbleSort';
    console.log('Change from quickSort to bubbleSort')
  }

  sortKindLabel.innerHTML = sortKind;
  // console.log('sortChangeButton')
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'



  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let curKind = kindInput.value;
  let curColor = colorInput.value;
  let curWeigth = weightInput.value;

  if(curKind=='' || curColor=='' ||  curWeigth==''){
    alert('Fill all data');
  }else{    let newFruit = {kind: curKind, color: curColor, weight: curWeigth};
    newFruit.className = "fruit__item";
    fruits[fruits.length] = newFruit;
  
    // console.log(fruits);
  
  
  
    display();
    // console.log('addActionButton')
  }
});