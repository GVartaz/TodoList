'use strict';

var demoApp = angular.module('demoApp', []);

demoApp.controller('InscriptionController',function ($scope, $http){

    $scope.formLogin = {};

    $scope.createUser = function(){
        var login = document.getElementById("login");
        var pwd = document.getElementById("password");
        if(login.value == ""){
            login.style.borderColor = "#FF0000";
        }
        if(pwd.value == ""){
            pwd.style.borderColor = "#FF0000";
        }
        if(login.value != "" && pwd.value != "" ){
            login.style.borderColor = null;
            pwd.style.borderColor = null;
            $http.post('/addUser',$scope.formLogin).then(function(resp){
                if(resp.data == false){
                    login.style.borderColor = "#FF0000";
                    alert("Identifiant déjà utilisé. Veuillez en choisir un autre");
                    login.value = "";
                    pwd.value = "";
                } else {
                    $scope.formLogin = {};
                    window.location.href = "./index.html";
                    alert("Inscription réussie");
                }
            });
        }
    };
});

demoApp.controller('LoginController',function ($scope, $http){

    $scope.formLogin = {};

    $scope.connexion = function(){
        var login = document.getElementById("login");
        var pwd = document.getElementById("password");
        if(login.value == ""){
            login.style.borderColor = "#FF0000";
        }
        if(pwd.value == ""){
            pwd.style.borderColor = "#FF0000";
        }
        if(login.value != "" && pwd.value != "" ){
            login.style.borderColor = null;
            pwd.style.borderColor = null;
            $http.post('/connexion',$scope.formLogin).then(function(resp){
                if(resp.data == false){
                    alert("Identifiants incorrects");
                    login.value = "";
                    pwd.value = "";
                } else {
                    $scope.formLogin = {};
                    window.location.href = "./myTasks.html";
                    alert("Connexion réussie");
                }
            });
        }
    };
});

demoApp.controller('MainController',function ($scope, $http){

    $scope.formListe = {};
    $scope.formData = {};
    $scope.formLogin = {};

    $http.get('/getTaskSet').then(function(resp){
        $scope.taskSet = resp.data.taskSet;
        $scope.listSet = resp.data.listeSet;
        $scope.user = resp.data.user;
    });

    $scope.createList = function (){
        $http.post('/addList',$scope.formListe).then(function(resp){
            $scope.formListe = {};
            $scope.taskSet = resp.data.taskSet;
            $scope.listSet = resp.data.listeSet;
            $scope.user = resp.data.user;
        }
    )};

    $scope.deleteList = function (id){
        $http.delete('/deleteList/'+id).then(function(resp){
            $scope.taskSet = resp.data.taskSet;
            $scope.listSet = resp.data.listeSet;
            $scope.user = resp.data.user;
        }
    )};

    $scope.createTodo = function (){
        $http.post('/addTask',$scope.formData).then(function(resp){
            if(resp.data == false){
                document.getElementById("select-warning").innerHTML = "Vous devez associer une liste à cette tache";
            } else {
                document.getElementById("select-warning").innerHTML = "";
                $scope.formData = {};
                $scope.taskSet = resp.data.taskSet;
                $scope.listSet = resp.data.listeSet;
                $scope.user = resp.data.user;
            }
        }
    )};

    $scope.deleteTodo = function (id){
        $http.delete('/deleteTask/'+id).then(function(resp){
            $scope.taskSet = resp.data.taskSet;
            $scope.listSet = resp.data.listeSet;
            $scope.user = resp.data.user;
        }
    )};

    $scope.update = function (id){
        $http.put('/updateTask/'+id,$scope.formData).then(function(resp){
            $scope.taskSet = resp.data.taskSet;
            $scope.listSet = resp.data.listeSet;
            $scope.user = resp.data.user;
        }
    )};

    $scope.switch = function (id){
        $http.put('/updateCB/'+id,$scope.formData).then(function(resp){
            $scope.taskSet = resp.data.taskSet;
            $scope.listSet = resp.data.listeSet;
            $scope.user = resp.data.user;
        }
    )};

    $scope.logout = function (){
        $http.post('/logout',$scope.formLogin).then(function(resp){
            $scope.formLogin = {};
            window.location.href = "./index.html";
        }
    )};

});