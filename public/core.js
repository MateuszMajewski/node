var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {
    // text : String = "",
    // done : Boolean = false,
  };

  $scope.cos = "Ala ma kota";
  $scope.filterToDo = false;
  $scope.filterDone = false;



  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function (data) {
      console.log("Dziala")
      $scope.todos = data;
      $scope.filteredTodos = $scope.todos
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    console.log($scope.formData);
    $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        $scope.formData.text = "";
        $scope.formData.done = false;
        $scope.todos = data;
        $scope.applyFilter($scope.filter, $scope.showAll)
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function (id,form) {
    console.log(form);
    $http.put("/api/todos/" + id, form)
    .success(function (data) {
      $scope.applyFilter($scope.filter, $scope.showAll)
    })
    .error(function (data) {
      console.log("Error: " + data);
    })
  };

  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
        $scope.applyFilter($scope.filter, $scope.showAll)
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.applyFilter = function (filterToDO, filterDone) {
    $scope.filterToDO = filterToDO;
    $scope.filterDone = filterDone;
    if (!filterToDO && !filterDone)
      $scope.filteredTodos = $scope.todos;
    else 
      $scope.filteredTodos = $scope.todos.filter(item => item.done == filterToDO);
    }
}
