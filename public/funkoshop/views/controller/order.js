Controller.controllers.order = {};
Controller.controllers.order.refresh = function (matching) {
    Spinner.mostrarCargando();
    Model.checkToken() /* To get a new token for the user */
        .then(() => {
            var context = {};
            context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
            var userId = context.user;

            Model.getUserOrderByNumber(userId, matching[1])
                .then((order) => {
                    console.log(order);
                    context.order = order;
                })
                .then(() => {//load badge and render
                    Model.loadBadge(userId)
                        .then((counter) => {
                            context.counter = counter;
                        })
                        .finally(() => {
                            Spinner.quitarCargando();
                            View.renderer.order.render(context);
                        });
                });
        })
        .catch(function(){
            Spinner.quitarCargando();
            Controller.router.go('/funkoshop/views/signin');
        })
}

