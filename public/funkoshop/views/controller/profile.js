Controller.controllers.profile = {};
Controller.controllers.profile.refresh = function () {
    Spinner.mostrarCargando();
    Model.checkToken() /* To get a new token for the user */
        .then(() => {
            var context = {};
            context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
            var userId = context.user;
            Model.getUser(userId)
                .then((user) => {
                    console.log("en el controller then ", user);
                    context.user = user;
                })
                .then(() => {//load badge and render
                    Model.loadBadge(userId)
                        .then((counter) => {
                            context.counter = counter;
                        })
                        .finally(() => {
                            Spinner.quitarCargando();
                            View.renderer.profile.render(context);
                        });
                });
        })
        .catch(function(){
            Spinner.quitarCargando();
            Controller.router.go('/funkoshop/views/signin');
        })
}
Controller.controllers.profile.details_clicked = function (event, number) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}