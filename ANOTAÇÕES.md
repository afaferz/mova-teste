# CAPTURAR BANDEIRAS DE REGIOES
```https://restcountries.eu/rest/v2/regionalbloc/{region}```
Se vier em ARRAY utilizar um map para capturar todas as bandeiras para jogar na 'prop'

const flags = region.map(pais => {
  return pais.flag;
});

Se vier em OBJETO utilizar um OBJECT.key para capturar todas as bandeiras para jogar na 'prop'

const flags = Object.key(region).map(pais =>{
  return pais.flag;
});


