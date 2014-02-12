var ControllerDamage = function(){
  
  var _apply = function(instance, damage_value) {    
    instance.receiveDamage(damage_value)
  }
  
  return {
    apply:_apply
  }
  
}();