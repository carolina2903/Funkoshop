Controller.controllers.index = {};
Controller.controllers.index.refresh = function () {
    Spinner.mostrarCargando();
    Model.checkToken(); /* To get a new token for the user */
    var context = {};
    context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
    var userId = context.user;
    console.log(context.user);
    Model.getProducts()
        .then((products) => {
            context.products = products;
            context.products.forEach(product => {
                product.user = context.user;
            });
        })
        .then(() => {//load badge and render
            Model.loadBadge(userId)
                .then((counter) => {
                    context.counter = counter;
                })
                .then(() => {
                    Spinner.quitarCargando();
                    View.renderer.index.render(context);
                });
        });
}
Controller.controllers.index.buyProduct_clicked = function (event, pid) {
    event.preventDefault();
    var userId = sessionStorage.getItem("user");
    //add product:
    Model.buy(userId, pid)
        .then(() => {
            console.log('Product added successfully');
        })
        .catch((err) => {
            console.error('Product cannot be added', err);
        })
        .then(() => {
            //go to cart:
            Controller.router.go(event.target.href);
        });



}
Controller.controllers.index.addProduct_clicked = function (event, pid) {
    event.preventDefault();
    var userId = sessionStorage.getItem("user");
    //add product:
    Model.buy(userId, pid)
        .then(() => {
            console.log('Product added successfully');
        })
        .catch((err) => {
            console.error('Product cannot be added', err);
        })
        .then(() => {
            Controller.controllers.index.refresh();
        })

}

Controller.controllers.index.goToIndex_clicked = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}
