var app = angular.module("studentApp", []);

app.controller("studentCtrl", function($scope, $http) {

    $scope.students = [];
    $scope.student = {};

    // 📄 Load Students
    $scope.loadStudents = function() {
        $http.get('/students').then(res => {
            $scope.students = res.data;
        });
    };

    // ➕ Add Student
    $scope.addStudent = function() {
        $http.post('/students', $scope.student).then(() => {
            $scope.student = {};
            $scope.loadStudents();
        });
    };

    // ❌ Delete
    $scope.deleteStudent = function(index) {
        $http.delete('/students/' + index).then(() => {
            $scope.loadStudents();
        });
    };

    // Initial Load
    $scope.loadStudents();
});