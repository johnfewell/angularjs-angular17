angular.module("todomvc").directive("angular17App", [
  function () {
    return {
      restrict: "E",
      scope: {
        state: "=",
        onNotify: "&",
      },
      link: function (scope, element) {
        scope.$watch("state", function (newVal, oldVal) {
          console.log("Old value:", oldVal);
          console.log("New value:", newVal);
          element[0].state = newVal;
        });

        element.on("notify", function (event) {
          const message = event.detail;
          scope.$apply(function () {
            scope.onNotify({ message: message });
          });
        });
      },
    };
  },
]);
