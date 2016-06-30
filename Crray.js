
class Crray extends Array {

  constructor(input, rebuild){
    
    if(rebuild){
      super(...input.vals)
      console.log(input.vals)
      this.catalog = this
      this.history = input.history || [];
      this.index = input.index || [];
    } else {
      input ? super(input): super();
      this.catalog = this
      this.index = {};
      this.history = [];      
    }

  }
  
  // shortcut for Array.isArray
  isArray(input){
    return Array.isArray(input)
  }
  
  
  // Returns all the indexes for a matching key in the catalog
  locate(key,list, tmp){
        list = list || [], tmp = tmp || [];
    var index = this.index, keys = Object.keys(index);
        keys.map(function(token){if(token === key){tmp.push(index[token])}})
        tmp.map(function(ref){ list.push(ref) });
    return list;
  }

  // import values into our Catalog
  load(input){
    var clog = this;
    if(this.isArray(input)){ 
      input.map(function(el){ clog.push(el);})
    } else {
      this.push(input)
    }
  }
  
  
  // get a value by a key
  get(key){
    if(Number.isInteger(key)) return this.catalog[key];
   
    var clog = this;
    if(this.index[key].length > 1){ 
      return this.index[key].map(function(idx){
        return clog[idx]
      })
    } else {
      return this.catalog[this.index[key]];
    }
  }
  
  // Checks a value exists by key or index
  exists(key){
    if(Number.isInteger(key)){
      if(this.catalog[key]) return true;
    } else {
      return this.index[key]? true: false;
    }
  }
  
  toString(){
    return JSON.stringify({
      vals: this.catalog,
      history: this.history,
      index: this.index
    })
        
  }
  
  static parse(str){
     var tmp = JSON.parse(str);
     if(tmp.vals && tmp.history && tmp.index){
       return new Crray(tmp, true);
     }
  }
  
  // Emulate native pop functionality + some enhancments applied to Catalog's pop
  pop(tmp){
    tmp = this.history.pop();
    if(tmp[0] !== null){
      return delete this.index[tmp[0]], Array.prototype.pop.call(this.catalog)      
    } else {
      return this.history.pop(), Array.prototype.pop.call(this.catalog)      
    }
  }
  
  // Emulate native shift functionality + some enhancments applied to Catalog's shift
  shift(tmp){
    tmp = this.history.shift();
    if(tmp[0] !== null){
      return delete this.index[tmp[0]], Array.prototype.shift.call(this.catalog)      
    } else {
      return this.history.shift(), Array.prototype.shift.call(this.catalog)      
    }
  }
  
  push(key, input){
    if(arguments.length === 2){
      if(this.index[key] === undefined ){
        Array.prototype.push.call(this.catalog, input)
        this.history.push([key, this.length -1])
        this.index[key] = [this.catalog.length -1]
      } else {
        Array.prototype.push.call(this.catalog, input)
        this.history.push([key, this.length -1])
        this.index[key].push(this.length -1)
      }
    } else {
      Array.prototype.push.call(this.catalog, key)
      this.history.push([null, this.length -1])
    }
  }
  
  /*
  
    All of these standard methods should run on the 
    this.catalog array
  
  fill(){ }
  reverse(){ }
  sort(){ }
  splice(){ }
  unshift(){ }
  concat(){}
  includes(){}
  join(){ }
  slice(){}
  toSource(){}
  toString(){ }
  toLocaleString(){ }
  indexOf(){ }
  lastIndexOf(){ }
  forEach(){ }
  entries(){ }
  every(){ }
  some(){ }
  filter(){ }
  find(){ }
  findIndex(){ }
  keys(){ }
  map(){ }
  reduce(){ }
  reduceRight(){ }
  values(){}
  
  */

}


/*

  Examples and Tests

*/
var c = Crray.parse('{"vals":[["Rex Kelly","Kara Kelly","Jackie Kelly","Daniel Kelly"]],"history":[["siblings",0],["siblings",1],["parents",2],["parents",3]],"index":{"siblings":[0,1],"parents":[2,3]}}')