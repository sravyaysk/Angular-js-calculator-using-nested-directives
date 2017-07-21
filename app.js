var buttons=[
  [{
    name:'7',
    id:1,
    value:'7'
  },
  {
    name:'8',
    id:2,
    value:'8'
  },
  {
    name:'9',
    id:3,
    value:'9'
  },
  {
    name:'X',
    id:4,
    value:'*'
  }],
  [{
    name:'4',
    id:5,
    value:'4'
  },
  {
    name:'5',
    id:6,
    value:'5'
  },
  {
    name:'6',
    id:7,
    value:'6'
  },
  {
    name:'-',
    id:8,
    value:'-'
  }],
  [{
    name:'1',
    id:9,
    value:'1'
  },
  {
    name:'2',
    id:10,
    value:'2'
  },
  {
    name:'3',
    id:11,
    value:'3'
  },
  {
    name:'+',
    id:12,
    value:'+'
  }],
  [{
    name:'/',
    id:13,
    value:'/'
  },
  {
    name:'0',
    id:14,
    value:'0'
  },
  {
    name:'C',
    id:15,
    value:'C'
  },
  {
    name:'=',
    id:16,
    value:'='
  }]
];
var app=angular.module('app', []);
  app.controller('actionController',function(){
    var present='0';
    var memory='0';
    var operation=0;
    var x=angular.element(document.getElementById("textfield"));
    function PerformCalculation()
  {
    if(operation == 1)
      present = eval(memory) + eval(present);
    else if(operation == 2)
      present = eval(memory) - eval(present);
    else if(operation == 3)
      present = eval(memory) * eval(present);
    else if(operation == 4)
      present = eval(memory) / eval(present);
    else
      alert("Invalid operation");
    memory='0';
    operation=0;
    present=present+'';
    x.val(present);
  }
  function PushOperand(value)
  {
    if(present == '0')
      present=value;
    else
      present=present+value;
    x.val(present);
  }
  function PushOperator(value)
  {
    x.val(value);
    if(operation!=0)
      PerformCalculation();
    if(value == '+')
      operation=1;
    else if(value=='-')
      operation=2;
    else if(value=='*')
      operation=3;
    else if(value=='/')
      operation=4;
    else
      alert("invalid operation");
    memory=present;
    present='';
  }
  function AllClear()
  {
    present='0';
    memory='0';
    operation=0;
    x.val(present);
  }
    this.button=buttons;
    this.calculator=function(value){
    //  alert(value);
    if(value == '=')
    {
      PerformCalculation();
    }
    else if(value == 'C')
    {
        AllClear();
    }
    else if(value == '+' || value == '-' || value =='*' || value == '/'){
      PushOperator(value);
    }
    else{
      //alert("in push operand");
      PushOperand(value);
    }
  }
  });
  app.directive('displayArea', function()
  {
    return{
      restrict:'E',
      require : '^calcView',
      transclude: true,
      template : '<input type="text" id="textfield" ng-model="textbox">',
      link:function(scope,elem,attr,outercontrol){
          outercontrol.displayResult(0);
      }
    }
  });
  app.directive('buttonsGrid',function(){
    return{
      restrict:'E',
      require:'^calcView',
      transclude:true,
      templateUrl:'buttons.html'
    }
  });
  app.directive('calcView', function()
  {
    //alert("hi");
    return{
          transclude:true,
          restrict:'E',
          template:'<div><h1>My calculator</h1><div ng-transclude></div></div>',
          controller:function($scope){
            this.displayResult=function(value){
              $scope.textbox=value;
            }
    }
  }
  });
