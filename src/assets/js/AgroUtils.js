export default {
  math: {
    round(value, precision = 2){
      return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    },
  },

  serialize(obj) {
    var query = [];
    for (var property in obj)
      if (obj.hasOwnProperty(property)) {
        if(obj[property] != null){
          query.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        }
      }
    return query.join("&");
  },

  image: {
    makeUrl (fileName, size) {
      if (fileName == null) {
        if ([
          '500x500',
          '250x250',
          '125x125'
        ].indexOf(size)) {
          return '/statics/images/no-image-1-1.svg'
        } else {
          return '/statics/images/no-image-16-10.svg'
        }
      }
      return process.env.API_URL + '/images/' + size + '/' + fileName
    }

  },

  compare( x, y ) {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for ( var p in x ) {
      if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

      if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

      if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

      if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

      if ( ! this.compare( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
      if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
    }
    return true;
  }
}
