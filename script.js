'use strict';
{ // Асинхронный перебор
const eacher = function(arr, callback) {
  let count = 0;
  const timer = setInterval(function() {
    callback(arr[count++]);
    if (count >= arr.length) {
      clearInterval(timer);
    }
  }, 0);
},
arr = [1, 2, 3, 4, 5, 6, 7, 8];

eacher(arr, function(item){
  console.log(item);
});
}
{ // Код трансляция №3
// Получение данных от сервера через XMLHttpRequest
const getData = (callback) => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', () => {
    console.log(request.readyState, request);
    if (request.readyState === 4 && (request.status === 200 || request.status === 201)) {
      callback(JSON.parse(request.response));
    }
  });

  request.open('GET', './dbHeroes.json');
  request.send();
  
};

{ // Вариант 1.
const dataShow = (data) => {
  console.log(data);
};

getData(dataShow);
}

{ // Вариант 2 - Проекция 1.
const projection = (fields, obj) => Object.keys(obj)
.filter(item => fields.includes(item))
.reduce((newObj, key) => {
  newObj[key] = obj[key];
  return newObj;
}, {});

getData((data) => {
  const newHero = data.map(item => projection(['name', 'photo', 'citizenship'], item));

  console.log('newHero: ', newHero);
});
}

{ // Вариант 3 - Проекция 2.
const projection = (meta) => {
  const keys = Object.keys(meta);

  return (obj) => {
    const newObj = {};

    keys.forEach(key => {
      const 
        def = meta[key],
        [field, fn] = def,
        val = obj[field];

      newObj[key] = fn ? fn(val) : val;
    });
    return newObj;
  };
};

const metaData = {
  hero: ['name'],
  nationality: ['citizenship', city => (city ? city.toUpperCase() : 'not data')],
  name: ['realName']
};

getData((data) => {
  const projectionMeta = projection(metaData);

  const newHero = data.map(projectionMeta);

  console.log('newHero: ', newHero);
});
}

{ // Вариант 4 - Проекция 3.
const projection = (meta) => {
  const keys = Object.keys(meta);

  return obj => keys.reduce((newObj, key) => {
    newObj[key] = meta[key].reduce((val, fn, index) => (index ? fn(val) : obj[fn]), null);
    return newObj;
  }, {});
};

const metaData = {
  hero: ['name'],
  nationality: ['citizenship', city => (city ? city.toUpperCase() : 'not data'), city => city.toLowerCase()],
  name: ['realName', name => (name ? name.toUpperCase() : 'not data')]
};

getData((data) => {
  const projectionMeta = projection(metaData);

  const newHero = data.map(projectionMeta);

  console.log('newHero: ', newHero);
});
}
}