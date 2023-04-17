Array.prototype.random = function () {
  Random = (str) => str[Math.floor(Math.random() * str.length)];
  return Random(this);
};
